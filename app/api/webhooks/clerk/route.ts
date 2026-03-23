import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client using Service Role Key
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || !body.data) {
      console.error("Webhook payload missing or invalid:", body);
      return NextResponse.json({ success: false, error: "Invalid payload" });
    }

    const user = body.data;

    // Extract email safely
    const email = user.email_addresses?.[0]?.email_address;
    if (!email) {
      console.error("User email missing:", user);
      return NextResponse.json({ success: false, error: "Email missing" });
    }

    console.log("Webhook triggered for user:", user.id);
    console.log("User email:", email);

    // Insert into Supabase
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          clerk_id: user.id,
          email: email,
        },
      ])
      .select(); // select() returns inserted row

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ success: false, error: error.message });
    }

    console.log("Supabase insert success:", data);

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ success: false, error: String(err) });
  }
}
