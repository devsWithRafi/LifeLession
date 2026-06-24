'use client';
import { DeleteLessonAction } from '@/actions/DeleteLessonAction.action';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { useMyLessons } from '@/context/my-lessons-context/MyLessonContextProvider';
import { getToken } from '@/lib/auth-client';
import { AlertTriangle } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

const DeleteModal = ({ lesson, open, onClose }) => {
  const { fetchMyLessons } = useMyLessons();
  const [loading, startLoading] = useTransition();

  const handleDelete = () => {
    if (!lesson) {
      toast.error('Lesson not found');
      return;
    }
    startLoading(async () => {
      const token = await getToken();
      const result = await DeleteLessonAction(lesson._id, token);
      if (result.success) {
        toast.success(result.message ?? 'Lesson deleted successfully');
        fetchMyLessons();
        onClose();
      } else {
        toast.error(result.message ?? 'Error: deleting lesson failed');
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Delete lesson?</DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                This cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {lesson && (
          <p className="text-sm text-muted-foreground px-1">
            <span className="font-medium text-foreground">
              &quot;{lesson.title}&quot;
            </span>{' '}
            will be permanently removed, including all its stats, comments, and
            reactions.
          </p>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            {loading ? (
              <>
                <Spinner /> Deleting...
              </>
            ) : (
              <>Delete permanently</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
