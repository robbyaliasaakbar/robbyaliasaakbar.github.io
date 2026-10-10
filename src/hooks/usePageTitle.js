import { useEffect } from 'react'

/*
  usePageTitle — update document.title pas navigasi SPA (Link, tanpa reload).
  Fresh load / crawler tetep ambil <title> dari file HTML masing-masing;
  hook ini cuma biar tab browser gak salah judul waktu pindah halaman.
*/
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}
