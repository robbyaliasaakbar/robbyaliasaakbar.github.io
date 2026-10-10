import Seo from '../components/shared/Seo.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import InteractiveCta from '../components/shared/InteractiveCta.jsx';
import StatusBadge from '../components/shared/StatusBadge.jsx';
import ScreenshotCarousel from '../components/experiment/ScreenshotCarousel.jsx';

/* ---------- gallery ---------- */
const gallery = [
  { n: '1.', title: 'Docker — 1 command up', tag: 'Docker', src: '/images/exp011-1.webp', alt: 'Docker backend running on port 7002', w: 1049, h: 653, caption: 'Docker — 1 command up' },
  { n: '2.', title: 'Health — ok without login', tag: 'Health', src: '/images/exp011-2.webp', alt: 'Health check returning ok without login', w: 1047, h: 171, caption: 'Health — ok without login' },
  { n: '3.', title: 'Rate — 429 after 5 tries', tag: 'Limits', src: '/images/exp011-3.webp', alt: 'Rate limit returning 429 after 5 tries', w: 744, h: 452, caption: 'Rate — 429 after 5 tries' },
  { n: '4.', title: 'Auth — register to me', tag: 'Auth', src: '/images/exp011-4.webp', alt: 'Register verify login me flow with redacted secrets', w: 1048, h: 254, caption: 'Auth — register to me' },
  { n: '5.', title: 'CORS — preflight 204', tag: 'CORS', src: '/images/exp011-5.webp', alt: 'CORS preflight allowing frontend origin', w: 809, h: 452, caption: 'CORS — preflight 204' },
  { n: '6.', title: 'DB — structure only', tag: 'DB', src: '/images/exp011-6.webp', alt: 'SQLite schema showing 6 tables structure only', w: 1590, h: 368, caption: 'DB — structure only, no rows' },
];

/* ---------- specs ---------- */
const specs = [
  { label: 'CPU', value: 'Intel Core i5-11400F' },
  { label: 'RAM', value: '16GB DDR4 3200MT/s' },
  { label: 'GPU', value: 'RX 6700 XT 12GB' },
  { label: 'OS', value: 'Ubuntu Desktop 26.04 LTS' },
  { label: 'Model', value: 'Tiel-Coder-35B-A3B-MTP-UD-Q4_K_S.gguf' },
  { label: 'Engine', value: 'llama.cpp-server' },
  { label: 'Stack', value: 'PHP 8.3 + PDO SQLite + Docker' },
  { label: 'Time / Status', value: 'Same 35B local coder / STABLE' },
];

/* ---------- details ---------- */
const detailSections = [
  {
    label: 'Problem',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">Am I capable of running login for many apps without rebuilding it every time? I ask because every new webapp needs register + OTP + login + forgot, and copying that 5 times drifts fast.</p>
        <p className="text-base text-neutral-700 leading-relaxed">I need 1 local auth service many frontends can share. Frontend only does <code className="code-inline">fetch</code>. All decisions (hash, OTP, expiry, token) live in 1 backend.</p>
      </>
    ),
  },
  {
    label: 'Why This Stack',
    body: <p className="text-base text-neutral-700 leading-relaxed">I locked PHP because it is the same family as my invoice <code className="code-inline">save.php</code>. I need <code className="code-inline">password_hash</code>, <code className="code-inline">random_bytes</code>, <code className="code-inline">PDO</code>, all built-in with 0 Composer packages. I chose Docker because my laptop has no native PHP and I cannot apt install. I chose raw SMTP because every line is traceable: <code className="code-inline">EHLO → STARTTLS → AUTH → MAIL → RCPT → DATA → QUIT</code>. Mailer libs and JWT are production upgrades, not v1.</p>,
  },
  {
    label: 'The Build',
    body: <p className="text-base text-neutral-700 leading-relaxed">I built it with the same <code className="code-inline">Tiel-Coder-35B-A3B-MTP-UD-Q4_K_S.gguf</code> via <code className="code-inline">llama.cpp-server</code>. AI handled syntax and boilerplate, decisions stayed with me. Flags are in <a className="underline hover:text-accent" href="/exp001.html">EXP 001</a>. Honest scope: local + auth flow working. Full hardening and deploy is a separate project, not here.</p>,
  },
  {
    label: 'Router',
    body: <p className="text-base text-neutral-700 leading-relaxed"><code className="code-inline">public/index.php</code> is the front door. I load <code className="code-inline">.env</code> with no library, check CORS (explicit list + same-host pass), answer <code className="code-inline">OPTIONS 204</code>, then route <code className="code-inline">health / register / verify / login / me / forgot / reset / lamaran</code>. Unknown paths get generic <code className="code-inline">404/405/500</code>. I keep messages generic on purpose, so no internal details leak to the browser.</p>,
  },
  {
    label: 'Auth Flow',
    body: (
      <ol className="space-y-4 list-none">
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">1.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><code className="code-inline">POST /api/register</code>: I create a <code className="code-inline">pending</code> user and send a 6-digit OTP via Gmail. Password must be <code className="code-inline">≥8 + upper + digit</code>, checked on the server, not just the browser.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">2.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><code className="code-inline">POST /api/verify</code>: I flip <code className="code-inline">pending → active</code> and issue a 64-hex opaque token (1 hour). Wrong 5 times locks for 10 minutes. Errors stay generic.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">3.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><code className="code-inline">POST /api/login + GET /api/me</code>: I check hash, issue token, then guard every open with <code className="code-inline">/api/me</code>. Dead token kicks back to login. I never tell whether the email or the password was wrong.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">4.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><code className="code-inline">POST /api/forgot + /api/reset</code>: I always answer generic <code className="code-inline">200</code> so emails cannot be harvested. Reset re-hashes and wipes all sessions, forcing relogin everywhere. OTP 5 min, reset 10 min, by my own setting for local use.</p></li>
      </ol>
    ),
  },
  {
    label: 'Data Model',
    body: <p className="text-base text-neutral-700 leading-relaxed">I keep 1 file <code className="code-inline">data/auth.db</code>: <code className="code-inline">users</code> (email UNIQUE, hash, nama, telepon, pending→active), <code className="code-inline">otps</code>, <code className="code-inline">reset_tokens</code>, <code className="code-inline">sessions</code> (token + 1h), <code className="code-inline">rate_limits</code>, <code className="code-inline">lamaran</code> (owner email + idx, company, position, tanggal, status, portal, link). I migrate with <code className="code-inline">PRAGMA table_info + ALTER</code>, so no data is lost. Honest tradeoff: I store OTP plaintext with short expiry locally so I can trace it. I will hash it in production later.</p>,
  },
  {
    label: 'Docker Run',
    body: <p className="text-base text-neutral-700 leading-relaxed">I run <code className="code-inline">php:8.3-cli + pdo_sqlite</code> in 1 image. Command is <code className="code-inline">php -S 0.0.0.0:7002 -t public public/index.php</code>. I start all with <code className="code-inline">docker compose up --build</code>, then serve the webapp with <code className="code-inline">python3 -m http.server 7001</code>. Data persists in <code className="code-inline">./data/</code> (gitignored). I need no native PHP at all.</p>,
  },
  {
    label: 'CORS + Limits',
    body: <p className="text-base text-neutral-700 leading-relaxed">Different port means different origin, so browsers block <code className="code-inline">fetch</code> until I allow it. I keep an explicit <code className="code-inline">CORS_ORIGINS</code> list (<code className="code-inline">:7001</code>, add <code className="code-inline">:7003</code> for the next app, no re-code) plus a same-host pass so Tailscale IP changes need no config. I cap sensitive endpoints at 5/min/IP via SQLite. Job Tracker as client: every <code className="code-inline">/api/lamaran</code> needs a token, I check <code className="code-inline">email from token == row owner</code>. UI detail stays in <a className="underline hover:text-accent" href="/exp010.html">EXP 010</a>.</p>,
  },
  {
    label: 'What Failed',
    body: (
      <ol className="space-y-4 list-none">
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">1.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><strong>CORS blocked everything first.</strong> My reasoning was flawed. I forgot different ports are different origins. I fixed it with an allowlist, not a wildcard.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">2.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><strong>Mailpit had to go.</strong> I removed it 2026-09-09. OTP must go via real Gmail App Password (16 chars, not login password). No shortcut.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">3.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><strong>1-hour kick looked like a bug.</strong> I got kicked to login and thought I broke sessions. It turned out to be expected expiry doing its job.</p></li>
      </ol>
    ),
  },
  {
    label: 'Evidence',
    body: (
      <>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-6">Small numbers that prove it runs: screenshots above, no cold-start tricks.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            ['Docker images', '1 image', 'php 8.3 + sqlite'],
            ['SQLite files', '1 file', '6 tables'],
            ['Auth endpoints', '6 endpoints', '+ health + tracker'],
            ['Rate', '5 / min', 'then 429'],
            ['OTP windows', '5 → 10 min', 'max 5 tries'],
            ['Dependencies', '0 Composer', 'vanilla SMTP'],
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
];

/* ---------- code ---------- */
const CONFIG_CORS = `$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$boleh = array_map('trim', explode(',', $cfg['CORS_ORIGINS']));
$izinkan = in_array($origin, $boleh, true);
// + same-host Tailscale pass, then:
header("Access-Control-Allow-Origin: $origin"); // only if allowed
// OPTIONS → 204, then route health/register/verify/login/me/forgot/reset/lamaran`;

const CONFIG_DB = `users(email UNIQUE, password_hash, nama, telepon, pending→active)
otps(email, kode 6-digit, +5min, max 5 tries)
sessions(token 64hex, +1h) -- opaque, SELECT to check, DELETE to revoke
lamaran(email owner + idx, company, position, tanggal, status, portal, link)`;

const CONFIG_GUARD = `$email = email_dari_token($pdo, $_SERVER['HTTP_AUTHORIZATION'] ?? '');
if ($email === null) json(401, ['error' => 'Token tidak sah atau kedaluwarsa']);`;

/* ---------- FAQ ---------- */
const faq = [
  {
    q: 'Why PHP + SQLite + Docker instead of Node + Postgres?',
    a: <>Locked for this scale: PHP built-ins already cover hash + random + PDO, SQLite is 1 file with zero server, Docker gives PHP without native install. Postgres + JWT + mailer libs are noted as production upgrades, not v1.</>,
  },
  {
    q: 'How can :7001 talk to :7002 without being blocked?',
    a: <>Explicit CORS allowlist plus same-host pass for Tailscale. Preflight OPTIONS returns 204 with Allow-Origin only for listed hosts. Next app (:7003) just gets added to the list.</>,
  },
  {
    q: 'Why does the API sometimes not answer?',
    a: <>Not on a 24/7 VPS yet. Home PC, online daily 08.00–21.00 WIB (UTC+7). Outside those hours fetch fails and frontend shows a toast. Screenshots + curl logs remain as proof.</>,
  },
];

/* ---------- live status ---------- */
const worksNow = [
  'Docker 1-command up',
  'Health ok without login',
  '6 auth endpoints',
  'Gmail OTP delivery',
  '1-hour opaque tokens',
  'Rate 5/min anti-spam',
  'Job Tracker per-user sync',
  'Reusable origins',
  'Online daily 08.00–21.00 WIB (UTC+7)',
];

const notYet = [
  'Not yet 24/7',
  'Still local (personal PC)',
  'Early-stage features',
  'Collecting feedback',
  'Hardening + deploy = separate project',
];

export default function Exp011() {
  const ref = useScrollReveal();

  return (
    <main ref={ref} className="bg-white">
      <Seo
        title="Experiment 011 — One Auth Backend for Many Frontends — PHP SQLite Docker"
        description="One PHP + SQLite + Docker auth backend for many frontends, built with only Tiel-Coder 35B local LLM: OTP via Gmail, opaque tokens, rate limits, per-user Job Tracker API, zero dependencies."
        image="/images/experiments011/docker-ps.webp"
        path="/exp011.html"
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
                <li aria-current="page" className="font-semibold text-ink">Experiment 011</li>
              </ol>
            </nav>
            <a href="/experiments-list.html" className="arrow-link text-xs uppercase text-neutral-500" data-reveal>
              <span aria-hidden="true">&larr;</span> Back to Experiments
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="100">
              <p className="eyebrow">Experiment 011</p>
              <StatusBadge variant="stable" label="Stable" />
              <span className="text-xs font-mono text-neutral-500">Full backend · Frontend in EXP 010 →</span>
            </div>
            <h1 className="mt-6 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" data-reveal="200">
              One Auth Backend for Many Frontends — PHP, SQLite &amp; Docker Entry Point in a Day.
            </h1>
            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl" data-reveal="300">
              Can one small auth backend (PHP + SQLite + Docker, no framework, no Composer) serve many frontends with real OTP, opaque tokens, rate limits and per-user Job Tracker sync, built with only a 35B local coder?
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="350">
              <InteractiveCta variant="primary" href="/exp010.html">
                Read EXP 010 frontend
              </InteractiveCta>
              <InteractiveCta variant="outline" href="/exp001.html">
                Machine: EXP 001
              </InteractiveCta>
            </div>
            <p className="mt-4 text-xs text-neutral-500 font-mono" data-reveal="360">Same Tiel-Coder-35B via llama.cpp-server · 1 image · 1 file · 0 deps · Live daily 08.00–21.00 WIB (UTC+7)</p>
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
            Same local coder as EXP 010 via <code className="code-inline">llama.cpp-server</code>. Inference flags in <a className="underline hover:text-accent" href="/exp001.html">EXP 001</a>. Backend runs via 1 Docker image (<code className="code-inline">php:8.3-cli + pdo_sqlite</code>), 1 SQLite file, 0 Composer packages.
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
              <p>Every new app needs login. Copying login 5 times gets messy fast. I asked myself if 1 small service could serve them all.</p>
              <p>I built one small login service on my own machine with local AI, no extra packages. My first try with scattered auth failed and drifted, so I switched to one place that decides everything.</p>
              <p>The Job Tracker is the first customer. Next apps just register their address, no re-code. It sends 6-digit codes via email, gives 1-hour passes, and blocks spam after 5 tries.</p>
              <p>It already runs on modest hardware with 1 Docker image and 1 database file. For now it lives on my home PC (08.00–21.00 WIB), stable for this experiment and not yet 24/7. Reliability matters more than specs.</p>
              <p>What that means in practice: I only maintain auth once. Every new frontend just does fetch. That is the whole trick.</p>
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

      {/* ============ 5. BACKEND CODE / CONFIG ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Backend Code</p>
          <div className="mt-8" data-reveal="100">
            <p className="font-mono text-sm text-neutral-500">Router CORS — public/index.php (essence, no secrets)</p>
            <pre className="code-block mt-4">{CONFIG_CORS}</pre>
          </div>
          <div className="mt-8" data-reveal="100">
            <p className="font-mono text-sm text-neutral-500">DB — src/db.php (schema only)</p>
            <pre className="code-block mt-4">{CONFIG_DB}</pre>
          </div>
          <div className="mt-8" data-reveal="100">
            <p className="font-mono text-sm text-neutral-500">Guard — token check (essence)</p>
            <pre className="code-block mt-4">{CONFIG_GUARD}</pre>
          </div>
          <blockquote className="quote-block mt-10 text-sm sm:text-base text-ink leading-relaxed max-w-3xl" data-reveal>
            No .env content, no SMTP secrets, no real OTP or tokens here. I keep those off the page on purpose.
          </blockquote>
          <div className="mt-10 border border-black/10 rounded-2xl p-8 sm:p-10 bg-white" data-reveal="150">
            <p className="eyebrow">Source Code</p>
            <h3 className="mt-4 font-display font-bold text-xl sm:text-2xl tracking-tight">The backend is public. Read it yourself.</h3>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed max-w-2xl">You get the full source. Router, 8 src modules, Docker setup, plus PRD notes. No secrets inside. <code className="code-inline">.env</code> and the database stay on my local machine.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <InteractiveCta variant="primary" href="https://github.com/robbyaliasaakbar/reuse-auth-backend-all-my-web.app" external>
                View source on GitHub
              </InteractiveCta>
              <span className="font-mono text-xs text-neutral-500 break-all">github.com/robbyaliasaakbar/reuse-auth-backend-all-my-web.app</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. SCREENSHOTS (carousel) ============ */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Screenshots</p>
          <p className="mt-4 text-sm text-neutral-600 max-w-3xl" data-reveal="50">Terminal proof: no UI to hide behind. If the API is offline when you try curl, these still show exactly how it answers.</p>
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

      {/* ============ 8. LIVE STATUS ============ */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Live Status</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="100">Local PC, not yet 24/7 VPS.</h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-4" data-reveal="150">
            <div className="border border-emerald-200 rounded-2xl p-6 bg-paper">
              <p className="font-display font-bold text-xs tracking-[0.18em] uppercase text-emerald-700">What works now</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700 leading-relaxed">
                {worksNow.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
            <div className="border border-amber-300 bg-amber-50/50 rounded-2xl p-6">
              <p className="font-display font-bold text-xs tracking-[0.18em] uppercase text-amber-700">What isn't production yet</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700 leading-relaxed">
                {notYet.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          </div>
          <div className="mt-8" data-reveal="160">
            <p className="font-mono text-sm text-neutral-500">Health — no login needed</p>
            <pre className="code-block mt-4">{`curl -s localhost:7002/api/health
# {"ok":true,"time":"2026-09-09T00:00:00Z"}`}</pre>
          </div>
          <div className="mt-8" data-reveal="160">
            <p className="font-mono text-sm text-neutral-500">Auth — register to me (redacted)</p>
            <pre className="code-block mt-4">{`curl -X POST localhost:7002/api/register -H 'Content-Type: application/json' -d '{"email":"you@mail.com","nama":"You","telepon":"08123456789","password":"Rahasia123","password_konfirmasi":"Rahasia123"}'
curl -X POST localhost:7002/api/verify -H 'Content-Type: application/json' -d '{"email":"you@mail.com","kode":"******"}'
curl -X POST localhost:7002/api/login -H 'Content-Type: application/json' -d '{"email":"you@mail.com","password":"Rahasia123"}'
curl localhost:7002/api/me -H 'Authorization: Bearer ******'`}</pre>
          </div>
          <p className="mt-4 text-xs text-neutral-500 font-mono" data-reveal="160">Local base: http://localhost:7002 • Tunnel when PC is on: https://aispec.tail06293c.ts.net • .env never shown</p>
          <blockquote className="quote-block mt-8 text-sm sm:text-base text-neutral-600 leading-relaxed border-amber-300 bg-amber-50 rounded-r-2xl p-6" data-reveal>
            Runs locally on my personal PC, live daily 08.00–21.00 WIB (UTC+7). Off-hours → unreachable, expected. Screenshots + curl logs above still show exactly how it answers.
          </blockquote>
        </div>
      </section>

      {/* ============ 9. DISCLAIMER ============ */}
      <section className="py-16 border-t border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow">Disclaimer</p>
            <h2 className="mt-4 font-display font-bold text-lg sm:text-xl tracking-tight">Local stable, not production-hardened</h2>
            <blockquote className="quote-block mt-6 text-sm sm:text-base text-neutral-600 leading-relaxed">
              Validated with the same Tiel-Coder-35B via llama.cpp-server (flags in EXP 001). OTP plaintext short-expiry locally for learning. I will hash it in production later, by my own note, not a guarantee for every setup. Mailpit removed 2026-09-09, Gmail only.
            </blockquote>
            <p className="mt-6 text-sm text-neutral-700 leading-relaxed">
              <strong>Frontend:</strong> <a className="underline hover:text-accent" href="/exp010.html">EXP 010</a> + <a className="underline hover:text-accent" href="https://robbyaliasaakbar.github.io/jobtracker/" target="_blank" rel="noopener">/jobtracker/</a> ·{' '}
              <strong>This:</strong> EXP 011 backend ·{' '}
              <strong>Machine:</strong> <a className="underline hover:text-accent" href="/exp001.html">EXP 001</a>
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
            Chain: <a className="underline hover:text-accent" href="/exp010.html">EXP 010 UI</a> → EXP 011 backend → <a className="underline hover:text-accent" href="/exp001.html">EXP 001 machine</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
