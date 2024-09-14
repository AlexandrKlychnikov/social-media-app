import { z } from 'zod';

export const SignupValidation = z.object({
  name: z.string().min(2, { message: 'Minimum 2 letters' }),
  username: z.string().min(2, { message: 'Minimum 2 letters' }),
  email: z.string().email(),
  password: z.string().min(8, { message: 'Minimum 8 letters' }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Minimum 8 letters' }),
});

export const PostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: 'Минимум 5 знаков.' })
    .max(2200, { message: 'Максимум 2200 знаков.' }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(1, { message: 'Это значение обязательно' })
    .max(1000, { message: 'Максимум 1000 знаков.' }),
  tags: z.string(),
});