'use server';
import { serverMutation } from '../helpers/serverMutation';

export const fetchDashboardStates = async (token) => {
  const result = await serverMutation('/api/admin/states', 'GET', {}, token);
  return result;
};
