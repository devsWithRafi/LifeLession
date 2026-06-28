'use server';

import { serverMutation } from './helpers/serverMutation';

export const DeleteUserAction = async (userId, token) => {
  const result = await serverMutation(
    `/api/me/delete/${userId}`,
    'DELETE',
    null,
    token,
  );

  return result;
};
