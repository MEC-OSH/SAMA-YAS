-- MEC OSH Team Members setup
-- Safe for fresh installation or upgrading an existing table.

begin;

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_ar text,
  designation_en text not null,
  designation_ar text,
  stakeholder_group text not null default 'Main Contractor',
  photo_url text not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.team_members
  add column if not exists stakeholder_group text;

update public.team_members
set stakeholder_group = 'Main Contractor'
where stakeholder_group is null
   or btrim(stakeholder_group) = '';

alter table public.team_members
  alter column stakeholder_group set default 'Main Contractor';

alter table public.team_members
  alter column stakeholder_group set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'team_members_stakeholder_group_check'
      and conrelid = 'public.team_members'::regclass
  ) then
    alter table public.team_members
      add constraint team_members_stakeholder_group_check
      check (
        stakeholder_group in (
          'Client',
          'PMC',
          'Consultant',
          'Main Contractor'
        )
      );
  end if;
end
$$;

create index if not exists team_members_stakeholder_group_sort_idx
  on public.team_members (stakeholder_group, sort_order, created_at);

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
