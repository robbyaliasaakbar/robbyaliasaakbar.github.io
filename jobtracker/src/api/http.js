// Token Supabase (access + refresh) & pembungkus fetch.
// Key localStorage lama (jobTracker.token) DIPERTAHANankan: sesi lama yang
// token-nya invalid akan gagal 401 saat bootstrap -> logout bersih ke halaman login.

import { AUTH_BASE, SUPABASE_ANON_KEY } from './config.js';

const TOKEN_KEY = 'jobTracker.token'; // access token (== key lama)
const REFRESH_KEY = 'jobTracker.refresh'; // refresh token
const EXP_KEY = 'jobTracker.exp'; // epoch detik access token kedaluwarsa

const ls = {
  get(k) {
    try {
      return localStorage.getItem(k) || '';
    } catch {
      return '';
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* storage diblokir — biarin */
    }
  },
  del(k) {
    try {
      localStorage.removeItem(k);
    } catch {
      /* storage diblokir — biarin */
    }
  },
};

export const getToken = () => ls.get(TOKEN_KEY);
const getRefresh = () => ls.get(REFRESH_KEY);

export const setToken = (t) => ls.set(TOKEN_KEY, t);

// Simpan sesi GoTrue. expires_in = detik validitas access token (default 3600).
export function setSession({ access_token, refresh_token, expires_in }) {
  if (!access_token) return;
  ls.set(TOKEN_KEY, access_token);
  if (refresh_token) ls.set(REFRESH_KEY, refresh_token);
  if (expires_in) ls.set(EXP_KEY, String(Math.floor(Date.now() / 1000) + expires_in));
}

export function clearToken() {
  ls.del(TOKEN_KEY);
  ls.del(REFRESH_KEY);
  ls.del(EXP_KEY);
}

export class ApiError extends Error {
  constructor(message, status, kind) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    // kind: 'network' (server mati) | 'unauthorized' | 'api' (4xx/5xx dari server)
    this.kind = kind;
  }
}

// Tukar refresh token -> sesi baru. true = berhasil, false = sesi sudah mati.
export async function refreshSession() {
  const refresh_token = getRefresh();
  if (!refresh_token) return false;
  let res;
  try {
    res = await fetch(`${AUTH_BASE}/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY },
      body: JSON.stringify({ refresh_token }),
    });
  } catch {
    return false; // offline — biarin, jangan buang sesi
  }
  if (!res.ok) return false;
  const data = await res.json().catch(() => ({}));
  if (!data.access_token) return false;
  setSession(data);
  return true;
}

// Refresh proaktif kalau access token tinggal <60 detik.
async function ensureFresh() {
  const exp = Number(ls.get(EXP_KEY) || 0);
  if (exp && exp - Math.floor(Date.now() / 1000) < 60) await refreshSession();
}

const pesanServer = (d) => d?.error || d?.msg || d?.message || '';

// Telepon server. Balas JSON atau lempar ApiError dengan pesan netral.
// auth:1 -> SISIPKAN Bearer dari sesi Supabase saat itu (ikut refresh otomatis),
// retry 401 satu kali lewat refreshSession() sebelum menyerah ke 'unauthorized'.
export async function request(
  base,
  path,
  { method = 'GET', body, auth = false, headers = {}, retry = true } = {}
) {
  if (auth) await ensureFresh();

  const kirim = () =>
    fetch(base + path, {
      method,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(auth && getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

  let res;
  try {
    res = await kirim();
  } catch {
    throw new ApiError('Server tidak terjangkau. Coba lagi nanti.', 0, 'network');
  }

  // Access token kedaluwarsa pas di tengah jalan -> refresh, ulangi sekali.
  if (res.status === 401 && auth && retry && (await refreshSession())) {
    return request(base, path, { method, body, auth, headers, retry: false });
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const kind = res.status === 401 ? 'unauthorized' : 'api';
    throw new ApiError(pesanServer(data) || `Gagal (kode ${res.status})`, res.status, kind);
  }
  return data;
}
