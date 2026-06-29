'use client';

import { useContext, useEffect, useState, useTransition } from 'react';
import { getToken, useSession } from '@/lib/auth-client';
import { toast } from 'sonner';
import { AllUsersContext } from './AllUsersContext';
import { fetchAllUsers } from '@/actions/apis/fetchAllUsers';

const AllUsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, startLoading] = useTransition();
  const { data: session } = useSession();
  const user = session?.user;
  const isAdmin = user?.role === 'admin';

  const fetchUsers = () => {
    startLoading(async () => {
      const token = await getToken();
      const res = await fetchAllUsers(token);
      if (res.success) {
        setUsers(res.data);
      } else {
        // toast.error(res.message || 'Users data fetch failed');
        console.log(res.message || 'Users data fetch failed');
      }
    });
  };

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

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
