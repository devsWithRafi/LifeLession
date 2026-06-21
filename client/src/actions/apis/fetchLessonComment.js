import { serverMutation } from '../helpers/serverMutation';

export const fetchLessonComment = async (lessonId, token) => {
  const result = await serverMutation(
    `/api/comment/${lessonId}`,
    'GET',
    null,
    token,
  );
  return result;
};
