"use client";

import { useEffect, useRef, useState } from "react";
import { LessonSectionRenderer } from "./LessonSectionRenderer";
import { QuizBlock } from "./QuizBlock";
import { upsertLessonProgress, setBookmarked } from "@/lib/progress";
import type { LessonSection, GradeQuizAttemptResult } from "@/types/database";

type QuizData = {
  id: string;
  title: string;
  localMode?: boolean;
  questions: {
    id: string;
    prompt: string;
    explanation: string;
    correctOptionId?: string;
    options: { id: string; label: string }[];
  }[];
};

type LocalLessonState = { interacted: boolean; completed: boolean; bookmarked: boolean };

function readLocalState(lessonId: string): LocalLessonState | null {
  try {
    const value = window.localStorage.getItem(`devlearn:lesson:${lessonId}`);
    return value ? (JSON.parse(value) as LocalLessonState) : null;
  } catch {
    return null;
  }
}

function updateLocalState(lessonId: string, patch: Partial<LocalLessonState>) {
  try {
    const current = readLocalState(lessonId) ?? { interacted: false, completed: false, bookmarked: false };
    window.localStorage.setItem(`devlearn:lesson:${lessonId}`, JSON.stringify({ ...current, ...patch }));
  } catch {
    // Local progress remains in memory if browser storage is unavailable.
  }
}

export function LessonExperience({
  userId,
  lessonId,
  requiresInteraction,
  sections,
  quiz,
  localMode = false,
  initialInteracted,
  initialCompleted,
  initialBookmarked,
}: {
  userId?: string;
  lessonId: string;
  requiresInteraction: boolean;
  sections: LessonSection[];
  quiz: QuizData | null;
  localMode?: boolean;
  initialInteracted: boolean;
  initialCompleted: boolean;
  initialBookmarked: boolean;
}) {
  const [interacted, setInteracted] = useState(initialInteracted);
  const [quizResult, setQuizResult] = useState<GradeQuizAttemptResult | null>(null);
  const [completed, setCompleted] = useState(initialCompleted);
  const [bookmarked, setBookmarkedState] = useState(initialBookmarked);
  const [saveError, setSaveError] = useState("");

  // Guards against re-persisting "completed" every render once it's
  // already true — upserts are idempotent so this is a courtesy, not
  // a correctness requirement.
  const hasPersistedCompletion = useRef(initialCompleted);

  // Records that this lesson was opened — updates last_visited_at
  // without touching completed/interacted (upsert only sets the keys
  // present in the payload, so existing progress isn't reset).
  // This is purely a "recently viewed" signal — see the codebase-wide
  // rule that opening a lesson must never by itself mark it complete.
  useEffect(() => {
    if (localMode) {
      const saved = readLocalState(lessonId);
      if (saved) {
        setInteracted(saved.interacted);
        setCompleted(saved.completed);
        setBookmarkedState(saved.bookmarked);
        hasPersistedCompletion.current = saved.completed;
      }
      return;
    }
    if (!userId) return;
    upsertLessonProgress(userId, lessonId, {}).catch(() => undefined);
  }, [localMode, userId, lessonId]);

  const quizSatisfied = quiz ? quizResult?.passed === true : true;
  const interactionSatisfied = requiresInteraction ? interacted : true;
  // The ONLY condition under which a lesson is marked complete. It is
  // never set true just because the page was opened (see spec: "Never
  // mark a lesson complete merely because it was opened").
  const canComplete = interactionSatisfied && quizSatisfied;

  function handleInteract() {
    if (interacted) return;
    setInteracted(true);
    if (localMode) {
      updateLocalState(lessonId, { interacted: true });
      return;
    }
    if (!userId) return;
    upsertLessonProgress(userId, lessonId, { interacted: true }).catch((err) => {
      setSaveError(err instanceof Error ? err.message : "Couldn't save your progress.");
    });
  }

  function handleGraded(result: GradeQuizAttemptResult) {
    setQuizResult(result);
  }

  useEffect(() => {
    if (canComplete && !hasPersistedCompletion.current) {
      hasPersistedCompletion.current = true;
      setCompleted(true);
      if (localMode) {
        updateLocalState(lessonId, { interacted, completed: true });
        return;
      }
      if (!userId) return;
      upsertLessonProgress(userId, lessonId, { completed: true }).catch((err) => {
        hasPersistedCompletion.current = false;
        setCompleted(false);
        setSaveError(err instanceof Error ? err.message : "Couldn't save your progress.");
      });
    }
  }, [canComplete, interacted, lessonId, localMode, userId]);

  async function handleToggleBookmark() {
    const next = !bookmarked;
    setBookmarkedState(next); // optimistic
    if (localMode) {
      updateLocalState(lessonId, { bookmarked: next });
      return;
    }
    if (!userId) return;
    try {
      await setBookmarked(userId, lessonId, next);
    } catch (err) {
      setBookmarkedState(!next); // revert on failure
      setSaveError(err instanceof Error ? err.message : "Couldn't update bookmark.");
    }
  }

  return (
    <div className="min-w-0 max-w-full space-y-10">
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            completed
              ? "bg-green-600/10 text-green-700 dark:text-green-400"
              : "bg-ink-light/10 text-ink-light/60 dark:bg-ink-dark/10 dark:text-ink-dark/60"
          }`}
        >
          {completed ? "Completed" : "In progress"}
        </span>
        <button
          type="button"
          onClick={handleToggleBookmark}
          aria-pressed={bookmarked}
          className="text-sm text-accent hover:underline"
        >
          {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
        </button>
      </div>

      {saveError && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {saveError}
        </p>
      )}

      {sections.map((section) => (
        <LessonSectionRenderer
          key={section.id}
          section={section}
          onInteract={
            section.section_type === "interactive_example" || section.section_type === "mini_challenge"
              ? handleInteract
              : undefined
          }
        />
      ))}

      {quiz && (
        <QuizBlock
          quizId={quiz.id}
          title={quiz.title}
          questions={quiz.questions}
          localMode={quiz.localMode ?? localMode}
          onGraded={handleGraded}
        />
      )}

      {!completed && (
        <p className="text-sm text-ink-light/60 dark:text-ink-dark/60">
          {!interactionSatisfied && "Try the interactive example or Lab above"}
          {!interactionSatisfied && !quizSatisfied && " and "}
          {!quizSatisfied && "pass the quiz"}
          {(!interactionSatisfied || !quizSatisfied) && " to complete this lesson."}
        </p>
      )}
    </div>
  );
}
