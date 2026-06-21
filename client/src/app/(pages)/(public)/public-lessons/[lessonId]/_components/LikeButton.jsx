'use client';

import { AddLikeOnLessonAction } from '@/actions/AddLikeOnLessonAction.action';
import { Button } from '@/components/ui/button';
import { getToken } from '@/lib/auth-client';
import { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { toast } from 'sonner';

const LikeButton = ({ lesson }) => {
  const [likes, setLikes] = useState(lesson.likes?.length);
  const handleAddLike = async () => {
    const token = await getToken();
    const result = await AddLikeOnLessonAction(lesson._id, token);
    if (!result.success) {
      toast.error(result.message ?? 'Error: adding like failed');
      return;
    }
  };
  return (
    <Button onClick={handleAddLike} variant="outline">
      <FiHeart />
      {likes}
    </Button>
  );
};

export default LikeButton;
