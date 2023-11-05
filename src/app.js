import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import trayectoRoutes from './routes/trayecto.routes.js';
import experienciaRoutes from './routes/experiencia.routes.js';
import sessionRoutes from './routes/session.routes.js';
import { FRONTEND_URL } from './config.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const whitelist = FRONTEND_URL;
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/api', authRoutes);
app.use('/api', trayectoRoutes);
app.use('/api', experienciaRoutes);
app.use('/api', sessionRoutes);

export default app;
