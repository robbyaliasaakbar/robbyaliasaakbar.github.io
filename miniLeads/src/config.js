// config.js — Supabase (cutover 5.4). Fallback literal biar build Pages jalan tanpa .env.
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://yvnrzfgxsjzjsxkgjcfn.supabase.co';
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_bCCZBzL38dqmU9xz3P8ymg_DIC_39nt';
export const REST_BASE = SUPABASE_URL + '/rest/v1';
export const AUTH_BASE = SUPABASE_URL + '/auth/v1';
export const FUNC_BASE = SUPABASE_URL + '/functions/v1';
