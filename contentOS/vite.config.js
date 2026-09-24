import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// base './' biar /contentOS/ di Pages jalan tanpa ganti config.
// Port dev dari .env VITE_FRONTEND_PORT (FIX 7011).
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    base: './',
    server: { port: Number(env.VITE_FRONTEND_PORT) || 7011 },
    preview: { port: Number(env.VITE_FRONTEND_PORT) || 7011 },
  };
});
