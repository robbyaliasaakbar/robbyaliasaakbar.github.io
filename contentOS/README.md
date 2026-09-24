# ContentOS — Your Personal Content Calendar

Think of this app like a small food stall notebook. You write down your content ideas, you set the date, you track the status until it is posted. That is all it does. No robots inside. No auto posting. You still design and post by hand on Instagram, LinkedIn, Reddit and WA. This app is only the calendar and the tracker.

## What You Get

- Login with email and OTP, one shared login for all my apps
- Add ideas with schedule date, platform, format, category, storyboard and caption
- Search and filter by platform, status, format and category, with pages
- One click export to CSV that follows your active filter
- The app refuses to mark anything as posted until you paste the link
- Dashboard cards with totals, click a card and the list filters itself
- Dark mode plus a layout that works on a small phone and a big laptop

## Live Demo

- Frontend: `https://robbyaliasaakbar.github.io/contentOS/`
- The backend lives on my home PC, so it is awake from 08.00 to 21.00 WIB only
- If you open it while the PC sleeps, you will see an honest offline message, not a blank screen
- Demo login so you can look around: user `admin`, password `Leads7006` (dummy data only)

## Run The Frontend Locally (1 Terminal)

```bash
cd public_html/contentOS
npm install
npm run dev
```

Open `http://localhost:7011` in your browser. It opens straight into the login screen. There is no landing page. You need internet while developing, because the page loads its style tools, fonts and login service from the net.

Important: use `npm run dev` for local testing. Do not use `npm run preview` for local testing, because preview serves the production build that talks to the live internet addresses, and your browser will block that mix with a CORS error.

## Project Map

```text
public_html/contentOS/
  src/api.js         the only file that talks to the data service
  src/auth.js        the only file that talks to the login service, token key content.token
  src/theme.js       remembers light or dark in content.theme
  src/Auth.jsx       login, register, OTP, forgot and reset screens
  src/Board.jsx      table on laptop, cards on phone, plus filter and pages
  src/ContentForm.jsx  the 10 field form with the red warning for missing links
  src/Dashboard.jsx  total cards that act as filters when you click them
  src/Settings.jsx   account info, theme switch and logout
  index.template.html  the source page, kept so the built page never eats it
```

Rules for editing: to change how it looks, touch `index.css` only. To change features, touch `Board.jsx`, `ContentForm.jsx` or `api.js`. To change login, touch `auth.js` only.

## Data Shape

One idea looks like this:

```text
id `content-001`, auto filled with the smallest free number
owner your email, admin sees everything, others see only their own rows
created date auto filled as dd mm yyyy
schedule date only, picked with a date input
platform IG, LinkedIn, Reddit or WA
format story, feeds, reels, carousel, text post or video
category ai, web app, app, automation, llm infra or daily
description your raw idea in 1 or 2 sentences
storyboard free markdown for story plus dialog plus narration
caption final text ready to copy paste
status ide, `post-production`, revision or posted
link empty is fine, except posted always needs a link starting with http
```

Status colors: ide is grey, post production is yellow, revision is blue, posted is green. Light theme uses soft pastel, dark theme uses see through tones.

## Addresses

- Local dev: `http://localhost:7011`
- Live: `https://robbyaliasaakbar.github.io/contentOS/`
- The live page bakes its data and login addresses at build time from `.env.production`, so rebuild after changing that file

## Honest Limits

- The PC sleeps at night, so this is not a 24 hour service
- Logout here does not log you out from my other apps, each app keeps its own token by design
- OTP codes are short lived on purpose, check your inbox fast
