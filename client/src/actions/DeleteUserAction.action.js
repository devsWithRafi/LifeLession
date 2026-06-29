'use server';

import { serverMutation } from './helpers/serverMutation';

export const DeleteUserAction = async (userId, token) => {
  if (!token) return { success: false, message: 'No token' };

  const result = await serverMutation(
    `/api/me/delete/${userId}`,
    'DELETE',
    null,
    token,
  );

  return result;
};
