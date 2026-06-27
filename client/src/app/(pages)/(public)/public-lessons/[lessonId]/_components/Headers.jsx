import SubscriptionBadge from '@/components/SubscriptionBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { calculateReadingTime } from '@/lib/calculateReadingTime';
import { formatDate } from '@/lib/formatDate';
import { formateNumber } from '@/lib/formateNumber';
import { Clock8, GlobeCheck } from 'lucide-react';
import React from 'react';
import { MdOutlineDateRange, MdOutlineRemoveRedEye } from 'react-icons/md';

const Headers = ({ lesson }) => {
  return (
    <>
      <h1 className="sm:text-3xl text-xl leading-tight font-semibold font-boldonse">
        {lesson.title}
      </h1>
      <div className="flex flex-wrap items-center sm:gap-5 gap-2">
        <span className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm">
          <MdOutlineDateRange className="sm:size-4 size-3" />
          {formatDate(lesson.createdAt)}
        </span>
        <Separator orientation="vertical" />
        <span className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm">
          <MdOutlineRemoveRedEye className="sm:size-4 size-3" />
          {formateNumber(lesson.views)} Views
        </span>
        <Separator orientation="vertical" />
        <span className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm">
          <Clock8 className="sm:size-4 size-3" />
          {calculateReadingTime(lesson.description)} min read
        </span>
        <Separator orientation="vertical" />
        <span className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm">
          <GlobeCheck className="sm:size-4 size-3" />
          {lesson.isPublic ? 'Public' : 'Private'}
        </span>
      </div>

      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <Avatar className="sm:size-13 size-10">
            <AvatarImage src={lesson.author?.image} />
            <AvatarFallback>
              {lesson.author?.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left">
            <h4 className="font-medium flex items-center gap-2">
              {lesson.author?.name}
              {lesson.author?.plan === 'premium' && (
                <SubscriptionBadge className="text-[11px] rounded px-3 h-5">
                  Pro
                </SubscriptionBadge>
              )}
            </h4>
            <p className="text-muted-foreground text-sm">
              {lesson.author?.email}
            </p>
          </div>
        </div>
        <Button>Follow</Button>
      </div>
    </>
  );
};

export default Headers;
