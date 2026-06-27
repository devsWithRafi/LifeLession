'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { LiquidMetalButton } from '../ui/liquid-metal-button';
import { BookOpen, Crown, Eye, Heart, MessageCircle, Zap } from 'lucide-react';
import { RiLock2Line } from 'react-icons/ri';
import { formatDate } from '@/lib/formatDate';
import { IoMdTime } from 'react-icons/io';
import { authClient } from '@/lib/auth-client';
import { Badge } from '../ui/badge';
import { fallBackNameFormat } from '@/lib/falbackNameFormat';
import Image from 'next/image';
import { formateNumber } from '@/lib/formateNumber';

const LessonCard = ({ lesson }) => {
  const { data } = authClient.useSession();
  const user = data?.user;
  const isPremium = user?.plan === 'premium' || user?.role === 'admin';
  const isLiked = lesson.likes.some((l) => l.user?._id === user?.id);

  return (
    <Card className={cn('relative')}>
      <CardHeader className={cn('flex justify-between relative')}>
        <LiquidMetalButton
          theme={lesson.accessLevel === 'premium' ? 'gold' : 'silver'}
          variant="default"
          size="sm"
          className={
            'pointer-events-none select-none rounded-full text-xs absolute top-0 shadow-sm z-1'
          }
        >
          <div className="flex items-center gap-1">
            {lesson.accessLevel === 'premium' ? (
              <Crown className="size-3.5" />
            ) : (
              <Zap className="size-3.5" />
            )}
            <span>{lesson.accessLevel.toUpperCase()}</span>
          </div>
        </LiquidMetalButton>

        <div
          className={cn(
            'w-full h-40 rounded overflow-hidden bg-muted relative flex items-center justify-center',
            lesson.accessLevel === 'premium' &&
              !isPremium &&
              'blur-sm select-none pointer-events-none',
          )}
        >
          {lesson.image ? (
            <Image
              src={lesson.image}
              alt={lesson.title}
              fill
              className="w-full h-full object-cover"
            />
          ) : (
            <BookOpen className="size-10 text-muted-foreground" />
          )}
        </div>

        {lesson.accessLevel === 'premium' && !isPremium && (
          <span className="w-full h-full absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
            <RiLock2Line className="size-8 text-white/80" />
          </span>
        )}
      </CardHeader>
      <CardContent className="flex-col flex h-full gap-6">
        <div className="h-full relative flex flex-col gap-5">
          <div className={cn('justify-between flex-col flex h-full')}>
            <div
              className={cn(
                lesson.accessLevel === 'premium' &&
                  !isPremium &&
                  'blur-sm select-none pointer-events-none',
              )}
            >
              <span>
                <CardTitle className="text-3xl font-bold font-playfair italic w-full">
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
            </div>

            <Separator className="my-5" />

            {/* user */}
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Avatar className={'size-7'}>
                  <AvatarImage src={lesson.author.image} />
                  <AvatarFallback>
                    {fallBackNameFormat(lesson.author.email)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm font-semibold leading-none">
                    {lesson.author.name}
                  </h3>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                    <IoMdTime className="size-2.5" />
                    {formatDate(lesson.createdAt)}
                  </span>
                </div>
              </div>

              {/* engagements */}
              <div className="flex items-center gap-5 text-muted-foreground">
                <span className="flex gap-1 items-center text-xs justify-center w-full">
                  <Eye className="size-3.5" />
                  {formateNumber(lesson.views)}
                </span>
                <span
                  className={cn(
                    'flex gap-1 items-center text-xs justify-center w-full',
                    isLiked && 'text-pink-500 dark:text-pink-400',
                  )}
                >
                  <Heart className="size-3.5" />
                  {formateNumber(lesson.likeCount)}
                </span>
                <span className="flex gap-1 items-center text-xs justify-center w-full">
                  <MessageCircle className="size-3.5" />
                  {formateNumber(lesson.commentCount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {lesson.accessLevel === 'premium' && !isPremium ? (
          <Link href={'/pricing'} className="hover:opacity-90 duration-100">
            <LiquidMetalButton
              theme={'gold'}
              variant="default"
              size="sm"
              className={
                'rounded-full h-9 w-full text-sm font-normal pointer-events-none select-none'
              }
            >
              <div className="flex items-center gap-1">
                <RiLock2Line className="size-4" /> Upgrade
              </div>
            </LiquidMetalButton>
          </Link>
        ) : (
          <Link
            href={`/public-lessons/${lesson._id}`}
            className={cn(buttonVariants(), 'h-9 rounded-full')}
          >
            See Details
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default LessonCard;
