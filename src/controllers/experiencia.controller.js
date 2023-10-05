import Experiencia from '../models/experiencia.model.js';
import Trayecto from '../models/trayecto.model.js';
import mongoose from 'mongoose';

export const createExperiencia = async (req, res) => {
  try {
    const { titulo, narrativa, tema, objetivo, solucion, id_trayecto, user } = req.body;

    const newExperiencia = new Experiencia({
      titulo: titulo.toUpperCase(),
      narrativa,
      objetivo,
      tema,
      activo: true,
      solucion,
      id_trayecto,
      user,
    });

    let trayecto = await Trayecto.findById(id_trayecto);

    // Convert the req.body._id to an ObjectId
    const experienciaId = new mongoose.Types.ObjectId(req.body._id);

    // Push the experiencia id into the trayecto.experiencias array
    trayecto.experiencias.push(experienciaId);

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
    const deletedExperiencia = await Experiencia.findByIdAndDelete(req.params.id, (err, experiencia) => {
      experiencia.activo = false;
      experiencia.save();
    });

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

    if (filtro.tema && filtro.tema != 'TODOS') filtroFinal.tema = filtro.tema;
    if (filtro.user) filtroFinal.user = filtro.user;
    if (filtro.titulo) filtroFinal.titulo = { $regex: '.*' + filtro.titulo.toUpperCase() + '.*' };
    filtroFinal.activo = true;

    const experiencias = await Experiencia.find(filtroFinal).sort({ createdAt: -1 }).limit(limite);

    res.json(experiencias);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateExperiencia = async (req, res) => {
  try {
    const { solucion } = req.body;
    const experienciaUpdated = await Experiencia.findOneAndUpdate({ _id: req.params.id }, { solucion });

    return res.json(experienciaUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
