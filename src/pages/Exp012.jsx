import Seo from '../components/shared/Seo.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import InteractiveCta from '../components/shared/InteractiveCta.jsx';
import StatusBadge from '../components/shared/StatusBadge.jsx';
import ScreenshotCarousel from '../components/experiment/ScreenshotCarousel.jsx';

/* ---------- specs ---------- */
const specs = [
  { label: 'Live App', value: '/miniLeads/ on GitHub Pages' },
  { label: 'Data API', value: 'Funnel :8443 to Docker :7005' },
  { label: 'Auth API', value: 'Funnel :443 to Docker :7002' },
  { label: 'Dataset', value: '2049 replica leads in SQLite' },
  { label: 'Build Size', value: '43 modules, ~367KB (~120KB gzip)' },
  { label: 'Local Dev', value: 'Vite dev server on :7006' },
  { label: 'Browser', value: 'Modern browsers, 375px to 1280px' },
  { label: 'Model Engine', value: 'Tiel-Coder-35B on llama.cpp' },
];

/* ---------- gallery (carousel) ---------- */
const gallery = [
  { n: '1.', title: 'Dashboard — light', tag: 'Dashboard', src: '/images/exp012-homepage-light.webp', alt: 'Mini Leads CRM homepage dashboard in light mode', w: 637, h: 959, caption: 'Dashboard (Light) — Total 2049, New 270, Qualified 321' },
  { n: '2.', title: 'Dashboard — dark', tag: 'Dashboard', src: '/images/exp012-homepage-dark.webp', alt: 'Mini Leads CRM homepage dashboard in dark mode', w: 637, h: 959, caption: 'Dashboard (Dark) — Charts preserve readable rank colors' },
  { n: '3.', title: 'Login — light', tag: 'Auth', src: '/images/exp012-auth-login-light.webp', alt: 'Mini Leads CRM login screen in light mode', w: 637, h: 959, caption: 'Login (Light) — Username or email with password visibility toggle' },
  { n: '4.', title: 'Login — dark', tag: 'Auth', src: '/images/exp012-auth-login-dark.webp', alt: 'Mini Leads CRM login screen in dark mode', w: 637, h: 959, caption: 'Login (Dark) — Same backend on port 7002, zero new auth code' },
  { n: '5.', title: 'Register — light', tag: 'Auth', src: '/images/exp012-auth-regis-light.webp', alt: 'Mini Leads CRM registration screen in light mode', w: 637, h: 959, caption: 'Register (Light) — Full profile inputs and Gmail OTP verification' },
  { n: '6.', title: 'Register — dark', tag: 'Auth', src: '/images/exp012-auth-regis-dark.webp', alt: 'Mini Leads CRM registration screen in dark mode', w: 637, h: 959, caption: 'Register (Dark) — Five-step lifecycle from signup to session issue' },
  { n: '7.', title: 'Settings — light', tag: 'Settings', src: '/images/exp012-setting-page-light.webp', alt: 'Mini Leads CRM settings page in light mode', w: 637, h: 959, caption: 'Settings (Light) — Readonly account card with role badge and theme selector' },
  { n: '8.', title: 'Settings — dark', tag: 'Settings', src: '/images/exp012-setting-page-dark.webp', alt: 'Mini Leads CRM settings page in dark mode', w: 637, h: 959, caption: 'Settings (Dark) — Preferences saved directly in local storage' },
];

/* ---------- details ---------- */
const detailSections = [
  {
    label: 'Shared Auth Reuse',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">EXP 011 produced a single unified auth backend, and EXP 012 proves customer number two. miniLeads calls the exact same <code className="code-inline">/api/login</code> and <code className="code-inline">/api/me</code> endpoints on port 7002. It stores its token under a distinct key (<code className="code-inline">crm.token</code>) in the browser, yet the token verification logic remains completely identical.</p>
        <p className="text-base text-neutral-700 leading-relaxed">The <code className="code-inline">apiMe</code> call works as an uncompromising gate. If there is no valid token, no customer data is ever fetched. We also enforced strict multi-user scoping: administrators can inspect every contact across the system, while regular users only retrieve rows matching their own verified email address. We applied an additive upgrade to the auth backend by adding nullable fields and dual-path login, tested eight out of eight scenarios in an isolated sandbox, and verified everything before shipping.</p>
      </>
    ),
  },
  {
    label: 'Honest Pagination',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">Production databases must tell the truth about their scale. Querying <code className="code-inline">GET /leads</code> returns a complete pagination payload containing total, page, limit, totalPages, count, and data. The server clamps page sizes strictly between 1 and 100 rows. If an incoming request asks for 500 items, the server enforces 100.</p>
        <p className="text-base text-neutral-700 leading-relaxed">Whenever a user requests an out-of-range page number, the server automatically clamps to the final available page so the table never shows an empty phantom screen. Early development relied on a hardcoded limit of 200 rows while claiming the total count was just the array length. We resolved that immediately by executing a true SQL count query against the entire 2049 dataset. The user interface provides 20, 50, and 100 row selectors alongside dynamic page indicators.</p>
      </>
    ),
  },
  {
    label: 'Interactive Charts',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">In miniLeads, the charts are not passive decorative graphics. They serve as primary interactive filters for the entire lead table. A single centralized color grading function (<code className="code-inline">chartTheme.js</code>) powers all three visualizations: the lead status bar, the pipeline stage donut, and the acquisition channel line chart.</p>
        <p className="text-base text-neutral-700 leading-relaxed">Tapping any segment on a chart instantly filters the table to display only matching contacts, and tapping the same segment again resets the filter. This behavior remains fully responsive across both mobile vertical views and desktop split screens. An essential lesson learned during local testing was that we must verify the actual code served to the browser. Stale development server caches misled us twice before we killed the process and opened clean browser tabs.</p>
      </>
    ),
  },
  {
    label: 'Data In and Out',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">Both bulk CSV uploads and manual single-entry forms funnel through a unified backend ingestion door at <code className="code-inline">POST /leads/ingest</code>. The deduplication algorithm evaluates normalized phone digits with at least seven numbers as well as normalized email strings. If an existing record belongs to the same user, it updates the row instead of creating a duplicate entry.</p>
        <p className="text-base text-neutral-700 leading-relaxed">Exporting CSV files is handled through an authorized fetch request. Standard HTML anchor tags cannot transmit Bearer tokens, so trying to trigger downloads through plain links failed authorization. We switched to an interactive button that attaches headers and handles the file blob. During automated testing, the built-in rate limiter blocked our own script with an HTTP 429 response. That proved the security perimeter was working properly, even against its creator.</p>
      </>
    ),
  },
  {
    label: 'React vs Vanilla',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">We picked React 18 for miniLeads because the application state is genuinely complex. The interface orchestrates four simultaneous search inputs, server pagination, three synchronized Chart.js views, CSV ingestion flows, theme switches, and alternate mobile card views. A vanilla JavaScript approach would have quickly grown into unmaintainable boilerplate.</p>
        <p className="text-base text-neutral-700 leading-relaxed">In contrast, this documentation article remains pure vanilla HTML and Tailwind CSS. Static long-form reading does not need JavaScript framework weight. We also committed to boring, proven CSS choices: explicit hex colors and standard dark variants. Fancy modern color notation failed silently in target browsers and caused blank buttons. Finally, we audited every label to remove draft words like demo and portfolio so the tool reads as real business software.</p>
      </>
    ),
  },
];

/* ---------- evidence log ---------- */
const evidence = [
  {
    title: 'E1. Two-Door Health Verification',
    badge: '200 OK / 401 Expected',
    badgeClass: 'text-emerald-600',
    desc: 'Checking data access on port 8443 and validating that the auth endpoint on port 443 safely rejects unauthenticated calls.',
    code: `curl -s https://aispec.tail06293c.ts.net:8443/health
{"ok":true}

curl -s https://aispec.tail06293c.ts.net/api/me -H "Authorization: Bearer dummy"
{"error":"Token tidak sah atau kedaluwarsa"}`,
    result: 'The data funnel answers cleanly, and the auth door correctly validates tokens before releasing user information.',
  },
  {
    title: 'E2. Server-Side Pagination Truth',
    badge: 'Exact 2049 Records',
    badgeClass: 'text-emerald-600',
    desc: 'The API reports accurate counts and automatically clamps oversized limits and out-of-range page requests.',
    code: `GET /leads?page=1&limit=20
-> total: 2049, page: 1, totalPages: 103, count: 20, data: [ ...first 20 rows... ]

GET /leads?page=2&limit=20
-> total: 2049, page: 2, totalPages: 103, count: 20, first ID differs from page 1

GET /leads?page=1&limit=500
-> limit clamped to 100, count: 100

GET /leads?page=999&limit=20
-> page clamped to 103, count: 9 (final records, never empty)`,
    result: 'The database executes genuine count queries and protects against memory overflow from oversized client limits.',
  },
  {
    title: 'E3. Authentication Scope and Data Isolation',
    badge: 'Multi-User Enforced',
    badgeClass: 'text-emerald-600',
    desc: 'Verifying that customer records are isolated per user account while administrators retain broad visibility.',
    code: `POST /api/login {"username":"admin","password":"[REDACTED]"}
-> 200 OK, token issued, role: "admin"

Isolation test:
User A inserts lead -> total for User A = 1
User B inspects leads -> total for User B = 0 (no data leakage)
User B attempts GET /leads/:id of User A -> 404 Not Found
User B attempts PUT /leads/:id of User A -> 404 Not Found
Admin inspects /leads -> returns all records across all users
Request without Authorization header -> 401 Unauthorized`,
    result: 'Per-user boundaries are strictly enforced on the server, not just hidden by client-side filters.',
  },
  {
    title: 'E4. Production Vite Build Receipt',
    badge: '43 Modules Compiled',
    badgeClass: 'text-neutral-500',
    desc: 'Compilation log showing public funnel URLs baked into the static bundle during build time.',
    code: `vite v6.2.0 building for production...
transforming (43) src/App.jsx
✓ 43 modules transformed.
dist/index.html                   2.10 kB │ gzip:  0.81 kB
dist/assets/index-D3BUY3DC.js   367.42 kB │ gzip: 119.85 kB

Grep verification in shipped bundle:
grep "https://aispec.tail06293c.ts.net:8443" dist/assets/index-D3BUY3DC.js -> MATCH
grep "https://aispec.tail06293c.ts.net" dist/assets/index-D3BUY3DC.js -> MATCH
grep "localhost" dist/assets/index-D3BUY3DC.js -> 0 occurrences in api constants`,
    result: 'The compiled asset contains no local machine references, allowing visitors to connect over public tunnels.',
  },
  {
    title: 'E5. Test Suite and Data Hygiene Receipts',
    badge: '14/14 Tests Passed',
    badgeClass: 'text-emerald-600',
    desc: 'All automated test cases passed and temporary rows were purged to preserve the exact count of 2049 records.',
    code: `npm test (CRM data backend): 6/6 tests passed
Isolated auth suite tests:   8/8 tests passed
Database backup snapshot:    leads.db.bak-20260914-1357
Orphan records check:        0 orphans detected
Final dataset record count:  SELECT COUNT(*) FROM leads -> 2049`,
    result: 'The entire test suite ran green, and test cleanup routines left the dataset in its original state.',
  },
];

/* ---------- failure tier 1 ---------- */
const tier1 = [
  {
    title: '1. The Localhost Shipped in Bundle Trap',
    badge: 'Build Environment Failure',
    symptom: 'The application worked smoothly on the local development machine. However, as soon as it was published to GitHub Pages, remote visitors could not log in and received immediate network errors.',
    diagnosis: <>Vite environment variables are baked in at compilation time, not evaluated at runtime. The build script was executed without loading production environment files, causing the bundle to ship with <code className="code-inline">http://localhost:7005</code> as its target. When visitors opened the page, their browsers attempted to query localhost on their own devices.</>,
    fix: <>We configured <code className="code-inline">.env.production</code> with explicit Tailscale Funnel URLs, rebuilt the application, and confirmed with grep that the compiled JavaScript contained the public domain names.</>,
    lesson: 'Client-side JavaScript always executes on the visitor machine. Always inspect the generated bundle to verify which backend addresses are baked in.',
  },
  {
    title: '2. Tailscale Funnel Exposed Only the Auth Door',
    badge: 'Networking Misconfiguration',
    symptom: 'The login process worked over the public internet, but fetching customer leads failed immediately. It felt like the tunnel was dropping connections even though Tailscale reported healthy status.',
    diagnosis: 'The public funnel was only routing port 443 to the auth service on port 7002. The CRM data server running on port 7005 was never assigned a public entry point. The tunnel was healthy, but half of our backend was locked inside.',
    fix: 'We added an additive funnel rule binding HTTPS port 8443 to local port 7005 without disturbing the auth gateway on port 443. Both doors were verified using curl.',
    lesson: 'Each independent microservice requires its own dedicated public port when tunneling to a home machine.',
  },
  {
    title: '3. Build Script Overwrote Its Own Source Template',
    badge: 'Deployment Pipeline Loop',
    symptom: 'After an initial build, the next compilation completed in a fraction of a second with a green status, but the application collapsed into an empty shell. The module counter dropped from 43 to just 4 modules.',
    diagnosis: <>Our deploy step copied the output <code className="code-inline">dist/index.html</code> back into the root directory. On the following run, Vite treated the compiled output as its source entry point, compiling already compiled code and stripping out the source tree.</>,
    fix: <>We established <code className="code-inline">index.template.html</code> as the single immutable source and treated the root <code className="code-inline">index.html</code> strictly as a build artifact. A rebuild restored all 43 modules.</>,
    lesson: 'A sudden drop in compiled module counts signals an entry point corruption rather than a configuration error.',
  },
];

/* ---------- failure tier 2 ---------- */
const tier2 = [
  ['4. Stale Development Server', 'The server served stale assets twice despite clean disks. Always verify the code served over HTTP, not merely the files on your drive.'],
  ['5. Hardcoded Port Flag Overrode Configuration', 'A command line flag kept the dev server on port 5173 despite configuration changes. Command line arguments always override configuration files.'],
  ['6. Framework Ignored Non-Prefixed Variables', 'The frontend variable returned undefined because it lacked the VITE prefix. Always test environment bindings within the framework runtime.'],
  ['7. Port Soup Confusion', 'Five arbitrary ports created development chaos. We consolidated them into a single centralized configuration where service numbers were clearly assigned.'],
  ['8. Unilateral Directory Restructuring', 'Attempting to isolate files without prior agreement caused workflow friction. Architectural conventions must be agreed upon before moving folders.'],
  ['9. Premature Execution on Clarifying Questions', 'I terminated a running server when asked a question instead of answering it. Questions require direct answers, and execution requires an explicit go.'],
  ['10. Process Termination Matched Active Shell', 'A broad pkill command matched the terminal session itself and disconnected the terminal. Always anchor process patterns or target specific process identifiers.'],
  ['11. Pagination Claimed False Totals', 'An early endpoint hardcoded a 200 row limit while presenting the array length as the full count. Production systems must execute true count queries.'],
  ['12. Password Policy and Username Handling', 'The original auth backend rejected chosen test credentials. We inspected the auth source code first, then extended login support through additive methods.'],
  ['13. Rate Limiter Blocked Automated Tests', 'Rapid test requests triggered the IP rate limit. That proved the security guard was active, but reminded us to respect request cooldown windows.'],
  ['14. Identical Color Variable in Dark Footer', 'The background and text used the same variable, making elements invisible. Foreground and background styles must maintain guaranteed contrast.'],
  ['15. Duplicate JSX Rendered Silently', 'A duplicate component slipped past the build without syntax errors. A successful build does not guarantee a visually correct interface.'],
  ['16. Mobile Header Overflow on Narrow Screens', 'The navigation bar broke on 360px viewport widths. We introduced a mobile hamburger menu and ensured small screen testing happens first.'],
  ['17. Prototype Copywriting Leaked to UI', 'Internal notes and demo labels were visible in the interface. We conducted a project-wide search to ensure customer-facing wording remains professional.'],
  ['18. Benign Favicon Security Policy Warning', 'The API server logged a harmless warning for missing browser icons. We verified that not every console notification represents a functional defect.'],
  ['19. Test Dataset Cleanliness', 'Temporary testing records threatened to pollute production analytics. We established strict cleanup routines that always restore the record count to 2049.'],
  ['20. Tunnel Outage Expectations', 'Running on a home machine means the backend is offline when the PC sleeps. We documented this as a natural operating parameter rather than a bug.'],
  ['21. Testing Against Stale Server Processes', 'A crashed backend left an older background process listening on the port. We added version probe checks to verify which instance handles incoming requests.'],
  ['22. Shell Script Variable Expansion Error', 'Unquoted variables caused curl commands to misinterpret whitespace as separate arguments. Always print and review test variables independently.'],
  ['23. Orphan Record Removal', 'An interrupted test suite left a single unowned row in the database. We built automated verification checks to ensure zero orphan entries remain.'],
  ['24. White Screen on Missing Authorization', 'When auth became mandatory, the UI crashed on empty payloads. We attached tokens to all fetch calls and introduced defensive fallbacks for API errors.'],
  ['25. Modern CSS Functions Rendered Blank', 'Experimental color notation caused buttons to render without styling in specific browsers. We rolled back to standard hex values and reliable Tailwind classes.'],
  ['26. Overly Complex Explanations', 'Excessive technical jargon obscured practical user impacts. Clear communication should always present user impacts first before diving into internal mechanics.'],
];

/* ---------- code ---------- */
/* backtick + ${} di-dalam code → escape di template literal biasa */
const CONFIG_API = `const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7005';

export async function request(path, options = {}) {
  const token = localStorage.getItem('crm.token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) {
    headers['Authorization'] = \`Bearer \${token}\`;
  }
  const response = await fetch(\`\${API_URL}\${path}\`, { ...options, headers });
  if (response.status === 401) {
    localStorage.removeItem('crm.token');
    window.location.reload();
  }
  return response.json();
}`;

const CONFIG_CHART = `const handleChartClick = (category, value) => {
  setActiveFilters(prev => {
    if (prev[category] === value) {
      const next = { ...prev };
      delete next[category];
      return next;
    }
    return { ...prev, [category]: value };
  });
  setCurrentPage(1); // reset to page 1 on filter switch
};`;

/* ---------- FAQ ---------- */
const faq = [
  {
    q: 'Why React for this app but vanilla for the article page?',
    a: <>The app juggles filters, pagination, three charts, CSV flows and theme in one state tree, so React earns its place. The article is static content, meaning vanilla HTML plus Tailwind is lighter and matches every other experiment page.</>,
  },
  {
    q: 'How can a static GitHub Page talk to your home PC?',
    a: <>Two Tailscale Funnel doors handle the traffic. Port 443 proxies to auth on port 7002, and port 8443 proxies to CRM data on port 7005. The JavaScript bundle bakes in those public URLs at build time. When the PC is turned off, the doors are closed and the page explains that honestly.</>,
  },
  {
    q: 'Why does the API sometimes not answer?',
    a: <>It is not running on a 24/7 cloud server yet. It lives on my personal home computer and stays online daily. Outside those operating hours any data request fails and the app shows a toast. Screenshots and curl logs remain as proof.</>,
  },
];

/* ---------- live status ---------- */
const worksNow = [
  'Live React application hosted on GitHub Pages',
  '2049 replica customer records with server-side pagination',
  'Interactive tap-to-filter charts for real-time table queries',
  'Bulk CSV import and export with duplicate phone and email detection',
  'Complete daylight and high-contrast dark theme modes',
  'Shared authentication login reusing EXP 011 backend',
  'Two secure Tailscale Funnel gateways verified by terminal receipts',
];

const notYet = [
  'Not running on a 24/7 high-availability cloud server',
  'Backend relies on personal computer remaining powered on',
  'Tailscale daemon and Docker containers require active host session',
  'Automated third-application tenant onboarding remains manual',
  'Production hardening and cloud deployment reserved for a future milestone',
];

export default function Exp012() {
  const ref = useScrollReveal();

  return (
    <main ref={ref} className="bg-white">
      <Seo
        title="Experiment 012 — Multi-User CRM With Server-Side Pagination, React + Vite, Live on GitHub Pages"
        description="MiniLeads CRM with shared auth backend: React + Vite, 2049 leads, server-side pagination, tap-to-filter charts, CSV import/export, dark mode, live on GitHub Pages via Tailscale Funnel."
        image="/images/experiments012/homepage-light.webp"
        path="/exp012.html"
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
                <li aria-current="page" className="font-semibold text-ink">Experiment 012</li>
              </ol>
            </nav>
            <a href="/experiments-list.html" className="arrow-link text-xs uppercase text-neutral-500" data-reveal>
              <span aria-hidden="true">&larr;</span> Back to Experiments
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="100">
              <p className="eyebrow">Experiment 012</p>
              <StatusBadge variant="live" label="Live" />
              <span className="text-xs font-mono text-neutral-500">React + Vite · Shared Auth · Two Funnels</span>
            </div>
            <h1 className="mt-6 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" data-reveal="200">
              Multi-User CRM With Server-Side Pagination, React + Vite, Live on GitHub Pages.
            </h1>
            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl" data-reveal="300">
              Can a second and heavier frontend, a React CRM handling 2049 rows with server-side pagination, interactive charts, CSV import and export, and dark mode, reuse the exact same auth backend from EXP 011 with zero new auth code, and ship live on GitHub Pages talking to a home PC over Tailscale Funnel?
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="350">
              <InteractiveCta variant="primary" href="https://robbyaliasaakbar.github.io/miniLeads/" external>
                Open Live App — /miniLeads/
              </InteractiveCta>
              <InteractiveCta variant="outline" href="/exp011.html">
                Shared Backend: EXP 011
              </InteractiveCta>
            </div>
            <p className="mt-4 text-xs text-neutral-500 font-mono" data-reveal="360">Same Tiel-Coder-35B model · React 18 + Vite 6 · 2049 leads · 2 Funnel doors · Online daily 08.00–21.00 WIB (UTC+7)</p>
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
            Built entirely with the same local model as EXP 010 and EXP 011. The frontend bundle is statically deployed to GitHub Pages. All customer data and authentication stay securely hosted on my personal computer through encrypted Tailscale Funnel connections.
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
              <p>Every time a developer creates a new application, they usually rebuild the login system and user database from zero. Doing that over and over creates a huge mess and wastes valuable time. In my previous experiment, I created one clean login system. In this experiment, I wanted to prove that my first login system could act as a single master key for my next applications without copying any code.</p>
              <p>This second project is a customer database containing 2049 business contacts, built with the help of my local AI assistant. It comes with full search, clickable charts that filter your lists, spreadsheet importing and exporting, and a clean dark theme.</p>
              <p>The visual application is hosted publicly on the web so anyone can open it. However, the database engine and customer records stay safely inside my personal computer at home. They communicate across the internet through a secure private tunnel that features two separate doors: one door for logging in, and one door for customer records.</p>
              <p>Because the database engine runs on my home computer, it is only active while my computer is turned on during the day. If my computer is off, the website still opens smoothly, but trying to log in will show a friendly alert that the server is currently sleeping. That is completely intentional and documented as part of running local software.</p>
              <p>In practical terms, I only need to maintain one login service for all my projects. When I build a third or fourth application in the future, I can simply connect it to my existing master key. That keeps my system organized, saves time, and prevents duplicate work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. EXPERIMENT DETAILS ============ */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Experiment Details</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Architectural Decisions and Engineering Tradeoffs</h2>
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

      {/* ============ 5. EVIDENCE LOG ============ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Evidence Log</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Standalone Evidence Log: Terminal Receipts and Verification</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">Every technical claim in this article is backed by verifiable command line outputs. Private authentication tokens and personal identifiers have been replaced with dummy values, while raw status codes and payload structures remain intact.</p>

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
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">All 26 Failures Documented Honestly</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">True engineering progress is defined by how bugs are diagnosed and resolved. Here are all 26 real issues encountered during development, divided into three major live session incidents and twenty-three focused takeaways.</p>

          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-accent">Tier 1 Incidents</span>
              <span className="text-xs text-neutral-400">Deep Dive Case Studies</span>
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
              <span className="text-xs text-neutral-400">23 Concise Engineering Lessons</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tier2.map(([title, text], i) => (
                <div key={i} className="border border-black/10 rounded-xl p-5 bg-paper" data-reveal={String((i % 4) * 30)}>
                  <p className="font-display font-bold text-xs text-ink">{title}</p>
                  <p className="mt-2 text-xs text-neutral-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. FRONTEND CODE / CONFIG ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Frontend Code</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">React State Management and Token Interceptor</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">The frontend coordinates multiple asynchronous flows through a streamlined API client. Below are the key patterns that keep requests secure and states in sync.</p>

          <div className="mt-8 space-y-6" data-reveal="150">
            <div>
              <p className="font-mono text-sm text-neutral-500">API Interceptor and Header Attachment — src/api.js (essence)</p>
              <pre className="code-block mt-4">{CONFIG_API}</pre>
            </div>
            <div>
              <p className="font-mono text-sm text-neutral-500">Tap to Filter Chart Interaction Handler (essence)</p>
              <pre className="code-block mt-4">{CONFIG_CHART}</pre>
            </div>
          </div>

          <div className="mt-10 border border-black/10 rounded-2xl p-8 sm:p-10 bg-white" data-reveal="150">
            <p className="eyebrow">Source Code</p>
            <h3 className="mt-4 font-display font-bold text-xl sm:text-2xl tracking-tight">The CRM is public. Read it yourself.</h3>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed max-w-2xl">You get the full frontend. React plus Vite, 43 modules, charts, CSV flow, dark mode. No secrets inside. The data API lives in its own repo with its own README.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <InteractiveCta variant="primary" href="https://github.com/robbyaliasaakbar/robbyaliasaakbar.github.io/tree/main/miniLeads" external>
                View frontend source
              </InteractiveCta>
              <InteractiveCta variant="primary" href="https://github.com/robbyaliasaakbar/mini-leads-service-api--backend" external>
                View backend API
              </InteractiveCta>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 8. NETWORKING ARCHITECTURE ============ */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Networking Architecture</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Two-Funnel Infrastructure: Static Frontend to Local Backend</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">Connecting a static website hosted on GitHub Pages to a database on a home computer requires a clean network bridge. Tailscale Funnel makes this possible without opening hazardous router ports.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6" data-reveal="150">
            <div className="border border-black/10 rounded-2xl p-6 bg-paper">
              <p className="font-display font-bold text-xs tracking-[0.18em] uppercase text-accent">Door 1: Authentication Gateway</p>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">Public URL: <code className="code-inline">https://aispec.tail06293c.ts.net</code></p>
              <p className="mt-2 text-sm text-neutral-700 leading-relaxed">Internal Target: Docker container on port 7002 (PHP auth engine from EXP 011).</p>
              <p className="mt-2 text-xs text-neutral-500 leading-relaxed">Handles user registration, Gmail OTP delivery, password hashing, and token generation across all applications.</p>
            </div>
            <div className="border border-black/10 rounded-2xl p-6 bg-paper">
              <p className="font-display font-bold text-xs tracking-[0.18em] uppercase text-accent">Door 2: CRM Data Gateway</p>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">Public URL: <code className="code-inline">https://aispec.tail06293c.ts.net:8443</code></p>
              <p className="mt-2 text-sm text-neutral-700 leading-relaxed">Internal Target: Docker container on port 7005 (Node and Express CRM service).</p>
              <p className="mt-2 text-xs text-neutral-500 leading-relaxed">Executes server-side pagination, CSV ingestion, record deduplication, and per-user contact isolation.</p>
            </div>
          </div>

          <blockquote className="quote-block mt-8 text-sm sm:text-base text-neutral-700 leading-relaxed border-black/20 bg-paper rounded-2xl p-6" data-reveal>
            Both public endpoints terminate encrypted TLS connections at the machine perimeter. The static React bundle downloads into the visitor browser and communicates directly with both gateways without requiring any intermediary cloud servers.
          </blockquote>
        </div>
      </section>

      {/* ============ 9. SCREENSHOTS (carousel) ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Screenshots</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Light and Dark Themes, Side by Side Proof</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">Every view in miniLeads supports both daylight clarity and high-contrast dark mode. Charts keep their semantic colors across both themes so data stays readable without visual confusion.</p>
          <div className="mt-8" data-reveal="150">
            <ScreenshotCarousel items={gallery} />
          </div>
        </div>
      </section>

      {/* ============ 10. FAQ ============ */}
      <section className="py-20 bg-neutral-50">
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

      {/* ============ 11. LIVE STATUS ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Live Status</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="100">Live Status — Live Frontend, Home-PC Backend</h2>
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
          <blockquote className="quote-block mt-8 text-sm sm:text-base text-neutral-600 leading-relaxed border-amber-300 bg-amber-50 rounded-r-2xl p-6" data-reveal>
            Frontend is live 24/7 on GitHub Pages. Backend runs on my personal PC and answers only while it is on (funnel :443 and :8443). Off-hours login and data requests fail with a toast, which is expected. Screenshots and curl logs show how it works.
          </blockquote>
        </div>
      </section>

      {/* ============ 12. DISCLAIMER ============ */}
      <section className="py-16 border-t border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow">Disclaimer</p>
            <h2 className="mt-4 font-display font-bold text-lg sm:text-xl tracking-tight">Disclaimer — Live Frontend, Local Backend, Not Production-Hardened</h2>
            <blockquote className="quote-block mt-6 text-sm sm:text-base text-neutral-600 leading-relaxed">
              Validated with the exact same Tiel-Coder-35B model through llama.cpp-server (inference flags in EXP 001). All customer records use sanitized replica data, and company identifiers have been redacted per approval. Authentication secrets, session tokens, and passwords are never displayed.
            </blockquote>
            <p className="mt-6 text-sm text-neutral-700 leading-relaxed">
              <strong>First Customer:</strong> <a className="underline hover:text-accent" href="/exp010.html">EXP 010 (Job Tracker)</a> ·{' '}
              <strong>Shared Backend:</strong> <a className="underline hover:text-accent" href="/exp011.html">EXP 011 (:7002)</a> ·{' '}
              <strong>Second Customer:</strong> EXP 012 (<a className="underline hover:text-accent" href="https://robbyaliasaakbar.github.io/miniLeads/" target="_blank" rel="noopener">/miniLeads/</a>, :7005 and :7002) ·{' '}
              <strong>Machine:</strong> <a className="underline hover:text-accent" href="/exp001.html">EXP 001</a>
            </p>
          </div>
        </div>
      </section>

      {/* ============ 13. CTA ============ */}
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
