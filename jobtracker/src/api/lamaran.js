// Lamaran — Supabase PostgREST (/rest/v1/lamaran), langsung dari browser.
// RLS yang menjaga: baris hanya terlihat/diubah oleh pemiliknya (atau admin).
// Mapping dipertahankan: UI memakai `date`, kolom DB memakai `tanggal`.

import { API_BASE, SUPABASE_ANON_KEY } from './config.js';
import { request, getToken } from './http.js';

const TABEL = '/lamaran';
const prefer = { Prefer: 'return=representation' };

const h = (extra = {}) => ({
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${getToken()}`,
  ...extra,
});

// Baris DB -> bentuk yang dimakan reducer/tabel UI.
const dari = (r) => ({
  id: r.id,
  company: r.company,
  position: r.position,
  date: r.tanggal || '',
  status: r.status,
  portal: r.portal || '',
  link: r.link || '',
});

// Form UI -> kolom DB (user_id diisi default auth.uid() di server).
const ke = (v) => ({
  company: v.company || '',
  position: v.position || '',
  tanggal: v.date || null,
  status: v.status || 'baru',
  portal: v.portal || '',
  link: v.link || '',
});

const barisPertama = (data, judul) => {
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) throw new Error(`${judul} tidak ditemukan.`);
  return dari(row);
};

export async function list() {
  const data = await request(API_BASE, `${TABEL}?select=*`, { auth: true, headers: h() });
  return (Array.isArray(data) ? data : []).map(dari);
}

export async function create(body) {
  const data = await request(API_BASE, TABEL, {
    method: 'POST',
    auth: true,
    headers: h(prefer),
    body: ke(body),
  });
  return barisPertama(data, 'Lamaran baru');
}

export async function update(id, body) {
  const data = await request(API_BASE, `${TABEL}?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    auth: true,
    headers: h(prefer),
    body: ke(body),
  });
  return barisPertama(data, 'Lamaran');
}

export async function remove(id) {
  await request(API_BASE, `${TABEL}?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    auth: true,
    headers: h(),
  });
}
