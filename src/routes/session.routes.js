import { Router } from 'express';
import {
  createSession,
  getSession,
  getSessionByUser,
  getSessionCodes,
  updateSession,
} from '../controllers/session.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createSessionSchema, updateSessionSchema } from '../schemas/session.schema.js';

const router = Router();

router.get('/session', getSessionByUser);
router.get('/session/:id', getSession);
router.get('/sessions', getSessionCodes);
router.post('/sessionCode', validateSchema(createSessionSchema), createSession);
router.put('/sessionCode/:id', validateSchema(updateSessionSchema), updateSession);

export default router;
