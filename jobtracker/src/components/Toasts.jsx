// Notifikasi kartu bawah layar. Klik untuk menutup, auto-hilang juga.

export function Toasts({ toasts, onPop }) {
  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] flex w-full max-w-md flex-col items-center gap-2 px-5"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onPop(t.id)}
          className={`w-auto max-w-full rounded-[10px] border px-4 py-2.5 font-sans text-[13px] font-medium text-white motion-safe:transition-all motion-safe:hover:-translate-y-[1px] ${
            t.kind === 'error'
              ? 'border-stamp bg-stamp shadow-[3px_3px_0_0_rgba(215,0,0,0.3)] hover:shadow-[4px_4px_0_0_rgba(215,0,0,0.35)]'
              : 'border-ink bg-ink shadow-[3px_3px_0_0_rgba(12,12,12,0.25)] hover:shadow-[4px_4px_0_0_rgba(12,12,12,0.3)]'
          }`}
        >
          {t.text}
        </button>
      ))}
    </div>
  );
}
