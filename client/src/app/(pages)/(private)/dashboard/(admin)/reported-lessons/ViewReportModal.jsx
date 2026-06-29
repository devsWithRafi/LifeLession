'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatDate } from '@/lib/formatDate';
import { cn } from '@/lib/utils';
import {
  Flag,
  Ban,
  TriangleAlert,
  ShieldAlert,
  BadgeAlert,
  Copyright,
  EyeOff,
  CircleHelp,
} from 'lucide-react';
import DeleteLessonModal from '../../../_components/DeleteLessonModal';
import { useState, useTransition } from 'react';
import { getToken } from '@/lib/auth-client';
import { DeleteAllReportsAction } from '@/actions/DeleteAllReportsAction';
import { useAllLessons } from '@/context/all-lessons-context/AllLessonsContextProvider';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

const reportColors = {
  spam: 'border-amber-500/30 bg-amber-500/10 text-amber-600 border dark:border-amber-400/30 dark:bg-amber-400/5 dark:text-amber-300',

  harmful:
    'border-red-500/30 bg-red-500/10 text-red-600 border dark:border-red-400/30 dark:bg-red-400/5 dark:text-red-300',

  hateful:
    'border-pink-500/30 bg-pink-500/10 text-pink-600 border dark:border-pink-400/30 dark:bg-pink-400/5 dark:text-pink-300',

  misinformation:
    'border-orange-500/30 bg-orange-500/10 text-orange-600 border dark:border-orange-400/30 dark:bg-orange-400/5 dark:text-orange-300',

  copyright:
    'border-sky-500/30 bg-sky-500/10 text-sky-600 border dark:border-sky-400/30 dark:bg-sky-400/5 dark:text-sky-300',

  inappropriate:
    'border-violet-500/30 bg-violet-500/10 text-violet-600 border dark:border-violet-400/30 dark:bg-violet-400/5 dark:text-violet-300',

  other:
    'border-slate-500/30 bg-slate-500/10 text-slate-600 border dark:border-slate-400/30 dark:bg-slate-400/5 dark:text-slate-300',
};

const reportIcons = {
  spam: Ban,
  harmful: TriangleAlert,
  hateful: ShieldAlert,
  misinformation: BadgeAlert,
  copyright: Copyright,
  inappropriate: EyeOff,
  other: CircleHelp,
};

function shortId(id) {
  return id ? `${id.slice(0, 6)}…${id.slice(-4)}` : '—';
}

const ViewReportModal = ({ lesson, open, onClose }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isPending, startPending] = useTransition();
  const { fetchLessonsData } = useAllLessons();

  const handleIgnorAll = () => {
    startPending(async () => {
      const token = await getToken();
      const res = await DeleteAllReportsAction(lesson._id, token);
      if (res.success) {
        toast.success(res.message ?? 'Reports deleted successfully');
        fetchLessonsData();
        onClose();
      }
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className={cn(
            'sm:min-w-130 sm:p-5',
            isPending && 'opacity-40 pointer-events-none select-none',
          )}
        >
          {isPending && (
            <span className="w-full h-full flex items-center justify-center absolute top-0 left-0 right-0 bottom-0">
              <Spinner />
            </span>
          )}

          <DialogHeader className="flex flex-row items-center gap-4 justify-between">
            <span className="flex flex-col gap-1">
              <DialogTitle>&quot;{lesson?.title}&quot;</DialogTitle>
              <DialogDescription>
                Lesson ID: {shortId(lesson?._id)}
              </DialogDescription>
            </span>
            <span className="inline-flex whitespace-nowrap items-center gap-2 bg-red-500/20 text-red-600 font-medium rounded-full text-xs px-3 py-1">
              <Flag className="size-3.5" /> {lesson?.reports?.length} Reports
            </span>
          </DialogHeader>

          <div className="flex flex-col gap-4 h-100 overflow-y-auto p-0.5">
            {lesson?.reports &&
              lesson?.reports.map((item) => {
                const Icon = reportIcons[item.reason.toLowerCase()];
                const color = reportColors[item.reason.toLowerCase()];
                return (
                  <Card
                    key={item._id}
                    className={cn('w-full rounded-md min-h-40')}
                  >
                    <CardHeader className="flex items-center justify-between gap-5">
                      <span
                        className={cn(
                          color,
                          'inline-flex items-center font-sans gap-2 rounded-full sm:text-sm text-xs sm:px-4 px-2 sm:py-1 py-0.5 capitalize',
                        )}
                      >
                        <Icon className="sm:size-3.5 size-3" />
                        {item.reason}
                      </span>
                      <CardDescription className="sm:text-sm text-xs">
                        {formatDate(item.createdAt)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CardTitle>{item.reportedUserEmail}</CardTitle>
                      <CardDescription>{item.details}</CardDescription>
                      <CardDescription className="font-normal mt-5 font-sans">
                        Reported by{' '}
                        <span className="text-primary">
                          {shortId(item.reporter)}
                        </span>
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
          </div>

          <div className="flex items-center gap-3 justify-between">
            <Button
              onClick={handleIgnorAll}
              variant="outline"
              className={'grow rounded-md px-3 h-auto py-2.5'}
            >
              Ignore All
            </Button>
            <Button
              onClick={() => setDeleteModalOpen(true)}
              variant="destructive"
              className={'grow rounded-md px-3 h-auto py-2.5'}
            >
              Delete Lesson
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* delete lesson modal */}
      <DeleteLessonModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        lesson={lesson}
      />
    </>
  );
};

export default ViewReportModal;
