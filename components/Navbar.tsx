"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/roadmap", label: "Roadmap" },
  { href: "/learn/html", label: "HTML" },
  { href: "/learn/git", label: "Git & GitHub" },
  { href: "/search", label: "Search" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollY = useRef(0);
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const navLinks = isAuthenticated
    ? NAV_LINKS
    : NAV_LINKS.filter((link) => link.href === "/search");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsAuthenticated(Boolean(data.user));
      setAuthLoaded(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session?.user));
      setAuthLoaded(true);
    });

    const handleScroll = () => {
      const currentY = window.scrollY;
      const direction = currentY - lastScrollY.current;

      if (currentY <= 24) {
        setIsCompact(false);
      } else if (direction > 6) {
        setIsCompact(true);
      } else if (direction < -6) {
        setIsCompact(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      sub.subscription.unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header
      data-compact={isCompact}
      className={`sticky z-50 border border-ink-light/10 bg-canvas-light/90 backdrop-blur transition-[top,max-width,margin,border-radius,box-shadow] duration-300 ease-out dark:border-ink-dark/10 dark:bg-canvas-dark/90 ${
        isCompact
          ? "top-3 mx-3 max-w-4xl rounded-full shadow-[0_12px_35px_rgba(0,0,0,0.12)] sm:mx-auto"
          : "top-0 mx-0 max-w-none rounded-none border-x-0 border-t-0 shadow-none"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between transition-all duration-300 ease-out ${
          isCompact ? "gap-3 px-4 py-2 sm:px-6" : "gap-4 px-4 py-4 sm:px-6 lg:px-8"
        }`}
      >
        <Link
          href="/"
          className={`shrink-0 font-serif italic transition-all duration-300 ${isCompact ? "text-lg" : "text-xl"}`}
        >
          DevLearn
        </Link>

        <div className={`hidden items-center md:flex ${isCompact ? "gap-4" : "gap-7"}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-xs font-medium uppercase tracking-widest2 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          {!authLoaded ? null : isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="font-sans text-xs font-medium uppercase tracking-widest2 transition-colors hover:text-accent"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full border border-ink-light/20 px-4 py-1.5 text-xs uppercase tracking-widest2 transition-colors hover:border-accent dark:border-ink-dark/20"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="font-sans text-xs font-medium uppercase tracking-widest2 transition-colors hover:text-accent"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-accent px-4 py-1.5 text-xs uppercase tracking-widest2 text-white transition-colors hover:bg-accent/90"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-ink-light/10 px-4 py-4 md:hidden dark:border-ink-dark/10">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-sans text-xs font-medium uppercase tracking-widest2"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between">
              <ThemeToggle />
              {!authLoaded ? null : isAuthenticated ? (
                <button onClick={handleLogout} className="text-sm text-accent">
                  Log out
                </button>
              ) : (
                <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm text-accent">
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
