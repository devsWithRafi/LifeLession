'use server';

import { serverMutation } from './helpers/serverMutation';

export const AddLikeOnLessonAction = async (lessonId, token) => {
  if (!token) return { success: false, message: 'No token' };

  const result = await serverMutation(
    '/api/like/add',
    'POST',
    {
      lessonId,
    },
    token,
  );

  return result;
};
