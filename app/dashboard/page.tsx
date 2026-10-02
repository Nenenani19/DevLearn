import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getContinueLearning, getBookmarks, getCompletedLessonCount } from "@/lib/dashboard";

export const metadata = { title: "Dashboard" };

function greeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, nickname")
    .eq("id", user.id)
    .single();

  const [continueLearning, bookmarks, completedCount] = await Promise.all([
    getContinueLearning(user.id),
    getBookmarks(user.id),
    getCompletedLessonCount(user.id),
  ]);

  const displayName = profile?.nickname || profile?.full_name || "there";
  // Server-rendered, so this reflects server time, not the visitor's
  // local time zone — a documented limitation, see README.
  const hour = new Date().getHours();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-serif text-3xl">
        {greeting(hour)}, {displayName}.
      </h1>
      <p className="mt-2 text-ink-light/70 dark:text-ink-dark/70">
        {completedCount > 0
          ? `${completedCount} lesson${completedCount === 1 ? "" : "s"} completed so far.`
          : "You haven't completed a lesson yet — pick one up below."}
      </p>

      {continueLearning && (
        <Link
          href={continueLearning.href}
          className="mt-8 block rounded-xl border border-accent/40 p-6 transition hover:border-accent"
        >
          <p className="text-xs uppercase tracking-widest text-accent">Continue learning</p>
          <h2 className="mt-2 font-serif text-xl">{continueLearning.lessonTitle}</h2>
          <p className="mt-1 text-sm text-ink-light/60 dark:text-ink-dark/60">{continueLearning.languageName}</p>
        </Link>
      )}

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href="/roadmap"
          className="rounded-xl border border-ink-light/15 p-6 transition hover:border-accent dark:border-ink-dark/15"
        >
          <h2 className="font-serif text-xl">View the roadmap</h2>
          <p className="mt-1 text-sm text-ink-light/60 dark:text-ink-dark/60">
            See how HTML, CSS, JavaScript and beyond connect.
          </p>
        </Link>
        <Link
          href="/profile"
          className="rounded-xl border border-ink-light/15 p-6 transition hover:border-accent dark:border-ink-dark/15"
        >
          <h2 className="font-serif text-xl">Edit your profile</h2>
          <p className="mt-1 text-sm text-ink-light/60 dark:text-ink-dark/60">
            Update your name, nickname and avatar.
          </p>
        </Link>
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-xl">Bookmarks</h2>
        {bookmarks.length === 0 ? (
          <p className="mt-2 text-sm text-ink-light/60 dark:text-ink-dark/60">
            Nothing bookmarked yet — the ★ button on any lesson saves it here.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {bookmarks.map((b) => (
              <li key={b.href}>
                <Link
                  href={b.href}
                  className="flex items-center justify-between rounded-md border border-ink-light/10 px-4 py-2.5 text-sm hover:border-accent dark:border-ink-dark/10"
                >
                  <span>{b.lessonTitle}</span>
                  <span className="text-ink-light/50 dark:text-ink-dark/50">{b.languageName}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
