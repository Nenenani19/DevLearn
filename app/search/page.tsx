import Link from "next/link";
import { searchContent } from "@/lib/content";

export const metadata = { title: "Search" };
export const revalidate = 0;

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q ?? "";
  const results = query.trim().length >= 2 ? await searchContent(query) : [];

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="eyebrow">Search</p>
      <h1 className="mt-3 font-serif text-4xl">Find a lesson or language</h1>

      {/* Plain GET form — works with JavaScript disabled, since the
          query lives entirely in the URL rather than client state. */}
      <form method="GET" action="/search" className="mt-8">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Try “heading” or “list”…"
          aria-label="Search lessons and languages"
          className="w-full rounded-full border border-ink-light/20 bg-transparent px-5 py-3 outline-none focus:border-accent dark:border-ink-dark/20"
        />
      </form>

      <div className="mt-10">
        {query.trim().length > 0 && query.trim().length < 2 ? (
          <p className="text-sm text-ink-light/50 dark:text-ink-dark/50">Keep typing — at least 2 characters.</p>
        ) : query.trim().length >= 2 && results.length === 0 ? (
          <p className="text-sm text-ink-light/50 dark:text-ink-dark/50">No matches for &quot;{query}&quot;.</p>
        ) : (
          <ul className="space-y-3">
            {results.map((r) => (
              <li key={r.href + r.title}>
                <Link
                  href={r.href}
                  className="block rounded-lg border border-ink-light/10 px-4 py-3 hover:border-accent dark:border-ink-dark/10"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-widest2 text-accent">{r.type}</span>
                    <span className="font-medium">{r.title}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink-light/60 dark:text-ink-dark/60">{r.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
