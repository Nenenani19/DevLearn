export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  const year = new Date().getFullYear();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="eyebrow">Documentation</p>
      <h1 className="mt-3 font-serif text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-light/50 dark:text-ink-dark/50">
        Last updated {year}. This page describes what this specific codebase actually does with
        data — it is documentation of the software, not a substitute for legal advice.
      </p>

      <div className="mt-8 space-y-8 leading-relaxed text-ink-light/80 dark:text-ink-dark/80">
        <section>
          <h2 className="font-serif text-xl">What&apos;s collected</h2>
          <p className="mt-2">
            At signup: your full name, email address, password (handled entirely by Supabase Auth
            — this codebase never sees or stores your raw password), and the account details you
            provide (student/employed/other, and an institution or company name if given).
          </p>
          <p className="mt-2">
            While using the platform: which lessons you&apos;ve visited and completed, your quiz
            answers and scores, and which lessons you&apos;ve bookmarked.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl">What&apos;s not collected</h2>
          <p className="mt-2">
            No analytics or tracking scripts are included in this codebase. No advertising
            identifiers. No data is sold or shared with third parties — there is no code path in
            this application that does so.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl">Cookies</h2>
          <p className="mt-2">
            A single session cookie, set by Supabase Auth, keeps you logged in. This site does not
            set any advertising or third-party tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl">Where data lives</h2>
          <p className="mt-2">
            Everything is stored in a Postgres database via Supabase, protected by Row Level
            Security — the database itself enforces that you can only ever read or write your own
            data, not just the application code.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl">Deleting your data</h2>
          <p className="mt-2">
            Deleting your account (via Supabase Auth) cascades to remove your profile, progress,
            quiz attempts, and bookmarks — the database&apos;s foreign keys are set to cascade on
            delete, not just the application&apos;s own logic.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl">If you&apos;re deploying this yourself</h2>
          <p className="mt-2">
            This page describes what the code in this repository does. If you operate your own
            deployment, replace this page with your own privacy policy reflecting your actual
            practices, hosting provider, and jurisdiction — this text is not a substitute for
            legal review.
          </p>
        </section>
      </div>
    </div>
  );
}
