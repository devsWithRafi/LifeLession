'use client';

import { useState } from 'react';
import {
  Eye,
  EyeOff,
  Trash2,
  Pencil,
  Info,
  Heart,
  Bookmark,
  Calendar,
  Globe,
  Crown,
  MoreHorizontal,
  BookOpen,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DeleteModal from './DeleteModal';
import { useMyLessons } from '@/context/my-lessons-context/MyLessonContextProvider';
import Image from 'next/image';
import { getToken, useSession } from '@/lib/auth-client';
import Link from 'next/link';
import { Spinner } from '@/components/ui/spinner';
import { CardBadgeColors } from '@/components/card/CardBadgeColors';
import { formatDate } from '@/lib/formatDate';
import StatPill from './StatPill';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { UpdateLessonAction } from '@/actions/UpdateLesson.action';
import { formateNumber } from '@/lib/formateNumber';

export default function MyLessonsPage() {
  const { data } = useSession();
  const user = data?.user;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLesson, setDeleteLesson] = useState(null);
  const { myLessons, fetchMyLessons, loading } = useMyLessons();
  const isPremium = user?.plan === 'premium' || user?.role === 'admin';

  const initialEdit = { type: '', loading: false, lessonId: null };
  const [editLoading, startEditLoading] = useState(initialEdit);

  // Summary stats
  const totalViews = myLessons.reduce((s, l) => s + l.views, 0);
  const totalLikes = myLessons.reduce((s, l) => s + l.likeCount, 0);
  const totalSaves = myLessons.reduce((s, l) => s + l.savedCount, 0);

  const summary = [
    { label: 'Lessons', value: formateNumber(myLessons.length), icon: BookOpen },
    { label: 'Total views', value: formateNumber(totalViews), icon: Eye },
    { label: 'Reactions', value: formateNumber(totalLikes), icon: Heart },
    { label: 'Saves', value: formateNumber(totalSaves), icon: Bookmark },
  ];

  const handleEditLesson = async (lesson, type) => {
    const updatedValue = { ...lesson };
    if (type === 'access') {
      if (!isPremium) {
        toast.error('You need to be a premium user to change this access type');
        return;
      } else {
        updatedValue.accessLevel =
          lesson.accessLevel === 'free' ? 'premium' : 'free';
      }
    }
    if (type === 'visibility') {
      updatedValue.isPublic = lesson.isPublic === true ? false : true;
    }
    try {
      startEditLoading({ type, loading: true, lessonId: lesson._id });
      const token = await getToken();
      const result = await UpdateLessonAction(lesson._id, updatedValue, token);
      if (result.success) {
        toast.success(result.message ?? 'Lesson updated successfully');
        fetchMyLessons(token);
      }
    } catch (error) {
      toast.error(error.message);
      return;
    } finally {
      startEditLoading(initialEdit);
    }
  };

  const handleDelete = (lesson) => {
    setDeleteModalOpen(true);
    setDeleteLesson(lesson);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full mx-auto sm:px-6 space-y-8">
        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {summary.map(({ label, value, icon: Icon }) => (
            <Card key={label} className="py-0">
              <CardContent className="sm:p-5 p-3 flex items-center gap-3">
                <div className="flex sm:p-4 p-3 aspect-square shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="sm:text-xl text-sm font-bold tabular-nums leading-none">
                    {value}
                  </p>
                  <p className="sm:text-sm text-xs text-muted-foreground mt-0.5">
                    {label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Table ── */}
        <Card
          className={cn("p-0",
            editLoading.loading && 'opacity-30 pointer-events-none select-none',
          )}
        >
          <CardHeader className="py-3">
            <CardTitle className="sm:text-base text-sm">All lessons</CardTitle>
            <CardDescription>
              Manage visibility, access, and content for each lesson.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="sm:pl-6 pl-4 w-[250px]">
                      Lesson
                    </TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Visibility</TableHead>
                    <TableHead>Access</TableHead>
                    <TableHead>Stats</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="pr-6 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {myLessons.length === 0 && (
                    <TableRow>
                      {loading ? (
                        <TableCell colSpan={10} className="h-32 text-center">
                          <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <Spinner /> Loading...
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell colSpan={7} className="h-32 text-center">
                          <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <BookOpen className="h-8 w-8 opacity-30" />
                            <p className="text-sm">
                              No lessons yet. Create your first one!
                            </p>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  )}

                  {myLessons.length > 0 &&
                    myLessons.map((lesson) => (
                      <TableRow key={lesson._id} className="group">
                        {/* Title + description */}
                        <TableCell className="sm:pl-6 pl-4 py-4">
                          <div className="flex items-center gap-3 relative">
                            {lesson.image ? (
                              <div className="w-10 max-w-10 h-10 aspect-square rounded-md overflow-hidden border relative">
                                <Image
                                  src={lesson.image}
                                  fill
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="h-10 w-10 shrink-0 rounded-md bg-muted flex items-center justify-center">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                            <div className="flex flex-col">
                              <p className="text-sm font-medium">
                                {lesson.title.length > 15
                                  ? lesson.title.slice(0, 25) + '...'
                                  : lesson.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {lesson.description.length > 25
                                  ? lesson.description.slice(0, 25) + '...'
                                  : lesson.description}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Category + tone */}
                        <TableCell>
                          <div className="flex flex-col gap-1.5">
                            <span
                              className={`inline-flex w-fit items-center rounded-full px-3 py-1 sm:text-xs text-[10px] font-medium 
                             ${
                               CardBadgeColors.category[
                                 lesson.category
                                   .toLowerCase()
                                   .replaceAll(' ', '_')
                               ] ?? 'bg-muted text-muted-foreground'
                             }`}
                            >
                              {lesson.category}
                            </span>
                          </div>
                        </TableCell>

                        {/* Visibility toggle */}
                        <TableCell>
                          <TooltipProvider delayDuration={200}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() =>
                                    handleEditLesson(lesson, 'visibility')
                                  }
                                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer border
                                  ${
                                    lesson.isPublic
                                      ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/40'
                                      : 'bg-muted text-muted-foreground border-border hover:bg-accent'
                                  }`}
                                >
                                  {lesson.isPublic ? (
                                    <>
                                      <Globe className="h-3 w-3" /> Public
                                    </>
                                  ) : (
                                    <>
                                      <EyeOff className="h-3 w-3" /> Private
                                    </>
                                  )}
                                  {editLoading.lessonId === lesson._id &&
                                    editLoading.type === 'visibility' &&
                                    editLoading.loading && (
                                      <Spinner className="h-3 w-3" />
                                    )}
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="text-xs">
                                Click to make{' '}
                                {lesson.isPublic ? 'private' : 'public'}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>

                        {/* Access level toggle */}
                        <TableCell>
                          <TooltipProvider delayDuration={200}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() =>
                                    handleEditLesson(lesson, 'access')
                                  }
                                  disabled={!isPremium}
                                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors border
                                  ${
                                    lesson.accessLevel === 'premium'
                                      ? 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800 dark:hover:bg-yellow-900/40 cursor-pointer'
                                      : 'bg-muted text-muted-foreground border-border hover:bg-accent cursor-pointer'
                                  }
                                  disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                  {lesson.accessLevel === 'premium' ? (
                                    <>
                                      <Crown className="h-3 w-3" /> Premium
                                    </>
                                  ) : (
                                    <>
                                      <Globe className="h-3 w-3" /> Free
                                    </>
                                  )}
                                  {editLoading.lessonId === lesson._id &&
                                    editLoading.type === 'access' &&
                                    editLoading.loading && (
                                      <Spinner className="h-3 w-3" />
                                    )}
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="text-xs">
                                {isPremium
                                  ? `Click to set as ${lesson.accessLevel === 'free' ? 'premium' : 'free'}`
                                  : 'Upgrade to change access level'}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>

                        {/* Stats */}
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <StatPill
                              icon={Eye}
                              value={formateNumber(lesson.views)}
                              label="Views"
                            />
                            <StatPill
                              icon={Heart}
                              value={formateNumber(lesson.likeCount)}
                              label="Likes"
                            />
                            <StatPill
                              icon={Bookmark}
                              value={formateNumber(lesson.savedCount)}
                              label="Saves"
                            />
                          </div>
                        </TableCell>

                        {/* Created */}
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(lesson.createdAt)}
                          </div>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="pr-6 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-60 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44">
                              <Link href={`/public-lessons/${lesson._id}`}>
                                <DropdownMenuItem>
                                  <Info className="h-4 w-4 mr-2" /> 
                                  View details
                                </DropdownMenuItem>
                              </Link>
                              <Link
                                href={`/dashboard/my-lessons/edit/${lesson._id}`}
                              >
                                <DropdownMenuItem>
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Edit lesson
                                </DropdownMenuItem>
                              </Link>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDelete(lesson)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Delete modal */}
        <DeleteModal
          lesson={deleteLesson}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />
      </div>
    </div>
  );
}
