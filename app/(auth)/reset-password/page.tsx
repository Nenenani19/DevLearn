"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // The reset link puts the user into a temporary "recovery"
    // session. We just confirm a session exists before allowing
    // the form to submit — Supabase handles the token exchange
    // from the URL hash automatically on page load.
    supabase.auth.getSession().then(({ data }) => {
      setReady(Boolean(data.session));
    });
  }, [supabase]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setErrorMessage(error.message);
      setStatus("error");
      return;
    }

    setStatus("success");
    setTimeout(() => router.push("/login"), 2000);
  }

  if (!ready) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-serif text-3xl">Invalid or expired link</h1>
        <p className="mt-4 text-sm text-ink-light/70 dark:text-ink-dark/70">
          This password reset link is no longer valid. Request a new one from the{" "}
          <a href="/forgot-password" className="text-accent">forgot password page</a>.
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-serif text-3xl">Password updated</h1>
        <p className="mt-4 text-sm text-ink-light/70 dark:text-ink-dark/70">Redirecting to login…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-serif text-3xl">Choose a new password</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            New password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-ink-light/20 bg-transparent px-3 py-2 dark:border-ink-dark/20"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {status === "loading" ? "Updating…" : "Update password"}
        </button>
      </form>
    </div>
  );
}
