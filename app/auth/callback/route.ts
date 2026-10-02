import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Hit when a user clicks the verification link Supabase emails
 * after signup (emailRedirectTo points here). Exchanges the one-
 * time code in the URL for a real session, then sends them on.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=verification_failed`);
}
