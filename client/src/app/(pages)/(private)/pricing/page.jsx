import Navber from '@/components/shared/navber/Navber';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { BsStars } from 'react-icons/bs';
import { FaAward } from 'react-icons/fa';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import SubscriptionBadge from '@/components/SubscriptionBadge';
import { Button } from '@/components/ui/button';
import { LuShieldCheck } from 'react-icons/lu';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const planItems = [
  'Access Premium Lessons',
  'Ad-free Experience',
  'Community Badge',
  'Priority Support',
  'Export as PDF',
];

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

const PricingPage = () => {
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
          <div style={{ minWidth: '65%' }}>
            <Card>
              <CardHeader>
                <CardTitle>Feature Comparison</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-5 justify-between">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-muted-foreground">
                        Lessons Created
                      </TableCell>
                      <TableCell className="font-medium text-muted-foreground">
                        10
                      </TableCell>
                      <TableCell className="font-medium text-muted-foreground">
                        Unlimited
                      </TableCell>
                    </TableRow>
                    {planItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-muted-foreground">
                          {item}
                        </TableCell>
                        <TableCell>
                          <RxCross2 size={17} className="text-red-400" />
                        </TableCell>
                        <TableCell>
                          <IoMdCheckmark size={17} className="text-green-400" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <div className="p-5 border-l mt-5">
              <p className="text-muted-foreground text-sm italic font-medium">
                {
                  "'Wisdom is not a product of schooling but of the lifelong attempt to acquire it. Your sanctuary should be as boundless as your potential.'"
                }
              </p>
            </div>
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
                <p classNem="!text-muted-foreground text-xs">BDT</p>
              </div>

              <Button className="w-full h-auto py-3 rounded-full font-medium">
                Upgrade to Premium
              </Button>

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

        <div className="" style={{marginTop: "100px", marginBottom: "100px"}}>
          <div className="container mx-auto max-w-3xl px-4">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold tracking-tight font-boldonse">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-muted-foreground">
                Everything you need to know about Digital Life Lessons.
              </p>
            </div>

            <Accordion
              type="single"
              collapsible
              className="rounded-2xl flex flex-col gap-5"
              style={{marginTop: "50px"}}
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="px-5 bg-muted duration-200 shadow-sm"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline duration-200">
                    {faq.q}
                  </AccordionTrigger>

                  <AccordionContent className="mb-5 text-sm leading-7 text-muted-foreground duration-200">
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
