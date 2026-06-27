'use client';

import SubscriptionBadge from '@/components/SubscriptionBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Check, MessageCircle } from 'lucide-react';
import { FiHeart } from 'react-icons/fi';
import { useLessonLikes } from '@/context/like-context/LikeContextProvider';
import { useLessonComment } from '@/context/comment-context/CommentContextProvider';
import LessonDetailsRightSmiliers from './LessonDetailsRightSmiliers';
import { formatDate } from '@/lib/formatDate';

const LessonDetailsRightSide = ({ lesson }) => {
  const { likes, liked } = useLessonLikes();
  const { comments } = useLessonComment();

  return (
    <div className="lg:min-w-100 md:min-w-60 min-w-full max-w-100 flex flex-col gap-5">
      {/* LESSON DETAILS */}
      <Card>
        <CardHeader>
          <CardTitle>Lesson Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 capitalize">
          <CardDescription className="w-full flex items-center justify-between">
            Visibility
            <span className="text-primary">
              {lesson.isPublic ? 'Public' : 'Private'}
            </span>
          </CardDescription>
          <CardDescription className="w-full flex items-center justify-between">
            Access
            <span className="text-primary flex items-center gap-1">
              <Check size={15} /> {lesson.accessLevel}
            </span>
          </CardDescription>
          <CardDescription className="w-full flex items-center justify-between">
            Published
            <span className="text-primary">{formatDate(lesson.createdAt)}</span>
          </CardDescription>
          <CardDescription className="w-full flex items-center justify-between">
            Read time
            <span className="text-primary">5 min</span>
          </CardDescription>
        </CardContent>
      </Card>

      {/* CREATOR INFO */}
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
              <SubscriptionBadge className="text-[11px] rounded px-3 h-5">
                Pro
              </SubscriptionBadge>
            )}
          </CardTitle>
          <CardDescription className="mt-1">
            {lesson.author?.email}
          </CardDescription>
          <CardDescription>{lesson.author?.bio}</CardDescription>
          <Link
            href={`/profile/${lesson.author?._id}`}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'w-full mt-7 rounded-sm',
            )}
          >
            View Profile
          </Link>
        </CardContent>
      </Card>

      {/* ENGAGEMENTS  */}
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
            <CardTitle className="text-2xl">{comments.length}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <MessageCircle size={17} />
              Comments
            </CardDescription>
          </span>
        </CardContent>
      </Card>

      {/* RELETED LESSONS */}
      <LessonDetailsRightSmiliers lesson={lesson} />
    </div>
  );
};

export default LessonDetailsRightSide;
