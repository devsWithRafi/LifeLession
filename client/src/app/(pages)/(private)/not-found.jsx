import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Home, MoveLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import GoBackButton from '@/components/GoBackButton';

export const metadata = {
  title: 'LifeLesson | 404 - Not Found',
  description: '',
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      <span
        className="pointer-events-none absolute select-none text-[clamp(160px,40vw,320px)] font-black leading-none text-muted-foreground/10 dark:text-muted-foreground/[0.07]"
        aria-hidden="true"
      >
        404
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-md">
        {/* Eyebrow */}
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Page not found
        </p>

        {/* Headline */}
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          This page doesn&apos;t exist
        </h1>

        <Separator className="w-12" />

        {/* Body */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          The page you&apos;re looking for may have been moved, deleted, or
          never existed. Double-check the URL or head back home.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/" className={cn(buttonVariants(), "rounded h-auto py-2.5 px-4")}>
            <Home className="size-4" />
            Go Home
          </Link>
          <GoBackButton>
            <Button variant="outline" className="cursor-pointer rounded h-auto py-2.5 px-4">
              <MoveLeft className="size-4" />
              Go back
            </Button>
          </GoBackButton>
        </div>
      </div>
    </div>
  );
}
