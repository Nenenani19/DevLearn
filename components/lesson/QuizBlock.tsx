"use client";

import { useState } from "react";
import { submitQuizAttempt } from "@/lib/progress";
import type { GradeQuizAttemptResult } from "@/types/database";

type Question = {
  id: string;
  prompt: string;
  explanation: string;
  correctOptionId?: string;
  options: { id: string; label: string }[];
};

export function QuizBlock({
  quizId,
  title,
  questions,
  onGraded,
  localMode = false,
}: {
  quizId: string;
  title: string;
  questions: Question[];
  onGraded?: (result: GradeQuizAttemptResult) => void;
  localMode?: boolean;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "graded" | "error">("idle");
  const [result, setResult] = useState<GradeQuizAttemptResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const allAnswered = questions.every((q) => answers[q.id]);

  async function handleSubmit() {
    setStatus("submitting");
    setErrorMessage("");
    try {
      if (localMode) {
        const correct = questions.filter((question) => answers[question.id] === question.correctOptionId).length;
        const score = Math.round((correct / questions.length) * 100);
        const graded = { score, passed: score >= 70, attempt_id: "local-attempt" };
        setResult(graded);
        setStatus("graded");
        onGraded?.(graded);
        return;
      }
      const graded = await submitQuizAttempt(quizId, answers);
      setResult(graded);
      setStatus("graded");
      onGraded?.(graded);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong grading this quiz.");
      setStatus("error");
    }
  }

  function handleRetry() {
    setAnswers({});
    setResult(null);
    setStatus("idle");
  }

  return (
    <div className="min-w-0 max-w-full space-y-6 overflow-hidden rounded-xl border border-ink-light/15 p-5 dark:border-ink-dark/15">
      <h3 className="font-serif text-xl">{title}</h3>

      {questions.map((q, qi) => (
        <fieldset key={q.id} disabled={status === "graded"}>
          <legend className="text-sm font-medium">
            {qi + 1}. {q.prompt}
          </legend>
          <div className="mt-3 space-y-2">
            {q.options.map((opt) => (
              <label
                key={opt.id}
                className="flex min-w-0 cursor-pointer items-start gap-2 break-words rounded-md border border-ink-light/15 px-3 py-2 text-sm has-[:checked]:border-accent dark:border-ink-dark/15"
              >
                <input
                  type="radio"
                  name={q.id}
                  value={opt.id}
                  checked={answers[q.id] === opt.id}
                  onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.id }))}
                />
                {opt.label}
              </label>
            ))}
          </div>
          {status === "graded" && (
            <p className="mt-2 text-sm text-ink-light/70 dark:text-ink-dark/70">{q.explanation}</p>
          )}
        </fieldset>
      ))}

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}

      {status !== "graded" ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!allAnswered || status === "submitting"}
          className="rounded-full bg-accent px-4 py-2 text-sm text-white hover:bg-accent/90 disabled:opacity-50"
        >
          {status === "submitting" ? "Grading…" : "Submit answers"}
        </button>
      ) : (
        result && (
          <div className="space-y-3">
            <p
              role="status"
              className={`text-sm font-medium ${result.passed ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              Score: {result.score}% — {result.passed ? "Passed" : "Not yet passed"}
            </p>
            {!result.passed && (
              <button type="button" onClick={handleRetry} className="text-sm text-accent hover:underline">
                Try again
              </button>
            )}
          </div>
        )
      )}
    </div>
  );
}
