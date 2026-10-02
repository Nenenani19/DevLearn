import { createClient } from "@/lib/supabase/server";
import { resolveLessonPaths } from "@/lib/content";

export type ContinueLearning = { href: string; lessonTitle: string; languageName: string; lastVisitedAt: string };

export async function getContinueLearning(userId: string): Promise<ContinueLearning | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_lesson_progress")
    .select("lesson_id, last_visited_at")
    .eq("user_id", userId)
    .order("last_visited_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(`Failed to load continue-learning: ${error.message}`);
  if (!data) return null;

  const paths = await resolveLessonPaths([data.lesson_id]);
  const path = paths.get(data.lesson_id);
  if (!path) return null;

  return {
    href: `/learn/${path.languageSlug}/${path.lessonSlug}`,
    lessonTitle: path.lessonTitle,
    languageName: path.languageName,
    lastVisitedAt: data.last_visited_at,
  };
}

export type BookmarkItem = { href: string; lessonTitle: string; languageName: string };

export async function getBookmarks(userId: string, limit = 10): Promise<BookmarkItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select("lesson_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to load bookmarks: ${error.message}`);
  if (!data.length) return [];

  const paths = await resolveLessonPaths(data.map((b) => b.lesson_id));
  return data
    .map((b) => paths.get(b.lesson_id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({
      href: `/learn/${p.languageSlug}/${p.lessonSlug}`,
      lessonTitle: p.lessonTitle,
      languageName: p.languageName,
    }));
}

export async function getCompletedLessonCount(userId: string): Promise<number> {
  const supabase = createClient();
  const { count, error } = await supabase
    .from("user_lesson_progress")
    .select("lesson_id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("completed", true);

  if (error) throw new Error(`Failed to count completed lessons: ${error.message}`);
  return count ?? 0;
}
