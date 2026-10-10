import Seo from '../components/shared/Seo.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import InteractiveCta from '../components/shared/InteractiveCta.jsx';
import StatusBadge from '../components/shared/StatusBadge.jsx';
import ScreenshotCarousel from '../components/experiment/ScreenshotCarousel.jsx';

/* ---------- specs ---------- */
const specs = [
  { label: 'Live view', value: 'Modern browser + internet' },
  { label: 'Live login', value: 'Supabase Auth, email code' },
  { label: 'Live apps', value: '/jobtracker/, /contentOS/, /miniLeads/' },
  { label: 'Cloud home', value: 'Supabase free tier, 500MB, 50k MAU' },
  { label: 'Data moved', value: '2050 leads, content rows, lamaran rows' },
  { label: 'Still at home', value: 'n8n, evolution, postgres, auth :7002' },
  { label: 'Test gate', value: 'RLS negative 0, E2E green, 0 funnel hits' },
  { label: 'Model', value: 'mimo v2.6 flash via opencode' },
];

/* ---------- gallery (carousel) ---------- */
const gallery = [
  { n: '1.', title: 'Blocked — Four Countries, Zero Bytes', tag: 'Terminal', src: '/images/exp017-public-blocked.webp', alt: 'Terminal showing forced public requests answered not found while a control request works', w: 800, h: 500, caption: 'Blocked — the public door answers not found, 29 Sep 2026' },
  { n: '2.', title: 'DNS Back — Door Still Shut', tag: 'Terminal', src: '/images/exp017-dns-health.webp', alt: 'Terminal showing DNS over HTTPS answers with two public IP addresses after the outage', w: 800, h: 500, caption: 'DNS back — names resolve again while the door stays shut' },
  { n: '3.', title: 'Locked — Anonymous Query Denied', tag: 'Supabase', src: '/images/exp017-rls-deny.webp', alt: 'Supabase SQL editor with row level policies and an empty count for the anonymous role', w: 800, h: 500, caption: 'Locked — anonymous query comes back empty' },
  { n: '4.', title: 'Moved — Two Thousand Fifty Rows Clean', tag: 'Supabase', src: '/images/exp017-seed-2050.webp', alt: 'Supabase SQL editor showing status counts after the leads seed moved', w: 800, h: 500, caption: 'Moved — counts read back from the new home' },
  { n: '5.', title: 'Cross User — Other Account Sees Zero', tag: 'Supabase', src: '/images/exp017-cross-user.webp', alt: 'Supabase SQL editor showing zero rows for an account that does not own the data', w: 800, h: 500, caption: 'Cross user — another account sees zero rows' },
  { n: '6.', title: 'Closed — Edge Function Wants JWT', tag: 'Terminal', src: '/images/exp017-edge401.webp', alt: 'Terminal calling the extract edge function without a token', w: 800, h: 500, caption: 'Closed — edge function asked for a token first' },
  { n: '7.', title: 'Code Only — No Link For Scanners', tag: 'Supabase', src: '/images/exp017-otp-code.webp', alt: 'Supabase password reset email template with code only body and no link', w: 800, h: 500, caption: 'Code only — bare code in the body, link removed' },
  { n: '8.', title: 'Open — Login From The Real Internet', tag: 'App', src: '/images/exp017-login-page-live.webp', alt: 'JobTracker login page live with sample ledger panel marked as demo data', w: 800, h: 500, caption: 'Open — live login, right side is sample data' },
  { n: '9.', title: 'Detached — Zero Funnel Hits', tag: 'Terminal', src: '/images/exp017-nol-funnel.webp', alt: 'Terminal grepping the live bundle for old funnel and localhost addresses', w: 800, h: 500, caption: 'Detached — zero hits for the old funnel in the live bundle' },
  { n: '10.', title: 'Retired — Old Servers Stay Down', tag: 'Terminal', src: '/images/exp017-old-backend-die.webp', alt: 'Terminal checking stopped backend containers and the auth port that stays up', w: 800, h: 500, caption: 'Retired — old backend containers are stopped' },
];

/* ---------- details ---------- */
const detailSections = [
  {
    label: 'Trace Before You Touch',
    note: 'K01 to K08, three way test',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">I traced eight findings before I changed anything. DNS was dead first, then the funnel door, then I found my own test lying to me because it ran from inside the network. I fixed the method, DoH for names, forced public IP with curl resolve, remote nodes on check host. Every claim on this page passed that three way gate.</p>
        <p className="text-base text-neutral-700 leading-relaxed">I developed this page with the hosted model <code className="code-inline">mimo v2.6 flash via opencode</code>. I led research, architecture, review, and test, while Udin typed code and suggestions.</p>
      </>
    ),
  },
  {
    label: 'Option B, Move Everything',
    note: 'Supabase auth, database',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">I weighed three options, keep the home backend, move only auth, or move it all. I chose the full move. Frontend on GitHub Pages now talks straight to Supabase, so the broken funnel door and the laptop dependency leave the critical path. The rate bucket problem retires with the old backend too.</p>
        <p className="text-base text-neutral-700 leading-relaxed">Supabase is a service, yes, but it is open source and self hostable later, free tier covers 500MB database, 50k monthly users, and 2GB egress. No monthly bill, same as my home setup.</p>
      </>
    ),
  },
  {
    label: 'Row Locks From Minute One',
    note: 'RLS, own rows or admin',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">The tables got row locks before any data landed. The rule translates my old backend exactly, a user reads their own rows, an admin reads all, the stranger reads nothing. I checked the negative path twice, anonymous role came back empty, and a normal account cannot promote itself to admin.</p>
        <p className="text-base text-neutral-700 leading-relaxed">My proof is the SQL editor shots and the policy list. Row locks live in the database, not in my frontend, so even a stolen anon key opens nothing.</p>
      </>
    ),
  },
  {
    label: 'Same Shape, New Home',
    note: 'RPC and Edge Functions keep the shape',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">Not everything is a plain table read. CSV export, dashboard counts, ingest with dedup, and two parsing helpers needed real logic. I moved them to database functions and two Edge Functions, and I kept the response shape identical to my old Express routes, so the frontend only swapped the auth layer and the base URL, no screen rewrite.</p>
        <p className="text-base text-neutral-700 leading-relaxed">One behavior did change on purpose. The extract helper used to be open, now it demands a signed token and answers 401 without it. I logged that as a fix, not as an accident.</p>
      </>
    ),
  },
  {
    label: 'One App At A Time',
    note: 'cutover, verify, rollback path open',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">No big bang. Each app moved only after its checks passed live, seed counts, filters, export, and row locks. The old backend stayed available as my rollback the whole time, and only after three apps passed I stopped the old containers with restart turned off, so they never wake up on reboot.</p>
        <p className="text-base text-neutral-700 leading-relaxed">Old token keys died with the old backend, so every user logs in one more time. That cost was small and I wrote it down instead of hiding it.</p>
      </>
    ),
  },
];

/* ---------- evidence log ---------- */
const evidence = [
  {
    title: 'E1. Names Resolve, Door Still Shut',
    badge: 'NOERROR Then 404',
    badgeClass: 'text-emerald-600',
    desc: 'DNS over HTTPS answers from two providers, then a forced public request still misses the app.',
    code: `dig @ns1.dnsimple.com aispec.tail06293c.ts.net A
status: NOERROR, answers: 103.84.155.217, 103.84.155.153

curl -H 'accept: application/dns-json' 'https://cloudflare-dns.com/dns-query?name=aispec.tail06293c.ts.net&type=A'
Status: 0

curl --resolve aispec.tail06293c.ts.net:443:103.84.155.153 https://aispec.tail06293c.ts.net/
HTTP 404 {"error":"Not found"}`,
    result: 'Names answer again, the app behind the door still does not open.',
  },
  {
    title: 'E2. Row Locks Deny The Stranger',
    badge: 'Anon 0 Rows',
    badgeClass: 'text-emerald-600',
    desc: 'Anonymous role reads nothing, and a normal account cannot raise its own role.',
    code: `select tablename, policyname from pg_policies where schemaname = 'public'
leads  own rows or admin
profiles  own rows or admin

set local role anon
select count(*) from leads
0 rows, denied

update profiles set role = 'admin' where id = auth.uid()
0 rows affected`,
    result: 'Stranger sees zero, self promotion blocked, same rule as the old backend.',
  },
  {
    title: 'E3. Seed Arrived Clean',
    badge: '2050 / 0',
    badgeClass: 'text-emerald-600',
    desc: 'Total rows and rows without an owner, then the status spread for comparison with the old box.',
    code: `select count(*) as total,
       count(*) filter (where user_id is null) as tanpa_user
from leads
2050 / 0

select lead_status, count(*) from leads group by 1 order by 2 desc
7 status values, counts match the old box`,
    result: 'Two thousand fifty rows moved, none without owner, counts match.',
  },
  {
    title: 'E4. Edge Function Wants A Token',
    badge: '401 No Token',
    badgeClass: 'text-emerald-600',
    desc: 'The extract helper used to be open, now it rejects callers without a signed token.',
    code: `curl -s -X POST 'https://yvnrzfgxsjzjsxkgjcfn.supabase.co/functions/v1/leads-extract' \\
  -H 'Content-Type: application/json' -d '{"text":"..."}'
HTTP:401
{"code":"UNAUTHORIZED_NO_AUTH_HEADER","message":"Missing authorization header"}`,
    result: 'No token, no parse, closed door with a clear reason.',
  },
  {
    title: 'E5. Old Servers Down, Bundle Clean',
    badge: '3 Stopped, 0 Hits',
    badgeClass: 'text-emerald-600',
    desc: 'Three old backends stopped with restart turned off, and the live bundle greps clean with a positive control.',
    code: `docker ps -a | grep -E 'infra-backend-api|contentos-backend|minileads-backend'
infra-backend-api-1                 Exited (0)     restart=no
backend-server-contentos-backend-1  Exited (137)   restart=no
backend-server-minileads-backend-1  Exited (137)   restart=no

grep -oE 'localhost|tail06293c|:7002|:7012' bundle.js | wc -l
0
grep -oE 'supabase|yvnrzfg' bundle.js | wc -l
4`,
    result: 'Old backends stay down, zero old addresses, positive hits for the new home.',
  },
];

/* ---------- failure tier 1 ---------- */
const tier1 = [
  {
    title: '1. The Public Door Answers Nothing',
    badge: 'K02 Infra OUTAGE',
    symptom: 'Names resolve fine, HTTPS from the internet dies with a broken pipe, every public URL answers nothing.',
    diagnosis: 'The funnel ingress cut the TLS stream, tracked upstream in the vendor issue I opened with support.',
    fix: 'I did not wait for the door. I moved auth and data to Supabase so the apps no longer need that path to work.',
    lesson: 'A working name is not a working door, always test the TLS path itself.',
  },
  {
    title: '2. The Test That Lied To Me',
    badge: 'K03 False Positive HIGH',
    symptom: 'My first verdict said public access worked.',
    diagnosis: 'The check ran from inside the same network, and MagicDNS answered like home, so the broken path never got tested.',
    fix: 'Three way method from then on, DoH for names, forced public IP with curl resolve, remote nodes on check host.',
    lesson: 'Never trust a check that lives on the same network as the service, and treat every green result as a hypothesis.',
  },
  {
    title: '3. One Rate Bucket For The Whole World',
    badge: 'K04 Auth GLOBAL',
    symptom: 'Five logins per minute, then everyone on earth gets locked out together.',
    diagnosis: 'The backend counted the proxy address, so all visitors shared one bucket.',
    fix: 'For the three moved apps the problem retired with the old backend, the local fix got cancelled as no longer needed.',
    lesson: 'Rate limits must count real clients, not the pipe they arrive through.',
  },
  {
    title: '4. The Reset Link That Was Ignored',
    badge: 'K09 Auth PIVOT',
    symptom: 'The new auth service ignored my redirect after password reset, the flow landed on its own page.',
    diagnosis: 'The platform default does not honor my old redirect the way my PHP did.',
    fix: 'I pivoted to plain OTP codes, the user copies the code instead of clicking through.',
    lesson: 'Study the defaults of the platform you move into before you promise the old behavior.',
  },
  {
    title: '5. The Link And The Code Together',
    badge: 'K13 Email PREFETCH',
    symptom: 'The code died before the user touched it, first use said already used.',
    diagnosis: 'Email scanners clicked the link inside my message, the single use code burned itself on the scan.',
    fix: 'The template body now carries the bare code only, no link at all.',
    lesson: 'Assume every email gets scanned by a machine before a human reads it.',
  },
];

/* ---------- failure tier 2 ---------- */
const tier2 = [
  ['K01', 'DNS never provisioned at first, now resolved, names answer again from two providers.'],
  ['K05', 'Three index files sat in dev mode, restored to the built version before push.'],
  ['K06', 'The cv screening webhook still depends on my laptop, decision still open, written here not hidden.'],
  ['K07', 'The funnel accepted odd ports without a warning, moved to standard caps so silence cannot lie again.'],
  ['K08', 'Old Node backend answered any origin with a wildcard, logged as low risk, not touched yet.'],
  ['K10', 'A cached bundle made a live test fail for fake reasons, fixed by reading the body length instead of trusting the label.'],
  ['K11', 'A reset file in the temp folder went stale after the user reset, temp path rethink needed.'],
  ['K12', 'The custom mail service locked my email template, unlocked after an app password was set.'],
];

const tier2Note = 'Recap: thirteen on record, three found before any user hit them, every entry here has a receipt or a reason.';

/* ---------- FAQ ---------- */
const faq = [
  { q: 'Is this a new login?', a: 'Yes, one more time. The three apps now use Supabase Auth, old token keys are retired, you log in once and you are done.' },
  { q: 'Did my old data move?', a: 'Yes. Two thousand fifty leads and the app rows came across, counts match, old boxes kept until checks passed.' },
  { q: 'Why Supabase instead of a VPS?', a: 'Free tier covers it, row locks come built in, and the stack is open source so I can self host later. No monthly bill.' },
  { q: 'Why row locks from minute one?', a: 'The stranger sees nothing, a user sees their own rows, an admin sees all. Same rule as my old backend.' },
  { q: 'Why cut over one app at a time?', a: 'Each app had to pass live checks before the next one moved. My rollback path stayed open the whole time.' },
  { q: 'Why write down every failure?', a: 'Thirteen on record so far. The receipts are the proof, and the lessons only count if they are written.' },
];

/* ---------- live status ---------- */
const worksNow = [
  'Three apps live on GitHub Pages with Supabase login',
  'Row locks on, anonymous reads nothing, other accounts read nothing',
  'Seed verified, 2050 rows, zero without owner',
  'Edge functions answer 401 without a token',
  'Live bundles show zero old funnel addresses',
];

const notYet = [
  'cv screening still on the old auth :7002, that decision is open',
  'Funnel leftovers still answer on the side, the outage is not closed upstream',
  'Home PC still runs n8n, WhatsApp, postgres, and the old auth',
  'Free tier limits, hardening is a separate project',
];

export default function Exp017() {
  const ref = useScrollReveal();

  return (
    <main ref={ref} className="bg-white">
      <Seo
        title="Experiment 017 - Four Apps, One Door, Zero Funnel - Tracing Outages and Moving Auth Plus Data to Supabase"
        description="Thirteen home server failures traced with receipts, then auth and data of four apps moved to Supabase. Row locks from minute one, live checks, honest tradeoffs, zero VPS bill."
        image="/images/experiments017/public-blocked.webp"
        path="/exp017.html"
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
                <li aria-current="page" className="font-semibold text-ink">Experiment 017</li>
              </ol>
            </nav>
            <a href="/experiments-list.html" className="arrow-link text-xs uppercase text-neutral-500" data-reveal>
              <span aria-hidden="true">&larr;</span> Back to Experiments
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="100">
              <p className="eyebrow">Experiment 017</p>
              <StatusBadge variant="live" label="Live" />
              <span className="text-xs font-mono text-neutral-500">Supabase Auth, Postgres, Edge Functions, RLS, 10 verified captures</span>
            </div>
            <h1 className="mt-6 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.25]" data-reveal="200">
              Four Apps, One Door, Zero Funnel — Tracing Outages and Moving Auth Plus Data to Supabase
            </h1>
            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl" data-reveal="300">
              Can a home-based multi-app stack survive a broken public access path, and what does moving auth and data to a managed platform actually fix?
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="350">
              <InteractiveCta variant="primary" href="https://robbyaliasaakbar.github.io/jobtracker/" external>
                Open /jobtracker/
              </InteractiveCta>
              <InteractiveCta variant="outline" href="https://robbyaliasaakbar.github.io/contentOS/" external>
                Open /contentOS/
              </InteractiveCta>
              <InteractiveCta variant="outline" href="https://robbyaliasaakbar.github.io/miniLeads/" external>
                Open /miniLeads/
              </InteractiveCta>
              <InteractiveCta variant="outline" href="https://robbyaliasaakbar.github.io/cv_screening/" external>
                Open /cv_screening/
              </InteractiveCta>
            </div>
            <p className="mt-4 text-xs text-neutral-500 font-mono" data-reveal="360">mimo v2.6 flash via opencode · Supabase Auth, Postgres, Edge Functions · 10 verified captures · 0 VPS bill · 29 Sep 2026</p>
            <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-5" data-reveal="380">
              <p className="text-xs text-neutral-600 leading-relaxed">My three apps now log in through Supabase Auth, not the shared backend of EXP 011 anymore. I did not copy auth, I moved it. Old token keys jobTracker.token, crm.token, and content.token are retired, so you log in one more time and then you are done. The old shared auth detail still lives in <a href="/exp011.html" className="underline hover:text-accent">EXP 011</a>. The :7002 backend stays alive for cv screening only.</p>
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
            Four apps live on GitHub Pages, three with cloud login. My home PC now only carries the side paths, n8n, WhatsApp, postgres, and the old auth for cv screening.
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
              <p>1. My four apps shared one front door, when the door broke nobody from outside could get in</p>
              <p>2. I checked the pipes one by one, thirteen problems written down with receipts</p>
              <p>3. Then I moved login and data to Supabase, the cloud does the guarding with row locks</p>
              <p>4. Old data came along, two thousand fifty leads arrived clean, counts match the old box</p>
              <p>5. The three apps now work without my laptop being open, still zero VPS bill</p>
              <p>6. Everything that broke is written here, no hidden magic</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. EXPERIMENT DETAILS ============ */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Experiment Details</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Tracing The Broken Door, Then Moving The House</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">This experiment pairs two stories, the tracing of a broken public path and the move to a managed platform. Here are the five decisions I made to get four apps through both without changing how they behave.</p>
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
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Standalone Evidence Log: Locks, Moved Data, Zero Funnel</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">I back every claim on this page with verifiable command line outputs from 29 Sep 2026. I never show passwords or full tokens, raw status and counts remain exact, and the positive control proves the greps really ran.</p>
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
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Thirteen Failures Written Honestly</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">I logged thirteen findings from the outage and the move. Five deep dives below, the rest as an honest list after. Three were found before any user hit them, and every fix carries a receipt.</p>
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
              <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-accent">Tier 2 Honest List</span>
              <span className="text-xs text-neutral-400">Eight Short Entries and Recap</span>
            </div>
            <div className="border border-black/10 rounded-2xl p-6 sm:p-8 bg-paper space-y-3 text-sm text-neutral-700 leading-relaxed" data-reveal>
              {tier2.map(([code, text], i) => (
                <p key={i}>{code} {text}</p>
              ))}
              <p>{tier2Note}</p>
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
            <p className="mt-4 text-base text-neutral-600 leading-relaxed max-w-2xl">The backend API and the database moved to Supabase. The repo that got the real update is the jobtracker backend. The other two backend repos stay as they were, almost untouched, and the frontend lives inside my porto repo.</p>
            <p className="mt-4 font-mono text-xs text-neutral-500 break-all">github.com/robbyaliasaakbar/backend-api-services-jobtracker (updated)</p>
            <p className="mt-1 font-mono text-xs text-neutral-500 break-all">github.com/robbyaliasaakbar/contentos-backend-api-service (as is)</p>
            <p className="mt-1 font-mono text-xs text-neutral-500 break-all">github.com/robbyaliasaakbar/mini-leads-service-api--backend (as is)</p>
            <p className="mt-4 text-xs text-neutral-500 leading-relaxed">No secrets inside any README. The <a href="https://github.com/robbyaliasaakbar/backend-api-services-jobtracker" target="_blank" rel="noopener" className="underline hover:text-accent">updated backend README</a> carries the receipts.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <InteractiveCta variant="primary" href="https://github.com/robbyaliasaakbar/backend-api-services-jobtracker" external>
                View backend API
              </InteractiveCta>
              <InteractiveCta variant="primary" href="https://github.com/robbyaliasaakbar/robbyaliasaakbar.github.io" external>
                View porto source
              </InteractiveCta>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 8. SCREENSHOTS (carousel) ============ */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Screenshots</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Blocked First Then Terminal Green At The End</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">I captured ten shots in strict order: the broken door first, the locks and the moved data in the middle, green receipts at the end. Terminals, Supabase dashboards, and one live login, all 800 by 500, all checked before upload.</p>
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
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="100">Live Status — Cloud Auth, Home PC On The Side</h2>
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
              Open /jobtracker/
            </InteractiveCta>
            <InteractiveCta variant="primary" href="https://robbyaliasaakbar.github.io/contentOS/" external>
              Open /contentOS/
            </InteractiveCta>
            <InteractiveCta variant="primary" href="https://robbyaliasaakbar.github.io/miniLeads/" external>
              Open /miniLeads/
            </InteractiveCta>
            <InteractiveCta variant="outline" href="https://robbyaliasaakbar.github.io/cv_screening/" external>
              Open /cv_screening/
            </InteractiveCta>
          </div>
          <div className="mt-6 border border-amber-300 bg-amber-50/60 rounded-xl p-5" data-reveal="170">
            <p className="font-display font-bold text-xs tracking-[0.18em] uppercase text-amber-700">Caution — the one app that has not moved</p>
            <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">cv screening is the only app still on the old path. Its webhook runs through n8n on my home PC behind the Tailscale port, so uploads need my laptop awake, and its login still uses the shared auth on :7002. Everything else on this card works with the laptop off.</p>
          </div>
          <div className="mt-6 border-t border-black/10 pt-6" data-reveal="175">
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-3xl">Old token keys are retired, so your first login after the move asks for email and code one more time. Free tier limits apply. Side paths like n8n and the old auth for cv screening still wake my home PC, which is expected and written in the status below.</p>
          </div>
          <blockquote className="quote-block mt-8 text-sm sm:text-base text-neutral-600 leading-relaxed border-amber-300 bg-amber-50 rounded-r-2xl p-6" data-reveal>
            Three apps live with cloud auth and row locks. My home PC now only carries the side paths, n8n, WhatsApp, postgres, and the old auth for cv screening. The outage shots are stamped 29 Sep 2026 as it happened, a later check the same day already answered 200 on the jobtracker path, so every blocked claim on this page carries its date. No passwords, tokens, or OTP codes ever shown.
          </blockquote>
        </div>
      </section>

      {/* ============ 11. DISCLAIMER ============ */}
      <section className="py-16 border-t border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow">Disclaimer</p>
            <h2 className="mt-4 font-display font-bold text-lg sm:text-xl tracking-tight">Disclaimer — Cloud Auth, Home Side Paths, Not Production-Hardened</h2>
            <blockquote className="quote-block mt-6 text-sm sm:text-base text-neutral-600 leading-relaxed">
              Built with mimo v2.6 flash via opencode. Snapshots taken 29 Sep 2026. Passwords, tokens, and OTP codes are never shown. Row locks and free tier limits stand as written.
            </blockquote>
            <p className="mt-6 text-sm text-neutral-700 leading-relaxed">
              <strong>Shared auth old story:</strong> <a className="underline hover:text-accent" href="/exp011.html">EXP 011 (:7002)</a> ·{' '}
              <strong>v1 jobtracker:</strong> <a className="underline hover:text-accent" href="/exp010.html">EXP 010 (vanilla)</a> ·{' '}
              <strong>Previous:</strong> <a className="underline hover:text-accent" href="/exp016.html">EXP 016 (v2 enterprise)</a> ·{' '}
              <strong>This:</strong> EXP 017 (Supabase move) ·{' '}
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
