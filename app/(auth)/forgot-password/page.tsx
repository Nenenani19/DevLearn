"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    });

    if (error) {
      setErrorMessage(error.message);
      setStatus("error");
      return;
    }

    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-serif text-3xl">Check your inbox</h1>
        <p className="mt-4 text-sm text-ink-light/70 dark:text-ink-dark/70">
          If an account exists for <strong>{email}</strong>, a password reset link is on its way.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-serif text-3xl">Reset your password</h1>
      <p className="mt-2 text-sm text-ink-light/70 dark:text-ink-dark/70">
        Enter the email on your account and we&apos;ll send a reset link.
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
          {status === "loading" ? "Sending…" : "Send reset link"}
        </button>
      </form>
    </div>
  );
}
