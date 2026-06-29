'use client';
import React, { useContext, useEffect, useState, useTransition } from 'react';
import { UserProfileContext } from './UserProfileContext';
import { authClient, getToken } from '@/lib/auth-client';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { fetchUserProfile } from '@/actions/apis/fetchUserProfile';
import { toast } from 'sonner';

const UserProfileContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [loading, startLoading] = useTransition();
  const { userProfileId } = useParams();
  const { data } = authClient.useSession();
  const user = data?.user;
  const pathname = usePathname();

  const userId = pathname === '/profile' ? user?.id : userProfileId || null;

  const fetchUserProfileData = () => {
    if (!userId) return;
    startLoading(async () => {
      const token = await getToken();
      const res = await fetchUserProfile(userId, token);
      if (res.success) {
        setUserData(res.data);
      } else {
        console.log(res.message || 'User profile data load failed!');
        return;
      }
    });
  };

  useEffect(() => {
    fetchUserProfileData();
  }, [userId]);

  return (
    <UserProfileContext.Provider
      value={{ loading, userData, fetchUserProfileData }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfileData = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('User profile data context not found!');
  }
  return context;
};

export default UserProfileContextProvider;
