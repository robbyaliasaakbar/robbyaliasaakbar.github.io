// auth.js — 1 pintu auth (Supabase GoTrue, cutover 5.4).
// Kontrak lama dipertahankan: { ok, status, data } + TOKEN_KEY='crm.token'.
// Token opaque :7002 mati → user lama wajib login ulang sekali.

import { SUPABASE_URL, SUPABASE_ANON_KEY, AUTH_BASE } from './config.js';

export { SUPABASE_URL, SUPABASE_ANON_KEY, AUTH_BASE };
export const TOKEN_KEY = 'crm.token';
const REFRESH_KEY = 'crm.refresh';
const EXP_KEY = 'crm.exp';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}
export function saveToken(t) {
  localStorage.setItem(TOKEN_KEY, t);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXP_KEY);
}

// Simpan refresh+exp dari respons GoTrue (dipakai ensureFresh).
function stashSession(sess) {
  if (sess && sess.refresh_token) localStorage.setItem(REFRESH_KEY, sess.refresh_token);
  const exp =
    sess && sess.expires_at
      ? sess.expires_at
      : sess && sess.expires_in
        ? Math.floor(Date.now() / 1000) + Number(sess.expires_in)
        : 0;
  if (exp) localStorage.setItem(EXP_KEY, String(exp));
}

// Auto-refresh <60 dtk sebelum expired. Gagal refresh -> token lama dibiarkan;
// kalau memang mati, apiMe 401 -> App clearToken (logout bersih).
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

// POST JSON helper: { ok, status, data }. Offline -> status 0.
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
    const msg = data.msg || data.error_description || data.error || 'Gagal (' + r.status + ')';
    return { ok: false, status: r.status, data: { error: msg } };
  }
  return { ok: true, status: r.status, data };
}

// Bentuk user ringkas: { id, email, username, nama, role } (mirror /api/me lama).
function mapUser(u) {
  const meta = (u && u.user_metadata) || {};
  const nama =
    meta.nama ||
    [meta.nama_depan, meta.nama_belakang].filter(Boolean).join(' ') ||
    ((u && u.email) || '').split('@')[0];
  return {
    id: u && u.id,
    email: (u && u.email) || '',
    username: meta.username || ((u && u.email) || '').split('@')[0],
    nama,
    role: 'user',
  };
}

// Lengkapi username/nama/role dari profiles (RLS: baca profil sendiri boleh).
async function withRole(user) {
  if (!user || !user.id) return user;
  try {
    const r = await fetch(
      SUPABASE_URL + '/rest/v1/profiles?id=eq.' + user.id + '&select=username,nama,role',
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: 'Bearer ' + (await ensureFresh()),
        },
      }
    );
    if (r.ok) {
      const rows = await r.json();
      if (rows && rows[0]) {
        if (rows[0].username) user.username = rows[0].username;
        if (rows[0].nama) user.nama = rows[0].nama;
        if (rows[0].role) user.role = rows[0].role;
      }
    }
  } catch (e) {
    /* profiles gagal -> tampilan default */
  }
  return user;
}

// Login: Supabase cuma email (username lama :7002 mati).
export async function apiLogin(identifier, password) {
  if (!identifier || !identifier.includes('@')) {
    return { ok: false, status: 400, data: { error: 'Masuk dengan email' } };
  }
  const r = await post('/token?grant_type=password', { email: identifier, password });
  if (!r.ok) {
    if (r.status === 400) return { ok: false, status: 400, data: { error: 'Wrong email or password.' } };
    return r;
  }
  stashSession(r.data);
  const user = r.data.user ? await withRole(mapUser(r.data.user)) : null;
  if (r.data.access_token) saveToken(r.data.access_token);
  return { ok: true, status: 200, data: { token: r.data.access_token, user } };
}

// Register: autoconfirm ON -> langsung sesi (tanpa OTP).
export async function apiRegister(payload) {
  const r = await post('/signup', {
    email: payload.email,
    password: payload.password,
    data: {
      username: (payload.username || '').toLowerCase(),
      nama_depan: payload.nama_depan,
      nama_belakang: payload.nama_belakang,
      tanggal_lahir: payload.tanggal_lahir,
    },
  });
  if (!r.ok) return r;
  stashSession(r.data);
  if (!r.data.access_token) {
    return { ok: true, status: 200, data: { token: '', user: null, message: 'Check your inbox' } };
  }
  const user = r.data.user ? await withRole(mapUser(r.data.user)) : null;
  if (r.data.access_token) saveToken(r.data.access_token);
  return { ok: true, status: 200, data: { token: r.data.access_token, user } };
}

// Signup OTP tidak dipakai (autoconfirm ON) -> stub.
export async function apiVerify() {
  return { ok: false, status: 400, data: { error: 'Konfirmasi email otomatis — tidak perlu kode' } };
}

// Recovery: Supabase kirim KODE OTP 6 digit (template mode kode).
export async function apiForgot(email) {
  return post('/recover', { email });
}

// Reset via kode OTP: verify type=recovery -> sesi -> PUT /user password baru.
export async function apiReset(email, kode, password_baru) {
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
      body: JSON.stringify({ password: password_baru }),
    });
  } catch (e) {
    return { ok: false, status: 0, data: { error: 'Offline' } };
  }
  if (!r.ok) {
    const d = await r.json().catch(() => ({}));
    return {
      ok: false,
      status: r.status,
      data: { error: d.msg || d.error_description || 'Gagal ganti password' },
    };
  }
  return { ok: true, status: 200, data: { message: 'Password changed' } };
}

// GET /user — cek token + ambil user (mirror /api/me).
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
