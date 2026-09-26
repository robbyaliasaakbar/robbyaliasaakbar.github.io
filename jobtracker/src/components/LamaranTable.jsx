import { StatusBadge } from './StatusBadge.jsx';

function Portal({ row }) {
  const label = row.portal || (row.link ? 'tautan' : '');
  if (!label) return <span className="text-faded">—</span>;
  if (!row.link) return <span className="font-sans text-[13px] text-graphite">{label}</span>;
  return (
    <a
      href={row.link}
      target="_blank"
      rel="noreferrer noopener"
      className="font-sans text-[13px] underline underline-offset-4 transition-colors hover:text-stamp"
    >
      {label}
    </a>
  );
}

function Aksi({ row, onEdit, onDelete }) {
  return (
    <div className="flex items-baseline justify-end gap-3 font-sans text-[13px]">
      <button
        type="button"
        onClick={() => onEdit(row)}
        className="underline underline-offset-4 transition-colors hover:text-stamp"
      >
        ubah
      </button>
      <button
        type="button"
        onClick={() => onDelete(row)}
        className="underline underline-offset-4 text-stamp transition-opacity hover:opacity-70"
      >
        hapus
      </button>
    </div>
  );
}

export function EmptyState({ tersaring, onTambah }) {
  if (tersaring) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-14">
        <p className="font-display text-[22px] font-bold tracking-tight">Tidak ada yang cocok.</p>
        <p className="mt-2 font-sans text-[13px] text-graphite">
          Ubah kata kunci atau pilih status yang lain.
        </p>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <p className="font-display text-[22px] font-bold tracking-tight">Buku besar masih kosong.</p>
      <p className="mt-2 font-sans text-[13px] text-graphite leading-relaxed max-w-md">
        Catat lamaran pertamamu: perusahaan, posisi, tanggal, status. Semua baris hanya terlihat olehmu.
      </p>
      <button
        type="button"
        onClick={onTambah}
        className="mt-6 rounded-[8px] bg-ink text-white px-4 py-2.5 min-h-[44px] font-sans text-sm font-semibold transition-all duration-200 hover:bg-stamp hover:-translate-y-[1px] hover:shadow-[0_12px_24px_-10px_rgba(215,0,0,.5)] active:translate-y-0"
      >
        + tambah lamaran
      </button>
    </div>
  );
}

// Arsip: tabel tegas di desktop, tumpukan baris di layar kecil.
export function LamaranTable({ rows, onEdit, onDelete }) {
  if (!rows.length) return null;

  return (
    <div className="mx-auto max-w-5xl px-5 pb-20">
      {/* desktop */}
      <table className="hidden md:table w-full border-collapse">
        <thead>
          <tr className="border-b border-ink text-left font-sans text-xs font-medium text-graphite">
            <th className="py-2.5 pr-4 font-medium">tanggal</th>
            <th className="py-2.5 pr-4 font-medium">perusahaan</th>
            <th className="py-2.5 pr-4 font-medium">posisi</th>
            <th className="py-2.5 pr-4 font-medium">portal</th>
            <th className="py-2.5 pr-4 font-medium">status</th>
            <th className="py-2.5 font-medium text-right">aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-rule align-top transition-all hover:bg-white hover:border-ink hover:shadow-[inset_3px_0_0_0_#D70000]">
              <td className="py-3 pr-4 font-sans text-[13px] text-graphite whitespace-nowrap tabular-nums">
                {row.date || '—'}
              </td>
              <td className="py-3 pr-4 font-display text-sm font-semibold">{row.company}</td>
              <td className="py-3 pr-4 font-sans text-[13px] text-ink/75">{row.position}</td>
              <td className="py-3 pr-4">
                <Portal row={row} />
              </td>
              <td className="py-3 pr-4">
                <StatusBadge status={row.status} />
              </td>
              <td className="py-3">
                <Aksi row={row} onEdit={onEdit} onDelete={onDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* mobile */}
      <ul className="md:hidden">
        {rows.map((row) => (
          <li key={row.id} className="border-b border-rule py-4 px-1 transition-all hover:bg-white hover:border-ink hover:shadow-[inset_3px_0_0_0_#D70000]">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-sans text-[13px] text-graphite tabular-nums">{row.date || '—'}</span>
              <StatusBadge status={row.status} />
            </div>
            <p className="mt-1.5 font-display text-sm font-semibold leading-snug">{row.company}</p>
            <p className="font-sans text-[13px] text-ink/75 leading-snug">{row.position}</p>
            {(row.portal || row.link) && (
              <p className="mt-1">
                <Portal row={row} />
              </p>
            )}
            <div className="mt-3">
              <Aksi row={row} onEdit={onEdit} onDelete={onDelete} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
