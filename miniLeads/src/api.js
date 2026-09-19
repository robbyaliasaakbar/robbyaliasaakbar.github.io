// api.js — 1 pintu ngomong ke backend data.
// Nomor port dari .env (VITE_BACKEND_PORT). Pola sama kayak JobTracker:
// host ngikutin browser (localhost ya localhost, tunnel ya tunnel),
// port ngikutin .env. Nanti live tinggal ganti host via tunnel.

import { getToken } from './auth.js';

// Urutan sumber URL (pertama yang ada yang menang):
// 1. VITE_API_URL full (buat GitHub Pages + tunnel, mis: https://xxx.ts.net)
// 2. Lokasi browser + VITE_BACKEND_PORT (lokal: localhost:7005)
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || '7005';
export const API =
  import.meta.env.VITE_API_URL ||
  (location.protocol + '//' + location.hostname + ':' + BACKEND_PORT);

// Backend multi-user WAJIB token tiap request → tempel di semua fetch.
// (Ini yang ketinggalan kemarin → response 401 tanpa data → layar putih.)
function authHeader() {
  const t = getToken();
  return t ? { Authorization: 'Bearer ' + t } : {};
}

export async function getLeads({ q, status, country, owner, page = 1, limit = 20 }) {
  const p = new URLSearchParams();
  if (q) p.set('q', q);
  if (status) p.set('status', status);
  if (country) p.set('country', country);
  if (owner) p.set('owner', owner);
  p.set('page', page);
  p.set('limit', limit);
  const res = await fetch(API + '/leads?' + p.toString(), { headers: authHeader() });
  return res.json(); // { total, page, limit, totalPages, count, data } atau { error }
}

export async function getDashboard() {
  const res = await fetch(API + '/dashboard', { headers: authHeader() });
  return res.json(); // { total, by_status, by_channel } atau { error }
}

// Export via fetch (link <a> tidak bisa bawa token) → download file CSV.
export async function downloadExport({ q, status, country, owner }) {
  const p = new URLSearchParams();
  if (q) p.set('q', q);
  if (status) p.set('status', status);
  if (country) p.set('country', country);
  if (owner) p.set('owner', owner);
  const res = await fetch(API + '/leads/export?' + p.toString(), { headers: authHeader() });
  if (!res.ok) throw new Error('Export failed');
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'leads.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// 1 pintu tambah data (dipakai Import CSV + form manual).
// Backend yang urus dedup: email/phone sama = update, baru = insert.
// Balikin { action: 'created' | 'updated', lead }
export async function ingestLead(payload) {
  const res = await fetch(API + '/leads/ingest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(payload),
  });
  const j = await res.json();
  if (!res.ok) throw new Error(j.error || 'failed');
  return j;
}
