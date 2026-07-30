-- MEC OSH live Safety Trend Analysis
-- Run once in Supabase SQL Editor.
-- The baseline represents the current trend chart supplied on 30 July 2026.
-- New website reports after the cutoff are added automatically.

begin;

create table if not exists public.safety_trend_config (
  id integer primary key default 1 check (id = 1),
  baseline_cutoff timestamptz not null default '2026-07-30 14:27:00+04',
  updated_at timestamptz not null default now()
);

insert into public.safety_trend_config (id, baseline_cutoff)
values (1, '2026-07-30 14:27:00+04')
on conflict (id) do nothing;

create table if not exists public.safety_trend_baseline (
  category text primary key,
  unsafe_act_count integer not null default 0 check (unsafe_act_count >= 0),
  unsafe_condition_count integer not null default 0 check (unsafe_condition_count >= 0),
  open_count integer not null default 0 check (open_count >= 0),
  closed_count integer not null default 0 check (closed_count >= 0),
  updated_at timestamptz not null default now()
);

insert into public.safety_trend_baseline (
  category, unsafe_act_count, unsafe_condition_count, open_count, closed_count
)
values
  ('Housekeeping & General Workplace Amenities', 3, 55, 0, 0),
  ('Traffic Management & Logistics', 0, 9, 0, 0),
  ('Working at Height', 2, 34, 0, 0),
  ('Scaffolding/Ladder', 6, 48, 0, 0),
  ('Personal Protective Equipment', 9, 2, 0, 0),
  ('Electrical Safety', 1, 21, 0, 0),
  ('Hand Tools', 5, 6, 0, 0),
  ('Excavations', 0, 0, 0, 0),
  ('Lifting Equipment and Lifting Accessories', 0, 7, 0, 0),
  ('Portable Power Tools', 3, 20, 0, 0),
  ('Plant and Equipment', 1, 7, 0, 0),
  ('Confined Space', 0, 2, 0, 0),
  ('Hot Work Operations', 0, 9, 0, 0),
  ('Compressed Air and Gases', 0, 0, 0, 0),
  ('Manual Handling', 2, 2, 0, 0),
  ('Welfare Facilities', 0, 11, 0, 0),
  ('Hazardous Substances', 0, 4, 0, 0),
  ('Machine Guarding', 0, 8, 0, 0),
  ('Storage Arrangements', 2, 17, 0, 0),
  ('Barricading of Hazards', 6, 23, 0, 0),
  ('Access and Egress', 2, 13, 0, 0),
  ('Permit to Work', 0, 4, 0, 0),
  ('Safety Signage & Signals', 0, 0, 0, 0),
  ('Falsework/Formwork', 1, 15, 0, 0),
  ('Waste Management', 0, 10, 0, 0),
  ('First Aid Case', 0, 0, 0, 0),
  ('Near Miss Incident', 0, 0, 0, 0),
  ('Property Damage', 0, 0, 0, 0),
  ('Lost Time Injury', 0, 0, 0, 0)
on conflict (category) do nothing;

alter table public.safety_trend_config enable row level security;
alter table public.safety_trend_baseline enable row level security;

drop policy if exists "Admin manage safety trend config" on public.safety_trend_config;
drop policy if exists "Admin manage safety trend baseline" on public.safety_trend_baseline;

create policy "Admin manage safety trend config"
on public.safety_trend_config for all
to authenticated
using (public.is_mec_admin())
with check (public.is_mec_admin());

create policy "Admin manage safety trend baseline"
on public.safety_trend_baseline for all
to authenticated
using (public.is_mec_admin())
with check (public.is_mec_admin());

create or replace function public.get_public_safety_trend()
returns table (
  category text,
  unsafe_act_count bigint,
  unsafe_condition_count bigint,
  open_count bigint,
  closed_count bigint
)
language sql
stable
security definer
set search_path = ''
as $$
  with configuration as (
    select coalesce(
      (select baseline_cutoff from public.safety_trend_config where id = 1),
      '2026-07-30 14:27:00+04'::timestamptz
    ) as cutoff
  ),
  categories as (
    select baseline.category from public.safety_trend_baseline baseline
    union
    select report.category
    from public.safety_reports report, configuration config
    where report.created_at > config.cutoff
  ),
  live_counts as (
    select
      report.category,
      count(*) filter (where report.report_type = 'Unsafe Act') as unsafe_act_count,
      count(*) filter (where report.report_type = 'Unsafe Condition') as unsafe_condition_count,
      count(*) filter (where coalesce(report.status,'New') <> 'Closed') as open_count,
      count(*) filter (where report.status = 'Closed') as closed_count
    from public.safety_reports report, configuration config
    where report.created_at > config.cutoff
    group by report.category
  )
  select
    categories.category,
    coalesce(baseline.unsafe_act_count,0)::bigint + coalesce(live.unsafe_act_count,0)::bigint,
    coalesce(baseline.unsafe_condition_count,0)::bigint + coalesce(live.unsafe_condition_count,0)::bigint,
    coalesce(baseline.open_count,0)::bigint + coalesce(live.open_count,0)::bigint,
    coalesce(baseline.closed_count,0)::bigint + coalesce(live.closed_count,0)::bigint
  from categories
  left join public.safety_trend_baseline baseline on baseline.category = categories.category
  left join live_counts live on live.category = categories.category
  order by case categories.category
    when 'Housekeeping & General Workplace Amenities' then 1
    when 'Traffic Management & Logistics' then 2
    when 'Working at Height' then 3
    when 'Scaffolding/Ladder' then 4
    when 'Personal Protective Equipment' then 5
    when 'Electrical Safety' then 6
    when 'Hand Tools' then 7
    when 'Excavations' then 8
    when 'Lifting Equipment and Lifting Accessories' then 9
    when 'Portable Power Tools' then 10
    when 'Plant and Equipment' then 11
    when 'Confined Space' then 12
    when 'Hot Work Operations' then 13
    when 'Compressed Air and Gases' then 14
    when 'Manual Handling' then 15
    when 'Welfare Facilities' then 16
    when 'Hazardous Substances' then 17
    when 'Machine Guarding' then 18
    when 'Storage Arrangements' then 19
    when 'Barricading of Hazards' then 20
    when 'Access and Egress' then 21
    when 'Permit to Work' then 22
    when 'Safety Signage & Signals' then 23
    when 'Falsework/Formwork' then 24
    when 'Waste Management' then 25
    when 'First Aid Case' then 26
    when 'Near Miss Incident' then 27
    when 'Property Damage' then 28
    when 'Lost Time Injury' then 29
    else 999
  end;
$$;

revoke all on function public.get_public_safety_trend() from public;
grant execute on function public.get_public_safety_trend() to anon, authenticated;

commit;
