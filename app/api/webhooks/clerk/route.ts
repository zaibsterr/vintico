import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase";
import { Webhook } from "svix";
import { headers } from "next/headers";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error("[clerk-webhook] Missing svix headers");
      return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret!);
    let evt: any;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      console.error("[clerk-webhook] Webhook verification failed:", err);
      return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 });
    }

    const eventType = evt.type;
    console.log(`[clerk-webhook] Processing event: ${eventType}`);

    // Handle user creation (signup)
    if (eventType === "user.created") {
      const user = evt.data;
      
      // Create user profile first
      const supabase = createServiceRoleClient();
      
      const email = user.email_addresses?.[0]?.email_address;
      if (!email) {
        console.error("Email missing from Clerk user data");
        return NextResponse.json({ success: false, error: "Email missing" });
      }

      // Check if user already exists to prevent duplicates
      const { data: existingUser } = await supabase
        .from("user_profiles")
        .select("user_id")
        .eq("user_id", user.id)
        .single();

      if (!existingUser) {
        // Insert new user profile with specified values
        const { data, error } = await supabase
          .from("user_profiles")
          .insert([
            {
              user_id: user.id,
              email: email,
              credits: 3,
              plan: 'free'
            }
          ])
          .select();

        if (error) {
          console.error("Supabase insert error:", error);
          return NextResponse.json({ success: false, error: error.message });
        }

        console.log(`Successfully created user profile for ${user.id}`);
      }

      // Trigger bot detection charge for signup
      await triggerBotDetectionCharge(user.id, "signup");
    }

    // Handle user session creation (signin)
    if (eventType === "session.created") {
      await triggerBotDetectionCharge(evt.data.user_id, "signin");
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ success: false, error: String(err) });
  }
}

async function triggerBotDetectionCharge(userId: string, action: "signup" | "signin") {
  try {
    console.log(`[clerk-webhook] Triggering bot detection charge for ${action}: ${userId}`);

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/stripe/bot-charge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Clerk-Webhook/1.0'
      },
      body: JSON.stringify({
        action: action,
        userId: userId
      })
    });

    if (!response.ok) {
      console.error(`[clerk-webhook] Bot charge failed for ${action}:`, response.statusText);
      return;
    }

    const result = await response.json();
    console.log(`[clerk-webhook] Bot charge successful for ${action}:`, result);

  } catch (error) {
    console.error(`[clerk-webhook] Error triggering bot charge for ${action}:`, error);
  }
}
