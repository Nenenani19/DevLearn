# Architecture plan for remaining scope

This document is a concrete technical plan for the parts of the original
spec that are genuinely too large to build in one sitting: full curricula
for languages beyond HTML, the Code Explainer, the Browser/DOM/JS-runtime
visualizers, the 10-level revision system, and GSAP-driven animation. It
names actual tables, routes, and components already in this codebase so
each item is buildable directly on top of what exists — not a rewrite.

## 1. Full curricula (HTML depth + CSS + JavaScript + other languages)

**This is content authoring, not new engineering.** The schema
(`languages` → `courses` → `modules` → `topics` → `lessons` →
`lesson_sections` → `quizzes`) and the rendering engine
(`LessonExperience`, `LessonSectionRenderer`, `QuizBlock`) already support
an arbitrary number of languages/lessons with zero code changes — adding
CSS or JavaScript means writing seed SQL in the same shape as
`supabase/seed_lists_and_links.sql`, then flipping that language's
`status` from `coming_soon` to `available`.

Concrete next batches, in priority order (each is a self-contained seed
file, following the h1/ul/a pattern already in the repo):
1. Remaining text-structure HTML: `h3`–`h6`, `hr`, `blockquote`
2. Media: `img`, `figure`/`figcaption`
3. Forms: `form`, `label`, `input` (text/email/checkbox as three separate
   lessons per the one-concept-at-a-time rule), `button`
4. CSS course: new `courses` row under a `css` language — start with
   selectors (type/class/id) and the box model, using `minimal_example`
   + a genuinely different visualization (see §3) rather than reusing
   HTML's DOM-only animation
5. JavaScript course: start with `let`/`const`/`var` as three lessons
   (not one merged lesson, per the one-concept-at-a-time rule), then
   functions, then arrays

Each lesson costs roughly the same authoring effort as `<a>` did in this
session (~8 stages, one quiz question) — budget accordingly rather than
batching dozens at once, so each batch can still be verified against a
real database before moving on (the idempotency bug caught in Phase 2
is exactly the kind of thing that compounds if content is written in
bulk without testing).

## 2. Code Explainer

New standalone route: `/explain`. Architecture:

- **Input**: a language `<select>` + a `<textarea>` for pasted code,
  client component (`app/explain/page.tsx` + `components/explain/CodeExplainerForm.tsx`).
- **Analysis, not execution**: per the spec's own safety requirement,
  this must never `eval()` or otherwise run arbitrary user code. For
  HTML/CSS, tokenize with a real parser library (`parse5` for HTML,
  already MIT-licensed and small) rather than regex — regex-based HTML
  parsing is exactly the kind of thing that looks like it works and then
  breaks on real input. For JavaScript, `acorn` (also MIT, tiny) produces
  a real AST without executing anything.
- **Output shape**: a new (non-persisted, purely client-side) type
  `ExplainedToken = { text: string; kind: string; explanation: string }[]`,
  built by walking the parser's token/AST output and matching each node
  kind against a lookup table of plain-English explanations — this
  lookup table is the actual content-authoring work here, similar in
  spirit to `lesson_sections` but keyed by syntax-node type instead of
  by lesson.
- **Live preview reuse**: for HTML input, feed the pasted code straight
  into the existing `InteractiveCodeBlock` iframe — no new rendering
  code needed, since it's already a real sandboxed browser render.
- **No server round-trip needed**: both `parse5` and `acorn` run
  client-side in the browser, so explanations appear instantly and no
  user code ever leaves their machine — simpler and safer than a
  server-side parsing endpoint.

## 3. Browser/DOM/JS-runtime visualizers

Two genuinely different visualizations, not one generic animation reused
everywhere (the spec is explicit about this):

- **DOM visualizer** (for HTML lessons): a new `components/lesson/DomTreeVisualizer.tsx`
  that parses the lesson's `minimal_example` code with `parse5` (same
  parser as the Code Explainer, shared dependency) and renders the
  resulting tree as nested boxes — this is a real parse of the actual
  code in the lesson, not a hand-drawn diagram, so it stays accurate if
  the seed content changes.
- **JS runtime visualizer** (call stack / Web APIs / task queue / event
  loop): this one is a genuine simulation and must be labeled as such
  per the spec's "clearly label simplified visualizations" rule. Model
  it as an explicit state machine — `{ callStack: Frame[], webApis: Task[],
  microtasks: Task[], macrotasks: Task[] }` — driven by a small
  step-by-step script per lesson (authored content, similar to
  `lesson_sections`, e.g. a new `runtime_steps` section type), animated
  with CSS transitions on state changes. This does not need to execute
  real JS to be honest — it needs to accurately model what real JS does,
  and say plainly in the UI that it's a simplified model.

## 4. Mistake Lab (evolving `/mistake-lab`)

Already built as a real feature this session, pulling live from
`lesson_sections` where `section_type = 'fix_the_mistake'`. Next
increments once more languages exist:
- Filter by language (`?language=html` query param, same pattern as
  `/search`'s `?q=` param)
- A "difficulty" column on `lesson_sections` (or a separate
  `mistake_difficulty` enum) once there are enough entries to need
  sorting

## 5. Revision system (10 levels + knowledge map)

New tables, following the existing schema's conventions:

```sql
create table revision_items (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references lessons(id) on delete cascade,
  level integer not null check (level between 1 and 10),
  prompt text not null,
  answer text not null
);

create table revision_attempts (
  user_id uuid references auth.users(id) on delete cascade,
  revision_item_id uuid references revision_items(id) on delete cascade,
  correct boolean not null,
  attempted_at timestamptz not null default now()
);
```

The "identify weak concepts" requirement is a real query, not a fake
label: `select lesson_id, avg(correct::int) from revision_attempts
join revision_items using (id) group by lesson_id having avg(correct::int) < 0.7`
— genuinely computed from attempt history, the same honesty standard
already applied to `grade_quiz_attempt()`.

Knowledge map page (`/learn/[language]/knowledge-map`): reuses
`getLanguageTree()` (already built) to render the same module/topic
tree as the course overview page, but colored by completion state
instead of listed — a rendering change, not a new data layer.

## 6. GSAP animation

Deliberately not added yet, for a concrete reason: every other feature
in this codebase was verified by an actual build, lint, and (where
possible) a real local Postgres/PostgREST round-trip before being
called done. I have no way to visually verify a scroll animation in
this environment — no screenshot tool, no browser automation — so
adding GSAP code now would mean shipping animation I could type-check
but never actually confirm looks right, which breaks the standard the
rest of this build has held to.

When it's added, scope it narrowly and testably:
1. Hero entrance on `/` (fade + rise on load — verifiable by checking
   the DOM has the right initial/final CSS states even without a
   screenshot)
2. Stage-by-stage reveal in `LessonSectionRenderer` as the learner
   scrolls (`ScrollTrigger`, one trigger per `<Stage>`)
3. `useEffect` cleanup calling `.kill()` on every ScrollTrigger instance
   on unmount — required in Next.js's App Router where route changes
   don't do a full page reload, or triggers silently accumulate

Respect `prefers-reduced-motion` from the start (check
`window.matchMedia("(prefers-reduced-motion: reduce)")` before creating
any ScrollTrigger, matching the reduced-motion CSS already in
`globals.css`).

## 7. Additional languages beyond CSS/JS

Once CSS and JavaScript prove the engine handles a second and third
"visual language" (different anatomy diagrams, different runtime
models), the remaining 13 languages are primarily content-authoring
work against the same schema — TypeScript and Node.js in particular
need no new engine features at all, since they're syntactically close
to JavaScript. Python, Java, C#, Go, Rust, PHP, Ruby, and SQL will each
want their own "what happens internally" visualization (interpreter vs.
compiler vs. query planner, as sketched in the original spec) before
their first lesson is written, for the same reason the JS runtime
visualizer needs to exist before JS lessons feel complete.
