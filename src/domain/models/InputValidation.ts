import { z } from 'zod';

export const inputSchema = z.union([
  z.string().email({ message: 'Invalid email address' }),
  z.string().regex(/^\d{10}$/, { message: 'Invalid phone number' }),
]);

export type ValidatedInput = z.infer<typeof inputSchema>;
