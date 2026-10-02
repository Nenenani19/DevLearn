"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      // Deliberately generic: Supabase itself does not distinguish
      // "wrong password" from "no such user" in this error, which
      // is the correct behavior for not leaking account existence.
      setErrorMessage("Incorrect email or password.");
      setStatus("error");
      return;
    }

    const redirectTo = searchParams.get("redirectedFrom") || "/dashboard";
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-serif text-3xl">Welcome back</h1>
      <p className="mt-2 text-sm text-ink-light/70 dark:text-ink-dark/70">
        New here? <Link href="/signup" className="text-accent">Create an account</Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-ink-light/20 bg-transparent px-3 py-2 dark:border-ink-dark/20"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs text-accent">
              Forgot password?
            </Link>
          </div>
          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-ink-light/20 bg-transparent px-3 py-2 pr-16 dark:border-ink-dark/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-accent"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {status === "error" && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-accent px-4 py-2.5 text-white transition hover:bg-accent/90 disabled:opacity-60"
        >
          {status === "loading" ? "Logging in…" : "Log in"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
