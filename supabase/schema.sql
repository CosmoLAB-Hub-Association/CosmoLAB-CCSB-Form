-- CosmoLAB CCSB — Supabase bootstrap (DB + Storage)
-- À exécuter dans Supabase Dashboard → SQL Editor.

-- Nécessaire pour gen_random_uuid()
create extension if not exists pgcrypto;

-- 1) Table "applications"
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'pending',
  submitted_at timestamptz not null default now(),

  full_name text,
  gender text,
  country text,
  city text,
  nationality text,
  email text,
  phone text,
  linkedin text,
  website text,
  education_level text,
  field_of_study text,
  current_organization text,
  "current_role" text,
  years_experience text,
  expertise_domains text[] not null default '{}'::text[],
  technical_skills text,
  previous_project_types text[] not null default '{}'::text[],
  relevant_experience text,
  contribution_types text[] not null default '{}'::text[],
  availability text,
  motivation text,
  values text,
  interests text[] not null default '{}'::text[],
  cv_link text,
  publications_links text,
  consent jsonb not null default '[]'::jsonb
);

alter table public.applications enable row level security;

-- Permettre aux visiteurs ET aux connectés d'envoyer une candidature.
drop policy if exists applications_anon_insert on public.applications;
create policy applications_anon_insert
  on public.applications
  for insert
  to anon, authenticated
  with check (true);

-- Permettre la lecture uniquement à l'admin connecté.
drop policy if exists applications_admin_select on public.applications;
create policy applications_admin_select
  on public.applications
  for select
  to authenticated
  using ((auth.jwt() ->> 'email') = 'comolabmagazine@gmail.com');

-- 2) Storage bucket pour les CV
insert into storage.buckets (id, name, public)
values ('cvs', 'cvs', true)
on conflict (id) do nothing;

-- Autoriser la lecture publique des fichiers du bucket "cvs"
drop policy if exists cvs_public_read on storage.objects;
create policy cvs_public_read
  on storage.objects
  for select
  using (bucket_id = 'cvs');

-- Autoriser l'upload (anon et authenticated)
drop policy if exists cvs_anon_upload on storage.objects;
create policy cvs_anon_upload
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'cvs');
