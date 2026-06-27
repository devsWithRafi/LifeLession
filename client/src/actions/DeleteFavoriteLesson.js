'use server';

import { serverMutation } from './helpers/serverMutation';

export const DeleteFavoriteLessonAction = async (lessonId, token) => {
  const result = await serverMutation(
    `/api/save/delete/${lessonId}`,
    'DELETE',
    null,
    token,
  );

  return result;
};
