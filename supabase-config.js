/* HIRO SEGAWA — Supabase public browser configuration.
   This publishable key is designed to be used in frontend code.
   Database/storage security MUST be enforced by the RLS policies in SUPABASE_SETUP.md.
   Never add a service_role/secret key here.
*/
window.HIRO_SUPABASE_URL = 'https://duqwgwgcyplyvxxzjdpd.supabase.co';
window.HIRO_SUPABASE_ANON_KEY = 'sb_publishable_47VzVdwPwj1pbx285-A0eg_wNPC_WnI';
window.hiroSupabase = null;
const hiroPublicKey = window.HIRO_SUPABASE_ANON_KEY;
if (window.supabase && window.HIRO_SUPABASE_URL.startsWith('https://') &&
    (hiroPublicKey.startsWith('sb_publishable_') || hiroPublicKey.startsWith('eyJ'))) {
  window.hiroSupabase = window.supabase.createClient(
    window.HIRO_SUPABASE_URL,
    hiroPublicKey
  );
}
