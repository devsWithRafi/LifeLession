'use server';

import { serverMutation } from './helpers/serverMutation';

export const DeleteFavoriteLessonAction = async (lessonId, token) => {
  if (!token) return { success: false, message: 'No token' };

  const result = await serverMutation(
    `/api/save/delete/${lessonId}`,
    'DELETE',
    null,
    token,
  );

  return result;
};
