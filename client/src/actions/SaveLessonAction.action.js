'use server';

import { serverMutation } from './helpers/serverMutation';

export const SaveLessonAction = async (lessonId, token) => {
  if (!token) return { success: false, message: 'No token' };

  const result = await serverMutation(
    '/api/save/add',
    'POST',
    {
      lessonId,
    },
    token,
  );

  return result;
};
