import Seo from '../components/shared/Seo.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import InteractiveCta from '../components/shared/InteractiveCta.jsx';
import StatusBadge from '../components/shared/StatusBadge.jsx';
import ScreenshotCarousel from '../components/experiment/ScreenshotCarousel.jsx';

/* ---------- specs ---------- */
const specs = [
  { label: 'Live view', value: 'Modern browser + internet' },
  { label: 'Live app login', value: 'Akun auth :7002 (OTP email)' },
  { label: 'Live app jam', value: '08.00 to 21.00 WIB' },
  { label: 'Local dev FE', value: 'Node 22+, npm 10, port 7013 kosong' },
  { label: 'Local BE', value: 'Node 22+, Docker, Postgres :5432, port 7012/7014 kosong' },
  { label: 'Funnel', value: 'Tailscale funnel :7443 to 127.0.0.1:7014' },
  { label: 'Test gate', value: 'lint 0, test hijau, build 38 modules' },
  { label: 'Model', value: 'mimo v2.6 flash via cline cli' },
];

/* ---------- gallery (carousel) ---------- */
const gallery = [
  { n: '1.', title: 'Login Session — Sample Ledger Panel', tag: 'App', src: '/images/exp016-login-session.webp', alt: 'JobTracker login page with sample ledger panel', w: 800, h: 500, caption: 'Login — ledger book plus REKAAN panel not user data' },
  { n: '2.', title: 'Dashboard — Strip Plus Bar Plus Donut', tag: 'App', src: '/images/exp016-dashboard.webp', alt: 'JobTracker dashboard with pipeline strip bar chart donut and ledger table', w: 800, h: 500, caption: 'Dashboard — daily driver 3 lamaran plus bar plus donut in sync' },
  { n: '3.', title: 'Add Modal — Solid White Plus Red Shadow', tag: 'App', src: '/images/exp016-added-lamaran-form.webp', alt: 'Add lamaran modal with solid white card and red offset shadow', w: 800, h: 500, caption: 'Modal — solid white plus red offset shadow one courage' },
  { n: '4.', title: 'Mobile — Table To Cards', tag: 'App', src: '/images/exp016-mobile-version.webp', alt: 'JobTracker mobile cards with pipeline charts and stacked rows', w: 800, h: 500, caption: 'Mobile — table to cards on HP 360px works' },
  { n: '5.', title: 'Door — Caddy One Door Plus Health', tag: 'Terminal', src: '/images/exp016-terminal-door.webp', alt: 'Terminal showing Caddy one door routing and health checks', w: 800, h: 500, caption: 'Door — one door one funnel auth only passes through' },
  { n: '6.', title: 'Contract — Seven Enum Plus Fail Closed', tag: 'Terminal', src: '/images/exp016-terminal-contract.webp', alt: 'Terminal showing seven status enum and fail closed token rejection', w: 800, h: 500, caption: 'Contract — identical PHP contract plus fail closed without real token' },
  { n: '7.', title: 'Backend — Lint Clean Plus 16 Tests', tag: 'Terminal', src: '/images/exp016-lint-backend.webp', alt: 'Backend lint clean and sixteen tests green', w: 800, h: 500, caption: 'Backend — BE 16 tests green plus PHP date parity' },
  { n: '8.', title: 'Frontend — Lint Plus 21 Tests Plus Build', tag: 'Terminal', src: '/images/exp016-lint-frontend.webp', alt: 'Frontend lint test build green with relative assets and zero localhost', w: 800, h: 500, caption: 'Frontend — FE 21 tests plus relative build plus 0 localhost' },
];

/* ---------- details ---------- */
const detailSections = [
  {
    label: 'Same Contract, New Backbone',
    note: 'validate.js plus lamaran.js',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">My v1 vanilla app was 4 files with zero build. I wrote the v2 React app full new with 2 screens, yet the shape, 7 enum, and error messages stay plek PHP legacy (<code className="code-inline">src/validate.js</code> and <code className="code-inline">src/api/lamaran.js</code>). Because I never changed the contract, my old notes still fit and migration stays smooth.</p>
        <p className="text-base text-neutral-700 leading-relaxed">I developed with the hosted model <code className="code-inline">mimo v2.6 flash via cline cli</code>, not local and not opencode. I led research, architecture, review, and test, while Udin typed code and suggestions.</p>
      </>
    ),
  },
  {
    label: 'One Door Plus One Funnel',
    note: 'Caddy :7014 plus funnel :7443',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">I put Caddy on <code className="code-inline">:7014</code> as one door. <code className="code-inline">/api</code> goes to <code className="code-inline">:7012</code>, <code className="code-inline">/auth</code> passes to <code className="code-inline">:7002</code> frozen, <code className="code-inline">/health</code> answers 200. One funnel on <code className="code-inline">:7443</code> forwards to the door. I only read auth via <code className="code-inline">GET /api/me</code>, never write, and Knex never connects to auth.</p>
        <p className="text-base text-neutral-700 leading-relaxed">My proof is <code className="code-inline">infra/Caddyfile</code> and curl to 4 endpoints. Local, funnel, and status all green, auth without token answers 401 asking for token.</p>
      </>
    ),
  },
  {
    label: 'Cutover Without Losing A Row',
    note: 'migrate plus COUNT match',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">I back up first, then read SQLite read only from my backup, then insert to Postgres with idempotent signature (<code className="code-inline">scripts/migrate-lamaran.js</code>). COUNT matches and 5 samples match. My old SQLite file stays for 7 days after cutover.</p>
        <p className="text-base text-neutral-700 leading-relaxed">I fixed date parity with a raw string parser for pg DATE so save and read never shift a day. I patched the parser in server and cutover together.</p>
      </>
    ),
  },
  {
    label: 'Ledger UI That Stays Calm',
    note: '5 auth modes plus strip bar donut',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">I chose a paper token, hairlines, and one brave accent. Five auth modes, dashboard strip 7, bar, and donut tap to filter in sync, table to cards on mobile, solid modal, toast, and an offline card that says the server is sleeping.</p>
        <p className="text-base text-neutral-700 leading-relaxed">My proof is screenshots and <code className="code-inline">design-token.css</code>. I use no icon library, no router, no heavy store, by my decision.</p>
      </>
    ),
  },
  {
    label: 'Green Gate Before Push',
    note: 'lint 0 plus test 21 plus build 38',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">I keep lint at 0, tests at 21 of 21, build 38 modules, copy dist, relative assets, and 0 localhost. CI adds a Postgres service so green means tests really ran, not fake green.</p>
        <p className="text-base text-neutral-700 leading-relaxed">My proof is Actions YAML and logs. I keep frontend <code className="code-inline">frontend.yml</code> and backend <code className="code-inline">backend.yml</code> both green before push.</p>
      </>
    ),
  },
];

/* ---------- evidence log ---------- */
const evidence = [
  {
    title: 'E1. One Door Answers Local',
    badge: 'ok true Local',
    badgeClass: 'text-emerald-600',
    desc: 'Hitting BE, Caddy, and Caddy to BE proves one door routes correctly.',
    code: `curl -s http://127.0.0.1:7012/health
{"ok":true}

curl -s http://127.0.0.1:7014/health
ok

curl -s http://127.0.0.1:7014/api/health
{"ok":true}`,
    result: 'BE plus door plus door to BE all ok.',
  },
  {
    title: 'E2. Funnel Forwards Plus Auth Asks Token',
    badge: '401 Ask Token',
    badgeClass: 'text-emerald-600',
    desc: 'Hitting public funnel without token proves forwarding works and auth stays defensive.',
    code: `curl -sk https://aispec.tail06293c.ts.net:7443/health
ok

curl -sk https://aispec.tail06293c.ts.net:7443/api/health
{"ok":true}

curl -sk https://aispec.tail06293c.ts.net:7443/auth/api/me
{"error":"Token tidak sah atau kedaluwarsa"}`,
    result: 'Funnel to door ok, auth answers 401 asking for token.',
  },
  {
    title: 'E3. Contract Enum Plus Fail Closed',
    badge: '7 Enum Intact',
    badgeClass: 'text-emerald-600',
    desc: 'Grep proves 7 stages intact and fake token stays rejected.',
    code: `grep STATUS src/validate.js
baru, interview-hr, technical-test, interview-user, offering, diterima, ditolak

curl token ngawur
{"error":"Token tidak sah atau kedaluwarsa"}`,
    result: 'Identical PHP contract, fail closed without real token.',
  },
  {
    title: 'E4. Backend Green 16 Pass',
    badge: '16 Pass 0 Fail',
    badgeClass: 'text-emerald-600',
    desc: 'Lint clean, suite green, and date parity with PHP.',
    code: `npm run lint
clean 0 problems

npm test
16 pass 0 fail`,
    result: 'BE green, date alias plek PHP.',
  },
  {
    title: 'E5. Frontend Green 21 Plus Build Relative',
    badge: '21 Passed Relative',
    badgeClass: 'text-emerald-600',
    desc: 'Lint, vitest, and build prove Pages ready with zero localhost.',
    code: `npm run lint
clean

npx vitest run
3 files 21 passed

npm run build
38 modules 137ms css 35.93KB js 256.59KB
src="./assets/index-CbM5JKKw.js"

grep localhost:7002 dist -r
0`,
    result: 'FE green, relative assets, 0 localhost safe for live.',
  },
];

/* ---------- failure tier 1 ---------- */
const tier1 = [
  {
    title: '1. Dates Shift A Day',
    badge: 'TZ Silent Bug DEV HIGH',
    symptom: 'Save 2026-09-26 came back as 2026-09-25. Silent, no error, only visible on read back.',
    diagnosis: 'pg DATE became Date at midnight local, and toISOString to UTC shifted back 7 hours for WIB.',
    fix: 'Raw string parser for type 1082 in pgtypes and same patch in cutover. Save and read shielded by integration test.',
    lesson: 'Timezone is silent, prove with save and read, never trust local midnight.',
  },
  {
    title: '2. Build Green But Runtime Crash',
    badge: 'Silent Killer DEV HIGH',
    symptom: 'Build exit 0 yet warning about getToken undefined. Production screen never finished loading.',
    diagnosis: 'AppStore called a helper never exported from auth. Exit 0 hid the broken bootstrap.',
    fix: 'Re export getToken from auth and read warnings as errors. Bootstrap verified in browser.',
    lesson: 'Exit 0 is not success, read warnings line by line.',
  },
  {
    title: '3. Container Hits Itself To 503 Live Login',
    badge: 'Localhost Trap LIVE HIGH',
    symptom: 'Live login 503. BE container shot to its own localhost, not host auth.',
    diagnosis: 'Localhost inside container means itself, not host. Auth lives outside the container network.',
    fix: 'Host env and compose service name for auth URL. Live login verified after restart.',
    lesson: 'Localhost changes meaning inside containers, use explicit host names.',
  },
  {
    title: '4. Absolute Base To 404 Blank White',
    badge: 'Base Path PRE-LIVE HIGH',
    symptom: 'Pages showed blank white with 404 on assets. Absolute base broke on project Pages.',
    diagnosis: 'Base /jobtracker/ expects domain root, Pages serves from sub path.',
    fix: 'Relative base and VITE_BASE removed, assets ignored by ESLint. Relative proved safe.',
    lesson: 'Relative base survives Pages, absolute base dies quietly.',
  },
  {
    title: '5. CORS Plus Stale Bundle Double Trap',
    badge: 'Dev Plus Bundle PRE-LIVE HIGH',
    symptom: 'Dev on 7013 shot funnel 7443 and got preflight without allow header. Dev also served old funnel artifact.',
    diagnosis: 'Funnel origin not in frozen allowlist, and dev served stale bundle with embedded funnel URL.',
    fix: 'Dev env to localhost, refuse to add origin to frozen. Restore from index template and restart. Prove with curl and grep bundle.',
    lesson: 'Prove with outputs, never guess origin and bundle issues.',
  },
];

/* ---------- failure tier 2 ---------- */
const tier2 = [
  ['F1 DEV small', 'test command read as file path to plain run. Lesson: 0 run once mistaken as tested.'],
  ['F4 DEV medium', 'event hack while context existed to rewrite. Lesson: stay with context.'],
  ['F5 DEV small', 'unused disable twice wrong fix to remove directive. Lesson: target 0 warnings.'],
  ['F6 DEV small', 'duplicate SampleLedger import to tidy. Side effect F7 split.'],
  ['F7 DEV workflow', 'editor refused big file and overwrite to split AuthPage to 3 files cleaner.'],
  ['F8 DEV workflow', 'pkill matched own shell twice to anti self pattern.'],
  ['F9 DEV false alarm', 'parallel ls read stale to sequential check.'],
  ['F10 DEV small', 'SQL one liner quote trap to binding.'],
  ['F11 DEV small', 'grep handle miss to read caller router first.'],
  ['F12 DEV prevented', 'skeleton Caddy 2 bugs to host and strip prefix before run.'],
  ['F13 DEV prevented', 'fake green CI to add Postgres and TEST_URL.'],
  ['F14 DEV workflow', 'long sleep hit timeout twice to split poll.'],
];

const tier2Note = 'PRE-LIVE recap F16 to F18: 3 found before push, 0 users hit. If leaked: blank, no login, and wrong diagnosis. Near miss 4: live CORS checked before push, TZ patch also in cutover, E2E account canceled to protect frozen auth, and 8 compromises openly admitted. UI notes G1 to G12: funnel artifact rewrite, dark tone, moss fix, solid modal, hover border, paper ink stamp tokens, AuthPage REKAAN, strip 28, boxed toolbar, 500ms interactivity, sleep card, and lint test build tracking.';

/* ---------- FAQ ---------- */
const faq = [
  { q: 'Is this a new login?', a: 'No. I use the same shared auth as EXP 011. My old notes still open with the same key.' },
  { q: 'Did my old data move?', a: 'Yes. I made a read only copy, counts match and five samples, and I kept the old file for seven days.' },
  { q: 'Why one door?', a: 'I keep one address for the browser to remember. Data goes one way, auth goes another, health says ok.' },
  { q: 'Why does it sleep at night?', a: 'I run it on my home PC by decision, no VPS bill. When it is off, the card is honest and data stays safe.' },
  { q: 'Why Postgres?', a: 'I get real relations, safe concurrency, and VPS readiness, reuse container, zero cost.' },
  { q: 'Why so many failures?', a: 'I keep eighteen on record. I found three before live, one on live, and fixed all with receipts.' },
];

/* ---------- live status ---------- */
const worksNow = [
  'React ledger live /jobtracker/ with CRUD 7 stages',
  'Bar and donut tap to filter in sync',
  'Caddy one door 7014 and funnel 7443',
  'Postgres cutover verified with COUNT and samples',
  'CI green for frontend and backend',
];

const notYet = [
  'Not 24/7, local PC runs 08.00 to 21.00 WIB',
  'Token 1h, Postgres single container reuse',
  'No rate limit page yet',
  'Hardening is a separate project',
];

export default function Exp016() {
  const ref = useScrollReveal();

  return (
    <main ref={ref} className="bg-white">
      <Seo
        title="Experiment 016 - From Static Tracker to Enterprise System JobTracker EXP010 Rebuilt on a Home PC Without VPS Bills"
        description="Massive JobTracker upgrade from EXP010 static app to enterprise standards on a home private server at zero cost, with honest tradeoffs. React + Express + Postgres + Caddy one door + CI green."
        image="/images/experiments016/dashboard.webp"
        path="/exp016.html"
        type="article"
      />

      {/* ============ 1. HEADER ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true"></div>
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 w-full pt-36 pb-20">
          <div className="max-w-4xl">
            <nav aria-label="Breadcrumb" className="text-xs font-display tracking-wide" data-reveal>
              <ol className="flex items-center gap-2 text-neutral-500">
                <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
                <li aria-hidden="true" className="text-neutral-300">/</li>
                <li><a href="/experiments-list.html" className="hover:text-accent transition-colors">Experiments</a></li>
                <li aria-hidden="true" className="text-neutral-300">/</li>
                <li aria-current="page" className="font-semibold text-ink">Experiment 016</li>
              </ol>
            </nav>
            <a href="/experiments-list.html" className="arrow-link text-xs uppercase text-neutral-500" data-reveal>
              <span aria-hidden="true">&larr;</span> Back to Experiments
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="100">
              <p className="eyebrow">Experiment 016</p>
              <StatusBadge variant="live" label="Live" />
              <span className="text-xs font-mono text-neutral-500">React plus Express plus Postgres plus Caddy one door plus CI green</span>
            </div>
            <h1 className="mt-6 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.25]" data-reveal="200">
              From Static Tracker to Enterprise System JobTracker EXP010 Rebuilt on a Home PC Without VPS Bills.
            </h1>
            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl" data-reveal="300">
              Can a static tracker be rebuilt to enterprise standards on a home private server with honest tradeoffs?
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="350">
              <InteractiveCta variant="primary" href="https://robbyaliasaakbar.github.io/jobtracker/" external>
                Open Live App — /jobtracker/
              </InteractiveCta>
              <InteractiveCta variant="outline" href="/exp011.html">
                Shared Backend: EXP 011
              </InteractiveCta>
            </div>
            <p className="mt-4 text-xs text-neutral-500 font-mono" data-reveal="360">mimo v2.6 flash via cline cli · React plus Express plus Postgres plus Caddy · 8 verified captures · 0 VPS bill · 27 Sep 2026</p>
            <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5" data-reveal="380">
              <p className="text-xs text-neutral-600 leading-relaxed">My app logs in through the SAME shared auth backend as EXP 011, 012, 013, 014, and 015. I did not copy it, I reuse it. Token key jobTracker.token. Backend detail lives in <a href="/exp011.html" className="underline hover:text-accent">EXP 011</a>, link it. My backend only reads auth via GET /api/me, never writes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. SYSTEM REQUIREMENTS ============ */}
      <section className="pb-20 pt-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>System Requirements</p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {specs.map((s, i) => (
              <div key={i} className="border border-black/10 rounded-xl p-5" data-reveal={String(i * 40)}>
                <p className="text-[0.65rem] font-display font-bold tracking-[0.16em] uppercase text-neutral-400">{s.label}</p>
                <p className="mt-2 text-sm font-medium leading-snug break-all">{s.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-neutral-500 leading-relaxed max-w-3xl" data-reveal>
            First experiment developed with a hosted model instead of the local coder. The ledger runs on GitHub Pages, the data still lives on the home PC behind one encrypted funnel as EXP 010 through 015.
          </p>
        </div>
      </section>

      {/* ============ 3. NON-TECHNICAL SUMMARY ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="summary-callout p-8 sm:p-12" data-reveal>
            <h2 className="font-display font-extrabold text-base sm:text-lg tracking-[0.08em] uppercase leading-relaxed max-w-3xl">
              For those of you unable to read this data from technical standpoint, here is the conclusion:
            </h2>
            <div className="mt-8 space-y-5 text-sm sm:text-base text-neutral-700 leading-relaxed max-w-3xl">
              <p>1. My job notebook was messy but useful, so I rebuilt it to look calm and work daily</p>
              <p>2. You log in the same way, your old notes still fit, nothing to move by hand</p>
              <p>3. One door for the browser, one key check, no new passwords written anywhere</p>
              <p>4. My home computer sleeps at night, when it is off the app says so honestly</p>
              <p>5. The move kept every row, counts match and samples match, old file kept seven days</p>
              <p>6. Everything that broke is written here, eighteen small stories, no hidden magic</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. EXPERIMENT DETAILS ============ */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Experiment Details</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Same Contract New Backbone Plus Honest Tradeoffs</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">This is a massive upgrade from EXP010. I kept the same shape and the same errors, then built a new backbone, one door, and green gate. Here are the five decisions I made to move a static tracker to enterprise habits on a home PC.</p>
          <div className="mt-12 space-y-12">
            {detailSections.map((d, i) => (
              <div key={i} className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
                <div className="lg:col-span-3">
                  <span className="detail-label">{d.label}</span>
                  <p className="mt-1 text-xs font-mono text-neutral-400">{d.note}</p>
                </div>
                <div className="lg:col-span-9 space-y-5">{d.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. EVIDENCE LOG ============ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Evidence Log</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Standalone Evidence Log: One Door Plus Contract Plus Green Gate</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">I back every claim about one door, contract, and green gate with verifiable command line outputs from 27 Sep 2026. I never show passwords or full tokens, and raw status, counts, and file listings remain exact.</p>
          <div className="mt-12 space-y-10">
            {evidence.map((e, i) => (
              <div key={i} className="border border-black/10 rounded-2xl p-6 sm:p-8 bg-paper" data-reveal={String(i * 50)}>
                <div className="flex items-center justify-between gap-4">
                  <p className="font-display font-bold text-sm text-neutral-900">{e.title}</p>
                  <span className={`text-xs font-mono font-semibold ${e.badgeClass}`}>{e.badge}</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-neutral-500">{e.desc}</p>
                <pre className="code-block mt-4">{e.code}</pre>
                <p className="mt-3 text-xs text-neutral-400 font-mono">Result: {e.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. FAILURE LOG ============ */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Failure Log</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Eighteen Failures Written Honestly</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">I logged eighteen stories, 4 near miss, and 12 UI notes. Five deep dives below, thirteen honest list after. I found three before live, one on live, and fixed all with receipts.</p>
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-accent">Tier 1 Incidents</span>
              <span className="text-xs text-neutral-400">Five Deep Dive Case Studies</span>
            </div>
            <div className="space-y-8">
              {tier1.map((f, i) => (
                <div key={i} className="border border-black/10 rounded-2xl p-6 sm:p-8 bg-paper" data-reveal={String(i * 50)}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-base sm:text-lg text-ink">{f.title}</h3>
                    <span className="text-xs font-mono text-accent font-semibold">{f.badge}</span>
                  </div>
                  <div className="mt-4 space-y-3 text-sm text-neutral-700 leading-relaxed">
                    <p><strong>Symptom:</strong> {f.symptom}</p>
                    <p><strong>Diagnosis:</strong> {f.diagnosis}</p>
                    <p><strong>Fix:</strong> {f.fix}</p>
                    <p><strong>Lesson:</strong> {f.lesson}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-neutral-500">Tier 2 Log</span>
              <span className="text-xs text-neutral-400">Thirteen Honest List Plus Near Miss Plus UI Notes</span>
            </div>
            <div className="border border-black/10 rounded-xl p-5 bg-paper" data-reveal="0">
              <div className="text-xs text-neutral-600 leading-relaxed space-y-2">
                {tier2.map(([title, text], i) => (
                  <p key={i}>{title}: {text}</p>
                ))}
                <p>{tier2Note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. SOURCE CODE ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="border border-black/10 rounded-2xl p-8 sm:p-10 bg-white" data-reveal>
            <p className="eyebrow">Source Code</p>
            <h3 className="mt-4 font-display font-bold text-xl sm:text-2xl tracking-tight">The source code is public. Prove it yourself.</h3>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed max-w-2xl">You get the full frontend. React and Vite, ledger board, bar and donut tap to filter, and table to cards. No secrets inside. The data API lives in its own repo with its own README.</p>
            <p className="mt-4 font-mono text-xs text-neutral-500 break-all">github.com/robbyaliasaakbar/robbyaliasaakbar.github.io/tree/main/jobtracker</p>
            <p className="mt-1 font-mono text-xs text-neutral-500 break-all">github.com/robbyaliasaakbar/backend-api-services-jobtracker</p>
            <p className="mt-4 text-xs text-neutral-500 leading-relaxed">Receipts live in both READMEs, no secrets inside. <a href="https://github.com/robbyaliasaakbar/robbyaliasaakbar.github.io/blob/main/jobtracker/README.md" target="_blank" rel="noopener" className="underline hover:text-accent">Frontend README</a> and <a href="https://github.com/robbyaliasaakbar/backend-api-services-jobtracker/blob/main/README.md" target="_blank" rel="noopener" className="underline hover:text-accent">Backend README</a>.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <InteractiveCta variant="primary" href="https://github.com/robbyaliasaakbar/robbyaliasaakbar.github.io/tree/main/jobtracker" external>
                View frontend source
              </InteractiveCta>
              <InteractiveCta variant="primary" href="https://github.com/robbyaliasaakbar/backend-api-services-jobtracker" external>
                View backend API
              </InteractiveCta>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 8. SCREENSHOTS (carousel) ============ */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Screenshots</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">App First Then Terminal Green At The End</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">I captured eight shots in strict order: app first, then terminal, green at the end for climax. Login, dashboard, modal, and mobile, then door, contract, lint backend, and lint frontend.</p>
          <div className="mt-8" data-reveal="150">
            <ScreenshotCarousel items={gallery} />
          </div>
        </div>
      </section>

      {/* ============ 9. FAQ ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>FAQ</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="100">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-4" data-reveal="150">
            {faq.map((item, i) => (
              <details key={i} className="group border border-black/10 rounded-xl p-6 bg-paper" open={i === 0}>
                <summary className="flex items-center justify-between gap-4 font-display font-bold text-sm cursor-pointer list-none">
                  {item.q}
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-sm text-neutral-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 10. LIVE STATUS ============ */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Live Status</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="100">Live Status — Live Ledger, Home-PC Backend</h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-4" data-reveal="150">
            <div className="border border-emerald-200 rounded-2xl p-6 bg-paper">
              <p className="font-display font-bold text-xs tracking-[0.18em] uppercase text-emerald-700">What works now</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700 leading-relaxed">
                {worksNow.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
            <div className="border border-amber-300 bg-amber-50/50 rounded-2xl p-6">
              <p className="font-display font-bold text-xs tracking-[0.18em] uppercase text-amber-700">What is not production yet</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700 leading-relaxed">
                {notYet.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="160">
            <InteractiveCta variant="primary" href="https://robbyaliasaakbar.github.io/jobtracker/" external>
              Open Live App — /jobtracker/
            </InteractiveCta>
            <span className="text-xs font-mono text-neutral-500">Live frontend, home PC backend</span>
          </div>
          <div className="mt-6 border-t border-black/10 pt-6" data-reveal="170">
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-3xl">My backend runs on my home PC 08.00 to 21.00 WIB. If my computer or funnel door is closed, the app shows an honest offline card, which is expected and not broken. I cleaned test rows where shown. The demo uses the live frontend and my home backend only.</p>
          </div>
          <blockquote className="quote-block mt-8 text-sm sm:text-base text-neutral-600 leading-relaxed border-amber-300 bg-amber-50 rounded-r-2xl p-6" data-reveal>
            Ledger live on GitHub Pages. Backend runs on my personal PC (funnel :7443 to Caddy :7014 to :7012 and :7002 frozen). Off means offline card, expected. Transcripts and file listing show how it works.
          </blockquote>
        </div>
      </section>

      {/* ============ 11. DISCLAIMER ============ */}
      <section className="py-16 border-t border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow">Disclaimer</p>
            <h2 className="mt-4 font-display font-bold text-lg sm:text-xl tracking-tight">Disclaimer — Live Ledger, Home Backend, Not Production-Hardened</h2>
            <blockquote className="quote-block mt-6 text-sm sm:text-base text-neutral-600 leading-relaxed">
              Built with mimo v2.6 flash via cline cli hosted, not local and not opencode. Test rows cleaned where shown. Passwords, tokens, and OTP codes are never shown.
            </blockquote>
            <p className="mt-6 text-sm text-neutral-700 leading-relaxed">
              <strong>Shared backend:</strong> <a className="underline hover:text-accent" href="/exp011.html">EXP 011 (:7002)</a> ·{' '}
              <strong>v1 story:</strong> <a className="underline hover:text-accent" href="/exp010.html">EXP 010 (vanilla)</a> ·{' '}
              <strong>This:</strong> EXP 016 (v2 enterprise) ·{' '}
              <strong>Machine:</strong> <a className="underline hover:text-accent" href="/exp001.html">EXP 001</a>
            </p>
          </div>
        </div>
      </section>

      {/* ============ 12. CTA ============ */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-black/10 pt-10" data-reveal>
            <a href="/experiments-list.html" className="arrow-link font-display text-sm uppercase">
              <span aria-hidden="true">&larr;</span> Back to Experiments
            </a>
            <a href="/contact.html" className="arrow-link font-display text-sm uppercase">
              Have a problem worth exploring? <span aria-hidden="true">-&gt;</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
