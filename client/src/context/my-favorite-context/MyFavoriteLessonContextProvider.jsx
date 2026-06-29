'use client';

import { useContext, useEffect, useState, useTransition } from 'react';
import { getToken } from '@/lib/auth-client';
import { toast } from 'sonner';
import { MyFavoriteLessonContext } from './MyFavoriteLessonContext';
import { fetchMyFavoriteLessons } from '@/actions/apis/fetchMyFavoriteLessons';

const MyFavoriteLessonContextProvider = ({ children }) => {
  const [myFavoriteLessons, setMyFavoriteLessons] = useState([]);
  const [loading, startLoading] = useTransition();

  const fetchMyFavorites = () => {
    startLoading(async () => {
      const token = await getToken();
      const res = await fetchMyFavoriteLessons(token);
      if (res.success) {
        setMyFavoriteLessons(res.data);
      } else {
        console.log(res.message || 'My favorite lesson data fetch failed');
      }
    });
  };

  useEffect(() => {
    fetchMyFavorites();
  }, []);

  return (
    <MyFavoriteLessonContext.Provider
      value={{ myFavoriteLessons, fetchMyFavorites, loading }}
    >
      {children}
    </MyFavoriteLessonContext.Provider>
  );
};

export const useMyFavoriteLessons = () => {
  const ctx = useContext(MyFavoriteLessonContext);
  if (!ctx) throw new Error('useMyFavoriteLessons context not found');
  return ctx;
};

export default MyFavoriteLessonContextProvider;
