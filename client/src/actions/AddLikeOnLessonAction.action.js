'use server';

import { serverMutation } from './helpers/serverMutation';

export const AddLikeOnLessonAction = async (lessonId, token) => {
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
