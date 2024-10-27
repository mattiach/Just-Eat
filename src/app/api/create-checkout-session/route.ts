import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-09-30.acacia',
});

export async function POST(request: NextRequest) {
  try {
    // parsing the request body
    const { amount, language } = await request.json();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    // ensure the amount is in cents and is a valid number
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Invalid amount');
    }

    // create the checkout session
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
      success_url: `${baseUrl}/${language}/order-completed/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/${language}/order-cancelled`,
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