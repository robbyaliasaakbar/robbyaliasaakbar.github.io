import { Link } from 'react-router-dom'
import Eyebrow from '../components/shared/Eyebrow.jsx'
import StatusBadge from '../components/shared/StatusBadge.jsx'
import { RadarChart } from '../components/experiment/Chart.jsx'
import ZoomImage from '../components/experiment/ZoomImage.jsx'
import ScreenshotCarousel from '../components/experiment/ScreenshotCarousel.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'
import Seo from '../components/shared/Seo.jsx'

/* ============================================================
   EXPERIMENT 004 — port dari live exp004.html (1423 baris).
   URUTAN FINAL (revisi Rob via struktur-section-exp004.md, 10 Okt 2026):
   Header → Specs → Summary → Details → Reliability → Business →
   Cost → Viz → Hardware → Operational → Gallery(carousel) → FAQ → CTA
   Perubahan Rob vs port pertama:
   - Reliability: dari sebelum Details → KESETALAH Details
   - Business + Cost: dari sesudah Gallery → sebelum Viz
   - Gallery: dari stack 3 gambar sesudah Viz → CAROUSEL AUTOPLAY
     (pause saat hover, dots navigasi, crop 16/10, zoom tetap jalan)
   - Config/bar/line: live gak punya → skip (tetap)
   ============================================================ */

/* ---------- helpers lokal ---------- */

/* Daftar bernomor (1. accent + text) — pola live exp004 */
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

/* ScreenshotCarousel udah di-extract ke shared component
   (src/components/experiment/ScreenshotCarousel.jsx) — dipakai exp004 + exp005. */

/* ---------- data ---------- */

const SPECS_RUNTIME = [
  { label: 'CPU', value: 'Intel Core i5-11400F', delay: 0 },
  { label: 'RAM', value: '16GB DDR4 3200 MT/s', delay: 40 },
  { label: 'GPU', value: 'RX 6700 XT', delay: 80 },
  { label: 'OS', value: 'Ubuntu 26.04 LTS', delay: 120 },
  { label: 'Inference Engine Runtime', value: 'Ollama', delay: 160 },
  { label: 'Frontend UI', value: <>Open WebUI &amp; n8n</>, delay: 200 },
  { label: 'Model For Parsing', value: 'qwen-2.5-1.5B-instruct-Q8_0.GGUF', delay: 0 },
  { label: 'Status', value: 'STABLE', delay: 40 },
]

const SPECS_DEV = [
  { label: 'Dev Model', value: 'ORNITH-1.0-35B-A3B-IQ4_NL-GGUF', delay: 0 },
  { label: 'Dev Engine', value: 'Llama.cpp and opencode plus MCP n8n', delay: 40 },
]

const GALLERY = [
  {
    n: '1.', title: 'Workflow Overview with 266 Nodes', tag: 'n8n',
    src: '/images/exp004-1.webp',
    alt: 'Screenshot 1 of Experiment 004. Digital employees workflow overview with 266 nodes',
    w: 1440, h: 878,
    caption: 'Workflow Overview — 3 workflows and 266 nodes running 24/7',
    delay: 0,
  },
  {
    n: '2.', title: 'Customer Service Workflow', tag: 'Deterministic',
    src: '/images/exp004-2.webp',
    alt: 'Screenshot 2 of Experiment 004. Deterministic workflow details for customer service',
    w: 1258, h: 804,
    caption: 'Customer Service — Deterministic workflow details',
    delay: 50,
  },
  {
    n: '3.', title: 'Payment Gateway and Admin Workflow', tag: 'Integration',
    src: '/images/exp004-3.webp',
    alt: 'Screenshot 3 of Experiment 004. Payment gateway and admin workflow integration',
    w: 1265, h: 797,
    caption: 'Payment Gateway and Admin — Workflow integration',
    delay: 100,
  },
]

const AI_FIRST = [
  'Hallucinates a lot at crucial points',
  'Unpredictable, complex & hard to debug',
  'Fails to verify whether payment was made',
  'Hundreds of tests failed',
]

const DET_FIRST = [
  'AI used in only 4 of 266 nodes (keyword detection)',
  '0 hallucinations & 0 tasks not completed',
  '100% effectiveness, easy to debug & mitigate',
  'System running stably, ready for upgrades',
]

const RADAR = {
  axes: ['Hallucination Free', 'Task Completion', 'Effectiveness', 'Debuggability', 'Mitigation Ease', 'System Stability'],
  series: [
    { label: 'AI First', values: [10, 20, 25, 15, 20, 15], color: '#D70000' },
    { label: 'Deterministic First', values: [100, 100, 100, 100, 100, 95], color: '#2E8B2E' },
  ],
}

const SUMMARY = [
  'Think of my business like a small food stall. Every day there are customers asking where we deliver, what they want to wash, when we can come, and what their house number is. This system is the stall assistant that never sleeps. It is live and I update it every 2 weeks from real notes.',
  'At first I gave all the keys to a smart intern and told him to guess everything. He guessed the price. He guessed the area. He even guessed if people already paid. He was confident but often wrong. That was the AI first phase. Hundreds of tries failed.',
  'Then I changed the job. The intern now only shouts short keywords. Like Jakarta. Like sofa. Like today at 2. Like number 11. That is all. The boss which is my hardcoded rules plus my database decides the price and the schedule and the reply. If the shout is unclear, we simply ask again. No guessing.',
  'I tested it like a stall owner tests a new helper. First I tried 40 to 50 tricky customers myself. Then my staff tried to trick it. Then my non technical friends tried their own weird requests. It took 4 days to call it ready. Total hundreds of chats with the same steady answers. It still runs today.',
  'In daily work it covers the boring repeat jobs of 9 to 10 people in 5 spots. Like 4 to 5 admin sellers from first chat to closing. Like 2 to 3 customer service for complaints. Like 1 ads helper that sends leads to Meta and Google. Like 1 data note taker that saves failed inputs for research. Like 1 finance helper for invoices linked to my exp006. Smart decisions stay with humans.',
  'About money. This is estimation, not promise. Paying 9 to 10 people with Bekasi minimum simplified to 5 million each plus allowances easily passes 50 million a month. I run at about 564 thousand a month. It is plus 400 thousand electricity measured at home plus about 164 thousand gateway fees. The fee is 574 flat per paid transaction times about 11 a day times 26 work days. Hardware is already owned. Internet uses the existing home line. Maintenance is a few hours a week by one person.',
  'About payment. Each deal gets its own unique virtual number or QR code. It lives for 3 minutes and we make a new one if it expires. We only wait for a succeed status. We never guess from transfer screenshots. The webhook road uses Tailscale Funnel so there is no direct public IP. History with personal data is wiped. Only order notes stay for finance. Gateway name is hidden on purpose and you can swap it with any licensed one.',
  'About crowd. Orders did not drop. Revenue is stable. There is a small lift but nothing crazy. Same as similar stalls run by humans. What clearly changed is spending and how easy it is to scale and maintain. The machine is modest. For daily run I use auto start, periodic health checks, scheduled rest of 1 to 2 hours at quiet time, spare WhatsApp numbers, and a human backup when the machine rests. Unofficial WhatsApp tools carry ban risk from Meta. Best practice remains the official Meta API.',
]

const RELIABILITY = [
  {
    label: 'Private Road',
    text: 'Webhooks use Tailscale Funnel. Public yes but with no direct public IP. The private callback road is separated from the public customer pages. History with personal data is wiped after the JSON reaches the trigger. Only order notes stay for finance.',
    delay: 0,
  },
  {
    label: 'WhatsApp Numbers Can Be Banned',
    text: 'All unofficial WhatsApp tools carry the same ban risk from Meta if detected. I do not hide this. I keep 1 to 2 spare WhatsApp numbers ready. I use a separate funnel, human like typing pauses, throttled broadcast a few times a week with max 20 contacts per batch and randomized pattern. Best practice remains the official Meta API.',
    delay: 40,
  },
  {
    label: 'Machine Needs Rest Plus Human Backup',
    text: 'Ollama auto starts with system service. n8n runs in Docker with always restart. Health is checked with periodic terminal checks. This is not workstation hardware with no ECC memory. So I rest the PC 1 to 2 hours at quiet time to keep it durable. When the system rests or stops, a human takes over. That is the human in the loop fallback.',
    delay: 80,
  },
]

const PROBLEM_QUOTES = [
  'An operations administrator responsible for serving customers via WhatsApp, handling the process from the initial chat through to closing the sale.',
  'Customer service staff responsible for handling complaints and providing solutions.',
  'Data analysis aimed at determining what the market actually needs.',
  'An ads specialist capable of interpreting conversion types and linking them to Meta CAPI and Google pixels',
  'A finance system that integrates with payment gateways and can generate invoices when needed.',
]

const SPECIFICATIONS = [
  'Since this is a service business operating on a home service model, it is essential to define the service coverage area. Based on current operations, this is determined at the sub district level.',
  'Since this is a service business with preset prices, I need a system capable of interpreting or normalizing customer language.',
  'In addition to customer language normalization, I also need a system capable of reading and interpreting images or content sent by customers, in order to identify and match them against the price list. Beyond price list issues, I also require a system that can interpret images or videos based on customer complaints.',
  'I also need data to conduct research for business development and the development of this system itself.',
  'I need a WhatsApp API that can be integrated with the system I am building.',
  'I need a database to store all customer data, price lists, complaint types, service areas, and schedule bookings.',
  'I need a system capable of reading specific customer house numbers to determine whether or not they are detected.',
  'I need a payment gateway that can be integrated with my system so that every payment can be verified in real time.',
]

const HYPOTHESIS = [
  'Tools that orchestrate all my needs and my choice is n8n, because it has exactly what I require.',
  'An open source API for WhatsApp that allows my n8n instance to connect with webhook and HTTP request nodes. I chose EVOLUTION API because it is an open source API that provides exactly what I need.',
  'A database tool for storing all data. I chose PostgreSQL due to its compatibility with the EVOLUTION API and my familiarity with the tool.',
  'A small LLM model tasked with parsing keywords, and I chose qwen-2.5-1.5B-instruct-Q8_0.GGUF.',
  'An inference engine tool that can automatically start up when needed and I chose Ollama for its ease of use.',
  (
    <>
      A payment gateway adapter reachable with status check plus webhook verification. I use a private
      internal adapter. Name is withheld for privacy. You can swap it with any licensed gateway such as
      Midtrans or Xendit or DOKU. It issues unique virtual numbers plus QR codes per transaction and
      returns a succeed status. No customer data entry. No screenshot guessing. See Cost and Reliability
      sections for fees and safeguards. Invoicing links to my{' '}
      <Link to="/exp006.html" className="underline hover:text-accent">exp006</Link> invoice generator.
    </>
  ),
]

const WHAT_FAILED = [
  'The AI I installed hallucinates a lot 🤣. Its AI often fails at crucial or critical points, such as cost estimation, coverage validation, and so on.',
  'The system has become unpredictable. It is difficult for me to determine which parts actually require mitigation, which are erroneous, and which are broken. It is simply too complex.',
  'The payment gateway, and this is the most crucial point, its AI consistently fails to identify whether the payment has actually been made or not.',
]

const EVIDENCE_PARAS = [
  'These are the figures I obtained after changing my approach. (You can look at the screenshot I provided above)',
  'How tested. 40 to 50 tricky scenarios by me. Then staff testing with their own ideas. Then non technical friends testing theirs. 4 days to fully tested. Hundreds of chats total with identical outputs. Decoding locked at temp 0 and top p 0.1 with greedy sampling. One bubble with up to 5 intents is split by hardcoded logic and parsed in parallel. No exact lab count. Layered validation before public deploy. Stable since.',
  'How guarded. Regex cleans before the model. JS plus Postgres checks after the model. Unknown means ask the customer. Never guess.',
]

const EVIDENCE = [
  { label: 'Hallucinate', value: '0' },
  { label: 'Task Not Completed', value: '0' },
  { label: 'Effectiveness', value: '100%' },
  { label: 'System Corruption', value: 'None' },
  { label: 'Total Workflow', value: <>3 <span className="text-xs font-semibold text-neutral-500">separate workflows</span></> },
  { label: 'Total Nodes', value: <>266 <span className="text-xs font-semibold text-neutral-500">Nodes</span></> },
  { label: 'Easily Mitigatable', value: 'Yes' },
  { label: 'Easy to Debug', value: 'Yes. 100%' },
]

const KEYWORD_CARDS = [
  {
    label: 'A. Location',
    jsx: (
      <>
        Input <code className="code-inline">aku dijakarta kak</code> becomes{' '}
        <code className="code-inline">jakarta</code>. More examples{' '}
        <code className="code-inline">cikarang</code> becomes <code className="code-inline">cikarang</code>{' '}
        and <code className="code-inline">BSD</code> becomes <code className="code-inline">BSD</code>. Cleaned
        before the model. Then code checks province to village level. Then database checks coverage. Then
        template reply is prepared.
      </>
    ),
  },
  {
    label: 'B. Item',
    jsx: (
      <>
        Input <code className="code-inline">saya mau cuci kasur ukuran 180 2 pcs</code> becomes{' '}
        <code className="code-inline">kasur, 180, 2 pcs</code>. Then hardcoded price estimate follows. Input{' '}
        <code className="code-inline">saya mau cuci sofa</code> becomes{' '}
        <code className="code-inline">sofa, ukuran unknown, qty unknown</code>. Then we ask details first. No
        model after this point.
      </>
    ),
  },
  {
    label: 'C. Schedule',
    jsx: (
      <>
        Input <code className="code-inline">saya mau hari ini jam 2 siang</code> becomes{' '}
        <code className="code-inline">hari ini, jam 2 siang</code>. Then hardcoded scheduler follows.
      </>
    ),
  },
  {
    label: 'D. House Number',
    jsx: (
      <>
        Input <code className="code-inline">griya asri 2 blok e5 nomor 11</code> becomes{' '}
        <code className="code-inline">11</code>. If unreadable it becomes{' '}
        <code className="code-inline">unknown</code>. Then we ask again so the field team never gets lost.
      </>
    ),
  },
]

const DETAILS = [
  {
    label: 'Problem',
    block: true,
    jsx: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">
          Am I capable of creating a system to help me run a service business? I ask because
          I need to fill a number of vacant positions.
        </p>
        <div className="mt-6 space-y-3">
          {PROBLEM_QUOTES.map((q) => (
            <blockquote key={q} className="quote-block text-sm sm:text-base text-neutral-600 leading-relaxed">
              {q}
            </blockquote>
          ))}
        </div>
      </>
    ),
  },
  {
    label: 'Specifications',
    block: true,
    jsx: <NumList items={SPECIFICATIONS} />,
  },
  {
    label: 'Hypothesis',
    block: true,
    jsx: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed mb-6">
          My hypothesis is that I need the necessary tools, such as:
        </p>
        <NumList items={HYPOTHESIS} />
      </>
    ),
  },
  { label: 'Experiment', text: 'I set out to build this system by leveraging AI to the fullest, using a sufficiently large LLM to bridge the gap regarding technical syntax requirements and integrating AI into every possible node to keep the system streamlined and minimize the node count. However, my reasoning turned out to be completely flawed, and the hundreds of tests I conducted using this approach failed utterly.' },
  {
    label: 'What Failed',
    block: true,
    jsx: <NumList items={WHAT_FAILED} />,
  },
  { label: 'Iteration', text: 'Reflecting on the failures I have experienced, I have come to realize that the answer is not always simply using a more capable AI to build the system and shorten the journey. Those setbacks led me to shift my approach from AI first to deterministic first. I now reserve AI only for moments where it is truly the right fit.' },
  { label: 'Evidence', evidence: true },
  {
    label: 'Keyword Parsing',
    block: true,
    jsx: (
      <>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-2">
          The model only extracts short keywords. Decisions happen after, with hardcoded rules. Indonesian
          examples below are kept original.
        </p>
        <p className="text-xs font-display font-bold tracking-[0.14em] uppercase text-neutral-500 mb-6">
          Decoding locked at temp 0 and top p 0.1 with greedy sampling. Clean before. Check after. Unknown means ask.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {KEYWORD_CARDS.map((c) => (
            <div key={c.label} className="border border-black/10 rounded-xl p-6 bg-paper">
              <p className="text-[0.65rem] font-display font-bold tracking-[0.16em] uppercase text-neutral-400">{c.label}</p>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{c.jsx}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  { label: 'Result', text: 'The results I achieved are the product of hundreds of tests and dozens of iterations and methodological adjustments. The outcome is a system that is easy to debug and mitigate. Customer inputs not detected by the system are captured in the database to inform upgrades, anomalous inputs are logged for market research, and failed inputs are kept as research data for the 2 week iteration cycle.' },
  { label: 'What I Learned', text: 'AI is powerful, but its true value lies in using it at the right time, leveraging its strengths, and most importantly knowing how to use it effectively. Through my own experiences with failure, I have learned that AI can be a highly effective tool for running a business like the one I am currently building without requiring massive resources, provided we understand how to use it and identify the right approaches. Portfolio not tutorial. Concurrent learnings from exp001 and exp002 are referenced. Develop it yourself.' },
  { label: 'Practical Implication', text: 'This is not a simple task, nor is it something a beginner can do easily. If you want to build something like this, start by creating a system where the AI parses keywords and generates simple reply templates. Start with keyword parsing plus templates. Then expand to parallel splitter plus deterministic checks.' },
]

const BUSINESS = [
  { label: '4 to 5 Admin Sales Operational', text: 'Handling WhatsApp from first chat to closing, checking sub district coverage, and normalizing customer language against the price list.', delay: 0 },
  { label: '2 to 3 Customer Service', text: 'Handling complaints and providing solutions without shift limits or waiting for the next working hour.', delay: 40 },
  { label: '1 Data Analyst', text: 'Inputs that fail to enter the main flow are saved to my private database. When I need market research, a new service, or a promo amount, I just look at the data instead of guessing.', delay: 80 },
  { label: '1 Ads Specialist', text: 'Evolution API sends conversion payloads to Meta CAPI and Google in real time with n8n HTTP Request, so custom audiences can grow on their own without paying an agency just to optimize.', delay: 120 },
  {
    label: '1 Finance',
    jsx: (
      <>
        Tracking who has paid and who has not, and generating financial and tax reports when needed with
        payment gateway verification. Invoicing links to{' '}
        <Link to="/exp006.html" className="underline hover:text-accent">exp006</Link> invoice generator.
      </>
    ),
    delay: 160,
  },
]

const COST_HUMAN = [
  'Salary. UMR Bekasi Regency times 9 to 10',
  'THR, allowances and training',
  'Management overhead and limited working hours',
  'Office rent plus leave plus turnover drama. Benchmark Bekasi minimum simplified to Rp 5jt per person. Estimation not guarantee.',
]

const COST_SYSTEM = [
  'Electricity plus Rp 400k per month. Measured at home. 24 per 7 existing PC.',
  'Gateway about Rp 164k per month. Rp 574 flat times about 11 paid per day times 26 work days.',
  'Hardware owned. Internet existing. No server rent. Build cost excluded as sunk CAPEX.',
  'Maintenance a few hours a week by 1 person for logs plus failed input iteration.',
  'Postgres plus Evolution API plus qwen model with Ollama. Full file name in System Requirements.',
]

const WHY_SEATS = [
  'Admin sales operational. Serves new chats until closing.',
  'Customer service. Handles complaints, warranty help, and all after sales talk.',
  (
    <>
      Ads specialist. Sends csv payload to Meta pixel and Google ads to build custom audience from curated
      CRM data, so the lookalike target stays sharp and ads stay effective. See the live CRM web app I built{' '}
      <a href="https://robbyaliasaakbar.github.io/miniLeads/" target="_blank" rel="noopener" className="underline decoration-accent decoration-2 underline-offset-2 hover:text-accent transition-colors">miniLeads CRM</a>.
    </>
  ),
  'Data analytics. Reads the unknown pile in Postgres, the chats the system could not read, to maintain the system, set promos, and add services, so research uses real data with clear scope and no guessing.',
  (
    <>
      Finance. Only makes invoices, now replaced by the system that connects straight to the internal web
      app. Screenshots live in the invoice story{' '}
      <a href="https://robbyaliasaakbar.github.io/exp006.html" target="_blank" rel="noopener" className="underline decoration-accent decoration-2 underline-offset-2 hover:text-accent transition-colors">exp006 invoice story</a>.
    </>
  ),
]

const HW_ROWS = [
  ['CPU', 'Intel Core i5-11400F'],
  ['RAM', '16GB DDR4 3200 MT/s'],
  ['GPU', 'RX 6700 XT'],
  ['OS', 'Ubuntu 26.04 LTS'],
  ['Inference runtime', 'Ollama'],
  ['Runtime model', 'qwen-2.5-1.5B-instruct-Q8_0.GGUF'],
  ['Dev model', 'ORNITH-1.0-35B-A3B'],
  ['Dev engine', 'Llama.cpp and opencode plus MCP n8n'],
  ['Frontend', <>Open WebUI &amp; n8n</>],
]

const HW_TIPS = [
  'Ollama auto run with system service. n8n with Docker always restart. Health with periodic terminal checks.',
  'Scheduled rest 1 to 2 hours at quiet hours. Non ECC memory lasts longer with rest.',
  'NVMe backup plus UPS plus stable internet.',
  'Human in the loop fallback when system is down for rest or maintenance.',
]

const OPS = [
  { label: 'Available 24 per 7', text: 'No shift limits. The system responds whether it is 2 PM or 2 AM.', delay: 0 },
  { label: 'Consistent Execution', text: 'No psychological fatigue or inconsistency in repetitive tasks.', delay: 40 },
  { label: 'Lower Recurring Overhead', text: 'No THR or allowances for repetitive operational tasks.', delay: 80 },
  { label: 'Failed Inputs Become Data', text: 'Every input the system could not detect is saved to the database. I use it for market research, new services, and promo decisions with no more guessing.', delay: 120 },
]

const FAQS = [
  {
    q: 'Why did AI first fail so badly?',
    open: true,
    a: 'AI hallucinated at critical points like cost estimation plus coverage validation plus payment verification and became unpredictable with hundreds of tests failing. Hard to debug.',
  },
  {
    q: 'What is deterministic first?',
    a: 'Clean first. Then Qwen 1.5B extracts 1 to 3 keywords at 4 points with temp 0 and top p 0.1. Then JS plus Postgres decides. Only 4 of 266 nodes. One bubble with up to 5 intents split in parallel. Unknown means ask. Never guess.',
  },
  {
    q: 'Can a beginner build this?',
    a: 'Start small with AI parsing plus reply templates. The full system is 3 workflows with 266 nodes. Not beginner friendly but the keyword first pattern scales. See exp001 and exp002 first. Develop it yourself. Portfolio not tutorial.',
  },
  {
    q: 'Can this really handle the work of 9 to 10 people?',
    a: 'In my case it handles the repeat rule based workload with 4 to 5 admin sales operational plus 2 to 3 customer service plus 1 data analyst plus 1 ads specialist plus 1 finance role. Not strategic or creative decisions. Those still need human judgment. Invoicing links exp006.',
  },
  {
    q: 'Is the more than Rp 50 million saving guaranteed?',
    a: 'No. It is my own estimation using Bekasi minimum simplified to Rp 5jt times 9 to 10 plus allowances. I run at about 564k with 400k electricity plus about 164k gateway. Your numbers will differ.',
  },
  {
    q: 'Do I need expensive hardware to run this every day?',
    a: 'No. Same Intel Core i5-11400F with 16GB plus 6700XT for Ornith 35B for dev plus Qwen 1.5B for runtime concurrently with exp001 and exp002 learnings. For daily run use auto start plus health checks plus 1 to 2 hours rest plus UPS and backup plus human fallback.',
  },
  {
    q: 'Will automating cut demand? What about inputs the system misses?',
    a: 'Flat stable means orders and revenue stable with small lift. Same as human run peers. Missed inputs saved to private database for 2 week iteration plus market research plus promos.',
  },
  {
    q: 'How is payment verified without storing sensitive data?',
    a: 'Unique virtual numbers plus QR codes per transaction with 3 minute window. New code if expired. Status check plus webhook. Never screenshot. With Tailscale Funnel. Personal history wiped. Order notes kept. Name withheld. You can swap with licensed gateways. Fee Rp 574 flat per transaction.',
  },
  {
    q: 'Is WhatsApp ban risk hidden? What if the system is down?',
    a: 'No. Unofficial tools can be banned by Meta. Mitigated with isolated funnel plus typing pauses plus throttled randomized broadcast max 20 plus spare numbers. Ollama auto start plus n8n always restart plus scheduled rest plus human fallback. Best practice is official Meta API. Evidence is living and updated every 2 weeks with deeper pages to follow.',
  },
]

export default function Exp004() {
  useScrollReveal()

  return (
    <main>
      <Seo
        title="Experiment 004. Creating digital employees with the help of open source LLMs"
        description="Can 5 business functions like customer service, admin, ads, analytics and finance be run with only workflows and open source LLMs. A practical n8n case study."
        image="/images/experiments004/exp004-1.webp"
        path="/exp004.html"
        type="article"
      />
      {/* 1. EXPERIMENT HEADER — badge besar sendiri (PRD live) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true"></div>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 w-full pt-36 pb-20">
          <div className="max-w-4xl">

            <nav aria-label="Breadcrumb" className="text-xs font-display tracking-wide" data-reveal>
              <ol className="flex items-center gap-2 text-neutral-500">
                <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-neutral-300">/</li>
                <li><Link to="/experiments-list.html" className="hover:text-accent transition-colors">Experiments</Link></li>
                <li aria-hidden="true" className="text-neutral-300">/</li>
                <li aria-current="page" className="font-semibold text-ink">Experiment 004</li>
              </ol>
            </nav>

            <Link to="/experiments-list.html" className="arrow-link text-xs uppercase text-neutral-500" data-reveal>
              <span aria-hidden="true">&larr;</span> Back to Experiments
            </Link>

            <div className="mt-8" data-reveal="100">
              <Eyebrow>Experiment 004</Eyebrow>
              <StatusBadge variant="stable" className="mt-6 !text-sm !px-6 !py-2.5" />
            </div>

            <h1 className="mt-8 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" data-reveal="200">
              Creating digital employees with the help of open source LLMs.
            </h1>

            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl" data-reveal="300">
              Is it possible to set up customer service, operational admin, ads specialist, data
              analyst, and finance functions using only workflows and open source LLMs, given
              adequate hardware and reasonable resource usage?
            </p>

          </div>
        </div>
      </section>

      {/* 2. SYSTEM REQUIREMENTS — 2 grup: Runtime + Dev Tools */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <Eyebrow data-reveal>System Requirements</Eyebrow>

          <p className="mt-8 font-display font-bold text-sm tracking-tight" data-reveal>Runtime. What serves customers every day.</p>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {SPECS_RUNTIME.map((s) => (
              <div key={s.label} className="border border-black/10 rounded-xl p-5" data-reveal={String(s.delay)}>
                <p className="text-[0.65rem] font-display font-bold tracking-[0.16em] uppercase text-neutral-400">{s.label}</p>
                <p className="mt-2 text-sm font-medium leading-snug break-all">{s.value}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 font-display font-bold text-sm tracking-tight" data-reveal>Dev Tools. What helped me build it.</p>
          <p className="mt-2 text-sm text-neutral-600 leading-relaxed max-w-3xl" data-reveal="40">
            Not part of 266 nodes. Concurrent execution on the same machine uses learnings from{' '}
            <Link to="/exp001.html" className="underline hover:text-accent">exp001</Link> and{' '}
            <Link to="/exp002.html" className="underline hover:text-accent">exp002</Link>. Develop it yourself.
          </p>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {SPECS_DEV.map((s) => (
              <div key={s.label} className="border border-black/10 rounded-xl p-5" data-reveal={String(s.delay)}>
                <p className="text-[0.65rem] font-display font-bold tracking-[0.16em] uppercase text-neutral-400">{s.label}</p>
                <p className="mt-2 text-sm font-medium leading-snug break-all">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NON-TECHNICAL SUMMARY */}
      <section className="bg-neutral-50 py-20">
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

      {/* 4. EXPERIMENT DETAILS — bg-paper (putih), persis live */}
      <section className="py-20 bg-paper">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <Eyebrow data-reveal>Experiment Details</Eyebrow>

          <div className="mt-12 space-y-12">

            {DETAILS.map((d) =>
              d.evidence ? (
                /* EVIDENCE — 3 paragraf + tiles + ink quote box (khusus exp004) */
                <div key={d.label} data-reveal>
                  <div className="grid lg:grid-cols-12 gap-4 lg:gap-10">
                    <div className="lg:col-span-3">
                      <span className="detail-label">{d.label}</span>
                    </div>
                    <div className="lg:col-span-9">
                      {EVIDENCE_PARAS.map((p, i) => (
                        <p key={i} className={`text-sm sm:text-base text-neutral-700 leading-relaxed ${i === EVIDENCE_PARAS.length - 1 ? 'mb-6' : 'mb-4'}`}>
                          {p}
                        </p>
                      ))}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {EVIDENCE.map((e) => (
                          <div key={e.label} className="stat-tile border border-black/10 rounded-xl p-5 bg-paper">
                            <p className="text-[0.62rem] font-display font-bold tracking-[0.14em] uppercase text-neutral-400">{e.label}</p>
                            <p className="mt-2 font-display font-extrabold text-lg leading-tight">{e.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 bg-ink rounded-2xl p-6 sm:p-8">
                        <blockquote className="quote-block text-white !my-0">
                          <p className="text-sm sm:text-base leading-relaxed text-white">Zero hallucination happens for one clear reason. The model never thinks through the order and never decides the answer. It only catches one to three short words at each spot with greedy sampling at temp 0 and top p 0.1. That is all it does.</p>
                          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white">Full effectiveness happens for one clear reason too. Only four nodes in the whole system can call the model through the local Ollama address at <span className="break-all">http://127.0.0.1:11434/v1/chat/completions</span>. Each one lives on its own path. One path catches item name, size, qty from the price list. One path catches city, province, regency, district, village. One path catches day, hour. One path catches house number.</p>
                          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white">How it runs in practice. First the chat is cleaned and normalized before it ever reaches the model. Second the model catches the short keywords only on its assigned path. Third all the original chat and the model output move forward to code in JavaScript, Postgres, and other checks that decide the reply.</p>
                          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white">So zero hallucination is not an empty claim and full effectiveness is not an empty claim. There is simply nothing to guess about because unknown means ask again.</p>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              ) : d.block ? (
                /* ITEM DGN ISI KOMPLEKS — penuh kendali (Problem/Specs/Hypothesis/...) */
                <div key={d.label} className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
                  <div className="lg:col-span-3">
                    <span className="detail-label">{d.label}</span>
                  </div>
                  <div className="lg:col-span-9">{d.jsx}</div>
                </div>
              ) : (
                <div key={d.label} className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
                  <div className="lg:col-span-3">
                    <span className="detail-label">{d.label}</span>
                  </div>
                  <p className="lg:col-span-9 text-base text-neutral-700 leading-relaxed">
                    {d.text}
                  </p>
                </div>
              )
            )}

          </div>
        </div>
      </section>

      {/* 5. RELIABILITY AND RISK — rombak Rob: pindah ke SETELAH Details */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <Eyebrow data-reveal>Reliability and Risk</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl leading-tight max-w-3xl" data-reveal="100">
            Important to read before the details
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-3xl" data-reveal="150">
            If you skip this part, the rest of the page will look like magic. It is not magic. It is maintenance plus fallback.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {RELIABILITY.map((r) => (
              <div key={r.label} className="border border-black/10 rounded-xl p-6 bg-paper" data-reveal={String(r.delay)}>
                <p className="text-[0.65rem] font-display font-bold tracking-[0.16em] uppercase text-neutral-400">{r.label}</p>
                <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 border border-black/10 rounded-xl p-6 bg-paper" data-reveal="120">
            <blockquote className="quote-block text-sm sm:text-base text-neutral-700 leading-relaxed !my-0">
              Read this first. If the machine needs sleep, the human stays awake. That is how the stall stays open.
            </blockquote>
          </div>

        </div>
      </section>

      {/* 6. BUSINESS IMPACT — rombak Rob: pindah ke sini (sebelum Viz) */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow data-reveal>Business Impact. What I Actually Needed To Cover</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl leading-tight max-w-3xl" data-reveal="100">
            In practice, this system handles the repetitive workload of 9 to 10 roles.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-3xl" data-reveal="150">
            Not replacing people entirely. It covers the repeat and routine parts of 5 vacant functions I struggled to fill. Based on what I actually built and tested.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUSINESS.map((b) => (
              <div key={b.label} className="border border-black/10 rounded-xl p-6 bg-paper" data-reveal={String(b.delay)}>
                <p className="text-[0.65rem] font-display font-bold tracking-[0.16em] uppercase text-neutral-400">{b.label}</p>
                <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{b.jsx || b.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-neutral-500 leading-relaxed max-w-3xl" data-reveal="200">
            Note: This is about repeat rule based tasks designed to REPLACE those repeat roles. Strategic and creative decisions still need human judgment.
          </p>
        </div>
      </section>

      {/* 7. COST IMPLICATION — rombak Rob: pindah ke sini (sebelum Viz) */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow data-reveal>Cost Implication. An Estimation</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl leading-tight max-w-3xl" data-reveal="100">
            What 9 to 10 people would have cost and what I actually spend now.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-3xl" data-reveal="150">
            I calculated this using UMR Bekasi Regency as a reference. This is an estimation to illustrate the operational implication, not a guaranteed saving for every business.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {/* Kiri: biaya manusia */}
            <div className="border border-black/10 rounded-2xl p-6 sm:p-8 bg-paper" data-reveal="0">
              <div className="flex items-center justify-between">
                <p className="font-display font-bold text-xs tracking-[0.14em] uppercase text-neutral-500">If I hired 9 to 10 people</p>
                <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-[0.65rem] font-bold tracking-[0.12em] uppercase text-neutral-600">Recurring</span>
              </div>
              <p className="mt-4 font-display font-extrabold text-2xl tracking-tight">&gt;Rp 50,000,000 <span className="text-sm font-semibold text-neutral-500">/ month</span></p>
              <ul className="mt-6 space-y-2.5 text-sm text-neutral-600 leading-relaxed">
                {COST_HUMAN.map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0"></span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kanan: biaya sistem */}
            <div className="border border-[#2E8B2E]/25 rounded-2xl p-6 sm:p-8 bg-[#F3FAF3]" data-reveal="80">
              <div className="flex items-center justify-between">
                <p className="font-display font-bold text-xs tracking-[0.14em] uppercase text-[#2E8B2E]">What I run now</p>
                <StatusBadge variant="stable" />
              </div>
              <p className="mt-4 font-display font-extrabold text-2xl tracking-tight">About Rp 564.000 <span className="text-sm font-semibold text-neutral-500">/ month</span></p>
              <p className="mt-1 text-xs text-neutral-500">Cash out measured</p>
              <ul className="mt-6 space-y-2.5 text-sm text-neutral-700 leading-relaxed">
                {COST_SYSTEM.map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2E8B2E] shrink-0"></span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Why 9 to 10 — ink box */}
          <div className="mt-10 bg-ink rounded-2xl p-6 sm:p-8" data-reveal="120">
            <blockquote className="quote-block text-white !my-0">
              <h3 className="font-display font-bold text-lg sm:text-xl tracking-tight text-white">Why 9 to 10 people. Where the number comes from.</h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-white">Think of it like shift math at a small stall. I count the seats that disappear when the system runs, not fancy titles.</p>
              <ol className="mt-6 space-y-4 list-none">
                {WHY_SEATS.map((t, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-display font-extrabold text-white shrink-0">{i + 1}.</span>
                    <p className="text-sm sm:text-base leading-relaxed text-white">{t}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-white">Now the math. Five seats in an 8 hour day. Three seats work office hours. Ads specialist, data analytics, and finance. One seat means one person, so that is three people.</p>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-white">Two seats work 24 per 7 when the machine is safe, with no maintenance, no trouble, and the pc stays on. Admin sales operational and customer service. One seat for 8 hours means three people to cover 24 hours. Two seats like that mean six people.</p>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-white">Six and three makes nine. The first three seats also stay awake lightly at night for light scope, so I write it as 9 to 10 to stay honest.</p>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-white">About pay. I use Bekasi regency minimum wage from August 2025, when this system was born, around Rp 5,558,515 a month. Sources are all over Google, please search and prove it yourself. I round it to Rp 5 million a month to keep the simulation simple. This is estimation, not promise. Your numbers will differ.</p>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-white">So 9 to 10 is not a big claim to impress. It is shift math with honest rounding.</p>
            </blockquote>
          </div>

          {/* Bar visualization HTML */}
          <div className="mt-10 border border-black/10 rounded-2xl p-6 sm:p-8 bg-paper" data-reveal="160">
            <p className="text-xs font-display font-bold tracking-[0.14em] uppercase text-neutral-500">Estimated monthly operational cost</p>
            <div className="mt-6 space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-neutral-700">Human team (9 to 10 people)</span>
                  <span className="font-display font-bold text-neutral-500">&gt;Rp 50M</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-neutral-100 overflow-hidden">
                  <div className="h-full rounded-full bg-neutral-800" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-neutral-700">Digital system (this experiment)</span>
                  <span className="font-display font-bold text-[#2E8B2E]">About Rp 564k. About 1.1 percent</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-neutral-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#2E8B2E]" style={{ width: '2%' }}></div>
                </div>
              </div>
            </div>
            <p className="mt-6 text-xs text-neutral-500 leading-relaxed">
              *Estimation uses Bekasi minimum simplified to Rp 5jt per person for 9 to 10 headcount. System OPEX measured as plus 400k electricity plus about 164k gateway fees. Build and research is sunk CAPEX excluded. Your numbers will differ. Owner mentality means business keeps running and takes profit.
            </p>
          </div>
        </div>
      </section>

      {/* 8. VISUALIZATION — gradient compare + RADAR (chart ke-4) */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <Eyebrow data-reveal>Visualization</Eyebrow>

          <div className="mt-8" data-reveal="100">
            <h2 className="font-display font-bold text-xl sm:text-2xl tracking-tight">
              AI First vs Deterministic First
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              A comparison of methodologies that determined the success of this experiment.
            </p>
          </div>

          <div className="mt-8 border border-black/10 rounded-2xl p-8 sm:p-12 bg-paper" data-reveal="200">

            {/* Scale labels */}
            <div className="flex items-center justify-between text-[0.65rem] font-display font-bold tracking-[0.16em] uppercase text-neutral-400">
              <span>0%</span>
              <span>Success rate</span>
              <span>100%</span>
            </div>

            {/* Gradient scale: red (AI-First) to green (Deterministic-First) */}
            <div className="relative mt-4">
              <div
                className="h-6 sm:h-8 rounded-full"
                style={{ background: 'linear-gradient(90deg, #D70000 0%, #E85D00 30%, #C7A400 60%, #4CA64C 85%, #2E8B2E 100%)' }}
                role="img"
                aria-label="Comparison scale 0 to 100 percent. AI First fails with low score. Deterministic First succeeds with high score"
              ></div>

              <span className="absolute top-1/2 -translate-y-1/2 block w-3 h-3 rounded-full bg-white border-2 border-[#D70000] shadow" style={{ left: '12%' }} aria-hidden="true"></span>
              <span className="absolute top-1/2 -translate-y-1/2 block w-3 h-3 rounded-full bg-white border-2 border-[#2E8B2E] shadow" style={{ left: '86%' }} aria-hidden="true"></span>
            </div>

            {/* State labels */}
            <div className="mt-4 flex items-start justify-between gap-6">
              <div className="text-left max-w-[45%]">
                <p className="font-display font-extrabold text-sm sm:text-base uppercase tracking-[0.08em] text-accent">AI First</p>
                <p className="mt-1 text-xs sm:text-sm text-neutral-500 leading-relaxed">AI applied to every node to shorten the journey.</p>
              </div>
              <div className="text-right max-w-[45%]">
                <p className="font-display font-extrabold text-sm sm:text-base uppercase tracking-[0.08em] text-[#2E8B2E]">Deterministic First</p>
                <p className="mt-1 text-xs sm:text-sm text-neutral-500 leading-relaxed">AI reserved only where it is truly the right fit.</p>
              </div>
            </div>

            {/* Before / After cards */}
            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              <div className="border border-[#D70000]/20 rounded-2xl p-6 bg-[#FFF7F7]">
                <div className="flex items-center justify-between">
                  <p className="font-display font-extrabold text-sm sm:text-base uppercase tracking-[0.08em] text-accent">AI First</p>
                  <StatusBadge variant="failed" />
                </div>
                <ul className="mt-6 space-y-3 text-sm text-neutral-700 leading-relaxed">
                  {AI_FIRST.map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-[#2E8B2E]/25 rounded-2xl p-6 bg-[#F3FAF3]">
                <div className="flex items-center justify-between">
                  <p className="font-display font-extrabold text-sm sm:text-base uppercase tracking-[0.08em] text-[#2E8B2E]">Deterministic First</p>
                  <StatusBadge variant="stable" />
                </div>
                <ul className="mt-6 space-y-3 text-sm text-neutral-700 leading-relaxed">
                  {DET_FIRST.map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2E8B2E] shrink-0"></span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* RADAR — Performance Polygon */}
          <div className="mt-12 border border-black/10 rounded-2xl p-8 sm:p-10 bg-paper" data-reveal="300">
            <h3 className="font-display font-bold text-lg sm:text-xl tracking-tight">
              Performance Polygon
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Relative scores across six quality dimensions from this experiment evidence.
              Deterministic First holds nearly a full polygon. AI First collapses toward the center.
            </p>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-accent"></span>
                <span className="font-display font-bold text-xs tracking-[0.14em] uppercase text-accent">AI First</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#2E8B2E]"></span>
                <span className="font-display font-bold text-xs tracking-[0.14em] uppercase text-[#2E8B2E]">Deterministic First</span>
              </span>
            </div>

            <div className="mt-6 mx-auto max-w-xl">
              <RadarChart axes={RADAR.axes} series={RADAR.series} max={100} />
            </div>

            <p className="mt-4 text-xs text-neutral-500 leading-relaxed">
              Scores are qualitative ratings derived from the evidence reported in this experiment:
              hallucinations, task completion, effectiveness, debug &amp; mitigation ease, and system stability.
            </p>
          </div>

        </div>
      </section>

      {/* 9. HARDWARE REALITY — rombak Rob: sesudah Viz */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow data-reveal>Hardware and Reliability. What I Learned</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl leading-tight max-w-3xl" data-reveal="100">
            Same machine for build and run. Rested on schedule. Checked periodically. With human fallback.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-3xl" data-reveal="150">
            This is the spec I actually use. Details on risk are in the Reliability section above. Concurrency uses learnings from{' '}
            <Link to="/exp001.html" className="underline hover:text-accent">exp001</Link> and{' '}
            <Link to="/exp002.html" className="underline hover:text-accent">exp002</Link>. Develop it yourself.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {/* Kiri: spec sekarang */}
            <div className="border border-black/10 rounded-2xl p-6 sm:p-8 bg-paper" data-reveal="0">
              <p className="font-display font-bold text-xs tracking-[0.14em] uppercase text-neutral-500">Current. What I run today</p>
              <p className="mt-2 text-xs text-neutral-400">Stable for this experiment</p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-700 leading-relaxed">
                {HW_ROWS.map(([k, v], i) => (
                  <li key={k} className={`flex justify-between gap-4 ${i < HW_ROWS.length - 1 ? 'border-b border-black/5 pb-3' : ''}`}>
                    <span className="text-neutral-500">{k}</span>
                    <span className="font-medium break-all">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kanan: tips 24/7 */}
            <div className="border border-black/10 rounded-2xl p-6 sm:p-8 bg-neutral-50" data-reveal="80">
              <p className="font-display font-bold text-xs tracking-[0.14em] uppercase text-neutral-500">If you want 24 per 7 with less distraction</p>
              <p className="mt-2 text-xs text-neutral-400">Not about being high end. About being reliable</p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-700 leading-relaxed">
                {HW_TIPS.map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0"></span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-neutral-500 leading-relaxed bg-white border border-black/5 rounded-xl p-4">
                Small incremental cost, big reliability gain. You do not need a beast. You need a system you can leave running without checking every hour.
              </p>
            </div>
          </div>

          <div className="mt-8 border border-black/10 rounded-xl p-6 bg-paper" data-reveal="160">
            <blockquote className="quote-block text-sm sm:text-base text-neutral-700 leading-relaxed !border-l-accent !my-0">
              The question was never can it run. The question is can it rest and recover and hand over to human without drama.
            </blockquote>
          </div>
        </div>
      </section>

      {/* 10. OPERATIONAL EFFICIENCY — rombak Rob: sesudah Hardware */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow data-reveal>Operational Efficiency. What Changed</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl leading-tight max-w-3xl" data-reveal="100">
            Demand stayed flat. What changed was the efficiency.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-3xl" data-reveal="150">
            I did not cut demand. I cut the most expensive part of the operation which is repeat work with human limits, and kept the service running. Orders stable. Revenue stable. Small lift but nothing crazy. Same as human run peers.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OPS.map((o) => (
              <div key={o.label} className="border border-black/10 rounded-xl p-6 bg-paper" data-reveal={String(o.delay)}>
                <p className="text-[0.65rem] font-display font-bold tracking-[0.16em] uppercase text-neutral-400">{o.label}</p>
                <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{o.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 border border-black/10 rounded-xl p-6 sm:p-8 bg-paper" data-reveal="160">
            <blockquote className="quote-block text-sm sm:text-base text-neutral-700 leading-relaxed !my-0">
              Demand did not drop and did not explode. What changed was cost to serve at about Rp 564k lawan more than Rp 50M plus how easily it scales and is maintained.
            </blockquote>
          </div>
        </div>
      </section>

      {/* 11. SCREENSHOTS — CAROUSEL AUTOPLAY (revisi Rob 10 Okt 2026:
          dari stack 3 gambar → carousel smooth, hemat space, zoom tetap jalan) */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <Eyebrow data-reveal>Screenshots</Eyebrow>

          <ScreenshotCarousel items={GALLERY} />

        </div>
      </section>

      {/* 12. FAQ — 9 item */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow data-reveal>FAQ</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-2xl sm:text-3xl" data-reveal="100">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-4" data-reveal="150">
            {FAQS.map((f) => (
              <details key={f.q} className="group border border-black/10 rounded-xl p-6 bg-paper open:border-ink/20" open={f.open}>
                <summary className="flex items-center justify-between gap-4 font-display font-bold text-sm cursor-pointer list-none">
                  {f.q}
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FOOTER CTA */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-black/10 pt-10" data-reveal>
            <Link to="/experiments-list.html" className="arrow-link font-display text-sm uppercase">
              <span aria-hidden="true">&larr;</span> Back to Experiments
            </Link>
            <Link to="/contact.html" className="arrow-link font-display text-sm uppercase">
              Have a problem worth exploring? <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
