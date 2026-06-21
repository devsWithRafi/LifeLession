'use server';

import { serverMutation } from './helpers/serverMutation';

export const AddNewCommentAction = async (data, token) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
