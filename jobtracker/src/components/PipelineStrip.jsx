import { STATUS_LIST, STATUS_META } from '../data/status.js';

// Deret pipeline minimal tegas: angka Manrope per tahap, klik = filter (sinkron chart).

export function PipelineStrip({ lamaran, selected = 'semua', onSelect }) {
  const hitung = (s) => lamaran.filter((x) => x.status === s).length;
  const klik = onSelect || (() => {});

  return (
    <div className="mx-auto max-w-5xl px-5 pt-7">
      <ol className="grid grid-cols-4 sm:grid-cols-7 gap-x-5 gap-y-5">
        {STATUS_LIST.map((s) => {
          const n = hitung(s);
          const meta = STATUS_META[s];
          const aktif = selected === s;
          return (
            <li key={s} className={`border-t pt-2 motion-safe:transition-all ${aktif ? 'border-stamp' : 'border-rule'}`}>
              <button
                type="button"
                onClick={() => klik(s)}
                aria-pressed={aktif}
                aria-label={`${meta.label}, ${n} lamaran`}
                className={`group block w-full rounded-[8px] px-1.5 py-1 text-left motion-safe:transition-all ${
                  aktif
                    ? 'bg-white shadow-[2px_2px_0_0_#D70000] outline outline-1 outline-ink'
                    : 'hover:bg-white hover:outline hover:outline-1 hover:outline-ink'
                }`}
              >
                <div className="flex items-baseline gap-1.5">
                  <span className={`font-display text-[28px] font-extrabold leading-none tabular-nums motion-safe:transition-transform motion-safe:group-hover:-translate-y-[1px] ${n ? 'text-ink' : 'text-faded'}`}>
                    {n}
                  </span>
                  {n > 0 && <span aria-hidden="true" className="inline-block size-[8px] rounded-full bg-stamp self-center" />}
                </div>
                <span className="mt-1.5 block font-sans text-[13px] leading-tight text-graphite">{meta.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
