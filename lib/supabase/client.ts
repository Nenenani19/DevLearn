import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

/**
 * Supabase client for use in Client Components ("use client").
 * Reads the two public env vars — safe to expose in the browser
 * because Row Level Security on every table is what actually
 * protects the data, not this key.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
