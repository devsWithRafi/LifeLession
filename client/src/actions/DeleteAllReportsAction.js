'use server';

import { serverMutation } from './helpers/serverMutation';

export const DeleteAllReportsAction = async (lessonId, token) => {
  if (!token) return { success: false, message: 'No token' };

  const result = await serverMutation(
    `/api/report/delete/${lessonId}`,
    'DELETE',
    null,
    token,
  );

  return result;
};
