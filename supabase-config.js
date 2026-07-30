// Browser-safe Supabase connection. The publishable key is protected by Row-Level Security.
const MEC_SUPABASE_URL = 'https://absfyhdyirrdwkgjwqqn.supabase.co';
const MEC_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_tpz0LNRQuyyUAnqhmMLqwA_u9smptmy';
window.mecSupabase = window.supabase.createClient(
  MEC_SUPABASE_URL,
  MEC_SUPABASE_PUBLISHABLE_KEY,
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);
