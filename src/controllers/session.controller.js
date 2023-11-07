import Session from '../models/session.model.js';

export const createSession = async (req, res) => {
  try {
    const body = req.body;

    // Check if an existing session exists for the user and experiencia
    const existingSession = await Session.findOne({ user: body.user, id_experiencia: body.id_experiencia });

    // If an existing session exists, return it
    if (existingSession) {
      console.log(`existing session ${existingSession}`);
      return res.json(existingSession);
    }

    // Otherwise, create a new session document
    const newSession = new Session(body);
    await newSession.save();

    // Return the new session document
    res.json(newSession);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSession = async (req, res) => {
  try {
    const filtro = req.query;

    const session = await Session.findById(req.params.id);

    if (!session) return res.status(404).json({ message: 'Session no encontrada' });

    return res.json(experiencia);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSessionByUser = async (req, res) => {
  try {
    const filtro = req.query;

    const session = await Session.findById(req.params.id, filtro);
    if (!session) return res.status(404).json({ message: 'Session no encontrada' });

    return res.json(experiencia);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSessions = async (req, res) => {
  try {
    const filtro = req.query;
    const limite = filtro.limite;
    let filtroFinal = {};

    if (filtro.user) filtroFinal.user = filtro.user;

    const sessions = await Session.find(filtroFinal).sort({ createdAt: -1 }).limit(limite);

    res.json(sessions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSession = async (req, res) => {
  try {
    const { codigo, observacion, estado_observacion } = req.body;

    // Create an object containing the fields that we want to update.
    const updateFields = {};
    if (codigo) updateFields.codigo = codigo;
    if (observacion) updateFields.observacion = observacion;
    if (estado_observacion) updateFields.estado_observacion = estado_observacion;

    // Update the document.
    const sessionUpdated = await Session.findOneAndUpdate({ _id: req.body.id }, { $set: updateFields }, { new: true });

    return res.json(sessionUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
