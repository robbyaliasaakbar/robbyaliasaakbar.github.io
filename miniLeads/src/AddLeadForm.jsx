// AddLeadForm.jsx — form manual 1 leads = 1x POST /leads/ingest.
// Pintu sama kayak Import CSV, jadi 1 pola dedup buat semua jalur masuk.
import { useState } from 'react';
import { ingestLead } from './api.js';

const EMPTY = { name: '', company: '', email: '', phone: '', country: '', notes: '' };

export default function AddLeadForm({ onDone }) {
  const [form, setForm] = useState(EMPTY);
  const [info, setInfo] = useState('No action yet.');
  const [busy, setBusy] = useState(false);

  // 1 fungsi buat semua input (key = nama kolom).
  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault(); // biar halaman tidak reload
    if (!form.name.trim()) { setInfo('Name is required.'); return; }
    if (!form.email.trim() && !form.phone.trim()) { setInfo('Email or phone is required.'); return; }

    setBusy(true);
    setInfo('Sending...');
    try {
      const j = await ingestLead({
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        country: form.country.trim(),
        message: form.notes.trim(),
      });
      setInfo(j.action === 'created' ? 'Done, new leads added.' : 'Done, existing leads updated (duplicate detected).');
      setForm(EMPTY);
      onDone();
    } catch (err) {
      setInfo('Failed: ' + err.message);
    }
    setBusy(false);
  }

  const inputCls = 'px-3 py-2.5 min-h-[44px] border border-ink/15 dark:border-white/15 rounded-xl text-sm focus:ring-2 focus:ring-accent focus:border-accent';

  return (
    <section className="bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-4 sm:p-5">
      <p className="eyebrow">Manual</p>
      <h2 className="mt-3 font-display font-bold">Add leads manually</h2>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Fill at least name + email / phone. Duplicates are merged automatically.</p>
      <form onSubmit={handleSubmit} className="mt-3 grid sm:grid-cols-2 gap-3">
        <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Full name (required)" autoComplete="off" className={inputCls} />
        <input value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Company" autoComplete="off" className={inputCls} />
        <input value={form.email} onChange={(e) => set('email', e.target.value)} type="email" placeholder="Email" autoComplete="off" className={inputCls} />
        <input value={form.phone} onChange={(e) => set('phone', e.target.value)} type="tel" placeholder="Phone" autoComplete="off" className={inputCls} />
        <input value={form.country} onChange={(e) => set('country', e.target.value)} placeholder="Country" autoComplete="off" className={inputCls} />
        <input value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Short notes (e.g. met at booth...)" autoComplete="off" className={inputCls} />
        <div className="sm:col-span-2 flex items-center gap-3">
          <button disabled={busy} className="btn-primary jt-btn bg-ink dark:bg-[#ededed] text-paper dark:text-[#0e0e10] font-display font-bold text-xs tracking-[0.14em] uppercase rounded-xl px-5 py-2.5 min-h-[44px] disabled:opacity-40">+ Add Leads</button>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{info}</p>
        </div>
      </form>
    </section>
  );
}
