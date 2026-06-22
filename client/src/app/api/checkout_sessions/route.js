import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { getUserSession } from '@/lib/auth';

export async function POST() {
  try {
    const user = await getUserSession();
    const headersList = await headers();
    const origin = headersList.get('origin');

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1TkpFdRoppHmujUEW3a51FII',
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: { userId: user?.id.toString() },
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing/cancel`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
