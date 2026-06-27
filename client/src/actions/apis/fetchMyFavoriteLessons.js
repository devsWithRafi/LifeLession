import { serverMutation } from '../helpers/serverMutation';


export const fetchMyFavoriteLessons = async (token) => {
  const result = await serverMutation(
    `/api/save/my-favorite`,
    'GET',
    null,
    token,
  );
  return result;
};
