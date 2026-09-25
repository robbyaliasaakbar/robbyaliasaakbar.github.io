# Job Tracker

Your simple place to track job applications.

Hello. Come sit. Let me tell you what this app is about.

When you apply for many jobs, things get messy fast. Chat messages here. Emails there. Notes on paper somewhere. This app puts all of it in one place. You open it on your laptop or on your phone. You add the jobs you apply for. You update them when things move. That is all. Simple.

## What Can You Do Here

- Make an account with your email. We send a code to your email to check it is really you.
- Log in and log out safely. Your session lasts one hour. After that you log in again.
- Add new job applications. Company name, job title, portal, date, link. All in one form.
- Edit or delete your data any time. Your data is yours.
- Search your list. Filter by status. Sort by newest or oldest.
- See it all as a neat table on laptop. See it as simple cards on your phone.
- Get small popup messages when things work or when things fail. So you always know what is going on.

## How Login Works

No fake login here. When you log in, this app talks to a real backend. The backend checks your email and password. Then it gives you a secret pass. Think of it like a stamp on your hand at a music show. Every time you open the app, the guard at the door checks your stamp. No stamp or old stamp means you go back to the login page. Fair and simple.

The backend lives on my home PC for now. It sleeps when my PC sleeps. It is awake daily from 08.00 to 21.00 WIB. Outside those hours, login will fail and the app will tell you. The app itself still opens fine. Only login and data sync need the backend awake.

## What Is Inside the Box

- auth.html. This is the login page. It holds 5 modes in one file. Login, register, code check, forgot password, reset password.
- index.html. This is the main page. Your dashboard lives here.
- css/style.css. Small extra styles. Most of the look comes from Tailwind.
- js/guard.js. The door guard. It checks your secret pass every time you open the app.
- js/store.js. The brain for data. It talks to the backend for you.
- js/app.js. The brain for the main page. It draws the table and the cards.
- js/auth.js. The brain for the login page.

## How to Run It on Your Laptop

You do not need to install anything big. Just Python. Most laptops already have it.

- Open your terminal inside this folder.
- Run this.

```bash
python3 -m http.server 7001
```

- Open your browser and go to http://localhost:7001
- That is it. The app is running.

Small note. Login and data still need the backend awake on port 7002. If the backend sleeps, you can still open the pages but login will fail. That is normal.

## Live Version

No install needed. Just open this link.

https://robbyaliasaakbar.github.io/jobtracker/

Same story. If login fails, the backend on my home PC is probably asleep. Try again between 08.00 to 21.00 WIB.

## Tech Stuff in Short

For friends who like tech words. HTML5 for structure. Tailwind CDN for the look. Vanilla JS for the brain. No framework. No build step. Login is real. Email plus password plus email code. The backend gives a secret pass that works for one hour. The full backend story lives in EXP 011.

## House Rules

- This frontend holds no secrets. No passwords in the code. No email passwords. Nothing to steal here.
- Your data belongs to you. The app only shows your own rows.
- Found a bug or a typo. Tell me. I am still learning and I welcome corrections.
