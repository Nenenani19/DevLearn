"use client";

import { useTheme } from "@/context/ThemeProvider";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-light/15 text-sm transition-colors duration-200 hover:border-accent dark:border-ink-dark/15 motion-reduce:transition-none"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 transition-transform duration-300 motion-reduce:transition-none"
      >
        {resolvedTheme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </>
        ) : (
          <path d="M20.9 13A8.5 8.5 0 0 1 11 3.1 8.5 8.5 0 1 0 20.9 13Z" />
        )}
      </svg>
    </button>
  );
}
