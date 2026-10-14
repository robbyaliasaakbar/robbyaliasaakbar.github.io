# Contributing

Thanks for your interest in contributing to this portfolio project. This document explains how changes are reviewed and merged.

## Important: No Direct Push to Main

**All changes must go through a Pull Request (PR).** Direct commits and pushes to the `main` branch are not allowed. This ensures every change is reviewed before it goes live.

### Why Pull Requests Only?

- **Code review.** Every change gets reviewed before merge. Nothing ships unreviewed.
- **No accidental deploys.** Merging to `main` triggers GitHub Pages deployment. PRs give a safety buffer.
- **Traceability.** PR history shows what changed, why, and who approved it.
- **Revert safety.** If something breaks, it is easier to revert a single PR than to dig through unreviewed commits.

## Workflow

### 1. Create a Branch

Never work directly on `main`. Create a feature branch from `main`:

```bash
git checkout main
git pull origin main
git checkout -b feat/your-feature-name
```

Branch naming conventions:

| Prefix | Use |
|---|---|
| `feat/` | New features or pages |
| `fix/` | Bug fixes |
| `style/` | Visual or CSS changes |
| `refactor/` | Code restructuring without behavior change |
| `docs/` | Documentation only |
| `chore/` | Build tooling, dependencies, config |

Examples: `feat/contact-page-redesign`, `fix/navbar-mobile-overlap`, `style/homepage-hero-typo`

### 2. Make Your Changes

Edit files, test locally:

```bash
npm install
npm run dev
```

Verify your changes at `http://localhost:5173/entries/<page>.html`. Check desktop, tablet, and mobile viewports.

### 3. Log Your Change in ENGINEERING.md

**Every PR must include an entry in `ENGINEERING.md`.** Add a new entry at the top of the file under today's date. This is the project changelog and it must stay current.

Entry format:

```markdown
## YYYY-MM-DD

### Short Title of the Change

**Type:** feature | style | fix | i18n | seo | refactor | docs | chore

**Summary:** One or two sentences describing what changed and why.

**What changed:**
- Bullet list of specific changes

**Files touched:**
- List of files added, modified, or deleted
```

If multiple changes go in one PR, use one entry with a combined summary, or separate entries under the same date.

### 4. Commit

Write clear commit messages. Prefix with the type:

```bash
git add .
git commit -m "feat: add contact form validation"
```

Commit message prefixes match branch prefixes: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`, `chore:`.

### 5. Push Your Branch

```bash
git push origin feat/your-feature-name
```

### 6. Open a Pull Request

- Go to the repository on GitHub
- Click **Compare & pull request**
- Fill in the PR title and description
- **Do not merge yet.** Wait for review.

### 7. Review

The repository owner will review your PR. You may get feedback or change requests. Address them by pushing additional commits to the same branch.

### 8. Merge

Once approved, the PR is merged into `main`. GitHub Pages picks up the change and deploys automatically.

**Never merge your own PR without approval.**

## Pull Request Description Template

Include the following in your PR description:

```markdown
## What changed
Brief description of the change.

## Why
Reason for the change. Link to an issue if applicable.

## How to test
Steps to verify the change works.

## Screenshots
Before/after screenshots if visual change.

## Engineering Log
Entry added to ENGINEERING.md: Yes / No
```

## Build and Deploy

The site is a multi-page Vite build. The build output lives in the repository root (HTML files + `assets/`).

**Do not commit build output (`dist/`) separately.** After merge to `main`, run the build and commit the updated root files as part of your PR, or let the maintainer handle deployment.

```bash
npm run build
cp dist/entries/*.html .
cp -r dist/assets .
```

## Code Style

- **React 18** with Vite 6 (multi-page, 21 HTML entries)
- **Tailwind CSS 3.4** (bundled, not CDN)
- **Plus Jakarta Sans** font (400 to 800)
- Semantic HTML with proper heading hierarchy
- Alt text on all images
- Every page includes the `Seo` component (title, meta, OG, JSON-LD)
- English copy uses a friendly, non-technical tone (warung style)
- No em dashes in copy (except headings), no hyphens (except lists), no semicolons

## What Not to Do

- Do not push directly to `main`
- Do not merge your own PR without approval
- Do not skip the `ENGINEERING.md` log entry
- Do not commit `.env` files or secrets
- Do not modify files outside the `public_html/` workspace
- Do not install new dependencies without discussion
- Do not commit `node_modules/` or `dist/`

## Key Files

| File | Purpose |
|---|---|
| `CONTRIBUTING.md` | This file. Contribution rules and workflow. |
| `ENGINEERING.md` | Changelog. Every PR adds an entry here. |
| `README.md` | Project overview, stack, and setup instructions. |
| `COPY-TRACKING.md` | Copy review file for i18n (EN and ID). Delete after final. |
| `LICENSE` | Apache License 2.0. |

## License

By contributing, you agree that your contributions will be licensed under the [Apache License 2.0](LICENSE).
