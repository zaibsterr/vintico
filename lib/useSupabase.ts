"use client";

import { useCallback, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { createClerkSupabaseClient } from "@/lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * React hook that returns a `getDb()` helper.
 * Call `getDb()` inside any async handler to get an authenticated
 * Supabase client with the current Clerk JWT attached.
 *
 * Usage:
 *   const { getDb, userId } = useSupabase();
 *   const db = await getDb();
 *   if (!db) return; // not authenticated
 *   const { data } = await db.from("quotes").select("*");
 */
export function useSupabase() {
  const { getToken, userId } = useAuth();
  const clientRef = useRef<SupabaseClient | null>(null);
  const tokenRef = useRef<string | null>(null);

  const getDb = useCallback(async (): Promise<SupabaseClient | null> => {
    try {
      const token = await getToken({ template: "supabase" });
      if (!token) {
        return null;
      }

      // Re-use existing client if token hasn't changed
      if (clientRef.current && tokenRef.current === token) {
        return clientRef.current;
      }

      const client = createClerkSupabaseClient(token);
      clientRef.current = client;
      tokenRef.current = token;

      return client;
    } catch (err) {
      console.error("[useSupabase] Failed to get Clerk token:", err);
      return null;
    }
  }, [getToken]);

  return { getDb, userId };
}
