"use client"

import { useContext, useEffect, useState, useTransition } from 'react';
import { MyLessonContext } from './MyLessonContext';
import { fetchProfileLessons } from '@/actions/apis/fetchProfileLessons';
import { getToken } from '@/lib/auth-client';
import { toast } from 'sonner';

const MyLessonContextProvider = ({ children }) => {
  const [myLessons, setMyLessons] = useState([]);
  const [loading, startLoading] = useTransition();

  const fetchMyLessons = () => {
    startLoading(async () => {
      const token = await getToken();
      const res = await fetchProfileLessons(token);
      if (res.success) {
        setMyLessons(res.data);
      } else {
        toast.error(res.message || 'My lesson data fetch failed');
      }
    });
  };

  useEffect(() => {
    fetchMyLessons();
  }, []);

  return (
    <MyLessonContext.Provider value={{ myLessons, fetchMyLessons, loading }}>
      {children}
    </MyLessonContext.Provider>
  );
};

export const useMyLessons = () => {
  const ctx = useContext(MyLessonContext);
  if (!ctx) throw new Error('useMyLessons context not found');
  return ctx;
};

export default MyLessonContextProvider;
