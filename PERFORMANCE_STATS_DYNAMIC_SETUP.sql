-- MEC OSH dynamic, editable Performance Statistics
-- Run once in Supabase SQL Editor. Safe to run more than once.

begin;

create extension if not exists pgcrypto;

alter table public.settings
  add column if not exists performance_last_week jsonb
  not null default '{}'::jsonb;

alter table public.settings
  add column if not exists performance_this_week jsonb
  not null default '{}'::jsonb;

create table if not exists public.performance_stats (
  id uuid primary key default gen_random_uuid(),
  stat_key text not null unique,
  title_en text not null,
  title_ar text,
  last_week numeric not null default 0,
  this_week numeric not null default 0,
  cumulative numeric not null default 0,
  decimals smallint not null default 0 check (decimals between 0 and 4),
  calculation_mode text not null default 'manual'
    check (calculation_mode in ('manual','live_manhours','live_lti_days')),
  sort_order integer not null default 0,
  active boolean not null default true,
  is_system boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

with s as (
  select *
  from public.settings
  where id = 1
)
insert into public.performance_stats (
  stat_key,title_en,title_ar,last_week,this_week,cumulative,
  decimals,calculation_mode,sort_order,active,is_system
)
values
(
  'manpower','Total Manpower','إجمالي القوى العاملة',
  coalesce((select nullif(performance_last_week->>'manpower','')::numeric from s),(select manpower from s),1500),
  coalesce((select nullif(performance_this_week->>'manpower','')::numeric from s),0),
  coalesce((select manpower from s),1500),
  0,'manual',10,true,true
),
(
  'manhours','Man-Hours','ساعات العمل',
  coalesce((select nullif(performance_last_week->>'manhours','')::numeric from s),(select baseline_manhours+coalesce(manhour_adjustment,0) from s),2568386),
  coalesce((select nullif(performance_this_week->>'manhours','')::numeric from s),0),
  coalesce((select baseline_manhours+coalesce(manhour_adjustment,0) from s),2568386),
  0,'live_manhours',20,true,true
),
(
  'ltiDays','LTI-Free Days','أيام دون إصابة مضيعة للوقت',
  coalesce((select nullif(performance_last_week->>'ltiDays','')::numeric from s),0),
  coalesce((select nullif(performance_this_week->>'ltiDays','')::numeric from s),0),
  coalesce((select greatest(0,current_date-last_lti_date) from s),0),
  0,'live_lti_days',30,true,true
),
(
  'trainingSessions','Training Sessions','جلسات التدريب',
  coalesce((select nullif(performance_last_week->>'trainingSessions','')::numeric from s),(select training_sessions from s),1773),
  coalesce((select nullif(performance_this_week->>'trainingSessions','')::numeric from s),0),
  coalesce((select training_sessions from s),1773),
  0,'manual',40,true,true
),
(
  'personnelTrained','Personnel Trained','الأفراد المدربون',
  coalesce((select nullif(performance_last_week->>'personnelTrained','')::numeric from s),(select personnel_trained from s),39442),
  coalesce((select nullif(performance_this_week->>'personnelTrained','')::numeric from s),0),
  coalesce((select personnel_trained from s),39442),
  0,'manual',50,true,true
),
(
  'trainingHours','Training Hours','ساعات التدريب',
  coalesce((select nullif(performance_last_week->>'trainingHours','')::numeric from s),(select training_hours from s),18433.55),
  coalesce((select nullif(performance_this_week->>'trainingHours','')::numeric from s),0),
  coalesce((select training_hours from s),18433.55),
  2,'manual',60,true,true
),
(
  'oshInductions','OSH Inductions','تعريفات السلامة والصحة المهنية',
  coalesce((select nullif(performance_last_week->>'oshInductions','')::numeric from s),(select osh_inductions from s),2238),
  coalesce((select nullif(performance_this_week->>'oshInductions','')::numeric from s),0),
  coalesce((select osh_inductions from s),2238),
  0,'manual',70,true,true
),
(
  'oshMeetings','OSH Meetings','اجتماعات السلامة والصحة المهنية',
  coalesce((select nullif(performance_last_week->>'oshMeetings','')::numeric from s),(select osh_meetings from s),73),
  coalesce((select nullif(performance_this_week->>'oshMeetings','')::numeric from s),0),
  coalesce((select osh_meetings from s),73),
  0,'manual',80,true,true
),
(
  'oshAudits','OSH Audits','تدقيقات السلامة والصحة المهنية',
  coalesce((select nullif(performance_last_week->>'oshAudits','')::numeric from s),(select osh_audits from s),7),
  coalesce((select nullif(performance_this_week->>'oshAudits','')::numeric from s),0),
  coalesce((select osh_audits from s),7),
  0,'manual',90,true,true
),
(
  'oshInspections','OSH Inspections','تفتيشات السلامة والصحة المهنية',
  coalesce((select nullif(performance_last_week->>'oshInspections','')::numeric from s),(select osh_inspections from s),167),
  coalesce((select nullif(performance_this_week->>'oshInspections','')::numeric from s),0),
  coalesce((select osh_inspections from s),167),
  0,'manual',100,true,true
),
(
  'procedureReviews','Procedure Reviews','مراجعات الإجراءات',
  coalesce((select nullif(performance_last_week->>'procedureReviews','')::numeric from s),(select procedure_reviews from s),64),
  coalesce((select nullif(performance_this_week->>'procedureReviews','')::numeric from s),0),
  coalesce((select procedure_reviews from s),64),
  0,'manual',110,true,true
),
(
  'emergencyDrills','Emergency Drills','تمارين الطوارئ',
  coalesce((select nullif(performance_last_week->>'emergencyDrills','')::numeric from s),(select emergency_drills from s),6),
  coalesce((select nullif(performance_this_week->>'emergencyDrills','')::numeric from s),0),
  coalesce((select emergency_drills from s),6),
  0,'manual',120,true,true
)
on conflict (stat_key) do nothing;

alter table public.performance_stats enable row level security;

drop policy if exists "Public read active performance stats"
  on public.performance_stats;
drop policy if exists "Admin manage performance stats"
  on public.performance_stats;

create policy "Public read active performance stats"
on public.performance_stats
for select
to anon, authenticated
using (active = true or public.is_mec_admin());

create policy "Admin manage performance stats"
on public.performance_stats
for all
to authenticated
using (public.is_mec_admin())
with check (public.is_mec_admin());

revoke all on public.performance_stats from anon;
revoke all on public.performance_stats from authenticated;

grant select on public.performance_stats to anon, authenticated;
grant insert, update, delete on public.performance_stats to authenticated;

commit;

notify pgrst, 'reload schema';

select
  stat_key,
  title_en,
  last_week,
  this_week,
  cumulative,
  calculation_mode,
  active
from public.performance_stats
order by sort_order, created_at;
