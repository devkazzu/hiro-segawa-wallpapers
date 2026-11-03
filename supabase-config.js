/* HIRO SEGAWA cloud configuration.
   Paste your Supabase Project URL and anon/public key below.
   NEVER put a service_role/secret key in a website file. */
window.HIRO_SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
window.HIRO_SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_PUBLIC_KEY';
window.hiroSupabase = null;
if (window.supabase && window.HIRO_SUPABASE_URL.startsWith('https://') && window.HIRO_SUPABASE_ANON_KEY.startsWith('ey')) {
  window.hiroSupabase = window.supabase.createClient(window.HIRO_SUPABASE_URL, window.HIRO_SUPABASE_ANON_KEY);
}
