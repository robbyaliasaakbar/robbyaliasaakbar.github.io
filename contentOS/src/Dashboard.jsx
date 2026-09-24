// Dashboard.jsx — kartu total/by_status 4/by_tempat 4, klik = filter.
export default function Dashboard({ dash, onFilter }) {
  const s = dash.by_status || {};
  const t = dash.by_tempat || {};
  const card = 'jt-lift text-left bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-4 min-h-[44px]';
  return (
    <section className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      <button onClick={() => onFilter({})} className={card}>
        <p className="text-xs font-semibold text-neutral-500">TOTAL</p>
        <p className="font-display font-bold text-2xl font-mono">{dash.total ?? '-'}</p>
      </button>
      {[
        ['ide', 'IDE', 'text-zinc-500'],
        ['post-production', 'PROD', 'text-amber-500'],
        ['revision', 'REVISI', 'text-sky-500'],
        ['posted', 'POSTED', 'text-emerald-600'],
      ].map(([k, label, cls]) => (
        <button key={k} onClick={() => onFilter({ status: k })} className={card}>
          <p className={'text-xs font-semibold ' + cls}>{label}</p>
          <p className="font-display font-bold text-2xl font-mono">{s[k] ?? '-'}</p>
        </button>
      ))}
      <div className="col-span-2 lg:col-span-5 grid grid-cols-4 gap-3">
        {['IG', 'LinkedIn', 'Reddit', 'WA'].map((k) => (
          <button key={k} onClick={() => onFilter({ tempat: k })} className={card}>
            <p className="text-xs font-semibold text-neutral-500">{k}</p>
            <p className="font-display font-bold text-xl font-mono">{t[k] ?? '-'}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
