import Navber from '@/components/shared/navber/Navber';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BsStars } from 'react-icons/bs';
import { FaAward } from 'react-icons/fa';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SubscriptionBadge from '@/components/SubscriptionBadge';
import { Button, buttonVariants } from '@/components/ui/button';
import { LuShieldCheck } from 'react-icons/lu';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Check, X } from 'lucide-react';
import { getUserSession } from '@/lib/auth';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// ======================================================================
export const metadata = {
  title: 'LifeLesson | Pricing',
  description: '',
};
// ======================================================================

const features = [
  { name: 'Lessons Created', free: '10', premium: 'Unlimited' },
  { name: 'Access Premium Lessons', free: false, premium: true },
  { name: 'Ad-free Experience', free: false, premium: true },
  { name: 'Community Badge', free: false, premium: true },
  { name: 'Priority Support', free: false, premium: true },
  { name: 'Export as PDF', free: false, premium: true },
];

function Cell({ value }) {
  if (typeof value === 'string') {
    return <span className="text-sm font-medium text-foreground">{value}</span>;
  }
  return value ? (
    <Check className="mx-auto size-5 text-emerald-500" strokeWidth={2.25} />
  ) : (
    <X className="mx-auto size-5 text-rose-400" strokeWidth={2.25} />
  );
}

const faqs = [
  {
    q: 'Is this really a one-time payment?',
    a: 'Yes. Digital Life Lessons uses a secure one-time payment through Stripe. There are no monthly subscriptions, hidden fees, or recurring charges. Pay once and enjoy lifetime access to all premium features.',
  },
  {
    q: 'Can I export my lessons to other platforms?',
    a: 'Yes. Premium users can export their lessons and personal insights in formats such as PDF or JSON, making it easy to back up or use their content on other platforms.',
  },
  {
    q: 'What happens if I already have 10 lessons?',
    a: 'You can continue viewing and managing your existing lessons. To create additional lessons and unlock unlimited storage, simply upgrade to the premium plan.',
  },
  {
    q: 'Is the checkout process secure?',
    a: "Absolutely. All payments are processed by Stripe, one of the world's most trusted payment platforms. Your card information is encrypted and securely handled by Stripe—we never store your payment details on our servers.",
  },
];

const PricingPage = async () => {
  const user = await getUserSession();
  const isPremium = user?.plan === 'premium' || user?.role === 'admin';

  return (
    <>
      <Navber />
      <section className="mt-20 mx-auto w-full max-w-375 p-4">
        <div className="flex flex-col gap-5 justify-center items-center">
          <Badge>Investment in Growth</Badge>
          <h1 className="sm:text-3xl text-2xl font-boldonse text-center">
            Elevate Your Sanctuary
          </h1>
          <p
            className="sm:text-lg text-sm text-center text-muted-foreground"
            style={{ maxWidth: '80%' }}
          >
            Transition from a seeker to a master. Unlock the full potential of
            your personal growth journey with our lifetime premium access.
          </p>
        </div>

        <div className="flex md:flex-row flex-col-reverse gap-5 w-full mt-20">
          <div className="bg-background min-w-[70%] border rounded-xl overflow-hidden">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-card">
                  <TableHead className="h-12 text-foreground p-5">
                    Feature
                  </TableHead>
                  <TableHead className="h-12 text-center text-foreground p-5">
                    Free
                  </TableHead>
                  <TableHead className="h-12 text-center font-semibold text-foreground p-5">
                    Premium
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature) => (
                  <TableRow key={feature.name} className="">
                    <TableCell className="font-medium p-5">
                      {feature.name}
                    </TableCell>
                    <TableCell className="text-center p-5">
                      <Cell value={feature.free} />
                    </TableCell>
                    <TableCell className="p-5 text-center">
                      <Cell value={feature.premium} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Card className="w-full">
            <CardHeader>
              <span className="flex items-center gap-5 justify-between">
                <CardTitle className="font-semibold">
                  Lifetime Premium Access
                </CardTitle>
                <SubscriptionBadge>PREMIUM</SubscriptionBadge>
              </span>
              <CardDescription>
                One-time payment. Forever yours.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 justify-between">
              <div className="flex items-end gap-2 text-muted-foreground py-5">
                <CardTitle className="text-3xl font-bold font-boldonse text-primary">
                  ৳1500
                </CardTitle>
                <p className="!text-muted-foreground text-xs">BDT</p>
              </div>

              {user ? (
                <form
                  action="/api/checkout_sessions"
                  method="POST"
                  className={cn(isPremium && 'cursor-not-allowed')}
                >
                  <Button
                    type="submit"
                    disabled={isPremium}
                    role="link"
                    className="w-full h-auto py-3 rounded-full font-medium"
                  >
                    {isPremium
                      ? user.role === 'admin'
                        ? 'You are Admin'
                        : 'Already Subscribed'
                      : 'Upgrade to Premium'}
                  </Button>
                </form>
              ) : (
                <Link
                  href={'/sign-in'}
                  className={cn(
                    buttonVariants(),
                    'w-full h-auto py-3 rounded-full font-medium',
                  )}
                >
                  Upgrade to Premium
                </Link>
              )}

              <span className="w-full p-3 rounded bg-muted flex gap-2 items-center justify-center text-muted-foreground text-xs">
                <LuShieldCheck size={15} /> SECURE CHECKOUT VIA STRIPE
              </span>

              <Separator className="my-5" />

              <div>
                <span className="flex gap-2 items-center text-muted-foreground">
                  <BsStars />
                  Unlock all future pro tools at no extra cost.
                </span>
                <span className="flex gap-2 items-center text-muted-foreground">
                  <FaAward />
                  Exclusive badge on your public profile.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-background mt-25 py-5 w-full">
          <div className="mx-auto md:max-w-[70%]">
            <div className="mb-10 text-center">
              <p className="text-sm font-medium text-muted-foreground">FAQ</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-balance text-muted-foreground">
                Everything you need to know about payments, access, and
                security.
              </p>
            </div>

            <Accordion
              type="single"
              collapsible
              className="w-full divide-y divide-border/60 rounded-lg border border-border/60 mt-5"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="px-5"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingPage;
