# Redesign UI Login Jobtracker — Minimal Tegas (selaras website utama)

> Dibuat: 2026-09-27 oleh Udin untuk bang rob
> Scope batch ini: **halaman login dulu** (AuthPage + AuthFields + SampleLedger + ui.jsx + token + font/meta).
> Dashboard (Masthead, PipelineStrip, Toolbar, Tabel, Form, Toast) = batch berikutnya, TIDAK dikerjakan di batch ini.
> Source aktif: `public_html/jobtracker/` (repo `robbyaliasaakbar.github.io/jobtracker/`).
> Referensi wajib: `jobtracker/edit-ui-notes.md` (§1-§10). Plan ini ganti arah total TAPI tetap lewat token (§1, §3).

## 1. Tujuan & character

- Tujuan: biar sesuai kepribadian + character bang rob.
- Vibe dikunci: **minimal tegas** — bersih, rapi, tegas, percaya diri, gampang dilirik HR.
- Selaras website utama (`public_html/css/style.css`):
  - `--ink: #0C0C0C`, `--paper: #FFFFFF`, `--accent: #D70000`
  - Display: Manrope, Body: Inter
  - Pola: eyebrow + garis aksen, underline animasi nav, tombol primary hitam → merah saat hover, kartu hover naik 3-4px + shadow tipis.
- Bukan buku besar kertas lagi. Kertas `#f6f2e9` + Fraunces + Plex + radius 2px + DoubleRule = diganti total di batch login ini.

## 2. Prinsip baru (pengganti buku besar, khusus login)

1. **Putih dominan, hitam tegas, merah hemat.** Merah `#D70000` hanya untuk: eyebrow, fokus, error, hover tombol utama, 1 aksen panel kanan. Jangan jadi background besar.
2. **Garis tipis, bukan kartu bertumpuk.** Border `ink/10`, pemisah `ink/08`. Shadow hanya saat hover, tipis.
3. **Huruf punya peran:** Manrope = judul/display + label tegas, Inter = teks UI/form, JetBrains Mono / tabular = data (tanggal, kode OTP, catatan jam).
4. **Sentence case tetap.** Tidak ada ALL-CAPS kecuali eyebrow kecil ala website utama (tracking lebar).
5. **Sudut tegas tapi modern:** radius 10px untuk input/tombol/kartu, pill 9999px hanya untuk badge kecil. Tidak lagi 2px cetakan.

> Semua di atas diwujudkan LEWAT TOKEN dulu, bukan tambal per komponen.

## 3. Mapping token lama → baru

File: `src/styles/design-token.css` (`@theme` Tailwind v4). Ganti hex di sini, semua halaman ikut.

| Token | Lama (buku besar) | Baru — LOCK ketat 3 warna + opacity | Dipakai di login |
|---|---|---|---|
| `--color-paper` | `#f6f2e9` kertas | `#FFFFFF` putih | bg halaman kiri |
| `--color-paper-raised` | `#fcfaf5` | `rgba(12,12,12,.04)` di atas putih (bukan warna baru) | bg input tipis |
| `--color-ink` | `#16181c` tinta | `#0C0C0C` hitam utama | teks, tombol, panel kanan |
| `--color-rule` | `#e2dbca` garis krem | `rgba(12,12,12,.12)` — Ink 12%, dekorasi saja | border input, divider |
| `--color-stamp` | `#c2412d` vermilion | `#D70000` merah website, hemat | hover, fokus, error, bingkai offset |
| `--color-graphite` | `#63655e` | `rgba(12,12,12,.65)` — Ink 65%, lolos AA | teks sekunder |
| `--color-faded` | `#8a8c84` | `rgba(12,12,12,.45)` — Ink 45%, placeholder saja | placeholder, catatan jam |
| status `ochre/steel/plum/moss/faded` | palet buku | **TETAP dulu, jangan hapus.** Sukses/error login TIDAK pakai moss: sukses = Ink + ikon centang + bg Ink 6%, error = Stamp + ikon. | `StatusBadge` contoh |
| `--font-display` | Fraunces serif | `Manrope, Inter, sans-serif` | judul Jobtracker + h1 |
| `--font-sans` | IBM Plex Sans | `Inter, system-ui, sans-serif` | body, input, tombol |
| `--font-mono` | IBM Plex Mono | `JetBrains Mono, Inter, monospace` (angka tabular) | tanggal, kode, catatan |
| `--radius-sharp` | `2px` | `10px` (nama tetap `--radius-sharp` biar tidak pecah class lama, isi diganti) | input, tombol, kartu |

Aturan:
- Nambah warna baru wajib daftar di sini dulu, pakai literal `bg-<nama>` (Tailwind v4 tidak baca `bg-${var}`).
- `src/styles/index.css` hanya sesuaikan `::selection` (merah `#D70000` teks putih) + `:focus-visible` (outline 2px `#D70000` offset 2px). Blok fokus & `prefers-reduced-motion` JANGAN dihapus.

## 4. Perubahan per file (login only)

### 4.1 `src/components/ui.jsx` (primitif — kerjakan pertama setelah token)
- `Field`: label Manrope 700, 0.72rem, tracking `.12em` uppercase? TIDAK — tetap sentence case sesuai notes §1, tapi bobot 600 + warna `ink/65`. Contoh: `email *`.
- `inputClass` lama: `bg-transparent border-b border-rule py-2` (underline).
  Baru: `w-full bg-paper-raised md:bg-white border border-rule rounded-[10px] px-3.5 py-2.5 text-sm placeholder:text-faded focus:border-ink focus:ring-2 focus:ring-stamp/25 focus:outline-none transition`.
- `PrimaryButton`: lama `bg-ink text-paper hover:bg-stamp`.
  Baru: `bg-ink text-white rounded-[10px] hover:bg-stamp hover:-translate-y-[1px] hover:shadow-[0_12px_24px_-10px_rgba(215,0,0,.5)]` + `disabled:opacity-50`. Transisi 200ms. Ini samakan `.btn-primary` website utama.
- `GhostButton`: `border-rule hover:border-ink hover:bg-ink hover:text-white rounded-[10px]`.
- `DoubleRule`: JANGAN hapus komponen (dipakai dashboard), tapi di AuthPage login TIDAK dipakai lagi — diganti eyebrow + single rule (lihat 4.2).

### 4.2 `src/pages/AuthPage.jsx` (layout kiri)
- Struktur grid tetap: `min-h-screen lg:grid lg:grid-cols-2` (breakpoint `lg` wajib).
- Kiri (`main`):
  - Atas: eyebrow ala website: garis 2rem + teks `Jobtracker — minimal tegas` (Manrope 700, 0.72rem, tracking `.22em`, warna stamp). Di bawahnya wordmark `Jobtracker` Manrope 700 30px + sub mono `masuk untuk lanjut`.
  - Hapus `DoubleRule` di login, ganti `<div class="h-px bg-ink/10">`.
  - `h1`: Manrope 700, `text-[1.9rem] leading-[1.15] tracking-tight`, warna ink.
  - `sub`: Inter 13px, warna graphite, bukan mono kecil lagi (mono hanya untuk kode/catatan).
  - Form `space-y-4` tetap. Tombol submit pakai gaya PrimaryButton baru (full width).
  - `SWITCH` link: Inter 13px underline-offset 4px, hover merah, bukan mono.
  - `KotakPesan`: LOCK 3 warna — error `border-l-2 border-stamp bg-stamp/08 text-ink`, sukses `border-ink bg-ink/06 text-ink` (tanpa moss), radius 8px, padding 12px. `role=alert/status` tetap.
  - Catatan jam: Inter 12px faded: `Server bangun sekitar 08.00–21.00 WIB. Di luar jam itu login belum bisa — datanya tetap aman.` Teks TIDAK diubah (hindari pecah ekspektasi user).
- Kanan: `<SampleLedger/>` baru (lihat 4.4).

### 4.3 `src/components/AuthFields.jsx` (tidak ubah logika, hanya class via ui.jsx)
- Mode tetap 5: login / daftar / otp / lupa / reset. Validasi `required`, `minLength 8`, `autoComplete`, `inputMode numeric` tetap.
- Placeholder tetap: `nama@contoh.id`, `123456`.
- Label tetap sentence case: `email`, `password`, `nama`, `telepon`, `ulangi password`, `kode dari email`, `password baru`, `email terdaftar`.
- Tidak nambah field baru di batch ini.

### 4.4 `src/components/SampleLedger.jsx` (kolom kanan)
- Konsep tetap: **data REKAAN, bukan data asli**. Array `CONTOH` tidak diubah.
- Gaya baru: panel hitam tegas ala `.bg-dark-section` website:
  - `aside hidden lg:flex bg-ink text-white border-l border-ink px-10 py-12`
  - Header: eyebrow putih/merah `contoh — data rekaan` + single rule `bg-white/12`.
  - Head kolom: mono 11px `text-white/55`.
  - Baris: `border-b border-white/12 py-3`, tanggal mono tabular `text-white/60`, perusahaan Manrope 600 14px putih, posisi Inter 12px `white/70`.
  - `StatusBadge` tetap pakai warna status lama (belum diganti di batch ini).
  - Stempel bawah: ganti vermilion miring jadi badge tegas: `Manrope 700 12px tracking .16em uppercase border border-white/25 rounded-full px-4 py-1.5` teks `contoh • bukan data asli` + dot merah pulse ala `.status-dot`. Tidak lagi `-rotate-6 border-2 stamp`.
- Mobile: tetap `hidden` di bawah `lg` (satu kolom form). Tidak bikin carousel baru.

### 4.5 `index.html` + font/meta (judul tab, SEO)
- Title tetap mengandung `Jobtracker`, meta description tetap (jangan pecah test implisit + SEO).
- Ganti Google Fonts: hapus Fraunces + Plex, pasang `Manrope:600,700,800` + `Inter:400,500,600` + `JetBrains Mono:400,500` (tabular).
- `theme-color` → `#FFFFFF` (kiri) / `#0C0C0C` (kanan gelap tetap terbaca). Pilih `#0C0C0C` biar address bar tegas di mobile.
- Pastikan `base './'` tidak diubah, `src` build tetap `./assets/...`.

### 4.6 `src/styles/index.css`
- `body`: `bg paper (#FFF)`, `color ink (#0C0C0C)`, `font-family var(--font-sans)`.
- `::selection`: `bg #D70000`, `color #FFF` (samakan website).
- `:focus-visible`: outline 2px `#D70000` offset 2px — tetap.
- `prefers-reduced-motion`: tetap blok penuh.

## 5. Copywriting — TIDAK diubah (kunci test)

`src/pages/smoke.test.jsx` assert teks ini. Ganti = CI merah:
- `Jobtracker`, `Masuk`, `Server sedang tidur`, `Baru`, `Diterima`, `Interview HR`
- `Buku besar masih kosong` — catatan: teks empty state ini milik tabel/dashboard, BUKAN login. Di login kita boleh hilangkan frasa `buku besar lamaran` dari subjudul visual, TAPI kata `Jobtracker` + `Masuk` wajib ada di DOM (header + h1/tombol).
- `Tambah lamaran`, `Ubah lamaran`, `simpan lamaran`, `hapus lamaran`, `ubah`, `hapus` — tidak tersentuh di batch login.
- `PT Maju`, `https://contoh.id` = data uji internal, jangan diutak-atik.
- `config.test.js` fallback `http://localhost:7002` / `:7012` jangan diubah.

Solusi aman: subjudul login baru tetap sisakan kata `Masuk` di h1 mode login (`JUDUL.login[0]='Masuk'` tetap). Eyebrow boleh `Jobtracker` (pertahankan kata itu persis).

## 6. Aksesibilitas & responsive (baseline wajib hidup)

- Fokus keyboard kelihatan di semua input/tombol/link (jangan `outline-none` tanpa pengganti).
- Kontras: teks sekunder `#525252` di atas putih lolos AA. Placeholder `ink/45` hanya untuk hint, bukan info penting.
- Reduced motion dihormati (matikan translate/shadow/pulse).
- Breakpoint: `md` (form 2 kolom nama/telepon) dan `lg` (2 kolom login ↔ 1 kolom). HP 360px: form full width, tombol 48px tinggi sentuh, tidak ada scroll horizontal.
- Tidak ada data asli di SampleLedger.

## 7. Alur kerja & verifikasi (wajib sebelum push)

```bash
cd "/home/obi/Documents/dir_openwebui/Project website/Website Baru/public_html/jobtracker"
npm run dev     # http://localhost:7013 — cek login 5 mode + mobile 360px + desktop 1280px
npm run lint    # harus 0 error 0 warning
npm test        # harus hijau 21 test
npm run build   # WAJIB sebelum push — bikin dist/
cp dist/index.html index.html
rm -rf assets && cp -r dist/assets assets
grep -o 'src="[^"]*"' index.html        # harus "./assets/..."
grep -c 'localhost:7002' assets/*.js    # harus 0
```

Ranjau (dari edit-ui-notes §7): `index.html` dual-role, `base:'./'`, `.env` vs `.env.production`, dev jangan nembak funnel, class Tailwind literal, jangan colok service FROZEN (`CORS_ORIGINS`, `auth.db`).

## 8. Non-goal (tetap dilarang)

- Nambah status baru (butuh ubah BE `validate.js` + FE `status.js`, aturan enum identik).
- Ubah logika auth/store/API, ubah `.env`, ubah `vite.config.js`, install dependency baru.
- Ganti copywriting yang dikunci test.

## 9. DONE checklist (login ✅ verified 21/21)

- [x] File: `design-token.css`, `index.html` + `index.template.html` (font), `components/ui.jsx`, `pages/AuthPage.jsx`, `components/SampleLedger.jsx`, `components/StatusBadge.jsx`, `data/status.js` (tuker merah/ijo)
- [x] Visual: kiri putih + bingkai merah offset, kanan panel hitam, tombol hitam→merah, input boxed 8px, fokus merah
- [x] Responsive: 360px 1 kolom, 1280px 2 kolom
- [x] SEO/meta: title `Jobtracker`, meta ada, theme `#FFFFFF`, font Manrope/Inter/JetBrains Mono
- [x] Test: `lint` 0, `test` 21 hijau
- [x] Akses: tab full, reduced-motion, kontras AA, data rekaan tetap

---
## 10. Dashboard + lainnya — ✅ SELESAI (gabung di file ini per request)

Lock: ketat 3 warna (Paper/Ink/Signal + opacity), Manrope/Inter, radius 8-12px, 1 keberanian (bingkai/shadow merah).

- [x] `PipelineStrip`: angka Manrope 800 28px, label Inter, dot merah 8px, klik = filter (sinkron chart), kepilih garis merah + shadow merah
- [x] `Toolbar`: label Inter, input/select boxed 8px, tombol tambah hitam→merah 44px, urut Inter
- [x] `LamaranTable`: head Inter, perusahaan Manrope 600, hover border-ink + garis merah kiri (tanpa cream), mobile sama, empty teks kunci tetap (`Buku besar masih kosong.` / `Tidak ada yang cocok.`)
- [x] `StatusChart` (baru, ringan tanpa chart.js): bar horizontal 7 status, warna dot status, tap = filter, pudar, transisi 500ms, hover shadow
- [x] `StatusDonut` (baru, ringan SVG): total tengah, legend tap = filter, potongan transisi 500ms, offering `#4ADE80` terang vs diterima moss tua biar beda
- [x] Sinkron: strip + bar + donat + toolbar + chip `Filter: X — tampilkan semua` 1 bahasa `status`
- [x] `LamaranForm`: dialog `bg-white` solid (bukan transparan) + border-ink + shadow merah 6px, radius 12px, tombol hitam→merah / putih→hitam, teks kunci tetap
- [x] `Masthead`: putih sticky + blur + border bawah, Manrope 800, tanggal/email Inter, `keluar` hover merah, DoubleRule dibuang dari header
- [x] `Toasts`: kartu 10px Inter, sukses hitam / error merah, hover naik, `aria-live` tetap
- [x] `OfflinePage`: kartu putih + bingkai merah, judul `Server sedang tidur.` persis (test), tombol sama kayak form, sesi tidak dibuang
- [x] Verif tiap batch: `lint` 0 + `test` 21 hijau (login, dashboard, chart, form, masthead, toasts, offline)

Catatan dev: `index.html` dual-role — dev pakai template (`/src/main.jsx`, localhost), push pakai artifact (`./assets/...`, funnel). Urutan push §7 tetap berlaku.
