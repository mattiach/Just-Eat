import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-09-30.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const { amount, language } = await request.json();

    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Invalid amount');
    }

    const baseUrl = process.env.BASE_URL;
    const successUrl = `${baseUrl}/${language}/order-completed/{CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/${language}/order-cancelled`;

    console.log('baseUrl ➡️', baseUrl)
    console.log('Success URL ➡️', successUrl);
    console.log('Cancel URL ➡️', cancelUrl);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Order Total',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // success_url: "https://just-eat-iota.vercel.app/en/order-completed/12345test",
      // cancel_url: "https://just-eat-iota.vercel.app/en/order-cancelled",
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
