import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServiceRoleClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action, details } = await req.json();

    if (!action) {
      return NextResponse.json(
        { error: "Missing required field: action" },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleClient();

    const { data, error } = await supabase.from("activity_logs").insert({
      user_id: userId,
      action,
      details: details || null,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("[activity]", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Activity log failed";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
