import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

/*
  ZoomImage — screenshot yang bisa diklik → lightbox + zoom in/out.
  Reusable buat semua halaman exp detail.
  - Klik gambar → modal full screen
  - Zoom: tombol + / − (step 25%, min 50% max 400%), Reset, keyboard +/- 
  - Zoom in → gambar gede → kontainer scroll (mouse/touch) buat lihat area lain
  - Esc / tombol ✕ buat tutup; scroll background dikunci pas modal buka
  - Tanpa dependency — CSS transform/width + state React doang
*/

const MIN = 0.5
const MAX = 4
const STEP = 0.25

export default function ZoomImage({ src, alt, width, height, imgClass = '' }) {
  const [open, setOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const openBtnRef = useRef(null)

  const clamp = (v) => Math.min(MAX, Math.max(MIN, v))
  const zoomIn = () => setScale((s) => clamp(s + STEP))
  const zoomOut = () => setScale((s) => clamp(s - STEP))
  const close = () => {
    setOpen(false)
    setScale(1)
    // balikin fokus ke pemicu (a11y)
    openBtnRef.current?.focus()
  }

  // Keyboard: Esc tutup, +/= zoom in, - zoom out — hanya saat modal terbuka
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === '+' || e.key === '=') zoomIn()
      else if (e.key === '-') zoomOut()
    }
    window.addEventListener('keydown', onKey)
    // kunci scroll halaman di belakang modal
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      {/* Trigger — tampilan persis frame asli + hint "Click to zoom" */}
      <button
        ref={openBtnRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Zoom screenshot: ${alt}`}
        className="group relative block w-full text-left cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-2xl"
      >
        <div className="border border-black/10 rounded-2xl overflow-hidden bg-paper shadow-sm">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            width={width}
            height={height}
            className={`w-full h-auto transition-transform duration-300 group-hover:scale-[1.015] ${imgClass}`}
          />
        </div>
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-ink/80 text-white text-[0.65rem] font-display font-bold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span aria-hidden="true">⊕</span> Click to zoom
        </span>
      </button>

      {/* Modal lightbox + kontrol zoom — di-PORTAL ke document.body.
          Parent [data-reveal] punya transform + will-change → bikin
          position:fixed jadi relatif ke parent (bukan viewport) → modal
          nempel area gambar. Portal ngeluarin modal dari parent itu. */}
      {open && createPortal(
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={`Zoom view: ${alt}`}
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-white/10 shrink-0">
            <span className="font-display font-bold text-[0.65rem] uppercase tracking-[0.16em] text-white/50">
              Zoom · {Math.round(scale * 100)}%
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={zoomOut}
                disabled={scale <= MIN}
                aria-label="Zoom out"
                className="w-9 h-9 rounded-full border border-white/20 text-white text-lg leading-none flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                &minus;
              </button>
              <button
                type="button"
                onClick={zoomIn}
                disabled={scale >= MAX}
                aria-label="Zoom in"
                className="w-9 h-9 rounded-full border border-white/20 text-white text-lg leading-none flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setScale(1)}
                className="px-4 h-9 rounded-full border border-white/20 font-display font-bold text-[0.65rem] uppercase tracking-[0.14em] text-white hover:bg-white/10 transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Close zoom"
                className="w-9 h-9 rounded-full bg-accent text-white text-base leading-none flex items-center justify-center hover:brightness-110 transition-all ml-1"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Kanvas — scroll saat zoom in.
              min-h-0 WAJIB: flex item default min-height:auto → container
              ikut memanjang melebihi viewport → scrollbar gak muncul.
              overscroll-contain: scroll gak "nembus" ke belakang. */}
          <div className="flex-1 min-h-0 overflow-auto overscroll-contain p-4 sm:p-8">
            <img
              src={src}
              alt={alt}
              style={{ width: `${scale * 100}%` }}
              /* max-w-none WAJIB: preflight Tailwind `img { max-width: 100% }`
                 nguimpet gambar biar gak lebih lebar dari kontainer → zoom in mati. */
              className="mx-auto h-auto select-none max-w-none"
              draggable={false}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
