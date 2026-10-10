import { Link } from 'react-router-dom'
import Eyebrow from '../components/shared/Eyebrow.jsx'
import StatusBadge from '../components/shared/StatusBadge.jsx'
import { BarChart, LineChart } from '../components/experiment/Chart.jsx'
import ZoomImage from '../components/experiment/ZoomImage.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'
import Seo from '../components/shared/Seo.jsx'

/* ============================================================
   EXPERIMENT 001 — baseline template exp detail.
   URUTAN SECTION = struktur-section-exp001.md (revisi Rob, 10 Okt 2026):
   Header → Specs → Summary → Details → Config → Bar → Line → Screenshot → FAQ → CTA
   Chrome (navbar/footer/font/eyebrow) = sistem React sekarang.
   Data di bawah biar gampang diubah saat user kasih arahan.
   ============================================================ */

const SPECS = [
  { label: 'CPU', value: 'Intel Core i5-11400F', delay: 0 },
  { label: 'RAM', value: '16GB DDR4 3200 MT/s', delay: 40 },
  { label: 'GPU', value: 'Radeon RX 6700 XT', delay: 80 },
  { label: 'Backend', value: 'ROCm Native', delay: 120 },
  { label: 'OS', value: 'Ubuntu 26.04 LTS', delay: 160 },
  { label: 'Inference Engine', value: 'llama.cpp (upstream)', delay: 0 },
  { label: 'Frontend UI', value: 'Open WebUI v0.11.0', delay: 40 },
  { label: 'Model', value: 'Ornith-1.0-35B-A3B-IQ4_NL-GGUF', delay: 80, span: 'col-span-2' },
  { label: 'Context', value: '128K', delay: 120 },
  { label: 'Status', value: 'Stable', delay: 160 },
]

const BAR_DATA = [
  { label: '18', value: 28 },
  { label: '20', value: 25 },
  { label: '22', value: 23 },
  { label: '24', value: 22 },
  { label: '25', value: 20 },
  { label: '26', value: 18 },
]

const LINE_DATA = [
  { label: '19.7K', value: 582 },
  { label: '20.8K', value: 548 },
  { label: '21.6K', value: 531 },
  { label: '22.8K', value: 509 },
  { label: '23.8K', value: 502 },
  { label: '24.9K', value: 497 },
  { label: '25.9K', value: 492 },
  { label: '26.9K', value: 488 },
]

const SUMMARY = [
  "This experiment demonstrated that a 35-billion-parameter AI model can be run practically on a consumer GPU with only 12GB of VRAM.",
  "It wasn't achieved by adding more hardware. It was achieved by understanding the system, identifying its bottlenecks, and carefully balancing what the CPU, GPU, memory, and inference engine were each responsible for.",
  "The important finding isn't that a 35B model can run on a 12GB GPU. It's that hardware limitations can sometimes be worked around through better system understanding and optimization.",
  'The result was a stable configuration that could run the model continuously without running out of memory, while still delivering practical inference performance.',
  "The takeaway: when resources are limited, the answer isn't always to buy more resources. Sometimes, the better answer is to understand what you already have and make it work harder.",
]

const EVIDENCE = [
  { label: 'Decode', value: <>up to 28 <span className="text-xs font-semibold text-neutral-500">tok/s</span></> },
  { label: 'Context', value: '128K' },
  { label: 'Prefill', value: <>up to 581 <span className="text-xs font-semibold text-neutral-500">tok/s</span></> },
  { label: 'Memory Pressure', value: 'Manageable' },
  { label: 'Out of Memory', value: 'Never' },
  { label: 'User Experience', value: 'Lossless' },
  { label: 'GPU Junction Temperature', value: 'Max 85°C' },
  { label: 'GPU Edge Temperature', value: 'Max 60°C' },
  { label: 'GPU VRAM Temperature', value: 'Max 70°C' },
  { label: 'Stability', value: 'Stable' },
]

const DETAILS = [
  { label: 'Problem', text: 'Can 35B MoE model run practically on 12GB VRAM GPU? The goal is to find the optimal configuration that allows for stable performance without exceeding hardware limitations.' },
  { label: 'Hypothesis', text: 'MoE architecture may provide better usability than dense models because active parameters are smaller, even if total model size is large.' },
  { label: 'Experiment', text: 'Testing the model layer placement configuration using the expert splitting method on the CPU.' },
  { label: 'What Failed', text: 'Several configurations hit memory limits, bandwidth bottlenecks, or unstable thermal behavior.' },
  { label: 'Iteration', text: 'The backend adjustment (ROCm) for AMD must be native. Otherwise, prefill speeds are unacceptable. This involves optimizing KV cache management and adjusting the scheduler. But need GPU optimization too for better performance.' },
  { label: 'Evidence', tiles: true },
  { label: 'Result', text: 'The model achieved stable performance with acceptable latency, proving that constrained hardware can handle large MoE models with proper optimization.' },
  { label: 'What I Learned', text: 'MoE models can be viable on constrained hardware when quantization and memory management are properly tuned. The key is finding the right balance between model size, quantization level, and context length.' },
  { label: 'Practical Implication', text: "This approach can inform deployment decisions on constrained environments, showing that large models don't always require expensive hardware if properly optimized." },
]

const CONFIG = String.raw`MODEL="path model" (model 35B A3B) \
  --host 0.0.0.0 \
  --port 8080 \
  --n-gpu-layers 99 \
  --threads 4 \
  --threads-batch 4 \
  --n-cpu-moe 26 \
  --moe-cache auto \
  --ctx-size 131072 \
  --batch-size 1024 \
  --ubatch-size 512 \
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
  --temp 0.6 \
  --top-k 0 \
  --top-p 0.95 \
  --min-p 0 \
  --repeat-penalty 1 \
  --repeat-last-n 0 \
  --alias coding \
  --log-verbosity 4`

const CONFIG_REASONS = [
  <>I chose <code className="code-inline">--n-gpu-layers 99</code> as a baseline to offload the entire model to the GPU.</>,
  <>I chose <code className="code-inline">--threads 4</code> because testing showed this to be my "sweet spot." This setting configures CPU threads to assist with token generation, the optimal value cannot simply be guessed but must be determined through testing based on your CPU's thread count. I happen to use an i5-11400F (6 cores, 12 threads), and 4 threads worked best for me.</>,
  <>I chose <code className="code-inline">--threads-batch 4</code> because my tests showed that higher values increased prefill latency. This happens because too many CPU threads get involved in the prefill process. This task should ideally rely more on the GPU to maintain reasonable speeds. However, using fewer threads isn't always faster either. Bottlenecks can occur because parts of the model's "expert layers" are offloaded to the CPU. Also, monitor the GPU junction temperature: if prefill feels fast but the junction temperature is high, increase this value.</>,
  <>I chose <code className="code-inline">--n-cpu-moe 26</code> to offload 26 experts to the CPU for optimal performance on my hardware. This value isn't universal. It varies depending on the specific model and its quantization.</>,
  <>Regarding <code className="code-inline">batch</code> and <code className="code-inline">ubatch</code>: these values shouldn't be chosen arbitrarily, as they affect compatibility with kernels and the inference engine. Higher numbers don't necessarily yield faster results. In fact, they often lead to anomalies, such as unreasonable GPU junction temperatures or even slower prefill speeds.</>,
  <>I selected <code className="code-inline">f16</code> for KV cache compression to maintain memory consistency for the model. Of course, this reduces the number of model layers that can fit into the GPU, but I chose <code className="code-inline">f16</code> because, personally, I find a model losing its context far worse than slow inference speeds.</>,
  <>I chose <code className="code-inline">--no-kv-unified</code> and <code className="code-inline">--parallel 1</code> because the model is used only by me in a single inference session. If multiple users were accessing the same model running on your PC, you would need to enable <code className="code-inline">--kv-unified</code> and increase the <code className="code-inline">--parallel</code> value.</>,
  <>The remaining configurations I haven't covered are standard settings that you can find in any other post.</>,
]

const FAQS = [
  {
    q: 'Can a 35B MoE model really run on 12GB VRAM?',
    open: true,
    a: <>Yes, with the right quantization (IQ4_NL), native ROCm backend, and careful layer placement using <code className="code-inline">--n-cpu-moe 26</code>, it runs stable at up to 28 tok/s decode and 581 tok/s prefill without ever running out of memory.</>,
  },
  {
    q: 'What was the biggest bottleneck you found?',
    a: <>Not VRAM size but KV-cache and thread scheduling. Using <code className="code-inline">--threads 4</code> and <code className="code-inline">--no-kv-unified</code> for a single user kept junction thermal at max 85°C and made 128K context stable.</>,
  },
  {
    q: 'Should I copy your llama.cpp config directly?',
    a: <>No. The config is a reference tuned for i5-11400F + RX 6700 XT. You must retest <code className="code-inline">--n-cpu-moe</code>, <code className="code-inline">--threads</code>, and batch sizes on your own hardware.</>,
  },
]

export default function Exp001() {
  useScrollReveal()

  return (
    <main>
      <Seo
        title="Experiment 001 — The 35B MoE model runs on an older architecture with 12GB of VRAM"
        description="Testing whether 12GB of VRAM and an older GPU architecture can run open-source LLMs optimally without putting undue strain on the GPU."
        image="/images/experiments001/experiment001.webp"
        path="/exp001.html"
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
                <li aria-current="page" className="font-semibold text-ink">Experiment 001</li>
              </ol>
            </nav>

            <Link to="/experiments-list.html" className="arrow-link text-xs uppercase text-neutral-500" data-reveal>
              <span aria-hidden="true">&larr;</span> Back to Experiments
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="100">
              <Eyebrow>Experiment 001</Eyebrow>
              <StatusBadge variant="stable" />
            </div>

            <h1 className="mt-6 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" data-reveal="200">
              The 35B MoE model runs on an older architecture with 12GB of VRAM.
            </h1>

            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl" data-reveal="300">
              Testing whether 12GB of VRAM and an older GPU architecture can run open-source LLMs
              optimally without putting undue strain on the GPU.
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
                /* EVIDENCE — wrapper data-reveal + grid di dalam (pola asli) */
                <div key={d.label} data-reveal>
                  <div className="grid lg:grid-cols-12 gap-4 lg:gap-10">
                    <div className="lg:col-span-3">
                      <span className="detail-label">{d.label}</span>
                    </div>
                    <div className="lg:col-span-9">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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
                    {d.text}
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

      {/* 6. VISUALIZATION 1 — BAR CHART */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <Eyebrow data-reveal>Visualization</Eyebrow>

          <div className="mt-8" data-reveal="100">
            <h2 className="font-display font-bold text-xl sm:text-2xl tracking-tight">
              Decode Speed With --n-cpu-moe Value Configuration
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Measured tokens/second across different <code className="code-inline">--n-cpu-moe</code> flags.
            </p>
          </div>

          <div className="mt-8 border border-black/10 rounded-2xl p-6 sm:p-10 bg-paper" data-reveal="200">
            <BarChart data={BAR_DATA} yMax={30} />
            <div className="mt-4 flex items-center justify-between text-[0.65rem] font-display font-bold tracking-[0.16em] uppercase text-neutral-400">
              <span>Low — 18 tok/s</span>
              <span>tok/s vs --n-cpu-moe value</span>
              <span>High — 28 tok/s</span>
            </div>
          </div>

        </div>
      </section>

      {/* 7. VISUALIZATION 2 — LINE CHART */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="mt-0" data-reveal>
            <h2 className="font-display font-bold text-xl sm:text-2xl tracking-tight">
              Prompt Processing Speed With Total Tokens Processing
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Measured tokens/second at different total token counts.
            </p>
            <p className="mt-4">
              <span className="status-badge status-working">Total Processing Tokens: 27K</span>
            </p>
          </div>

          <div className="mt-8 border border-black/10 rounded-2xl p-6 sm:p-10 bg-paper" data-reveal="150">
            <LineChart data={LINE_DATA} yMax={600} />
            <div className="mt-4 flex items-center justify-between text-[0.65rem] font-display font-bold tracking-[0.16em] uppercase text-neutral-400">
              <span>Low — 488 tok/s</span>
              <span>tok/s vs stage context</span>
              <span>High — 582 tok/s</span>
            </div>
          </div>

        </div>
      </section>

      {/* 8. SCREENSHOT */}
      <section className="pb-20 bg-neutral-50 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <Eyebrow data-reveal>Screenshot</Eyebrow>

          <div className="mt-8" data-reveal="150">
            <ZoomImage
              src="/images/experiment001.webp"
              alt="Screenshot of Experiment 001 — 35B MoE model running on 12GB VRAM, showing inference speed and memory usage"
              width={1440}
              height={705}
            />
          </div>

        </div>
      </section>

      {/* 9. FAQ */}
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

      {/* 10. FOOTER CTA */}
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
