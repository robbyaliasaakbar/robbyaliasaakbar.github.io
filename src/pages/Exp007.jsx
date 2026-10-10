import { Link } from 'react-router-dom'
import Eyebrow from '../components/shared/Eyebrow.jsx'
import StatusBadge from '../components/shared/StatusBadge.jsx'
import { BarChart } from '../components/experiment/Chart.jsx'
import ScreenshotCarousel from '../components/experiment/ScreenshotCarousel.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'
import Seo from '../components/shared/Seo.jsx'

/* ============================================================
   EXPERIMENT 007 — port dari live exp007.html (705 baris).
   URUTAN FINAL (pola baseline exp001–006):
   Header → Specs(12) → Summary → Details → Config → Viz →
   Gallery(carousel 6 gambar) → FAQ → Disclaimer → CTA
   - Gallery: CAROUSEL (revisi Rob 10 Okt 2026 — seragam exp004/005,
     ZoomImage built-in via ScreenshotCarousel)
   - Specs: 12 tiles, grid lg:4 (lebih banyak dari exp lain)
   - Viz: 1 bar chart ranking + FLOW DIAGRAM multi-row (lokal)
   ============================================================ */

/* ---------- helpers lokal ---------- */

function NumList({ items }) {
  return (
    <ol className="space-y-4 list-none">
      {items.map((t, i) => (
        <li key={i} className="flex gap-4">
          <span className="font-display font-extrabold text-accent shrink-0">{i + 1}.</span>
          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">{t}</p>
        </li>
      ))}
    </ol>
  )
}

/* FlowDiagram — alur 3 baris (browser → n8n → postgres), component lokal exp007 */
function FlowDiagram() {
  const Box = ({ children, className = '' }) => (
    <span className={`px-3 py-2 rounded-lg ${className}`}>{children}</span>
  )
  const Arrow = () => (
    <>
      <span className="text-accent hidden lg:block">→</span>
      <span className="text-accent lg:hidden">↓</span>
    </>
  )
  return (
    <div className="mt-8 border border-black/10 rounded-2xl p-6 sm:p-8 bg-paper" data-reveal="200">
      <h3 className="font-display font-extrabold text-sm tracking-[0.08em] uppercase">Workflow Orchestration, Not Hallucination</h3>
      <p className="mt-2 text-xs text-neutral-500">Bot without in-system AI: local LLM only as syntax assistant.</p>
      <div className="mt-6 flex flex-col gap-3 text-xs font-mono">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <Box className="bg-ink text-white font-bold">1–5 PDF (Browser)</Box>
          <Arrow />
          <Box className="border border-black/10 bg-neutral-50">pdf.js extract → JSON Array</Box>
          <Arrow />
          <Box className="bg-accent text-white font-bold">POST /webhook/upload-cv</Box>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <Box className="border border-black/10 bg-white">Switch Posisi A/B/C</Box>
          <Arrow />
          <Box className="border border-black/10 bg-neutral-50">Code Hitung 40/30/30</Box>
          <Arrow />
          <Box className="bg-ink text-white font-bold">Merge + Rank</Box>
          <Arrow />
          <Box className="border border-black/10 bg-white">Postgres + CSV/JSON</Box>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono justify-center">
          <span>TRUNCATE after delivery → fresh for next batch</span>
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span>Private server — no data leaves</span>
        </div>
      </div>
      <p className="mt-4 text-[11px] text-neutral-400 font-mono text-center">Local LLM (Ornith 35B) = assistant only, supervised by builder — not the brain</p>
    </div>
  )
}

/* ---------- data ---------- */

const SPECS = [
  { label: 'Processor', value: 'Intel Core i5-11400F', delay: 0 },
  { label: 'RAM', value: 'DDR4 16GB', delay: 40 },
  { label: 'GPU', value: 'AMD RX 6700 XT 12GB VRAM', delay: 80 },
  { label: 'Inference Engine', value: 'llama.cpp', delay: 120 },
  { label: 'Model (Assistant Only)', value: 'Ornith 1.0 35B A3B IQ4_NL', delay: 160 },
  { label: 'Harness / IDE', value: 'OPENCODE + MCP', delay: 200 },
  { label: 'Orchestration', value: 'n8n', delay: 240 },
  { label: 'Database', value: 'PostgreSQL', delay: 280 },
  { label: 'Frontend', value: 'HTML5 + Tailwind CDN', delay: 320 },
  { label: 'Logic', value: 'Vanilla JS + pdf.js 2.16', delay: 360 },
  { label: 'Server', value: 'Python 3 (Private)', delay: 400 },
  { label: 'Status', value: 'STABLE — 5 Hours', delay: 440 },
]

const GALLERY = [
  {
    n: '1.', title: 'Hero — Seleksi CV 10x Lebih Cepat', tag: 'Landing',
    src: '/images/exp007-1.webp',
    alt: 'Screenshot 1 — hero of CV screening landing page — Seleksi CV 10x Lebih Cepat, upload 1-5 PDF, webhook card',
    w: 1440, h: 878,
    caption: 'Hero — Seleksi CV 10x Lebih Cepat, 1–5 PDF',
  },
  {
    n: '2.', title: 'Upload Queue — 5 Files', tag: 'Upload',
    src: '/images/exp007-2.webp',
    alt: 'Screenshot 2 — upload queue showing 5 files with badges cv_1..cv_5, size, remove X, drag & drop zone',
    w: 1440, h: 878,
    caption: 'Upload Queue — 5 Files, Badges cv_1..cv_5, Max 5MB',
  },
  {
    n: '3.', title: 'Ranking Result — 5 CV Ranked', tag: 'Result',
    src: '/images/exp007-3.webp',
    alt: 'Screenshot 3 — ranking table result with 5 CV ranked by score 80,75,50,35,25 and Lolos/Tidak status',
    w: 1440, h: 878,
    caption: 'Ranking Result — 5 CV Ranked, 2 Lolos (≥70%)',
  },
  {
    n: '4.', title: 'n8n Workflow — 24 Nodes', tag: 'n8n',
    src: '/images/exp007-4.webp',
    alt: 'Screenshot 4 — n8n workflow Technical Test with 24 nodes from Webhook to Postgres Clean',
    w: 1440, h: 878,
    caption: 'n8n Workflow — 24 Nodes, 3 Branches, No Hallucination',
  },
  {
    n: '5.', title: 'Private Server — Python 3', tag: 'Server',
    src: '/images/exp007-5.webp',
    alt: 'Screenshot 5 — local server running on private computer via Python, localhost:8010',
    w: 1440, h: 878,
    caption: 'Private Server — Python 3, No Data Leaves',
  },
  {
    n: '6.', title: 'Local URL — Private', tag: 'Proof',
    src: '/images/exp007-6.webp',
    alt: 'Screenshot 6 — local URL proof http://localhost:8010 and webhook http://localhost:5678',
    w: 1440, h: 878,
    caption: 'Local URL — Private, No Public Link',
  },
]

const RANKING = {
  data: [
    { label: 'CV3 Drafter 80', value: 80 },
    { label: 'CV1 Arch 75', value: 75 },
    { label: 'CV4 S2 50', value: 50 },
    { label: 'CV2 ITB 35', value: 35 },
    { label: 'CV5 SMK 25', value: 25 },
  ],
  yMax: 100,
}

const SUMMARY = [
  'This is not a demo. It’s a hiring tool that cuts 30 minutes of manual CV opening to about 5 seconds. You upload 1–5 PDFs on your phone or laptop (drag & drop or tap), and it ranks them for you.',
  'It’s fair per position: a Junior Architect is scored on AutoCAD/Revit, a Drafter on Enscape/D5, an Interior Designer on Photoshop, so no one is judged on the wrong skills. You get a table (Rank, CV, Position, Score, Status) and a CSV you open in Excel, with a clear reason like “Lolos 75% utk Junior Architect”.',
  'It doesn’t use heavy AI inside. The score is a simple, auditable rule HR can change (20 skills 40% + 6 edu 30% + 6 exp 30%, pass at 70%). That makes it predictable and fast, with no hallucination.',
  'It runs 100% on your own private computer. The PDFs never leave your browser, and the database cleans itself after each batch. No SaaS fee, no token cost.',
  'It was due in 3 days and delivered in 5 hours. For a small team hiring a few roles at a time, it’s sufficient, stable, and you own it 100%.',
]

const SPEC_ITEMS = [
  <>Single-page landing <code className="code-inline">index.html</code> 626 lines: <code className="code-inline">HTML5 + Tailwind CDN + Vanilla JS + pdf.js 2.16.105</code>, <code className="code-inline">Inter + Manrope</code>, <code className="code-inline">bg-grid</code>, <code className="code-inline">data-reveal</code>, <code className="code-inline">mobile sticky bottom</code> bar, <code className="code-inline">toast</code> (success/error/info, auto 3.2s), <code className="code-inline">progress Mengekstrak 3/5...</code> with bar, validation <code className="code-inline">PDF only, max 5MB/file, max 5 files, dup check</code>, badge <code className="code-inline">cv_1..cv_5</code>, no login.</>,
  <>Client-side extraction: <code className="code-inline">pdfjsLib.getDocument({'{data: arrayBuffer}'}).promise → getPage → getTextContent → join</code>, returns <code className="code-inline">{'{text, page_count}'}</code>, wraps as JSON Array <code className="code-inline">[{'{id: "cv_1", filename, size_kb, page_count, text, uploaded_at}'}]</code>, array directly, for n8n <code className="code-inline">Split In Batches</code>, with <code className="code-inline">AbortController 15s</code> and <code className="code-inline">fallback Download JSON</code> if webhook offline.</>,
  <>n8n workflow <code className="code-inline">Technical Test</code> 24 nodes: <code className="code-inline">Webhook POST /upload-cv (responseNode)</code> → <code className="code-inline">Code Extractor</code> (pecah 5 CV) → <code className="code-inline">Code Keyword Router</code> (Posisi A/B/C) → <code className="code-inline">Edit Fields Rapihin</code> (10 fields) → <code className="code-inline">Switch Posisi</code> (3 outputs + fallback) → 3 branches each <code className="code-inline">Pemecah (1 per 1) → Normalisasi → Edit Fields → Hitung 40/30/30 → ekstrak</code> → <code className="code-inline">Merge Gabungan (Append 3)</code> → <code className="code-inline">Code Ranking (sort desc)</code> → <code className="code-inline">database (Postgres upsert)</code> → <code className="code-inline">Respond Ranking (allIncomingItems)</code> → <code className="code-inline">Postgres Clean (TRUNCATE)</code>.</>,
  <>Keyword routing: Posisi A <code className="code-inline">Junior Architect</code> (12 keywords: autocad, revit, sketchup, lumion, building code...), Posisi B <code className="code-inline">Drafter &amp; 3D Visualization</code> (15: enscape, d5 render, shop drawing, as-built...), Posisi C <code className="code-inline">Interior Designer</code> (10: furniture, lighting, photoshop, illustrator...).</>,
  <>Predictable scoring (per report, 70% threshold): <code className="code-inline">20 skill = 40% + 6 edu = 30% + 6 exp = 30%</code>, <code className="code-inline">total = round(skillScore+eduScore+expScore)</code>, <code className="code-inline">≥70% Lolos, &lt;70% Tidak</code>, implemented as 1 CV per 1, no batch OOM, 3 jalur duplicated for fairness per position.</>,
  <>Output: ranking <code className="code-inline">rank 1..5</code> with <code className="code-inline">{'{id_cv, nama_file, posisi, total_score, status, alasan}'}</code>: e.g., <code className="code-inline">Lolos 80% utk Drafter &amp; 3D Visualization</code>, table in landing page + <code className="code-inline">Download Ranking (JSON)</code> + <code className="code-inline">Download CSV</code> with Indonesian headers <code className="code-inline">Peringkat, ID CV, Nama File, Posisi Dilamar, Skor (0-100), Status, Alasan</code> + BOM <code className="code-inline">0xEFBBBF</code> for Excel.</>,
  <>Local private server: <code className="code-inline">Python 3 http.server</code> on <code className="code-inline">http://localhost:8010</code> (8000 taken) + webhook <code className="code-inline">http://localhost:5678/webhook/upload-cv</code>: no public URL, no data leaves, PDFs only in browser memory.</>,
  <>Mobile &amp; robust: breakpoints <code className="code-inline">sm 640 md 768 lg 1024</code>, upload zone <code className="code-inline">full width</code>, file cards <code className="code-inline">full width</code>, ranking table <code className="code-inline">overflow-x-auto scrollbar-thin</code>, <code className="code-inline">try/catch per file</code>, <code className="code-inline">firstLine</code> name fallback, <code className="code-inline">slice(0,5)</code> guard, <code className="code-inline">TRUNCATE</code> after delivery → fresh for next batch.</>,
]

const FAILED_ITEMS = [
  <><strong>Small quantized LLM → unstable:</strong> aggressive quant made scoring unpredictable, hard to debug, and hallucinated skills. Abandoned for rule-based 40/30/30.</>,
  <><strong>Big LLM → heavy:</strong> more stable but needs strong hardware (my 12GB VRAM cannot sustain 5 CV parallel efficiently). Abandoned for workflow lightness.</>,
  <><strong>One-shot n8n generation → wrong:</strong> missed <code className="code-inline">body</code> vs <code className="code-inline">body.data</code> wrapping, Switch missed keyword, Merge misaligned, fixed by 1-node-per-checkpoint with explicit <code className="code-inline">Map</code> and <code className="code-inline">responseNode</code>.</>,
  <><strong>pdf.js on scanned PDFs → empty:</strong> no text layer → <code className="code-inline">text.length &lt;10</code>, handled with toast + <code className="code-inline">_error</code> flag per file, still pushing item instead of failing batch, plus 15s <code className="code-inline">AbortController</code> and fallback <code className="code-inline">Download JSON</code>.</>,
]

const EVIDENCE_TILES = [
  { label: 'Landing Lines', value: '626', note: 'index.html' },
  { label: 'n8n Nodes', value: '24', note: 'Technical Test' },
  { label: 'Branches', value: '3', note: 'A/B/C + fallback' },
  { label: 'CV Tested', value: '5', note: '+ Vacancy PDF' },
  { label: 'Threshold', value: '70%', note: 'Lolos / Tidak' },
  { label: 'Time', value: '~5s', note: 'vs 30min manual' },
  { label: 'Deadline', value: '5 Hours', note: 'of 3 days' },
  { label: 'Ranking', value: '2 Lolos', note: '80,75 / 50,35,25' },
]

const CONFIG_PDFJS = String.raw`async function extractTextFromPDF(file){
  const pdf = await pdfjsLib.getDocument({ 
    data: await file.arrayBuffer() 
  }).promise;
  let fullText = "";
  for(let i=1; i<=pdf.numPages; i++){
    const page = await pdf.getPage(i);
    fullText += (await page.getTextContent())
      .items.map(it=>it.str||"").join(" ") + "\n";
  }
  return { text: fullText.trim(), page_count: pdf.numPages };
}
// → wrap as [{id: "cv_1", filename, size_kb, page_count, text, uploaded_at}]`

/* backtick + ${} di-dalam code → escape di template literal biasa */
const CONFIG_N8N = `// 20 skill = 40% + 6 edu = 30% + 6 exp = 30% → 70% Lolos (per report)
const skillScore = (Math.min(keahlian.length,20)/20)*40;
const eduScore   = (Math.min(edukasi.length,6)/6)*30;
const expScore   = (Math.min(expTahun,6)/6)*30;
const total = Math.round(skillScore+eduScore+expScore);
const status = total>=70 ? "Lolos" : "Tidak Lolos";
const alasan = status==="Lolos"
  ? \`Lolos \${total}% utk \${posisi}\`
  : \`Tidak Lolos \${total}% utk \${posisi}\`;`

const CONFIG_REASONS = [
  <>I extracted PDFs in the <strong>browser</strong> so n8n only receives clean JSON, no binary handling, and the demo works even if n8n is offline (fallback <code className="code-inline">Download JSON</code>).</>,
  <>I kept scoring <strong>rule-based</strong> (20/6/6, 70%) so HR can audit and tweak it, not an LLM guess that hallucinates skills.</>,
  <>I duplicated <strong>3 branches A/B/C</strong> for fairness: Architect scored on Revit, Drafter on Enscape, Interior on Photoshop, same 40/30/30 but different skill sets.</>,
  <>I kept it <strong>private &amp; fresh</strong>: <code className="code-inline">Python 3</code> on <code className="code-inline">localhost:8010</code>, <code className="code-inline">TRUNCATE</code> after delivery. No data leaves, no manual DB cleanup.</>,
]

const FAQS = [
  {
    q: 'Why not put AI inside the scoring system?',
    a: <>Small quantized models hallucinate and are unpredictable. Big models are heavy and need strong hardware (RX 6700 XT 12GB cannot sustain 5 CV parallel). Workflow orchestration (<code className="code-inline">pdf.js + n8n + rule 40/30/30, 70% threshold</code>) is stable, fast (~5s), auditable, and 100% local: AI was only a supervised syntax assistant (Ornith 35B).</>,
  },
  {
    q: 'How does HR know why a CV passed or failed?',
    a: <>Each row has a clear reason: e.g., <code className="code-inline">Lolos 80% utk Drafter &amp; 3D Visualization</code> or <code className="code-inline">Tidak Lolos 35% utk Junior Architect</code>. The CSV header is Indonesian: <code className="code-inline">Peringkat, Skor (0-100), Status, Alasan</code>, so HR opens it in Excel and knows immediately. Threshold 70% is adjustable.</>,
  },
  {
    q: 'What if the CV is a scanned PDF or the webhook is offline?',
    a: <>Scanned PDFs with no text layer trigger a toast (<code className="code-inline">text &lt;10 chars</code>) but don’t fail the batch. The item is sent with empty text and an <code className="code-inline">_error</code> flag. If the webhook is offline (<code className="code-inline">15s timeout</code>), the landing page shows a fallback <code className="code-inline">Download JSON</code> so the demo still works.</>,
  },
]

/* ---------- page ---------- */

export default function Exp007() {
  useScrollReveal()

  return (
    <main>
      <Seo
        title="Experiment 007 — From 30 Minutes to 5 Seconds: Automating Mass CV Screening Without In-System AI"
        description="Can 1–5 CV PDFs be screened from 30-minute manual review to 5-second ranked shortlist without in-system AI? A local workflow: pdf.js → n8n 24 nodes → Postgres, 70% threshold."
        image="/images/experiments007/homepage-hero.webp"
        path="/exp007.html"
        type="article"
      />
      {/* ================= HEADER ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true"></div>
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 w-full pt-36 pb-20">
          <div className="max-w-4xl">
            <nav aria-label="Breadcrumb" className="text-xs font-display tracking-wide" data-reveal>
              <ol className="flex items-center gap-2 text-neutral-500">
                <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-neutral-300">/</li>
                <li><Link to="/experiments-list" className="hover:text-accent transition-colors">Experiments</Link></li>
                <li aria-hidden="true" className="text-neutral-300">/</li>
                <li aria-current="page" className="font-semibold text-ink">Experiment 007</li>
              </ol>
            </nav>
            <Link to="/experiments-list" className="arrow-link text-xs uppercase text-neutral-500 inline-block mt-4" data-reveal>
              <span aria-hidden="true">←</span> Back to Experiments
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="100">
              <Eyebrow>Experiment 007</Eyebrow>
              <StatusBadge variant="stable" />
            </div>
            <h1 className="mt-6 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" data-reveal="200">
              From 30 Minutes to 5 Seconds: Automating Mass CV Screening Without In-System AI.
            </h1>
            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl" data-reveal="300">
              Can 1–5 CV PDFs be screened from a 30-minute manual review to a 5-second ranked shortlist, without heavy AI or hallucination, using only <code className="code-inline">pdf.js</code>, 24-node <code className="code-inline">n8n</code> orchestration, and a predictable rule-based scoring on a private server? Deadline: 3 days. Delivered in 5 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SYSTEM REQUIREMENTS ================= */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow>System Requirements</Eyebrow>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {SPECS.map((s) => (
              <div key={s.label} className="border border-black/10 rounded-xl p-5" data-reveal={s.delay}>
                <p className="text-[0.65rem] font-display font-bold tracking-[0.16em] uppercase text-neutral-400">{s.label}</p>
                <p className="mt-2 text-sm font-medium leading-snug break-all">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SUMMARY ================= */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="summary-callout p-8 sm:p-12" data-reveal>
            <h2 className="font-display font-extrabold text-base sm:text-lg tracking-[0.08em] uppercase leading-relaxed max-w-3xl">
              For those unable to interpret the data from a technical standpoint, here is the conclusion:
            </h2>
            <div className="mt-8 space-y-5 text-sm sm:text-base text-neutral-700 leading-relaxed max-w-3xl">
              {SUMMARY.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= DETAILS ================= */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow>Experiment Details</Eyebrow>
          <div className="mt-12 space-y-12">

            {/* PROBLEM */}
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
              <div className="lg:col-span-3"><span className="detail-label">Problem</span></div>
              <div className="lg:col-span-9">
                <p className="text-base text-neutral-700 leading-relaxed">A manufacturing company is hiring fast for 3 roles (Junior Architect, Drafter &amp; 3D Visualization, Interior Designer). HR screens CVs manually: opening 5 PDFs one-by-one takes ~30 minutes, is subjective, and doesn’t scale. The AI Specialist test asks for a POC in 3 days that is end-to-end, lightweight, HR-friendly, mobile-friendly, and runs locally on a private server (not public, no login, no SaaS).</p>
              </div>
            </div>

            {/* SPECIFICATIONS */}
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
              <div className="lg:col-span-3"><span className="detail-label">Specifications</span></div>
              <div className="lg:col-span-9"><NumList items={SPEC_ITEMS} /></div>
            </div>

            {/* HYPOTHESIS */}
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
              <div className="lg:col-span-3"><span className="detail-label">Hypothesis</span></div>
              <div className="lg:col-span-9">
                <p className="text-base text-neutral-700 leading-relaxed">For mass hiring with a 3-day deadline, workflow orchestration (pdf.js + n8n + Postgres) with a predictable, auditable rule is more maintainable, predictable, and resource-efficient than embedding an LLM (even local) inside the scoring. Hallucination risk outweighs benefit. A local LLM is better as a supervised syntax assistant (Ornith 35B via OpenCode/MCP) rather than the system’s brain.</p>
              </div>
            </div>

            {/* EXPERIMENT */}
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
              <div className="lg:col-span-3"><span className="detail-label">Experiment</span></div>
              <div className="lg:col-span-9">
                <p className="text-base text-neutral-700 leading-relaxed">I built the landing page per component (upload zone, list with <code className="code-inline">cv_1..cv_5</code>, pdf.js extract, JSON POST, ranking table) with deterministic prompts via OpenCode + MCP, each validated in small windows. I built the n8n workflow 1 node per checkpoint (18 checkpoints, 24 nodes), tested per node, and confirmed with the owner before next. The whole POC was delivered in 5 hours, well under the 3-day deadline, on consumer hardware, 100% locally.</p>
              </div>
            </div>

            {/* WHAT FAILED */}
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
              <div className="lg:col-span-3"><span className="detail-label">What Failed</span></div>
              <div className="lg:col-span-9"><NumList items={FAILED_ITEMS} /></div>
            </div>

            {/* ITERATION */}
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
              <div className="lg:col-span-3"><span className="detail-label">Iteration</span></div>
              <div className="lg:col-span-9">
                <p className="text-base text-neutral-700 leading-relaxed">Pivoted from “AI inside” to “workflow without AI inside, AI only as assistant”. Extracted PDFs in the <strong>browser</strong> (not server) to keep n8n light and allow fallback. Duplicated 3 branches (A/B/C) for fairness per position instead of one generic flow. Made scoring auditable (HR can tweak 20/6/6 or threshold 70). Delivered in 5 hours because context was kept small and each node was tested before the next.</p>
              </div>
            </div>

            {/* EVIDENCE */}
            <div data-reveal>
              <div className="grid lg:grid-cols-12 gap-4 lg:gap-10">
                <div className="lg:col-span-3"><span className="detail-label">Evidence</span></div>
                <div className="lg:col-span-9">
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-6">Figures from the live POC on private server. You can verify via screenshots above and the workflow ID <code className="code-inline">v1lQYQUZndoeoR6w</code>.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {EVIDENCE_TILES.map((e) => (
                      <div key={e.label} className="stat-tile border border-black/10 rounded-xl p-5 bg-paper">
                        <p className="text-[0.62rem] font-display font-bold tracking-[0.14em] uppercase text-neutral-400">{e.label}</p>
                        <p className="mt-2 font-display font-extrabold text-lg leading-tight">{e.value}</p>
                        {e.note && <p className="text-xs text-neutral-500">{e.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RESULT */}
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
              <div className="lg:col-span-3"><span className="detail-label">Result</span></div>
              <div className="lg:col-span-9">
                <p className="text-base text-neutral-700 leading-relaxed">POC is stable and delivered well within the 3-day deadline, <strong>actually completed in just 5 hours</strong>, live on private server <code className="code-inline">http://localhost:8010</code>. HR uploads on mobile or desktop, gets a ranked shortlist in ~5 seconds (2 Lolos of 5), downloads CSV for Excel, and Postgres is truncated automatically: no token cost, no data leaves, no manual cleanup, HR only does 3 clicks: Upload → Send → Download.</p>
              </div>
            </div>

            {/* WHAT I LEARNED */}
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
              <div className="lg:col-span-3"><span className="detail-label">What I Learned</span></div>
              <div className="lg:col-span-9">
                <p className="text-base text-neutral-700 leading-relaxed">Predictability beats probability for HR: a simple auditable formula HR can tweak is more valuable than a black-box LLM. Workflow orchestration is the skill: supervision over syntax, bug potential, and ease of maintenance matters more than model size. Keeping AI as assistant (Ornith 35B) rather than the system’s brain made the POC shippable in 5 hours on consumer hardware, 100% locally.</p>
              </div>
            </div>

            {/* PRACTICAL IMPLICATION */}
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
              <div className="lg:col-span-3"><span className="detail-label">Practical Implication</span></div>
              <div className="lg:col-span-9">
                <p className="text-base text-neutral-700 leading-relaxed"><strong>For business owners/HR:</strong> you don’t need a SaaS ATS. A local workflow you own 100% cuts 30 min to 5 sec, with a clear <code className="code-inline">Lolos 70% utk Junior Architect</code> reason per candidate, fair per position, private. <strong>For recruiters:</strong> this proves the builder can ship landing page + n8n + Postgres end-to-end in 5 hours, 3-day deadline, with no hallucination and no data exfiltration: predictable engineering.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CONFIGURATION TEMPLATE ================= */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow>Configuration Template</Eyebrow>

          <div className="mt-8" data-reveal="100">
            <p className="font-mono text-sm text-neutral-500">pdf.js — browser-side extract (keeps n8n light)</p>
            <pre className="code-block mt-4"><code>{CONFIG_PDFJS}</code></pre>
          </div>

          <div className="mt-8" data-reveal="100">
            <p className="font-mono text-sm text-neutral-500">n8n scoring — predictable 40/30/30, 70% threshold (report)</p>
            <pre className="code-block mt-4"><code>{CONFIG_N8N}</code></pre>
          </div>

          <blockquote className="quote-block mt-10 text-sm sm:text-base text-ink leading-relaxed max-w-3xl" data-reveal>
            Do not copy this snippet blindly. The key is <code className="code-inline">pdf.js in browser + rule 40/30/30</code>: local LLM was only a syntax assistant (Ornith 35B), supervised, not the brain. That kept the POC predictable and shippable in 5 hours.
          </blockquote>

          <ol className="mt-10 space-y-8 max-w-3xl list-none" data-reveal="100">
            {CONFIG_REASONS.map((r, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display font-extrabold text-accent shrink-0">{i + 1}.</span>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">{r}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= VISUALIZATION ================= */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow>Visualization</Eyebrow>

          <div className="mt-8" data-reveal="100">
            <h2 className="font-display font-bold text-xl sm:text-2xl tracking-tight">
              Predictable Scoring — 70% Threshold, No LLM Feeling
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              20 skill = 40% + 6 education = 30% + 6 experience = 30%. 5 CV samples: 80,75,50,35,25, with only 2 <code className="code-inline">Lolos ≥70%</code>. The rest are predictable, auditable, and adjustable.
            </p>
          </div>

          {/* Chart: Ranking */}
          <div className="mt-8 border border-black/10 rounded-2xl p-6 sm:p-10 bg-paper" data-reveal="150">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display font-extrabold text-sm tracking-[0.08em] uppercase">Ranking — 5 CV Samples</h3>
              <StatusBadge variant="stable" label="2 Lolos at ≥70%" className="!text-[0.58rem] sm:!text-[0.65rem] !px-2.5 sm:!px-3 !py-1 shrink-0" />
            </div>
            <div className="mt-6">
              <BarChart data={RANKING.data} yMax={RANKING.yMax} />
            </div>
            <div className="mt-4 flex items-center justify-between text-[0.65rem] font-display font-bold tracking-[0.16em] uppercase text-neutral-400">
              <span>0</span>
              <span>score / 100 — threshold 70 (dashed line in analysis, not in chart)</span>
              <span>100</span>
            </div>
            <p className="mt-4 text-xs text-neutral-500 leading-relaxed">CV3 (Drafter &amp; 3D, 10y) 80 → Lolos, CV1 (Arch, 7y) 75 → Lolos, CV4/2/5 (50,35,25) → Tidak Lolos. CSV says <code className="code-inline">Lolos 80% utk Drafter &amp; 3D Visualization</code>. HR knows why.</p>
          </div>

          {/* Flow diagram multi-row */}
          <FlowDiagram />

          <p className="mt-6 text-xs text-neutral-500 leading-relaxed max-w-3xl" data-reveal>
            Deadline was 3 days (Fri 4 Sept 2026), delivered in 5 hours. That speed came from keeping AI outside the system and keeping the workflow predictable.
          </p>
        </div>
      </section>

      {/* ================= GALLERY (CAROUSEL) ================= */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow>Screenshots</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="100">
            Live Screenshots
          </h2>
          <ScreenshotCarousel items={GALLERY} />
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="100">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-4" data-reveal="150">
            {FAQS.map((f, i) => (
              <details key={i} className="group border border-black/10 rounded-xl p-6 bg-paper" open={i === 0}>
                <summary className="flex items-center justify-between gap-4 font-display font-bold text-sm cursor-pointer list-none">
                  {f.q}
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-sm text-neutral-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DISCLAIMER ================= */}
      <section className="py-16 border-t border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>Disclaimer</Eyebrow>
            <h2 className="mt-4 font-display font-bold text-lg sm:text-xl tracking-tight">A Note on Results</h2>
            <blockquote className="quote-block mt-6 text-sm sm:text-base text-neutral-600 leading-relaxed">
              This is a 3-day Proof of Concept, actually delivered in 5 hours, not a full Applicant Tracking System. The 70% threshold and 40/30/30 weights are subjective and based on the 5 CV samples, intentionally adjustable to the recruitment team’s criteria. The result (2 Lolos of 5) is a reference for HR to decide who to interview, not a final hiring decision. For its scope (5 CVs at a time, local, no token cost), it is sufficient and stable, but a scanned PDF with no text layer will still need manual review.
            </blockquote>
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-black/10 pt-10" data-reveal>
            <Link to="/experiments-list" className="arrow-link font-display text-sm uppercase">
              <span aria-hidden="true">←</span> Back to Experiments
            </Link>
            <Link to="/contact" className="arrow-link font-display text-sm uppercase">
              Have a problem worth exploring? <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
