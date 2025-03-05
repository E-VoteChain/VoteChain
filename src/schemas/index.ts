import * as z from 'zod';

export const LoginSchema = z.object({
  name: z.string().nonempty('Name is required'),
});

export const AddCandidateSchema = z.object({
  name: z.string().nonempty('Name is required'),
  slogan: z.string().nonempty('Slogan is required'),
  election_id: z
    .string({ invalid_type_error: 'Election ID must be a number' })
    .min(1, 'Election ID must be at least 1')
    .max(9999, 'Election ID cannot exceed 9999'),
});
