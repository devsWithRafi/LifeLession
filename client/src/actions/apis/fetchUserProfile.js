import { serverMutation } from '../helpers/serverMutation';

export const fetchUserProfile = async (userId, token) => {
  if (!token) return { success: false, message: 'No token' };

  const result = await serverMutation(`/api/me/${userId}`, 'GET', null, token);
  return result;
};
