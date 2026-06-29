import Link from 'next/link';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { CircleCheck } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { stripe } from '@/lib/stripe';

export const metadata = {
  title: 'LifeLesson | Success',
  description: '',
};


async function SuccessContent({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) redirect('/');

  const {
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    return (
      <Card className="w-full max-w-md border-border/60 shadow-sm">
        <CardContent className="flex flex-col items-center gap-6 px-6 py-10 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-inset ring-emerald-500/20">
            <CircleCheck className="size-7 text-emerald-500" strokeWidth={2} />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Payment successful
            </CardTitle>
            <CardDescription className="text-balance">
              Thanks for your purchase. A confirmation receipt is on its way to
              your inbox.
            </CardDescription>
          </div>

          {session_id && (
            <div className="w-full rounded-lg border border-border/60 bg-muted/40 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Reference
              </p>
              <p className="mt-1 truncate font-mono text-sm text-foreground">
                {session_id}
              </p>
            </div>
          )}

          <div className="flex w-full flex-col gap-2">
            <Link
              href="/dashboard"
              className={cn(buttonVariants(), 'w-full rounded')}
            >
              Go to dashboard
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
        </CardContent>
      </Card>
    );
  }
}

export default function PaymentSuccessPage({ searchParams }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Suspense fallback={null}>
        <SuccessContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
