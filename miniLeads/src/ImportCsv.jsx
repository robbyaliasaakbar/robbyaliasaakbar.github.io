// ImportCsv.jsx — 1 fitur = 1 file. Nembak POST /leads/ingest per baris CSV.
// Pintu sama kayak form manual, jadi dedup-nya 1 pola: email/phone sama = update.
import { useState } from 'react';
import { ingestLead } from './api.js';
import { parseCSV } from './csv.js';

// Ambil isi kolom pake nama header (urutan kolom ketuker tetap aman).
function col(row, idx, name) {
  const i = idx[name];
  return (i === undefined ? '' : row[i] || '').trim();
}

export default function ImportCsv({ onDone }) {
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState('No file selected yet.');
  const [busy, setBusy] = useState(false);

  async function handleImport() {
    if (!file) { setInfo('Please select a CSV file first.'); return; }
    setBusy(true);
    setInfo('Reading file...');
    const text = await file.text();
    const all = parseCSV(text);
    if (all.length < 2) { setInfo('Empty CSV / header only.'); setBusy(false); return; }

    const header = all[0].map((h) => h.trim());
    const idx = {};
    header.forEach((h, i) => { idx[h] = i; });

    let created = 0, updated = 0, skipped = 0, failed = 0;
    const totalRows = all.length - 1;

    for (let r = 1; r < all.length; r++) {
      const row = all[r];
      const first = col(row, idx, 'First Name');
      const last = col(row, idx, 'Last Name');
      const full = col(row, idx, 'Full Name');
      const payload = {
        name: full || (first + ' ' + last).trim(),
        email: col(row, idx, 'Email'),
        phone: col(row, idx, 'Phone Number'),
        company: col(row, idx, 'Company Name'),
        country: col(row, idx, 'Country/Region'),
        message: col(row, idx, 'Notes'),
      };
      if (!payload.email && !payload.phone) { skipped++; continue; } // backend wajib salah satu
      try {
        const j = await ingestLead(payload);
        if (j.action === 'created') created++; else updated++;
      } catch (e) { failed++; }
      if (r % 20 === 0) setInfo(`Processing ${r}/${totalRows}... (new:${created} updated:${updated} skipped:${skipped})`);
    }

    setInfo(`Done: ${totalRows} rows → new:${created} updated:${updated} skipped:${skipped} failed:${failed}. List refreshed.`);
    setBusy(false);
    onDone();
  }

  return (
    <section className="bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-4 sm:p-5">
      <p className="eyebrow">Import</p>
      <h2 className="mt-3 font-display font-bold">Add data via CSV</h2>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Select a CSV file with the same header as <b>leads_seed.csv</b>. Columns used: Full Name / First+Last, Company Name, Email, Phone Number, Country/Region, Notes. Rows without email+phone are skipped.</p>
      <div className="mt-3 flex flex-col sm:flex-row gap-3">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => { setFile(e.target.files[0] || null); setInfo('Ready to import.'); }}
          className="flex-1 px-3 py-2.5 min-h-[44px] border border-ink/15 dark:border-white/15 rounded-xl text-sm bg-paper dark:bg-[#0e0e10]"
        />
        <button
          onClick={handleImport}
          disabled={busy}
          className="btn-primary jt-btn bg-ink dark:bg-[#ededed] text-paper dark:text-[#0e0e10] font-display font-bold text-xs tracking-[0.14em] uppercase rounded-xl px-5 py-2.5 min-h-[44px] disabled:opacity-40"
        >
          Import CSV
        </button>
      </div>
      <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{info}</p>
    </section>
  );
}
