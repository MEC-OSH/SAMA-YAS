-- MEC OSH Editable Four-Series Trend Analysis
-- Updated cumulative baseline:
-- Unsafe Acts: 881, all Closed
-- Unsafe Conditions: 1,390, all Closed
-- Open baseline observations: 0
--
-- Future Unsafe Act and Unsafe Condition reports submitted after the cutoff
-- are counted as Open. They move to Closed only when their report status is
-- manually changed to Closed in the Admin Dashboard.

begin;

create table if not exists public.safety_trend_config (
  id integer primary key default 1 check (id = 1),
  baseline_cutoff timestamptz not null default '2026-07-30 15:56:00+04',
  updated_at timestamptz not null default now()
);

insert into public.safety_trend_config (id, baseline_cutoff)
values (1, '2026-07-30 15:56:00+04')
on conflict (id) do update
set baseline_cutoff = excluded.baseline_cutoff,
    updated_at = now();

create table if not exists public.safety_trend_baseline (
  category text primary key,
  unsafe_act_count integer not null default 0,
  unsafe_condition_count integer not null default 0,
  open_count integer not null default 0,
  closed_count integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.safety_trend_baseline
  add column if not exists sort_order integer not null default 999,
  add column if not exists unsafe_act_open_count integer not null default 0,
  add column if not exists unsafe_act_closed_count integer not null default 0,
  add column if not exists unsafe_condition_open_count integer not null default 0,
  add column if not exists unsafe_condition_closed_count integer not null default 0;

insert into public.safety_trend_baseline (
  sort_order,
  category,
  unsafe_act_open_count,
  unsafe_act_closed_count,
  unsafe_condition_open_count,
  unsafe_condition_closed_count,
  unsafe_act_count,
  unsafe_condition_count,
  open_count,
  closed_count,
  updated_at
)
values
  (1, 'Housekeeping & General Workplace Amenities', 0, 36, 0, 188, 36, 188, 0, 224, now()),
  (2, 'Traffic Management & Logistics', 0, 23, 0, 51, 23, 51, 0, 74, now()),
  (3, 'Working at Height', 0, 104, 0, 89, 104, 89, 0, 193, now()),
  (4, 'Scaffolding/Ladder', 0, 111, 0, 195, 111, 195, 0, 306, now()),
  (5, 'Personal Protective Equipment', 0, 87, 0, 16, 87, 16, 0, 103, now()),
  (6, 'Electrical Safety', 0, 29, 0, 49, 29, 49, 0, 78, now()),
  (7, 'Hand Tools', 0, 23, 0, 25, 23, 25, 0, 48, now()),
  (8, 'Excavations', 0, 4, 0, 3, 4, 3, 0, 7, now()),
  (9, 'Lifting Equipment and Lifting Accessories', 0, 31, 0, 45, 31, 45, 0, 76, now()),
  (10, 'Portable Power Tools', 0, 32, 0, 49, 32, 49, 0, 81, now()),
  (11, 'Plant and Equipment', 0, 20, 0, 32, 20, 32, 0, 52, now()),
  (12, 'Confined Space', 0, 1, 0, 8, 1, 8, 0, 9, now()),
  (13, 'Hot Work Operations', 0, 41, 0, 41, 41, 41, 0, 82, now()),
  (14, 'Compressed Air and Gases', 0, 0, 0, 9, 0, 9, 0, 9, now()),
  (15, 'Manual Handling', 0, 17, 0, 9, 17, 9, 0, 26, now()),
  (16, 'Welfare Facilities', 0, 28, 0, 39, 28, 39, 0, 67, now()),
  (17, 'Hazardous Substances', 0, 0, 0, 20, 0, 20, 0, 20, now()),
  (18, 'Machine Guarding', 0, 5, 0, 8, 5, 8, 0, 13, now()),
  (19, 'Storage Arrangements', 0, 22, 0, 115, 22, 115, 0, 137, now()),
  (20, 'Barricading of Hazards', 0, 62, 0, 112, 62, 112, 0, 174, now()),
  (21, 'Access and Egress', 0, 56, 0, 78, 56, 78, 0, 134, now()),
  (22, 'Permit to Work', 0, 20, 0, 14, 20, 14, 0, 34, now()),
  (23, 'Safety Signage & Signals', 0, 14, 0, 14, 14, 14, 0, 28, now()),
  (24, 'Falsework/Formwork', 0, 96, 0, 112, 96, 112, 0, 208, now()),
  (25, 'Waste Management', 0, 15, 0, 66, 15, 66, 0, 81, now()),
  (26, 'First Aid Case', 0, 4, 0, 2, 4, 2, 0, 6, now()),
  (27, 'Near Miss Incident', 0, 0, 0, 0, 0, 0, 0, 0, now()),
  (28, 'Property Damage', 0, 0, 0, 0, 0, 0, 0, 0, now()),
  (29, 'Lost Time Injury', 0, 0, 0, 1, 0, 1, 0, 1, now())
on conflict (category) do update
set
  sort_order = excluded.sort_order,
  unsafe_act_open_count = 0,
  unsafe_act_closed_count = excluded.unsafe_act_closed_count,
  unsafe_condition_open_count = 0,
  unsafe_condition_closed_count = excluded.unsafe_condition_closed_count,
  unsafe_act_count = excluded.unsafe_act_count,
  unsafe_condition_count = excluded.unsafe_condition_count,
  open_count = 0,
  closed_count = excluded.closed_count,
  updated_at = now();

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
  unsafe_act_open_count bigint,
  unsafe_act_closed_count bigint,
  unsafe_condition_open_count bigint,
  unsafe_condition_closed_count bigint
)
language sql
stable
security definer
set search_path = ''
as $$
  with configuration as (
    select coalesce(
      (select baseline_cutoff
       from public.safety_trend_config
       where id = 1),
      '2026-07-30 15:56:00+04'::timestamptz
    ) as cutoff
  ),
  categories as (
    select
      baseline.category,
      baseline.sort_order
    from public.safety_trend_baseline baseline

    union

    select
      report.category,
      999
    from public.safety_reports report, configuration config
    where report.created_at > config.cutoff
      and report.report_type in ('Unsafe Act','Unsafe Condition')
  ),
  live_counts as (
    select
      report.category,
      count(*) filter (
        where report.report_type = 'Unsafe Act'
          and coalesce(report.status,'New') <> 'Closed'
      ) as unsafe_act_open_count,
      count(*) filter (
        where report.report_type = 'Unsafe Act'
          and report.status = 'Closed'
      ) as unsafe_act_closed_count,
      count(*) filter (
        where report.report_type = 'Unsafe Condition'
          and coalesce(report.status,'New') <> 'Closed'
      ) as unsafe_condition_open_count,
      count(*) filter (
        where report.report_type = 'Unsafe Condition'
          and report.status = 'Closed'
      ) as unsafe_condition_closed_count
    from public.safety_reports report, configuration config
    where report.created_at > config.cutoff
      and report.report_type in ('Unsafe Act','Unsafe Condition')
    group by report.category
  )
  select
    categories.category,
    coalesce(baseline.unsafe_act_open_count,0)::bigint
      + coalesce(live.unsafe_act_open_count,0)::bigint,
    coalesce(baseline.unsafe_act_closed_count,0)::bigint
      + coalesce(live.unsafe_act_closed_count,0)::bigint,
    coalesce(baseline.unsafe_condition_open_count,0)::bigint
      + coalesce(live.unsafe_condition_open_count,0)::bigint,
    coalesce(baseline.unsafe_condition_closed_count,0)::bigint
      + coalesce(live.unsafe_condition_closed_count,0)::bigint
  from categories
  left join public.safety_trend_baseline baseline
    on baseline.category = categories.category
  left join live_counts live
    on live.category = categories.category
  order by categories.sort_order, categories.category;
$$;

revoke all on function public.get_public_safety_trend() from public;
grant execute on function public.get_public_safety_trend() to anon, authenticated;

commit;
