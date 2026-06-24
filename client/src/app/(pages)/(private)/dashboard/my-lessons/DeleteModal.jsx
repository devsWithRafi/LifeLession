import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertTriangle } from 'lucide-react';

const DeleteModal = ({ lesson, open, onClose }) => {
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
              "{lesson.title}"
            </span>{' '}
            will be permanently removed, including all its stats, comments, and
            reactions.
          </p>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            // onClick={() => {
            //   onConfirm(lesson._id);
            //   onClose();
            // }}
          >
            Delete permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
