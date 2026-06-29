'use server';

import { serverMutation } from './helpers/serverMutation';

export const AddNewCommentAction = async (data, token) => {
  if (!token) return { success: false, message: 'No token' };

  const { text, lessonId } = data;
  const result = await serverMutation(
    '/api/comment/create',
    'POST',
    {
      text,
      lessonId,
    },
    token,
  );

  return result;
};
