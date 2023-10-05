import User from '../models/user.model.js';

export const getHome = (req, res, next) => {
  console.log('La req.user en el getHome: ' + req.user);
  console.log('La req.session en el getHome: ' + req.session.user);

  if (req.session) {
    res.json({ user: req.session.user });
  } else {
    res.json({ user: null });
  }
  next();
};

export const getHome1 = ({ session: { user } }, res) => {
  console.log('buzina user: ' + user);
  res.send({ user });
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
