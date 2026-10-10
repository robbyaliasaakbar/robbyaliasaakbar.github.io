import { useState, useEffect } from 'react'
import ZoomImage from './ZoomImage.jsx'

/*
  ScreenshotCarousel — galeri screenshot jadi carousel autoplay.
  Dipakai: exp004, exp005 (revisi Rob 10 Okt 2026 — "biar ga makan space").
  - Auto-slide tiap 4.5 dtk, transisi translateX smooth
  - Pause saat kursor hover (biar bisa baca + klik zoom tenang)
  - Dots navigasi (klik buat pindah manual)
  - Gambar crop 16/10 object-top (tinggi seragam) via prop imgClass ZoomImage
  - Tiap slide tetap ZoomImage: klik → lightbox zoom (fitur LOCK utuh)

  items: [{ n, title, tag, src, alt, w, h, caption }]
*/
export default function ScreenshotCarousel({ items }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 4500)
    return () => clearInterval(id)
  }, [paused, items.length])

  const item = items[index]

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Judul + tag slide aktif */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <h3 className="font-display font-bold text-base sm:text-lg">{item.n} {item.title}</h3>
        <span className="text-xs font-mono text-neutral-400">{item.tag}</span>
      </div>

      {/* Track carousel */}
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((g) => (
            <div key={g.n} className="w-full shrink-0">
              <ZoomImage
                src={g.src}
                alt={g.alt}
                width={g.w}
                height={g.h}
                imgClass="aspect-[16/10] object-cover object-top"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Caption + dots */}
      <p className="mt-3 text-xs font-display font-bold tracking-[0.14em] uppercase text-neutral-500 text-center">
        {item.caption}
      </p>
      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((g, i) => (
          <button
            key={g.n}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show screenshot ${g.n}`}
            aria-current={i === index}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === index ? 'bg-ink' : 'bg-neutral-300 hover:bg-neutral-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
