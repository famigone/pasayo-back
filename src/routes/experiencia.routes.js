import { Router } from 'express';
import {
  createExperiencia,
  deleteExperiencia,
  getExperiencia,
  getExperiencias,
  updateExperiencia,
} from '../controllers/experiencia.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createExperienciaSchema, updateExperienciaSchema } from '../schemas/experiencia.schema.js';

const router = Router();

router.delete('/experiencia/:id', deleteExperiencia);
router.get('/experiencias', getExperiencias);
router.get('/experiencia/:id', getExperiencia);
router.post('/experiencia', validateSchema(createExperienciaSchema), createExperiencia);
router.put('/experiencia', validateSchema(updateExperienciaSchema), updateExperiencia);

export default router;
