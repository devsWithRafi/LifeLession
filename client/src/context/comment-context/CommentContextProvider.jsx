'use client';

import { useContext, useEffect, useState, useTransition } from 'react';
import { CommentContext } from './CommentContext';
import { getToken } from '@/lib/auth-client';
import { fetchLessonComment } from '@/actions/apis/fetchLessonComment';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

const CommentContextProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, startLoading] = useTransition();

  const { lessonId } = useParams();

  const fetchComment = (id) => {
    if (!id) return;
    startLoading(async () => {
      const token = await getToken();
      const result = await fetchLessonComment(id, token);
      if (result?.success) setComments(result.data);
      else {
        toast.error(result?.message || 'LessonDetails fetch failed');
      }
    });
  };

  useEffect(() => {
    fetchComment(lessonId);
  }, [lessonId]);

  return (
    <CommentContext.Provider value={{ comments, fetchComment, loading }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useLessonComment = () => {
  const context = useContext(CommentContext);
  if (!context) throw new Error('useLessonComment context not found');
  return context;
};

export default CommentContextProvider;
