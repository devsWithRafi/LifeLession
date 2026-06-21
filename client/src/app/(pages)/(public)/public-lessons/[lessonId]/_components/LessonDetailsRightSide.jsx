'use client';

import SubscriptionBadge from '@/components/SubscriptionBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLessonLikes } from '@/context/like-context/LikeContextProvider';
import { cn } from '@/lib/utils';
import { FiHeart } from 'react-icons/fi';
import { FiBookmark } from 'react-icons/fi';

const LessonDetailsRightSide = ({ lesson }) => {
  const { likes, liked } = useLessonLikes();

  return (
    <div className="lg:min-w-100 sm:min-w-60 min-w-full max-w-100 flex flex-col gap-5">
      <Card>
        <CardHeader className="flex items-center justify-center">
          <Avatar className="size-20">
            <AvatarImage src={lesson.author?.image} alt={lesson.author?.name} />
            <AvatarFallback>
              {lesson.author?.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <CardTitle className="flex items-center gap-2">
            {lesson.author?.name}
            {lesson.author?.plan !== 'free' && (
              <SubscriptionBadge>Pro</SubscriptionBadge>
            )}
          </CardTitle>
          <CardDescription className="mt-1">
            {lesson.author?.email}
          </CardDescription>
          <CardDescription>{lesson.author?.bio}</CardDescription>
          <Button variant="outline" className={cn('w-full mt-7 rounded-sm')}>
            View Profile
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Engagement</CardTitle>
        </CardHeader>
        <CardContent
          className={'flex items-center justify-between gap-4 w-full'}
        >
          <span className="flex flex-col items-center justify-center gap-2 w-full">
            <CardTitle
              className={cn(
                'text-2xl',
                liked && 'dark:text-pink-400 text-pink-500',
              )}
            >
              {likes}
            </CardTitle>
            <CardDescription
              className={cn(
                'flex items-center gap-2',
                liked && 'dark:text-pink-400 text-pink-500',
              )}
            >
              <FiHeart size={17} />
              Likes
            </CardDescription>
          </span>
          <span className="flex flex-col items-center justify-center gap-2 w-full">
            <CardTitle className="text-2xl">{lesson.savedBy?.length}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <FiBookmark size={17} />
              Saved
            </CardDescription>
          </span>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonDetailsRightSide;
