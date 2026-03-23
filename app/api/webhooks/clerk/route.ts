import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Clerk user data
  const user = body.data;

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  await supabase.from("users").insert([
    {
      clerk_id: user.id,
      email: user.email_addresses[0].email_address,
    },
  ]);

  return NextResponse.json({ success: true });
}
