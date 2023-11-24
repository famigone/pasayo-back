import Experiencia from '../models/experiencia.model.js';
import Trayecto from '../models/trayecto.model.js';

export const createExperiencia = async (req, res) => {
  try {
    const { titulo, narrativa, tema, tipo, objetivo, solucion, id_trayecto, user } = req.body;

    const newExperiencia = new Experiencia({
      titulo: titulo.toUpperCase(),
      narrativa,
      objetivo,
      tema,
      tipo,
      activo: true,
      solucion,
      id_trayecto,
      user,
    });

    let trayecto = await Trayecto.findById(id_trayecto);

    // Push the newExperiencia subdocument into the experiencias array
    trayecto.experiencias.push(newExperiencia);

    // Save the trayecto document
    await trayecto.save();

    // Save the experiencia document
    await newExperiencia.save();

    res.json(newExperiencia);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteExperiencia = async (req, res) => {
  try {
    const deletedExperiencia = await Experiencia.findByIdAndDelete(req.params.id);

    if (!deletedExperiencia) return res.status(404).json({ message: 'Experiencia no encontrada' });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getExperiencia = async (req, res) => {
  try {
    const experiencia = await Experiencia.findById(req.params.id);
    if (!experiencia) return res.status(404).json({ message: 'Experiencia no encontrada' });

    return res.json(experiencia);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getExperienciaTrayecto = async (req, res) => {
  try {
    const experiencia = await Experiencia.findById(req.params.id).populate('trayecto');
    if (!experiencia) return res.status(404).json({ message: 'Experiencia no encontrada' });

    return res.json(experiencia);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getExperiencias = async (req, res) => {
  try {
    const filtro = req.query;
    const limite = filtro.limite;
    let filtroFinal = {};

    // Check if filters are present and add them to the query
    if (filtro.tema && filtro.tema != 'TODOS') filtroFinal.tema = filtro.tema;
    if (filtro.autor && filtro.autor !== 'TODAS') filtroFinal.autor = filtro.autor;
    if (filtro.tipo && filtro.tipo !== 'TODOS') filtroFinal.tipo = filtro.tipo;
    if (filtro.titulo && filtro.titulo !== null)
      filtroFinal.titulo = { $regex: '.*' + filtro.titulo.toUpperCase() + '.*' };
    filtroFinal.activo = true;

    // Get the experiences that match the filters
    const experiencias = await Experiencia.find(filtroFinal).sort({ createdAt: -1 }).limit(limite);

    // Get the trayecto for each experience
    const experienciasConTrayectos = await Promise.all(
      experiencias.map(async (experiencia) => {
        const trayecto = await Trayecto.find({ _id: experiencia.id_trayecto });

        return { ...experiencia._doc, trayecto };
      })
    );

    res.json(experienciasConTrayectos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateExperiencia = async (req, res) => {
  try {
    const { titulo, narrativa, objetivo, tema, solucion, activo } = req.body;

    // Create an object containing the fields that we want to update.
    const updateFields = {};
    if (titulo) updateFields.titulo = titulo;
    if (narrativa) updateFields.narrativa = narrativa;
    if (objetivo) updateFields.objetivo = objetivo;
    if (tema) updateFields.tema = tema;
    if (solucion) updateFields.solucion = solucion;
    if (activo) updateFields.activo = activo;

    // Update the document.
    const experienciaUpdated = await Experiencia.findOneAndUpdate(
      { _id: req.body.id },
      { $set: updateFields },
      { new: true }
    );

    return res.json(experienciaUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
