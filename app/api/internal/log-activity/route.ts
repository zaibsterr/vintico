import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { userId, action, metadata } = await req.json();

    if (!userId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error } = await supabase
      .from('activity_logs')
      .insert({
        user_id: userId,
        action: action,
        metadata: metadata || {},
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error("[log-activity] Database error:", error);
      return NextResponse.json({ error: "Failed to log activity" }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("[log-activity] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
