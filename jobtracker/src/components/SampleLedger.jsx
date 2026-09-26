import { StatusBadge } from './StatusBadge.jsx';

// Kolom kanan login: panel arsip hitam (data REKAAN, bukan data asli).
// Ketat 3 warna: Ink + Paper + Signal. Putih opacity = turunan, bukan warna baru.

const CONTOH = [
  ['2026-09-22', 'Nusantara Digital', 'Frontend Engineer', 'interview-hr'],
  ['2026-09-19', 'Cakrawala Data', 'Backend Engineer', 'technical-test'],
  ['2026-09-15', 'Karya Logistik', 'Fullstack Developer', 'baru'],
  ['2026-09-11', 'Sentra Medika', 'Platform Engineer', 'ditolak'],
  ['2026-09-05', 'Bumi Energi', 'Node.js Developer', 'offering'],
];

export function SampleLedger() {
  return (
    <aside className="hidden lg:flex flex-col bg-ink text-white border-l border-ink px-10 py-12">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-[2px] w-8 bg-stamp" />
        <p className="font-sans text-[13px] font-medium text-white/65">
          Contoh, bukan data asli
        </p>
      </div>
      <div aria-hidden="true" className="mt-3 h-px bg-white/15" />
      <div className="mt-5 grid grid-cols-[5.5rem_1fr_8rem] gap-x-4 font-sans text-xs text-white/55">
        <span>tanggal</span>
        <span>perusahaan / posisi</span>
        <span>status</span>
      </div>
      <ul className="mt-2">
        {CONTOH.map(([tgl, pt, pos, st]) => (
          <li key={tgl} className="grid grid-cols-[5.5rem_1fr_8rem] gap-x-4 items-baseline border-b border-white/15 py-3">
            <span className="font-mono text-xs text-white/60 tabular-nums">{tgl}</span>
            <span>
              <span className="block font-display text-sm font-semibold leading-snug text-white">{pt}</span>
              <span className="block font-sans text-xs text-white/70 leading-snug">{pos}</span>
            </span>
            <StatusBadge status={st} tone="dark" />
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-10 flex justify-end">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 font-sans text-[13px] text-white/85">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-stamp" />
          Contoh, bukan data asli
        </span>
      </div>
    </aside>
  );
}
