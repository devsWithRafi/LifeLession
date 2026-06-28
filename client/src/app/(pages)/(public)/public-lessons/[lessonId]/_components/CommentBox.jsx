import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const CommentBox = ({ className, comment }) => {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      {comment.user && (
        <Avatar>
          <AvatarImage src={comment.user.image} alt={comment.user.name} />
          <AvatarFallback>
            {comment.user.email.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col text-left">
        <h4 className="font-medium">{comment.user && comment.user.name}</h4>
        <p className="sm:text-sm text-xs text-muted-foreground">
          {comment.text}
        </p>
      </div>
    </div>
  );
};

export default CommentBox;
