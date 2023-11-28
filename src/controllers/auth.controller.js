import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AUTH_SECRET, NODE_ENV } from '../config.js';
import { createAccessToken } from '../libs/jwt.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userFound = await User.findOne({ username });

    if (!userFound)
      return res.status(400).json({
        message: ['Credenciales invalidas'],
      });

    const isMatch = bcrypt.compareSync(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ['Credenciales invalidas'],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie('token', token, {
      httpOnly: NODE_ENV !== 'development',
      secure: true,
      sameSite: 'none',
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.mail,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const register = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    const userFound = await User.findOne({ username });
    const mailFound = await User.findOne({ mail });

    if (userFound || mailFound)
      return res.status(400).json({
        message: ['Correo o usuario ya existente'],
      });

    // hashing the password
    const passwordHash = bcrypt.hashSync(password, 10);

    // creating the user
    const newUser = new User({
      username,
      mail,
      password: passwordHash,
    });

    // saving the user in the database
    const userSaved = await newUser.save();

    // create access token
    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie('token', token, {
      httpOnly: NODE_ENV !== 'development',
      secure: true,
      sameSite: 'none',
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.mail,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, AUTH_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.mail,
    });
  });
};
