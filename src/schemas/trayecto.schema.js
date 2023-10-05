import { z } from 'zod';

export const createTrayectoSchema = z.object({
  titulo: z.string({
    required_error: 'El título del trayecto es requerido',
  }),
  narrativa: z.string({
    required_error: 'La narrativa del trayecto es requerida',
  }),
  objetivo: z.string({
    required_error: 'El objetivo del trayecto es requerido',
  }),
  tema: z.string({
    required_error: 'El tema del trayecto es requerido',
  }),
  user: z.string({
    required_error: 'El usuario del trayecto es requerido',
  }),
});

export const updateTrayectoSchema = z.object({
  id: z.string({
    required_error: 'El ID del trayecto es requerido',
  }),
  titulo: z.string({
    required_error: 'El título del trayecto es requerido',
  }),
  narrativa: z.string({
    required_error: 'La narrativa del trayecto es requerida',
  }),
  tema: z.string({
    required_error: 'El tema del trayecto es requerido',
  }),
  objetivo: z.string({
    required_error: 'El objetivo del trayecto es requerido',
  }),
  solucion: z.string({
    required_error: 'La solución del trayecto es requerida',
  }),
  user: z.string({
    required_error: 'El usuario del trayecto es requerido',
  }),
});
