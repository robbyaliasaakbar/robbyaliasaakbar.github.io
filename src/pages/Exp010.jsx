import Seo from '../components/shared/Seo.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import InteractiveCta from '../components/shared/InteractiveCta.jsx';
import StatusBadge from '../components/shared/StatusBadge.jsx';
import ScreenshotCarousel from '../components/experiment/ScreenshotCarousel.jsx';

/* ---------- gallery ---------- */
const gallery = [
  { n: '1.', title: 'Auth — login form', tag: 'Auth', src: '/images/exp010-1.webp', alt: 'Job Tracker login form with email and password', w: 335, h: 477, caption: 'Auth — login form' },
  { n: '2.', title: 'Auth — OTP verification', tag: 'Auth', src: '/images/exp010-2.webp', alt: 'Register and 6-digit OTP verification flow', w: 562, h: 710, caption: 'Auth — OTP verification' },
  { n: '3.', title: 'Dashboard — desktop full view', tag: 'Dashboard', src: '/images/exp010-3.webp', alt: 'Job Tracker dashboard with stats filter form and table', w: 980, h: 823, caption: 'Dashboard — desktop full view' },
  { n: '4.', title: 'Mobile — cards, not table', tag: 'Mobile', src: '/images/exp010-4.webp', alt: 'Mobile cards view replacing table on small screens', w: 339, h: 727, caption: 'Mobile — cards, not table' },
];

/* ---------- specs ---------- */
const specs = [
  { label: 'CPU', value: 'Intel Core i5-11400F' },
  { label: 'RAM', value: '16GB DDR4 3200MT/s' },
  { label: 'GPU', value: 'RX 6700 XT 12GB gfx1031' },
  { label: 'OS', value: 'Ubuntu Desktop 26.04 LTS' },
  { label: 'Model', value: 'Tiel-Coder-35B-A3B-MTP-UD-Q4_K_S.gguf' },
  { label: 'Engine', value: 'llama.cpp-server' },
  { label: 'Stack', value: 'HTML5 + Tailwind CDN + Vanilla JS' },
  { label: 'Time / Status', value: '4-5 hours in one day / STABLE' },
];

/* ---------- details ---------- */
const detailSections = [
  {
    label: 'Problem',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">Job hunting scatters across spreadsheets, chat threads, and portal inboxes. I needed one tracker that enforces real login (not fake localStorage login), fast CRUD, searchable history, and thumb-friendly mobile.</p>
        <p className="text-base text-neutral-700 leading-relaxed">A framework was overkill for a single-user internal tool. The bet: small separated files stay fast to iterate and easy to review.</p>
      </>
    ),
  },
  {
    label: 'The 5-Hour Build',
    body: <p className="text-base text-neutral-700 leading-relaxed">Built in one day, 4-5 hours total, with <code className="code-inline">Tiel-Coder-35B-A3B-MTP-UD-Q4_K_S.gguf</code> via <code className="code-inline">llama.cpp-server</code>. AI handled syntax and boilerplate, decisions stayed with me. Inference flags are covered in <a className="underline hover:text-accent" href="/exp001.html">EXP 001</a> and not repeated here. Honest scope: frontend only in this page, backend entrypoint in EXP 011.</p>,
  },
  {
    label: 'Hypothesis',
    body: <p className="text-base text-neutral-700 leading-relaxed">Vanilla separation (<code className="code-inline">guard.js</code> as guard, <code className="code-inline">store.js</code> as database brain, <code className="code-inline">app.js</code> as view brain, <code className="code-inline">auth.js</code> as front door) is enough for production-feel internal tooling. Tailwind CDN gives portfolio-grade look with zero build step, ideal for GitHub Pages.</p>,
  },
  {
    label: 'What I Built',
    body: (
      <ol className="space-y-4 list-none">
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">1.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><strong>Auth in one file:</strong> <code className="code-inline">auth.html</code> holds 5 modes: login, register (name + phone + email + password), OTP verify, forgot, reset. Show/hide via <code className="code-inline">data-lihat</code>, green/red <code className="code-inline">auth-msg</code> box.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">2.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><strong>Dashboard:</strong> 4 stat cards, filter bar (search company/position/portal + 7 statuses + newest/oldest sort), left form, right list.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">3.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><strong>Form rules:</strong> company, position, portal required. Date defaults to today. 7 stages: <code className="code-inline">baru, interview-hr, technical-test, interview-user, offering, diterima, ditolak</code>. Optional link renders as <code className="code-inline">Buka ↗</code>.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">4.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><strong>Responsive:</strong> desktop table <code className="code-inline">min-w-[800px] hidden lg:block</code> vs mobile cards <code className="code-inline">lg:hidden</code> with big Edit/Delete. Empty state kept friendly.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">5.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><strong>Feedback:</strong> <code className="code-inline">toast()</code> 3s (<code className="code-inline">bg-ink</code> success, <code className="code-inline">bg-accent</code> error), <code className="code-inline">confirm()</code> before delete, new-row highlight via <code className="code-inline">lastAddedId</code>.</p></li>
      </ol>
    ),
  },
  {
    label: 'Backend Teaser',
    body: <p className="text-base text-neutral-700 leading-relaxed"><code className="code-inline">window.JOB_API</code> override for GitHub Pages tunnel, else <code className="code-inline">hostname:7002</code>. <code className="code-inline">store.js</code> exposes <code className="code-inline">getAll/add/update/remove</code>: sync cache read, async API write. <code className="code-inline">guard.js</code> checks <code className="code-inline">GET /api/me</code> with <code className="code-inline">Bearer</code> token from <code className="code-inline">localStorage jobTracker.token</code>, redirects to <code className="code-inline">auth.html</code> when missing or invalid. Full contract (6 endpoints, Gmail OTP, opaque 1-hour token) is in EXP 011.</p>,
  },
  {
    label: 'What Failed',
    body: (
      <ol className="space-y-4 list-none">
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">1.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><strong>CORS on different ports</strong>: fetch blocked until backend allowed the frontend origin. Touched here, fixed there (EXP 011).</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">2.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><strong>Offline chart edge</strong>: when Chart.js fails to load, percentages still update via defensive <code className="code-inline">typeof Chart === undefined</code>.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">3.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><strong>1-hour token expiry</strong>: first looked like a bug when kicked to login, turned out expected session behavior.</p></li>
      </ol>
    ),
  },
  {
    label: 'Evidence',
    body: (
      <>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-6">Small numbers that matter for an internal tool, no tok/s here, that is EXP 009.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            ['Auth modes', '5 in 1 file', 'login → reset'],
            ['Status stages', '7 stages', 'baru → ditolak'],
            ['Views', 'Table + cards', 'desktop + mobile'],
            ['Filter', '3-way', 'search + status + sort'],
            ['Feedback', '3s toast', 'ink / accent'],
            ['Framework', '0 / 0 build', 'vanilla + CDN'],
          ].map(([label, value, note], i) => (
            <div key={i} className="border border-black/10 rounded-xl p-5 bg-paper">
              <p className="text-[0.62rem] font-display font-bold tracking-[0.14em] uppercase text-neutral-400">{label}</p>
              <p className="mt-2 font-display font-extrabold text-lg leading-tight">{value}</p>
              <p className="text-xs text-neutral-500">{note}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    label: 'Result',
    body: <p className="text-base text-neutral-700 leading-relaxed">Stable frontend live on GitHub Pages. Auditable vanilla files, responsive, auth-guarded. Backend local limitation documented separately below, not hidden.</p>,
  },
  {
    label: 'What I Learned',
    body: <p className="text-base text-neutral-700 leading-relaxed">Small, clear files beat one giant file when iterating quickly. Keeping auth decisions on the server (opaque tokens, route guards, generic error messages) keeps the frontend simple and easy to review, even for an internal tool. Chain: <code className="code-inline">EXP 010 (UI you can click) → EXP 011 (where data goes) → EXP 001 (what machine runs the AI)</code>.</p>,
  },
];

/* ---------- code ---------- */
const CONFIG_GUARD = `// No token → kick to auth.html before app renders
const token = localStorage.getItem("jobTracker.token");
if (!token) location.replace("auth.html");
fetch(GUARD_API + "/api/me", {
  headers: { Authorization: "Bearer " + token }
}).then(r => { if (!r.ok) location.replace("auth.html"); });`;

const CONFIG_STORE = `// app.js never touches localStorage directly
// getAll() reads cache sync, add/update/remove write via API
window.JOB_API = "https://aispec.tail06293c.ts.net"; // tunnel, changes`;

/* ---------- FAQ ---------- */
const faq = [
  {
    q: 'Is this just a static HTML demo?',
    a: <>No. Frontend is static on GitHub Pages, but auth + data go to a real backend (PHP 8.3 + SQLite) running on my PC for now. Guard checks token via <code className="code-inline">/api/me</code> on every open. Full entrypoint in EXP 011.</>,
  },
  {
    q: 'Why no framework? Is vanilla production-ready?',
    a: <>For this scale yes. Four small files (guard/store/app/auth) are easier to review and faster to iterate than framework boilerplate. No build step means GitHub Pages deploy is trivial.</>,
  },
  {
    q: 'Why does login sometimes fail?',
    a: <>Backend is not on a 24/7 VPS yet. It lives on my personal PC, online daily 08.00–21.00 WIB (UTC+7) when my PC is on. Outside those hours API is unreachable and login cannot succeed. Frontend shows a toast and stays readable. Screenshots remain as proof.</>,
  },
];

/* ---------- live demo status ---------- */
const worksNow = [
  'Frontend live on GitHub Pages',
  'Auth flow (login, register, OTP, reset)',
  'CRUD lamaran',
  'Search / filter / sort',
  'Responsive UI (table → cards)',
  'Real backend integration',
  'Usable by invited testers',
  'Backend online daily 08.00–21.00 WIB (UTC+7) when my PC is on',
];

const notYet = [
  'Backend not yet 24/7',
  'Deployment still local (personal PC)',
  'Early-stage features',
  'Collecting user feedback',
  'Next iteration not yet done',
];

export default function Exp010() {
  const ref = useScrollReveal();

  return (
    <main ref={ref} className="bg-white">
      <Seo
        title="Experiment 010 — Building a Production-Ready Job Tracker UI With Only a 35B Local Coder"
        description="Job Tracker frontend built in 5 hours with only Tiel-Coder 35B local LLM: real OTP auth, CRUD, search/filter/sort, responsive table-to-cards, no framework, live on GitHub Pages."
        image="/images/experiments010/desktop-version.webp"
        path="/exp010.html"
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
                <li aria-current="page" className="font-semibold text-ink">Experiment 010</li>
              </ol>
            </nav>
            <a href="/experiments-list.html" className="arrow-link text-xs uppercase text-neutral-500" data-reveal>
              <span aria-hidden="true">&larr;</span> Back to Experiments
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="100">
              <p className="eyebrow">Experiment 010</p>
              <StatusBadge variant="stable" label="Stable" />
              <span className="text-xs font-mono text-neutral-500">Frontend only · Backend in EXP 011 →</span>
            </div>
            <h1 className="mt-6 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" data-reveal="200">
              Building a Production-Ready Job Tracker UI With Only a 35B Local Coder — No Framework.
            </h1>
            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl" data-reveal="300">
              Can a production-ready, recruiter-usable Job Tracker frontend (real auth flow, CRUD, search/filter/sort, responsive table-to-cards) be shipped in 4-5 hours with only a 35B local coder, no framework, just HTML5 + Tailwind CDN + Vanilla JS?
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="350">
              <InteractiveCta variant="primary" href="https://robbyaliasaakbar.github.io/jobtracker/" external>
                Open Job Tracker <span aria-hidden="true">↗</span>
              </InteractiveCta>
              <InteractiveCta variant="outline" href="/exp001.html">
                Inference background: EXP 001
              </InteractiveCta>
            </div>
            <p className="mt-4 text-xs text-neutral-500 font-mono" data-reveal="360">Tiel-Coder-35B via llama.cpp-server · 4-5 hours in one day · Live daily 08.00–21.00 WIB (UTC+7) · Full backend entrypoint in EXP 011</p>
          </div>
        </div>
      </section>

      {/* ============ 2. SYSTEM REQUIREMENTS ============ */}
      <section className="pb-20 pt-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>System Requirements</p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {specs.map((s, i) => (
              <div key={i} className="border border-black/10 rounded-xl p-5" data-reveal={String(i * 40)}>
                <p className="text-[0.65rem] font-display font-bold tracking-[0.16em] uppercase text-neutral-400">{s.label}</p>
                <p className="mt-2 text-sm font-medium leading-snug">{s.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-neutral-500 leading-relaxed max-w-3xl" data-reveal>
            Built with local model above via <code className="code-inline">llama.cpp-server</code>. Inference flags covered in <a className="underline hover:text-accent" href="/exp001.html">EXP 001</a> and not repeated here. Frontend runs browser-only on GitHub Pages, no build step.
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
              <p>I needed a place to track job applications that works on laptop and phone, with real login.</p>
              <p>I built it in an afternoon with a local AI coder running on my own GPU, with no cloud AI and no framework.</p>
              <p>You can click and try it live: login, add, edit, search. It looks simple because internal tools should be simple.</p>
              <p>If login sometimes fails, my home PC (the database) is likely off. It is online daily 08.00–21.00 WIB (UTC+7). Screenshots above still show how it works.</p>
              <p>Next page explains where the data goes and how login codes work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. EXPERIMENT DETAILS ============ */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Experiment Details</p>
          <div className="mt-12 space-y-12">
            {detailSections.map((d, i) => (
              <div key={i} className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
                <div className="lg:col-span-3"><span className="detail-label">{d.label}</span></div>
                <div className="lg:col-span-9 space-y-5">{d.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. FRONTEND CODE / CONFIG ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Frontend Code</p>
          <div className="mt-8" data-reveal="100">
            <p className="font-mono text-sm text-neutral-500">Guard — js/guard.js (essence)</p>
            <pre className="code-block mt-4">{CONFIG_GUARD}</pre>
          </div>
          <div className="mt-8" data-reveal="100">
            <p className="font-mono text-sm text-neutral-500">Store pattern — js/store.js (essence)</p>
            <pre className="code-block mt-4">{CONFIG_STORE}</pre>
          </div>
          <blockquote className="quote-block mt-10 text-sm sm:text-base text-ink leading-relaxed max-w-3xl" data-reveal>
            No .env, no SMTP secrets, no auth.db content here. That is EXP 011.
          </blockquote>
          <div className="mt-10 border border-black/10 rounded-2xl p-8 sm:p-10 bg-white" data-reveal="150">
            <p className="eyebrow">Upgrade Note</p>
            <h3 className="mt-4 font-display font-bold text-xl sm:text-2xl tracking-tight">This static app already grew to enterprise grade.</h3>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed max-w-2xl">This page tells the story of the first version. A calm static tracker that works daily with zero build step. The same tracker now runs as v2 in EXP 016 — same contract plus same data shape, new backbone with React plus Express plus Postgres plus Caddy one door plus green CI.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <InteractiveCta variant="primary" href="/exp016.html">
                Read EXP 016: Enterprise Upgrade
              </InteractiveCta>
              <span className="text-xs font-mono text-neutral-500">Same notes, new backbone, zero VPS bill to start</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. SCREENSHOTS (carousel) ============ */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Screenshots</p>
          <p className="mt-4 text-sm text-neutral-600 max-w-3xl" data-reveal="50">Real UI proof: auth, dashboard, mobile. If backend is offline when you click demo, these still show exactly how it works.</p>
          <div className="mt-8" data-reveal="100">
            <ScreenshotCarousel items={gallery} />
          </div>
        </div>
      </section>

      {/* ============ 7. FAQ ============ */}
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

      {/* ============ 8. LIVE DEMO STATUS ============ */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Live Demo Status</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="100">Local PC, not yet 24/7 VPS.</h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-4" data-reveal="150">
            <div className="border border-emerald-200 rounded-2xl p-6 bg-paper">
              <p className="font-display font-bold text-xs tracking-[0.18em] uppercase text-emerald-700">✅ What works now</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700 leading-relaxed">
                {worksNow.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
            <div className="border border-amber-300 bg-amber-50/50 rounded-2xl p-6">
              <p className="font-display font-bold text-xs tracking-[0.18em] uppercase text-amber-700">🚧 What isn't production yet</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700 leading-relaxed">
                {notYet.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="160">
            <InteractiveCta variant="primary" href="https://robbyaliasaakbar.github.io/jobtracker/" external>
              Open Job Tracker <span aria-hidden="true">↗</span>
            </InteractiveCta>
            <span className="text-xs font-mono text-neutral-500">Frontend: /jobtracker/ • Auth: /jobtracker/auth.html</span>
          </div>
          <blockquote className="quote-block mt-8 text-sm sm:text-base text-neutral-600 leading-relaxed border-amber-300 bg-amber-50 rounded-r-2xl p-6" data-reveal>
            As of now the backend runs locally on my personal PC, not yet published online to a VPS for 24/7 running. It is live daily 08.00–21.00 WIB (UTC+7) when my PC is on. If my PC is off, the backend is also off and the login page may fail to reach the server. This is expected. The frontend + screenshots on this page still show exactly how it works.
          </blockquote>
        </div>
      </section>

      {/* ============ 9. DISCLAIMER ============ */}
      <section className="py-16 border-t border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow">Disclaimer</p>
            <h2 className="mt-4 font-display font-bold text-lg sm:text-xl tracking-tight">Frontend stable, backend local</h2>
            <blockquote className="quote-block mt-6 text-sm sm:text-base text-neutral-600 leading-relaxed">
              Validated with Tiel-Coder-35B via llama.cpp-server (flags in EXP 001). Times are build times (4-5h), not benchmark peaks. Demo backend online daily 08.00–21.00 WIB (UTC+7) when home PC on, unreachable outside those hours. I'm self-taught. Corrections welcome.
            </blockquote>
            <p className="mt-6 text-sm text-neutral-700 leading-relaxed">
              <strong>Live:</strong> <a className="underline hover:text-accent" href="https://robbyaliasaakbar.github.io/jobtracker/" target="_blank" rel="noopener">/jobtracker/</a> ·{' '}
              <strong>Auth:</strong> <a className="underline hover:text-accent" href="https://robbyaliasaakbar.github.io/jobtracker/auth.html" target="_blank" rel="noopener">/jobtracker/auth.html</a> ·{' '}
              <strong>Next:</strong> EXP 011 backend entrypoint (PHP 8.3 + SQLite auth.db, Docker :7002, 6 endpoints, Gmail OTP, opaque token 1h) ·{' '}
              <strong>Inference background:</strong> <a className="underline hover:text-accent" href="/exp001.html">EXP 001</a>
            </p>
          </div>
        </div>
      </section>

      {/* ============ 10. CTA ============ */}
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
          <p className="mt-6 text-xs text-neutral-500" data-reveal>
            Chain: <a className="underline hover:text-accent" href="/exp001.html">EXP 001 inference</a> → EXP 010 frontend → EXP 011 backend next.
          </p>
        </div>
      </section>
    </main>
  );
}
