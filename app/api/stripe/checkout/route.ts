import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const origin = req.headers.get("origin") || "https://vintico.site";

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/dashboard?checkout=success`,
      cancel_url: `${origin}/dashboard?checkout=cancelled`,
      metadata: {
        clerk_user_id: userId,
        bot_detection: "true",
        product_id: process.env.STRIPE_PRODUCT_ID!,
      },
      payment_intent_data: {
        metadata: {
          clerk_user_id: userId,
          bot_detection: "true",
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Checkout session failed";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
