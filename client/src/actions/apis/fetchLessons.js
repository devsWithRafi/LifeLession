import { serverMutation } from '../helpers/serverMutation';

export const fetchLessons = async () => {
  const result = await serverMutation('/api/lesson/all', 'GET', null, null);
  return result;
};
