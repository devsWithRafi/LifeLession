import { serverMutation } from '../helpers/serverMutation';

export const fetchLessonComment = async (lessonId, token) => {
  if (!token) return {success:false, message:'No token'};
  const result = await serverMutation(
    `/api/comment/${lessonId}`,
    'GET',
    null,
    token,
  );
  return result;
};
