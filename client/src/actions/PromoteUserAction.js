'use server';

import { serverMutation } from './helpers/serverMutation';

export const PromoteUserAction = async (userId, token) => {
  const result = await serverMutation(
    `/api/me/promote/${userId}`,
    'PATCH',
    null,
    token,
  );
  return result;
};
