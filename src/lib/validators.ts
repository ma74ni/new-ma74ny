import { z } from 'zod';

export const QuoteRequestSchema = z.object({
  description: z
    .string()
    .min(20, 'Describe tu proyecto en al menos 20 caracteres.')
    .max(1000, 'La descripción debe tener menos de 1000 caracteres.')
    .trim(),
});

export const ContactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.').max(100).trim(),
  email: z.string().email('Ingresa un email válido.'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres.').max(2000).trim(),
});

export type QuoteRequestInput = z.infer<typeof QuoteRequestSchema>;
export type ContactInput = z.infer<typeof ContactSchema>;
