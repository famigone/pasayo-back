import Trayecto from '../models/trayecto.model.js';

export const createTrayecto = async (req, res) => {
  try {
    const { titulo, narrativa, tema, objetivo, user } = req.body;
    const newTrayecto = new Trayecto({
      titulo: titulo.toUpperCase(),
      narrativa,
      objetivo,
      tema: tema.toUpperCase(),
      activo: true,
      user,
    });

    await newTrayecto.save();

    res.json(newTrayecto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTrayecto = async (req, res) => {
  try {
    const deletedTrayecto = await Trayecto.findByIdAndDelete(req.params.id, (err, trayecto) => {
      trayecto.activo = false;
      trayecto.save();
    });

    if (!deletedTrayecto) return res.status(404).json({ message: 'Trayecto no encontrado' });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTrayecto = async (req, res) => {
  try {
    const trayecto = await Trayecto.findById(req.params.id);
    if (!trayecto) return res.status(404).json({ message: 'Trayecto no encontrado' });

    return res.json(trayecto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTrayectos = async (req, res) => {
  try {
    const filtro = req.query;
    const limite = filtro.limite;
    let filtroFinal = {};

    if (filtro.tema && filtro.tema != 'TODOS') filtroFinal.tema = filtro.tema;
    if (filtro.autor && filtro.autor !== 'TODAS') filtroFinal.autor = filtro.autor;
    if (filtro.titulo && filtro.titulo !== null)
      filtroFinal.titulo = { $regex: '.*' + filtro.titulo.toUpperCase() + '.*' };
    filtroFinal.activo = true;

    const trayectos = await Trayecto.find(filtroFinal).sort({ createdAt: -1 }).limit(limite);

    res.json(trayectos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTiposTrayectos = async (req, res) => {
  try {
    const tiposTrayectos = await Trayecto.find({ activo: true });

    // return only _id and titulo from active trayectos
    res.json(tiposTrayectos.map((trayecto) => ({ _id: trayecto._id, titulo: trayecto.titulo })));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTrayecto = async (req, res) => {
  try {
    const { titulo, narrativa, objetivo, tema } = req.body;

    // Create an object containing the fields that we want to update.
    const updateFields = {};
    if (titulo) updateFields.titulo = titulo.toUpperCase();
    if (narrativa) updateFields.narrativa = narrativa;
    if (objetivo) updateFields.objetivo = objetivo;
    if (tema) updateFields.tema = tema.toUpperCase();

    // Update the document.
    const trayectoUpdated = await Trayecto.findOneAndUpdate(
      { _id: req.body.id },
      { $set: updateFields },
      { new: true }
    );

    return res.json(trayectoUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
