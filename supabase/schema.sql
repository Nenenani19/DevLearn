-- ============================================================
-- DevLearn Platform — Phase 1 schema
-- Run this in the Supabase SQL Editor on a fresh project.
-- Safe to re-run: guards with IF NOT EXISTS / OR REPLACE where possible.
-- ============================================================

-- ------------------------------------------------------------
-- Enums
-- ------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'account_type') then
    create type account_type as enum ('student', 'employed', 'unemployed', 'other');
  end if;
end $$;

-- ------------------------------------------------------------
-- profiles
-- One row per authenticated user. id mirrors auth.users.id so the
-- profile can never exist without a matching auth account, and
-- deleting the auth user cascades the profile away too.
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  nickname text,
  account_type account_type not null default 'other',
  institution text,           -- university (student) or company (employed)
  description text,           -- optional free text for account_type = 'other'
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is
  'One row per user, created automatically by handle_new_user() on signup.';

-- ------------------------------------------------------------
-- user_preferences
-- Separate from profiles so preference writes (e.g. theme toggle)
-- don't touch profile audit fields.
-- ------------------------------------------------------------
create table if not exists public.user_preferences (
  user_id uuid primary key references auth.users (id) on delete cascade,
  theme text not null default 'system' check (theme in ('light', 'dark', 'system')),
  reduced_motion boolean not null default false,
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- updated_at trigger helper, reused by every table below
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists user_preferences_set_updated_at on public.user_preferences;
create trigger user_preferences_set_updated_at
  before update on public.user_preferences
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Auto-provision a profile + preferences row whenever a new
-- auth.users row is created. This is what makes signup metadata
-- (full name, account type, institution) land in public.profiles
-- without a separate client-side insert that could be skipped.
-- ------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, account_type, institution, description)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'New Learner'),
    coalesce((new.raw_user_meta_data ->> 'account_type')::account_type, 'other'),
    new.raw_user_meta_data ->> 'institution',
    new.raw_user_meta_data ->> 'description'
  );

  insert into public.user_preferences (user_id) values (new.id);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- Row Level Security
-- Every table is locked down by default; only these explicit
-- policies grant access. A user can only ever read/write their
-- own row, identified by auth.uid().
-- ============================================================
alter table public.profiles enable row level security;
alter table public.user_preferences enable row level security;

drop policy if exists "profiles: select own" on public.profiles;
create policy "profiles: select own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles: update own" on public.profiles;
create policy "profiles: update own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- No insert/delete policy for profiles: rows are created only by
-- the handle_new_user() trigger (security definer) and deleted
-- only via the auth.users cascade. This stops a client from ever
-- forging a profile for someone else's id.

drop policy if exists "prefs: select own" on public.user_preferences;
create policy "prefs: select own"
  on public.user_preferences for select
  using (auth.uid() = user_id);

drop policy if exists "prefs: update own" on public.user_preferences;
create policy "prefs: update own"
  on public.user_preferences for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ------------------------------------------------------------
-- Storage: avatar uploads
-- Run once. Creates a public-read bucket where each user can
-- only write inside a folder named after their own uid.
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

drop policy if exists "avatar images are publicly readable" on storage.objects;
create policy "avatar images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'avatars');

drop policy if exists "users can upload their own avatar" on storage.objects;
create policy "users can upload their own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "users can update their own avatar" on storage.objects;
create policy "users can update their own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
