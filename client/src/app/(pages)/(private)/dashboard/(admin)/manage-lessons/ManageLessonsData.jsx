'use client';

import {
  Globe,
  Crown,
  BookOpen,
  UserRound,
  ShieldCheck,
  Check,
  X,
  Trash,
  MoreHorizontal,
  Info,
  Trash2,
  EyeOff,
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
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/lib/formatDate';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getToken } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { useAllLessons } from '@/context/all-lessons-context/AllLessonsContextProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { UpdateLessonAction } from '@/actions/UpdateLesson.action';
import DeleteLessonModal from '../../../_components/DeleteLessonModal';
import ManageLessonsHeader from './ManageLessonsHeader';

const ManageAllLessonsData = () => {
  const searchParams = useSearchParams();
  const { lessons, fetchLessonsData, loading } = useAllLessons();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [isFeatured, setIsFeatured] = useState({});
  const [updateFeatured, setUpdateFeatured] = useState({
    loading: false,
    lessonId: null,
  });

  useEffect(() => {
    (() => {
      const featured = {};
      lessons.forEach((lesson) => {
        featured[lesson._id] = lesson.isFeatured;
      });
      setIsFeatured(featured);
    })();
  }, [lessons]);

  const filteredLessons = lessons.filter((lesson) => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const emotionalTone = searchParams.get('emotionalTone');
    const plan = searchParams.get('plan');
    return (
      (!search || lesson.title.toLowerCase().includes(search.toLowerCase())) &&
      (!category || lesson.category === category) &&
      (!emotionalTone || lesson.emotionalTone === emotionalTone) &&
      (!plan || lesson.accessLevel === plan)
    );
  });

  const handleDelete = (lesson) => {
    setDeleteModalOpen(true);
    setLessonToDelete(lesson);
  };

  const handleChangeFeatured = async (lesson, value) => {
    setIsFeatured({ ...isFeatured, [lesson._id]: value });
    setUpdateFeatured({ loading: true, lessonId: lesson._id });
    try {
      const token = await getToken();
      const res = await UpdateLessonAction(
        lesson._id,
        { ...lesson, isFeatured: value },
        token,
      );
      if (res.success) {
        toast.success(res.message);
        fetchLessonsData();
      }
    } catch (error) {
      toast.error(error.message);
      return;
    } finally {
      setUpdateFeatured({ loading: false, lessonId: null });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <div className="w-full mx-auto sm:px-6 space-y-8">
          {/* ── Table ── */}
          <ManageLessonsHeader lessons={lessons} />

          {/* content */}
          <Card className={cn('relative p-0')}>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent uppercase">
                      <TableHead className="sm:pl-6 pl-4 w-[250px]">
                        Lesson
                      </TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Visibility</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="pr-6 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredLessons.length === 0 && (
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

                    {filteredLessons.length > 0 &&
                      filteredLessons.map((lesson) => {
                        return (
                          <TableRow
                            key={lesson._id}
                            className={cn(
                              'group',
                              updateFeatured.loading &&
                                updateFeatured.lessonId === lesson._id &&
                                'opacity-50 pointer-events-none',
                            )}
                          >
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

                            {/* Author */}
                            <TableCell>
                              <div className="flex flex-col gap-1.5 text-muted-foreground text-sm">
                                <span>{lesson.author.name}</span>
                              </div>
                            </TableCell>

                            {/* Visibility */}
                            <TableCell>
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium
                            ${
                              lesson.isPublic
                                ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                : 'bg-muted text-muted-foreground'
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
                              </span>
                            </TableCell>

                            {/* Lesson Plan */}
                            <TableCell>
                              <div
                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium font-sans
                                ${
                                  lesson.accessLevel === 'premium'
                                    ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                                    : 'bg-muted text-muted-foreground'
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
                              </div>
                            </TableCell>

                            {/* Featured */}
                            <TableCell>
                              <span>
                                <Switch
                                  checked={isFeatured[lesson._id] || false}
                                  onCheckedChange={(value) =>
                                    handleChangeFeatured(lesson, value)
                                  }
                                />
                              </span>
                            </TableCell>

                            {/* Created */}
                            <TableCell>
                              <span className="text-sm text-muted-foreground">
                                {formatDate(lesson.createdAt)}
                              </span>
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
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="">
                                  <Link href={`/public-lessons/${lesson._id}`}>
                                    <DropdownMenuItem className="p-2 text-xs">
                                      <Info className="size-3.5" />
                                      View details
                                    </DropdownMenuItem>
                                  </Link>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => handleDelete(lesson)}
                                    className="text-destructive focus:text-destructive whitespace-nowrap p-2 text-xs"
                                  >
                                    <Trash2 className="size-3" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* delete lesson modal */}
      <DeleteLessonModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        lesson={lessonToDelete}
      />
    </>
  );
};

export default ManageAllLessonsData;
