-- MEC OSH protected Document Library password management
-- Run once in Supabase SQL Editor.

begin;

create extension if not exists pgcrypto;

create table if not exists public.document_library_settings (
  id integer primary key default 1 check (id = 1),
  password_hash text not null,
  updated_at timestamptz not null default now(),
  updated_by uuid
);

insert into public.document_library_settings (
  id,
  password_hash,
  updated_at
)
values (
  1,
  crypt('072024', gen_salt('bf')),
  now()
)
on conflict (id) do nothing;

alter table public.document_library_settings enable row level security;

drop policy if exists "Admin read document password settings"
  on public.document_library_settings;
drop policy if exists "Admin update document password settings"
  on public.document_library_settings;

create policy "Admin read document password settings"
on public.document_library_settings for select
to authenticated
using (public.is_mec_admin());

create policy "Admin update document password settings"
on public.document_library_settings for update
to authenticated
using (public.is_mec_admin())
with check (public.is_mec_admin());

revoke all on public.document_library_settings from anon;
revoke all on public.document_library_settings from authenticated;
grant select, update on public.document_library_settings to authenticated;

create or replace function public.verify_document_library_password(
  candidate_password text
)
returns boolean
language sql
security definer
set search_path = public, extensions
stable
as $$
  select coalesce(
    (
      select password_hash = crypt(candidate_password, password_hash)
      from public.document_library_settings
      where id = 1
    ),
    false
  );
$$;

create or replace function public.set_document_library_password(
  new_password text
)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if not public.is_mec_admin() then
    raise exception 'Only the MEC OSH Admin can change this password.';
  end if;

  if new_password is null
     or length(new_password) < 4
     or length(new_password) > 20 then
    raise exception 'Password must contain between 4 and 20 characters.';
  end if;

  insert into public.document_library_settings (
    id,
    password_hash,
    updated_at,
    updated_by
  )
  values (
    1,
    crypt(new_password, gen_salt('bf')),
    now(),
    auth.uid()
  )
  on conflict (id) do update
  set password_hash = excluded.password_hash,
      updated_at = excluded.updated_at,
      updated_by = excluded.updated_by;

  return true;
end;
$$;

revoke all on function public.verify_document_library_password(text)
  from public;
revoke all on function public.set_document_library_password(text)
  from public;

grant execute on function public.verify_document_library_password(text)
  to anon, authenticated;
grant execute on function public.set_document_library_password(text)
  to authenticated;

commit;
