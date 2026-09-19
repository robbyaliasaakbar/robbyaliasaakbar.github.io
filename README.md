# Robby Aliasa Akbar - AI Systems Builder and Experimenter

Live site: https://robbyaliasaakbar.github.io

This repository contains a personal portfolio and applied research site focused on local large language models, automation workflows, agent architecture, and practical tools for real business operations. Every experiment is documented with problem, hypothesis, method, failure log, evidence, and result.

## Live Demo

- Home: https://robbyaliasaakbar.github.io
- Profile: https://robbyaliasaakbar.github.io/profile.html
- Experiments: https://robbyaliasaakbar.github.io/experiments-list.html
- Contact: https://robbyaliasaakbar.github.io/contact.html
- Job Tracker: https://robbyaliasaakbar.github.io/jobtracker
- MiniLeads CRM: https://robbyaliasaakbar.github.io/miniLeads
- CV Screening: https://robbyaliasaakbar.github.io/cv_screening

## Overview

The site has four core pages and thirteen documented experiments. Core pages present background, work, and contact. Experiment pages present technical case studies with terminal receipts, screenshots in WebP format, and honest failure analysis. Three experiments include live web applications hosted on GitHub Pages with backend services on a home computer.

The goal is to test whether artificial intelligence is truly useful in everyday work and to publish full evidence for every claim.

## Tech Stack

Frontend:
- HTML5 with semantic structure and correct heading hierarchy
- Tailwind CSS through CDN for portfolio and experiment pages
- Vanilla JavaScript for portfolio interactions
- React 18 with Vite 6 for MiniLeads and CV Screening
- Chart.js for MiniLeads analytics and Job Tracker trends
- PDF.js for in browser CV text extraction
- Custom CSS in css/style.css for shared components
- Lightweight JavaScript in js/main.js for navigation and reveal effects
- Lightweight SVG charts in js/charts.js with no heavy dependencies
- Fonts: Manrope for display, Inter for body, JetBrains Mono for code
- Images in WebP format under images per experiment folder

Backend and services:
- Shared authentication backend on port 7002 with PHP 8.3 and SQLite in Docker
- Gmail OTP delivery with opaque 64 hex tokens valid for one hour
- Job Tracker data API on the same authentication backend
- MiniLeads data service on port 7005 with Node and Express and SQLite
- CV Screening scoring with n8n on port 5678 using a 24 node rule based workflow
- Tailscale Funnel for public HTTPS access to home computer services
- No native PHP install required because the backend runs in one Docker image

Infrastructure:
- Static hosting on GitHub Pages from the main branch
- Backend and n8n run on a personal home computer
- Online daily from 08.00 to 21.00 Western Indonesia Time when the computer is on
- Outside those hours the frontend stays readable and shows a clear status message

## Project Structure

- index.html - Home page
- profile.html - Background and focus areas
- contact.html - Contact options and form entry
- experiments-list.html - Index of all experiments
- exp001.html to exp013.html - Individual experiment case studies
- template-exp000.html - Template for future experiments, not indexed
- 404.html - Custom not found page, not indexed
- css/style.css - Shared custom styles
- js/main.js - Navigation, mobile menu, reveal effects
- js/charts.js - Lightweight charts
- images - Logo, portrait, and per experiment WebP assets
- jobtracker - Live Job Tracker frontend with vanilla JavaScript
- miniLeads - Live MiniLeads CRM frontend with React and Vite
- cv_screening - Live CV Screening frontend with React and Vite
- robots.txt - Search engine rules
- sitemap.xml - Full URL and image sitemap
- humans.txt - Team and site credits

## Experiments

| No | Title | Focus | Page |
|----|-------|-------|------|
| 001 | The 35B MoE Model on Older Architecture with 12GB VRAM | Local inference feasibility on Intel i5-11400F with RX 6700 XT 12GB on Ubuntu 26.04 with llama.cpp server | exp001.html |
| 002 | Prefill Speed on Long Context Inference | Prompt processing performance at 250K plus tokens | exp002.html |
| 003 | Automation Agent Workflow for Business Research | Autonomous research assistant design beyond model selection | exp003.html |
| 004 | Digital Employees with Open Source LLMs | Five business functions with workflows and open source models | exp004.html |
| 005 | Full Feature Services Business Website Using Only Local AI | Fourteen page business site with slider, animations, 44 item calculator, and SEO | exp005.html |
| 006 | Self Contained Invoice System Without a Database | A4 invoice tool with customer database in JavaScript and 44 lines of PHP, 919 lines total | exp006.html |
| 007 | From 30 Minutes to 5 Seconds for Mass CV Screening | PDF.js to n8n 24 nodes to Postgres with 70 percent threshold | exp007.html |
| 008 | ROCm gfx1031 versus Vulkan on RX 6700 XT | GFX target fix with 23 percent wall clock gain on 8K context | exp008.html |
| 009 | Robust Native ROCm gfx1031 Without Override | One line MMA fix with 580 tokens per second prefill sustained at 20K cached context | exp009.html |
| 010 | Production Ready Job Tracker UI with a 35B Local Coder | Real OTP authentication, CRUD, search, filter, sort, responsive table to cards | exp010.html |
| 011 | One Authentication Backend for Many Frontends | PHP and SQLite and Docker with six endpoints, Gmail OTP, one hour tokens, CORS and rate limits | exp011.html |
| 012 | Multi User CRM with Server Side Pagination | React and Vite with 2049 leads, tap to filter charts, CSV import and export, dark mode | exp012.html |
| 013 | Multi User CV Screening Platform | React and Vite with in browser extraction, seven step pipeline, n8n scoring | exp013.html |

Each experiment page includes system requirements, screenshots, live demo status, evidence log with terminal receipts, failure log, frontend code essence, FAQ, and disclaimer.

## Live Applications

| App | Frontend | Backend | Ports | Public Access | Token Key |
|-----|----------|---------|-------|---------------|-----------|
| Job Tracker | HTML and Tailwind CDN and Vanilla JS in 4 files | Shared authentication backend with lamaran API | Local 7001 to 7002 | https://aispec.tail06293c.ts.net | jobTracker dot token in local storage |
| MiniLeads | React 18 and Vite 6 and Chart.js with custom CSS | Shared authentication backend plus Node Express data service with 2049 leads | Local 7006 to 7005 and 7002 | Auth at https://aispec.tail06293c.ts.net and data at https://aispec.tail06293c.ts.net:8443 | crm dot token in local storage |
| CV Screening | React 18 and Vite 6 and PDF.js with custom CSS | Shared authentication backend plus n8n workflow with 24 nodes | Local 7008 to 7002 and 5678 | Auth at https://aispec.tail06293c.ts.net and webhook at https://aispec.tail06293c.ts.net:10000/webhook/upload-cv | cv dot token in local storage |

Notes:
- Authentication uses the same backend for all three apps with zero new authentication code for the second and third app except additive profile update
- MiniLeads data service is a separate local service with server side pagination and per user isolation
- CV Screening scoring is stateless with fresh truncate on every run and downloads in JSON and CSV format
- The n8n editor is hidden with path restriction. Root returns 404 while webhook returns 200
- Build URLs are baked at Vite build time from production environment files

## Local Development

Portfolio pages:
- Serve the folder with a static server for preview
- Example with Python: python3 -m http.server 8000
- Open http://localhost:8000 in a browser

Job Tracker:
- Serve jobtracker on port 7001 and backend on port 7002
- Set window dot JOB underscore API to the backend URL before testing

MiniLeads:
- Run npm install once in miniLeads, then run npm run dev for local work
- Local frontend defaults to port 7006 through environment config
- Local data API defaults to http://localhost:7005
- Local authentication defaults to http://localhost:7002
- Run npm run build for GitHub Pages output with public Funnel URLs

CV Screening:
- Run npm install once in cv_screening, then run npm run dev for local work
- Local frontend defaults to port 7008 through environment config
- Local n8n webhook is set through production config for live scoring
- Run npm run build for GitHub Pages output with public Funnel URLs

## Deployment

- Push to the main branch of robbyaliasaakbar dot github dot io
- GitHub Pages publishes static files automatically with no build step for portfolio pages
- React apps publish from their dist output to miniLeads and cv_screening subfolders
- Backend services stay on the home computer and are exposed with Tailscale Funnel
- Funnel routes: port 443 to Docker port 7002 for authentication, port 8443 to port 7005 for MiniLeads data, port 10000 with webhook path restriction to port 5678 for n8n
- If the home computer is off, login and data requests fail with a clear message. This behavior is documented on every live page

## SEO and Performance

- Canonical URLs and hreflang for English default and Indonesian alternate
- Open Graph and Twitter cards with WebP images
- JSON-LD for WebSite, Person, Article, BreadcrumbList, FAQPage, CollectionPage, and ContactPage
- Sitemap at sitemap.xml with image extensions
- Robots at robots.txt with allow for public pages and disallow for template and 404
- Humans credits at humans.txt
- Preconnect and DNS prefetch for analytics and Tailwind CDN
- Preload for portrait image on key pages
- Responsive layout for mobile, tablet, and desktop
- Semantic HTML with alt text and correct title and meta description on every page
- Google Analytics 4 with ID G-H86RYQ2ML8

## Security Notes

- No secrets, passwords, OTP codes, tokens, or database content in this repository
- Environment files with secrets are ignored with .gitignore
- Node modules are ignored and can be restored with npm install
- SQLite files and backups with pattern dot db are ignored
- Authentication uses server side validation, generic error messages, rate limits at 5 per minute per IP, short OTP windows, and forced relogin after password reset
- CORS uses an explicit allowlist for GitHub Pages and local ports with same host pass for Tailscale
- The screening webhook is intentionally open with documented threat modeling because it is stateless and returns only the submitted batch result

## Analytics

- Provider: Google Analytics 4
- Measurement ID: G-H86RYQ2ML8
- Loaded with gtag dot js on all public pages
- Used for basic traffic insight only. No personal data is published in experiment evidence

## Disclaimer

This is an applied research portfolio. Results reflect the listed hardware, model files, and software versions at the time of testing. Build times are real work hours, not benchmark peaks. Backend availability depends on the home computer schedule noted above. The author is self taught and welcomes corrections.

## Contact

- LinkedIn: https://www.linkedin.com/in/robby-aliasa-akbar-001a2a267
- Reddit: https://www.reddit.com/user/Full_Director87
- Instagram: https://www.instagram.com/ybboraa
- Email: ibborarts at gmail dot com
- WhatsApp: https://wa.me/6282249072873
- Contact page: https://robbyaliasaakbar.github.io/contact.html
