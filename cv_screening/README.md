# Sandbox CV Screening — Lab Upgrade (React + Vite)

1 folder = 1 app lengkap. Kecuali auth `:7002` yang dipakai bareng-bareng (bukti exp011).

```
sandbox-cv-screening/
  Bahan/ docs/ lamding-page/  MUSEUM COPY dari Technical Test — JANGAN disentuh
  package.json  React 18 + Vite 6 (varian miniLeads, tanpa chart dulu)
  vite.config.js  base './' + port dari .env (VITE_FRONTEND_PORT=7008)
  index.template.html  TEMPLATE sumber kebenaran (jangan build dari hasil copy)
  index.html  entry dev (menunjuk /src/main.jsx)
  .env  1 file semua port (FRONTEND 7008, AUTH 7002, N8N 5678)
  src/
    main.jsx  entry React
    App.jsx  scaffold bukti nyala + peta 7 step n8n (realtime nyusul Stage 1)
    index.css  HEX paten + dark: eksplisit
    theme.js  Light/Dark key cv.theme (dipakai penuh Stage 2b)
    auth.js  pintu :7002 key cv.token (dipakai penuh Stage 2a)
    n8n.js  pintu webhook upload-cv (portal -> eksekusi)
  README.md  file ini
  what-failed-cv-screening.md  log gagal mentah (wajib evolusi buat exp013)
```

## Cara nyalain (scaffold)

```bash
npm install
npm run dev    # buka http://localhost:7008
npm run build  # bukti scaffold bisa build (43 modules, bukan 4)
```

Cek: `curl localhost:7008` harus 200 + ada `id="root"`.

## Aturan

- `Bahan/ docs/ lamding-page/` = museum copy. Upgrade di `src/`, bukan di situ.
- Auth `:7002` tetap di luar sandbox. Dipakai bareng JobTracker + miniLeads.
- `node_modules/ dist/ .env` tidak masuk git (lihat `.gitignore`).
- Tiap gagal → catat di `what-failed-cv-screening.md` + bukti, jangan dipoles.
