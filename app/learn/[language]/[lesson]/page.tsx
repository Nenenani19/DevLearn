import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  getLanguageTree,
  flattenLessons,
  getLessonBySlug,
  getProgressForLessons,
  isLessonBookmarked,
  type LanguageTree,
  type LessonDetail,
} from "@/lib/content";
import { getLocalLanguageTree, getLocalLessonDetail } from "@/lib/curriculum";
import { LessonExperience } from "@/components/lesson/LessonExperience";

export async function generateMetadata({ params }: { params: { language: string; lesson: string } }) {
  const detail = await getLessonBySlug(params.language, params.lesson);
  return { title: detail ? detail.lesson.title : "Lesson not found" };
}

export default async function LessonPage({
  params,
}: {
  params: { language: string; lesson: string };
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?redirectedFrom=${encodeURIComponent(`/learn/${params.language}/${params.lesson}`)}`);

  const localTree = getLocalLanguageTree(params.language);
  const localDetail = getLocalLessonDetail(params.language, params.lesson);

  if (localTree) {
    if (!localDetail) notFound();
    const allLessons = flattenLessons(localTree);
    const currentIndex = allLessons.findIndex((lesson) => lesson.id === localDetail.lesson.id);
    return (
      <LessonPageBody
        tree={localTree}
        detail={localDetail}
        prevLesson={currentIndex > 0 ? allLessons[currentIndex - 1] : null}
        nextLesson={currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null}
        localMode
      />
    );
  }

  const tree = await getLanguageTree(params.language);
  if (!tree || tree.status !== "available") notFound();

  const detail = await getLessonBySlug(params.language, params.lesson);
  if (!detail) notFound();

  const allLessons = flattenLessons(tree);
  const currentIndex = allLessons.findIndex((l) => l.id === detail.lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const [progressMap, bookmarked] = await Promise.all([
    getProgressForLessons(user.id, [detail.lesson.id]),
    isLessonBookmarked(user.id, detail.lesson.id),
  ]);
  const progress = progressMap.get(detail.lesson.id);

  return (
    <LessonPageBody
      tree={tree}
      detail={detail}
      userId={user.id}
      progress={progress}
      initialBookmarked={bookmarked}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
    />
  );
}

function LessonPageBody({
  tree,
  detail,
  userId,
  progress,
  initialBookmarked = false,
  prevLesson,
  nextLesson,
  localMode = false,
}: {
  tree: LanguageTree;
  detail: LessonDetail;
  userId?: string;
  progress?: { completed: boolean; interacted: boolean };
  initialBookmarked?: boolean;
  prevLesson: ReturnType<typeof flattenLessons>[number] | null;
  nextLesson: ReturnType<typeof flattenLessons>[number] | null;
  localMode?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link href={`/learn/${tree.slug}`} className="text-sm text-accent hover:underline">
        ← {tree.name}
      </Link>
      <h1 className="mt-3 font-serif text-4xl">{detail.lesson.title}</h1>
      {detail.lesson.summary && (
        <p className="mt-2 text-ink-light/70 dark:text-ink-dark/70">{detail.lesson.summary}</p>
      )}
      <div className="mt-8">
        <LessonExperience
          userId={userId}
          lessonId={detail.lesson.id}
          requiresInteraction={detail.lesson.requires_interaction}
          sections={detail.sections}
          quiz={detail.quiz}
          localMode={localMode}
          initialInteracted={progress?.interacted ?? false}
          initialCompleted={progress?.completed ?? false}
          initialBookmarked={initialBookmarked}
        />
      </div>
      <nav className="mt-12 flex items-center justify-between border-t border-ink-light/10 pt-6 dark:border-ink-dark/10">
        {prevLesson ? (
          <Link href={`/learn/${tree.slug}/${prevLesson.slug}`} className="text-sm text-accent hover:underline">
            ← {prevLesson.title}
          </Link>
        ) : <span />}
        {nextLesson ? (
          <Link href={`/learn/${tree.slug}/${nextLesson.slug}`} className="text-sm text-accent hover:underline">
            {nextLesson.title} →
          </Link>
        ) : <span />}
      </nav>
    </div>
  );
}
