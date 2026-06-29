'use server';
import { serverMutation } from '../helpers/serverMutation';

export const fetchUserDashboardStates = async (token) => {
  if (!token) return { success: false, message: 'No token' };

  const result = await serverMutation('/api/me/dashboard', 'GET', {}, token);
  return result;
};
