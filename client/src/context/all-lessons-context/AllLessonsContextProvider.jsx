'use client';

import { useContext, useEffect, useState, useTransition } from 'react';
import { fetchLessons } from '@/actions/apis/fetchLessons';
import { AllLessonsContext } from './AllLessonsContext';

const AllLessonsContextProvider = ({ children }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, startLoading] = useTransition();

  const fetchLessonsData = () => {
    startLoading(async () => {
      const res = await fetchLessons();
      if (res.success) {
        setLessons(res.data);
      } else {
        console.log(res.message || 'Lessons data fetch failed');
      }
    });
  };

  useEffect(() => {
    fetchLessonsData();
  }, []);

  return (
    <AllLessonsContext.Provider value={{ lessons, fetchLessonsData, loading }}>
      {children}
    </AllLessonsContext.Provider>
  );
};

export const useAllLessons = () => {
  const ctx = useContext(AllLessonsContext);
  if (!ctx) throw new Error('useAllLessons context not found');
  return ctx;
};

export default AllLessonsContextProvider;
