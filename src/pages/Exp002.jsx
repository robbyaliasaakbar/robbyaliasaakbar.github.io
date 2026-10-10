import { Link } from 'react-router-dom'
import Eyebrow from '../components/shared/Eyebrow.jsx'
import StatusBadge from '../components/shared/StatusBadge.jsx'
import { LineChart } from '../components/experiment/Chart.jsx'
import ZoomImage from '../components/experiment/ZoomImage.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'
import Seo from '../components/shared/Seo.jsx'

/* ============================================================
   EXPERIMENT 002 — port dari live exp002.html ke TEMPLATE BASELINE
   (spec-exp-detail.md §3): Header → Specs → Summary → Details →
   Config → Line → Screenshot → FAQ → CTA.
   Live aslinya gak punya bar chart → section Bar di-skip.
   ============================================================ */

const SPECS = [
  { label: 'CPU', value: 'Intel Core i5-11400F', delay: 0 },
  { label: 'RAM', value: '16GB DDR4 3200 MT/s', delay: 40 },
  { label: 'GPU', value: 'RX 6700 XT', delay: 80 },
  { label: 'Backend', value: 'ROCm Native', delay: 120 },
  { label: 'OS', value: 'Ubuntu 26.04 LTS', delay: 160 },
  { label: 'Inference Engine', value: 'llama.cpp', delay: 0 },
  { label: 'Frontend UI', value: 'Open WebUI', delay: 40 },
  { label: 'Model', value: 'Gemma-4-26B-A4B-it-Q4_K_XL-GGUF', delay: 80, span: 'col-span-2' },
  { label: 'Context', value: '256K', delay: 120 },
  { label: 'Status', value: 'Complete', delay: 160 },
]

const LINE_DATA = [
  { label: '16K', value: 312 },
  { label: '32K', value: 435 },
  { label: '64K', value: 840 },
  { label: '96K', value: 701 },
  { label: '128K', value: 635 },
  { label: '192K', value: 542 },
  { label: '256K', value: 272 },
]

const SUMMARY = [
  'This experiment showed that a 256K context window is technically achievable even on constrained consumer hardware.',
  "But the bigger finding is that bigger isn't always better.",
  'Pushing the system to its maximum capacity required significant memory and performance trade-offs. In practice, 64K context proved to be a much more balanced configuration for everyday use, offering substantial context capacity without paying the full cost of running at the theoretical maximum.',
  "The takeaway: the goal isn't to make a system as powerful as possible. It's to find the point where available resources, performance, and real-world usefulness are properly balanced.",
  'In other words, this experiment was not really about reaching 256K. It was about understanding where "maximum" stops being "practical."',
]

const EVIDENCE = [
  { label: 'Max Stable Context', value: '251166' },
  { label: 'Decode Speed Average', value: <>27.23 <span className="text-xs font-semibold text-neutral-500">tok/s</span></> },
  { label: 'Prompt Processing Speed (256K Context)', value: <>314.71 <span className="text-xs font-semibold text-neutral-500">tok/s</span> <span className="text-xs font-normal text-neutral-400">(avg)</span></> },
  { label: 'Data Visualization', value: 'See the chart above.' },
]

const DETAILS = [
  { label: 'Problem', text: 'Experiencing a bottleneck during prefill when the inference process is running with a fairly large context window, and how to overcome it?' },
  { label: 'Hypothesis', text: 'Long-context inference is feasible, but prefill cost and memory pressure grow non-linearly beyond a threshold. This appears to be scheduler behavior related to CPU threads and token batches during processing.' },
  { label: 'Experiment', text: 'Testing various context lengths (32K, 64K, 128K, 256K) and measuring prefill time, decoding speed, memory usage, and thermal behavior across different quantization levels, while identifying the optimal "sweet spot" for the existing configuration.' },
  { label: 'Failure and New Iteration', text: 'With the previous (pre-optimization) configuration, an out-of-memory (OOM) error occurred when the context window reached 110K. However, I required a larger 256K context window for research purposes. This necessitated finding an optimal configuration, one that balances prefill and decode speeds reasonably, avoids OOM errors, and maintains KV cache quality (which impacts model memory usage) during inference.' },
  {
    label: 'Iteration',
    jsx: (
      <>
        Lower the configuration number <code className="code-inline">--n-cpu-moe</code>,
        reconfigure <code className="code-inline">--threads</code> and
        <code className="code-inline">--threads-batch</code>, set the batching process
        (<code className="code-inline">--batch</code>, and
        <code className="code-inline">--ubatch</code>) to get optimal results.
      </>
    ),
  },
  {
    label: 'Evidence',
    tiles: true,
    intro: 'Based on the configuration optimization results, I obtained these figures, without compromising model memory quality, reducing the context window size, or drastically altering prefill and decode speeds.',
    gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  },
  { label: 'Result', text: "Long-context inference can be run up to 256K on consumer hardware with the right optimizations. I have not tested beyond that limit, as the model's base specifications, based on data from the developer (Google DeepMind), indicate a maximum context length of 262,144. Therefore, I did not test it outside the provided official specifications." },
  { label: 'What I Learned', text: 'The prefill cost rather than decoding speed is the primary bottleneck in long-context inference. Proper scheduler configuration, model layer placement, expert layer placement, and KV-cache optimization are crucial for the practical implementation of long-context capabilities.' },
  { label: 'Practical Implication', text: 'For practical applications, a 64K context offers a good balance between capabilities and performance. If you require a context larger than 64K, it is crucial to remember that there is a cost involved. Strategies for context truncation and retrieval should be designed with these practical limitations in mind.' },
]

const CONFIG = String.raw`MODEL="path model" (model Gemma 4 26B A4B) \
  --host 0.0.0.0 \
  --port 8080 \
  --n-gpu-layers 99 \
  --threads 4 \
  --threads-batch 4 \
  --n-cpu-moe 23 \
  --moe-cache off \
  --ctx-size 262144 \
  --batch-size 1024 \
  --ubatch-size 1024 \
  --keep 8000 \
  --cache-type-k f16 \
  --cache-type-v f16 \
  --swa-checkpoints 16 \
  --checkpoint-min-step 2048 \
  --embd-normalize 0 \
  --no-kv-unified \
  --kv-offload \
  --jinja \
  --flash-attn on \
  --parallel 1 \
  --cache-ram 8192 \
  --cache-idle-slots \
  --temp 1.1 \
  --top-k 64 \
  --top-p 0.95 \
  --min-p 0 \
  --repeat-penalty 1 \
  --repeat-last-n 0 \
  --alias research \
  --log-verbosity 4`

const CONFIG_REASONS = [
  <>I chose <code className="code-inline">--n-gpu-layers 99</code> as a baseline to offload the entire model to the GPU.</>,
  <>I chose <code className="code-inline">--threads 4</code> because testing showed this to be my "sweet spot." This setting configures CPU threads to assist with token generation, the optimal value cannot simply be guessed but must be determined through testing based on your CPU's thread count. I happen to use an i5-11400F (6 cores, 12 threads), and 4 threads worked best for me.</>,
  <>I chose <code className="code-inline">--threads-batch 4</code> because my tests showed that higher values increased prefill latency. This happens because too many CPU threads get involved in the prefill process. This task should ideally rely more on the GPU to maintain reasonable speeds. However, using fewer threads isn't always faster either. Bottlenecks can occur because parts of the model's "expert layers" are offloaded to the CPU. Also, monitor the GPU junction temperature: if prefill feels fast but the junction temperature is high, increase this value.</>,
  <>I chose <code className="code-inline">--n-cpu-moe 23</code> to offload 23 experts to the CPU for optimal performance on my hardware. This value isn't universal. It varies depending on the specific model and its quantization.</>,
  <>Regarding <code className="code-inline">batch</code> and <code className="code-inline">ubatch</code>: these values shouldn't be chosen arbitrarily, as they affect compatibility with kernels and the inference engine. Higher numbers don't necessarily yield faster results. In fact, they often lead to anomalies, such as unreasonable GPU junction temperatures or even slower prefill speeds.</>,
  <>I selected <code className="code-inline">f16</code> for KV cache compression to maintain memory consistency for the model. Of course, this reduces the number of model layers that can fit into the GPU, but I chose <code className="code-inline">f16</code> because, personally, I find a model losing its context far worse than slow inference speeds.</>,
  <>I chose <code className="code-inline">--no-kv-unified</code> and <code className="code-inline">--parallel 1</code> because the model is used only by me in a single inference session. If multiple users were accessing the same model running on your PC, you would need to enable <code className="code-inline">--kv-unified</code> and increase the <code className="code-inline">--parallel</code> value.</>,
  <>The remaining configurations I haven't covered are standard settings that you can find in any other post.</>,
]

const FAQS = [
  {
    q: 'Why does prefill get slower with longer context?',
    open: true,
    a: 'Prefill is quadratic-ish vs context length. At 64K it peaked at 840 tok/s, but at 256K it dropped to 272 tok/s with higher memory pressure and scheduler overhead.',
  },
  {
    q: 'What is the most practical context size for everyday use?',
    a: '64K is the sweet spot, good balance of capability vs speed. Beyond 64K you pay steep prefill and KV-cache costs. Use truncation or retrieval for larger docs.',
  },
  {
    q: 'Did you hit OOM before optimization?',
    a: 'Yes, at 110K with the old config. After lowering --n-cpu-moe to 23 and tuning --threads-batch, it became stable up to 251K (tested limit 262144).',
  },
]

export default function Exp002() {
  useScrollReveal()

  return (
    <main>
      <Seo
        title="Experiment 002 — Prefill speed on long context inference"
        description="How can open-source LLMs achieve acceptable and reasonable prompt processing (prefill) speeds when the total context reaches 250K+ tokens?"
        image="/images/experiments002/experiment002.webp"
        path="/exp002.html"
        type="article"
      />
      {/* 1. EXPERIMENT HEADER */}
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
                <li aria-current="page" className="font-semibold text-ink">Experiment 002</li>
              </ol>
            </nav>

            <Link to="/experiments-list.html" className="arrow-link text-xs uppercase text-neutral-500" data-reveal>
              <span aria-hidden="true">&larr;</span> Back to Experiments
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="100">
              <Eyebrow>Experiment 002</Eyebrow>
              <StatusBadge variant="stable" />
            </div>

            <h1 className="mt-6 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" data-reveal="200">
              Prefill speed on long context inference.
            </h1>

            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl" data-reveal="300">
              How can open-source LLMs achieve acceptable and reasonable prompt processing
              (prefill) speeds when the total context reaches 250K+ tokens?
            </p>

          </div>
        </div>
      </section>

      {/* 2. SYSTEM REQUIREMENTS */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <Eyebrow data-reveal>System Requirements</Eyebrow>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SPECS.map((s) => (
              <div key={s.label} className={`border border-black/10 rounded-xl p-5 ${s.span || ''}`} data-reveal={String(s.delay)}>
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

      {/* 4. EXPERIMENT DETAILS */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <Eyebrow data-reveal>Experiment Details</Eyebrow>

          <div className="mt-12 space-y-12">

            {DETAILS.map((d) =>
              d.tiles ? (
                /* EVIDENCE — wrapper data-reveal + intro opsional + tiles grid */
                <div key={d.label} data-reveal>
                  <div className="grid lg:grid-cols-12 gap-4 lg:gap-10">
                    <div className="lg:col-span-3">
                      <span className="detail-label">{d.label}</span>
                    </div>
                    <div className="lg:col-span-9">
                      {d.intro && (
                        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-6">
                          {d.intro}
                        </p>
                      )}
                      <div className={`grid ${d.gridCols || 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'} gap-4`}>
                        {EVIDENCE.map((e) => (
                          <div key={e.label} className="stat-tile border border-black/10 rounded-xl p-5 bg-paper">
                            <p className="text-[0.62rem] font-display font-bold tracking-[0.14em] uppercase text-neutral-400">{e.label}</p>
                            <p className="mt-2 font-display font-extrabold text-lg leading-tight">{e.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={d.label} className="grid lg:grid-cols-12 gap-4 lg:gap-10" data-reveal>
                  <div className="lg:col-span-3">
                    <span className="detail-label">{d.label}</span>
                  </div>
                  <p className="lg:col-span-9 text-base text-neutral-700 leading-relaxed">
                    {d.jsx || d.text}
                  </p>
                </div>
              )
            )}

          </div>
        </div>
      </section>

      {/* 5. CONFIGURATION TEMPLATE */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <Eyebrow data-reveal>Configuration Template</Eyebrow>

          <div className="mt-8" data-reveal="100">
            <p className="font-mono text-sm text-neutral-500">~/Path build llama.cpp</p>
            <pre className="code-block mt-4">{CONFIG}</pre>
          </div>

          <blockquote className="quote-block mt-10 text-sm sm:text-base text-ink leading-relaxed max-w-3xl" data-reveal>
            Do not copy this configuration blindly. It must be adjusted to suit the specific
            characteristics of your model and hardware. This configuration serves only as a
            reference, as my choices were based on specific reasons that I will explain below.
          </blockquote>

          <ol className="mt-10 space-y-8 max-w-3xl list-none" data-reveal="100">
            {CONFIG_REASONS.map((reason, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display font-extrabold text-accent shrink-0">{i + 1}.</span>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                  {reason}
                </p>
              </li>
            ))}
          </ol>

        </div>
      </section>

      {/* 6. VISUALIZATION — LINE CHART (live exp002 gak punya bar chart) */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <Eyebrow data-reveal>Visualization</Eyebrow>

          <div className="mt-8" data-reveal="100">
            <h2 className="font-display font-bold text-xl sm:text-2xl tracking-tight">
              Prompt Processing Speed (tok/s) vs. Context Length
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Chart of prompt processing speed (prefill) in tok/s, based on total context window length.
            </p>
          </div>

          <div className="mt-8 border border-black/10 rounded-2xl p-6 sm:p-10 bg-paper" data-reveal="200">
            <LineChart data={LINE_DATA} yMax={900} />
            <div className="mt-4 flex items-center justify-between text-[0.65rem] font-display font-bold tracking-[0.16em] uppercase text-neutral-400">
              <span>Low — 272 tok/s</span>
              <span>tok/s vs context length</span>
              <span>High — 840 tok/s</span>
            </div>
          </div>

        </div>
      </section>

      {/* 7. SCREENSHOT */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <Eyebrow data-reveal>Screenshot</Eyebrow>

          <div className="mt-8" data-reveal="150">
            <ZoomImage
              src="/images/experiment002.webp"
              alt="Screenshot of Experiment 002 — prefill speed on long context inference, 256K context performance chart"
              width={1440}
              height={751}
            />
          </div>

        </div>
      </section>

      {/* 8. FAQ */}
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

      {/* 9. FOOTER CTA */}
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
