import jwt from 'jsonwebtoken';
import { AUTH_SECRET } from '../config.js';

export async function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, AUTH_SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
