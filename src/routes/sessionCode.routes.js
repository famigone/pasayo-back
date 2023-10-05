import { Router } from 'express';
import {
  createSessionCode,
  getSessionCode,
  getSessionCodeByUser,
  getSessionCodes,
  updateSessionCode,
  updateSessionCodeObservacion,
} from '../controllers/sessionCode.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createSessionCodeSchema, updateSessionCodeObservacionSchema } from '../schemas/sessionCode.controller.js';

const router = Router();

router.get('/sessionCode', getSessionCodeByUser);
router.get('/sessionCode/getone', getSessionCode);
router.get('/sessionCodes', getSessionCodes);
router.post('/sessionCode', validateSchema(createSessionCodeSchema), createSessionCode);
router.put('/sessionCode/:id', validateSchema(updateSessionCode), updateSessionCode);
router.put(
  '/sessionCode/update/observacion',
  validateSchema(updateSessionCodeObservacionSchema),
  updateSessionCodeObservacion
);

export default router;
