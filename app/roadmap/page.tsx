import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getRoadmapLanguages } from "@/lib/content";

export const metadata = { title: "Roadmap" };
export const revalidate = 0; // content changes via SQL editor, not deploys — always fetch fresh

export default async function RoadmapPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirectedFrom=%2Froadmap");

  const languages = await getRoadmapLanguages();
  const byId = new Map(languages.map((l) => [l.id, l]));

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-serif text-3xl">The roadmap</h1>
      <p className="mt-2 text-sm text-ink-light/70 dark:text-ink-dark/70">
        Explore available learning paths across web development, backend programming, and systems languages.
      </p>

      <ol className="mt-8 space-y-3">
        {languages.map((language) => {
          const prerequisites = language.depends_on
            .map((id) => byId.get(id)?.name)
            .filter((name): name is string => Boolean(name));

          const isAvailable = language.status === "available";

          const content = (
            <div
              className={`rounded-lg border px-4 py-3 transition ${
                isAvailable
                  ? "border-accent/40 hover:border-accent"
                  : "border-ink-light/10 dark:border-ink-dark/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{language.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                    isAvailable
                      ? "bg-accent/10 text-accent"
                      : "bg-ink-light/10 text-ink-light/50 dark:bg-ink-dark/10 dark:text-ink-dark/50"
                  }`}
                >
                  {isAvailable ? "Available" : "Coming soon"}
                </span>
              </div>
              <p className="mt-1 text-sm text-ink-light/60 dark:text-ink-dark/60">{language.description}</p>
              {prerequisites.length > 0 && (
                <p className="mt-2 text-xs text-ink-light/40 dark:text-ink-dark/40">
                  After: {prerequisites.join(", ")}
                </p>
              )}
            </div>
          );

          return (
            <li key={language.id}>
              {isAvailable ? (
                <Link href={`/learn/${language.slug}`} className="block">
                  {content}
                </Link>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
