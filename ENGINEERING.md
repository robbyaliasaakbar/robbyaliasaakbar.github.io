# Engineering Log

Changelog for this repository. Every significant change gets an entry here.

Format: newest on top. Each entry includes date, type, summary, and files touched.

---

## 2026-10-14

### Profile Page Neumorphism Bento Redesign

**Type:** feature, style, i18n

**Summary:** Full restyle of the Profile page with Neumorphism and Bento Grid design, matching the homepage design language. Added EN and ID language toggle, TiltBox effects on all bento tiles, and mobile order fixes. Also added LICENSE (Apache 2.0), CONTRIBUTING.md (PR-only workflow), and this engineering log.

**What changed:**

- Profile page (`src/pages/Profile.jsx`) rewritten with bento grid layouts across all 8 sections
- Hero section uses 12-column bento grid with photo spanning 4 rows, explicit desktop placement, mobile-first DOM order (name before photo)
- Positioning section converted to full bento grid, all content in neu-cards
- Journey and Principles use zigzag 2-1-1-2 grid (same as Capability homepage)
- Focus Areas use asymmetric bento (2 wide tiles + 4 standard)
- Adaptive Approach stays dark as visual anchor
- Value Proposition uses 3-column bento with span on last tile
- Closing uses clean light layout matching homepage ClosingSection
- TiltBox (`max={5}`) applied to all bento tiles
- i18n wired for all Profile copy via `useLanguage()` and `pick()`
- 8 new translation sections added: `profileHero`, `profilePositioning`, `profileJourney`, `profileFocus`, `profileAdaptive`, `profilePrinciples`, `profileValues`, `profileClosing`
- ID copy finalized with EYD cleanup (typo fixes: Gemini, kuantisasi, bottleneck, infrastructure, etc.)
- `COPY-TRACKING.md` created for copy review workflow
- Mobile order fixed: hero DOM reordered so H1 appears before photo on mobile, desktop layout unchanged via explicit grid placement
- Decorative quote marks added to hero quote tile (text-ink, font-extrabold, text-6xl)
- Quote tile 1 text upgraded to `text-lg sm:text-xl font-semibold`

**Files touched:**

- `src/pages/Profile.jsx` (major rewrite)
- `src/i18n/translations.js` (added 8 profile sections)
- `COPY-TRACKING.md` (new)
- `CONTRIBUTING.md` (new)
- `LICENSE` (new, Apache 2.0)
- `ENGINEERING.md` (new, this file)
- `README.md` (updated)
- `public/sitemap.xml` (lastmod updated)
- `entries/index.html`, `entries/profile.html` (dateModified updated)
- 21 built HTML files + assets (build output)

---

## 2026-10-14

### Homepage Neumorphism Bento Redesign and i18n

**Type:** feature, style, i18n, fix, seo

**Summary:** Full restyle of the homepage with Neumorphism and Bento Grid. Added EN and ID language toggle across all sections. Fixed mobile carousel behavior. Overhauled SEO with new title, description, and OG banner.

**What changed:**

- All homepage sections restyled with neu-card utilities and bento grid layouts
- Hero uses crumpled paper texture backdrop, 12-icon drifting banner, text-stroke H1
- Featured Experiments carousel: snap-proximity, TiltBox skipped on mobile, autoplay resume delay after touch
- Language toggle in Navbar with localStorage persistence
- All homepage copy wired to i18n (EN + ID)
- SEO: new title "Robby Aliasa Akbar — Applied AI System", OG banner `metadata-banner.webp` (1200x630), JSON-LD jobTitle updated
- Sitemap lastmod updated
- `COPY-TRACKING.md` created and filled for homepage copy
- README rewritten with correct stack details

**Files touched:**

- `src/components/home/*.jsx` (all sections)
- `src/components/shared/Navbar.jsx` (language toggle)
- `src/context/LanguageContext.jsx` (new)
- `src/i18n/translations.js` (new)
- `src/styles/global.css` (neu utilities)
- `src/pages/Home.jsx`
- `entries/index.html` (SEO meta)
- `public/sitemap.xml`
- `README.md`
- Built HTML and assets

---

## 2026-10-10

### Experiment 017 and Supabase Migration

**Type:** feature

**Summary:** Moved Job Tracker, MiniLeads, and ContentOS authentication and data to Supabase. Added EXP 017 documenting the migration with 13 failures.

**Files touched:**

- `src/pages/Exp017.jsx` (new)
- `entries/exp017.html` (new)
- `src/data/experiments.js`
- `jobtracker/`, `miniLeads/`, `contentOS/` (auth layer swap)
- Sub-app builds

---

## 2026-10-05

### SEO Overhaul

**Type:** seo

**Summary:** Updated canonical URLs, hreflang, OG images, JSON-LD schemas, and sitemap across all pages.

**Files touched:**

- All `entries/*.html`
- `src/components/shared/Seo.jsx`
- `public/sitemap.xml`

---

## 2026-09-29

### GA4 SPA Pageview Tracking

**Type:** feature

**Summary:** Added GtagTracker component for SPA pageview tracking on every React Router navigation.

**Files touched:**

- `src/components/shared/GtagTracker.jsx` (new)
- `src/App.jsx`

---

## 2026-09-28

### Initial Portfolio Deployment

**Type:** feature

**Summary:** Initial deployment of the portfolio site with 21 HTML entries, 17 experiment pages, 4 core pages, and 4 sub-apps.

**Files touched:**

- Full project scaffold
