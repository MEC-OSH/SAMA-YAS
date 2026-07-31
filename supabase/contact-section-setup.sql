-- MEC OSH editable Contact section
-- Run once in Supabase SQL Editor.

begin;

create table if not exists public.contact_settings (
  id integer primary key default 1 check (id = 1),
  name_en text not null,
  name_ar text,
  designation_en text not null,
  designation_ar text,
  project_en text not null,
  project_ar text,
  location_en text not null,
  location_ar text,
  email text not null,
  phone_label_en text not null,
  phone_label_ar text,
  phone text not null,
  photo_url text not null,
  updated_at timestamptz not null default now()
);

insert into public.contact_settings (
  id,
  name_en,
  name_ar,
  designation_en,
  designation_ar,
  project_en,
  project_ar,
  location_en,
  location_ar,
  email,
  phone_label_en,
  phone_label_ar,
  phone,
  photo_url
)
values (
  1,
  'Muhammed Shamil',
  'محمد شامل',
  'Sr. OSH Officer',
  'مسؤول أول للسلامة والصحة المهنية',
  'Sama Yas Residential Development',
  'مشروع سما ياس السكني',
  'Yas Island, Abu Dhabi, UAE',
  'جزيرة ياس، أبوظبي، الإمارات العربية المتحدة',
  'muhammed.shamil@mecemirates.com',
  'Admin Shamil:',
  'المسؤول شامل:',
  '+971 58 512 5005',
  'assets/muhammed-shamil-contact.webp'
)
on conflict (id) do nothing;

alter table public.contact_settings enable row level security;

drop policy if exists "Public read contact settings" on public.contact_settings;
drop policy if exists "Admin manage contact settings" on public.contact_settings;

create policy "Public read contact settings"
on public.contact_settings for select
to anon, authenticated
using (true);

create policy "Admin manage contact settings"
on public.contact_settings for all
to authenticated
using (public.is_mec_admin())
with check (public.is_mec_admin());

grant select on public.contact_settings to anon, authenticated;
grant insert, update, delete on public.contact_settings to authenticated;

commit;
