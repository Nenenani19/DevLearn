export const metadata = { title: "Terms" };

export default function TermsPage() {
  const year = new Date().getFullYear();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="eyebrow">Documentation</p>
      <h1 className="mt-3 font-serif text-4xl">Terms of Use</h1>
      <p className="mt-2 text-sm text-ink-light/50 dark:text-ink-dark/50">
        Last updated {year}. Written for this specific codebase, not generic legal boilerplate.
      </p>

      <div className="mt-8 space-y-8 leading-relaxed text-ink-light/80 dark:text-ink-dark/80">
        <section>
          <h2 className="font-serif text-xl">What this is</h2>
          <p className="mt-2">
            An educational platform provided as-is, actively under development. Some languages on
            the roadmap are marked &quot;coming soon&quot; because their curriculum genuinely
            doesn&apos;t exist yet — this page won&apos;t pretend otherwise.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl">Your account</h2>
          <p className="mt-2">
            You&apos;re responsible for keeping your password secure and for the accuracy of the
            information you provide at signup. One account per person.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl">Content</h2>
          <p className="mt-2">
            Lessons, explanations, and exercises are provided for learning purposes. Code examples
            are safe to copy and use in your own projects.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl">No warranty</h2>
          <p className="mt-2">
            This software is provided without warranty of any kind. Technical explanations are
            written carefully, but if you find an error, it&apos;s a bug in the content — report
            it rather than assuming it&apos;s correct.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl">If you&apos;re deploying this yourself</h2>
          <p className="mt-2">
            Replace this page with terms that reflect your own deployment, entity, and
            jurisdiction before operating this as a real service — this text is a starting point,
            not legal advice.
          </p>
        </section>
      </div>
    </div>
  );
}
