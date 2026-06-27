import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { fallBackNameFormat } from '@/lib/falbackNameFormat';
import {
  Mail,
  Share2,
  UserPlus,
  Check,
  Crown,
  BookOpen,
  Eye,
  Heart,
  Bookmark,
  Pencil,
} from 'lucide-react';
import SubscriptionBadge from '@/components/SubscriptionBadge';
import { formateNumber } from '@/lib/formateNumber';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';

const TONE_PALETTE = [
  { text: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500' },
  { text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500' },
  { text: 'text-sky-700 dark:text-sky-400', dot: 'bg-sky-500' },
  { text: 'text-rose-700 dark:text-rose-400', dot: 'bg-rose-500' },
  { text: 'text-violet-700 dark:text-violet-400', dot: 'bg-violet-500' },
];

function toneStyle(tone) {
  let hash = 0;
  for (let i = 0; i < tone.length; i++)
    hash = (hash * 31 + tone.charCodeAt(i)) >>> 0;
  return TONE_PALETTE[hash % TONE_PALETTE.length];
}

const ProfileHeader = ({
  user,
  lessons,
  totalLikes,
  totalSaved,
  totalViews,
}) => {
  const { data } = useSession();
  const currentUser = data?.user;
  const isCurrentUser = currentUser?.id === user?._id;

  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/profile/${user?._id}`,
      );
    } catch (e) {
      toast.error(e || 'Profile url copied failed!');
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const toneCounts = useMemo(() => {
    const counts = {};
    lessons &&
      lessons.forEach((l) => {
        counts[l.emotionalTone] = (counts[l.emotionalTone] || 0) + 1;
      });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  }, [lessons]);

  return (
    <div className="px-1 sm:px-2">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="-mt-12 flex items-end gap-4 sm:-mt-14">
          <Avatar className="h-24 w-24 border-4 border-background shadow-md sm:h-28 sm:w-28">
            <AvatarImage src={user?.image} alt={user?.name} />
            <AvatarFallback className="text-xl font-semibold">
              {fallBackNameFormat(user?.name)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex gap-2 pb-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            aria-label="Copy profile link"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
          </Button>
          {isCurrentUser ? (
            <Link
              href={'/dashboard/profile'}
              className={cn(buttonVariants({ variant: 'outline' }), 'gap-0')}
            >
              <Pencil className="mr-1.5 h-4 w-4" /> Edit Profile
            </Link>
          ) : (
            <Button
              // variant={isFollowing ? 'outline' : 'default'}
              className={cn('gap-0')}
            >
              <UserPlus className="mr-1.5 h-4 w-4" /> Follow
            </Button>
          )}
        </div>
      </div>

      <div className="mt-3">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {user?.name}
          </h1>
          {user?.plan === 'premium' && (
            <SubscriptionBadge>
              <span className="flex items-center gap-1 font-sans">
                <Crown size={12} /> Pro
              </span>
            </SubscriptionBadge>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{user?.bio}</p>
        {user?.email && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Mail className="h-3.5 w-3.5" /> {user.email}
          </p>
        )}
      </div>

      {/* Stat ledger */}
      {lessons && (
        <div className="mt-5 inline-flex flex-wrap items-center sm:gap-x-8 gap-x-2 gap-y-3 rounded-xl border border-border/70 bg-card px-5 py-4 sm:w-auto w-full justify-between">
          <StatItem
            label="Lessons"
            value={lessons.length}
            icon={<BookOpen className="sm:size-4 size-3.5" />}
          />
          <Separator orientation="vertical" className="h-8" />
          <StatItem
            label="Views"
            value={totalViews}
            icon={<Eye className="sm:size-4.5 size-4" />}
          />
          <Separator orientation="vertical" className="h-8" />
          <StatItem
            label="Likes"
            value={totalLikes}
            icon={<Heart className="sm:size-4 size-3.5" />}
          />
          <Separator orientation="vertical" className="h-8" />
          <StatItem
            label="Saves"
            value={totalSaved}
            icon={<Bookmark className="sm:size-4 size-3.5" />}
          />
        </div>
      )}

      {/* Tone signature, derived from this user's actual content */}
      {toneCounts.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Writes mostly:</span>
          {toneCounts.map(([tone, count]) => {
            const style = toneStyle(tone);
            return (
              <span
                key={tone}
                className={cn(
                  'flex items-center gap-1.5 rounded-full border border-border/70 px-2.5 py-1 text-xs capitalize',
                  style.text,
                )}
              >
                <span className={cn('h-1.5 w-1.5 rounded-full', style.dot)} />
                {tone}{' '}
                <span className="text-muted-foreground">&times;{count}</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

function StatItem({ label, value, icon }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-lg font-semibold sm:text-xl">
        {formateNumber(Number(value))}
      </span>
      <span className="sm:text-sm text-xs text-muted-foreground flex items-center gap-1">
        {icon}
        {label}
      </span>
    </div>
  );
}

export default ProfileHeader;
