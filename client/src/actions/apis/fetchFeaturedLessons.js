"use server"
import { serverMutation } from '../helpers/serverMutation';

export const fetchFeaturedLessons = async () => {
  const result = await serverMutation('/api/lesson/featured', 'GET', {}, '');
  return result;
};
