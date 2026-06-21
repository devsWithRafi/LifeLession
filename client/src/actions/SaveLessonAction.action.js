'use server';

import { serverMutation } from './helpers/serverMutation';

export const SaveLessonAction = async (lessonId, token) => {
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
