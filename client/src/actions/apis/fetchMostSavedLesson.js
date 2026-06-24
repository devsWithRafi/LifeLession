import { serverMutation } from '../helpers/serverMutation';

export const fetchMostSavedLesson = async () => {
  const result = await serverMutation(
    '/api/lesson/most-saved',
    'GET',
    null,
    null,
  );
  return result;
};
