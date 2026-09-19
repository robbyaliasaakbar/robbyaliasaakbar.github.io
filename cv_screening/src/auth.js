// auth.js — 1 pintu ngomong ke backend AUTH :7002 (PHP, dipakai bareng).
// Dipakai penuh di Stage 2a (login). Sekarang disiapin biar pola sama kayak miniLeads.
// Urutan sumber URL: 1. VITE_AUTH_URL full (Pages + tunnel) 2. lokasi browser + port.
// Token = kartu akses. Key beda per app biar gak tabrakan (crm.token vs cv.token).

const AUTH_PORT = import.meta.env.VITE_AUTH_PORT || '7002';
export const AUTH_API =
  import.meta.env.VITE_AUTH_URL ||
  (typeof location !== 'undefined'
    ? location.protocol + '//' + location.hostname + ':' + AUTH_PORT
    : 'http://localhost:' + AUTH_PORT);
export const TOKEN_KEY = 'cv.token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}

export function saveToken(t) {
  localStorage.setItem(TOKEN_KEY, t);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

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

// PUT /api/me — edit profil sendiri (nama + username). Token wajib.
export async function apiUpdateProfile(token, payload) {
  try {
    const r = await fetch(AUTH_API + '/api/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify(payload),
    });
    return { ok: r.ok, data: await r.json().catch(() => ({})) };
  } catch (e) {
    return { ok: false, data: { error: 'Auth server unreachable.' } };
  }
}

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
