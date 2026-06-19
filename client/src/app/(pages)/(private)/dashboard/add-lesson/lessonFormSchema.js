import z from 'zod';

export const LessonFormSchema = z.object({
  title: z.string().min(5, 'Bug title must be at least 5 characters.'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters.'),
  category: z.string('Category is required.').min(1, 'Category is required.'),
  emotionalTone: z
    .string('Emotional tone is required.')
    .min(1, 'Emotional tone is required.'),
  accessLevel: z
    .string('Access level is required.')
    .min(1, 'Access level is required.'),
  image: z.file().optional(),
});
