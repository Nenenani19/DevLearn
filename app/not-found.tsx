import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 font-serif text-3xl">Page not found</h1>
      <p className="mt-4 text-sm text-ink-light/70 dark:text-ink-dark/70">
        That page doesn&apos;t exist yet — or never did.
      </p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-accent px-5 py-2.5 text-white">
        Back home
      </Link>
    </div>
  );
}
