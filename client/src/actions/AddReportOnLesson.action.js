'use server';

import { serverMutation } from './helpers/serverMutation';

export const AddReportOnLessonAction = async (data, token) => {
  const result = await serverMutation(
    '/api/report/add',
    'POST',
    { ...data },
    token,
  );

  return result;
};
