# Jobtracker v2 — From Vanilla Test to Daily Tracker

Live app: `https://robbyaliasaakbar.github.io/jobtracker/`

Halo and welcome. This is my job application tracker. I use it almost every day
to save every job I apply to, watch each hiring stage move, and keep my history
clean. If you are a recruiter or a reviewer, you can open the live link above
and click around. No setup needed. If you open the code, this file tells you
where to look first.

This app is the full upgrade of my EXP010 experiment. That page tells the story
of version 1. Version 2 here keeps what worked and rebuilds the rest for daily use.

## Stack and backend (read this first)

- React 19 + Vite + Tailwind v4, Node 22 or newer. No router, no chart
  library, no UI kit — hand made on purpose.
- Backend is **Supabase** (cloud, always on): Auth (GoTrue) for login and
  PostgREST for the `lamaran` rows. The browser talks to it directly.
  Config lives in `src/api/config.js` (URL + publishable key, overridable
  via `.env`).
- RLS keeps every row private to its owner. Two SQL scripts build the whole
  database side — run them once on a fresh Supabase project, in order:
  1. `PRD/username-login.sql` — `profiles` table sync trigger, unique
     username, and the `cari_email_username` RPC used by username login.
  2. `PRD/profile-policies.sql` — RLS policies so a logged-in user can read
     and update their own profile row (needed by the settings page).

## Main features for daily use

- Login with **email or username** (one field — a username is resolved to
  its email server-side before the password check), register with auto
  login, forgot password via 6-digit OTP, reset password
- Show-password toggle (eye icon) on every password field in login/register
- **Settings page** (button in the header): change name, username, password,
  and email. The three sensitive ones are guarded by a confirm-your-password
  gate before the form opens
- Pipeline counts for all seven stages, click a number to filter
- Bar chart with counts and percent, click a bar to filter, click again to clear
- Donut chart with total in the middle plus a legend you can tap
- Search by company or position, filter by status, sort newest or oldest
- Table on desktop, stacked rows on mobile, portal links open in a new tab
- Add and edit form with validation, delete with confirm, toast info after each act
- Offline page when the network is down, session stays safe
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
npm install
npm run dev
```

Then open this in your browser:

```bash
http://localhost:7013/
```

No `cp` step needed: the `predev` npm hook copies `index.template.html` to
`index.html` for you. Use hard refresh (Ctrl+Shift+R) after style changes.

Auth and data live in Supabase cloud, so the app works any hour. You only see
the offline page if your own network is down.

## How I check quality before every push

```bash
npm run lint
npm test
```

Lint must show zero error and zero warning, and every vitest file must be
green (the count grows as features grow — do not chase a hardcoded number).
I also click through the auth modes, the settings flows, search and filter
and sort, tap every chart, add and edit and delete one row, and check mobile
360px and desktop 1280px.

## How to ship it live

The repo root doubles as the GitHub Pages publish directory: `jobtracker/`
inside `robbyaliasaakbar.github.io`. The committed `index.html` must ALWAYS be
the built one — a dev `index.html` (pointing to `/src/main.jsx`) makes the
live page blank white. That accident happened once; a local git hook now
prevents it.

Daily flow, from the repo root (`public_html`):

```bash
git add . && git commit -m "..." && git push
```

The `pre-commit` hook at the repo root does the rest automatically: if you
staged source changes (or a dev `index.html`), it runs `npm run build`,
installs the fresh `dist/index.html` + `assets/` into `jobtracker/`, restages
them, and lets the commit through. If the build fails, the commit is blocked.
GitHub Pages then redeploys on its own.

If the hook is missing (new machine, new clone), install it once:

```bash
cp jobtracker/hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

Prefer to build manually? That works too:

```bash
cd jobtracker
npm run build
cp dist/index.html ./index.html
rm -rf assets && cp -r dist/assets ./assets
git add . && git commit -m "..." && git push
```

After pushing, `npm run dev` as usual — `predev` restores the dev
`index.html` for you, and the hook keeps the repo side safe.

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

Status list must stay twin with the database enum. Same seven values on both
sides or PostgREST rejects the write.

## Honest limits

- No automated E2E yet — testing is lint + unit tests plus manual clicks
- No load test and no rate limit page in this frontend (Supabase has its own
  limits)
- Charts are hand made with div and SVG, no chart library, on purpose to stay
  light
- The username-to-email lookup RPC is callable with the public key, so anyone
  can check whether a username exists. Standard trade-off for username login;
  nothing secret is returned besides the email

## Files to open first

- `src/api/config.js` for the Supabase URL and key
- `src/api/auth.js` for login, register, OTP recovery, and account updates
- `src/api/http.js` for the fetch wrapper, token storage, and refresh logic
- `src/pages/AuthPage.jsx` for login layout
- `src/pages/DashboardPage.jsx` for page order
- `src/pages/SettingsPage.jsx` for the account settings cards
- `src/components/StatusChart.jsx` for bar chart
- `src/components/StatusDonut.jsx` for donut chart
- `src/components/LamaranTable.jsx` for table and empty states
- `src/components/LamaranForm.jsx` for add and edit modal
- `src/data/status.js` for seven stages
- `src/styles/design-token.css` for palette and fonts
- `PRD/username-login.sql` and `PRD/profile-policies.sql` for the database
  setup
- `PRD/redesign-ui-login.md` for full redesign notes
