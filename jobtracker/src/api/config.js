// Basis URL — Arsitektur B (29-09-2026): frontend langsung ke Supabase
// (auth GoTrue + PostgREST). Tidak ada lagi funnel :7002 / :7012.
// Publishable/anon key AMAN diekspos di bundle — yang menjaga data adalah RLS.
// Bisa dioverride lewat .env (dev) / .env.production (build Pages).

const bersih = (v) => (v || '').replace(/\/+$/, '');

export const SUPABASE_URL =
  bersih(import.meta.env.VITE_SUPABASE_URL) || 'https://yvnrzfgxsjzjsxkgjcfn.supabase.co';

export const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim() ||
  'sb_publishable_bCCZBzL38dqmU9xz3P8ymg_DIC_39nt';

// Path standar Supabase — dipakai auth.js (GoTrue) dan lamaran.js (PostgREST).
export const AUTH_BASE = `${SUPABASE_URL}/auth/v1`;
export const API_BASE = `${SUPABASE_URL}/rest/v1`;
