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
import { useSingleLesson } from '@/context/lessonContext/LessonContextProvider';

const CommentSection = ({ lesson }) => {
  const [pending, startPending] = useTransition();
  const [comment, setComment] = useState('');
  const { fetchSingleLesson } = useSingleLesson();

  const handlePostComment = () => {
    if (!comment) {
      toast.warning('Comment box is empty');
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
        fetchSingleLesson();
        setComment('');
      } else {
        toast.error(result.message ?? 'Error: posting comment failed');
      }
    });
  };

  return (
    <div>
      <h5>{lesson.comments?.length} Comments</h5>

      <div className="flex flex-col gap-5 mt-5">
        <Card>
          <CardHeader>
            <CardTitle>Add Your Comment</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:gap-5 gap-2 items-end">
            <Textarea
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              placeholder="What did this lesson help you to learn?"
              className="sm:min-h-40 min-h-25 sm:text-sm text-xs"
            />
            <Button
              disabled={pending}
              onClick={handlePostComment}
              className="rounded-full px-4"
            >
              {pending ? (
                <>
                  <Spinner /> Posting...
                </>
              ) : (
                <>Post Comment</>
              )}
            </Button>
          </CardContent>
        </Card>

        {lesson.comments.map((item) => (
          <CommentBox key={item._id} comment={item} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
