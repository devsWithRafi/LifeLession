'use server';

import { serverMutation } from './helpers/serverMutation';

export const PromoteUserAction = async (userId, token) => {
  if (!token) return { success: false, message: 'No token' };

  const result = await serverMutation(
    `/api/me/promote/${userId}`,
    'PATCH',
    null,
    token,
  );
  return result;
};
