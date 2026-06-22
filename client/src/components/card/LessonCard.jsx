'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Separator } from '../ui/separator';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { BiComment } from 'react-icons/bi';
import { RiShareBoxFill } from 'react-icons/ri';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { LiquidMetalButton } from '../ui/liquid-metal-button';
import { Crown, Zap } from 'lucide-react';
import { RiLock2Line } from 'react-icons/ri';
import { formatDate } from '@/lib/formatDate';
import { IoMdTime } from 'react-icons/io';
import { FiHeart } from 'react-icons/fi';
import { authClient } from '@/lib/auth-client';
import { Badge } from '../ui/badge';

const LessonCard = ({ lesson }) => {
  const { data } = authClient.useSession();
  const user = data?.user;
  const isPremium = user?.plan === 'premium' || user?.role === 'admin';
  const isLiked = lesson.likes.some((l) => l.user?._id === user?.id);

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <LiquidMetalButton
          theme={lesson.accessLevel === 'premium' ? 'gold' : 'silver'}
          variant="default"
          size="sm"
          className={'pointer-events-none select-none rounded-full'}
        >
          <div className="flex items-center">
            {lesson.accessLevel === 'premium' ? (
              <Crown className="mr-2 h-4 w-4" />
            ) : (
              <Zap className="mr-2 h-4 w-4" />
            )}
            <span>{lesson.accessLevel.toUpperCase()}</span>
          </div>
        </LiquidMetalButton>
      </CardHeader>
      <CardContent className="flex-col flex h-full gap-6">
        <div className="h-full relative">
          <div
            className={cn(
              'justify-between flex-col flex h-full',
              lesson.accessLevel === 'premium' &&
                !isPremium &&
                'blur-md select-none',
            )}
          >
            <span>
              <CardTitle className="text-4xl font-bold font-playfair italic w-full">
                {`"${lesson.title}"`}
              </CardTitle>
              <CardDescription className="font-roboto mt-2">
                {lesson.description.length > 130
                  ? lesson.description.slice(0, 130) + '...'
                  : lesson.description}
              </CardDescription>
            </span>

            <div className="flex items-center gap-3 mt-5">
              <Badge className="bg-sky-200 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                {lesson.category}
              </Badge>
              <Badge className="bg-purple-200 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                {lesson.emotionalTone}
              </Badge>
            </div>

            <div className="flex gap-5 justify-between bg-muted py-4 rounded mt-5 text-muted-foreground">
              <span
                className={cn(
                  'flex gap-2 items-center text-sm justify-center w-full',
                  isLiked && 'text-pink-500 dark:text-pink-400',
                )}
              >
                <FiHeart />
                {lesson.likes.length}
              </span>
              <Separator orientation="vertical" />
              <span className="flex gap-2 items-center text-sm justify-center w-full">
                <BiComment className="size-4" />
                {lesson.comments.length}
              </span>
              <Separator orientation="vertical" />
              <span className="flex gap-2 items-center text-sm justify-center w-full">
                <MdOutlineRemoveRedEye className="size-4.5" />
                {lesson.views}
              </span>
              <Separator orientation="vertical" />
              <span className="flex gap-2 items-center text-sm justify-center w-full">
                <RiShareBoxFill className="size-4" />
              </span>
            </div>
          </div>

          {lesson.accessLevel === 'premium' && !isPremium && (
            <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center cursor-not-allowed">
              <span className="p-5 rounded-full bg-muted">
                <RiLock2Line className="size-10 text-muted-foreground" />
              </span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Avatar className={'size-10'}>
              <AvatarImage src={lesson.author.image} />
              <AvatarFallback>{lesson.author.email.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold leading-none">
                {lesson.author.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {lesson.author.email.length > 20
                  ? lesson.author.email.slice(0, 20) + '...'
                  : lesson.author.email}
              </p>
            </div>
          </div>

          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <IoMdTime />
            {formatDate(lesson.createdAt)}
          </span>
        </div>

        <Link
          href={`public-lessons/${lesson._id}`}
          className={cn(
            buttonVariants(),
            'h-auto py-2 rounded',
            lesson.accessLevel === 'premium' &&
              !isPremium &&
              'pointer-events-none select-none opacity-20',
          )}
        >
          {lesson.accessLevel === 'premium' && !isPremium
            ? 'Upgrade to Unlock'
            : 'See Details'}
        </Link>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
