// api.js — 1 pintu data (Supabase: RPC + Edge Functions, cutover 5.4).
// Kontrak lama dipertahankan: getLeads/getDashboard/downloadExport/ingestLead.
// Backend multi-user WAJIB token tiap request → tempel di semua fetch.

import { getToken } from './auth.js';
import { SUPABASE_ANON_KEY, REST_BASE, FUNC_BASE } from './config.js';

function headers(json = false) {
  const t = getToken();
  return {
    ...(json ? { 'Content-Type': 'application/json' } : {}),
    apikey: SUPABASE_ANON_KEY,
    ...(t ? { Authorization: 'Bearer ' + t } : {}),
  };
}

function errMsg(j, fallback) {
  return (j && (j.message || j.error || j.msg)) || fallback;
}

export async function getLeads({ q, status, country, owner, page = 1, limit = 20 }) {
  const p = new URLSearchParams();
  if (q) p.set('p_q', q);
  if (status) p.set('p_status', status);
  if (country) p.set('p_country', country);
  if (owner) p.set('p_owner', owner);
  p.set('p_page', page);
  p.set('p_limit', limit);
  const res = await fetch(REST_BASE + '/rpc/leads_list?' + p.toString(), { headers: headers() });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) return { error: errMsg(j, 'Failed to load leads.') };
  return j; // { total, page, limit, totalPages, count, data } atau { error }
}

export async function getDashboard() {
  const res = await fetch(REST_BASE + '/rpc/leads_dashboard', { headers: headers() });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) return { error: errMsg(j, 'Failed to load dashboard.') };
  return j; // { total, by_status, by_channel } atau { error }
}

// Export via fetch (link <a> tidak bisa bawa token) → download file CSV.
// RPC balikin TEXT (bukan JSON) — blob tetap jalan.
export async function downloadExport({ q, status, country, owner }) {
  const p = new URLSearchParams();
  if (q) p.set('p_q', q);
  if (status) p.set('p_status', status);
  if (country) p.set('p_country', country);
  if (owner) p.set('p_owner', owner);
  const res = await fetch(REST_BASE + '/rpc/leads_export?' + p.toString(), { headers: headers() });
  if (!res.ok) throw new Error('Export failed');
  const text = await res.text();
  const blob = new Blob([text], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'leads.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// 1 pintu tambah data (dipakai Import CSV + form manual).
// RPC yang urus dedup: email/phone sama = update, baru = insert.
// Balikin { action: 'created' | 'updated', lead }
export async function ingestLead(payload) {
  const res = await fetch(REST_BASE + '/rpc/leads_ingest', {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify({ p_payload: payload }),
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(errMsg(j, 'failed'));
  return j;
}

// Cari kembaran (Edge Function, salinan dedupe.js). Balikin { candidates_checked, groups, ms }.
export async function dedupeCandidates(top = 50) {
  const res = await fetch(FUNC_BASE + '/leads-dedupe', {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify({ top }),
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(errMsg(j, 'dedupe failed'));
  return j;
}

// Notes/message -> { channel, detail } (Edge Function, salinan extract.js, wajib login).
export async function extractChannel(text) {
  const res = await fetch(FUNC_BASE + '/leads-extract', {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify({ text }),
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(errMsg(j, 'extract failed'));
  return j;
}
