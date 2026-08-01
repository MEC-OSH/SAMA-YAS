-- MEC OSH performance-card weekly popup data
-- Run once in Supabase SQL Editor. Safe to run more than once.

begin;

alter table public.settings
  add column if not exists performance_last_week jsonb
  not null default '{}'::jsonb;

alter table public.settings
  add column if not exists performance_this_week jsonb
  not null default '{}'::jsonb;

update public.settings
set performance_last_week = jsonb_build_object(
      'manpower', coalesce(manpower,0),
      'manhours', floor(coalesce(baseline_manhours,0) + coalesce(manhour_adjustment,0)),
      'ltiDays', greatest(0,current_date - coalesce(last_lti_date,current_date)),
      'trainingSessions', coalesce(training_sessions,0),
      'personnelTrained', coalesce(personnel_trained,0),
      'trainingHours', coalesce(training_hours,0),
      'oshInductions', coalesce(osh_inductions,0),
      'oshMeetings', coalesce(osh_meetings,0),
      'oshAudits', coalesce(osh_audits,0),
      'oshInspections', coalesce(osh_inspections,0),
      'procedureReviews', coalesce(procedure_reviews,0),
      'emergencyDrills', coalesce(emergency_drills,0)
    )
where id = 1
  and performance_last_week = '{}'::jsonb;

update public.settings
set performance_this_week = jsonb_build_object(
      'manpower', 0,
      'manhours', 0,
      'ltiDays', 0,
      'trainingSessions', 0,
      'personnelTrained', 0,
      'trainingHours', 0,
      'oshInductions', 0,
      'oshMeetings', 0,
      'oshAudits', 0,
      'oshInspections', 0,
      'procedureReviews', 0,
      'emergencyDrills', 0
    )
where id = 1
  and performance_this_week = '{}'::jsonb;

commit;

notify pgrst, 'reload schema';

select id, performance_last_week, performance_this_week
from public.settings
where id = 1;
