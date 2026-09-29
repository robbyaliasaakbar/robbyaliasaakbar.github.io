// api.js — SATU-SATUNYA yang fetch data (Supabase PostgREST + RPC content_*).
// Aturan list/ingest/dashboard/export ada di SQL (migration 5.3) — di sini cuma
// bungkus fetch + serialisasi CSV. Kontrak keluar dipertahankan utk App.jsx.
import { ensureFresh } from './auth.js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, REST_BASE } from './config.js';

export const API = SUPABASE_URL; // tampil di Settings.jsx
const RPC = REST_BASE + '/rpc/';

async function authHeaders() {
  const t = await ensureFresh();
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: 'Bearer ' + t,
    'Content-Type': 'application/json',
  };
}

function qs(params) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== '' && v !== undefined && v !== null) p.set(k, String(v));
  }
  const s = p.toString();
  return s ? '?' + s : '';
}

// -> {total, page, limit, totalPages, count, data} | {error} | throw (network)
export async function getContent({ q, tempat, status, tipe, kategori, page = 1, limit = 20 }) {
  let res;
  try {
    res = await fetch(RPC + 'content_list' + qs({
      p_q: q, p_tempat: tempat, p_status: status, p_tipe: tipe,
      p_kategori: kategori, p_page: page, p_limit: limit,
    }), { headers: await authHeaders() });
  } catch (e) {
    throw new Error('Network error');
  }
  const j = await res.json().catch(() => ({}));
  if (!res.ok) return { error: j.message || j.msg || 'Gagal load' };
  return j;
}

// -> {action: created|updated, item} | throw Error(pesan)
export async function ingestContent(payload) {
  let res;
  try {
    res = await fetch(RPC + 'content_ingest', {
      method: 'POST',
      headers: await authHeaders(),
      body: JSON.stringify({ p_payload: payload }),
    });
  } catch (e) {
    throw new Error('Network error');
  }
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(j.message || j.msg || 'Gagal simpan');
  return j;
}

// -> {ok: true} | throw Error(pesan)
export async function deleteContent(id) {
  let res;
  try {
    res = await fetch(REST_BASE + '/content_ideas?id=eq.' + encodeURIComponent(id), {
      method: 'DELETE',
      headers: await authHeaders(),
    });
  } catch (e) {
    throw new Error('Network error');
  }
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error(j.message || 'Gagal hapus');
  }
  return { ok: true };
}

// -> {total, by_status, by_tempat} | {total: undefined} (App abaikan)
export async function getDashboard() {
  let res;
  try {
    res = await fetch(RPC + 'content_dashboard', { headers: await authHeaders() });
  } catch (e) {
    return { total: undefined };
  }
  if (!res.ok) return { total: undefined };
  return res.json().catch(() => ({ total: undefined }));
}

// CSV12 kolom identik header lama :7010; rows dari RPC content_export (terfilter).
export async function downloadExport({ q, tempat, status, tipe, kategori }) {
  let res;
  try {
    res = await fetch(RPC + 'content_export' + qs({
      p_q: q, p_tempat: tempat, p_status: status, p_tipe: tipe, p_kategori: kategori,
    }), { headers: await authHeaders() });
  } catch (e) {
    throw new Error('Export failed');
  }
  if (!res.ok) throw new Error('Export failed');
  const rows = await res.json();
  const cols = ['id', 'user_email', 'tgl_buat', 'jadwal_posting', 'tempat', 'tipe',
    'kategori', 'description', 'storyboard', 'caption', 'status', 'link_postingan'];
  const esc = (s) => '"' + String(s ?? '').replace(/"/g, '""') + '"';
  const lines = [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'content.csv';
  a.click();
  URL.revokeObjectURL(url);
}
