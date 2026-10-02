import Link from "next/link";
import { getMistakeLabEntries } from "@/lib/content";
import { FixTheMistakeExercise } from "@/components/lesson/FixTheMistakeExercise";

export const metadata = { title: "Mistake Lab" };
export const revalidate = 0;

export default async function MistakeLabPage() {
  const entries = await getMistakeLabEntries();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="eyebrow">What if I write it wrong?</p>
      <h1 className="mt-3 font-serif text-4xl">Mistake Lab</h1>
      <p className="mt-4 text-ink-light/70 dark:text-ink-dark/70">
        Every exercise below is pulled live from the lessons themselves — practice spotting and
        fixing real mistakes without opening each lesson individually.
      </p>

      {entries.length === 0 ? (
        <p className="mt-10 text-sm text-ink-light/60 dark:text-ink-dark/60">
          No exercises are seeded yet.
        </p>
      ) : (
        <div className="mt-10 space-y-10">
          {entries.map((entry) => (
            <div key={entry.lessonId} className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-serif text-lg">{entry.lessonTitle}</p>
                <Link
                  href={`/learn/${entry.languageSlug}/${entry.lessonSlug}`}
                  className="text-xs uppercase tracking-widest2 text-accent hover:underline"
                >
                  Full lesson →
                </Link>
              </div>
              {entry.explanation && (
                <p className="text-sm text-ink-light/70 dark:text-ink-dark/70">{entry.explanation}</p>
              )}
              <FixTheMistakeExercise
                wrongCode={entry.wrongCode}
                correctCode={entry.correctCode}
                hint={entry.hint}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
