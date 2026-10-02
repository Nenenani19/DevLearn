# DevLearn Platform — Phase 1 (Foundation)

An element-by-element, visual programming-education platform. This is the
**Phase 1** build: real authentication, a real database, and the shell the
learning engine (Phase 2+) will be built into. Nothing in this codebase is
faked — every button here does exactly what it appears to do, and anything
not yet built is a labeled "coming soon," not a stub pretending to work.

## What's actually implemented in this build

**Phase 1 — Foundation**
- Next.js 14 (App Router) + TypeScript + Tailwind
- Supabase Auth: signup (with conditional account-type fields), email
  verification, login, logout, forgot password, reset password
- A real `profiles` + `user_preferences` schema with Row Level Security,
  auto-provisioned on signup via a database trigger
- Protected routes (`/dashboard`, `/profile`, `/learn`) enforced in
  middleware — not just hidden client-side
- Working profile editing (name, nickname, institution, avatar choice)
- Dark/light mode (persisted, respects system preference)
- Responsive nav with a working mobile menu
- Skip-to-content link, custom 404, `robots.txt`

**Phase 2 — Learning engine**
- Full content model: languages → courses → modules → topics → lessons
  → lesson sections → quizzes/questions/options, all driven by data
  (`supabase/schema_phase2.sql`) rather than hardcoded into components
- A real roadmap page pulling languages and dependency lines from the
  database, with "available" vs. "coming soon" states
- A course overview page (module/topic/lesson tree) with real
  per-lesson completion checkmarks
- A lesson page with: static explanation stages, a genuinely live
  HTML preview (an actual sandboxed iframe rendering what the learner
  types — not a simulated preview), a fix-the-mistake exercise with
  real answer checking, a quiz graded **server-side** via a Postgres
  function (the client never computes or submits its own score), and
  Previous/Next navigation
- Real completion logic: a lesson is marked complete only when its
  interactive step has been touched AND its quiz has been passed —
  never just because the page was opened
- Bookmarking and a "continue learning" pointer on the dashboard,
  both backed by real tables
- Six real HTML lessons seeded (`<h1>`, `<h2>`, `<p>`, `<ul>`, `<li>`,
  `<a>`) across four topics, proving the engine end-to-end. This is
  **not** the full HTML curriculum — see `docs/ARCHITECTURE_PLAN.md`
  for the concrete plan to keep extending it.

**Standalone features**
- **Mistake Lab** (`/mistake-lab`) — pulls every "fix the mistake"
  exercise live from across all seeded lessons into one practice page
- **Comparison Mode** (`/compare`) — side-by-side technical
  comparisons (original writing, tied to what's actually built)
- **Site search** (`/search`) — a real query across seeded lesson and
  language content (works with JavaScript disabled — it's a plain GET
  form)
- **FAQ** (`/faq`) — using native `<details>`/`<summary>`, genuinely
  functional with zero JavaScript
- **About, Privacy, Terms, Contact** pages — the legal pages describe
  what this specific codebase actually does (real data model, real
  RLS, real cascade-delete behavior), not generic boilerplate, and say
  plainly where a real deployment needs to customize them
- **Sitemap** (`/sitemap.xml`) — generated from live database content
  via Next's `sitemap.ts` convention, not a static file
- **Footer** — links to everything above, with a dynamically correct
  copyright year

## What's intentionally NOT here yet

The remaining 15 languages (still "coming soon" on the roadmap), the
full HTML curriculum, the revision system, the Code Explainer, the
browser/DOM/JS-runtime visualizers, GSAP-driven scroll storytelling,
and site search. These are Phase 3–5 per the agreed build order.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14, App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth + DB | Supabase (Postgres + Auth + Storage) |
| Animation | GSAP (installed, wired in from Phase 2 onward) |

## Folder structure

```
app/
  (auth)/login, signup, forgot-password, reset-password   ← auth pages
  auth/callback/route.ts                                   ← email verification handler
  dashboard/                                                ← protected — continue learning, bookmarks
  profile/                                                  ← protected
  roadmap/                                                  ← real, DB-driven
  learn/[language]/                                         ← course overview
  learn/[language]/[lesson]/                                ← lesson page
  mistake-lab/, compare/, search/, faq/                     ← standalone features
  about/, privacy/, terms/, contact/                        ← documentation pages
  sitemap.ts                                                ← generated from live DB content
  layout.tsx, page.tsx, globals.css, not-found.tsx
components/        Navbar, Footer, ThemeToggle — reusable UI
components/lesson/ LessonExperience (orchestrator), LessonSectionRenderer,
                    QuizBlock, InteractiveCodeBlock, FixTheMistakeExercise, CodeBlock
context/           ThemeProvider (client-side dark mode state)
lib/supabase/      client.ts (browser), server.ts (RSC/route handlers),
                    middleware.ts (session refresh + route protection)
lib/content.ts     Course-tree, lesson-content, search, and mistake-lab data fetchers
lib/dashboard.ts   Continue-learning, bookmarks, completion-count fetchers
lib/progress.ts    Client-side writes: progress upsert, bookmark toggle, quiz submit
types/database.ts  Hand-written types mirroring the schema
types/content.ts   Per-lesson-stage content shapes + runtime guards
supabase/schema.sql                Phase 1: profiles, preferences, RLS, triggers, storage
supabase/schema_phase2.sql         Phase 2: content model + progress/quiz/bookmark tables + grading function
supabase/seed.sql                  Roadmap languages + h1/h2/p lessons
supabase/seed_lists_and_links.sql  ul/li/a lessons
docs/ARCHITECTURE_PLAN.md          Concrete technical plan for remaining large-scope items
```

## 1. Prerequisites

- Node.js 18.18+ (Next.js 14 requirement)
- A free [Supabase](https://supabase.com) account

## 2. Create the Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**.
2. Once it's provisioned, open **Project Settings → API**. You'll need:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3. Run the database schema

In the Supabase dashboard, open **SQL Editor → New query** and run these
**in order**:

1. `supabase/schema.sql` — profiles, preferences, RLS, the signup trigger, avatar storage
2. `supabase/schema_phase2.sql` — the content model, progress/quiz/bookmark
   tables, and the `grade_quiz_attempt()` grading function
3. `supabase/seed.sql` — the roadmap's language list and the first HTML lessons (`<h1>`, `<h2>`, `<p>`)
4. `supabase/seed_lists_and_links.sql` — additional HTML lessons (`<ul>`, `<li>`, `<a>`), including the anchor lesson's interactive lab and quiz

All four are safe to re-run — they use `IF NOT EXISTS`/`ON CONFLICT`
throughout, verified by running each file twice against a real Postgres
instance during development and confirming zero duplicate rows.

## 4. Configure auth email settings

1. **Authentication → Providers → Email**: confirm "Confirm email" is
   **enabled** (it is by default) — this is what makes signup require
   verification before login.
2. **Authentication → URL Configuration**:
   - **Site URL**: `http://localhost:3000` for local dev (change to your
     real domain before going to production)
   - **Redirect URLs**: add `http://localhost:3000/auth/callback` and
     `http://localhost:3000/reset-password` (and the production
     equivalents once you deploy)
3. Supabase's default email templates work out of the box for local
   testing. For production, customize them under **Authentication →
   Email Templates** and consider configuring a custom SMTP provider
   (Supabase's built-in email sender is rate-limited and meant for
   development, not production volume).

## 5. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in the three `NEXT_PUBLIC_*` values from step 2. Never commit
`.env.local` — it's already in `.gitignore`.

The service-role key is deliberately **not** used anywhere in this app.
If you later write a server-side seed script, add it as an environment
variable in *that script's* environment only — never in a file the
Next.js client bundle can reach.

## 6. Install and run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Sign up with a real email you can check —
Supabase will send an actual verification link.

## 7. Verify RLS is working

A good sanity check before trusting the schema: in the Supabase
dashboard, **Table Editor → profiles**, confirm RLS is enabled (there's
a toggle/badge at the top of the table view) and that you cannot see
rows there without going through the service role — the dashboard uses
elevated access, so this confirms RLS exists, not that it's bypassed.

## 8. Production build

```bash
npm run build
npm run start
```

## Deployment notes

- Any Next.js-compatible host works (Vercel is the path of least
  resistance for the App Router). Set the same three environment
  variables in your host's dashboard.
- Update Supabase's **Site URL** and **Redirect URLs** to your
  production domain before going live, or verification/reset links
  will point at `localhost`.
- Update `NEXT_PUBLIC_SITE_URL` in your production environment
  variables to match.

## Security notes

- Every table has RLS enabled; there is no table a signed-in user can
  read or write outside their own `auth.uid()`.
- The anon key is safe to expose — it has no power beyond what RLS
  permits.
- Passwords are never handled by this codebase directly; Supabase Auth
  owns hashing and storage entirely.
- The service-role key is not referenced anywhere in `app/`, `lib/`,
  or `components/` — grep for `SERVICE_ROLE` if you want to confirm.
- Quiz grading happens **server-side** via the `grade_quiz_attempt()`
  Postgres function. The browser never computes its own score, and
  quiz option queries deliberately exclude the `is_correct` column
  (see `types/database.ts`'s `QuizOptionPublic` type and
  `lib/content.ts`) so the answer key is never sent to the client
  while a quiz is in progress.
- Content tables (languages, courses, lessons, etc.) are publicly
  readable — including by anonymous visitors — by design, so the
  roadmap and course previews work before signup. They have no
  client-facing write policies at all; content is only ever written
  via the SQL editor (or a future admin tool using the service role).

## How this was verified

Beyond `npm run build`/`next lint`/`tsc --noEmit`, the SQL and RLS
policies were verified against a **real PostgreSQL instance** (not
just reviewed) during development:

- Every schema/seed file was executed against a real Postgres 16
  database, catching a real idempotency bug (`lesson_sections` and
  `quiz_options` had no unique constraint, so `ON CONFLICT DO NOTHING`
  was silently a no-op — fixed by adding proper unique constraints).
- RLS was tested as a **non-superuser role** (testing as the `postgres`
  superuser bypasses RLS entirely, which is easy to do by accident) —
  confirming users can't read each other's quiz attempts, can't forge
  bookmarks or profile rows for other users, and anonymous visitors
  can read content but no user-scoped data.
- The `grade_quiz_attempt()` function was tested with real data across
  100%/50%/0%/missing-answer scenarios.
- Every query shape used in `lib/content.ts`, `lib/dashboard.ts`, and
  `lib/progress.ts` was replicated against a real local PostgREST
  instance (the same underlying library `supabase-js` delegates to),
  with real anon/authenticated JWTs — not just type-checked in isolation.

None of this substitutes for testing against your own real Supabase
project before shipping, but it means the schema and query logic were
validated against a real Postgres/PostgREST stack, not just written
and assumed correct.

## Known limitations of this build

- The dashboard greeting uses server time, not the visitor's local
  time zone — a client-side refinement planned for later once real
  activity data is being shown alongside it.
- Avatar picker offers 4 static default options; custom image upload
  is wired up in the storage bucket policies but not yet exposed in
  the UI.
- No automated test suite yet — the verification described above was
  done manually against a real local Postgres/PostgREST stack during
  development, not via a checked-in CI suite.
- `getLanguageTree` and `resolveLessonPaths` in `lib/content.ts` use
  several sequential queries rather than one deep PostgREST join —
  simpler to verify correct at this content size, but worth revisiting
  with a Postgres view or a single embedded-resource query once a
  language has hundreds of lessons.
- The "fix the mistake" exercise checks answers with a whitespace-
  insensitive exact string comparison, not a real HTML parser — a
  correct answer written with different (but equivalent) attribute
  ordering or quoting would be marked incorrect. Fine for the seeded
  h1/h2/p lessons; worth a real parser-based comparison before this
  scales to messier real-world HTML.

## Roadmap for this repo

See `docs/ARCHITECTURE_PLAN.md` for the concrete technical plan behind
each of these — actual table/route/component names, not vague promises:

- Full HTML curriculum (h3–h6, media, forms) — content authoring on the
  existing engine, no new code required
- CSS and JavaScript courses — same engine, each needs its own
  "what happens internally" visualization first
- Code Explainer — client-side parsing with `parse5`/`acorn`, no
  arbitrary code execution
- Browser/DOM and JS-runtime visualizers — a real DOM-tree render for
  HTML, a labeled simplified state-machine simulation for JS
- Revision system (10 levels, weak-concept detection from real attempt
  history) and the knowledge map
- GSAP scroll animation — deliberately not added yet; see the plan doc
  for why and how it'll be verified when it is
- The remaining 13 languages, once CSS/JS prove the engine handles a
  second and third "visual language"
#   D e v L e a r n  
 