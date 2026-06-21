import { serverMutation } from '../helpers/serverMutation';

export const fetchLessonLike = async (lessonId, token) => {
  const result = await serverMutation(
    `/api/like/${lessonId}`,
    'GET',
    null,
    token,
  );
  return result;
};
