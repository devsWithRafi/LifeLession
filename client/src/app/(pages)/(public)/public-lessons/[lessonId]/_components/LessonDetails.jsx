'use client';

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Headers from './Headers';
import LessonDetailsRightSide from './LessonDetailsRightSide';
import { Badge } from '@/components/ui/badge';
import CommentSection from './CommentSection';
import { useSingleLesson } from '@/context/lessonContext/LessonContextProvider';
import LikeButton from './LikeButton';
import SaveButton from './SaveButton';
import ReportButton from './ReportButton';
import ShareButton from './ShareButton';
import { useLessonComment } from '@/context/comment-context/CommentContextProvider';

const LessonDetails = () => {
  const { fetching, lesson } = useSingleLesson();
  const { comments, fetchComment } = useLessonComment();

  console.log(lesson);

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
            <LikeButton />
            <SaveButton />
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
