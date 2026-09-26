import { STATUS_LIST, STATUS_META } from '../data/status.js';
import { Select } from './ui.jsx';

// Pencarian, filter status, urut, dan tombol tambah — minimal tegas.
export function Toolbar({ q, onQ, status, onStatus, urut, onUrut, onTambah }) {
  return (
    <div className="mx-auto max-w-5xl px-5 pt-8 pb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
      <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
        <label className="block">
          <span className="block font-sans text-[13px] font-medium text-graphite mb-1.5">cari</span>
          <input
            type="search"
            value={q}
            onChange={(e) => onQ(e.target.value)}
            placeholder="perusahaan atau posisi"
            className="w-44 sm:w-56 bg-white border border-rule rounded-[8px] px-3.5 py-2.5 text-sm text-ink placeholder:text-faded focus:border-ink focus:ring-2 focus:ring-stamp/25 focus:outline-none transition-colors"
          />
        </label>

        <label className="block">
          <span className="block font-sans text-[13px] font-medium text-graphite mb-1.5">status</span>
          <Select value={status} onChange={(e) => onStatus(e.target.value)} className="py-1.5 text-sm w-40">
            <option value="semua">semua status</option>
            {STATUS_LIST.map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </Select>
        </label>

        <button
          type="button"
          onClick={onUrut}
          className="font-sans text-[13px] underline underline-offset-4 mb-2.5 transition-colors hover:text-stamp"
        >
          urut: {urut === 'desc' ? 'terbaru' : 'terlama'}
        </button>
      </div>

      <button
        type="button"
        onClick={onTambah}
        className="rounded-[8px] bg-ink text-white px-4 py-2.5 min-h-[44px] font-sans text-sm font-semibold transition-all duration-200 hover:bg-stamp hover:-translate-y-[1px] hover:shadow-[0_12px_24px_-10px_rgba(215,0,0,.5)] active:translate-y-0"
      >
        + tambah lamaran
      </button>
    </div>
  );
}
