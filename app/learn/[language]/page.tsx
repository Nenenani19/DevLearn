import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getLanguageTree, flattenLessons, getProgressForLessons } from "@/lib/content";

export async function generateMetadata({ params }: { params: { language: string } }) {
  const tree = await getLanguageTree(params.language);
  return { title: tree ? tree.name : "Not found" };
}

export default async function LanguageOverviewPage({ params }: { params: { language: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?redirectedFrom=${encodeURIComponent(`/learn/${params.language}`)}`);

  const tree = await getLanguageTree(params.language);
  if (!tree) notFound();

  if (tree.status === "coming_soon") {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="text-xs uppercase tracking-widest text-accent">Coming soon</p>
        <h1 className="mt-3 font-serif text-3xl">{tree.name}</h1>
        <p className="mt-4 text-sm text-ink-light/70 dark:text-ink-dark/70">{tree.description}</p>
        <Link href="/roadmap" className="mt-6 inline-block text-sm text-accent hover:underline">
          Back to the roadmap
        </Link>
      </div>
    );
  }

  const allLessons = flattenLessons(tree);
  const isLocalCourse = tree.id.startsWith("local-");
  let progress = new Map<string, { completed: boolean; interacted: boolean }>();
  if (!isLocalCourse) progress = await getProgressForLessons(user.id, allLessons.map((l) => l.id));
  const completedCount = allLessons.filter((l) => progress.get(l.id)?.completed).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-3xl">{tree.name}</h1>
      <p className="mt-2 text-ink-light/70 dark:text-ink-dark/70">{tree.description}</p>

      {allLessons.length > 0 && (
        <p className="mt-4 text-sm text-ink-light/60 dark:text-ink-dark/60">
          {isLocalCourse ? `${allLessons.length} lessons` : `${completedCount} of ${allLessons.length} lessons complete`}
        </p>
      )}

      <div className="mt-8 space-y-8">
        {tree.courses.map((course) => (
          <div key={course.id}>
            <h2 className="font-serif text-xl">{course.title}</h2>
            <p className="text-sm text-ink-light/60 dark:text-ink-dark/60">{course.description}</p>

            <div className="mt-4 space-y-6">
              {course.modules.map((mod) => (
                <div key={mod.id}>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-light/50 dark:text-ink-dark/50">
                    {mod.title}
                  </h3>
                  <div className="mt-2 space-y-4">
                    {mod.topics.map((topic) => (
                      <div key={topic.id}>
                        <p className="text-sm font-medium">{topic.title}</p>
                        <ul className="mt-1 space-y-1">
                          {topic.lessons.map((lesson) => {
                            const isDone = progress.get(lesson.id)?.completed;
                            return (
                              <li key={lesson.id}>
                                <Link
                                  href={`/learn/${tree.slug}/${lesson.slug}`}
                                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-ink-light/5 dark:hover:bg-ink-dark/5"
                                >
                                  <span
                                    aria-hidden="true"
                                    className={isDone ? "text-green-600 dark:text-green-400" : "text-ink-light/30 dark:text-ink-dark/30"}
                                  >
                                    {isDone ? "●" : "○"}
                                  </span>
                                  <span>{lesson.title}</span>
                                  {lesson.summary && (
                                    <span className="text-ink-light/50 dark:text-ink-dark/50">— {lesson.summary}</span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
