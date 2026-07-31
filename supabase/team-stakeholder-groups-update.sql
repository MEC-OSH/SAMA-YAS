-- Add stakeholder groups to existing MEC OSH Team Members
-- Run once in Supabase SQL Editor.

begin;

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

commit;
