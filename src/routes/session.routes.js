import { Router } from 'express';
import { createSession, getSession, getSessionByUser, updateSession } from '../controllers/session.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createSessionSchema, updateSessionSchema } from '../schemas/session.schema.js';

const router = Router();

router.get('/session', getSessionByUser);
router.get('/session/:id', getSession);
router.post('/session', validateSchema(createSessionSchema), createSession);
router.put('/session', validateSchema(updateSessionSchema), updateSession);

export default router;
