'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useLessonLikes } from '@/context/like-context/LikeContextProvider';
import { cn } from '@/lib/utils';
import { FiHeart } from 'react-icons/fi';

const LikeButton = ({ className }) => {
  const { loading, likes, liked, handleAddLike } = useLessonLikes();

  return (
    <Button
      onClick={handleAddLike}
      variant="outline"
      className={cn(
        liked &&
          'border-pink-300 dark:border-pink-300/40 text-pink-500 dark:text-pink-400 bg-pink-500/10 dark:bg-pink-500/10',
        className,
      )}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <FiHeart /> <span className="hidden sm:inline">{likes}</span>
        </>
      )}
    </Button>
  );
};

export default LikeButton;
