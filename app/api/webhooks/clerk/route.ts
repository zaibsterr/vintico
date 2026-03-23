import { NextRequest, NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

function getSupabase() {
  if (!supabase) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      console.error("Supabase environment variables missing");
      return null;
    }
    supabase = createClient(url, key);
  }
  return supabase;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = body.data;
    const client = getSupabase();
    if (!client) return NextResponse.json({ success: false, error: "Supabase not initialized" });

    const email = user.email_addresses?.[0]?.email_address;
    if (!email) return NextResponse.json({ success: false, error: "Email missing" });

    const { data, error } = await client.from("users").insert([
      { clerk_id: user.id, email },
    ]).select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ success: false, error: error.message });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ success: false, error: String(err) });
  }
}
