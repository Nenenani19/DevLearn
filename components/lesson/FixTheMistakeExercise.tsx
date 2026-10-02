"use client";

import { useState } from "react";
import { CodeBlock } from "./CodeBlock";

function normalize(code: string) {
  // Whitespace-insensitive comparison so trailing spaces or a
  // different indent don't fail an otherwise-correct answer.
  // Still exact on the actual characters/tags typed — this is a
  // real comparison, not a fuzzy "looks close enough" heuristic.
  return code
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

export function FixTheMistakeExercise({
  wrongCode,
  correctCode,
  hint,
}: {
  wrongCode: string;
  correctCode: string;
  hint: string;
}) {
  const [value, setValue] = useState(wrongCode);
  const [checked, setChecked] = useState<"idle" | "correct" | "incorrect">("idle");
  const [showHint, setShowHint] = useState(false);

  function handleCheck() {
    setChecked(normalize(value) === normalize(correctCode) ? "correct" : "incorrect");
  }

  return (
    <div className="min-w-0 max-w-full space-y-3 overflow-hidden rounded-xl border border-ink-light/15 p-4 dark:border-ink-dark/15">
      <p className="text-sm text-ink-light/70 dark:text-ink-dark/70">Fix the mistake below, then check your answer.</p>
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setChecked("idle");
        }}
        spellCheck={false}
        rows={4}
        aria-label="Fix the code"
        className="block w-full min-w-0 max-w-full resize-none whitespace-pre-wrap break-words rounded-md border border-ink-light/20 bg-transparent p-3 font-mono text-sm outline-none dark:border-ink-dark/20"
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleCheck}
          className="rounded-full bg-accent px-4 py-1.5 text-sm text-white hover:bg-accent/90"
        >
          Check my answer
        </button>
        <button
          type="button"
          onClick={() => setShowHint((v) => !v)}
          className="text-sm text-accent hover:underline"
        >
          {showHint ? "Hide hint" : "Show hint"}
        </button>
      </div>

      {showHint && <p className="text-sm text-ink-light/60 dark:text-ink-dark/60">{hint}</p>}

      {checked === "correct" && (
        <p role="status" className="text-sm font-medium text-green-600 dark:text-green-400">
          That&apos;s correct.
        </p>
      )}
      {checked === "incorrect" && (
        <div className="space-y-2">
          <p role="status" className="text-sm font-medium text-red-600 dark:text-red-400">
            Not quite yet — compare against the corrected version below.
          </p>
          <CodeBlock code={correctCode} label="Corrected version" />
        </div>
      )}
    </div>
  );
}
