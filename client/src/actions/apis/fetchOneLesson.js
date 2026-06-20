import { serverMutation } from '../helpers/serverMutation';

export const fetchOneLesson = async (id, token) => {
  if (!id) return;
  const result = await serverMutation(`/api/lesson/${id}`, 'GET', null, token);
  return result;
};
