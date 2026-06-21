import SubscriptionBadge from '@/components/SubscriptionBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/formatDate';
import React from 'react';
import { MdOutlineDateRange, MdOutlineRemoveRedEye } from 'react-icons/md';

const Headers = ({ lesson }) => {
  return (
    <>
      <h1 className="sm:text-3xl text-xl leading-tight font-semibold font-boldonse">{lesson.title}</h1>
      <div className="flex items-center gap-5">
        <span className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm">
          <MdOutlineDateRange size={17} />
          {formatDate(lesson.createdAt)}
        </span>
        <Separator orientation="vertical" />
        <span className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm">
          <MdOutlineRemoveRedEye size={17} />
          {lesson.views} Views
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
              {lesson.author?.plan !== 'free' && (
                <SubscriptionBadge>Pro</SubscriptionBadge>
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
