
-- MEC OSH Department: Supabase security, live settings, and storage setup
-- Run this after the base schema has been created successfully.

begin;

-- ---------------------------------------------------------------------
-- 1. Complete the live performance settings table
-- ---------------------------------------------------------------------
alter table public.settings
  add column if not exists training_sessions integer not null default 1773,
  add column if not exists personnel_trained integer not null default 39442,
  add column if not exists training_hours numeric not null default 18433.55,
  add column if not exists osh_inductions integer not null default 2238,
  add column if not exists osh_meetings integer not null default 73,
  add column if not exists osh_audits integer not null default 6,
  add column if not exists osh_inspections integer not null default 167,
  add column if not exists procedure_reviews integer not null default 64,
  add column if not exists emergency_drills integer not null default 6,
  add column if not exists counter_paused boolean not null default false,
  add column if not exists manhour_adjustment numeric not null default 0;

insert into public.settings (
  id, manpower, baseline_manhours, baseline_at, last_lti_date,
  work_start, lunch_start, lunch_end, work_end
)
values (
  1, 1500, 2568386, '2026-07-23 17:00:00+04', '2026-05-11',
  '08:00', '13:00', '14:00', '17:00'
)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 2. Additional admin-managed content
-- ---------------------------------------------------------------------
create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_ar text,
  subtitle_en text,
  subtitle_ar text,
  image_url text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.site_locations (
  id uuid primary key default gen_random_uuid(),
  name_en text not null unique,
  name_ar text,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.holidays (
  id uuid primary key default gen_random_uuid(),
  holiday_date date not null unique,
  name_en text not null,
  name_ar text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 3. Admin-email helper
-- ---------------------------------------------------------------------
create or replace function public.is_mec_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select auth.jwt() ->> 'email') = 'muhammed.shamil@mecemirates.com',
    false
  );
$$;

revoke all on function public.is_mec_admin() from public;
grant execute on function public.is_mec_admin() to anon, authenticated;

-- ---------------------------------------------------------------------
-- 4. Enable Row Level Security
-- ---------------------------------------------------------------------
alter table public.settings enable row level security;
alter table public.safety_reports enable row level security;
alter table public.documents enable row level security;
alter table public.news enable row level security;
alter table public.gallery enable row level security;
alter table public.enquiries enable row level security;
alter table public.banners enable row level security;
alter table public.site_locations enable row level security;
alter table public.holidays enable row level security;

-- Remove old policies if this script is rerun
drop policy if exists "Public read settings" on public.settings;
drop policy if exists "Admin manage settings" on public.settings;

drop policy if exists "Anonymous submit safety reports" on public.safety_reports;
drop policy if exists "Admin manage safety reports" on public.safety_reports;

drop policy if exists "Public read documents" on public.documents;
drop policy if exists "Admin manage documents" on public.documents;

drop policy if exists "Public read published news" on public.news;
drop policy if exists "Admin manage news" on public.news;

drop policy if exists "Public read gallery" on public.gallery;
drop policy if exists "Admin manage gallery" on public.gallery;

drop policy if exists "Anonymous submit enquiries" on public.enquiries;
drop policy if exists "Admin manage enquiries" on public.enquiries;

drop policy if exists "Public read published banners" on public.banners;
drop policy if exists "Admin manage banners" on public.banners;

drop policy if exists "Public read active locations" on public.site_locations;
drop policy if exists "Admin manage locations" on public.site_locations;

drop policy if exists "Public read active holidays" on public.holidays;
drop policy if exists "Admin manage holidays" on public.holidays;

-- Settings
create policy "Public read settings"
on public.settings for select
to anon, authenticated
using (true);

create policy "Admin manage settings"
on public.settings for all
to authenticated
using (public.is_mec_admin())
with check (public.is_mec_admin());

-- Safety reports: public submission, admin-only access
create policy "Anonymous submit safety reports"
on public.safety_reports for insert
to anon, authenticated
with check (
  status = 'New'
  and closure_date is null
  and admin_remarks is null
);

create policy "Admin manage safety reports"
on public.safety_reports for all
to authenticated
using (public.is_mec_admin())
with check (public.is_mec_admin());

-- Documents
create policy "Public read documents"
on public.documents for select
to anon, authenticated
using (true);

create policy "Admin manage documents"
on public.documents for all
to authenticated
using (public.is_mec_admin())
with check (public.is_mec_admin());

-- News
create policy "Public read published news"
on public.news for select
to anon, authenticated
using (published = true or public.is_mec_admin());

create policy "Admin manage news"
on public.news for all
to authenticated
using (public.is_mec_admin())
with check (public.is_mec_admin());

-- Gallery
create policy "Public read gallery"
on public.gallery for select
to anon, authenticated
using (true);

create policy "Admin manage gallery"
on public.gallery for all
to authenticated
using (public.is_mec_admin())
with check (public.is_mec_admin());

-- Enquiries
create policy "Anonymous submit enquiries"
on public.enquiries for insert
to anon, authenticated
with check (status = 'New');

create policy "Admin manage enquiries"
on public.enquiries for all
to authenticated
using (public.is_mec_admin())
with check (public.is_mec_admin());

-- Banners
create policy "Public read published banners"
on public.banners for select
to anon, authenticated
using (published = true or public.is_mec_admin());

create policy "Admin manage banners"
on public.banners for all
to authenticated
using (public.is_mec_admin())
with check (public.is_mec_admin());

-- Locations
create policy "Public read active locations"
on public.site_locations for select
to anon, authenticated
using (active = true or public.is_mec_admin());

create policy "Admin manage locations"
on public.site_locations for all
to authenticated
using (public.is_mec_admin())
with check (public.is_mec_admin());

-- Holidays
create policy "Public read active holidays"
on public.holidays for select
to anon, authenticated
using (active = true or public.is_mec_admin());

create policy "Admin manage holidays"
on public.holidays for all
to authenticated
using (public.is_mec_admin())
with check (public.is_mec_admin());

-- ---------------------------------------------------------------------
-- 5. Safe public report tracking: returns status only
-- ---------------------------------------------------------------------
create or replace function public.track_safety_report(p_reference text)
returns table (
  current_status text,
  closure_date date
)
language sql
stable
security definer
set search_path = ''
as $$
  select sr.status, sr.closure_date
  from public.safety_reports sr
  where sr.reference = p_reference
  limit 1;
$$;

revoke all on function public.track_safety_report(text) from public;
grant execute on function public.track_safety_report(text) to anon, authenticated;

-- ---------------------------------------------------------------------
-- 6. Initial site locations
-- ---------------------------------------------------------------------
insert into public.site_locations (name_en, sort_order) values
('Zone 1',1),('Zone 2',2),('Zone 3',3),('Basement',4),
('Ground Floor',5),('Building 1',6),('Building 2',7),
('Building 3',8),('Building 4',9),('Building 5',10),
('Roof',11),('Laydown Area',12),('Logistics Area',13),
('Welfare Area',14),('Office Area',15),
('Waste Collection Area',16),('Other',17)
on conflict (name_en) do nothing;

-- ---------------------------------------------------------------------
-- 7. Storage buckets
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit)
values
  ('documents', 'documents', true, 52428800),
  ('gallery', 'gallery', true, 52428800),
  ('report-photos', 'report-photos', false, 52428800)
on conflict (id) do update
set file_size_limit = excluded.file_size_limit;

-- Storage policies
drop policy if exists "Public read documents bucket" on storage.objects;
drop policy if exists "Public read gallery bucket" on storage.objects;
drop policy if exists "Anonymous upload report photos" on storage.objects;
drop policy if exists "Admin manage MEC storage" on storage.objects;

create policy "Public read documents bucket"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'documents');

create policy "Public read gallery bucket"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'gallery');

create policy "Anonymous upload report photos"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'report-photos');

create policy "Admin manage MEC storage"
on storage.objects for all
to authenticated
using (
  public.is_mec_admin()
  and bucket_id in ('documents','gallery','report-photos')
)
with check (
  public.is_mec_admin()
  and bucket_id in ('documents','gallery','report-photos')
);

commit;


-- MEC OSH live Safety Trend Analysis
-- Run once in Supabase SQL Editor.
-- The baseline represents the current trend chart supplied on 30 July 2026.
-- New website reports after the cutoff are added automatically.


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

