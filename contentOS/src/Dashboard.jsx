// Dashboard.jsx — kartu total/by_status 4/by_tempat 4 + chart tap-to-filter.
import StatusChart from './StatusChart.jsx';
import TempatDonut from './TempatDonut.jsx';

export default function Dashboard({ dash, onFilter, theme, filters }) {
  const s = dash.by_status || {};
  const t = dash.by_tempat || {};
  const dark = theme === 'dark';
  const card = 'press jt-lift text-left bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-4 min-h-[44px]';
  const hasChartFilter = (filters?.status || '') !== '' || (filters?.tempat || '') !== '';

  function toggleStatus(k) {
    onFilter({ status: filters?.status === k ? '' : k });
  }
  function toggleTempat(k) {
    onFilter({ tempat: filters?.tempat === k ? '' : k });
  }

  return (
    <div className="space-y-3">
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

    {/* Analitik: tap chart = filter, tap lagi = batal. Mobile susun ke bawah. */}
    <section className="bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="eyebrow">Analitik</p>
          <h2 className="mt-1 font-display font-bold">Konten per Status & Platform</h2>
        </div>
        {hasChartFilter && (
          <button
            onClick={() => onFilter({ status: '', tempat: '' })}
            className="text-xs font-semibold border border-ink/15 dark:border-white/15 rounded-full px-3 py-2 min-h-[44px]"
          >
            ✕ Clear
          </button>
        )}
      </div>
      <div className="mt-3 grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch">
        <div className="lg:col-span-3 h-72 lg:h-80">
          <StatusChart byStatus={s} selected={filters?.status || ''} dark={dark} onSelect={toggleStatus} />
        </div>
        <div className="lg:col-span-2 h-72 lg:h-80">
          <TempatDonut byTempat={t} selected={filters?.tempat || ''} dark={dark} onSelect={toggleTempat} />
        </div>
      </div>
      <p className="mt-2 text-xs text-neutral-400">Tap batang atau potongan buat filter, tap lagi buat batalin. Data refresh sendiri tiap 30 detik.</p>
    </section>
    </div>
  );
}
