'use client';

import { useState } from 'react';
import { LuShare2, LuCheck, LuCopy, LuLink } from 'react-icons/lu';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner'; // or your toast lib
import { getPlatforms } from './getPlatforms';
import { cn } from '@/lib/utils';

// ── Share Dialog ──────────────────────────────────────────────────────────────
function ShareDialog({ open, onClose, lesson }) {
  const [copied, setCopied] = useState(false);

  if (!lesson) return null;

  const lessonUrl = encodeURIComponent(
    `${typeof window !== 'undefined' ? window.location.origin : ''}/public-lessons/${lesson._id}`,
  );
  const rawUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/public-lessons/${lesson._id}`;
  const platforms = getPlatforms(lessonUrl, lesson.title);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(rawUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error('Could not copy link');
    }
  }

  function handlePlatformClick(platform) {
    if (platform.note) toast.info(platform.note);
    window.open(
      platform.href,
      '_blank',
      'noopener,noreferrer,width=600,height=500',
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:min-w-120 p-6 gap-5">
        <DialogHeader className="pb-0">
          <DialogTitle className="text-base">Share lesson</DialogTitle>
        </DialogHeader>

        {/* Lesson title preview */}
        <p className="text-xs text-muted-foreground line-clamp-1 -mt-3">
          {lesson.title}
        </p>

        {/* Platform icons */}
        <div className="grid sm:grid-cols-6 grid-cols-4 gap-1">
          {platforms.map((p, index) => {
            const Icon = p.icon;
            return (
              <button
                key={index}
                onClick={() => handlePlatformClick(p)}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-md p-2.5 text-muted-foreground hover:text-primary duration-200 hover:bg-muted',
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] leading-none">{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Copy link row */}
        <div className="flex gap-2">
          <Input
            readOnly
            value={rawUrl}
            className="text-xs h-8 text-muted-foreground bg-muted/40 border-dashed"
          />
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-3 shrink-0"
            onClick={handleCopy}
          >
            {copied ? (
              <LuCheck className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <LuCopy className="h-3.5 w-3.5" />
            )}
            <span className="ml-1.5 text-xs">{copied ? 'Copied' : 'Copy'}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Share Button (drop-in replacement) ───────────────────────────────────────
const ShareButton = ({ lesson }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <LuShare2 />
        <span className="hidden sm:inline">Share</span>
      </Button>

      <ShareDialog open={open} onClose={() => setOpen(false)} lesson={lesson} />
    </>
  );
};

export default ShareButton;
