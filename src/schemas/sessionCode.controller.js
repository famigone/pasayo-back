import { z } from 'zod';

export const createSessionCodeSchema = z.object({
  user: z.string({
    required_error: 'El usuario del session code es requerido',
  }),
  id_experiencia: z.string({
    required_error: 'El ID de la experiencia del session code es requerido',
  }),
  codigo: z.string({
    required_error: 'El código del session code es requerido',
  }),
});

export const updateSessionCodeSchema = z.object({
  id: z.string({
    required_error: 'El ID del session code es requerido',
  }),
  codigo: z.string({
    required_error: 'El código del session code es requerido',
  }),
});

export const updateSessionCodeObservacionSchema = z.object({
  id: z.string({
    required_error: 'El ID del session code es requerido',
  }),
  estadoObservacion: z.string({
    required_error: 'El estado de la observación del session code es requerido',
  }),
  observacion: z.string({
    required_error: 'La observación del session code es requerida',
  }),
});
