-- Supabase starter schema for MEC OSH Department
create table if not exists public.settings (
  id int primary key default 1,
  manpower int not null default 1500,
  baseline_manhours numeric not null default 2568386,
  baseline_at timestamptz not null default '2026-07-23 17:00:00+04',
  last_lti_date date not null default '2026-05-11',
  work_start time not null default '08:00',
  lunch_start time not null default '13:00',
  lunch_end time not null default '14:00',
  work_end time not null default '17:00'
);
create table if not exists public.safety_reports (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  report_type text not null,
  category text not null,
  location text,
  location_details text,
  urgency text,
  description text,
  photo_url text,
  status text not null default 'New',
  closure_date date,
  admin_remarks text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title_en text not null,
  title_ar text,
  file_url text not null,
  preview_url text,
  created_at timestamptz default now()
);
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_ar text,
  summary_en text,
  summary_ar text,
  details_en text,
  details_ar text,
  image_url text,
  attachment_url text,
  published boolean default false,
  pinned boolean default false,
  created_at timestamptz default now()
);
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  gallery_type text not null,
  title_en text not null,
  title_ar text,
  image_url text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  name text,
  company text,
  mobile text,
  email text,
  subject text,
  message text,
  status text default 'New',
  created_at timestamptz default now()
);
-- Enable RLS and add policies before production use.
