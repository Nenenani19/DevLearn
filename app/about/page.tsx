export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="eyebrow">About</p>
      <h1 className="mt-3 font-serif text-4xl">Why DevLearn exists</h1>

      <div className="mt-8 space-y-5 leading-relaxed text-ink-light/80 dark:text-ink-dark/80">
        <p>
          Most programming references explain an entire topic at once — every heading level, every
          array method, every input type — in one long page. That&apos;s efficient to write, but
          it&apos;s a hard way to actually learn something for the first time.
        </p>
        <p>
          DevLearn takes the opposite approach: one concept, fully explained, before moving to the
          next. Each lesson walks through what something is, why it exists, how its syntax breaks
          down piece by piece, where people usually get it wrong, and a working example you can
          edit and watch render in real time.
        </p>
        <p>
          This is an early, actively growing build. HTML has a real (if still small) set of lessons
          live today; everything else on the roadmap is honestly marked as not built yet, rather
          than padded out with placeholder content.
        </p>
      </div>
    </div>
  );
}
