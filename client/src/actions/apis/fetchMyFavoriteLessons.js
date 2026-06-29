import { serverMutation } from '../helpers/serverMutation';


export const fetchMyFavoriteLessons = async (token) => {
  if (!token) return {success:false, message:'No token'};

  const result = await serverMutation(
    `/api/save/my-favorite`,
    'GET',
    null,
    token,
  );
  return result;
};
