// n8n.js — single gateway to the screening workflow.
// The app packages 1–5 CVs as a JSON array and POSTs it here.
// Workflow response = ranking. Offline = JSON download fallback.

const N8N_URL = import.meta.env.VITE_N8N_URL || 'http://localhost:5678/webhook/upload-cv';

export function getN8nUrl() {
  return N8N_URL;
}

// payload = array [{id, filename, size_kb, page_count, text, uploaded_at}]
export async function sendToN8n(payload, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(N8N_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      throw new Error('HTTP ' + res.status + ' ' + txt.slice(0, 120));
    }
    return await res.json().catch(() => ({}));
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}
