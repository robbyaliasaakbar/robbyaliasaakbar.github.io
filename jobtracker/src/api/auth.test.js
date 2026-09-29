import { describe, test, expect } from 'vitest';
import { parseRecoveryHash, cekRecoveryHash, isEmail } from './auth.js';

// Login bisa pakai email atau username (30-09-2026): identifier diklasifikasi
// di FE, username di-resolve ke email lewat RPC di sisi database.
describe('isEmail', () => {
  test('format email -> true', () => {
    expect(isEmail('nama@contoh.id')).toBe(true);
    expect(isEmail('  nama+tag@sub.contoh.id  ')).toBe(true);
  });

  test('username / string aneh -> false', () => {
    expect(isEmail('usernameku')).toBe(false);
    expect(isEmail('nama@')).toBe(false);
    expect(isEmail('@contoh.id')).toBe(false);
    expect(isEmail('pakai spasi@contoh.id')).toBe(false);
    expect(isEmail('')).toBe(false);
    expect(isEmail(null)).toBe(false);
  });
});

// Alur link recovery (batch 5.2c): token sampai ke SPA lewat #hash URL email.
describe('parseRecoveryHash', () => {
  test('hash recovery lengkap -> sesi terurai', () => {
    const s = parseRecoveryHash(
      '#access_token=tok123&refresh_token=ref456&expires_in=7200&token_type=bearer&type=recovery'
    );
    expect(s).toEqual({ access_token: 'tok123', refresh_token: 'ref456', expires_in: 7200 });
  });

  test('tanpa expires_in -> default 3600', () => {
    const s = parseRecoveryHash('#access_token=tok&type=recovery');
    expect(s.expires_in).toBe(3600);
  });

  test('type selain recovery -> null (token login biasa tidak boleh masuk)', () => {
    expect(parseRecoveryHash('#access_token=tok&type=signup')).toBeNull();
    expect(parseRecoveryHash('#access_token=tok')).toBeNull();
  });

  test('hash kosong / tanpa access_token -> null', () => {
    expect(parseRecoveryHash('')).toBeNull();
    expect(parseRecoveryHash('#')).toBeNull();
    expect(parseRecoveryHash('#type=recovery')).toBeNull();
  });
});

describe('cekRecoveryHash (node tanpa location)', () => {
  test('tanpa browser -> false, tidak meledak', () => {
    expect(cekRecoveryHash()).toBe(false);
  });
});
