import { Router } from 'express';
import {
  createTrayecto,
  deleteTrayecto,
  getTiposTrayectos,
  getTrayecto,
  getTrayectos,
  updateTrayecto,
} from '../controllers/trayecto.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTrayectoSchema, updateTrayectoSchema } from '../schemas/trayecto.schema.js';

const router = Router();

router.delete('/trayecto/:id', deleteTrayecto);
router.get('/trayectos', getTrayectos);
router.get('/trayecto/:id', getTrayecto);
router.get('/tiposTrayectos', getTiposTrayectos);
router.post('/trayecto', validateSchema(createTrayectoSchema), createTrayecto);
router.put('/trayecto', validateSchema(updateTrayectoSchema), updateTrayecto);

export default router;
