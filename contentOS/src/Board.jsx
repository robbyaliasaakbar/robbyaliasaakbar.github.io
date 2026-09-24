// Board.jsx — table desktop + cards HP + filter + pagination.
// Filter selalu nempel (biar fokus ngetik gak ilang + kedip merah keliatan),
// yang shimmer cuma area list pas fetch.
import { useState } from 'react';

function badge(s) {
  if (s === 'ide') return 'bg-zinc-100 text-zinc-500 dark:bg-zinc-500/10 dark:text-zinc-300';
  if (s === 'post-production') return 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300';
  if (s === 'revision') return 'bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300';
  return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-600/10 dark:text-emerald-300';
}

function SkeletonList() {
  return (
    <div className="space-y-3 mt-3">
      <div className="shimmer h-16 rounded-2xl"></div>
      <div className="shimmer h-16 rounded-2xl"></div>
      <div className="shimmer h-16 rounded-2xl"></div>
    </div>
  );
}

export default function Board({ items, total, page, totalPages, info, loading, filters, onFilter, onPage, onEdit, onDelete, onAdd }) {
  function set(k, v) { onFilter({ ...filters, [k]: v }); }

  // Kedip merah sekilas pas filter disentuh, ilang sendiri 900ms (gak nempel kayak focus ring).
  const [flash, setFlash] = useState('');
  function flashKey(k) {
    setFlash(k);
    setTimeout(() => setFlash((f) => (f === k ? '' : f)), 900);
  }
  const ctrl = (k, extra = '') =>
    'px-3 py-2.5 min-h-[44px] border transition rounded-xl text-sm bg-paper dark:bg-[#0e0e10] ' + extra + ' ' +
    (flash === k
      ? 'border-accent ring-2 ring-accent'
      : 'border-ink/15 dark:border-white/15 hover:border-accent dark:hover:border-accent');

  // Key cuma dari data (bukan filter) biar ngetik di search gak kehilangan fokus.
  const listKey = page + '-' + total + '-' + (items[0]?.id || 'x');

  // Chip filter aktif: tanda permanen yang gak mungkin kelewat + klik ✕ buat lepas satu-satu.
  const activeChips = ['tempat', 'status', 'tipe', 'kategori', 'q'].filter((k) => (filters[k] || '') !== '');

  return (
    <section className="bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-4">
      <div className="grid grid-cols-2 gap-2">
        <input value={filters.q || ''} onChange={(e) => set('q', e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { flashKey('q'); onFilter(filters); } }} placeholder="Cari..." className={ctrl('q', 'col-span-2')} />
        {['tempat', 'status', 'tipe', 'kategori'].map((k) => (
          <select key={k} value={filters[k] || ''} onChange={(e) => { set(k, e.target.value); flashKey(k); }} className={ctrl(k)}>
            <option value="">{k}</option>
            {(k === 'tempat' ? ['IG', 'LinkedIn', 'Reddit', 'WA'] : k === 'status' ? ['ide', 'post-production', 'revision', 'posted'] : k === 'tipe' ? ['story', 'feeds', 'reels', 'carousel', 'text post', 'video'] : ['ai', 'web-app', 'app', 'automation', 'llm-infra', 'daily']).map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
        <span>{info}</span>
        <span>Page {page} of {totalPages}</span>
      </div>
      {activeChips.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2 fade-in">
          {activeChips.map((k) => (
            <button
              key={k}
              onClick={() => set(k, '')}
              title="Klik buat lepas filter ini"
              className="press inline-flex items-center gap-1.5 text-xs font-semibold bg-accent/10 text-accent border border-accent/40 rounded-full px-3 py-1.5 min-h-[36px]"
            >
              {k === 'q' ? `"${filters[k]}"` : `${k}: ${filters[k]}`}
              <span aria-hidden="true">✕</span>
            </button>
          ))}
          <button
            onClick={() => onFilter({ q: '', tempat: '', status: '', tipe: '', kategori: '' })}
            className="press text-xs font-semibold text-neutral-500 border border-ink/15 dark:border-white/15 rounded-full px-3 py-1.5 min-h-[36px]"
          >
            Reset semua
          </button>
        </div>
      )}
      <div className="mt-2 flex gap-2">
        <button onClick={() => onPage(page - 1)} disabled={page <= 1} className="btn-primary flex-1 bg-ink dark:bg-[#ededed] text-paper dark:text-black rounded-xl py-2.5 min-h-[44px] text-sm font-semibold disabled:opacity-40 disabled:pointer-events-none">← Prev</button>
        <button onClick={() => onPage(page + 1)} disabled={page >= totalPages} className="btn-primary flex-1 bg-ink dark:bg-[#ededed] text-paper dark:text-black rounded-xl py-2.5 min-h-[44px] text-sm font-semibold disabled:opacity-40 disabled:pointer-events-none">Next →</button>
      </div>

      {loading ? <SkeletonList /> : (
      <div key={listKey} className="fade-in">
      <div className="overflow-x-auto hidden lg:block mt-3">
        <table className="row-hover w-full text-sm min-w-[800px]">
          <thead><tr className="text-left text-xs text-neutral-500"><th className="px-3 py-2">ID</th><th className="px-3 py-2">Jadwal</th><th className="px-3 py-2">Tempat</th><th className="px-3 py-2">Tipe</th><th className="px-3 py-2">Status</th><th className="px-3 py-2">Link</th><th className="px-3 py-2">Aksi</th></tr></thead>
          <tbody>
            {items.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3 font-mono text-xs">{r.id}</td>
                <td className="p-3">{r.jadwal_posting}</td>
                <td className="p-3">{r.tempat}</td>
                <td className="p-3">{r.tipe}</td>
                <td className="p-3"><span className={'text-[11px] font-semibold px-2 py-1 rounded-full ' + badge(r.status)}>{r.status}</span></td>
                <td className="p-3">{r.link_postingan ? <span className="flex gap-1"><a href={r.link_postingan} target="_blank" rel="noreferrer" className="text-accent">🔗</a><button onClick={() => navigator.clipboard.writeText(r.link_postingan)} className="text-xs">📋</button></span> : '-'}</td>
                <td className="p-3 flex gap-1"><button onClick={() => onEdit(r)} className="press text-xs border border-ink/15 dark:border-white/15 hover:border-black dark:hover:border-white rounded-full px-3 py-2 min-h-[44px]">Edit</button><button onClick={() => onDelete(r)} className="press text-xs border border-ink/15 dark:border-white/15 hover:border-accent hover:text-accent rounded-full px-3 py-2 min-h-[44px]">Hapus</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-3 mt-3">
        {items.map((r) => (
          <div key={r.id} className="jt-lift border border-ink/10 dark:border-white/10 rounded-2xl p-4 bg-paper dark:bg-[#0e0e10]">
            <div className="flex justify-between"><p className="font-mono text-xs font-bold">{r.id}</p><span className={'text-[11px] font-semibold px-2 py-1 rounded-full ' + badge(r.status)}>{r.status}</span></div>
            <p className="mt-1 text-sm font-semibold">{r.tempat} • {r.tipe} • {r.jadwal_posting}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">{r.description}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => onEdit(r)} className="press flex-1 border border-ink/15 dark:border-white/15 rounded-xl py-2.5 min-h-[44px] text-sm">Edit</button>
              <button onClick={() => onDelete(r)} className="press flex-1 border border-ink/15 dark:border-white/15 rounded-xl py-2.5 min-h-[44px] text-sm">Hapus</button>
              {r.link_postingan && <a href={r.link_postingan} target="_blank" rel="noreferrer" className="press flex-1 text-center border border-ink/15 dark:border-white/15 rounded-xl py-2.5 min-h-[44px] text-sm text-accent">Buka 🔗</a>}
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center py-8 space-y-3">
          <p className="text-sm text-neutral-400">Belum ada konten, bikin dulu yuk</p>
          <button onClick={onAdd} className="btn-primary bg-ink dark:bg-[#ededed] text-paper dark:text-black font-bold text-xs uppercase rounded-xl px-6 py-3 min-h-[44px]">+ Ide baru</button>
        </div>
      )}
      </div>
      )}
    </section>
  );
}
