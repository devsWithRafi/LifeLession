import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import React from 'react';

const CommentBox = ({ className }) => {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>Z</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-left">
        <h4 className="font-medium">{'Saiful Islam'}</h4>
        <p className="sm:text-sm text-xs text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, at
          nesciunt sint perspiciatis natus facilis? Nesciunt, ullam sed. Illo
          quos dolorem tempora eum. Impedit, enim quaerat. Placeat, doloremque
          et ipsum voluptas laudantium repellat ullam, voluptatum a perspiciatis
          porro, vitae velit?
        </p>
      </div>
    </div>
  );
};

export default CommentBox;
