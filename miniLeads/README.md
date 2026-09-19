# CRM Leads Managements — Sandbox Mandiri

1 folder = 1 app lengkap. Kecuali auth `:7002` yang dipakai bareng-bareng.

```
sandbox-crm-react/
  .env              SATU file untuk semua nomor port (BACKEND, FRONTEND, AUTH)
  backend/          API data (Node + SQLite). Copy dari lab, lab asli utuh.
    server.js       endpoint: /health /leads /dashboard /ingest /dedupe /extract /export
    auth: token dicek ke :7002 tiap request (mati → 503 tolak semua)
    data milik user (user_email). Admin lihat semua. Intip/edit orang → 404.
    data/           leads_seed.csv + website_form_submissions.json (replica, approved)
    leads.db        DIBIKIN ULANG via npm run load (tidak dicopy, tidak di-git)
  src/              frontend React (App.jsx, api.js, auth.js, Auth.jsx, komponen)
    Settings.jsx    akun (readonly) + tema Light/Dark (tersimpan di browser)
    theme.js        baca/simpan/terapkan tema (class dark di <html>)
    Auth.jsx        layar login (username/email + OTP, pola JobTracker, admin only)
    chartTheme.js   1 rumus warna ranking (hijau→kuning→merah) buat semua chart
    StatusChart.jsx bar vertical (tap batang → filter tabel)
    StatusDonut.jsx donat (tap potongan/nama → filter tabel)
    StatusLine.jsx  garis (tap titik → filter tabel)
    Analytics tampil di semua layar (mobile susun vertikal, desktop berdampingan)
  dist/             hasil build → yang naik ke GitHub Pages (/crmLeadsManagements/)
```

## Cara nyalain (2 terminal)

Terminal 1 — backend:
```bash
npm install
npm run load    # CSV → leads.db (2049 rows), jalan sekali (atau tiap reset data)
npm start       # API di port VITE_BACKEND_PORT (lihat .env)
npm test        # 6 test, wajib hijau
```

Terminal 2 — frontend:
```bash
npm install
npm run dev     # port VITE_FRONTEND_PORT (lihat .env)
```

Cek: `curl localhost:7005/health` harus `{"ok":true}` (sesuaikan kalau port diganti).

## Aturan

- Auth (`:7002`, PHP) tetap di luar sandbox. Dipakai bareng Job Tracker.
- `lab/` jangan disentuh — itu museum submit.
- `leads.db` + `node_modules/` tidak masuk git (lihat `backend/.gitignore`).
