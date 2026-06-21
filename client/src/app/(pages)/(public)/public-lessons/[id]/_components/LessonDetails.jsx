'use client';

import { fetchOneLesson } from '@/actions/apis/fetchOneLesson';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { authClient, getToken } from '@/lib/auth-client';
import Image from 'next/image';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { FiHeart } from 'react-icons/fi';
import { BiComment } from 'react-icons/bi';
import { FiBookmark } from 'react-icons/fi';
import { LuShare2 } from 'react-icons/lu';
import { FiFlag } from 'react-icons/fi';
import Headers from './Headers';
import CommentBox from './CommentBox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import LessonDetailsRightSide from './LessonDetailsRightSide';
import { Badge } from '@/components/ui/badge';
import CommentSection from './CommentSection';
import { useSingleLesson } from '@/context/lessonContext/LessonContextProvider';
import LikeButton from './LikeButton';
import SaveButton from './SaveButton';
import ReportButton from './ReportButton';
import ShareButton from './ShareButton';

const LessonDetails = () => {
  const { fetching, lesson } = useSingleLesson();

  // console.log(lesson);

  return fetching ? (
    <div>Fetching...</div>
  ) : !lesson ? (
    <div>No data found</div>
  ) : (
    <div className="flex md:flex-row flex-col gap-5 justify-between w-full">
      {/* left side */}
      <div className="w-full flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Badge className="bg-sky-200 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
            {lesson.category}
          </Badge>
          <Badge className="bg-purple-200 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
            {lesson.emotionalTone}
          </Badge>
        </div>

        <Headers lesson={lesson} />

        <Separator />

        {lesson?.image && (
          <div className="w-full aspect-video overflow-hidden rounded-md relative">
            <Image
              fill
              src={lesson.image}
              alt={lesson.title}
              className="select-none pointer-events-none object-cover"
            />
          </div>
        )}
        <p className="sm:text-lg text-sm">{lesson.description}</p>
        <Separator />

        <div className="flex items-center sm:gap-4 gap-2 w-full justify-between">
          <div className="flex items-center sm:gap-4 gap-2 text-muted-foreground">
            <LikeButton lesson={lesson} />
            <SaveButton lesson={lesson} />
            <ShareButton lesson={lesson} />
          </div>
          <div className="flex items-center sm:gap-4 gap-2">
            <ReportButton lesson={lesson} />
          </div>
        </div>

        <Separator />

        <CommentSection lesson={lesson} />
      </div>

      {/* right side */}
      <LessonDetailsRightSide lesson={lesson} />
    </div>
  );
};

export default LessonDetails;
