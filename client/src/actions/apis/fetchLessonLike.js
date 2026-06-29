import { serverMutation } from '../helpers/serverMutation';

export const fetchLessonLike = async (lessonId, token) => {
  if (!token) return {success:false, message:'No token'};
  const result = await serverMutation(
    `/api/like/${lessonId}`,
    'GET',
    null,
    token,
  );
  return result;
};
