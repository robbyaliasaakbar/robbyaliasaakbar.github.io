// auth.js — 1 pintu ngomong ke backend AUTH :7002 (PHP, dipakai bareng JobTracker).
// Urutan sumber URL: 1. VITE_AUTH_URL full (Pages + tunnel) 2. lokasi browser + port.
// Token = kartu akses. Disimpan di localStorage key crm.token (beda dari JobTracker!).

const AUTH_PORT = import.meta.env.VITE_AUTH_PORT || '7002';
export const AUTH_API =
  import.meta.env.VITE_AUTH_URL ||
  (location.protocol + '//' + location.hostname + ':' + AUTH_PORT);
export const TOKEN_KEY = 'crm.token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}

export function saveToken(t) {
  localStorage.setItem(TOKEN_KEY, t);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// POST JSON helper: balikin { ok, status, data }.
// Backend mati → ok:false + pesan jelas (tidak diam).
async function post(path, obj, token = '') {
  let r;
  try {
    r = await fetch(AUTH_API + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: 'Bearer ' + token } : {}),
      },
      body: JSON.stringify(obj),
    });
  } catch (e) {
    return { ok: false, status: 0, data: { error: 'Auth server unreachable. Start backend :7002 first.' } };
  }
  return { ok: r.ok, status: r.status, data: await r.json().catch(() => ({})) };
}

export const apiLogin = (identifier, password) => post('/api/login', { identifier, password });
export const apiRegister = (payload) => post('/api/register', payload);
export const apiVerify = (email, kode) => post('/api/verify', { email, kode });
export const apiForgot = (email) => post('/api/forgot', { email });
export const apiReset = (email, kode, password_baru) => post('/api/reset', { email, kode, password_baru });

// GET /api/me — cek kartu masih berlaku + ambil role. Bukan POST jadi fetch manual.
export async function apiMe(token) {
  try {
    const r = await fetch(AUTH_API + '/api/me', {
      headers: { Authorization: 'Bearer ' + token },
    });
    return { ok: r.ok, data: await r.json().catch(() => ({})) };
  } catch (e) {
    return { ok: false, data: {} };
  }
}
