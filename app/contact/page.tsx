export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-3 font-serif text-4xl">Get in touch</h1>

      <div className="mt-8 space-y-5 leading-relaxed text-ink-light/80 dark:text-ink-dark/80">
        <p>
          This build doesn&apos;t have a live support inbox behind it yet — it&apos;s a template.
          If you&apos;re deploying this yourself, replace the address below with a real one you
          monitor.
        </p>
        <p>
          <a href="mailto:hello@example.com" className="text-accent hover:underline">
            hello@example.com
          </a>{" "}
          <span className="text-sm text-ink-light/50 dark:text-ink-dark/50">— placeholder, replace before launch</span>
        </p>
        <p>
          Found a bug in a lesson, a broken link, or a technical inaccuracy? That&apos;s the most
          useful kind of message this template&apos;s contact page could receive once wired up to
          a real inbox.
        </p>
      </div>
    </div>
  );
}
