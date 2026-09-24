// auth.js — SATU-SATUNYA yang fetch auth :7002. TOKEN_KEY='content.token' beda dari crm.token.
const AUTH_PORT = import.meta.env.VITE_AUTH_PORT || '7002';
export const AUTH_API =
  import.meta.env.VITE_AUTH_URL ||
  (location.protocol + '//' + location.hostname + ':' + AUTH_PORT);
export const TOKEN_KEY = 'content.token';

export function getToken() { return localStorage.getItem(TOKEN_KEY) || ''; }
export function saveToken(t) { localStorage.setItem(TOKEN_KEY, t); }
export function clearToken() { localStorage.removeItem(TOKEN_KEY); }

async function post(path, obj) {
  let r;
  try {
    r = await fetch(AUTH_API + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
  } catch (e) {
    return { ok: false, status: 0, data: { error: 'Auth mati, nyalain :7002 dulu' } };
  }
  return { ok: r.ok, status: r.status, data: await r.json().catch(() => ({})) };
}

export const apiLogin = (identifier, password) => post('/api/login', { identifier, password });
export const apiRegister = (payload) => post('/api/register', payload);
export const apiVerify = (email, kode) => post('/api/verify', { email, kode });
export const apiForgot = (email) => post('/api/forgot', { email });
export const apiReset = (email, kode, password_baru) => post('/api/reset', { email, kode, password_baru });

export async function apiMe(token) {
  try {
    const r = await fetch(AUTH_API + '/api/me', { headers: { Authorization: 'Bearer ' + token } });
    return { ok: r.ok, status: r.status, data: await r.json().catch(() => ({})) };
  } catch (e) {
    return { ok: false, status: 0, data: {} };
  }
}
