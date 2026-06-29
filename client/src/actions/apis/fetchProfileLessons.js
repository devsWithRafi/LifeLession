import { serverMutation } from '../helpers/serverMutation';

export const fetchProfileLessons = async (token) => {
  if (!token) return { success: false, message: 'No token' };

  const result = await serverMutation(
    '/api/lesson/my-lessons',
    'GET',
    null,
    token,
  );
  return result;
};
