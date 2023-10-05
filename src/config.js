import dotenv from 'dotenv';
dotenv.config();

export const AUTH_SECRET = process.env.AUTH_SECRET || 'secret';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/pasayo';
export const NODE_ENV = process.env.NODE_ENV || 'developement';
export const PORT = process.env.PORT || 3000;
