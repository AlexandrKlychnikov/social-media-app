import { z } from 'zod';

export const SignupValidation = z.object({
  name: z.string().min(2, { message: 'Minimum 2 letters' }),
  username: z.string().min(2, { message: 'Minimum 2 letters' }),
  email: z.string().email(),
  password: z.string().min(8, { message: 'Minimum 8 letters' }),
});
