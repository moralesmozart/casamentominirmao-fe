-- Casamento Mini Irmão & Fê
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- Project: https://supabase.com/dashboard/project/obdlltghazfofxugeaov

create extension if not exists "pgcrypto";

create table if not exists public.ceremony_submissions (
  id uuid primary key default gen_random_uuid(),
  couple_paula text not null default 'Paula Velasco',
  couple_felipe text not null default 'Felipe Lenzi Rocha',
  answers jsonb not null,
  media jsonb not null default '[]'::jsonb,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

comment on table public.ceremony_submissions is
  'Respostas do questionário Casamento Mini Irmão & Fê';

alter table public.ceremony_submissions enable row level security;

drop policy if exists "Anyone can submit ceremony answers" on public.ceremony_submissions;
create policy "Anyone can submit ceremony answers"
  on public.ceremony_submissions
  for insert
  to anon, authenticated
  with check (true);

-- Reading stays in the Dashboard (service role). No public select.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'ceremony-media',
  'ceremony-media',
  false,
  52428800,
  array[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic',
    'audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/webm', 'audio/ogg', 'audio/x-m4a',
    'video/mp4', 'video/webm', 'video/quicktime',
    'application/pdf', 'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can upload ceremony media" on storage.objects;
create policy "Anyone can upload ceremony media"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'ceremony-media');

drop policy if exists "Anyone can update own ceremony media path" on storage.objects;
create policy "Anyone can update own ceremony media path"
  on storage.objects
  for update
  to anon, authenticated
  using (bucket_id = 'ceremony-media')
  with check (bucket_id = 'ceremony-media');
