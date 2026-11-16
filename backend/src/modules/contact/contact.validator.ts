import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(100, { message: 'Name cannot exceed 100 characters' }),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email({ message: 'Please provide a valid email address' })
    .max(150, { message: 'Email cannot exceed 150 characters' }),
  subject: z
    .string({ required_error: 'Subject is required' })
    .trim()
    .min(3, { message: 'Subject must be at least 3 characters long' })
    .max(200, { message: 'Subject cannot exceed 200 characters' }),
  message: z
    .string({ required_error: 'Message is required' })
    .trim()
    .min(10, { message: 'Message must be at least 10 characters long' })
    .max(5000, { message: 'Message cannot exceed 5000 characters' }),
});

export type ValidatedContactInput = z.infer<typeof contactSchema>;
