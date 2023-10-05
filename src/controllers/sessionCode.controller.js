import SessionCode from '../models/sessionCode.model.js';

export const createSessionCode = async (req, res) => {
  try {
    const body = req.body;
    const newSessionCode = new SessionCode(body);

    await newSessionCode.save();

    res.json(newSessionCode);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSessionCode = async (req, res) => {
  try {
    const filtro = req.query;

    const sessionCode = await SessionCode.findById(req.params.id, filtro);
    if (!sessionCode) return res.status(404).json({ message: 'SessionCode no encontrado' });

    return res.json(experiencia);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSessionCodeByUser = async (req, res) => {
  try {
    const filtro = req.query;

    const sessionCode = await SessionCode.findById(req.params.id, filtro);
    if (!sessionCode) return res.status(404).json({ message: 'SessionCode no encontrado' });

    return res.json(experiencia);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSessionCodes = async (req, res) => {
  try {
    const user = req.query.userId;
    const limite = 50;
    let filtroFinal = {};
    filtroFinal.user = user;

    const sessionCodes = await SessionCode.find(filtroFinal)
      .sort({ createdAt: -1 })
      .limit(limite)
      .populate('experienciaid');

    res.json(sessionCodes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSessionCode = async (req, res) => {
  try {
    const { codigo } = req.body;
    const sessionCodeUpdated = await SessionCode.findOneAndUpdate({ _id: req.params.id }, { codigo });

    return res.json(sessionCodeUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSessionCodeObservacion = async (req, res) => {
  try {
    const { observacion, estadoObservacion } = req.body;
    const sessionCodeUpdated = await SessionCode.findOneAndUpdate(
      { _id: req.params.id },
      { observacion, estadoObservacion }
    );

    return res.json(sessionCodeUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
