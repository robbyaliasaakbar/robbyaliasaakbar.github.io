import Seo from '../components/shared/Seo.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import InteractiveCta from '../components/shared/InteractiveCta.jsx';
import StatusBadge from '../components/shared/StatusBadge.jsx';
import ScreenshotCarousel from '../components/experiment/ScreenshotCarousel.jsx';

/* ---------- specs ---------- */
const specs = [
  { label: 'Live App', value: '/contentOS/ on GitHub Pages' },
  { label: 'Data API', value: 'Funnel :9443 to Docker :7010 Node Express' },
  { label: 'Auth API', value: 'Funnel :443 to Docker :7002 (token key: content.token)' },
  { label: 'Engine', value: 'None (no n8n, no in system AI, manual curation)' },
  { label: 'Dataset', value: 'content.db isolated SQLite (3 sample rows, smallest slot ID)' },
  { label: 'Build Size', value: '384KB bundle (Chart.js included, localhost clean)' },
  { label: 'Local Dev', value: 'Vite dev server on :7011' },
  { label: 'Model Engine', value: 'Tiel-Coder-35B on llama.cpp' },
];

/* ---------- gallery (carousel) ---------- */
const gallery = [
  { n: '1.', title: 'Dashboard — light', tag: 'Dashboard', src: '/images/exp014-dashboard-light.webp', alt: 'ContentOS main dashboard and analytics in light mode', w: 1105, h: 1061, caption: 'Dashboard (Light) — Metrics, status bar chart, platform donut chart, and content table' },
  { n: '2.', title: 'Dashboard — dark', tag: 'Dashboard', src: '/images/exp014-dashboard-dark.webp', alt: 'ContentOS main dashboard and analytics in dark mode', w: 1105, h: 1131, caption: 'Dashboard (Dark) — Identical interactive charts and contrast tuned cards' },
  { n: '3.', title: 'Idea Form — light', tag: 'Form', src: '/images/exp014-form-light.webp', alt: 'ContentOS content idea and edit form in light mode', w: 1440, h: 969, caption: 'Idea Form (Light) — Ten column modal for quick idea drafting with link validation' },
  { n: '4.', title: 'Idea Form — dark', tag: 'Form', src: '/images/exp014-form-dark.webp', alt: 'ContentOS content idea and edit form in dark mode', w: 1440, h: 969, caption: 'Idea Form (Dark) — Validation rules enforced client side and server side' },
  { n: '5.', title: 'Login — light', tag: 'Auth', src: '/images/exp014-login-light.webp', alt: 'ContentOS shared authentication login view in light mode', w: 1440, h: 969, caption: 'Login (Light) — Reuses backend from EXP 011 on port 7002 with zero new auth code' },
  { n: '6.', title: 'Login — dark', tag: 'Auth', src: '/images/exp014-login-dark.webp', alt: 'ContentOS shared authentication login view in dark mode', w: 1440, h: 969, caption: 'Login (Dark) — Opaque session storage isolated under content.token key' },
  { n: '7.', title: 'Register — light', tag: 'Auth', src: '/images/exp014-regis-light.webp', alt: 'ContentOS account registration view in light mode', w: 1440, h: 969, caption: 'Register (Light) — Sign up interface with email OTP confirmation' },
  { n: '8.', title: 'Register — dark', tag: 'Auth', src: '/images/exp014-regis-dark.webp', alt: 'ContentOS account registration view in dark mode', w: 1440, h: 969, caption: 'Register (Dark) — Instant validation guards preventing duplicate emails' },
];

/* ---------- details ---------- */
const detailSections = [
  {
    label: 'Fourth Customer, Same Key',
    note: 'Failures 7 and 3',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">EXP 011 produced a single unified auth backend on port 7002, EXP 012 connected the CRM, EXP 013 onboarded CV screening, and ContentOS acts as customer number four. The portal speaks to the exact same <code className="code-inline">/api/login</code> and <code className="code-inline">/api/me</code> endpoints. It isolates its session under a distinct <code className="code-inline">content.token</code> key in local storage and manages themes via <code className="code-inline">content.theme</code>, yet the token verification lifecycle remains completely identical.</p>
        <p className="text-base text-neutral-700 leading-relaxed">Cross origin requests from the local Vite port 7011 required updating allowed origins in the backend environment. Because Docker compose only parses environment definitions during container recreation rather than standard restarts, the container required a full recreate cycle. Preflight checks were verified from two independent origins to ensure genuine access control. An empty bearer token immediately yields HTTP 401, confirming defensive fail closed authentication.</p>
      </>
    ),
  },
  {
    label: 'One File DB, Honest IDs',
    note: 'Failures 1 and 2',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">Data storage relies on a dedicated SQLite file <code className="code-inline">content.db</code>, isolated from CRM and user tables. Custom identifiers use the <code className="code-inline">content-xxx</code> format. Rather than endlessly incrementing indices, the generator inspects active keys and reuses the lowest vacant integer slot. If rows 001, 003, and 004 exist, a new record claims slot 002, keeping database references orderly and compact.</p>
        <p className="text-base text-neutral-700 leading-relaxed">The search filter <code className="code-inline">q</code> was expanded to query six record fields simultaneously, including platform, format, and status tags alongside text bodies. Record updates initially crashed due to a missing query parameter in the SQL update statement. Adding the missing argument and pairing it with a mandatory link check solved the problem. Marking content as posted without providing a valid destination URL is rejected with HTTP 400 Bad Request across both client forms and server endpoints.</p>
      </>
    ),
  },
  {
    label: 'Doors, Not Duplicate Servers',
    note: 'Failures 5, 6, and 4',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">Rather than attempting to share or overwrite port 8443 used by miniLeads, ContentOS exposes its Node Express data API through a dedicated Tailscale Funnel on port 9443. This keeps external traffic pathways clean, predictable, and isolated per application service.</p>
        <p className="text-base text-neutral-700 leading-relaxed">Container stability required transitioning from an Alpine base image to <code className="code-inline">node:22-slim</code>. The better-sqlite3 native driver crashed with segmentation faults (exit code 139) on Alpine due to missing prebuilt musl binaries. Adopting the Debian based slim image, a proven pattern from earlier projects, restored stability. Process restarts on the development host are strictly targeted by process identifier to prevent terminating neighbor backend runtimes.</p>
      </>
    ),
  },
  {
    label: 'Dev Versus Pages Switch',
    note: 'Failures 8, 12, and 9',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">Deploying a client rendered application on GitHub Pages while supporting local development requires a clean environment switch. The repository uses <code className="code-inline">index.template.html</code> as a single line toggle. In development mode, the file loads unbundled source code from <code className="code-inline">src/main.jsx</code>. For production release, the built bundle is compiled with public tunnel endpoints baked in, verified with automated grep checks.</p>
        <p className="text-base text-neutral-700 leading-relaxed">Assets compiled to the dist directory are copied to the site root using documented rollback procedures to prevent accidental asset loss. A build audit also caught an invisible footer bug where custom Tailwind utility classes had been dropped during pruning, establishing a strict verification checklist before closing releases.</p>
      </>
    ),
  },
  {
    label: 'Highlighting That Behaves',
    note: 'Failures 10 and 11',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">User interactions must deliver immediate visual clarity without degrading input ergonomics. Newly created or updated table rows trigger a 900ms soft accent highlight before returning to default borders. In earlier iterations, skeleton loaders unmounted active inputs during background data refreshes, causing user keystrokes to drop out of focus.</p>
        <p className="text-base text-neutral-700 leading-relaxed">Decoupling background refresh cycles from active input fields and binding table row keys to persistent database identifiers resolved focus disruption. Accent tones were preserved per system requirements while eliminating sticky outline bugs, and button hover states received explicit contrast rules for flawless dark theme legibility.</p>
      </>
    ),
  },
];

/* ---------- evidence log ---------- */
const evidence = [
  {
    title: 'E1. Service Health and Public Funnel Verification',
    badge: '200 OK Both Doors',
    badgeClass: 'text-emerald-600',
    desc: 'Testing both local backend port 7010 and public Tailscale Funnel port 9443 to prove end to end connectivity.',
    code: `curl -s http://localhost:7010/health
{"ok":true}

curl -s https://aispec.tail06293c.ts.net:9443/health
{"ok":true}`,
    result: 'Both internal docker container and external encrypted tunnel answer with healthy status.',
  },
  {
    title: 'E2. Shared Authentication and Token Verification',
    badge: 'Backend Port 7002',
    badgeClass: 'text-emerald-600',
    desc: 'Obtaining an authentication bearer token from EXP 011 auth backend and querying profile details.',
    code: `TOKEN=$(curl -s -X POST http://localhost:7002/api/login \\
  -H "Content-Type: application/json" \\
  -d '{"identifier":"admin","password":"[REDACTED]"}' | python3 -c '
import sys, json
print(json.load(sys.stdin).get("token", ""))
')

curl -s http://localhost:7002/api/me -H "Authorization: Bearer $TOKEN"
{"email":"admin@example.com","username":"admin","role":"admin"}`,
    result: 'Reuses shared backend authentication, issuing tokens compatible across client applications.',
  },
  {
    title: 'E3. Dashboard Aggregation and Negative Link Validation',
    badge: '400 Bad Request Verified',
    badgeClass: 'text-emerald-600',
    desc: 'Querying real time dashboard counts and verifying that posting without a link fails with HTTP 400.',
    code: `curl -s http://localhost:7010/dashboard -H "Authorization: Bearer $TOKEN"
{"total":3,"by_status":{"ide":1,"revision":1,"posted":1},"by_tempat":{"IG":1,"LinkedIn":1,"Reddit":1}}

curl -s -X POST http://localhost:7010/content/ingest \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"tempat":"IG","tipe":"reels","status":"posted"}'
{"error":"Link wajib diisi saat status posted"}`,
    result: 'Live metrics aggregate records accurately, and missing link submissions are rejected with HTTP 400 without modifying database state.',
  },
  {
    title: 'E4. Filter, Search, Pagination Clamping and Export Receipts',
    badge: 'Server Pagination Verified',
    badgeClass: 'text-emerald-600',
    desc: 'Verifying server side filters by platform, text search across formats, pagination bounds clamping, and filtered CSV export.',
    code: `curl -s "http://localhost:7010/content?tempat=IG" -H "Authorization: Bearer $TOKEN" | python3 -c '
import sys, json
print(json.load(sys.stdin)["total"])
'
1

curl -s "http://localhost:7010/content?q=reels" -H "Authorization: Bearer $TOKEN" | python3 -c '
import sys, json
print(json.load(sys.stdin)["total"])
'
1

curl -s "http://localhost:7010/content?page=99&limit=2" -H "Authorization: Bearer $TOKEN" | python3 -c '
import sys, json
d = json.load(sys.stdin)
print(d["page"], d["totalPages"])
'
2 2

curl -s "http://localhost:7010/content/export?tempat=IG" -H "Authorization: Bearer $TOKEN" | head -n 2
id,tempat,tipe,ide_konten,status,link_konten,tanggal
content-001,IG,reels,Sample Instagram Post,ide,,2026-09-24`,
    result: 'Query filters return exact match totals, out of range page numbers clamp cleanly to last page, and CSV exports reflect active filter parameters.',
  },
  {
    title: 'E5. Fail Closed Security and CORS Preflight Receipt',
    badge: 'Allowlist Enforced',
    badgeClass: 'text-emerald-600',
    desc: 'Verifying defensive fail closed responses on missing or invalid tokens, and confirming CORS headers across local dev and GitHub Pages.',
    code: `curl -s http://localhost:7010/content
{"error":"Login required"}

curl -s http://localhost:7010/content -H "Authorization: Bearer invalid_token"
{"error":"Invalid or expired token"}

curl -s -X OPTIONS https://aispec.tail06293c.ts.net/api/login \\
  -H "Origin: https://robbyaliasaakbar.github.io" \\
  -H "Access-Control-Request-Method: POST" -D - -o /dev/null | grep -i allow-origin
Access-Control-Allow-Origin: https://robbyaliasaakbar.github.io`,
    result: 'Unauthenticated requests are blocked immediately, and production CORS headers explicitly authorize GitHub Pages.',
  },
];

/* ---------- failure tier 1 ---------- */
const tier1 = [
  {
    title: '1. CORS Pitfalls Across Three Architectural Layers',
    badge: 'Configuration Trap (#7)',
    symptom: 'The development bundle was attempting to talk to public funnel URLs, container restarts failed to load new origin rules, and local preflight checks showed misleading success.',
    diagnosis: 'Soft container restarts do not reload modified environment file definitions. Testing requests from localhost to localhost created a false sense of security that failed when accessed over network boundaries.',
    fix: 'Added origin allowlist rules, performed a full container recreate cycle, confirmed active environment variables using container shell inspection, and validated preflight headers across two independent hosts.',
    lesson: 'A soft restart is not a recreate. Always verify running container environment variables directly.',
  },
  {
    title: '2. Alpine Segmentation Faults on Native SQLite Driver',
    badge: 'Container Runtime Trap (#6)',
    symptom: 'The backend container entered a persistent crash loop with exit code 139 and empty logs immediately after loading the database driver.',
    diagnosis: 'The Alpine Linux base image lacks precompiled musl libc binaries for the native database driver, triggering immediate segmentation faults at runtime.',
    fix: 'Replaced the Alpine base image with a Debian based node slim image, matching the stable container setup established during earlier CRM work.',
    lesson: 'Inspect container configurations from sister applications before debugging native compilation issues on Alpine.',
  },
  {
    title: '3. Skeleton Placeholders Consume Focus and Animation Timers',
    badge: 'State Lifecycle Trap (#11)',
    symptom: 'Accent highlight flashes failed to appear on updated rows, and typing search terms caused the text input to abruptly drop focus.',
    diagnosis: 'Background data refreshes mounted temporary skeleton placeholders across the interface, unmounting active DOM elements and interrupting user keystrokes.',
    fix: 'Maintained filter and search inputs permanently mounted, attached table row keys to persistent database identifiers, and decoupled background synchronization from input states.',
    lesson: 'Never allow background data sync to unmount or redraw user input fields currently in focus.',
  },
  {
    title: '4. Missing Positional Parameter Halts Record Updates',
    badge: 'Query Binder Trap (#2)',
    symptom: 'Submitting form edits crashed the server route with unhandled SQL parameter binder exceptions.',
    diagnosis: 'The SQL update statement defined ten positional placeholders but passed only nine argument variables in the execution array.',
    fix: 'Reconciled placeholder count, attached the missing link flag parameter, and added defensive parameter validation guards.',
    lesson: 'Test record modification routines on day one rather than assuming write symmetry from creation handlers.',
  },
];

/* ---------- failure tier 2 ---------- */
const tier2 = [
  ['5. Search Query Misses Format and Platform Fields (##1)', 'Initial search filters evaluated only the idea body text. Updated database query to scan platform, format, and status fields concurrently.'],
  ['6. Empty Token Treated as Authorization Bug (##3)', 'Missing authorization header returning HTTP 401 was initially investigated as a defect before confirming it is correct fail closed security.'],
  ['7. Broad Process Termination Halts Neighbor Services (##4)', 'Executing broad process termination commands halted sibling applications running on the machine. Replaced with strict process identifier tracking.'],
  ['8. Tailscale Funnel Port Conflict with Prior Application (##5)', 'Attempting to bind the CRM tunnel port created traffic routing collisions. Assigned a dedicated port on 9443 for ContentOS traffic.'],
  ['9. Stale Localhost References in Static Production Build (##8)', 'Production build inadvertently baked development localhost addresses. Added automated grep checks to verify zero localhost occurrences in release bundles.'],
  ['10. Transparent Footer Caused by Dropped Utility Classes (##9)', 'Unpurged custom utility classes caused footer text to render transparently. Added custom declarations to build configuration before deploy.'],
  ['11. Persistent Selection Ring Outlines on Table Rows (##10)', 'Focus outlines failed to clear after record selection. Added a 900ms cleanup timer and programmatic blur events to clear visual focus.'],
  ['12. Direct Root Build Overwrite Risks Asset Loss (##12)', 'Copying compiled assets directly into the project root risked overwriting source files. Established a clear deploy template switcher and backup routine.'],
];

/* ---------- code ---------- */
const CONFIG_API = `const API_URL = import.meta.env.VITE_API_URL

export async function fetchContentList(page = 1, filter = {}) {
  const token = localStorage.getItem('content.token')
  const query = new URLSearchParams({ page, ...filter })
  const response = await fetch(\`\${API_URL}/content?\${query}\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  })
  if (!response.ok) {
    throw new Error('Failed to retrieve content records')
  }
  return response.json()
}`;

const CONFIG_CHART = `export function StatusChart({ data, onSelectStatus }) {
  const options = {
    responsive: true,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index
        const selectedStatus = data.labels[index]
        onSelectStatus(selectedStatus)
      }
    }
  }
  return <Bar data={data} options={options} />
}`;

/* ---------- FAQ ---------- */
const faq = [
  {
    q: 'Why build a tracker instead of using Notion or Sheets?',
    a: <>Owning the frontend and the backend keeps it light and personal, and every lesson lands in my portfolio with receipts. Sheets cannot give me that.</>,
  },
  {
    q: 'Why does posting stay manual?',
    a: <>The app is a calendar and a tracker by decision. Editing and design stay in my hands. Version one proves tracking first, robots later.</>,
  },
  {
    q: 'What is the MCP agent idea about?',
    a: <>A future door that lets my AI helper save ideas straight into the app. Planned and written openly, not shipped. Version one is human fingers only.</>,
  },
  {
    q: 'Twelve failures on a portfolio page? Is that wise?',
    a: <>That is the point. Each one has a cause, a fix, and a check. A calm app means little without an honest log beside it.</>,
  },
  {
    q: 'Why does it fail when your PC is off?',
    a: <>No VPS by decision, home PC and secure tunnels (:443 auth, :9443 data). Off means doors closed and the page says so instead of pretending. Same honesty as EXP 010 through 013.</>,
  },
  {
    q: 'Why charts if the first plan said no charts?',
    a: <>The owner changed the call openly. Charts earn their place because tapping one filters the list. The amendment is written in the open with the bundle cost attached.</>,
  },
];

/* ---------- live status ---------- */
const worksNow = [
  'Live React application hosted on GitHub Pages',
  'Full content record lifecycle with client and server validation',
  'Server side pagination with automatic bounds clamping',
  'Interactive Chart.js integration with tap to filter triggers',
  'Shared authentication integration with isolated token storage',
  'Background polling updates every thirty seconds without page reloads',
  'High contrast dark mode with preserved specificity rules',
];

const notYet = [
  'Service runs on personal home computer rather than 24/7 cloud VPS',
  'Automated AI content scribe via MCP remains a planned milestone',
  'Single file SQLite database without clustering or failover',
  'Backend availability depends on host uptime and active tunnel doors',
  'Long term service hardening reserved for future infrastructure projects',
];

export default function Exp014() {
  const ref = useScrollReveal();

  return (
    <main ref={ref} className="bg-white">
      <Seo
        title="Experiment 014 - Content Tracking Web App With Server Side Pagination, React + Vite, Live on GitHub Pages"
        description="Content tracking web app with shared auth backend: React + Vite, Chart.js tap to filter, server side pagination, 12 failures on record, live on GitHub Pages."
        image="/images/experiments014/dashboard-light.webp"
        path="/exp014.html"
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
                <li aria-current="page" className="font-semibold text-ink">Experiment 014</li>
              </ol>
            </nav>
            <a href="/experiments-list.html" className="arrow-link text-xs uppercase text-neutral-500" data-reveal>
              <span aria-hidden="true">&larr;</span> Back to Experiments
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="100">
              <p className="eyebrow">Experiment 014</p>
              <StatusBadge variant="live" label="Live" />
              <span className="text-xs font-mono text-neutral-500">React + Vite · Shared Auth · Chart.js Filters · Tailscale Funnel</span>
            </div>
            <h1 className="mt-6 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" data-reveal="200">
              Content Tracking Web App With Server Side Pagination, React + Vite, Live on GitHub Pages.
            </h1>
            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl" data-reveal="300">
              Can a personal content tracker ship live on shared auth while keeping all 12 failures on the page?
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="350">
              <InteractiveCta variant="primary" href="https://robbyaliasaakbar.github.io/contentOS/" external>
                Open Live App — /contentOS/
              </InteractiveCta>
              <InteractiveCta variant="outline" href="/exp011.html">
                Shared Backend: EXP 011
              </InteractiveCta>
            </div>
            <p className="mt-4 text-xs text-neutral-500 font-mono" data-reveal="360">Same Tiel-Coder-35B model · React 18 + Vite 6 · 8 verified captures · 2 Funnel doors · Online daily</p>
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
            Built with the exact same local model as EXP 010, EXP 011, EXP 012, and EXP 013. The frontend is statically hosted on GitHub Pages. The data service runs inside Node Express on my personal computer, reachable via an encrypted Tailscale Funnel.
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
              <p>1. My GitHub looked fine but my social feeds were empty for months, so I built a small notebook that never loses a content idea</p>
              <p>2. You type an idea with a date and a platform, the board tracks it until you post it by hand, nothing posts itself</p>
              <p>3. One login opens all four of my apps, this one only added its own token key, zero login code was written twice</p>
              <p>4. Tap a chart and the list filters itself, new ideas pop in on their own about twice a minute, no refresh needed</p>
              <p>5. The page is public but the engines sleep in my home computer, when it is off the page says so honestly and the pictures above are the proof</p>
              <p>6. Everything that broke is written on this same page, twelve stories with receipts, and a robot scribe that writes ideas down for me is planned next, not promised today</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. EXPERIMENT DETAILS ============ */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Experiment Details</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Architectural Decisions and Engineering Tradeoffs</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">ContentOS was built as a dedicated personal tracking tool rather than an automated content factory. Here are the five foundational engineering decisions that shaped the platform architecture and resolved early development blockers.</p>
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
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Standalone Evidence Log: Terminal Receipts and Verification</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">Every architectural claim and backend endpoint is backed by verifiable command line outputs. Private authentication secrets, passwords, and personal tokens have been truncated, while raw status codes, JSON structures, and funnel mappings remain exact.</p>
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
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">All 12 Failures Documented Honestly</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">Engineering credibility is forged in transparency. Here are all twelve real defects encountered during the development of ContentOS, divided into four major incident deep dives and eight concise technical lessons.</p>
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-accent">Tier 1 Incidents</span>
              <span className="text-xs text-neutral-400">Four Deep Dive Case Studies</span>
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
              <span className="text-xs text-neutral-400">Eight Concise Technical Lessons</span>
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

      {/* ============ 7. FRONTEND ARCHITECTURE / CONFIG ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Frontend Architecture</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Interactive State Management and Chart Tap to Filter</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">The user interface is powered by React 18, Vite 6, and Chart.js. Below are the key patterns for state synchronization and interactive chart triggers.</p>
          <div className="mt-8 space-y-6" data-reveal="150">
            <div>
              <p className="font-mono text-sm text-neutral-500">API Data Fetching and Token Header — src/api.js (essence)</p>
              <pre className="code-block mt-4">{CONFIG_API}</pre>
            </div>
            <div>
              <p className="font-mono text-sm text-neutral-500">Chart Tap to Filter Interaction — src/StatusChart.jsx (essence)</p>
              <pre className="code-block mt-4">{CONFIG_CHART}</pre>
            </div>
          </div>
          <div className="mt-10 border border-black/10 rounded-2xl p-8 sm:p-10 bg-white" data-reveal="150">
            <p className="eyebrow">Source Code</p>
            <h3 className="mt-4 font-display font-bold text-xl sm:text-2xl tracking-tight">The source code is public. Prove it yourself.</h3>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed max-w-2xl">You get the full frontend. React and Vite, Chart.js tap to filter, server side pagination, and a content calendar. No secrets inside. The data API lives in its own repo with its own README.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <InteractiveCta variant="primary" href="https://github.com/robbyaliasaakbar/robbyaliasaakbar.github.io/tree/main/contentOS" external>
                View frontend source
              </InteractiveCta>
              <InteractiveCta variant="primary" href="https://github.com/robbyaliasaakbar/contentos-backend-api-service" external>
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
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Two-Door Network: Dedicated Data Gateway and Shared Auth</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">Connecting a static client application on GitHub Pages to local containers requires clean network controls. Tailscale Funnel creates public encrypted HTTPS doors directly to local services without exposing the host.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6" data-reveal="150">
            <div className="border border-black/10 rounded-2xl p-6 bg-paper">
              <p className="font-display font-bold text-xs tracking-[0.18em] uppercase text-accent">Door 1: Shared Authentication Gateway</p>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">Public URL: <code className="code-inline">https://aispec.tail06293c.ts.net</code></p>
              <p className="mt-2 text-sm text-neutral-700 leading-relaxed">Internal Target: Docker container on port 7002 (PHP auth engine from EXP 011).</p>
              <p className="mt-2 text-xs text-neutral-500 leading-relaxed">Handles account logins, email OTP verification, and session token checks across all four client applications.</p>
            </div>
            <div className="border border-black/10 rounded-2xl p-6 bg-paper">
              <p className="font-display font-bold text-xs tracking-[0.18em] uppercase text-accent">Door 2: Dedicated ContentOS Data Gateway</p>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">Public URL: <code className="code-inline">https://aispec.tail06293c.ts.net:9443</code></p>
              <p className="mt-2 text-sm text-neutral-700 leading-relaxed">Internal Target: Docker container on port 7010 (Node Express + SQLite content.db).</p>
              <p className="mt-2 text-xs text-neutral-500 leading-relaxed">Serves content records, dashboard aggregations, pagination metadata, and CSV exports on a dedicated port without conflicts.</p>
            </div>
          </div>
          <blockquote className="quote-block mt-8 text-sm sm:text-base text-neutral-700 leading-relaxed border-black/20 bg-paper rounded-2xl p-6" data-reveal>
            Both public gateways terminate encrypted TLS connections at the machine boundary. Static web pages download into the visitor browser and communicate with both endpoints without requiring intermediate cloud servers.
          </blockquote>
        </div>
      </section>

      {/* ============ 9. SCREENSHOTS (carousel) ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Screenshots</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Light and Dark Themes, Side by Side Proof</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">Every view in ContentOS supports daylight clarity and high contrast dark mode. All eight captures below were taken directly on live screens to document the actual production interface with real data records.</p>
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
          <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="160">
            <InteractiveCta variant="primary" href="https://robbyaliasaakbar.github.io/contentOS/" external>
              Open Live App — /contentOS/
            </InteractiveCta>
            <span className="text-xs font-mono text-neutral-500">Live frontend, home PC backend</span>
          </div>
          <div className="mt-6 border border-black/10 rounded-xl p-5 sm:p-6 bg-neutral-50" data-reveal="170">
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-3xl">Update Sep 2026: this app now has a separate internal MCP, use it if needed. The scribe planned above is shipped with receipts.</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <InteractiveCta variant="primary" href="https://github.com/robbyaliasaakbar/opencode-agents/tree/main/mcp-contentos" external>
                Use Internal MCP
              </InteractiveCta>
              <a href="/exp015.html" className="arrow-link font-display text-xs uppercase">Shipped story: EXP 015 <span aria-hidden="true">-&gt;</span></a>
            </div>
          </div>
          <blockquote className="quote-block mt-8 text-sm sm:text-base text-neutral-600 leading-relaxed border-amber-300 bg-amber-50 rounded-r-2xl p-6" data-reveal>
            Frontend live 24/7 on GitHub Pages. Backend runs on my personal PC (funnels :443 + :9443). Off → login/list fails with a message, expected. Screenshots + curl logs show how it works.
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
              Validated with the exact same Tiel-Coder-35B model through llama.cpp-server (inference flags in EXP 001). Replica records, no real user data. OTP, tokens, and passwords are never shown.
            </blockquote>
            <p className="mt-6 text-sm text-neutral-700 leading-relaxed">
              <strong>First UI:</strong> <a className="underline hover:text-accent" href="/exp010.html">EXP 010 (Job Tracker)</a> ·{' '}
              <strong>Shared backend:</strong> <a className="underline hover:text-accent" href="/exp011.html">EXP 011 (:7002)</a> ·{' '}
              <strong>Second customer:</strong> <a className="underline hover:text-accent" href="/exp012.html">EXP 012 (/miniLeads/)</a> ·{' '}
              <strong>Third customer:</strong> <a className="underline hover:text-accent" href="/exp013.html">EXP 013 (/cv_screening/)</a> ·{' '}
              <strong>This:</strong> EXP 014 (<a className="underline hover:text-accent" href="https://robbyaliasaakbar.github.io/contentOS/" target="_blank" rel="noopener">/contentOS/</a>) ·{' '}
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
