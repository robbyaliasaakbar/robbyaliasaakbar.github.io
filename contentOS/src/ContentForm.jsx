// ContentForm.jsx — form 10 kolom + warning link posted + copy.
import { useState, useEffect } from 'react';

const TEMPAT = ['IG', 'LinkedIn', 'Reddit', 'WA'];
const TIPE = ['story', 'feeds', 'reels', 'carousel', 'text post', 'video'];
const KAT = ['ai', 'web-app', 'app', 'automation', 'llm-infra', 'daily'];
const STATUS = ['ide', 'post-production', 'revision', 'posted'];

const inputCls = 'w-full px-3 py-2.5 min-h-[44px] border border-ink/15 dark:border-white/15 rounded-xl text-sm bg-paper dark:bg-[#0e0e10]';

export default function ContentForm({ initial, onSubmit, onCancel, busy }) {
  const [f, setF] = useState({ jadwal_posting: '', tempat: 'IG', tipe: 'reels', kategori: 'ai', description: '', storyboard: '', caption: '', status: 'ide', link_postingan: '' });
  const [warn, setWarn] = useState('');

  useEffect(() => {
    if (initial) setF({
      jadwal_posting: initial.jadwal_posting || '', tempat: initial.tempat || 'IG',
      tipe: initial.tipe || 'reels', kategori: initial.kategori || 'ai',
      description: initial.description || '', storyboard: initial.storyboard || '',
      caption: initial.caption || '', status: initial.status || 'ide',
      link_postingan: initial.link_postingan || '',
    });
  }, [initial]);

  function set(k, v) { setF((p) => ({ ...p, [k]: v })); }

  function submit(e) {
    e.preventDefault();
    if (f.status === 'posted' && !f.link_postingan.trim()) {
      setWarn('Link wajib diisi saat status posted');
      return;
    }
    if (f.link_postingan && !/^https?:\/\/.+/.test(f.link_postingan.trim())) {
      setWarn('URL harus http...');
      return;
    }
    setWarn('');
    // type=date kasih yyyy-mm-dd, backend yang ubah ke dd-mm-yyyy
    onSubmit({ ...f, id: initial?.id });
  }

  // ubah dd-mm-yyyy -> yyyy-mm-dd buat input date
  function toDateInput(v) {
    const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(v || '');
    if (m) return `${m[3]}-${m[2]}-${m[1]}`;
    return v || '';
  }

  return (
    <form onSubmit={submit} className="bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm">Jadwal<input type="date" value={toDateInput(f.jadwal_posting)} onChange={(e) => set('jadwal_posting', e.target.value)} className={inputCls} /></label>
        <label className="text-sm">Status<select value={f.status} onChange={(e) => set('status', e.target.value)} className={inputCls}>{STATUS.map((s) => <option key={s} value={s}>{s}</option>)}</select></label>
        <label className="text-sm">Tempat<select value={f.tempat} onChange={(e) => set('tempat', e.target.value)} className={inputCls}>{TEMPAT.map((s) => <option key={s} value={s}>{s}</option>)}</select></label>
        <label className="text-sm">Tipe<select value={f.tipe} onChange={(e) => set('tipe', e.target.value)} className={inputCls}>{TIPE.map((s) => <option key={s} value={s}>{s}</option>)}</select></label>
        <label className="text-sm col-span-2">Kategori<select value={f.kategori} onChange={(e) => set('kategori', e.target.value)} className={inputCls}>{KAT.map((s) => <option key={s} value={s}>{s}</option>)}</select></label>
      </div>
      <textarea value={f.description} onChange={(e) => set('description', e.target.value)} placeholder="Ide mentah 1-2 kalimat" rows={2} className={inputCls} />
      <textarea value={f.storyboard} onChange={(e) => set('storyboard', e.target.value)} placeholder="Storyboard markdown bebas" rows={4} className={inputCls} />
      <div>
        <textarea value={f.caption} onChange={(e) => set('caption', e.target.value)} placeholder="Caption final siap copy" rows={3} className={inputCls} />
        {f.caption && <button type="button" onClick={() => navigator.clipboard.writeText(f.caption)} className="press mt-1 text-xs border border-ink/15 dark:border-white/15 hover:border-black dark:hover:border-white rounded-full px-3 py-2 min-h-[44px]">Copy caption</button>}
      </div>
      <div>
        <input value={f.link_postingan} onChange={(e) => set('link_postingan', e.target.value)} placeholder="https://... (wajib saat posted)" className={inputCls} />
        {warn && <p className="mt-1 text-sm text-accent font-semibold">{warn}</p>}
        {f.status === 'posted' && !f.link_postingan.trim() && !warn && <p className="mt-1 text-sm text-accent">Link wajib diisi saat status posted</p>}
      </div>
      <div className="flex gap-2">
        <button disabled={busy} className="btn-primary flex-1 bg-ink dark:bg-[#ededed] text-paper dark:text-[#0e0e10] font-bold text-xs uppercase rounded-xl px-4 py-3 min-h-[44px] disabled:opacity-40">{initial ? 'Update' : 'Simpan'}</button>
        <button type="button" onClick={onCancel} className="press px-4 py-3 min-h-[44px] border border-ink/15 dark:border-white/15 hover:border-black dark:hover:border-white rounded-xl text-sm">Batal</button>
      </div>
    </form>
  );
}
