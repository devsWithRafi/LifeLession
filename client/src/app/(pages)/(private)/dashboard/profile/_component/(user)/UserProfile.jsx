'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';

import { BookOpen, Bookmark, Edit3, Eye, Star } from 'lucide-react';
import LessonCard from '@/components/card/LessonCard';
import UserProfileUpdateModal from '../UserProfileUpdateModal';
import { authClient } from '@/lib/auth-client';
import { fallBackNameFormat } from '@/lib/falbackNameFormat';
import SubscriptionBadge from '@/components/SubscriptionBadge';

// ─── Mock data ────────────────────────────────────────────────────────────────

const user = {
  _id: '6a34e8e0f6eb18b5a5af6258',
  name: 'Mr Rafi',
  email: 'mrrafixyz@gmail.com',
  emailVerified: true,
  image:
    'https://lh3.googleusercontent.com/a/ACg8ocIsj_LWlWpnGMxa_SpQlaHDjoWV6UMEC7k_NMagBCMCBdJ295UX=s96-c',
  plan: 'premium',
  savedLessons: 12,
};

const myLessons = [
  {
    _id: '1',
    title: 'Kindness is an underestimated strength.',
    description:
      'The ability to care deeply often changes lives more than talent does.',
    category: 'Relationships',
    emotionalTone: 'Realization',
    accessLevel: 'premium',
    views: 684,
    likes: [],
    comments: [],
    createdAt: '2026-06-19T18:45:54.118Z',
    author: {
      _id: '6a34e8e0f6eb18b5a5af6258',
      name: 'Mr Rafi',
      email: 'mrrafixyz@gmail.com',
      emailVerified: true,
      image:
        'https://lh3.googleusercontent.com/a/ACg8ocIsj_LWlWpnGMxa_SpQlaHDjoWV6UMEC7k_NMagBCMCBdJ295UX=s96-c',
      plan: 'premium',
      savedLessons: 12,
    },
  },
  {
    _id: '2',
    title: 'Silence is often the loudest answer.',
    description: "What people don't say reveals more than what they do.",
    category: 'Psychology',
    emotionalTone: 'Reflection',
    accessLevel: 'free',
    views: 222,
    likes: [],
    comments: [],
    createdAt: '2026-06-16T10:22:00.000Z',
    author: {
      _id: '6a34e8e0f6eb18b5a5af6258',
      name: 'Mr Rafi',
      email: 'mrrafixyz@gmail.com',
      emailVerified: true,
      image:
        'https://lh3.googleusercontent.com/a/ACg8ocIsj_LWlWpnGMxa_SpQlaHDjoWV6UMEC7k_NMagBCMCBdJ295UX=s96-c',
      plan: 'premium',
      savedLessons: 12,
    },
  },
  {
    _id: '3',
    title: 'Growth feels uncomfortable by design.',
    description:
      'Every stretch beyond comfort is the body learning to hold more.',
    category: 'Mindset',
    emotionalTone: 'Motivation',
    accessLevel: 'free',
    views: 319,
    likes: [],
    comments: [],
    createdAt: '2026-06-12T08:00:00.000Z',
    author: {
      _id: '6a34e8e0f6eb18b5a5af6258',
      name: 'Mr Rafi',
      email: 'mrrafixyz@gmail.com',
      emailVerified: true,
      image:
        'https://lh3.googleusercontent.com/a/ACg8ocIsj_LWlWpnGMxa_SpQlaHDjoWV6UMEC7k_NMagBCMCBdJ295UX=s96-c',
      plan: 'premium',
      savedLessons: 12,
    },
  },
];

// Sorted newest first (already sorted in mock, but in real use: .sort)
const sortedLessons = [...myLessons].sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
);

export default function UserProfile() {
  const { data } = authClient.useSession();
  const user = data?.user;
  const isPremium = user?.plan === 'premium';
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        {/* Top accent — single signature element, kept tight */}
        <div className="max-w-300 mx-auto space-y-10">
          {/* ── Profile hero ─────────────────────────────────────────────── */}
          <Card className="rounded-2xl overflow-hidden">
            {/* Subtle cover wash */}
            <div className="h-24 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent" />

            <CardContent className="px-6 pb-6 -mt-10">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                {/* Avatar */}
                <div className="relative w-fit">
                  <Avatar className="w-20 h-20 ring-4 ring-background shadow-md text-lg">
                    <AvatarImage src={user?.image} alt="profile" />
                    <AvatarFallback className="text-lg font-semibold">
                      {fallBackNameFormat(user?.email)}
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
              </div>

              <Separator className="my-5" />

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    icon: BookOpen,
                    label: 'Lessons created',
                    value: 10,
                  },
                  {
                    icon: Bookmark,
                    label: 'Lessons saved',
                    value: 10,
                  },
                  {
                    icon: Eye,
                    label: 'Total views',
                    value: 222,
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-0.5 text-center sm:text-left"
                  >
                    <span className="text-2xl font-bold text-foreground">
                      {value}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 justify-center sm:justify-start">
                      <Icon className="w-3 h-3" /> {label}
                    </span>
                  </div>
                ))}
              </div>
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
                  Sorted by newest first · {sortedLessons.length} total
                </p>
              </div>
            </div>

            {sortedLessons.length === 0 ? (
              <Card className="rounded-2xl">
                <CardContent className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                  <BookOpen className="w-10 h-10 text-muted-foreground/40" />
                  <p className="font-medium text-muted-foreground">
                    No lessons yet
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    Your published lessons will appear here.
                  </p>
                  <Button size="sm" className="mt-2 rounded-xl">
                    Create your first lesson
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedLessons.map((lesson) => (
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
