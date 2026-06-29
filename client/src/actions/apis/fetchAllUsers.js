import { serverMutation } from '../helpers/serverMutation';

export const fetchAllUsers = async (token) => {
  if (!token) return {success:false, message:'No token'};
  const result = await serverMutation('/api/me/all', 'GET', null, token);
  return result;
};
