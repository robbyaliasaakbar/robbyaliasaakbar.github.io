import { useEffect } from 'react'

/*
  useScrollReveal — port logic data-reveal dari js/main.js ke React.
  Dipanggil di halaman yang punya elemen [data-reveal].
  - Elemen masuk viewport → tambah class .revealed (dengan stagger delay)
  - Threshold/rootMargin/cap delay 600ms — sama persis versi vanilla
  - active=false → gak observe dulu (Home: nunggu Splash curtain buka,
    biar hero reveal mulai tepat waktu — default true, backward compatible)
*/
export default function useScrollReveal(active = true) {
  useEffect(() => {
    if (!active) return
    const revealEls = document.querySelectorAll('[data-reveal]')

    if (!('IntersectionObserver' in window) || revealEls.length === 0) {
      revealEls.forEach((el) => el.classList.add('revealed'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          io.unobserve(el)

          // Jangan pakai inline transition-delay yang nempel ke hover
          if (el.style.transitionDelay) {
            el.style.transitionDelay = ''
          }

          let delay = parseInt(el.getAttribute('data-reveal'), 10)
          if (isNaN(delay) || delay < 0) delay = 0
          if (delay > 2400) delay = 2400 // cap — hero entrance butuh urutan panjang

          setTimeout(() => el.classList.add('revealed'), delay)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    revealEls.forEach((el) => io.observe(el))

    return () => io.disconnect()
  }, [active])
}
