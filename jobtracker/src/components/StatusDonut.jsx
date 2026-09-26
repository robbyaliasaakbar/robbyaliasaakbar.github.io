import { STATUS_LIST, STATUS_META } from '../data/status.js';

// Donat ringan SVG tanpa dependency — pasangan bar chart.
// Klik legend/potongan → filter tabel (sama kayak bar).

const HEX = {
  baru: '#6E6E69',
  'interview-hr': '#a9741c',
  'technical-test': '#37627e',
  'interview-user': '#7c4b63',
  offering: '#4ADE80',
  diterima: '#3e6b4e',
  ditolak: '#D70000',
};

export function StatusDonut({ lamaran = [], selected = 'semua', onSelect }) {
  const total = lamaran.length;
  const hitung = (s) => lamaran.filter((x) => x.status === s).length;
  const values = STATUS_LIST.map(hitung);

  const R = 54;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <section aria-label="Sebaran status donat" className="mx-auto max-w-5xl px-5 pt-6">
      <div className="rounded-[12px] border border-rule bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-lg font-bold tracking-tight">Komposisi status</h2>
          <p className="font-sans text-[13px] text-graphite">
            {total ? `${total} lamaran` : 'Belum ada data'}
          </p>
        </div>

        <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-center">
          <div className="relative h-44 w-44 shrink-0">
            <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(12,12,12,0.08)" strokeWidth="18" />
              {total > 0 &&
                STATUS_LIST.map((s, i) => {
                  const v = values[i];
                  if (!v) return null;
                  const frac = v / total;
                  const len = frac * C;
                  const el = (
                    <circle
                      key={s}
                      cx="70"
                      cy="70"
                      r={R}
                      fill="none"
                      stroke={HEX[s]}
                      strokeWidth={selected === 'semua' || selected === s ? 18 : 12}
                      strokeDasharray={`${len} ${C - len}`}
                      strokeDashoffset={-offset}
                      strokeLinecap="butt"
                      opacity={selected !== 'semua' && selected !== s ? 0.25 : 1}
                      onClick={() => onSelect(s)}
                      className="motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out"
                      style={{ cursor: 'pointer' }}
                    />
                  );
                  offset += len;
                  return el;
                })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-2xl font-extrabold tabular-nums">{total}</span>
              <span className="font-sans text-xs text-graphite">total</span>
            </div>
          </div>

          <ul className="grid w-full grid-cols-1 gap-1.5 min-[420px]:grid-cols-2">
            {STATUS_LIST.map((s, i) => {
              const v = values[i];
              const meta = STATUS_META[s];
              const aktif = selected === s;
              const pct = total ? Math.round((v / total) * 100) : 0;
              return (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => onSelect(s)}
                    aria-pressed={aktif}
                    aria-label={`${meta.label}, ${v} lamaran (${pct} persen)`}
                    className={`flex w-full items-center gap-2.5 rounded-[8px] border px-2.5 py-2 text-left motion-safe:transition-all ${
                      aktif
                        ? 'border-ink bg-white shadow-[2px_2px_0_0_#D70000]'
                        : 'border-transparent hover:border-ink hover:bg-white hover:shadow-[2px_2px_0_0_#0C0C0C]'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block size-[10px] shrink-0 rounded-full"
                      style={{ backgroundColor: HEX[s], opacity: selected !== 'semua' && !aktif ? 0.3 : 1 }}
                    />
                    <span className="flex-1 truncate font-sans text-[13px] text-ink">{meta.label}</span>
                    <span className="font-sans text-[13px] tabular-nums text-graphite">
                      {v} ({pct}%)
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
