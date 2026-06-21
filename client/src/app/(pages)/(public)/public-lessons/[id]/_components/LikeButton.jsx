'use client';
import { Button } from '@/components/ui/button';
import { FiHeart } from 'react-icons/fi';

const LikeButton = ({ lesson }) => {
  return (
    <Button variant="outline">
      <FiHeart />
      {lesson.likes?.length}
    </Button>
  );
};

export default LikeButton;
