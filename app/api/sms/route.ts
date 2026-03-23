import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import twilio from "twilio";
import { createServiceRoleClient } from "@/lib/supabase";

const MAX_STARTER_CREDITS = 3;

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { to, message } = await req.json();
    if (!to || !message) {
      return NextResponse.json(
        { error: "Missing required fields: to, message" },
        { status: 400 }
      );
    }

    // ── Credit check via Supabase ──
    const db = createServiceRoleClient();

    const { data: profile } = await db
      .from("user_profiles")
      .select("sms_credits_used, plan")
      .eq("user_id", userId)
      .single();

    const creditsUsed = profile?.sms_credits_used ?? 0;
    const plan = profile?.plan ?? "starter";

    if (plan === "starter" && creditsUsed >= MAX_STARTER_CREDITS) {
      return NextResponse.json(
        {
          error: "SMS credit limit reached (3/3). Upgrade plan for more credits.",
          credits_used: creditsUsed,
          credits_max: MAX_STARTER_CREDITS,
        },
        { status: 402 }
      );
    }

    // ── Send SMS via Twilio ──
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );

    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to,
    });

    // ── Increment credit usage ──
    await db
      .from("user_profiles")
      .upsert(
        {
          user_id: userId,
          sms_credits_used: creditsUsed + 1,
          plan: plan,
        },
        { onConflict: "user_id" }
      );

    return NextResponse.json({
      success: true,
      sid: sms.sid,
      credits_used: creditsUsed + 1,
      credits_max: plan === "starter" ? MAX_STARTER_CREDITS : "unlimited",
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "SMS send failed";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
