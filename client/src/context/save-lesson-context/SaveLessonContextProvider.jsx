'use client';

import { SaveLessonAction } from '@/actions/SaveLessonAction.action';
import { authClient, getToken } from '@/lib/auth-client';
import { useContext, useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { SaveLessonContext } from './SaveLessonContext';
import { useSingleLesson } from '../lessonContext/LessonContextProvider';

const SaveLessonContextProvider = ({ children }) => {
  const { data } = authClient.useSession();
  const { lesson } = useSingleLesson();
  const user = data?.user;
  const [loading, startLoading] = useTransition();

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const alreadySaved =
      lesson && lesson.savedBy.some((s) => s.user?._id === user?.id);
    setSaved(alreadySaved);
  }, [lesson]);

  const handleSaveLesson = () => {
    startLoading(async () => {
      const token = await getToken();
      const result = await SaveLessonAction(lesson._id, token);
      if (result.success) {
        setSaved((prev) => !prev);
        toast.success(result.message ?? 'Lesson saved successfully');
      } else {
        toast.error(result.message ?? 'Error: adding like failed');
        setSaved(false);
      }
    });
  };
  return (
    <SaveLessonContext.Provider value={{ handleSaveLesson, saved, loading }}>
      {children}
    </SaveLessonContext.Provider>
  );
};

export const useSavedLesson = () => {
  const context = useContext(SaveLessonContext);
  if (!context) throw new Error('useSavedLesson context not found');
  return context;
};

export default SaveLessonContextProvider;
