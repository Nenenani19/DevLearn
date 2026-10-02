import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";

const PROTECTED_PREFIXES = ["/dashboard", "/profile", "/learn", "/roadmap"];
const AUTH_ONLY_ROUTES = ["/login", "/signup"];

/**
 * Refreshes the Supabase auth session cookie on every request and
 * redirects unauthenticated visitors away from protected routes.
 * This is what makes "protected routes" actually protected, rather
 * than relying on client-side checks that can be bypassed.
 *
 * Uses getAll/setAll — the current recommended cookie API. The
 * response must be created AFTER reading cookies and its cookies
 * re-set via setAll, or the refreshed session never reaches the
 * browser (a documented cause of random logouts with the old API).
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isProtected = PROTECTED_PREFIXES.some((p) => path.startsWith(p));
  const isAuthOnly = AUTH_ONLY_ROUTES.includes(path);

  if (isProtected && !user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirectedFrom", path);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthOnly && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}
