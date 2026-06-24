'use server';

import { serverMutation } from './helpers/serverMutation';

export const DeleteLessonAction = async (id, token) => {
  const result = await serverMutation(
    `/api/lesson/delete/${id}`,
    'DELETE',
    null,
    token,
  );

  return result;
};
