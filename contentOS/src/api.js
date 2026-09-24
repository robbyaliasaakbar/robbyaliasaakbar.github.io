// api.js — SATU-SATUNYA yang fetch BE data :7010.
import { getToken } from './auth.js';

const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || '7010';
export const API =
  import.meta.env.VITE_API_URL ||
  (location.protocol + '//' + location.hostname + ':' + BACKEND_PORT);

function authHeader() {
  const t = getToken();
  return t ? { Authorization: 'Bearer ' + t } : {};
}

export async function getContent({ q, tempat, status, tipe, kategori, page = 1, limit = 20 }) {
  const p = new URLSearchParams();
  if (q) p.set('q', q);
  if (tempat) p.set('tempat', tempat);
  if (status) p.set('status', status);
  if (tipe) p.set('tipe', tipe);
  if (kategori) p.set('kategori', kategori);
  p.set('page', page);
  p.set('limit', limit);
  const res = await fetch(API + '/content?' + p.toString(), { headers: authHeader() });
  return res.json();
}

export async function getContentById(id) {
  const res = await fetch(API + '/content/' + id, { headers: authHeader() });
  return res.json();
}

export async function ingestContent(payload) {
  const res = await fetch(API + '/content/ingest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(payload),
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(j.error || 'failed');
  return j; // {action: created|updated, item}
}

export async function deleteContent(id) {
  const res = await fetch(API + '/content/' + id, { method: 'DELETE', headers: authHeader() });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(j.error || 'failed');
  return j;
}

export async function getDashboard() {
  const res = await fetch(API + '/dashboard', { headers: authHeader() });
  return res.json();
}

export async function downloadExport({ q, tempat, status, tipe, kategori }) {
  const p = new URLSearchParams();
  if (q) p.set('q', q);
  if (tempat) p.set('tempat', tempat);
  if (status) p.set('status', status);
  if (tipe) p.set('tipe', tipe);
  if (kategori) p.set('kategori', kategori);
  const res = await fetch(API + '/content/export?' + p.toString(), { headers: authHeader() });
  if (!res.ok) throw new Error('Export failed');
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'content.csv';
  a.click();
  URL.revokeObjectURL(url);
}
