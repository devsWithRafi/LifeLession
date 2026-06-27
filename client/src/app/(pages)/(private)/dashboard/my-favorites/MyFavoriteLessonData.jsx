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

import { Button, buttonVariants } from '@/components/ui/button';
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

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Spinner } from '@/components/ui/spinner';
import { CardBadgeColors } from '@/components/card/CardBadgeColors';
import { formatDate } from '@/lib/formatDate';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { formateNumber } from '@/lib/formateNumber';
import { useMyFavoriteLessons } from '@/context/my-favorite-context/MyFavoriteLessonContextProvider';
import { getToken, useSession } from '@/lib/auth-client';
import StatPill from '../my-lessons/StatPill';
import MyFavoriteLessonHeader from './MyFavoriteLessonHeader';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { DeleteFavoriteLessonAction } from '@/actions/DeleteFavoriteLesson';

export default function MyFavoriteLessonData() {
  const { data } = useSession();
  const searchParams = useSearchParams();
  const user = data?.user;
  const { myFavoriteLessons, fetchMyFavorites, loading } =
    useMyFavoriteLessons();
  const isPremium = user?.plan === 'premium' || user?.role === 'admin';
  const [removing, startRemoving] = useTransition();

  const filterFavoriteLessons = myFavoriteLessons.filter((item) => {
    const category = searchParams.get('category');
    const emotionalTone = searchParams.get('emotionalTone');
    const title = searchParams.get('title');
    return (
      (!category || item.category === category) &&
      (!emotionalTone || item.emotionalTone === emotionalTone) &&
      (!title || item.title.toLowerCase().includes(title.toLowerCase()))
    );
  });

  const handleRemoveFromFavorite = (lesson) => {
    startRemoving(async () => {
      const token = await getToken();
      const result = await DeleteFavoriteLessonAction(lesson._id, token);
      if (result.success) {
        toast.success('Lesson removed from favorites successfully');
        fetchMyFavorites();
      } else {
        toast.error(
          result.message ?? 'Error: removing lesson from favorites failed',
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full mx-auto sm:px-6 space-y-8">
        {/* ── Table ── */}
        <MyFavoriteLessonHeader />

        <Card
          className={cn(
            'relative p-0',
            removing && 'opacity-50 pointer-events-none select-none',
          )}
        >
          {removing && (
            <div className="flex items-center justify-center absolute w-full h-full z-1">
              <Spinner />
            </div>
          )}

          {/* content */}
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
                  {filterFavoriteLessons.length === 0 && (
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

                  {filterFavoriteLessons.length > 0 &&
                    filterFavoriteLessons.map((lesson) => (
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
                          <button
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
                          </button>
                        </TableCell>

                        {/* Access level toggle */}
                        <TableCell>
                          <button
                            disabled={!isPremium}
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium
                            ${
                              lesson.accessLevel === 'premium'
                                ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                                : 'bg-muted text-muted-foreground hover:bg-accent'
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
                          </button>
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
                                onClick={() => handleRemoveFromFavorite(lesson)}
                                className="text-destructive focus:text-destructive whitespace-nowrap p-2 text-xs"
                              >
                                <Trash2 className="size-3" /> Remove
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
      </div>
    </div>
  );
}
