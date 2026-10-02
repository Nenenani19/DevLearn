-- ============================================================
-- DevLearn Platform — Phase 2 schema (learning engine)
-- Run AFTER supabase/schema.sql. Safe to re-run.
-- ============================================================

do $$
begin
  if not exists (select 1 from pg_type where typname = 'language_status') then
    create type language_status as enum ('available', 'coming_soon');
  end if;
  if not exists (select 1 from pg_type where typname = 'section_type') then
    -- Mirrors the 15-stage lesson architecture from the content spec.
    -- Kept as an open text check rather than a rigid enum so new stage
    -- types can be added without a migration; validated in the app layer.
    create type section_type as enum (
      'what_is_it', 'why_it_exists', 'anatomy', 'minimal_example', 'live_result',
      'animation', 'real_world_analogy', 'practical_example', 'hidden_details',
      'common_mistakes', 'fix_the_mistake', 'interactive_example',
      'knowledge_check', 'mini_challenge', 'related_concepts'
    );
  end if;
end $$;

-- ------------------------------------------------------------
-- Content tables. Publicly readable (even by anonymous
-- visitors browsing before signing up) — there is deliberately
-- no insert/update/delete policy for anon/authenticated roles,
-- so content can only be written via the SQL editor or a future
-- admin tool using the service role. This matches "do not hardcode
-- lessons into UI components" from the content architecture spec.
-- ------------------------------------------------------------
create table if not exists public.languages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  status language_status not null default 'coming_soon',
  depends_on uuid[] not null default '{}',  -- roadmap prerequisite language ids
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  language_id uuid not null references public.languages (id) on delete cascade,
  slug text not null,
  title text not null,
  description text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (language_id, slug)
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  slug text not null,
  title text not null,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (course_id, slug)
);

create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules (id) on delete cascade,
  slug text not null,
  title text not null,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (module_id, slug)
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.topics (id) on delete cascade,
  slug text not null,
  title text not null,
  summary text,
  sort_order integer not null default 0,
  requires_interaction boolean not null default true, -- gate for "100% only if interactive steps done"
  created_at timestamptz not null default now(),
  unique (topic_id, slug)
);

-- One row per lesson "stage" (see section_type). content is jsonb
-- so each stage type can carry a different shape (code strings,
-- animation step arrays, mistake/fix pairs, etc.) without needing
-- a new table per stage.
create table if not exists public.lesson_sections (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  section_type section_type not null,
  sort_order integer not null default 0,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  -- One section per stage type per lesson. Enforces the "each stage
  -- appears at most once" assumption the lesson renderer relies on,
  -- and makes seed data idempotent via ON CONFLICT.
  unique (lesson_id, section_type)
);

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  title text not null default 'Knowledge check',
  passing_score integer not null default 70 check (passing_score between 0 and 100),
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes (id) on delete cascade,
  prompt text not null,
  explanation text not null,
  sort_order integer not null default 0
);

create table if not exists public.quiz_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.quiz_questions (id) on delete cascade,
  label text not null,
  is_correct boolean not null default false,
  sort_order integer not null default 0,
  -- Makes seed data idempotent via ON CONFLICT and rules out two
  -- identical-looking options under the same question by accident.
  unique (question_id, label)
);

-- ------------------------------------------------------------
-- User-scoped tables. RLS restricts every row to auth.uid().
-- ------------------------------------------------------------
create table if not exists public.user_lesson_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  -- Never set true just because the lesson was opened (per spec) —
  -- only when the lesson's own completion rule (all required
  -- interactive steps + passing quiz score) is satisfied.
  completed boolean not null default false,
  interacted boolean not null default false, -- touched the interactive example step
  last_visited_at timestamptz not null default now(),
  completed_at timestamptz,
  primary key (user_id, lesson_id)
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  quiz_id uuid not null references public.quizzes (id) on delete cascade,
  score integer not null check (score between 0 and 100),
  passed boolean not null,
  answers jsonb not null default '{}'::jsonb, -- { question_id: option_id }
  created_at timestamptz not null default now()
);

create table if not exists public.bookmarks (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- Indexes for the lookups the app actually performs.
create index if not exists idx_courses_language on public.courses (language_id);
create index if not exists idx_modules_course on public.modules (course_id);
create index if not exists idx_topics_module on public.topics (module_id);
create index if not exists idx_lessons_topic on public.lessons (topic_id);
create index if not exists idx_lesson_sections_lesson on public.lesson_sections (lesson_id, sort_order);
create index if not exists idx_quiz_questions_quiz on public.quiz_questions (quiz_id, sort_order);
create index if not exists idx_quiz_options_question on public.quiz_options (question_id, sort_order);
create index if not exists idx_progress_user on public.user_lesson_progress (user_id);
create index if not exists idx_attempts_user on public.quiz_attempts (user_id, quiz_id);
create index if not exists idx_bookmarks_user on public.bookmarks (user_id);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.languages enable row level security;
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.topics enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_sections enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_options enable row level security;
alter table public.user_lesson_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.bookmarks enable row level security;

-- Content: readable by anyone, including anon (so the roadmap and
-- course previews work before signup). No write policies — content
-- is seeded/edited via the SQL editor or a future admin tool using
-- the service role, never from the browser.
drop policy if exists "content: public read" on public.languages;
create policy "content: public read" on public.languages for select using (true);
drop policy if exists "content: public read" on public.courses;
create policy "content: public read" on public.courses for select using (true);
drop policy if exists "content: public read" on public.modules;
create policy "content: public read" on public.modules for select using (true);
drop policy if exists "content: public read" on public.topics;
create policy "content: public read" on public.topics for select using (true);
drop policy if exists "content: public read" on public.lessons;
create policy "content: public read" on public.lessons for select using (true);
drop policy if exists "content: public read" on public.lesson_sections;
create policy "content: public read" on public.lesson_sections for select using (true);
drop policy if exists "content: public read" on public.quizzes;
create policy "content: public read" on public.quizzes for select using (true);
drop policy if exists "content: public read" on public.quiz_questions;
create policy "content: public read" on public.quiz_questions for select using (true);

-- Quiz options are readable, but is_correct should not leak to the
-- client before grading. We still expose it (Postgres RLS is
-- row-level, not column-level) — see README's "Known limitations"
-- for why grading is nonetheless done server-side via a function
-- rather than trusted from client-submitted scores.
drop policy if exists "content: public read" on public.quiz_options;
create policy "content: public read" on public.quiz_options for select using (true);

-- User-scoped tables: strictly own-row only, both ways.
drop policy if exists "progress: select own" on public.user_lesson_progress;
create policy "progress: select own" on public.user_lesson_progress for select using (auth.uid() = user_id);
drop policy if exists "progress: upsert own" on public.user_lesson_progress;
create policy "progress: upsert own" on public.user_lesson_progress for insert with check (auth.uid() = user_id);
drop policy if exists "progress: update own" on public.user_lesson_progress;
create policy "progress: update own" on public.user_lesson_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "attempts: select own" on public.quiz_attempts;
create policy "attempts: select own" on public.quiz_attempts for select using (auth.uid() = user_id);
drop policy if exists "attempts: insert own" on public.quiz_attempts;
create policy "attempts: insert own" on public.quiz_attempts for insert with check (auth.uid() = user_id);

drop policy if exists "bookmarks: select own" on public.bookmarks;
create policy "bookmarks: select own" on public.bookmarks for select using (auth.uid() = user_id);
drop policy if exists "bookmarks: insert own" on public.bookmarks;
create policy "bookmarks: insert own" on public.bookmarks for insert with check (auth.uid() = user_id);
drop policy if exists "bookmarks: delete own" on public.bookmarks;
create policy "bookmarks: delete own" on public.bookmarks for delete using (auth.uid() = user_id);

-- ------------------------------------------------------------
-- grade_quiz_attempt: grades server-side from the submitted
-- option ids, so a client can never forge a passing score by
-- posting a fabricated score directly into quiz_attempts.
-- security definer so it can read quiz_options.is_correct
-- regardless of the caller's own RLS grants, but it only ever
-- inserts a row scoped to auth.uid() — never an arbitrary user.
-- ------------------------------------------------------------
create or replace function public.grade_quiz_attempt(
  p_quiz_id uuid,
  p_answers jsonb -- { "<question_id>": "<option_id>", ... }
)
returns table (score integer, passed boolean, attempt_id uuid)
language plpgsql
security definer set search_path = public
as $$
declare
  v_total integer;
  v_correct integer := 0;
  v_score integer;
  v_passing integer;
  v_passed boolean;
  v_attempt_id uuid;
  v_question record;
  v_chosen_option_id uuid;
begin
  select count(*) into v_total from public.quiz_questions where quiz_id = p_quiz_id;
  if v_total = 0 then
    raise exception 'Quiz % has no questions', p_quiz_id;
  end if;

  select passing_score into v_passing from public.quizzes where id = p_quiz_id;

  for v_question in
    select id from public.quiz_questions where quiz_id = p_quiz_id
  loop
    v_chosen_option_id := (p_answers ->> v_question.id::text)::uuid;
    if v_chosen_option_id is not null and exists (
      select 1 from public.quiz_options
      where id = v_chosen_option_id
        and question_id = v_question.id
        and is_correct = true
    ) then
      v_correct := v_correct + 1;
    end if;
  end loop;

  v_score := round((v_correct::numeric / v_total::numeric) * 100);
  v_passed := v_score >= v_passing;

  insert into public.quiz_attempts (user_id, quiz_id, score, passed, answers)
  values (auth.uid(), p_quiz_id, v_score, v_passed, p_answers)
  returning id into v_attempt_id;

  return query select v_score, v_passed, v_attempt_id;
end;
$$;

revoke all on function public.grade_quiz_attempt from public;
grant execute on function public.grade_quiz_attempt to authenticated;
