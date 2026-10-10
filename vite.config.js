import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Multi-page: 21 file HTML entries di folder entries/
// → SEO per halaman, crawler baca HTML asli bukan hasil render JS
// Build output: dist/ → copy ke root untuk GitHub Pages
const expEntries = {}
for (let i = 1; i <= 17; i++) {
  const num = String(i).padStart(3, '0')
  expEntries[`exp${num}`] = resolve(__dirname, `entries/exp${num}.html`)
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'entries/index.html'),
        profile: resolve(__dirname, 'entries/profile.html'),
        experimentsList: resolve(__dirname, 'entries/experiments-list.html'),
        contact: resolve(__dirname, 'entries/contact.html'),
        ...expEntries,
      },
    },
  },
})
