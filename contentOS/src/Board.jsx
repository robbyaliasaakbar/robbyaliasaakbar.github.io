// Board.jsx — table desktop + cards HP + filter + pagination.
function badge(s) {
  if (s === 'ide') return 'bg-zinc-100 text-zinc-500 dark:bg-zinc-500/10 dark:text-zinc-300';
  if (s === 'post-production') return 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300';
  if (s === 'revision') return 'bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300';
  return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-600/10 dark:text-emerald-300';
}

export default function Board({ items, total, page, totalPages, info, filters, onFilter, onPage, onEdit, onDelete }) {
  function set(k, v) { onFilter({ ...filters, [k]: v }); }
  return (
    <section className="bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-4">
      <div className="grid grid-cols-2 gap-2">
        <input value={filters.q || ''} onChange={(e) => set('q', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onFilter(filters)} placeholder="Cari..." className="col-span-2 px-3 py-2.5 min-h-[44px] border rounded-xl text-sm" />
        {['tempat', 'status', 'tipe', 'kategori'].map((k) => (
          <select key={k} value={filters[k] || ''} onChange={(e) => set(k, e.target.value)} className="px-3 py-2.5 min-h-[44px] border rounded-xl text-sm bg-paper dark:bg-[#0e0e10]">
            <option value="">{k}</option>
            {(k === 'tempat' ? ['IG', 'LinkedIn', 'Reddit', 'WA'] : k === 'status' ? ['ide', 'post-production', 'revision', 'posted'] : k === 'tipe' ? ['story', 'feeds', 'reels', 'carousel', 'text post', 'video'] : ['ai', 'web-app', 'app', 'automation', 'llm-infra', 'daily']).map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
        <span>{info}</span>
        <span>Page {page} of {totalPages}</span>
      </div>
      <div className="mt-2 flex gap-2">
        <button onClick={() => onPage(page - 1)} disabled={page <= 1} className="flex-1 border rounded-xl py-2.5 min-h-[44px] text-sm disabled:opacity-40">← Prev</button>
        <button onClick={() => onPage(page + 1)} disabled={page >= totalPages} className="flex-1 border rounded-xl py-2.5 min-h-[44px] text-sm disabled:opacity-40">Next →</button>
      </div>

      <div className="overflow-x-auto hidden lg:block mt-3">
        <table className="w-full text-sm min-w-[800px]">
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
                <td className="p-3 flex gap-1"><button onClick={() => onEdit(r)} className="text-xs border rounded-full px-3 py-2 min-h-[44px]">Edit</button><button onClick={() => onDelete(r)} className="text-xs border rounded-full px-3 py-2 min-h-[44px]">Hapus</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-3 mt-3">
        {items.map((r) => (
          <div key={r.id} className="border rounded-2xl p-4">
            <div className="flex justify-between"><p className="font-mono text-xs font-bold">{r.id}</p><span className={'text-[11px] font-semibold px-2 py-1 rounded-full ' + badge(r.status)}>{r.status}</span></div>
            <p className="mt-1 text-sm font-semibold">{r.tempat} • {r.tipe} • {r.jadwal_posting}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">{r.description}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => onEdit(r)} className="flex-1 border rounded-xl py-2.5 min-h-[44px] text-sm">Edit</button>
              <button onClick={() => onDelete(r)} className="flex-1 border rounded-xl py-2.5 min-h-[44px] text-sm">Hapus</button>
              {r.link_postingan && <a href={r.link_postingan} target="_blank" rel="noreferrer" className="flex-1 text-center border rounded-xl py-2.5 min-h-[44px] text-sm text-accent">Buka 🔗</a>}
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-center py-8 text-sm text-neutral-400">Belum ada konten, bikin dulu yuk</p>}
    </section>
  );
}
