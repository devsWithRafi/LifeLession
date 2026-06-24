import z from 'zod';

export const validateLessonBodyData = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  category: z.string().min(1),
  emotionalTone: z.string().min(1),
  accessLevel: z.string().min(1),
  image: z.string().optional(),
  isPublic: z.boolean().default(true),
});
