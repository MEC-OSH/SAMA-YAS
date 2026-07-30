
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
