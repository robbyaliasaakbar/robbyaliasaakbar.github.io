// auth.js — SATU-SATUNYA yang fetch auth (Supabase GoTrue, 5.3 cutover).
// Kontrak lama {ok, status, data} + TOKEN_KEY='content.token' dipertahankan
// biar Auth.jsx/App.jsx gak banyak berubah.
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  AUTH_BASE,
} from './config.js';

export { SUPABASE_URL, SUPABASE_ANON_KEY, AUTH_BASE };
export const AUTH_API = AUTH_BASE; // tampil di Settings.jsx
export const TOKEN_KEY = 'content.token';
const REFRESH_KEY = 'content.refresh';
const EXP_KEY = 'content.exp';

export function getToken() { return localStorage.getItem(TOKEN_KEY) || ''; }
export function saveToken(t) { localStorage.setItem(TOKEN_KEY, t); }
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXP_KEY);
}

// Simpan refresh+exp dari respons GoTrue (dipakai ensureFresh).
function stashSession(sess) {
  if (sess && sess.refresh_token) localStorage.setItem(REFRESH_KEY, sess.refresh_token);
  const exp = sess && sess.expires_at
    ? sess.expires_at
    : (sess && sess.expires_in ? Math.floor(Date.now() / 1000) + Number(sess.expires_in) : 0);
  if (exp) localStorage.setItem(EXP_KEY, String(exp));
}

// Auto-refresh <60 dtk sebelum expired. Gagal refresh -> token lama dibiarkan;
// kalau memang mati, apiMe akan 401 -> App clearToken (logout bersih).
export async function ensureFresh() {
  const t = getToken();
  if (!t) return '';
  const exp = Number(localStorage.getItem(EXP_KEY) || 0);
  if (exp && exp - Math.floor(Date.now() / 1000) > 60) return t;
  const rt = localStorage.getItem(REFRESH_KEY);
  if (!rt) return t;
  try {
    const r = await fetch(AUTH_BASE + '/token?grant_type=refresh_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY },
      body: JSON.stringify({ refresh_token: rt }),
    });
    if (!r.ok) return t;
    const s = await r.json();
    saveToken(s.access_token);
    stashSession(s);
    return s.access_token;
  } catch (e) {
    return t;
  }
}

async function post(path, obj) {
  let r;
  try {
    r = await fetch(AUTH_BASE + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY },
      body: JSON.stringify(obj),
    });
  } catch (e) {
    return { ok: false, status: 0, data: { error: 'Auth mati / offline' } };
  }
  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    const msg = data.msg || data.error_description || data.error || ('Gagal (' + r.status + ')');
    return { ok: false, status: r.status, data: { error: msg } };
  }
  return { ok: true, status: r.status, data };
}

// Bentuk user ringkas utk Settings/App: {id, email, username, role}
function mapUser(u) {
  return {
    id: u && u.id,
    email: (u && u.email) || '',
    username: (u && u.user_metadata && u.user_metadata.username) || ((u && u.email) || '').split('@')[0],
    role: 'user',
  };
}

// Lengkapi username + role dari profiles (RLS: baca profil sendiri boleh).
async function withRole(user) {
  if (!user || !user.id) return user;
  try {
    const r = await fetch(SUPABASE_URL + '/rest/v1/profiles?id=eq.' + user.id + '&select=username,role', {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + (await ensureFresh()) },
    });
    if (r.ok) {
      const rows = await r.json();
      if (rows && rows[0]) {
        if (rows[0].username) user.username = rows[0].username;
        if (rows[0].role) user.role = rows[0].role;
      }
    }
  } catch (e) { /* profiles gagal -> tampilan default */ }
  return user;
}

// GoTrue password grant. Identifier lama boleh username; Supabase cuma email.
export async function apiLogin(identifier, password) {
  if (!identifier || !identifier.includes('@')) {
    return { ok: false, status: 400, data: { error: 'Masuk dengan email' } };
  }
  const r = await post('/token?grant_type=password', { email: identifier, password });
  if (!r.ok) return r;
  stashSession(r.data);
  const user = await withRole(mapUser(r.data.user));
  return { ok: true, status: 200, data: { token: r.data.access_token, user } };
}

// Signup: autoconfirm ON -> GoTrue langsung balas session (tanpa OTP).
export async function apiRegister(payload) {
  const r = await post('/signup', {
    email: payload.email,
    password: payload.password,
    data: {
      username: payload.username,
      nama_depan: payload.nama_depan,
      nama_belakang: payload.nama_belakang,
      tanggal_lahir: payload.tanggal_lahir,
    },
  });
  if (!r.ok) return r;
  stashSession(r.data);
  if (!r.data.access_token) {
    // Autoconfirm mati (jarang) -> tanpa session, Auth.jsx arahkan cek email.
    return { ok: true, status: 200, data: { token: '', user: null } };
  }
  const user = r.data.user ? await withRole(mapUser(r.data.user)) : null;
  return { ok: true, status: 200, data: { token: r.data.access_token, user } };
}

// Konfirmasi kode 6 digit tidak ada di Supabase (autoconfirm ON) -> stub.
export async function apiVerify() {
  return { ok: false, status: 400, data: { error: 'Konfirmasi email otomatis — tidak perlu kode' } };
}

// Recovery: Supabase kirim KODE OTP 6 digit lewat email (template mode kode).
// redirect_to tetap dikirim (harmless) — template sudah tidak pakai link.
export async function apiForgot(email) {
  return post('/recover', {
    email,
    redirect_to: window.location.origin + '/contentOS/',
  });
}

// Reset via kode OTP: verify type=recovery -> sesi -> PUT /user password baru.
export async function apiReset(email, kode, passwordBaru) {
  const v = await post('/verify', { type: 'recovery', token: kode, email });
  if (!v.ok) return v;
  if (v.data.access_token) {
    saveToken(v.data.access_token);
    stashSession(v.data);
  }
  const t = getToken();
  if (!t) return { ok: false, status: 401, data: { error: 'Sesi habis — minta kode baru' } };
  let r;
  try {
    r = await fetch(AUTH_BASE + '/user', {
      method: 'PUT',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: 'Bearer ' + t,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: passwordBaru }),
    });
  } catch (e) {
    return { ok: false, status: 0, data: { error: 'Offline' } };
  }
  if (!r.ok) {
    const d = await r.json().catch(() => ({}));
    return { ok: false, status: r.status, data: { error: d.msg || d.error_description || 'Gagal ganti password' } };
  }
  return { ok: true, status: 200, data: {} };
}

export async function apiMe(token) {
  const t = token || (await ensureFresh());
  if (!t) return { ok: false, status: 401, data: {} };
  let r;
  try {
    r = await fetch(AUTH_BASE + '/user', {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + t },
    });
  } catch (e) {
    return { ok: false, status: 0, data: {} };
  }
  if (!r.ok) return { ok: false, status: r.status, data: {} };
  const u = await r.json().catch(() => ({}));
  const user = await withRole(mapUser(u));
  return { ok: true, status: 200, data: user };
}

// ===== Recovery via link email (implicit flow GoTrue) =====
// URL bentuknya #access_token=...&expires_in=3600&refresh_token=...&type=recovery
// Diparse murni biar gampang ditest; null kalau bukan hash recovery.

export function parseRecoveryHash(hash) {
  if (!hash || hash.indexOf('type=recovery') === -1) return null;
  const p = new URLSearchParams(hash.charAt(0) === '#' ? hash.slice(1) : hash);
  const access = p.get('access_token');
  if (!access) return null;
  return {
    access_token: access,
    refresh_token: p.get('refresh_token') || '',
    expires_in: Number(p.get('expires_in')) || 3600,
  };
}

// Cek location.hash; kalau recovery -> simpan sesi, buang hash dari URL.
// -> true kalau sesi recovery tersimpan.
export function cekRecoveryHash() {
  const s = parseRecoveryHash(typeof location !== 'undefined' ? location.hash || '' : '');
  if (!s) return false;
  saveToken(s.access_token);
  if (s.refresh_token) localStorage.setItem(REFRESH_KEY, s.refresh_token);
  localStorage.setItem(EXP_KEY, String(Math.floor(Date.now() / 1000) + s.expires_in));
  if (typeof history !== 'undefined' && history.replaceState) {
    history.replaceState(null, '', location.pathname + location.search);
  }
  return true;
}

// PUT /auth/v1/user — ganti password pakai sesi recovery yang baru disimpan.
export async function gantiPassword(baru) {
  const t = await ensureFresh();
  if (!t) return { ok: false, status: 401, data: { error: 'Sesi habis — buka link dari email lagi' } };
  let r;
  try {
    r = await fetch(AUTH_BASE + '/user', {
      method: 'PUT',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: 'Bearer ' + t,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: baru }),
    });
  } catch (e) {
    return { ok: false, status: 0, data: { error: 'Offline' } };
  }
  if (!r.ok) {
    const d = await r.json().catch(() => ({}));
    return { ok: false, status: r.status, data: { error: d.msg || d.error_description || 'Gagal ganti password' } };
  }
  return { ok: true, status: 200, data: {} };
}
