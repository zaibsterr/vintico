import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Helper — reads Supabase env vars at call time (NOT at import time).
 * This prevents "supabaseUrl is required" errors during static builds
 * on Netlify / Vercel where env vars aren't available at build time.
 */
function getEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }
  return { url, anonKey };
}

/** Lazy-initialized unauthenticated Supabase client (public / anon) */
let _anonClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_anonClient) {
    const { url, anonKey } = getEnv();
    _anonClient = createClient(url, anonKey);
  }
  return _anonClient;
}

/**
 * Server-side Supabase admin client using SERVICE_ROLE_KEY.
 * Bypasses RLS — use ONLY in server API routes, never in client code.
 */
export function createServiceRoleClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

/**
 * Create a Supabase client that attaches a Clerk session JWT
 * so RLS policies can identify the requesting user.
 *
 * Used in:
 *  - Server-side API routes (pass token from auth().getToken())
 *  - Client components (pass token from useAuth().getToken())
 */
let _cachedToken: string | null = null;
let _cachedClient: SupabaseClient | null = null;

export function createClerkSupabaseClient(token: string): SupabaseClient {
  if (_cachedClient && _cachedToken === token) {
    return _cachedClient;
  }

  const { url, anonKey } = getEnv();
  _cachedToken = token;
  _cachedClient = createClient(url, anonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return _cachedClient;
}
