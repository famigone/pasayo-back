import { z } from 'zod';

export const createExperienciaSchema = z.object({
  titulo: z.string({
    required_error: 'El título de la experiencia es requerido',
  }),
  narrativa: z.string({
    required_error: 'La narrativa de la experiencia es requerida',
  }),
  tema: z.string({
    required_error: 'El tema de la experiencia es requerido',
  }),
  objetivo: z.string({
    required_error: 'El objetivo de la experiencia es requerido',
  }),
  solucion: z.string({
    required_error: 'La solución de la experiencia es requerida',
  }),
  user: z.string({
    required_error: 'El usuario de la experiencia es requerido',
  }),
  id_trayecto: z.string({
    required_error: 'El ID del trayecto de la experiencia es requerido',
  }),
});

export const updateExperienciaSchema = z.object({
  id: z.string({
    required_error: 'El ID de la experiencia es requerido',
  }),
});
