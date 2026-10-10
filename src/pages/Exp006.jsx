import { Link } from 'react-router-dom'
import Eyebrow from '../components/shared/Eyebrow.jsx'
import StatusBadge from '../components/shared/StatusBadge.jsx'
import { BarChart } from '../components/experiment/Chart.jsx'
import ZoomImage from '../components/experiment/ZoomImage.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'
import Seo from '../components/shared/Seo.jsx'

/* ============================================================
   EXPERIMENT 006 — port dari live exp006.html (686 baris).
   URUTAN FINAL (pola baseline exp001–005):
   Header → Specs → Summary → Details → Config → Viz → Gallery →
   FAQ → Disclaimer → CTA
   - Header TANPA tombol live site (internal tool, gak publik)
   - Gallery: hero-large + 3 grid (persis live, BUKAN carousel —
     layout hero+grid gak cocok dipaksa jadi 1-track carousel)
   - Viz: 2 bar chart + FLOW DIAGRAM (component lokal, baru di exp ini)
   ============================================================ */

/* ---------- helpers lokal ---------- */

/* Daftar bernomor (1. accent + text) */
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

/* FlowDiagram — alur file-based (form → calc → localStorage + save.php → customers.js).
   Component lokal, cuma dipakai exp006. Arrow: → di desktop, ↓ di mobile. */
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
    <div className="mt-8 border border-black/10 rounded-2xl p-6 sm:p-8 bg-paper" data-reveal="250">
      <h3 className="font-display font-extrabold text-sm tracking-[0.08em] uppercase">File-Based Flow — No Database</h3>
      <p className="mt-2 text-xs text-neutral-500">One <code className="code-inline">customers.js</code> file, not MySQL. Download via File Manager anytime.</p>
      <div className="mt-6 flex flex-col lg:flex-row items-center gap-3 text-xs font-mono">
        <Box className="bg-ink text-white font-bold">Input (form)</Box>
        <Arrow />
        <Box className="border border-black/10 bg-neutral-50">calcTotals() + updatePreview() <span className="text-neutral-400">600ms</span></Box>
        <Arrow />
        <Box className="border border-black/10 bg-neutral-50">localStorage <span className="text-emerald-600">fallback</span></Box>
        <span className="text-neutral-300">+</span>
        <Box className="bg-accent text-white font-bold">fetch(save.php) POST {'{type, content}'}</Box>
        <Arrow />
        <Box className="border border-black/10 bg-white font-bold">customers.js / company.js <span className="text-neutral-400">Hostinger 100GB</span></Box>
      </div>
      <p className="mt-4 text-[11px] text-neutral-400 font-mono">save.php allowlist: ['customers','company'] → file_put_contents → JSON {'{status:"ok"}'}</p>
    </div>
  )
}

/* ---------- data ---------- */

const SPECS = [
  { label: 'CPU', value: 'Intel Core i5-11400F', delay: 0 },
  { label: 'RAM', value: '16GB DDR4 3200 MT/s', delay: 40 },
  { label: 'GPU', value: 'RX 6700 XT', delay: 80 },
  { label: 'OS', value: 'Ubuntu 26.04 LTS', delay: 120 },
  { label: 'Inference Engine', value: 'Llama.cpp', delay: 160 },
  { label: 'Coding Tools', value: 'OpenCode + Cline (VS Code)', delay: 200 },
  { label: 'The Model That Helped Me', value: 'ORNITH-1.0-35B-A3B-IQ4_NL-GGUF', delay: 0 },
  { label: 'Frontend Stack', value: 'Tailwind CDN + Vanilla JS + jsPDF 2.5.1', delay: 40 },
  { label: 'Status', value: 'STABLE', delay: 80 },
]

const SUMMARY = [
  'This is not a public website. It is the internal cashier tool that comes after the website. If EXP 005 is the storefront, this is the cash register.',
  'It lets the admin create an invoice in under 2 minutes: pick a returning customer (autocomplete), add items from the same 44-price list used on the website, see a live A4 preview, and download a PDF where the bank account can be copied.',
  <>It doesn&apos;t use a database. Customer data lives in one <code className="code-inline">customers.js</code> file on Hostinger (100GB). You can download it anytime via File Manager, with no database setup. A tiny 44-line PHP file saves it.</>,
  'The PDF is text-based (45KB), not a screenshot (850KB), so it&apos;s small and copyable, and the logo still appears. It was built with a local AI on consumer hardware, batched one component at a time.',
  'It&apos;s not for a big enterprise with millions of rows, but for a small service business in the Greater Jakarta area (Jabodetabek), it&apos;s sufficient, it&apos;s stable, it connects directly to the pricing from EXP 005, and you own it 100% with no monthly SaaS fee.',
]

const SPEC_ITEMS = [
  <>Single-file app: <code className="code-inline">invoice.html</code> 919 lines, <code className="code-inline">lg:grid-cols-12</code> (form 5 + preview 7 sticky), Tailwind CDN + jsPDF 2.5.1 + html2canvas 1.4.1 (loaded but not used for final PDF), Vanilla JS only, <code className="code-inline">noindex, nofollow</code> at <code className="code-inline">.../invoice/admin/data/invoice.html (internal, noindex)</code>.</>,
  <>Company data: <code className="code-inline">company.js</code> 19 lines: <code className="code-inline">name, logo, address, whatsapp, email, rekening {'{bank, no, an}'}</code>, editable via <code className="code-inline">⚙️ Edit Company</code> modal (6 fields + logo upload base64 max 500KB), auto-save via <code className="code-inline">save.php?file=company</code> + <code className="code-inline">localStorage</code> fallback.</>,
  <>Customer DB file-based: <code className="code-inline">customers.js</code> 21 lines, array <code className="code-inline">[{'{id, name, address, whatsapp}'}]</code> with 2 dummy samples (Budi &amp; Siti, labeled dummy), <code className="code-inline">datalist</code> autocomplete, dedup <code className="code-inline">Map(name|wa)</code> on <code className="code-inline">init()</code>, auto-grow via <code className="code-inline">save.php</code> POST JSON, stored on Hostinger 100GB file storage, downloadable via File Manager.</>,
  <>Backend: <code className="code-inline">save.php</code> 44 lines: <code className="code-inline">header JSON + CORS</code>, <code className="code-inline">file_get_contents(&apos;php://input&apos;)</code>, allowlist <code className="code-inline">[&apos;customers&apos;,&apos;company&apos;]</code>, <code className="code-inline">file_put_contents($filename, $content)</code>. No DB, no ORM.</>,
  <>Items logic: reads <code className="code-inline">indeepPricelist</code> (22 categories → 44 items, same as EXP 005) with dependent dropdowns <code className="code-inline">category → size</code> (<code className="code-inline">kategori → ukuran</code> in code), price auto, qty, discount, plus dynamic extras <code className="code-inline">latex +40k, lepasPasang +20k/seat, lebar75 +20k/seat</code>, wired into <code className="code-inline">calcTotals()</code> + <code className="code-inline">renderItems()</code>.</>,
  <>Live preview: <code className="code-inline">preview-a4</code> 210mm, <code className="code-inline">setInterval(updatePreview, 600)</code>, header with logo, meta (No, Date, Due +1 day), 7-column table, payment box, signature, updates on every input change.</>,
  <>PDF generation: <strong>text-based only</strong> <code className="code-inline">generateTextPDF()</code> via jsPDF. Logo from DOM <code className="code-inline">canvas.toDataURL(&apos;image/png&apos;)</code> (fixes CORS), all text via <code className="code-inline">pdf.text()</code> + <code className="code-inline">pdf.rect()</code> so <code className="code-inline">BCA 5771 •• 465</code> is selectable (masked in portfolio, full in real PDF), filename <code className="code-inline">INV-YYYYMMDD-001 - Customer.pdf</code>.</>,
  <>Mobile &amp; print: <code className="code-inline">@media (max-width: 1024px)</code> table <code className="code-inline">overflow-x: auto</code>, <code className="code-inline">preview-a4</code> full-width, <code className="code-inline">mobile-sticky-bar</code> fixed bottom (<code className="code-inline">Preview | PDF | Print</code>), <code className="code-inline">@media print</code> hides <code className="code-inline">.no-print</code>, <code className="code-inline">window.print()</code> fallback.</>,
]

const FAILED_ITEMS = [
  <><strong>Logo CORS to PDF:</strong> <code className="code-inline">fetch(logo.png)</code> failed on <code className="code-inline">file://</code> and on the Hostinger path <code className="code-inline">../../../assets/img/logo.png</code>. Had to grab the already-loaded DOM <code className="code-inline">&lt;img&gt;</code>, draw to <code className="code-inline">canvas</code>, <code className="code-inline">toDataURL(&apos;image/png&apos;)</code>, then <code className="code-inline">pdf.addImage()</code>. The initial <code className="code-inline">fetch</code> + <code className="code-inline">FileReader</code> blob approach broke.</>,
  <><strong>Pricelist hallucination (continuation of EXP 005):</strong> model invented prices for Kasur 200/180 etc. Fixed by forcing verbatim read of <code className="code-inline">indeepPricelist[category]</code> (<code className="code-inline">kategori</code> in code) and disabling <code className="code-inline">size</code> (<code className="code-inline">ukuran</code>) until <code className="code-inline">category</code> is selected.</>,
  <><strong>Mobile table overflow:</strong> 7-column table broke on phone, fixed with <code className="code-inline">display:block; overflow-x:auto;</code> and <code className="code-inline">table thead/tbody display:table; width:100%</code> at 1024px.</>,
  <><strong>Dual persistence race:</strong> <code className="code-inline">localStorage</code> vs <code className="code-inline">save.php</code> went out of sync after save, fixed with <code className="code-inline">Map</code> dedup <code className="code-inline">name|wa</code> on load + <code className="code-inline">Export manual</code> button fallback when <code className="code-inline">fetch</code> fails (500 or CORS).</>,
]

const EVIDENCE_TILES = [
  { label: 'Total Files', value: '5', note: '1 html + 2 js + 1 php + 1 txt' },
  { label: 'Invoice Lines', value: '919', note: 'invoice.html' },
  { label: 'Backend', value: <>44 <span className="text-xs font-semibold text-neutral-500">lines PHP</span></> },
  { label: 'Storage', value: '100GB', note: 'Hostinger file-based' },
  { label: 'Preview Sync', value: '600ms', note: 'setInterval' },
  { label: 'Customer DB', value: '2 → ∞', note: 'auto-grow' },
  { label: 'PDF Mode', value: 'Text-based', note: 'selectable, 45KB' },
  { label: 'Revisions', value: <>~12 <span className="text-xs font-semibold text-neutral-500">batched</span></>, note: 'per component' },
]

const CONFIG_SAVE_PHP = String.raw`<?php
// save.php — 44 lines, no DB, file-based persistence
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$allowed = ['customers', 'company'];
if (!$data || !in_array($data['type'], $allowed)) {
  http_response_code(400);
  echo json_encode(["status" => "error"]);
  exit();
}

file_put_contents($data['type'] . '.js', $data['content']);
echo json_encode(["status" => "ok", "file" => $data['type'] . '.js']);`

const CONFIG_CUSTOMERS_JS = String.raw`/* dummy sample — not real customers */
const customersData = [
  {
    id: "CUST-001",
    name: "Budi Santoso",
    address: "Jl. Kemang Raya No. 12, Jakarta Selatan 12130",
    whatsapp: "081234567890"
  },
  {
    id: "CUST-002",
    name: "Siti Aminah",
    address: "Cluster Galaxy Blok B2 No. 8, Bekasi Selatan",
    whatsapp: "082112345678"
  }
];
// auto-updated via fetch(save.php) POST {type: "customers", content} + localStorage Map dedup`

const CONFIG_REASONS = [
  <>I kept persistence to <strong>files, not tables</strong>. <code className="code-inline">customers.js</code> on Hostinger 100GB is downloadable via File Manager in one click, no phpMyAdmin. For &lt;10k rows, this is faster to maintain.</>,
  <>I required <code className="code-inline">text-based PDF</code> (<code className="code-inline">pdf.text()</code> + <code className="code-inline">pdf.rect()</code>) instead of screenshot. Local AI defaulted to <code className="code-inline">html2canvas</code>, which creates a heavy image where <code className="code-inline">BCA 5771 •• 465</code> cannot be copied.</>,
  <>I forced the single source <code className="code-inline">indeepPricelist</code> (22 keys, 44 items) so invoice totals always match the public calculator. Any hallucination is caught by diffing against this file.</>,
  <>I kept <code className="code-inline">localStorage</code> as fallback: if <code className="code-inline">fetch(save.php)</code> fails (500 or CORS on Hostinger), data is still saved and an <code className="code-inline">Export customers.js</code> button appears for manual download.</>,
]

const CHART_TEXT = {
  data: [
    { label: 'Size', value: 45 },
    { label: 'Selectable', value: 100 },
    { label: 'Logo', value: 100 },
    { label: 'Copy Rek', value: 100 },
  ],
  yMax: 100,
  footLeft: '0',
  footMid: 'score / 100 — text-based is smaller & copyable',
  footRight: '100',
}

const CHART_SHOT = {
  data: [
    { label: 'Size KB', value: 850 },
    { label: 'Selectable', value: 0 },
    { label: 'Logo', value: 100 },
    { label: 'Copy Rek', value: 0 },
  ],
  yMax: 900,
  footLeft: '0',
  footMid: 'size KB / boolean — screenshot is 19x heavier & not copyable',
  footRight: '900',
}

const FAQS = [
  {
    q: 'Do I need a database for a small business invoice system?',
    a: <>No. For under ~10k customers, a single <code className="code-inline">customers.js</code> file on Hostinger file storage (100GB) is enough. It&apos;s downloadable via File Manager, no phpMyAdmin. <code className="code-inline">save.php</code> (44 lines) handles <code className="code-inline">POST {'{type, content}'}</code> with allowlist. <code className="code-inline">localStorage</code> is fallback if <code className="code-inline">fetch</code> fails.</>,
  },
  {
    q: 'Why is selectable text in PDF important?',
    a: <>Customers need to copy the bank account <code className="code-inline">BCA 5771 •• 465</code> without retyping. Screenshot PDFs (850KB, image) don&apos;t allow copy. Text-based jsPDF (45KB) does, and it&apos;s 19x smaller. Logo still embeds via canvas PNG conversion.</>,
  },
  {
    q: 'Can local AI really handle jsPDF and file save logic?',
    a: 'Yes, but batched per component. One-shot generation hallucinated pricelist and broke logo CORS. Batched prompting (form → preview → pdf → save.php) with human validation produced 919 lines that work on shared hosting.',
  },
]

/* ---------- page ---------- */

export default function Exp006() {
  useScrollReveal()

  return (
    <main>
      <Seo
        title="Experiment 006 — Building a Self-Contained Invoice System Without a Database"
        description="Can a live A4 invoice tool with customer DB and selectable PDF be built with only local LLMs — no MySQL, just .js + 44 lines PHP? Evidence: 919 lines."
        image="/images/experiments006/invoice-form-preview.webp"
        path="/exp006.html"
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
                <li aria-current="page" className="font-semibold text-ink">Experiment 006</li>
              </ol>
            </nav>
            <Link to="/experiments-list" className="arrow-link text-xs uppercase text-neutral-500 inline-block mt-4" data-reveal>
              <span aria-hidden="true">←</span> Back to Experiments
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="100">
              <Eyebrow>Experiment 006</Eyebrow>
              <StatusBadge variant="stable" />
            </div>
            <h1 className="mt-6 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" data-reveal="200">
              Building a Self-Contained Invoice System Without a Database.
            </h1>
            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl" data-reveal="300">
              Can an internal business tool with customer DB, live A4 preview, and selectable text-based PDF be built end-to-end using only local LLMs, with no traditional database, just <code className="code-inline">.js</code> files + 44 lines of PHP on shared hosting?
            </p>
          </div>
        </div>
      </section>

      {/* ================= SYSTEM REQUIREMENTS ================= */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow>System Requirements</Eyebrow>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
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
                <p className="text-base text-neutral-700 leading-relaxed">
                  The public site from EXP 005 solved marketing, but operations were still manual. Invoices were typed in Word/Excel, customer data was scattered across WhatsApp, the 44 price items had to be remembered, and PDFs were inconsistent. I needed an internal tool that could (a) autocomplete returning customers, (b) auto-calculate from the same pricelist, (c) show a live A4 preview, and (d) generate a PDF where the bank account can be copied, without a SaaS subscription and without setting up MySQL on shared hosting.
                </p>
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
                <p className="text-base text-neutral-700 leading-relaxed">A local open-source LLM (ORNITH 35B IQ4_NL via Llama.cpp) can generate this operational tool if prompts are deterministic per component (form, preview, PDF, save.php) and the builder understands the file-persistence vs DB trade-off. File-based is sufficient for SMB (&lt;10k customers) and more maintainable than MySQL on shared hosting.</p>
              </div>
            </div>

            {/* EXPERIMENT */}
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
              <div className="lg:col-span-3"><span className="detail-label">Experiment</span></div>
              <div className="lg:col-span-9">
                <p className="text-base text-neutral-700 leading-relaxed">I built it by prompting the local model per batch: first <code className="code-inline">invoice.html</code> skeleton, then <code className="code-inline">company.js</code> modal, then <code className="code-inline">customers.js</code> autocomplete + <code className="code-inline">save.php</code>, then <code className="code-inline">calcTotals/updatePreview</code>, then <code className="code-inline">generateTextPDF</code>, each validated in a small context window via OpenCode + Cline in VS Code. Not one-shot.</p>
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
                <p className="text-base text-neutral-700 leading-relaxed">Same pivot as EXP 005: stop relying 100% on AI. AI drafts syntax, human decides if <code className="code-inline">save.php</code> allowlist is safe, if <code className="code-inline">pdf.addImage</code> needs PNG conversion, if <code className="code-inline">pricelist.js</code> is the single source. Added business insight: for a small service business, <strong>file-based &gt; MySQL</strong>: one <code className="code-inline">customers.js</code> downloadable via File Manager beats setting up phpMyAdmin on shared hosting.</p>
              </div>
            </div>

            {/* EVIDENCE */}
            <div data-reveal>
              <div className="grid lg:grid-cols-12 gap-4 lg:gap-10">
                <div className="lg:col-span-3"><span className="detail-label">Evidence</span></div>
                <div className="lg:col-span-9">
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-6">Figures from the live internal tool on Hostinger. You can verify via the screenshots above and by inspecting <code className="code-inline">save.php</code> (44 lines).</p>
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
                <p className="text-base text-neutral-700 leading-relaxed">The tool is stable and live internally. An admin can create an invoice in under 2 minutes, customer data auto-saves to <code className="code-inline">customers.js</code> (and <code className="code-inline">localStorage</code>), the PDF is 45KB text-selectable (vs 850KB image), and the owner can backup <code className="code-inline">customers.js</code> anytime via File Manager without DB knowledge. Not an enterprise ERP, but sufficient for a Greater Jakarta SMB.</p>
              </div>
            </div>

            {/* WHAT I LEARNED */}
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
              <div className="lg:col-span-3"><span className="detail-label">What I Learned</span></div>
              <div className="lg:col-span-9">
                <p className="text-base text-neutral-700 leading-relaxed">Determinism matters even more for internal tools: <code className="code-inline">save.php</code> must have an allowlist, <code className="code-inline">logo</code> must be converted to PNG, <code className="code-inline">pricelist</code> must be read verbatim. File-based persistence is underrated: local AI can generate CRUD without a database if the builder understands file I/O trade-offs. The model is the typer, the builder is the reviewer.</p>
              </div>
            </div>

            {/* PRACTICAL IMPLICATION */}
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
              <div className="lg:col-span-3"><span className="detail-label">Practical Implication</span></div>
              <div className="lg:col-span-9">
                <p className="text-base text-neutral-700 leading-relaxed"><strong>For business owners:</strong> you don&apos;t need a Rp200k/month SaaS. With local AI + Hostinger 100GB you own your invoice tool 100%, backup is one download. <strong>For recruiters:</strong> this proves the builder can ship both the public marketing site (EXP 005) and the internal ops tool (EXP 006) with the same local stack: end-to-end ownership, no cloud dependency. Start from one file (<code className="code-inline">save.php</code>), validate file writes, then batch the next component.</p>
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
            <p className="font-mono text-sm text-neutral-500">save.php — the entire backend (44 lines)</p>
            <pre className="code-block mt-4"><code>{CONFIG_SAVE_PHP}</code></pre>
          </div>

          <div className="mt-8" data-reveal="100">
            <p className="font-mono text-sm text-neutral-500">customers.js — file-based DB (dummy samples)</p>
            <pre className="code-block mt-4"><code>{CONFIG_CUSTOMERS_JS}</code></pre>
          </div>

          <blockquote className="quote-block mt-10 text-sm sm:text-base text-ink leading-relaxed max-w-3xl" data-reveal>
            Do not copy this snippet blindly. The key lesson is the allowlist + file storage: local AI can generate the <code className="code-inline">fetch</code> + <code className="code-inline">localStorage</code> dual save, but you must ensure <code className="code-inline">customers.js</code> is never overwritten with an invalid type. That safety check is human judgment.
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
              Why Text-Based PDF Won — Size, Selectability, and Cost
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              The same invoice generated two ways. Local AI initially suggested an <code className="code-inline">html2canvas</code> screenshot, but the human corrected it to the <code className="code-inline">jsPDF</code> text API. The difference is 19x size and copy-paste.
            </p>
          </div>

          {/* Chart 1: Text-based */}
          <div className="mt-8 border border-black/10 rounded-2xl p-6 sm:p-10 bg-paper" data-reveal="150">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display font-extrabold text-sm tracking-[0.08em] uppercase">Text-Based PDF — jsPDF (Chosen)</h3>
              <StatusBadge variant="stable" label="45KB — Selectable" className="!text-[0.58rem] sm:!text-[0.65rem] !px-2.5 sm:!px-3 !py-1 shrink-0" />
            </div>
            <div className="mt-6">
              <BarChart data={CHART_TEXT.data} yMax={CHART_TEXT.yMax} />
            </div>
            <div className="mt-4 flex items-center justify-between text-[0.65rem] font-display font-bold tracking-[0.16em] uppercase text-neutral-400">
              <span>{CHART_TEXT.footLeft}</span>
              <span>{CHART_TEXT.footMid}</span>
              <span>{CHART_TEXT.footRight}</span>
            </div>
            <p className="mt-4 text-xs text-neutral-500 leading-relaxed">Size is KB for the first bar (45KB) and 0/100 for booleans. Rekening <code className="code-inline">BCA 5771 •• 465</code> is selectable. It is masked here and full in the real PDF.</p>
          </div>

          {/* Chart 2: Screenshot — badge failed tanpa dot (persis live) */}
          <div className="mt-6 border border-black/10 rounded-2xl p-6 sm:p-10 bg-paper" data-reveal="200">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display font-extrabold text-sm tracking-[0.08em] uppercase">Screenshot PDF — html2canvas (Rejected)</h3>
              <span className="status-badge status-failed !text-[0.58rem] sm:!text-[0.65rem] !px-2.5 sm:!px-3 !py-1 shrink-0">850KB — Image Only</span>
            </div>
            <div className="mt-6">
              <BarChart data={CHART_SHOT.data} yMax={CHART_SHOT.yMax} />
            </div>
            <div className="mt-4 flex items-center justify-between text-[0.65rem] font-display font-bold tracking-[0.16em] uppercase text-neutral-400">
              <span>{CHART_SHOT.footLeft}</span>
              <span>{CHART_SHOT.footMid}</span>
              <span>{CHART_SHOT.footRight}</span>
            </div>
          </div>

          {/* Flow diagram */}
          <FlowDiagram />

          <p className="mt-6 text-xs text-neutral-500 leading-relaxed max-w-3xl" data-reveal>
            EXP 005&apos;s chart was Lighthouse performance. This chart is architecture, proving file-based persistence is 19x smaller and more practical for SMB than a screenshot or a full DB.
          </p>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow>Screenshots</Eyebrow>

          {/* Hero row: 1 large */}
          <div className="mt-8" data-reveal="0">
            <figure>
              <ZoomImage
                src="/images/exp006-1.webp"
                alt="Screenshot 1 — invoice generator desktop with left form (customer, items, totals) and right live A4 preview"
                width={1440}
                height={878}
              />
              <figcaption className="mt-3 text-xs font-display font-bold tracking-[0.14em] uppercase text-neutral-500 text-center">Form + Live A4 Preview — Desktop (lg:grid-cols-12)</figcaption>
            </figure>
          </div>

          {/* Row 2: 3 cols */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <figure data-reveal="120">
              <ZoomImage
                src="/images/exp006-2.webp"
                alt="Screenshot 2 — mobile view with sticky bar Preview | PDF | Print for admin on phone"
                width={1440}
                height={878}
              />
              <figcaption className="mt-3 text-xs font-display font-bold tracking-[0.14em] uppercase text-neutral-500 text-center">Mobile Sticky Bar — Admin on Phone</figcaption>
            </figure>
            <figure data-reveal="240">
              <ZoomImage
                src="/images/exp006-3.webp"
                alt="Screenshot 3 — generated PDF with selectable text, BCA bank account can be highlighted and copied"
                width={1440}
                height={878}
              />
              <figcaption className="mt-3 text-xs font-display font-bold tracking-[0.14em] uppercase text-neutral-500 text-center">Text-Based PDF — Selectable &amp; Copyable (45KB)</figcaption>
            </figure>
            <figure data-reveal="360">
              <ZoomImage
                src="/images/exp006-4.webp"
                alt="Screenshot 4 — Hostinger File Manager showing customers.js file storage (100GB)"
                width={1440}
                height={878}
              />
              <figcaption className="mt-3 text-xs font-display font-bold tracking-[0.14em] uppercase text-neutral-500 text-center">File-Based Storage — Hostinger File Manager</figcaption>
            </figure>
          </div>
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
              From a purely objective standpoint, this is not an enterprise-grade ERP. Given it was built with a 35B local model on consumer hardware and runs on shared hosting file storage, I consider it sufficient and practical for real small-business invoicing. The trade-off (file-based vs MySQL) is intentional for maintainability at this scale, with known limits if customer count grows beyond file-based practicality. That said, for the Greater Jakarta service business it serves, it is stable, live, and fully owned.
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
