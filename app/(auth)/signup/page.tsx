"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AccountType } from "@/types/database";

export default function SignupPage() {
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>("student");
  const [institution, setInstitution] = useState("");
  const [description, setDescription] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName,
          account_type: accountType,
          institution: accountType === "student" || accountType === "employed" ? institution : null,
          description: accountType === "other" ? description : null,
        },
      },
    });

    if (error) {
      // Supabase returns a generic-looking error for an email that
      // already exists once "Confirm email" is on, to avoid leaking
      // which emails are registered. We surface it plainly either way.
      setErrorMessage(error.message);
      setStatus("error");
      return;
    }

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-serif text-3xl">Check your inbox</h1>
        <p className="mt-4 text-sm text-ink-light/70 dark:text-ink-dark/70">
          We sent a verification link to <strong>{email}</strong>. Click it to activate your
          account, then come back and log in.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-serif text-3xl">Create your account</h1>
      <p className="mt-2 text-sm text-ink-light/70 dark:text-ink-dark/70">
        Already have one? <Link href="/login" className="text-accent">Log in</Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium">
            Full name
          </label>
          <input
            id="fullName"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-md border border-ink-light/20 bg-transparent px-3 py-2 dark:border-ink-dark/20"
          />
        </div>

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
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
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
          <p className="mt-1 text-xs text-ink-light/60 dark:text-ink-dark/60">At least 8 characters.</p>
        </div>

        <div>
          <label htmlFor="accountType" className="block text-sm font-medium">
            I am
          </label>
          <select
            id="accountType"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value as AccountType)}
            className="mt-1 w-full rounded-md border border-ink-light/20 bg-transparent px-3 py-2 dark:border-ink-dark/20"
          >
            <option value="student">A student</option>
            <option value="employed">Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="other">Other</option>
          </select>
        </div>

        {accountType === "student" && (
          <div>
            <label htmlFor="institution" className="block text-sm font-medium">
              University
            </label>
            <input
              id="institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="mt-1 w-full rounded-md border border-ink-light/20 bg-transparent px-3 py-2 dark:border-ink-dark/20"
            />
          </div>
        )}

        {accountType === "employed" && (
          <div>
            <label htmlFor="institution" className="block text-sm font-medium">
              Company
            </label>
            <input
              id="institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="mt-1 w-full rounded-md border border-ink-light/20 bg-transparent px-3 py-2 dark:border-ink-dark/20"
            />
          </div>
        )}

        {accountType === "other" && (
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Tell us a bit more (optional)
            </label>
            <input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-md border border-ink-light/20 bg-transparent px-3 py-2 dark:border-ink-dark/20"
            />
          </div>
        )}

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
          {status === "loading" ? "Creating account…" : "Create account"}
        </button>
      </form>
    </div>
  );
}
