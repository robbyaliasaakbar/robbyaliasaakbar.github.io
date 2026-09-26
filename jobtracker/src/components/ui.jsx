// Primitif minimal tegas — ketat 3 warna (Paper/Ink/Signal) + opacity.
// Label Inter sentence case, isian boxed 8px, tombol hitam→merah.

export function Field({ label, wajib, children }) {
  return (
    <label className="block">
      <span className="block font-sans text-[13px] font-medium text-graphite mb-1.5">
        {label}
        {wajib ? ' *' : ''}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  'w-full bg-white border border-rule rounded-[8px] px-3.5 py-2.5 text-sm text-ink placeholder:text-faded focus:border-ink focus:ring-2 focus:ring-stamp/25 focus:outline-none transition-colors';

export function Input({ ...props }) {
  return <input className={inputClass} {...props} />;
}

export function Select({ children, ...props }) {
  return (
    <select className={`${inputClass} appearance-none cursor-pointer`} {...props}>
      {children}
    </select>
  );
}

export function PrimaryButton({ children, ...props }) {
  return (
    <button
      type="button"
      className="bg-ink text-white rounded-[8px] px-4 py-2.5 font-sans text-sm font-semibold transition-all duration-200 hover:bg-stamp hover:-translate-y-[1px] hover:shadow-[0_12px_24px_-10px_rgba(215,0,0,.5)] active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      {...props}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, ...props }) {
  return (
    <button
      type="button"
      className="border border-rule bg-white text-ink rounded-[8px] px-4 py-2.5 font-sans text-sm font-medium transition-all duration-200 hover:border-ink hover:bg-ink hover:text-white"
      {...props}
    >
      {children}
    </button>
  );
}

// DoubleRule dipertahankan untuk dashboard (jangan hapus).
// Login minimal tegas tidak memakainya — pakai single 1px Ink/10.
export function DoubleRule({ className = '' }) {
  return (
    <div className={`flex flex-col gap-[3px] ${className}`} aria-hidden="true">
      <div className="h-px bg-ink" />
      <div className="h-px bg-ink" />
    </div>
  );
}
