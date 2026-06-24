'use server';

import { serverMutation } from './helpers/serverMutation';

export const UpdateLessonAction = async (id, data, token) => {
  const result = await serverMutation(
    `/api/lesson/update/${id}`,
    'PUT',
    {...data},
    token,
  );

  return result;
};
