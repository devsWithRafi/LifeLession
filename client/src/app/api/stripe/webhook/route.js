import { UpdateUserPlan } from '@/actions/UpdateUserPlan.action';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Webhook Error: ${error.message}`,
      },
      {
        status: 400,
      },
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { userId } = session.metadata;
    if (userId) {
      await UpdateUserPlan(userId);
    }

    return NextResponse.json({ received: true });
  }
}
