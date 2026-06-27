import { serverMutation } from '../helpers/serverMutation';

export const fetchUserProfile = async (userId, token) => {
  const result = await serverMutation(`/api/me/${userId}`, 'GET', null, token);
  return result;
};
