-- MEC OSH Team Members setup
-- Run once in Supabase SQL Editor.

begin;

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_ar text,
  designation_en text not null,
  designation_ar text,
  photo_url text not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.team_members enable row level security;

drop policy if exists "Public read active team members" on public.team_members;
drop policy if exists "Admin manage team members" on public.team_members;

create policy "Public read active team members"
on public.team_members for select
to anon, authenticated
using (active = true or public.is_mec_admin());

create policy "Admin manage team members"
on public.team_members for all
to authenticated
using (public.is_mec_admin())
with check (public.is_mec_admin());

grant select on public.team_members to anon, authenticated;
grant insert, update, delete on public.team_members to authenticated;

commit;
