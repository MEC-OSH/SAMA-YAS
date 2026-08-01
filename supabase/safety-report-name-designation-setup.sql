-- Add optional Name and Designation to Safety Concern reports
-- Safe to run more than once.

begin;

alter table public.safety_reports
  add column if not exists reporter_name text;

alter table public.safety_reports
  add column if not exists reporter_designation text;

commit;

notify pgrst, 'reload schema';

select column_name, data_type
from information_schema.columns
where table_schema = 'public'
  and table_name = 'safety_reports'
  and column_name in ('reporter_name','reporter_designation')
order by column_name;
