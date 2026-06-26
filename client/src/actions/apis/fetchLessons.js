import { serverMutation } from '../helpers/serverMutation';

export const fetchLessons = async (query = {}) => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  const result = await serverMutation(
    `/api/lesson/all?${params.toString()}`,
    'GET',
    null,
    null,
  );
  return result;
};
