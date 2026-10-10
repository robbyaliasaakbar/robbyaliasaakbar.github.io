import { useEffect, useState } from 'react'

/*
  Splash — preloader homepage (revisi user "splash screen → hero masuk").
  Alur:
  0ms     splash tampil, nama + dot fade-in
  1000ms  curtain mulai naik (is-out) + onDone() dipanggil
          → Home set ready → useScrollReveal mulai observe
          → hero reveal jalan DI BAWAH curtain yang lagi buka (seamless)
  1750ms  splash unmount (udah di luar layar)
  Reduced-motion: splash gak tampil sama sekali, onDone langsung.
*/
export default function Splash({ onDone }) {
  const [out, setOut] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone()
      setGone(true)
      return
    }

    const t1 = setTimeout(() => setOut(true), 1000)
    const t2 = setTimeout(() => {
      // Curtain HABIS → layar bersih → baru hero reveal mulai,
      // biar animasinya keliatan penuh (bukan keburu di balik curtain)
      setGone(true)
      onDone()
    }, 1750)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (gone) return null

  return (
    <div className={`splash${out ? ' is-out' : ''}`} aria-hidden="true">
      <div className="splash-inner">
        <span className="splash-dot" />
        <span className="splash-name">ROBBY ALIASA AKBAR</span>
      </div>
    </div>
  )
}
