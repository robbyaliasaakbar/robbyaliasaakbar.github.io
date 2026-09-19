import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Base './' biar hasil build bisa ditaro di subfolder apapun
// (misal /cvScreening/ di GitHub Pages) tanpa ganti config.
// Port dev dibaca dari .env (VITE_FRONTEND_PORT). Ganti angka di .env, restart.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    base: './',
    server: { port: Number(env.VITE_FRONTEND_PORT) || 5173 },
  };
});
