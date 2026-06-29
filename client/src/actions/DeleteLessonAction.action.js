'use server';

import { serverMutation } from './helpers/serverMutation';

export const DeleteLessonAction = async (id, token) => {
  if (!token) return { success: false, message: 'No token' };

  const result = await serverMutation(
    `/api/lesson/delete/${id}`,
    'DELETE',
    null,
    token,
  );

  return result;
};
