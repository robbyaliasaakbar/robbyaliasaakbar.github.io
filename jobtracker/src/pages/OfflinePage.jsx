import { useStore } from '../store/AppStore.jsx';

// Layar "server sedang tidur" — PC lagi mati / di luar jam 08.00-21.00 WIB.
// Sesinya TIDAK dibuang (PRD §8: designed for scheduled availability).
export function OfflinePage() {
  const { state, cobaLagi, keluar } = useStore();

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6 py-16">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-[2px] w-8 bg-stamp" />
          <span className="font-sans text-[13px] font-medium text-graphite">Jobtracker</span>
        </div>
        <div className="relative mt-4">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-[12px] border-2 border-stamp/90"
          />
          <div className="relative rounded-[12px] border border-rule bg-white p-6 sm:p-7">
            <h1 className="font-display text-[26px] font-bold leading-[1.2] tracking-tight">Server sedang tidur.</h1>
            <p className="mt-3 font-sans text-[13px] text-graphite leading-relaxed">
              Backend biasanya bangun 08.00–21.00 WIB. Sesimu tidak kemana-mana — coba lagi setelah server
              nyala, atau keluar lalu masuk lagi nanti.
            </p>
            {state.offlineMessage && (
              <p className="mt-4 font-sans text-xs text-faded">{state.offlineMessage}</p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={cobaLagi}
                className="rounded-[8px] bg-ink text-white px-4 py-2.5 min-h-[44px] font-sans text-sm font-semibold transition-all duration-200 hover:bg-stamp hover:-translate-y-[1px] hover:shadow-[0_12px_24px_-10px_rgba(215,0,0,.5)] active:translate-y-0"
              >
                coba lagi
              </button>
              <button
                type="button"
                onClick={keluar}
                className="rounded-[8px] border border-rule bg-white px-4 py-2.5 min-h-[44px] font-sans text-sm font-medium transition-all duration-200 hover:border-ink hover:bg-ink hover:text-white"
              >
                keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
