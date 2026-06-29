'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import CommentBox from './CommentBox';
import { useState, useTransition } from 'react';
import { getToken } from '@/lib/auth-client';
import { AddNewCommentAction } from '@/actions/AddNewComment.action';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { useLessonComment } from '@/context/comment-context/CommentContextProvider';

const CommentSection = ({ lesson }) => {
  const [pending, startPending] = useTransition();
  const [comment, setComment] = useState('');
  const { comments, fetchComment } = useLessonComment();

  const handlePostComment = () => {
    if (!comment) {
      return;
    }
    startPending(async () => {
      const token = await getToken();
      const result = await AddNewCommentAction(
        { text: comment, lessonId: lesson._id },
        token,
      );
      if (result.success) {
        toast.success('Comment added');
        fetchComment(lesson._id);
        setComment('');
      } else {
        toast.error(result.message ?? 'Error: posting comment failed');
      }
    });
  };

  return (
    <div>
      <h5>{comments.length} Comments</h5>

      <div className="flex flex-col gap-5 mt-5">
        <div className="w-full relative">
          <Textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Add comment..."
            className="min-h-35 sm:text-sm text-xs  resize-none w-full bg-muted p-5"
          />
          <Button
            disabled={pending || !comment}
            onClick={handlePostComment}
            className="rounded-md px-4 py-2 h-auto absolute right-2 bottom-2 sm:text-sm text-xs"
          >
            {pending ? (
              <>
                <Spinner /> Posting...
              </>
            ) : (
              <>Post Comment</>
            )}
          </Button>
        </div>

        {comments.map((item) => (
          <CommentBox key={item._id} comment={item} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
