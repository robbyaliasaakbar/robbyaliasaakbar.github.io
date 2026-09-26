import { statusMeta } from '../data/status.js';

// tone="dark" khusus panel hitam (SampleLedger). Dashboard terang pakai default.
// Ketat 3 warna: di panel hitam dot abu gelap diganti putih opacity, warna solid lain tetap.

const DARK_DOT = {
  'bg-graphite': 'bg-white/70',
  'bg-faded': 'bg-white/40',
  'bg-moss': 'bg-[#4ADE80]',
};

export function StatusBadge({ status, tone }) {
  const meta = statusMeta(status);
  const dot = tone === 'dark' && DARK_DOT[meta.dot] ? DARK_DOT[meta.dot] : meta.dot;
  return (
    <span className={`inline-flex items-center gap-2 font-sans text-[13px] whitespace-nowrap ${tone === 'dark' ? 'text-white/85' : ''}`}>
      <span aria-hidden="true" className={`inline-block size-[8px] rounded-full ring-1 ring-white/20 ${dot}`} />
      {meta.label}
    </span>
  );
}
