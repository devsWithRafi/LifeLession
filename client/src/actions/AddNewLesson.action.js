'use server';

import { serverMutation } from './helpers/serverMutation';

export const AddNewLessonAction = async (data, token) => {
  if (!token) return { success: false, message: 'No token' };

  const result = await serverMutation(
    '/api/lesson/create',
    'POST',
    { ...data },
    token,
  );

  return result;
};
