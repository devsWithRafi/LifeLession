'use client';
import { LikeContext } from './LikeContext';
import { authClient, getToken } from '@/lib/auth-client';
import { useContext, useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useSingleLesson } from '../lessonContext/LessonContextProvider';
import { AddLikeOnLessonAction } from '@/actions/AddLikeOnLessonAction.action';

const LikeContextProvider = ({ children }) => {
  const { data } = authClient.useSession();
  const user = data?.user;
  const { lesson } = useSingleLesson();
  const [loading, startLoading] = useTransition();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const totalLikes = lesson && lesson.likes.length;
    const alreadyLiked =
      lesson && lesson.likes.some((l) => l.user?._id === user?.id);
    setLiked(alreadyLiked);
    setLikes(totalLikes);
  }, [lesson]);

  const handleAddLike = () => {
    startLoading(async () => {
      const token = await getToken();
      const result = await AddLikeOnLessonAction(lesson._id, token);
      if (result.success) {
        setLiked((prev) => !prev);
        setLikes((prev) => (liked ? prev - 1 : prev + 1));
      } else {
        console.log(result.message ?? 'Error: adding like failed');
        setLiked(false);
      }
    });
  };
  return (
    <LikeContext.Provider value={{ loading, likes, liked, handleAddLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLessonLikes = () => {
  const context = useContext(LikeContext);
  if (!context) throw new Error('useLessonLikes context not found');
  return context;
};

export default LikeContextProvider;
