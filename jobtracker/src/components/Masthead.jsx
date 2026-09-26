const tanggalHariIni = () =>
  new Date().toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export function Masthead({ email, onLogout }) {
  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
        <div className="flex min-w-0 items-baseline gap-3">
          <span className="font-display text-xl font-extrabold tracking-tight">Jobtracker</span>
          <span className="hidden shrink-0 font-sans text-[13px] tabular-nums text-graphite sm:block">{tanggalHariIni()}</span>
        </div>
        <div className="flex min-w-0 items-center gap-4 font-sans text-[13px]">
          <span className="truncate text-graphite max-w-[38vw] sm:max-w-xs">{email}</span>
          <button type="button" onClick={onLogout} className="shrink-0 underline underline-offset-4 transition-colors hover:text-stamp">
            keluar
          </button>
        </div>
      </div>
    </header>
  );
}
