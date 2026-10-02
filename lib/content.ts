import { createClient } from "@/lib/supabase/server";
import type { Language, Course, Module, Topic, Lesson, LessonSection, Quiz, QuizQuestion, QuizOptionPublic } from "@/types/database";
import { isCommonMistakesContent, isFixTheMistakeContent } from "@/types/content";
import { getLocalLanguageTree, getLocalLessonDetail, getLocalLanguages } from "@/lib/curriculum";

export type SearchResult = {
  type: "lesson" | "language";
  title: string;
  description: string;
  href: string;
};

/**
 * Real search across seeded content — lesson titles/summaries and
 * language names/descriptions, via ILIKE. Small enough content size
 * that a simple pattern match is honest and sufficient; a larger
 * curriculum would want Postgres full-text search (tsvector) instead.
 */
export async function searchContent(query: string): Promise<SearchResult[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const supabase = createClient();
  const pattern = `%${trimmed}%`;

  const [{ data: lessons, error: lessonErr }, { data: languages, error: langErr }] = await Promise.all([
    supabase.from("lessons").select("id, slug, title, summary, topic_id").or(`title.ilike.${pattern},summary.ilike.${pattern}`),
    supabase.from("languages").select("slug, name, description, status").or(`name.ilike.${pattern},description.ilike.${pattern}`),
  ]);

  if (lessonErr) throw new Error(`Search failed (lessons): ${lessonErr.message}`);
  if (langErr) throw new Error(`Search failed (languages): ${langErr.message}`);

  const results: SearchResult[] = [];

  if (lessons.length) {
    const paths = await resolveLessonPaths(lessons.map((l) => l.id));
    for (const lesson of lessons) {
      const path = paths.get(lesson.id);
      if (!path) continue;
      results.push({
        type: "lesson",
        title: lesson.title,
        description: lesson.summary ?? `Part of ${path.languageName}`,
        href: `/learn/${path.languageSlug}/${path.lessonSlug}`,
      });
    }
  }

  for (const lang of languages) {
    results.push({
      type: "language",
      title: lang.name,
      description: lang.description,
      href: lang.status === "available" ? `/learn/${lang.slug}` : "/roadmap",
    });
  }

  return results;
}

export type MistakeLabEntry = {
  lessonId: string;
  lessonTitle: string;
  languageSlug: string;
  languageName: string;
  lessonSlug: string;
  wrongCode: string;
  explanation: string;
  correctCode: string;
  hint: string;
};

/**
 * Every "fix the mistake" exercise across all lessons, paired with
 * its "common mistakes" explanation where one exists — powers the
 * standalone Mistake Lab page rather than requiring a full lesson
 * visit to practice error-spotting.
 */
export async function getMistakeLabEntries(): Promise<MistakeLabEntry[]> {
  const supabase = createClient();

  const { data: fixSections, error: fixErr } = await supabase
    .from("lesson_sections")
    .select("lesson_id, content")
    .eq("section_type", "fix_the_mistake");
  if (fixErr) throw new Error(`Failed to load mistake-lab exercises: ${fixErr.message}`);
  if (!fixSections.length) return [];

  const lessonIds = fixSections.map((s) => s.lesson_id);

  const { data: mistakeSections, error: mistakeErr } = await supabase
    .from("lesson_sections")
    .select("lesson_id, content")
    .eq("section_type", "common_mistakes")
    .in("lesson_id", lessonIds);
  if (mistakeErr) throw new Error(`Failed to load mistake explanations: ${mistakeErr.message}`);

  const explanationByLesson = new Map(
    mistakeSections
      .filter((s) => isCommonMistakesContent(s.content))
      .map((s) => [s.lesson_id, (s.content as { explanation: string }).explanation])
  );

  const paths = await resolveLessonPaths(lessonIds);

  const entries: MistakeLabEntry[] = [];
  for (const section of fixSections) {
    if (!isFixTheMistakeContent(section.content)) continue;
    const path = paths.get(section.lesson_id);
    if (!path) continue;

    entries.push({
      lessonId: section.lesson_id,
      lessonTitle: path.lessonTitle,
      languageSlug: path.languageSlug,
      languageName: path.languageName,
      lessonSlug: path.lessonSlug,
      wrongCode: section.content.wrongCode,
      correctCode: section.content.correctCode,
      hint: section.content.hint,
      explanation: explanationByLesson.get(section.lesson_id) ?? "",
    });
  }

  return entries;
}

export type LessonSummary = Pick<Lesson, "id" | "slug" | "title" | "summary" | "sort_order">;
export type TopicWithLessons = Topic & { lessons: LessonSummary[] };
export type ModuleWithTopics = Module & { topics: TopicWithLessons[] };
export type CourseWithModules = Course & { modules: ModuleWithTopics[] };
export type LanguageTree = Language & { courses: CourseWithModules[] };

/**
 * All languages for the roadmap, ordered for display. Public content
 * — works for anonymous visitors too (see RLS policy "content: public read").
 */
export async function getRoadmapLanguages(): Promise<Language[]> {
  const localLanguages = getLocalLanguages();
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("languages")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) return localLanguages;
    const languagesBySlug = new Map(data.map((language) => [language.slug, language]));
    for (const language of localLanguages) languagesBySlug.set(language.slug, language);
    return [...languagesBySlug.values()].sort((a, b) => a.sort_order - b.sort_order);
  } catch {
    return localLanguages;
  }
}

/**
 * The full course → module → topic → lesson tree for one language,
 * assembled from separate queries rather than one deep PostgREST
 * join — easier to reason about and verify correct at this content
 * size, and each level is independently indexed.
 */
export async function getLanguageTree(languageSlug: string): Promise<LanguageTree | null> {
  const localTree = getLocalLanguageTree(languageSlug);
  if (localTree) return localTree;

  const supabase = createClient();

  const { data: language, error: langErr } = await supabase
    .from("languages")
    .select("*")
    .eq("slug", languageSlug)
    .maybeSingle();

  if (langErr) throw new Error(`Failed to load language: ${langErr.message}`);
  if (!language) return null;

  const { data: courses, error: courseErr } = await supabase
    .from("courses")
    .select("*")
    .eq("language_id", language.id)
    .order("sort_order", { ascending: true });
  if (courseErr) throw new Error(`Failed to load courses: ${courseErr.message}`);
  if (!courses.length) return { ...language, courses: [] };

  const courseIds = courses.map((c) => c.id);
  const { data: modules, error: moduleErr } = await supabase
    .from("modules")
    .select("*")
    .in("course_id", courseIds)
    .order("sort_order", { ascending: true });
  if (moduleErr) throw new Error(`Failed to load modules: ${moduleErr.message}`);

  const moduleIds = modules.map((m) => m.id);
  const { data: topics, error: topicErr } = await supabase
    .from("topics")
    .select("*")
    .in("module_id", moduleIds.length ? moduleIds : ["00000000-0000-0000-0000-000000000000"])
    .order("sort_order", { ascending: true });
  if (topicErr) throw new Error(`Failed to load topics: ${topicErr.message}`);

  const topicIds = topics.map((t) => t.id);
  const { data: lessons, error: lessonErr } = await supabase
    .from("lessons")
    .select("id, slug, title, summary, sort_order, topic_id")
    .in("topic_id", topicIds.length ? topicIds : ["00000000-0000-0000-0000-000000000000"])
    .order("sort_order", { ascending: true });
  if (lessonErr) throw new Error(`Failed to load lessons: ${lessonErr.message}`);

  const tree: LanguageTree = {
    ...language,
    courses: courses.map((course) => ({
      ...course,
      modules: modules
        .filter((m) => m.course_id === course.id)
        .map((mod) => ({
          ...mod,
          topics: topics
            .filter((t) => t.module_id === mod.id)
            .map((topic) => ({
              ...topic,
              lessons: lessons
                .filter((l) => l.topic_id === topic.id)
                .map(({ id, slug, title, summary, sort_order }) => ({ id, slug, title, summary, sort_order })),
            })),
        })),
    })),
  };

  return tree;
}

/** Flattens a language tree into the single ordered lesson sequence used for Previous/Next. */
export function flattenLessons(tree: LanguageTree): LessonSummary[] {
  return tree.courses.flatMap((c) => c.modules.flatMap((m) => m.topics.flatMap((t) => t.lessons)));
}

export type ResolvedLessonPath = { languageSlug: string; languageName: string; lessonSlug: string; lessonTitle: string };

/**
 * Resolves a batch of lesson ids to their full language/lesson slug
 * path, via the same bulk sequential-IN-query pattern as
 * getLanguageTree — used by the dashboard's "continue learning" and
 * bookmarks list, which both need to build /learn/[language]/[lesson]
 * links from raw lesson ids.
 */
export async function resolveLessonPaths(lessonIds: string[]): Promise<Map<string, ResolvedLessonPath>> {
  const result = new Map<string, ResolvedLessonPath>();
  if (lessonIds.length === 0) return result;

  const supabase = createClient();

  const { data: lessons, error: lessonErr } = await supabase
    .from("lessons")
    .select("id, slug, title, topic_id")
    .in("id", lessonIds);
  if (lessonErr) throw new Error(`Failed to resolve lessons: ${lessonErr.message}`);
  if (!lessons.length) return result;

  const topicIds = [...new Set(lessons.map((l) => l.topic_id))];
  const { data: topics, error: topicErr } = await supabase
    .from("topics")
    .select("id, module_id")
    .in("id", topicIds);
  if (topicErr) throw new Error(`Failed to resolve topics: ${topicErr.message}`);

  const moduleIds = [...new Set(topics.map((t) => t.module_id))];
  const { data: modules, error: moduleErr } = await supabase
    .from("modules")
    .select("id, course_id")
    .in("id", moduleIds);
  if (moduleErr) throw new Error(`Failed to resolve modules: ${moduleErr.message}`);

  const courseIds = [...new Set(modules.map((m) => m.course_id))];
  const { data: courses, error: courseErr } = await supabase
    .from("courses")
    .select("id, language_id")
    .in("id", courseIds);
  if (courseErr) throw new Error(`Failed to resolve courses: ${courseErr.message}`);

  const languageIds = [...new Set(courses.map((c) => c.language_id))];
  const { data: languages, error: langErr } = await supabase
    .from("languages")
    .select("id, slug, name")
    .in("id", languageIds);
  if (langErr) throw new Error(`Failed to resolve languages: ${langErr.message}`);

  const topicToModule = new Map(topics.map((t) => [t.id, t.module_id]));
  const moduleToCourse = new Map(modules.map((m) => [m.id, m.course_id]));
  const courseToLanguage = new Map(courses.map((c) => [c.id, c.language_id]));
  const languageById = new Map(languages.map((l) => [l.id, l]));

  for (const lesson of lessons) {
    const moduleId = topicToModule.get(lesson.topic_id);
    const courseId = moduleId ? moduleToCourse.get(moduleId) : undefined;
    const languageId = courseId ? courseToLanguage.get(courseId) : undefined;
    const language = languageId ? languageById.get(languageId) : undefined;
    if (!language) continue; // orphaned data — skip rather than throw

    result.set(lesson.id, {
      languageSlug: language.slug,
      languageName: language.name,
      lessonSlug: lesson.slug,
      lessonTitle: lesson.title,
    });
  }

  return result;
}

/** Progress rows for a batch of lessons, for one user — used to render checkmarks on the course overview. */
export async function getProgressForLessons(
  userId: string,
  lessonIds: string[]
): Promise<Map<string, { completed: boolean; interacted: boolean }>> {
  const result = new Map<string, { completed: boolean; interacted: boolean }>();
  if (lessonIds.length === 0) return result;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_lesson_progress")
    .select("lesson_id, completed, interacted")
    .eq("user_id", userId)
    .in("lesson_id", lessonIds);

  if (error) throw new Error(`Failed to load progress: ${error.message}`);
  for (const row of data) {
    result.set(row.lesson_id, { completed: row.completed, interacted: row.interacted });
  }
  return result;
}

/** Whether the given lesson is bookmarked by this user. */
export async function isLessonBookmarked(userId: string, lessonId: string): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select("lesson_id")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (error) throw new Error(`Failed to check bookmark: ${error.message}`);
  return Boolean(data);
}

export type LessonDetail = {
  lesson: Lesson;
  sections: LessonSection[];
  quiz:
    | (Quiz & {
        localMode?: boolean;
        questions: (QuizQuestion & { correctOptionId?: string; options: QuizOptionPublic[] })[];
      })
    | null;
  localMode?: boolean;
};

/** Single lesson's full content: ordered sections + its quiz (options WITHOUT is_correct — see types/database.ts). */
export async function getLessonBySlug(languageSlug: string, lessonSlug: string): Promise<LessonDetail | null> {
  const localDetail = getLocalLessonDetail(languageSlug, lessonSlug);
  if (localDetail) return localDetail;

  const tree = await getLanguageTree(languageSlug);
  if (!tree) return null;

  const summary = flattenLessons(tree).find((l) => l.slug === lessonSlug);
  if (!summary) return null;

  const supabase = createClient();

  const { data: lesson, error: lessonErr } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", summary.id)
    .single();
  if (lessonErr) throw new Error(`Failed to load lesson: ${lessonErr.message}`);

  const { data: sections, error: sectionErr } = await supabase
    .from("lesson_sections")
    .select("*")
    .eq("lesson_id", lesson.id)
    .order("sort_order", { ascending: true });
  if (sectionErr) throw new Error(`Failed to load lesson sections: ${sectionErr.message}`);

  const { data: quizRow, error: quizErr } = await supabase
    .from("quizzes")
    .select("*")
    .eq("lesson_id", lesson.id)
    .maybeSingle();
  if (quizErr) throw new Error(`Failed to load quiz: ${quizErr.message}`);

  let quiz: LessonDetail["quiz"] = null;
  if (quizRow) {
    const { data: questions, error: qErr } = await supabase
      .from("quiz_questions")
      .select("*")
      .eq("quiz_id", quizRow.id)
      .order("sort_order", { ascending: true });
    if (qErr) throw new Error(`Failed to load quiz questions: ${qErr.message}`);

    const questionIds = questions.map((q) => q.id);
    // Deliberately select only the public columns — is_correct is
    // never sent to the browser while a quiz is being taken.
    const { data: options, error: oErr } = await supabase
      .from("quiz_options")
      .select("id, question_id, label, sort_order")
      .in("question_id", questionIds.length ? questionIds : ["00000000-0000-0000-0000-000000000000"])
      .order("sort_order", { ascending: true });
    if (oErr) throw new Error(`Failed to load quiz options: ${oErr.message}`);

    quiz = {
      ...quizRow,
      questions: questions.map((q) => ({ ...q, options: options.filter((o) => o.question_id === q.id) })),
    };
  }

  return { lesson, sections, quiz };
}
