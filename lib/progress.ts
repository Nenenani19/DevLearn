"use client";

import { createClient } from "@/lib/supabase/client";
import type { GradeQuizAttemptResult, UserLessonProgress } from "@/types/database";

/**
 * Upserts the caller's own progress row for a lesson. RLS requires
 * user_id = auth.uid(), so this only ever succeeds for the signed-in
 * user's own row — there is no code path that marks someone else's
 * lesson complete.
 */
export async function upsertLessonProgress(
  userId: string,
  lessonId: string,
  patch: { interacted?: boolean; completed?: boolean }
) {
  const supabase = createClient();

  const update: Partial<UserLessonProgress> & { user_id: string; lesson_id: string } = {
    user_id: userId,
    lesson_id: lessonId,
    last_visited_at: new Date().toISOString(),
    ...patch,
  };
  if (patch.completed) {
    update.completed_at = new Date().toISOString();
  }

  const { error } = await supabase.from("user_lesson_progress").upsert(update, {
    onConflict: "user_id,lesson_id",
  });

  if (error) throw new Error(`Failed to save progress: ${error.message}`);
}

export async function setBookmarked(userId: string, lessonId: string, bookmarked: boolean) {
  const supabase = createClient();

  if (bookmarked) {
    const { error } = await supabase.from("bookmarks").insert({ user_id: userId, lesson_id: lessonId });
    // Re-bookmarking something already bookmarked hits the primary
    // key and is not a real error worth surfacing to the user.
    if (error && !error.message.includes("duplicate key")) {
      throw new Error(`Failed to bookmark: ${error.message}`);
    }
  } else {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", userId)
      .eq("lesson_id", lessonId);
    if (error) throw new Error(`Failed to remove bookmark: ${error.message}`);
  }
}

/**
 * Submits quiz answers for server-side grading via the
 * grade_quiz_attempt() Postgres function — the client never computes
 * or sends its own score, so it cannot forge a passing result.
 */
export async function submitQuizAttempt(
  quizId: string,
  answers: Record<string, string>
): Promise<GradeQuizAttemptResult> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("grade_quiz_attempt", {
    p_quiz_id: quizId,
    p_answers: answers,
  });

  if (error) throw new Error(`Failed to grade quiz: ${error.message}`);
  if (!data || data.length === 0) throw new Error("Grading returned no result.");
  return data[0];
}
