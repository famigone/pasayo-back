import { z } from 'zod';

export const createSessionSchema = z.object({
  id_experiencia: z.string({
    required_error: 'El ID de la experiencia de la sesion code es requerido',
  }),
  user: z.string({
    required_error: 'El usuario de la sesion es requerido',
  }),
});

export const updateSessionSchema = z.object({
  id: z.string({
    required_error: 'El ID de la sesion es requerido',
  }),
});
