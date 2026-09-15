// Logo.jsx — icon lockup. Pola JobTracker/miniLeads: box + batang chart + panah merah.
// Versi kotak putih karena navbar kita hitam (sama kayak miniLeads).
export default function Logo() {
  return (
    <svg className="w-8 h-8 shrink-0" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#FFFFFF" />
      <rect x="8" y="19" width="3.6" height="5" rx="1.2" fill="#0C0C0C" opacity="0.5" />
      <rect x="12.8" y="16" width="3.6" height="8" rx="1.2" fill="#0C0C0C" opacity="0.75" />
      <rect x="17.6" y="13" width="3.6" height="11" rx="1.2" fill="#0C0C0C" />
      <path d="M8 12.5 15 8.5l4 2.5 5-5" stroke="#D70000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.6 6H24v3.4" stroke="#D70000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
