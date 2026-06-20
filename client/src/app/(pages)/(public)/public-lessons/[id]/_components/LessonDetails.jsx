'use client';

import { fetchOneLesson } from '@/actions/apis/fetchOneLesson';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { authClient, getToken } from '@/lib/auth-client';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import LessonDetailsRightSide from './LessonDetailsRightSide';

const LessonDetails = () => {
  const [lesson, setLesson] = useState({});
  const { id } = useParams();
  const [fetching, startFetching] = useTransition();

  const fetchLesson = () => {
    startFetching(async () => {
      const token = await getToken();
      const result = await fetchOneLesson(id, token);
      if (result && result.success) setLesson(result.data);
      else toast.error(result.message || 'LessonDetails fetch failed');
    });
  };

  useEffect(() => {
    fetchLesson();
  }, [id]);

  console.log(lesson);

  if (!lesson) {
    return notFound();
  }

  return (
    <div className="flex md:flex-row flex-col gap-5 justify-between w-full">
      {/* left side */}
      <div className="w-full flex flex-col gap-5">
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
            <Button variant="outline">
              <FiHeart />
              {lesson.likes?.length}
            </Button>
            <Button variant="outline">
              <BiComment />
              {lesson.comments?.length}
            </Button>
            <Button variant="outline">
              <FiBookmark />
              <span className="hidden sm:inline">Save</span>
            </Button>
          </div>
          <div className="flex items-center sm:gap-4 gap-2">
            <Button variant="outline">
              <LuShare2 />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="destructive">
              <FiFlag />
              <span className="hidden sm:inline">Report</span>
            </Button>
          </div>
        </div>

        <Separator />

        <div>
          <h5>{lesson.comments?.length} Comments</h5>

          <div className="flex flex-col gap-5 mt-5">
            <Card>
              <CardHeader>
                <CardTitle>Add Your Comment</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:gap-5 gap-2 items-end">
                <Textarea
                  placeholder="What did this lesson help you to learn?"
                  className="sm:min-h-40 min-h-25 sm:text-sm text-xs"
                />
                <Button>Post Comment</Button>
              </CardContent>
            </Card>

            <CommentBox />
            <CommentBox />
          </div>
        </div>
      </div>

      {/* right side */}
      <LessonDetailsRightSide lesson={lesson} />
    </div>
  );
};

export default LessonDetails;
