import Link from 'next/link';
import { Suspense } from 'react';
import { CircleAlert } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { redirect } from 'next/navigation';

async function ErrorContent({ searchParams }) {
  const { reason, session_id } = await searchParams;

  if (!session_id) redirect('/');

  const isCancelled = reason === 'cancelled' || reason === 'canceled';

  const title = isCancelled ? 'Payment cancelled' : 'Payment failed';
  const description = isCancelled
    ? 'You cancelled the checkout before it completed. No charge was made.'
    : 'Something went wrong and your payment did not go through. No charge was made.';

  return (
    <Card className="w-full max-w-md border-border/60 shadow-sm">
      <CardContent className="flex flex-col items-center gap-6 px-6 py-10 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 ring-1 ring-inset ring-destructive/20">
          <CircleAlert className="size-7 text-destructive" strokeWidth={2} />
        </div>

        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {title}
          </CardTitle>
          <CardDescription className="text-balance">
            {description}
          </CardDescription>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Link
            href="/pricing"
            className={cn(buttonVariants(), 'w-full rounded')}
          >
            Try again
          </Link>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'w-full rounded',
            )}
          >
            Back to home
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          Need help? Contact{' '}
          <Link
            href="mailto:support@lifelesson.com"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            support@lifelesson.com
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default function PaymentCancelPage({ searchParams }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Suspense fallback={null}>
        <ErrorContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
