import * as z from 'zod';

export const LoginSchema = z.object({
  name: z.string().nonempty('Name is required'),
});
