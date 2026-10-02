import Link from "next/link";

export const metadata = { title: "Compare" };

type Comparison = {
  title: string;
  left: { name: string; points: string[] };
  right: { name: string; points: string[] };
  verdict: string;
  relatedHref?: string;
  relatedLabel?: string;
};

const COMPARISONS: Comparison[] = [
  {
    title: "<h1> vs. a styled <div>",
    left: {
      name: "<h1>Loam House</h1>",
      points: [
        "Announced as a heading by screen readers",
        "Included in the browser's document outline",
        "Signals page topic to search engines",
      ],
    },
    right: {
      name: '<div class="h1-style">Loam House</div>',
      points: [
        "Looks identical once CSS is applied",
        "Carries zero heading semantics",
        "Invisible to outline navigation and search",
      ],
    },
    verdict:
      "Same pixels, different meaning. Semantics live in the element you choose, not in how it's styled.",
    relatedHref: "/learn/html/h1",
    relatedLabel: "See the full <h1> lesson",
  },
  {
    title: "<ul> vs. <ol>",
    left: {
      name: "<ul> — unordered",
      points: [
        "Items with no meaningful sequence",
        "Rendered with bullets by default",
        "Reordering items doesn't change meaning",
      ],
    },
    right: {
      name: "<ol> — ordered",
      points: [
        "Items where sequence is the point",
        "Rendered with numbers by default",
        "Reordering items changes the meaning (steps, rankings)",
      ],
    },
    verdict: "Ask: if I shuffled these items, would the meaning change? If yes, it's an ol.",
    relatedHref: "/learn/html/ul",
    relatedLabel: "See the full <ul> lesson",
  },
  {
    title: "href link vs. onclick navigation",
    left: {
      name: '<a href="/roadmap">',
      points: [
        "Real link: middle-click, new-tab, and keyboard focus all work",
        "Shows the destination on hover in most browsers",
        "Still works if JavaScript fails to load",
      ],
    },
    right: {
      name: "<a onclick=\"location.href='/roadmap'\">",
      points: [
        "Not a real link — no href means no navigation semantics",
        "Breaks entirely if JavaScript fails or is disabled",
        "Doesn't show a destination on hover",
      ],
    },
    verdict: "If it navigates, it should have a real href — not a click handler standing in for one.",
    relatedHref: "/learn/html/a",
    relatedLabel: "See the full <a> lesson",
  },
];

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="eyebrow">Comparison mode</p>
      <h1 className="mt-3 font-serif text-4xl">Compare related concepts</h1>
      <p className="mt-4 text-ink-light/70 dark:text-ink-dark/70">
        Some concepts are easiest to understand side by side.
      </p>

      <div className="mt-10 space-y-10">
        {COMPARISONS.map((c) => (
          <div key={c.title} className="rounded-xl border border-ink-light/15 p-6 dark:border-ink-dark/15">
            <h2 className="font-serif text-xl">{c.title}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[c.left, c.right].map((side) => (
                <div key={side.name} className="rounded-lg bg-ink-light/[0.03] p-4 dark:bg-ink-dark/[0.03]">
                  <p className="font-mono text-sm text-accent">{side.name}</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-ink-light/75 dark:text-ink-dark/75">
                    {side.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span aria-hidden="true">·</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm italic text-ink-light/60 dark:text-ink-dark/60">{c.verdict}</p>
            {c.relatedHref && (
              <Link href={c.relatedHref} className="mt-2 inline-block text-xs uppercase tracking-widest2 text-accent hover:underline">
                {c.relatedLabel} →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
