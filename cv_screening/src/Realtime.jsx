// Realtime.jsx — live view of the 7-step screening pipeline.
// Steps 1 (submit) and 7 (response) are real network calls.
// Steps 2-6 mirror the workflow order plus a lightweight keyword preview.

import { useState } from 'react';
import { sendToN8n, getN8nUrl } from './n8n.js';

const STEPS = [
  { key: 'receive', label: 'Receive upload batch' },
  { key: 'split', label: 'Split into individual CVs' },
  { key: 'route', label: 'Route by keyword group' },
  { key: 'assign', label: 'Assign screening track' },
  { key: 'score', label: 'Score skills, education, experience' },
  { key: 'rank', label: 'Rank and store results' },
  { key: 'respond', label: 'Return ranking to app' },
];

// Lightweight keyword preview (mirrors the workflow router). Not the official score.
function previewTrack(text) {
  const t = (text || '').toLowerCase();
  const groups = {
    A: ['autocad', 'revit', 'sketchup', 'architect', 'technical drawing'],
    B: ['drafter', 'enscape', 'd5', 'drawing', 'detail'],
    C: ['interior', 'furniture', 'rendering', 'photoshop', 'vray'],
  };
  let best = 'A';
  let bestScore = -1;
  for (const k of Object.keys(groups)) {
    const score = groups[k].filter((w) => t.includes(w)).length;
    if (score > bestScore) { bestScore = score; best = k; }
  }
  return best;
}

function outcomeOf(r) {
  if (r.status === 'Lolos') return 'Shortlisted';
  if (r.status === 'Tidak Lolos' || r.status === 'Tidak') return 'Not shortlisted';
  return r.status || '-';
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function dot(status) {
  if (status === 'running') return 'bg-blue-500 animate-pulse';
  if (status === 'done') return 'bg-emerald-500';
  if (status === 'failed') return 'bg-accent';
  return 'bg-neutral-300 dark:bg-white/20';
}

function saveFile(name, parts, type) {
  const blob = new Blob(parts, { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function stamp() {
  return new Date().toISOString().slice(0, 10);
}

export default function Realtime({ payload }) {
  const [steps, setSteps] = useState(STEPS.map((s) => ({ ...s, status: 'queued', detail: '' })));
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState('');
  const [ranking, setRanking] = useState(null);

  function downloadRankingJSON() {
    if (!ranking) return;
    saveFile(
      'cv-ranking-' + stamp() + '-' + ranking.length + 'cv.json',
      [JSON.stringify({ total_cv: ranking.length, ranking }, null, 2)],
      'application/json'
    );
  }

  function downloadRankingCSV() {
    if (!ranking) return;
    const cell = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
    const header = ['Rank', 'CV ID', 'File Name', 'Track', 'Score (0-100)', 'Outcome', 'Reason'];
    const rows = ranking.map((r, i) =>
      [r.rank || i + 1, r.id_cv || '', r.nama_file || '', r.posisi || '', r.total_score ?? '', outcomeOf(r), r.alasan || '']
        .map(cell)
        .join(',')
    );
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]); // Excel opens UTF-8 cleanly
    saveFile('cv-ranking-' + stamp() + '.csv', [bom, [header.join(','), ...rows].join('\n')], 'text/csv;charset=utf-8;');
  }

  function setStep(i, status, detail) {
    setSteps((prev) => prev.map((s, j) => (j === i ? { ...s, status, detail: detail ?? s.detail } : s)));
  }

  async function screen() {
    if (payload.length === 0) { setNotice('Extract text first. Nothing to screen yet.'); return; }
    setSending(true);
    setNotice('');
    setRanking(null);
    setSteps(STEPS.map((s) => ({ ...s, status: 'queued', detail: '' })));

    // Real request starts up front (steps 1 and 7 are genuine).
    const request = sendToN8n(payload);

    // Step 1: submit (real POST runs in the background)
    setStep(0, 'running', payload.length + ' CVs • sending to screening service');
    await wait(450);
    setStep(0, 'done', payload.length + ' CVs submitted');

    // Step 2: split preview (payload is already per CV)
    setStep(1, 'running', 'Splitting into ' + payload.length + ' items');
    await wait(350);
    setStep(1, 'done', payload.length + ' items • ' + payload.map((p) => p.id).join(', '));

    // Step 3: routing preview from the actual text
    setStep(2, 'running', 'Reading keywords...');
    await wait(450);
    const tracks = payload.map((p) => previewTrack(p.text));
    const nA = tracks.filter((x) => x === 'A').length;
    const nB = tracks.filter((x) => x === 'B').length;
    const nC = tracks.filter((x) => x === 'C').length;
    setStep(2, 'done', 'Group A:' + nA + ' B:' + nB + ' C:' + nC + ' (preview, final grouping in workflow)');

    // Steps 4-6: mirror the workflow order
    setStep(3, 'running', 'One CV, one track');
    await wait(350);
    setStep(3, 'done', 'Tracks assigned');

    setStep(4, 'running', 'Skills 50 • Education 20 • Experience 30');
    await wait(450);
    setStep(4, 'done', 'Pass mark 65');

    setStep(5, 'running', 'Waiting for ranking...');
    // Step 7: await the genuine response
    setStep(6, 'running', 'Waiting for response...');
    try {
      const res = await request;
      let list = null;
      if (Array.isArray(res)) list = res;
      else if (res && Array.isArray(res.ranking)) list = res.ranking;
      else if (res && res.json && Array.isArray(res.json.ranking)) list = res.json.ranking;
      else if (res && Array.isArray(res.data)) list = res.data;
      setStep(5, 'done', 'Processing complete');
      if (list && list.length > 0) {
        setStep(6, 'done', list.length + ' results returned');
        setRanking(list);
        const shortlisted = list.filter((r) => r.status === 'Lolos').length;
        setNotice('Done! ' + list.length + ' CV(s) ranked • ' + shortlisted + ' shortlisted.');
      } else {
        setStep(6, 'done', 'Submitted, no ranking table returned');
        setNotice('Submitted for screening. Check the workflow execution log.');
      }
    } catch (err) {
      const msg = err.name === 'AbortError' ? 'Timed out after 15s — the screening service did not respond' : (err.message || 'The screening service is unreachable');
      setStep(5, 'failed', 'Service did not respond');
      setStep(6, 'failed', msg);
      setNotice('Submission failed: ' + msg + '. Your JSON is safe (use Download above as a fallback).');
    }
    setSending(false);
  }

  return (
    <div className="card-float border border-black/10 dark:border-white/10 rounded-2xl p-5">
      <p className="text-xs font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
        Screening pipeline (live)
      </p>

      <button
        onClick={screen}
        disabled={payload.length === 0 || sending}
        className="mt-3 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent text-white hover:bg-[#a50000] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgba(215,0,0,.6)] active:scale-[.98] transition disabled:bg-neutral-200 disabled:text-neutral-400 dark:disabled:bg-white/10 dark:disabled:text-neutral-500 disabled:hover:transform-none disabled:hover:shadow-none font-bold text-xs tracking-[0.14em] uppercase px-6 py-3 rounded-xl disabled:cursor-not-allowed"
      >
        {sending ? 'Screening...' : 'Screen ' + payload.length + ' CV(s)'}
      </button>
      {notice && <p className="mt-2 text-xs text-neutral-700 dark:text-neutral-200">{notice}</p>}

      <ol className="mt-3 space-y-2">
        {steps.map((s, i) => (
          <li key={s.key} className="flex items-start gap-3 text-sm">
            <span className={'mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ' + dot(s.status)}></span>
            <div className="min-w-0">
              <p className="font-bold text-xs">{(i + 1) + '. ' + s.label} <span className="font-normal opacity-70">• {s.status}</span></p>
              {s.detail && <p className="text-xs opacity-80 font-mono break-words">{s.detail}</p>}
            </div>
          </li>
        ))}
      </ol>

      {ranking && (
        <div className="mt-3">
          {/* Desktop table (md and up). Mobile cards below, no sideways scroll. */}
          <div className="hidden md:block overflow-x-auto border border-black/10 dark:border-white/10 rounded-xl">
            <table className="w-full text-xs">
              <thead className="bg-neutral-50 dark:bg-white/5 text-neutral-600 dark:text-neutral-300">
                <tr>
                  <th className="text-left px-3 py-2">Rank</th>
                  <th className="text-left px-3 py-2">Resume</th>
                  <th className="text-left px-3 py-2">Track</th>
                  <th className="text-left px-3 py-2">Score</th>
                  <th className="text-left px-3 py-2">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((r, i) => (
                  <tr key={r.id_cv || i} className="border-t border-black/5 dark:border-white/10">
                    <td className="px-3 py-2 font-mono">{r.rank || i + 1}</td>
                    <td className="px-3 py-2 font-bold">{r.nama_file || r.id_cv}</td>
                    <td className="px-3 py-2">{r.posisi || '-'}</td>
                    <td className="px-3 py-2 font-mono font-bold">{r.total_score ?? '-'}</td>
                    <td className="px-3 py-2">{outcomeOf(r)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: one card per CV, fits the screen, no sideways scroll */}
          <div className="md:hidden space-y-2">
            {ranking.map((r, i) => (
              <div key={r.id_cv || i} className="border border-black/10 dark:border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-ink text-white dark:bg-white dark:text-black text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {r.rank || i + 1}
                  </span>
                  <p className="font-bold text-xs truncate flex-1">{r.nama_file || r.id_cv}</p>
                  <span className="font-mono font-bold text-xs flex-shrink-0">{r.total_score ?? '-'}</span>
                </div>
                <p className="text-xs opacity-80 mt-1 font-mono">{r.id_cv}</p>
                <div className="flex items-center justify-between gap-2 mt-2">
                  <p className="text-xs truncate flex-1">{r.posisi || '-'}</p>
                  <span
                    className={
                      'text-[11px] font-bold px-2 py-1 rounded-full flex-shrink-0 ' +
                      (r.status === 'Lolos'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
                        : 'bg-neutral-100 text-neutral-600 dark:bg-white/10 dark:text-neutral-300')
                    }
                  >
                    {outcomeOf(r)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            <button
              onClick={downloadRankingCSV}
              className="inline-flex items-center justify-center gap-2 bg-accent text-white hover:bg-[#a50000] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgba(215,0,0,.6)] active:scale-[.98] transition font-bold text-xs tracking-[0.14em] uppercase px-5 py-3 rounded-xl"
            >
              Download CSV
            </button>
            <button
              onClick={downloadRankingJSON}
              className="inline-flex items-center justify-center gap-2 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 text-sm font-medium transition hover:bg-accent hover:border-accent hover:text-white"
            >
              Download JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
