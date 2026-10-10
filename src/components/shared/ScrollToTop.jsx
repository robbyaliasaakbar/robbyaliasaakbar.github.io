import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/*
  ScrollToTop — replikasi perilaku website statis lama:
  pindah halaman = reload = selalu mulai dari atas.
  Tanpa ini, SPA bakal ninggalin posisi scroll halaman sebelumnya.
*/
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
