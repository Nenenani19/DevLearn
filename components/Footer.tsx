import Link from "next/link";

const COLUMNS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Learn",
    links: [
      { href: "/roadmap", label: "Roadmap" },
      { href: "/learn/html", label: "HTML" },
      { href: "/compare", label: "Compare concepts" },
      { href: "/mistake-lab", label: "Mistake Lab" },
    ],
  },
  {
    heading: "About",
    links: [
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-ink-light/10 dark:border-ink-dark/10">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <Link href="/" className="font-serif text-lg italic">
              DevLearn
            </Link>
            <p className="mt-2 text-sm text-ink-light/60 dark:text-ink-dark/60">
              Learn to code by seeing what it does.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-medium uppercase tracking-widest2 text-ink-light/50 dark:text-ink-dark/50">
                {col.heading}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-ink-light/40 dark:text-ink-dark/40">
          © {year} DevLearn. Built as an open template — see the Terms page before deploying it as
          your own service.
        </p>
      </div>
    </footer>
  );
}
