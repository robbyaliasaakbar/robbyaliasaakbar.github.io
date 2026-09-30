// Primitif minimal tegas — ketat 3 warna (Paper/Ink/Signal) + opacity.
// Label Inter sentence case, isian boxed 8px, tombol hitam→merah.

import { useState } from 'react';

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

function IkonMata({ terbuka }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
    >
      {terbuka ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      )}
    </svg>
  );
}

// Input password dengan tombol tampilkan/sembunyikan. State per-field,
// jadi tiap kolom password punya tombolnya sendiri.
export function PasswordInput({ ...props }) {
  const [terbuka, setTerbuka] = useState(false);
  return (
    <div className="relative">
      <input type={terbuka ? 'text' : 'password'} className={`${inputClass} pr-11`} {...props} />
      <button
        type="button"
        onClick={() => setTerbuka((s) => !s)}
        aria-label={terbuka ? 'sembunyikan password' : 'tampilkan password'}
        aria-pressed={terbuka}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-[6px] p-2 text-faded transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stamp/40"
      >
        <IkonMata terbuka={terbuka} />
      </button>
    </div>
  );
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
