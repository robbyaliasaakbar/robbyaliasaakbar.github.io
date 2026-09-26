import { STATUS_LIST, STATUS_META } from '../data/status.js';

// StatusChart ringan tanpa dependency — mirip miniLeads (tap → filter).
// Ketat 3 warna + warna dot status. Bar horizontal biar label muat di HP.

export function StatusChart({ lamaran = [], selected = 'semua', onSelect }) {
  const total = lamaran.length;
  const hitung = (s) => lamaran.filter((x) => x.status === s).length;
  const values = STATUS_LIST.map(hitung);
  const max = Math.max(1, ...values);

  return (
    <section aria-label="Sebaran status lamaran" className="mx-auto max-w-5xl px-5 pt-6">
      <div className="rounded-[12px] border border-rule bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-lg font-bold tracking-tight">Sebaran status</h2>
          <p className="font-sans text-[13px] text-graphite">
            {total ? `${total} lamaran` : 'Belum ada data'}
          </p>
        </div>
        <p className="mt-1 font-sans text-[13px] text-graphite">
          Pilih batang untuk menyaring tabel. Pilih lagi untuk menampilkan semua.
        </p>

        <ul className="mt-4 space-y-2.5">
          {STATUS_LIST.map((s, i) => {
            const v = values[i];
            const meta = STATUS_META[s];
            const aktif = selected === s;
            const pudar = selected !== 'semua' && !aktif;
            const pctTotal = total ? Math.round((v / total) * 100) : 0;
            const lebar = Math.round((v / max) * 100);
            return (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => onSelect(s)}
                  aria-pressed={aktif}
                  aria-label={`${meta.label}, ${v} lamaran (${pctTotal} persen)`}
                  className={`group flex w-full items-center gap-3 rounded-[8px] border px-3 py-2 text-left motion-safe:transition-all ${
                    aktif
                      ? 'border-ink bg-white shadow-[3px_3px_0_0_#D70000]'
                      : 'border-transparent hover:border-ink hover:bg-white hover:shadow-[2px_2px_0_0_#0C0C0C]'
                  }`}
                >
                  <span className="w-28 shrink-0 truncate font-sans text-[13px] text-ink">
                    {meta.label}
                  </span>
                  <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink/[0.07]">
                    <span
                      aria-hidden="true"
                      className={`block h-full rounded-full ${meta.dot} motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out ${
                        pudar ? 'opacity-25' : 'opacity-100'
                      }`}
                      style={{ width: `${lebar}%` }}
                    />
                  </span>
                  <span className="w-20 shrink-0 text-right font-sans text-[13px] tabular-nums text-graphite">
                    {v} ({pctTotal}%)
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
