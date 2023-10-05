import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string({
    required_error: 'El usuario es requerido',
  }),
  password: z
    .string({
      required_error: 'La contraseña es requerida',
    })
    .min(6, {
      message: 'La contraseña debe tener al menos 6 caracteres',
    }),
  mail: z
    .string({
      required_error: 'El email es requerido',
    })
    .email({
      message: 'Email no válido',
    }),
});

export const loginSchema = z.object({
  username: z.string({
    required_error: 'El usuario es requerido',
  }),
  password: z
    .string({
      required_error: 'La contraseña es requerida',
    })
    .min(6, {
      message: 'La contraseña debe tener al menos 6 caracteres',
    }),
});
