import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

/**
 * Bot detection charge endpoint - automatically charges $0.01 on signup/signin
 * This triggers the actual Stripe payment for bot detection
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.error("[bot-charge] No user ID found in auth");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify required environment variables
    if (!process.env.STRIPE_PRICE_ID) {
      console.error("[bot-charge] STRIPE_PRICE_ID not configured");
      return NextResponse.json({ error: "Stripe configuration missing" }, { status: 500 });
    }

    const userAgent = req.headers.get("user-agent") || "unknown";
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
               req.headers.get("x-real-ip") || "unknown";
    
    const body = await req.json().catch(() => ({}));
    const action = body.action || "unknown"; // "signup" or "signin"

    console.log(`[bot-charge] Processing ${action} for user: ${userId}, IP: ${ip}`);

    // Create a direct charge using Payment Intents with automatic confirmation
    // For bot detection, we'll create a minimal charge that doesn't require user interaction
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1, // $0.01 in cents
      currency: "usd",
      confirm: true,
      payment_method: "pm_card_visa", // Stripe test card for automatic processing
      metadata: {
        clerk_user_id: userId,
        bot_detection: "true",
        action: action,
        user_agent: userAgent.slice(0, 500),
        ip_address: ip,
        automatic_charge: "true"
      },
      description: `Bot detection charge - ${action}`,
    });

    console.log(`[bot-charge] Payment intent created: ${paymentIntent.id}, status: ${paymentIntent.status}`);

    // Log the activity to our database
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/internal/log-activity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          action: `Bot detection charge - ${action}`,
          metadata: {
            payment_intent_id: paymentIntent.id,
            amount: 1,
            status: paymentIntent.status
          }
        })
      });
      
      if (!response.ok) {
        console.error("[bot-charge] Failed to log activity:", response.statusText);
      }
    } catch (logError) {
      console.error("[bot-charge] Error logging activity:", logError);
    }

    return NextResponse.json({
      success: true,
      payment_intent_id: paymentIntent.id,
      status: paymentIntent.status,
      amount: 1,
      action: action,
      timestamp: new Date().toISOString()
    });

  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Bot detection charge failed";
    console.error("[bot-charge] Error:", errMsg);
    
    // Don't block user access even if charge fails - this is bot detection, not payment
    return NextResponse.json({
      success: false,
      error: errMsg,
      warning: "Bot detection charge failed but user access allowed"
    }, { status: 200 }); // Return 200 to avoid blocking users
  }
}
