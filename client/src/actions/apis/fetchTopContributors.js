import { serverMutation } from '../helpers/serverMutation';

export const fetchTopContributors = async () => {
  const result = await serverMutation(
    '/api/lesson/top-contributors',
    'GET',
    null,
    null,
  );
  return result;
};
