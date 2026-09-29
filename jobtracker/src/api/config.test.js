import { describe, test, expect } from 'vitest';
import { SUPABASE_URL, SUPABASE_ANON_KEY, AUTH_BASE, API_BASE } from './config.js';

// Di test (node) tidak ada import.meta.env -> pakai fallback hardcoded di config.js.
describe('basis URL Supabase (Arsitektur B)', () => {
  test('fallback menunjuk project Supabase yang sama dengan .env.production', () => {
    expect(SUPABASE_URL).toBe('https://yvnrzfgxsjzjsxkgjcfn.supabase.co');
    expect(SUPABASE_ANON_KEY).toMatch(/^sb_publishable_/);
  });

  test('path auth (GoTrue) dan data (PostgREST) turunan dari SUPABASE_URL', () => {
    expect(AUTH_BASE).toBe(`${SUPABASE_URL}/auth/v1`);
    expect(API_BASE).toBe(`${SUPABASE_URL}/rest/v1`);
  });
});
