import Seo from '../components/shared/Seo.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import InteractiveCta from '../components/shared/InteractiveCta.jsx';
import StatusBadge from '../components/shared/StatusBadge.jsx';
import ScreenshotCarousel from '../components/experiment/ScreenshotCarousel.jsx';

/* ---------- specs ---------- */
const specs = [
  { label: 'MCP Server', value: 'server.js 182 lines, 6 tools, stdio' },
  { label: 'Agent', value: 'contentos-manager, primary, temp 0.7' },
  { label: 'Auth API', value: 'Funnel :443 to :7002, token in memory' },
  { label: 'Data API', value: 'Funnel :9443 to :7010 Node Express' },
  { label: 'Engine', value: 'Node 22, SDK 1.30.1, zod' },
  { label: 'Model', value: 'Muse Spark 1.3 via opencode zen' },
  { label: 'Dev Tools', value: 'opencode session tools' },
  { label: 'New Servers', value: 'Zero, reuse both funnels' },
];

/* ---------- gallery (carousel) ---------- */
const gallery = [
  { n: '1.', title: 'Agent Registered Globally', tag: 'Terminal', src: '/images/exp015-agent-list.webp', alt: 'Terminal listing global opencode agents with contentos-manager highlighted', w: 800, h: 500, caption: 'Agent list — contentos-manager.md sits beside the portfolio and n8n agents' },
  { n: '2.', title: 'Base Door Open Plus Empty Start', tag: 'Terminal', src: '/images/exp015-login.webp', alt: 'Terminal login receipt plus empty dashboard total zero', w: 800, h: 500, caption: 'Login — password typed blind, token shown as 8 chars, dashboard total 0' },
  { n: '3.', title: 'MCP Run Part 1 — Login Plus Create', tag: 'Terminal', src: '/images/exp015-mcp-crud1.webp', alt: 'MCP transcript start with login plus empty dashboard plus created content record', w: 800, h: 500, caption: 'CRUD 1 — translator login, dashboard 0, save created content-004' },
  { n: '4.', title: 'MCP Run Part 2 — Read Back', tag: 'Terminal', src: '/images/exp015-mcp-crud2.webp', alt: 'MCP transcript middle with created record JSON plus read back', w: 800, h: 500, caption: 'CRUD 2 — full JSON of content-004 plus get by id' },
  { n: '5.', title: 'MCP Run Part 3 — Edit Plus Delete Plus Clean', tag: 'Terminal', src: '/images/exp015-mcp-crud3.webp', alt: 'MCP transcript end with updated revision plus deleted record plus clean dashboard', w: 803, h: 500, caption: 'CRUD 3 — updated to revision, removed, dashboard back to 0' },
  { n: '6.', title: 'Live Board — Light', tag: 'Dashboard', src: '/images/exp015-dashboard-light-app.webp', alt: 'ContentOS live board in light mode with three admin dummy rows', w: 1105, h: 1061, caption: 'Board Light — public admin dummy rows 001 to 003' },
  { n: '7.', title: 'Live Board — Dark', tag: 'Dashboard', src: '/images/exp015-dashboard-dark-app.webp', alt: 'ContentOS live board in dark mode with three admin dummy rows', w: 1105, h: 1131, caption: 'Board Dark — identical board in dark theme' },
];

/* ---------- details ---------- */
const detailSections = [
  {
    label: 'Translator, Not a New Backend',
    note: 'MCP server.js, 182 lines',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">The MCP server is a thin translator between AI tools and the exact same REST endpoints the React frontend uses (<code className="code-inline">src/api.js</code> and <code className="code-inline">src/auth.js</code>). One file holds six tools, an in memory token slot, and the same posted requires link check the form enforces. Because the contract never changed, every frontend rule automatically applies to the AI path too.</p>
        <p className="text-base text-neutral-700 leading-relaxed">Development happened inside <code className="code-inline">opencode</code> with hosted model <code className="code-inline">Muse Spark 1.3 via opencode zen</code>, the first experiment in this portfolio not built with the local coder. The translator itself stays tiny on purpose so a beginner can read it end to end in one sitting.</p>
      </>
    ),
  },
  {
    label: 'Six Honest Tools',
    note: 'login, list, get, save, remove, dashboard',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed"><code className="code-inline">login</code> runs first and stores the token for the other five. <code className="code-inline">list</code> with filters checks for similar ideas before writing. <code className="code-inline">get</code> reads one record before editing. <code className="code-inline">save</code> without id creates, with id updates. <code className="code-inline">remove</code> deletes by id after confirmation. <code className="code-inline">dashboard</code> opens and closes every session so start and end totals stay visible.</p>
        <p className="text-base text-neutral-700 leading-relaxed">The full lifecycle ran live as <code className="code-inline">content-004</code>: created as ide, read back identical, updated to revision with edited caption, deleted, dashboard back to total 0. Six tools proved enough to carry ideas, small enough to audit.</p>
      </>
    ),
  },
  {
    label: 'Memory Token, Honest Hours',
    note: 'Strict TLS, fail closed',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">The bearer token lives in a process variable after login and dies on restart, so every fresh session starts with an explicit login. Strict certificate checks pass without any insecure flag, and missing tokens answer HTTP 401 immediately. The backend runs on the home PC from morning to evening, off hours produce an honest offline message instead of a blank screen.</p>
        <p className="text-base text-neutral-700 leading-relaxed">Passwords never touch screenshots because entry uses blind input, tokens appear as 8 characters only, and full secrets never land in git or on this page.</p>
      </>
    ),
  },
  {
    label: 'Global but Backed Up Safely',
    note: 'opencode.jsonc vs example',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">The MCP registers as a local entry in <code className="code-inline">opencode.jsonc</code> with a node command and the two public funnel URLs, enabled by default, usable from any project folder. That file holds real secrets so it stays ignored by git. The public <code className="code-inline">opencode.jsonc.example</code> carries the same shape with placeholder secrets, safe to push for restores on a new laptop.</p>
        <p className="text-base text-neutral-700 leading-relaxed">A small gitignore fix narrowed the root package ignore so the MCP package file joins the backup while every node modules folder stays out.</p>
      </>
    ),
  },
  {
    label: 'Primary Agent With Manners',
    note: 'contentos-manager, primary',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">The <code className="code-inline">contentos-manager</code> agent runs as a primary agent, not a subagent, so it chats directly, brainstorms 3 to 5 ideas per batch, attaches references, and only writes after an explicit lock. Delete always names the id and asks first. Its fourteen permissions mirror the portfolio agent, with an explicit allow for the contentos tools so the MCP stays on by default.</p>
        <p className="text-base text-neutral-700 leading-relaxed">Work runs in small batches of understand, do, verify, then continue, with exactly one active todo at a time and no next batch before the current one is locked.</p>
      </>
    ),
  },
];

/* ---------- evidence log ---------- */
const evidence = [
  {
    title: 'E1. Both Doors Answer With Fail Closed 401',
    badge: '401 Both Doors',
    badgeClass: 'text-emerald-600',
    desc: 'Hitting both public funnels without a token proves the services are awake and defensive.',
    code: `curl -sk -m 15 -o /dev/null -w "AUTH %{http_code}\\n" https://aispec.tail06293c.ts.net/api/me
AUTH 401

curl -sk -m 15 -o /dev/null -w "DATA %{http_code}\\n" https://aispec.tail06293c.ts.net:9443/dashboard
DATA 401`,
    result: 'Both doors reachable in about 0.01 seconds, both demand a token.',
  },
  {
    title: 'E2. Strict Certificates Pass Without Insecure Flags',
    badge: 'TLS Valid',
    badgeClass: 'text-emerald-600',
    desc: 'Repeating the same probe without skipping certificate checks.',
    code: `curl -s -m 15 -o /dev/null -w "AUTH_STRICT %{http_code}\\n" https://aispec.tail06293c.ts.net/api/me
AUTH_STRICT 401

curl -s -m 15 -o /dev/null -w "DATA_STRICT %{http_code}\\n" https://aispec.tail06293c.ts.net:9443/dashboard
DATA_STRICT 401`,
    result: 'Certificates valid, Node fetch needs no bypass.',
  },
  {
    title: 'E3. MCP Installs Clean and Agent Registers',
    badge: '0 Vulnerabilities',
    badgeClass: 'text-emerald-600',
    desc: 'Installing the translator and confirming the agent appears beside the older agents.',
    code: `npm install
added 94 packages, 0 vulnerabilities

node --check server.js && echo SYNTAX_OK
SYNTAX_OK

opencode agent list | grep contentos-manager
contentos-manager (primary)`,
    result: '182 line server plus 83 line agent, both load first try after install.',
  },
  {
    title: 'E4. Full MCP Lifecycle on Isolated Account',
    badge: 'content-004 Round Trip',
    badgeClass: 'text-emerald-600',
    desc: 'One MCP run on the isolated test account, created and cleaned the same day.',
    code: `TOOLS: login, list, get, save, remove, dashboard
login: Login ok sebagai ibborarts
dashboard awal: {"total":0}
save: Tersimpan (created) jadi content-004
get: content-004 kebaca (IG, reels, ai, ide)
save: Tersimpan (updated) jadi content-004 (revision)
remove: content-004 dihapus
dashboard akhir: {"total":0}`,
    result: 'Write, read, edit, delete verified, board back to clean zero.',
  },
  {
    title: 'E5. Backup Separates Secrets From Shape',
    badge: 'Git Safe',
    badgeClass: 'text-emerald-600',
    desc: 'Proving the real config stays local while the restorable shape is public.',
    code: `git status --short
M .gitignore
M opencode.jsonc.example
?? agents/contentos-manager.md
?? mcp-contentos/

git check-ignore -v opencode.jsonc
.gitignore:5:opencode.jsonc opencode.jsonc`,
    result: 'Secrets ignored, translator plus agent plus example backed up.',
  },
];

/* ---------- failure tier 1 ---------- */
const tier1 = [
  {
    title: '1. Test Script Cannot Find the SDK Outside Its Folder',
    badge: 'Module Resolution Trap',
    symptom: 'The MCP run passed syntax checks yet the throwaway test in the temp folder crashed with a module not found error for the SDK package.',
    diagnosis: 'Modern module resolution looks beside the running file, not at the shell folder, and it ignores the legacy module path variable. The test file sat far from its dependencies.',
    fix: 'Moved the test beside the server file so resolution found the installed packages, verified the full green run, then deleted the throwaway file to keep the folder clean.',
    lesson: 'Run throwaway tests beside their dependencies, then remove them the same day.',
  },
  {
    title: '2. Global Ignore Rule Hides the New Package File',
    badge: 'Backup Trap',
    symptom: 'The new translator folder showed as untracked but its package file stayed invisible to git, which would have broken restores on a new laptop.',
    diagnosis: 'A bare filename pattern in the ignore file matches at every folder depth, so it swallowed the nested package files along with the root ones.',
    fix: 'Scoped the root ignores with a leading slash so nested package files join the backup while root secrets and every modules folder stay out.',
    lesson: 'A pattern without a slash hits every level, scope root rules explicitly.',
  },
];

/* ---------- code ---------- */
const MCP_LOGIN = `server.tool("login", "Login plus store token", {
  identifier: z.string(),
  password: z.string()
}, async ({ identifier, password }) => {
  const r = await fetch(AUTH_URL + "/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password })
  })
  const j = await r.json()
  if (!r.ok) return err("identifier or password wrong")
  savedToken = j.token
  return ok("Login ok, token stored")
})`;

const MCP_SAVE = `server.tool("save", "Create or edit content", {
  id: z.string().optional(),
  status: z.string().optional(),
  link_postingan: z.string().optional()
}, async (f) => {
  if (f.status === "posted" && !f.link_postingan) {
    return err("Link required for posted")
  }
  const r = await fetch(API_URL + "/content/ingest", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(f)
  })
  const j = await r.json()
  return ok("Stored (" + j.action + ") as " + j.item.id)
})`;

/* ---------- FAQ ---------- */
const faq = [
  { q: 'Why not just type in the app?', a: 'Typing stays. The scribe is for locked ideas from chat, it only carries what you approve.' },
  { q: 'Does the AI work alone?', a: 'No. You brainstorm, you lock, it saves. Delete always asks for the id first.' },
  { q: 'Is this a new backend?', a: 'No. Same auth and same data doors as EXP 014. One translator file, zero new servers.' },
  { q: 'Where is my password?', a: 'Nowhere on this page. Login happens in session memory, secrets never land in git or screenshots.' },
  { q: 'Why only six tools?', a: 'List, get, save, remove, dashboard and login. Enough to carry ideas, small enough to track.' },
  { q: 'Why does it fail when your PC is off?', a: 'No VPS by decision, home PC and secure tunnels (:443 auth, :9443 data). Off means doors closed and the page says so instead of pretending. Same honesty as EXP 010 through 014.' },
];

/* ---------- live status ---------- */
const worksNow = [
  'MCP with 6 tools for login, list, get, save, remove, dashboard',
  'Full record round trip created, read, updated, deleted live',
  'Primary agent global with brainstorming and direct execution',
  'Strict certificate checks and fail closed 401 responses',
  'Backup safe config with secrets ignored and shape public',
  'Two honest failures logged with cause, fix, and check',
];

const notYet = [
  'Service runs on personal home computer rather than 24/7 cloud VPS',
  'Token lives in process memory only, gone on every restart',
  'Single file SQLite database without clustering or failover',
  'No export tool inside the MCP yet, browser export covers it',
  'Long term service hardening reserved for future infrastructure projects',
];

export default function Exp015() {
  const ref = useScrollReveal();

  return (
    <main ref={ref} className="bg-white">
      <Seo
        title="Experiment 015 - Letting the LLM Into My Own Web App Through an Internal MCP, No Manual Entry"
        description="Local MCP with 6 tools plus a primary opencode agent that writes ideas straight into live ContentOS. Planned in EXP 014, now shipped with receipts."
        image="/images/experiments015/dashboard-light-app.webp"
        path="/exp015.html"
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
                <li aria-current="page" className="font-semibold text-ink">Experiment 015</li>
              </ol>
            </nav>
            <a href="/experiments-list.html" className="arrow-link text-xs uppercase text-neutral-500" data-reveal>
              <span aria-hidden="true">&larr;</span> Back to Experiments
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="100">
              <p className="eyebrow">Experiment 015</p>
              <StatusBadge variant="live" label="Live" />
              <span className="text-xs font-mono text-neutral-500">Node MCP SDK · opencode primary agent · Shared Auth</span>
            </div>
            <h1 className="mt-6 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.25]" data-reveal="200">
              Letting the LLM Into My Own Web App Through an Internal MCP, No Manual Entry.
            </h1>
            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl" data-reveal="300">
              Can a self built web app let the LLM in through an internal MCP so ideas land without manual entry?
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="350">
              <InteractiveCta variant="primary" href="https://robbyaliasaakbar.github.io/contentOS/" external>
                Open Live Tracker — /contentOS/
              </InteractiveCta>
              <InteractiveCta variant="outline" href="/exp014.html">
                Planned Door: EXP 014
              </InteractiveCta>
            </div>
            <p className="mt-4 text-xs text-neutral-500 font-mono" data-reveal="360">Muse Spark 1.3 via opencode zen · opencode tools · 7 verified captures · 0 new servers · 26 Sep 2026</p>
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
            First experiment developed with a hosted model instead of the local coder. The translator runs on the laptop config, the tracker data still lives on the home PC behind the same two encrypted funnels as EXP 014.
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
              <p>1. My content notebook worked but my hands were still the only pen, so I built a small translator that lets AI carry ideas to the shelf</p>
              <p>2. You lock one idea in chat, the scribe saves it straight to the live tracker, no browser opened</p>
              <p>3. One login opens the door, the key lives in short memory and dies on restart, zero new passwords written</p>
              <p>4. Test notes were created and deleted on the same day, the board is clean and the receipts are on this page</p>
              <p>5. The page is public but the engines sleep in my home computer, when it is off the scribe says so honestly</p>
              <p>6. Everything that broke is written here, two small stories, and no robot works alone without your lock</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. EXPERIMENT DETAILS ============ */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Experiment Details</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Architectural Decisions and Engineering Tradeoffs</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">No new app, no new auth, no autonomous robot. Here are the five decisions that let an LLM write into my own web app through a small internal door.</p>
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
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">Every claim about the translator and the agent is backed by verifiable command line outputs from 26 Sep 2026. Passwords and full tokens are truncated, raw status codes, JSON structures, and file listings remain exact.</p>
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
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Both Failures Documented Honestly</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">Only two defects appeared during this build and both were fixed the same day. Written here with cause, fix, and check, same honesty as the twelve in EXP 014.</p>
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-accent">Tier 1 Incidents</span>
              <span className="text-xs text-neutral-400">Two Deep Dive Case Studies</span>
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
              <span className="text-xs text-neutral-400">No Further Failures</span>
            </div>
            <div className="border border-black/10 rounded-xl p-5 bg-paper" data-reveal="0">
              <p className="text-xs text-neutral-600 leading-relaxed">No minor defects beyond the two above. Stated explicitly so the count stays honest at two, not inflated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. MCP CODE + AGENT NOTES + SOURCE CODE ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>MCP Code</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Small Translator, Readable in One Sitting</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">The server mirrors the frontend contract tool for tool. Below are the essence of the login tool that stores the token and the save tool that creates and updates through one endpoint.</p>
          <div className="mt-8 space-y-6" data-reveal="150">
            <div>
              <p className="font-mono text-sm text-neutral-500">Login Tool Stores Token — server.js (essence)</p>
              <pre className="code-block mt-4">{MCP_LOGIN}</pre>
            </div>
            <div>
              <p className="font-mono text-sm text-neutral-500">Save Tool Creates and Updates — server.js (essence)</p>
              <pre className="code-block mt-4">{MCP_SAVE}</pre>
            </div>
          </div>

          <div className="mt-16" data-reveal>
            <p className="eyebrow">Agent Notes</p>
            <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Primary Agent Definition in One Markdown File</h2>
            <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">The agent file name becomes the agent name. Primary mode keeps it directly chatable, warmer temperature keeps brainstorming lively, explicit tool permission keeps the MCP on by default.</p>
            <pre className="code-block mt-6" data-reveal="150">{`description: content calendar scribe for ContentOS
mode: primary
temperature: 0.7
permission:
  read: allow
  edit: ask
  bash: ask
  contentos_*: allow`}</pre>
            <blockquote className="quote-block mt-8 text-sm sm:text-base text-neutral-700 leading-relaxed border-black/20 bg-paper rounded-2xl p-6" data-reveal>
              File name becomes agent name. Global folder makes it available in every project. Fourteen permissions mirror the portfolio agent, the last line switches the MCP tools on.
            </blockquote>
          </div>

          <div className="mt-16 border border-black/10 rounded-2xl p-8 sm:p-10 bg-white" data-reveal>
            <p className="eyebrow">Source Code</p>
            <h3 className="mt-4 font-display font-bold text-xl sm:text-2xl tracking-tight">The translator is public. Prove it yourself.</h3>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed max-w-2xl">You get the full MCP server and the agent definition. One small translator file, six honest tools, one primary agent. No secrets inside. The tracker it writes to is the same live ContentOS from EXP 014.</p>
            <p className="mt-4 font-mono text-xs text-neutral-500 break-all">github.com/robbyaliasaakbar/opencode-agents/tree/main/mcp-contentos</p>
            <p className="mt-1 font-mono text-xs text-neutral-500 break-all">github.com/robbyaliasaakbar/robbyaliasaakbar.github.io/tree/main/contentOS</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <InteractiveCta variant="primary" href="https://github.com/robbyaliasaakbar/opencode-agents/tree/main/mcp-contentos" external>
                View MCP source
              </InteractiveCta>
              <InteractiveCta variant="primary" href="https://robbyaliasaakbar.github.io/contentOS/" external>
                View live tracker
              </InteractiveCta>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 8. NETWORKING ARCHITECTURE ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Networking Architecture</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Same Two Doors, Zero New Servers</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">This experiment adds no infrastructure at all. The translator calls the same two public doors the browser already uses, keeping traffic paths clean and isolated per service.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6" data-reveal="150">
            <div className="border border-black/10 rounded-2xl p-6 bg-paper">
              <p className="font-display font-bold text-xs tracking-[0.18em] uppercase text-accent">Door 1: Shared Authentication Gateway</p>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">Public URL: <code className="code-inline">https://aispec.tail06293c.ts.net</code></p>
              <p className="mt-2 text-sm text-neutral-700 leading-relaxed">Internal Target: Docker container on port 7002 (PHP auth engine from EXP 011).</p>
              <p className="mt-2 text-xs text-neutral-500 leading-relaxed">The login tool posts here, tokens verify here, MCP memory holds the result until restart.</p>
            </div>
            <div className="border border-black/10 rounded-2xl p-6 bg-paper">
              <p className="font-display font-bold text-xs tracking-[0.18em] uppercase text-accent">Door 2: Dedicated ContentOS Data Gateway</p>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">Public URL: <code className="code-inline">https://aispec.tail06293c.ts.net:9443</code></p>
              <p className="mt-2 text-sm text-neutral-700 leading-relaxed">Internal Target: Docker container on port 7010 (Node Express and SQLite content.db).</p>
              <p className="mt-2 text-xs text-neutral-500 leading-relaxed">List, get, save, remove, and dashboard all pass this door with the stored bearer token.</p>
            </div>
          </div>
          <blockquote className="quote-block mt-8 text-sm sm:text-base text-neutral-700 leading-relaxed border-black/20 bg-paper rounded-2xl p-6" data-reveal>
            Both gateways terminate encrypted TLS connections at the machine boundary. The browser and the MCP scribe are two hands reaching through the same doors.
          </blockquote>
        </div>
      </section>

      {/* ============ 9. SCREENSHOTS (carousel) ============ */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Screenshots</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="50">Terminal Receipts in Order Plus the Live Board</h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl leading-relaxed" data-reveal="100">Seven captures in strict order. Shots 3, 4, and 5 are one continuous MCP run split for uniform size, read them top to bottom as crud1, crud2, crud3. Board shots show the public admin dummy rows from EXP 014, while MCP receipts use the isolated test account, written openly below.</p>
          <div className="mt-8" data-reveal="150">
            <ScreenshotCarousel items={gallery} />
          </div>
          <p className="mt-4 text-xs text-neutral-500 max-w-3xl leading-relaxed" data-reveal>
            Honest note: board shots show the public admin dummy rows from EXP 014. MCP receipts above use the isolated test account ibborarts with total 0. Two accounts, written openly, no mixing.
          </p>
        </div>
      </section>

      {/* ============ 10. FAQ ============ */}
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

      {/* ============ 11. LIVE STATUS ============ */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Live Status</p>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="100">Live Status — Live Translator, Home-PC Backend</h2>
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
              Open Live Tracker — /contentOS/
            </InteractiveCta>
            <span className="text-xs font-mono text-neutral-500">Live tracker, home PC backend</span>
          </div>
          <div className="mt-6 border-t border-black/10 pt-6" data-reveal="170">
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-3xl">Live tracker, home PC backend. If the computer or tunnel doors are closed, tools fail with an honest message, which is expected and not broken. The captures above document the entire MCP run. Test rows were created and deleted on the same day, the board is clean. Demo uses isolated test records only.</p>
          </div>
          <blockquote className="quote-block mt-8 text-sm sm:text-base text-neutral-600 leading-relaxed border-amber-300 bg-amber-50 rounded-r-2xl p-6" data-reveal>
            Translator live on my laptop config. Backend runs on my personal PC (funnels :443 + :9443). Off means tools fail with a message, expected. Transcripts and file listing show how it works.
          </blockquote>
        </div>
      </section>

      {/* ============ 12. DISCLAIMER ============ */}
      <section className="py-16 border-t border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow">Disclaimer</p>
            <h2 className="mt-4 font-display font-bold text-lg sm:text-xl tracking-tight">Disclaimer — Local Translator, Local Backend, Not Production-Hardened</h2>
            <blockquote className="quote-block mt-6 text-sm sm:text-base text-neutral-600 leading-relaxed">
              Built with Muse Spark 1.3 via opencode zen inside opencode, the first hosted model claim in this portfolio. Test rows only, board cleaned. Passwords, tokens, and OTP codes are never shown.
            </blockquote>
            <p className="mt-6 text-sm text-neutral-700 leading-relaxed">
              <strong>Shared backend:</strong> <a className="underline hover:text-accent" href="/exp011.html">EXP 011 (:7002)</a> ·{' '}
              <strong>Tracker:</strong> <a className="underline hover:text-accent" href="/exp014.html">EXP 014 (/contentOS/)</a> ·{' '}
              <strong>This:</strong> EXP 015 (MCP and agent)
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
