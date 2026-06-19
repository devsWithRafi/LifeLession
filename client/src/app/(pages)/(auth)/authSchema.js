import * as z from 'zod';

export const signUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  image: z.string().url('Invalid URL').optional(),
  email: z.string().email('Invalid email address'),
  password: z
    .string({ message: 'Password must not be empty.' })
    .min(6, 'Password must be at least 6 characters.')
    .max(50, 'Password must be at most 50 characters.')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Must contain at least one number.'),
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string({ message: 'Password must not be empty.' })
    .min(6, 'Password must be at least 6 characters.')
    .max(50, 'Password must be at most 50 characters.')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Must contain at least one number.'),
});
