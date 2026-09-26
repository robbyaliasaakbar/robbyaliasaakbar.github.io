# Jobtracker v2 — From Vanilla Test to Daily Tracker

Live app: `https://robbyaliasaakbar.github.io/jobtracker/`

Halo and welcome. This is my job application tracker. I use it almost every day
to save every job I apply to, watch each hiring stage move, and keep my history
clean. If you are a recruiter or a reviewer, you can open the live link above
and click around. No setup needed. If you open the code, this file tells you
where to look first.

This app is the full upgrade of my EXP010 experiment. That page tells the story
of version 1. Version 2 here keeps what worked and rebuilds the rest for daily use.

## What changed from version 1

Version 1 was a vanilla JS test. Four small files, zero build step, Tailwind CDN,
done in about five hours with a local AI coder. It proved the idea. Real login
with OTP, real CRUD, search and filter and sort, table on desktop that turns
into cards on mobile.

Version 2 keeps the same idea and the same palette, but it grows up:

- New stack is React 19 plus Vite plus Tailwind v4, Node 22 or newer
- Same login flow with five modes, same seven hiring stages, same backend contract
- New pipeline strip you can click to filter the list
- New bar chart and donut chart, light and fast with zero new install, tap to filter
- New toolbar with boxed search and status picker plus one clear filter chip
- New table hover with a red edge instead of a cream wash
- New solid white form modal with a red offset shadow
- New sticky header, new toast cards, new offline card for sleeping server hours
- Quality gate on every batch with lint clean and 21 tests green

Palette and fonts stay familiar on purpose. White plus near black plus one brave
red, Manrope for display and Inter for body. If version 1 felt bold, version 2
feels calm and firm.

## Main features for daily use

- Login, register, OTP code check, forgot password, reset password
- Pipeline counts for all seven stages, click a number to filter
- Bar chart with counts and percent, click a bar to filter, click again to clear
- Donut chart with total in the middle plus a legend you can tap
- Search by company or position, filter by status, sort newest or oldest
- Table on desktop, stacked rows on mobile, portal links open in a new tab
- Add and edit form with validation, delete with confirm, toast info after each act
- Offline page when the server sleeps, session stays safe
- Keyboard friendly with visible focus plus calm motion for reduced motion fans

## Design tokens in one place

All colors and fonts live in one file:

- `src/styles/design-token.css`

Base colors:

- `Paper #FFFFFF` for page ground
- `Ink #0C0C0C` for text and main buttons
- `Signal #D70000` for accents only, used with care

Soft tones come from black opacity on white, not from new hues. Status dots keep
their own colors so the table and the charts speak one language. Radius stays
small and firm. Red shadow appears only on the one brave element per screen.

## How to run it on your machine

You need Node 22 or newer.

```bash
cp index.template.html index.html
npm run dev
```

Then open this in your browser:

```bash
http://localhost:7013/
```

Use hard refresh in Firefox or Chrome after style changes:

```bash
Ctrl+Shift+R
```

Backend runs on the owner PC daily 08.00 to 21.00 WIB. Outside those hours the
API sleeps and login cannot work. The app tells you this on screen. Data stays safe.

## How I check quality before every push

```bash
npm run lint
npm test
```

Lint must show zero error and zero warning. Tests must show 3 files and 21 tests
green. I also click through five auth modes, search and filter and sort, tap
every chart, add and edit and delete one row, and check mobile 360px and desktop
1280px.

## How to ship it live

Build makes fresh files in `dist/`. Live Pages serves `index.html` plus `assets/`.

```bash
npm run lint && npm test
npm run build
cp dist/index.html ./index.html
rm -rf assets && cp -r dist/assets ./assets
grep -o 'src="[^"]*"' index.html
grep -c 'localhost:7002' assets/*.js
```

First grep must show paths like `./assets/...` which means relative and safe.
Second grep must show 0 which means live bundle points to the public funnel,
not to localhost.

Stage only what belongs to live:

```bash
git add index.html index.template.html src assets
git status --short
```

Keep these out of the commit: `PRD/`, `edit-ui-notes.md`, `.env`

After push, bring dev back for tracking:

```bash
cp index.template.html index.html
npm run dev
```

## Tests and locked words

Smoke tests watch some words on purpose. If you change these words, update the
tests too or CI turns red while the app is fine:

- `Jobtracker`
- `Masuk`
- `Server sedang tidur`
- `Baru`
- `Diterima`
- `Interview HR`
- `Buku besar masih kosong`
- `Tidak ada yang cocok`
- `Tambah lamaran`
- `Ubah lamaran`
- `simpan lamaran`
- `hapus lamaran`
- `ubah`
- `hapus`

Status list must stay twin with the backend enum. Same seven values on both sides
or the server rejects with 422.

## Honest limits

- Backend lives on a home PC, online daily 08.00 to 21.00 WIB only
- No real login test from my side in automation, I keep no credential in the repo
- No load test and no rate limit page in this frontend
- Charts are hand made with div and SVG, no chart library, on purpose to stay light

## Files to open first

- `src/pages/AuthPage.jsx` for login layout
- `src/pages/DashboardPage.jsx` for page order
- `src/components/StatusChart.jsx` for bar chart
- `src/components/StatusDonut.jsx` for donut chart
- `src/components/LamaranTable.jsx` for table and empty states
- `src/components/LamaranForm.jsx` for add and edit modal
- `src/data/status.js` for seven stages
- `src/styles/design-token.css` for palette and fonts
- `PRD/redesign-ui-login.md` for full redesign notes
