"use client"

import { useContext, useEffect, useState, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchOneLesson } from '@/actions/apis/fetchOneLesson';
import { getToken } from '@/lib/auth-client';
import { toast } from 'sonner';
import { LessonContext } from './lesson-context';

const LessonContextProvider = ({ children }) => {
  const [lesson, setLesson] = useState(null);
  const [fetching, startFetching] = useTransition();
  const router = useRouter();
  const { id } = useParams();

  const fetchSingleLesson = () => {
    startFetching(async () => {
      const token = await getToken();
      const result = await fetchOneLesson(id, token);
      if (result && result.success) setLesson(result.data);
      else {
        toast.error(result.message || 'LessonDetails fetch failed');
      }
    });
  };

  useEffect(() => {
    fetchSingleLesson();
  }, [id]);

  return (
    <LessonContext.Provider value={{ lesson, fetchSingleLesson, fetching }}>
      {children}
    </LessonContext.Provider>
  );
};

export const useSingleLesson = () => {
  const context = useContext(LessonContext);
  if (!context) throw new Error('useSingleLesson context not found');
  return context;
};

export default LessonContextProvider;
