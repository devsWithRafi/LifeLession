'use client';

import { useContext, useEffect, useState, useTransition } from 'react';
import { getToken } from '@/lib/auth-client';
import { toast } from 'sonner';
import { AllUsersContext } from './AllUsersContext';
import { fetchAllUsers } from '@/actions/apis/fetchAllUsers';

const AllUsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, startLoading] = useTransition();

  const fetchUsers = () => {
    startLoading(async () => {
      const token = await getToken();
      const res = await fetchAllUsers(token);
      if (res.success) {
        setUsers(res.data);
      } else {
        toast.error(res.message || 'Users data fetch failed');
      }
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AllUsersContext.Provider value={{ users, fetchUsers, loading }}>
      {children}
    </AllUsersContext.Provider>
  );
};

export const useAllUsers = () => {
  const ctx = useContext(AllUsersContext);
  if (!ctx) throw new Error('useAllUsers context not found');
  return ctx;
};

export default AllUsersContextProvider;
