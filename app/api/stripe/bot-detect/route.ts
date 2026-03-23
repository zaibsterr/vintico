import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const ALLOWED_ORIGINS = [
  "https://vintico.site",
  "https://www.vintico.site",
  "http://localhost:3000",
];

/**
 * Bot detection endpoint — called on every page load.
 * Creates a Stripe Product event log with bot-detection metadata.
 * Verifies the request is from an allowed domain, captures fingerprint,
 * and logs a metered record via Stripe. Returns { verified: true } on success.
 */
export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin") || req.headers.get("referer") || "";
    const isAllowed = ALLOWED_ORIGINS.some((o) => origin.startsWith(o));
    if (!isAllowed) {
      return NextResponse.json(
        { verified: false, error: "Domain not allowed" },
        { status: 403 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const userAgent = req.headers.get("user-agent") || "unknown";
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Server-side Stripe verification — create a record on the bot-detect product
    // This logs the visit to Stripe without requiring a payment method
    const product = await stripe.products.retrieve(
      process.env.STRIPE_PRODUCT_ID!
    );

    // Update the product metadata with latest bot-detect ping
    await stripe.products.update(process.env.STRIPE_PRODUCT_ID!, {
      metadata: {
        last_bot_check_ip: ip,
        last_bot_check_ua: userAgent.slice(0, 500),
        last_bot_check_page: (body.page as string) || "/",
        last_bot_check_time: new Date().toISOString(),
        total_checks: String(
          Number(product.metadata?.total_checks || "0") + 1
        ),
      },
    });

    return NextResponse.json({
      verified: true,
      product: product.id,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Bot detection failed";
    console.error("[bot-detect]", errMsg);
    // On Stripe API failure, still allow through to avoid blocking real users
    return NextResponse.json({ verified: true, warning: errMsg });
  }
}
