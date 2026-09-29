// Auth — Supabase GoTrue langsung dari browser (Arsitektur B, 29-09-2026).
// Kontrak dipertahankan persis seperti FE lama: login, register, verify,
// forgot, reset, me — supaya AppStore/AuthPage tidak berubah bentuk.
// - register : "Confirm email" sudah DIMATIKAN di dashboard -> akun langsung
//              aktif dan GoTrue langsung balik sesi (auto-login, tanpa kode OTP).
// - forgot   : Supabase mengirim LINK reset (bukan kode 6 digit) ke email.
// - verify/reset: tetap tersimpan untuk jaga-jaga kalau OTP email diaktifkan lagi.

import { AUTH_BASE, API_BASE, SUPABASE_ANON_KEY } from './config.js';
import { request, setSession, clearToken, setToken, getToken } from './http.js';

const o = (extra = {}) => ({ headers: { apikey: SUPABASE_ANON_KEY }, ...extra });

// Identifier login boleh email atau username. Sederhana: ada "@" + domain
// dianggap email, sisanya username yang di-resolve lewat RPC (username-login.sql).
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim());

// Username -> email (RPC public.cari_email_username, lihat PRD/username-login.sql).
export async function resolveEmail(identifier) {
  if (isEmail(identifier)) return String(identifier).trim();
  const data = await request(
    API_BASE,
    '/rpc/cari_email_username',
    o({ method: 'POST', body: { p_username: String(identifier || '').trim() } })
  );
  const baris = Array.isArray(data) ? data[0] : data;
  const email = baris && baris.email;
  if (!email) throw new Error('Username tidak ditemukan. Coba pakai email.');
  return email;
}

const keUser = (u, fallbackEmail) => ({
  email: (u && u.email) || fallbackEmail || '',
  nama: (u && u.user_metadata && u.user_metadata.nama) || '',
});

export async function login({ email, password }) {
  const keEmail = await resolveEmail(email);
  const data = await request(
    AUTH_BASE,
    '/token?grant_type=password',
    o({ method: 'POST', body: { email: keEmail, password } })
  );
  setSession(data);
  return keUser(data.user, keEmail);
}

export async function register({ email, password, nama, telepon, username }) {
  const data = await request(
    AUTH_BASE,
    '/signup',
    o({
      method: 'POST',
      body: {
        email,
        password,
        data: {
          username: (username || '').trim().toLowerCase(),
          nama: nama || '',
          telepon: telepon || '',
        },
      },
    })
  );
  // Sesi langsung ada = akun aktif tanpa konfirmasi -> auto-login.
  if (data.access_token) {
    setSession(data);
    return { message: 'Akun aktif. Langsung masuk.', user: keUser(data.user, email) };
  }
  // Cadangan kalau "Confirm email" dinyalakan lagi: minta kode dulu.
  return { message: 'Kode verifikasi dikirim ke email. Cek inbox kamu.' };
}

export async function verify({ email, kode }) {
  const data = await request(
    AUTH_BASE,
    '/verify',
    o({ method: 'POST', body: { type: 'signup', token: kode, email } })
  );
  if (data.access_token) setSession(data);
  return keUser(data.user, email);
}

export const forgot = async (email) => {
  // redirect_to wajib dikirim: tanpa ini GoTrue pakai Site URL (localhost:3000).
  await request(
    AUTH_BASE,
    '/recover',
    o({
      method: 'POST',
      body: { email, redirect_to: window.location.origin + '/jobtracker/' },
    })
  );
  return {
    message:
      'Kalau email terdaftar, kami kirim kode reset ke email itu. Masukkan kode + password baru di bawah.',
  };
};

// Reset lewat kode 6 digit (hanya jalan kalau OTP email aktif di dashboard).
export async function reset({ email, kode, password_baru }) {
  const data = await request(
    AUTH_BASE,
    '/verify',
    o({ method: 'POST', body: { type: 'recovery', token: kode, email } })
  );
  if (data.access_token) setSession(data);
  await request(AUTH_BASE, '/user', o({ method: 'PUT', body: { password: password_baru }, auth: true }));
  return { ok: true };
}

export async function me() {
  const data = await request(AUTH_BASE, '/user', o({ auth: true }));
  return keUser(data, '');
}

// --- Recovery via link email (batch 5.2c) ---------------------------------
// Supabase mengirim link reset ke email. Link itu balik ke halaman ini dengan
// token di URL hash (#access_token=...&type=recovery, implicit flow).
// Fungsi parse murni (string -> objek) supaya bisa ditest tanpa browser.

export function parseRecoveryHash(hash) {
  const h = String(hash || '').replace(/^#/, '');
  if (!h) return null;
  const p = new URLSearchParams(h);
  if (p.get('type') !== 'recovery' || !p.get('access_token')) return null;
  return {
    access_token: p.get('access_token'),
    refresh_token: p.get('refresh_token') || '',
    expires_in: Number(p.get('expires_in')) || 3600,
  };
}

// Cek lokasi browser sekarang. Kalau ada sesi recovery -> simpan sesi,
// buang token dari URL (history.replaceState), dan laporkan true.
export function cekRecoveryHash() {
  if (typeof location === 'undefined') return false;
  const sesi = parseRecoveryHash(location.hash);
  if (!sesi) return false;
  setSession(sesi);
  try {
    history.replaceState(null, '', location.pathname + location.search);
  } catch {
    /* file:// atau sandbox — biarin */
  }
  return true;
}

// Ganti password memakai sesi recovery yang baru saja dibuka dari link email.
export async function gantiPassword(passwordBaru) {
  const data = await request(AUTH_BASE, '/user', o({ method: 'PUT', body: { password: passwordBaru }, auth: true }));
  return keUser(data, '');
}

// Logout lokal cukup (token server mati sendiri saat kedaluwarsa).
export { clearToken, setToken, getToken };
