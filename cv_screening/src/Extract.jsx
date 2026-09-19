// Extract.jsx — turn files into screening-ready JSON. Same contract as the original POC.
// Payload: [{id, filename, size_kb, page_count, text, uploaded_at}]
// Robust: one unreadable file never blocks the rest.

import { useState } from 'react';
import { ekstrakTextDariPDF } from './pdf.js';

export default function Extract({ files, payload, setPayload }) {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0, name: '' });
  const [notice, setNotice] = useState('');

  async function extract() {
    if (files.length === 0) { setNotice('Upload at least 1 PDF first.'); return; }
    setRunning(true);
    setNotice('');
    setPayload([]);
    const out = [];
    const total = files.length;
    setProgress({ done: 0, total, name: 'Preparing...' });

    for (let i = 0; i < total; i++) {
      const item = files[i];
      setProgress({ done: i, total, name: item.id + ' • ' + item.file.name });
      try {
        const { text, page_count } = await ekstrakTextDariPDF(item.file);
        if (!text || text.length < 10) setNotice('"' + item.file.name + '" appears empty or unreadable.');
        out.push({
          id: item.id,
          filename: item.file.name,
          size_kb: Math.round(item.file.size / 1024),
          page_count,
          text,
          uploaded_at: new Date().toISOString(),
        });
      } catch (err) {
        // One failure never blocks the rest. Flagged in JSON so it stays visible.
        out.push({
          id: item.id,
          filename: item.file.name,
          size_kb: Math.round(item.file.size / 1024),
          page_count: 0,
          text: '',
          uploaded_at: new Date().toISOString(),
          _error: String(err.message || err),
        });
        setNotice('Failed to extract "' + item.file.name + '": ' + (err.message || err));
      }
      setProgress({ done: i + 1, total, name: item.id + ' • ' + item.file.name });
    }

    setPayload(out);
    setRunning(false);
    if (!notice) setNotice('Extraction complete • ' + out.length + ' CV(s) ready as JSON.');
  }

  function downloadJSON() {
    if (payload.length === 0) return;
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv-payload-' + new Date().toISOString().slice(0, 10) + '-' + payload.length + 'cv.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  const percent = progress.total === 0 ? 0 : Math.round((progress.done / progress.total) * 100);

  return (
    <div className="card-float border border-black/10 dark:border-white/10 rounded-2xl p-5">
      <p className="text-xs font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
        Extract text
      </p>

      <button
        onClick={extract}
        disabled={files.length === 0 || running}
        className="mt-3 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent text-white hover:bg-[#a50000] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgba(215,0,0,.6)] active:scale-[.98] transition disabled:bg-neutral-200 disabled:text-neutral-400 dark:disabled:bg-white/10 dark:disabled:text-neutral-500 disabled:hover:transform-none disabled:hover:shadow-none font-bold text-xs tracking-[0.14em] uppercase px-6 py-3 rounded-xl disabled:cursor-not-allowed"
      >
        {running ? 'Extracting ' + progress.done + '/' + progress.total + '...' : 'Extract ' + files.length + ' CV(s) to JSON'}
      </button>

      {progress.total > 0 && (
        <div className="mt-3">
          <div className="w-full bg-neutral-100 dark:bg-white/10 rounded-full h-2 overflow-hidden">
            <div className="h-2 bg-ink dark:bg-white rounded-full transition-all" style={{ width: percent + '%' }}></div>
          </div>
          <p className="text-xs opacity-80 mt-1 font-mono truncate">{progress.name} • {percent}%</p>
        </div>
      )}

      {notice && <p className="mt-2 text-xs text-neutral-700 dark:text-neutral-200">{notice}</p>}

      {payload.length > 0 && (
        <div className="mt-3 space-y-2">
          {payload.map((p) => (
            <div key={p.id} className="border border-black/10 dark:border-white/10 rounded-xl p-3 text-xs">
              <p className="font-bold">{p.id} • {p.filename} • {p.page_count} pages • {p.text.length} chars</p>
              <p className="opacity-80 mt-1 font-mono break-words">{p.text.slice(0, 160)}{p.text.length > 160 ? '...' : ''}</p>
              {p._error && <p className="text-accent mt-1">Error: {p._error}</p>}
            </div>
          ))}
          <button
            onClick={downloadJSON}
            className="inline-flex items-center gap-2 border border-black/10 dark:border-white/10 rounded-xl px-5 py-2.5 text-sm font-medium transition hover:bg-accent hover:border-accent hover:text-white"
          >
            Download JSON ({payload.length} CVs)
          </button>
        </div>
      )}
    </div>
  );
}
