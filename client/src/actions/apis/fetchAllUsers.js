import { serverMutation } from '../helpers/serverMutation';

export const fetchAllUsers = async (token) => {
  const result = await serverMutation("/api/me/all", 'GET', null, token);
  return result;
};
