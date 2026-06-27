'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';

import { BookOpen, Edit3 } from 'lucide-react';
import LessonCard from '@/components/card/LessonCard';
import UserProfileUpdateModal from '../UserProfileUpdateModal';
import { authClient } from '@/lib/auth-client';
import { fallBackNameFormat } from '@/lib/falbackNameFormat';
import SubscriptionBadge from '@/components/SubscriptionBadge';
import { useMyLessons } from '@/context/my-lessons-context/MyLessonContextProvider';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { getRandomCoverImage } from '@/lib/getRandomCover';
import UsersStates from './UsersStates';
import { Spinner } from '@/components/ui/spinner';

export default function UserProfile() {
  const { data } = authClient.useSession();
  const user = data?.user;
  const isPremium = user?.plan === 'premium';
  const [modalOpen, setModalOpen] = useState(false);
  const { loading, myLessons } = useMyLessons();

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        {/* Top accent — single signature element, kept tight */}
        <div className="w-full mx-auto space-y-10">
          {/* ── Profile hero ─────────────────────────────────────────────── */}
          <Card className="rounded-2xl overflow-hidden p-0">
            {/* Subtle cover wash */}
            <div className="h-24 overflow-hidden relative">
              <Image
                src={getRandomCoverImage()}
                alt=""
                fill
                className="w-full h-full object-cover"
              />
            </div>

            <CardContent className="px-6 pb-6 -mt-10">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                {/* Avatar */}
                <div className="relative w-fit">
                  <Avatar className="w-20 h-20 ring-4 ring-background shadow-md text-lg">
                    <AvatarImage src={user?.image} alt="profile" />
                    <AvatarFallback className="text-lg font-semibold">
                      {fallBackNameFormat(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl gap-2"
                    onClick={() => setModalOpen((prev) => !prev)}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit profile
                  </Button>
                </div>
              </div>

              {/* Name + badges */}
              <div className="space-y-2">
                <div className="flex items-center flex-wrap gap-2">
                  <h1 className="text-xl font-bold text-foreground">
                    {user?.name}
                  </h1>
                  {isPremium && <SubscriptionBadge>Premium</SubscriptionBadge>}
                  {user?.emailVerified && (
                    <Badge variant="secondary" className="rounded-full text-xs">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <p className="text-sm text-muted-foreground -mt-1">
                  {user?.bio}
                </p>
              </div>

              <Separator className="my-5" />

              {/* Stats row */}
              <UsersStates />
            </CardContent>
          </Card>

          {/* ── Lessons grid ─────────────────────────────────────────────── */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Public lessons
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Sorted by newest first · {myLessons.length} total
                </p>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center w-full h-70">
                <span className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Spinner /> Loading...
                </span>
              </div>
            ) : myLessons.length < 1 ? (
              <Card className="rounded-2xl">
                <CardContent className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                  <BookOpen className="w-10 h-10 text-muted-foreground/40" />
                  <p className="font-medium text-muted-foreground">
                    No lessons yet
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    Your published lessons will appear here.
                  </p>
                  <Link
                    href={'/dashboard/add-lesson'}
                    className={cn(buttonVariants(), 'mt-2 h-auto py-2 px-4')}
                  >
                    Create your first lesson
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {myLessons.map((lesson) => (
                  <LessonCard key={lesson._id} lesson={lesson} />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* ── Edit profile dialog ───────────────────────────────────────── */}
        <UserProfileUpdateModal open={modalOpen} setOpen={setModalOpen} />
      </div>
    </TooltipProvider>
  );
}
