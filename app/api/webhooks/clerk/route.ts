import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = body.data;
    
    // Only process user creation events
    if (body.type !== 'user.created') {
      return NextResponse.json({ success: true, message: "Ignoring non-user creation event" });
    }

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

    if (existingUser) {
      console.log(`User ${user.id} already exists in user_profiles`);
      return NextResponse.json({ success: true, message: "User already exists" });
    }

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
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ success: false, error: String(err) });
  }
}
