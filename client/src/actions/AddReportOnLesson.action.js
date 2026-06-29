'use server';

import { serverMutation } from './helpers/serverMutation';

export const AddReportOnLessonAction = async (data, token) => {
  if (!token) return { success: false, message: 'No token' };

  const result = await serverMutation(
    '/api/report/add',
    'POST',
    { ...data },
    token,
  );

  return result;
};
