"use client";

import { useState } from "react";

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context) —
      // fail silently rather than showing a broken "Copied!" state.
    }
  }

  return (
    <div className="min-w-0 max-w-full overflow-hidden rounded-lg border border-ink-light/15 dark:border-ink-dark/15">
      <div className="flex items-center justify-between border-b border-ink-light/10 bg-ink-light/[0.03] px-3 py-1.5 dark:border-ink-dark/10 dark:bg-ink-dark/[0.03]">
        <span className="font-mono text-[10px] uppercase tracking-wide text-ink-light/50 dark:text-ink-dark/50">
          {label ?? "Code"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="font-mono text-[10px] text-accent hover:underline"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-hidden whitespace-pre-wrap p-3 font-mono text-sm [overflow-wrap:anywhere]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
