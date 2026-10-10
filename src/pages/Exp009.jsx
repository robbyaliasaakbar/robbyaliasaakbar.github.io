import Seo from '../components/shared/Seo.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import InteractiveCta from '../components/shared/InteractiveCta.jsx';
import StatusBadge from '../components/shared/StatusBadge.jsx';
import { LineChart } from '../components/experiment/Chart.jsx';
import ScreenshotCarousel from '../components/experiment/ScreenshotCarousel.jsx';

/* ---------- gallery ---------- */
const gallery = [
  { n: '1.', title: 'Versions — native proof', tag: 'Proof', src: '/images/exp009-1.webp', alt: 'Terminal versions llama-server hipcc rocminfo proving native gfx1031', w: 790, h: 656, caption: 'Versions — llama-server hipcc rocminfo native' },
  { n: '2.', title: 'Prefill 580 tok/s', tag: 'Perf', src: '/images/exp009-2.webp', alt: 'Prefill reaching 580 tokens per second sustained', w: 640, h: 672, caption: 'Prefill 580 tok/s — sustained, not cold-start' },
  { n: '3.', title: 'Prefill perf — btop + lact + log', tag: 'Perf', src: '/images/exp009-3.webp', alt: 'Prefill performance btop lact and llama log in one frame', w: 1080, h: 559, caption: 'Prefill perf — btop + lact + log' },
  { n: '4.', title: 'Decode perf — btop + lact + log', tag: 'Perf', src: '/images/exp009-4.webp', alt: 'Decode performance btop lact and llama log in one frame', w: 1080, h: 559, caption: 'Decode perf — btop + lact + log' },
  { n: '5.', title: 'Native evidence — server log', tag: 'Evidence', src: '/images/exp009-5.webp', alt: 'Evidence ROCm native llama server log long context stable', w: 854, h: 1080, caption: 'Native evidence — server log long context' },
];

/* ---------- specs ---------- */
const specs = [
  { label: 'CPU', value: 'Intel Core i5-11400F' },
  { label: 'RAM', value: '16GB DDR4 3200MT/s' },
  { label: 'GPU', value: 'RX 6700 XT 12GB gfx1031 Sapphire PULSE' },
  { label: 'OS', value: 'Ubuntu Desktop 26.04 LTS' },
  { label: 'ROCm', value: 'TheRock HIP 7.14.60850 clang 23.0.0git' },
  { label: 'llama.cpp', value: '10307 fc3f10b38 GNU 15.2.0' },
  { label: 'Model', value: 'Ornith-1.0-35B-UD-IQ4_NL n-cpu-moe 22' },
  { label: 'Engines', value: 'llama.cpp Ollama Unsloth LM Studio SGLang vLLM' },
  { label: 'Status', value: 'STABLE native, no override' },
];

/* ---------- details ---------- */
const detailSections = [
  {
    label: 'Problem',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">gfx1031 sits awkwardly: RDNA2 but not gfx1030 (RX 6800/6900) where official ROCm support and community docs concentrate. Applying gfx1030 guides as-is to a 6700XT either silently falls back or crashes outright.</p>
        <p className="text-base text-neutral-700 leading-relaxed">I tried <code className="code-inline">HSA_OVERRIDE_GFX_VERSION=10.3.0</code>: flash-attention wouldn't enable, top_k silently fell back to CPU tanking decode, and random mid-inference core dumps appeared. I required <strong>native gfx1031, no override</strong>: costly trial and error, but necessary. This backend optimization is why <a className="underline hover:text-accent" href="/exp001.html">EXP 001</a> exists at all: <a className="underline hover:text-accent" href="/exp008.html">EXP 008</a> was the first unlock via override, this page (EXP 009) is the refinement to native.</p>
      </>
    ),
  },
  {
    label: 'Specifications',
    body: (
      <ol className="space-y-4 list-none">
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">1.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">TheRock HIP <code className="code-inline">7.14.60850</code> clang <code className="code-inline">23.0.0git</code>. Don't substitute arbitrary TheRock builds, variance is large.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">2.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">llama.cpp <code className="code-inline">10307 fc3f10b38 GNU 15.2.0</code>. Commit drift is real, <code className="code-inline">fattn.cu</code> logic shifts per commit.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">3.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">Native proof: <code className="code-inline">rocminfo → gfx1031</code> + <code className="code-inline">lspci Navi 22 rev c1 Sapphire PULSE RX 6700 XT GAMING OC</code>.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">4.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">Model split: <code className="code-inline">Ornith-1.0-35B-UD-IQ4_NL --n-cpu-moe 22 --n-gpu-layers 99 --ctx-size 131072 --cache-type-k q8_0 --cache-type-v q8_0</code>. The 22 came from VRAM headroom, not arbitrary.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">5.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">Threads: <code className="code-inline">--threads 4</code> bandwidth-bound on DDR4-3200. Three threads is slightly faster on paper, but that means 95C spikes vs 83C controlled at 4.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">6.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">Batch <code className="code-inline">1024</code>: 1536/2048 gave no meaningful prefill gain, added ~10C, not worth it.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">7.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">Multi-engine: llama.cpp (build-rocm-test) + Ollama (moved from Vulkan) + Unsloth + LM Studio + SGLang + vLLM, all native after fix.</p></li>
      </ol>
    ),
  },
  {
    label: 'Hypothesis',
    body: <p className="text-base text-neutral-700 leading-relaxed">6700XT boost +45% over 3060 12GB should dominate prefill (compute-bound) while barely moving decode (bandwidth-bound, only +7%). 3060 split references peak ~300 tok/s prefill. 6700XT clearing it narrowly or not at all on Vulkan signals a software bottleneck, fixable at kernel dispatch.</p>,
  },
  {
    label: 'Experiment',
    body: <p className="text-base text-neutral-700 leading-relaxed">Builds kept failing: documented RDNA2 head_dim config failed, guesses 1024/2048/4096 all failed. I stopped guessing, ran the model through stable Vulkan as baseline, watched kernel activity in <code className="code-inline">btop</code>, and correlated it to dispatch logic in <code className="code-inline">fattn.cu</code>. That's where 512 came from: observation, not documentation.</p>,
  },
  {
    label: 'What Failed',
    body: (
      <ol className="space-y-4 list-none">
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">1.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><strong>Documented head_dim for RDNA2</strong>: failed to build/run natively on this HIP + commit combo.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">2.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><strong>Random power-of-2 guesses (1024/2048/4096)</strong>: failed on all, blind guessing doesn't work.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">3.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><strong>Override path</strong>: "worked" but FA off, top_k CPU fallback, random dumps. Functional failure for 35B split long-context.</p></li>
      </ol>
    ),
  },
  {
    label: 'Iteration',
    body: <p className="text-base text-neutral-700 leading-relaxed">From spoofing the runtime to fixing dispatch: force MMA matrix-core path at 512 where tile hits shared-memory limit. Flash-attn stable → KV q8_0 viable → 131K usable. One fix unblocked the whole chain. I'm not a developer (creative director, self-taught), so this reads as empirical diagnosis. I invite kernel experts to fill in the <em>why</em>.</p>,
  },
  {
    label: 'Evidence',
    body: (
      <>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-6">Sustained-session logs (not cold-start) + version pins. Verify via screenshots + <a className="underline hover:text-accent" href="https://www.reddit.com/r/LocalLLM/s/vmF6MQm8OC" target="_blank" rel="noopener">Reddit post</a> + <code className="code-inline">rocminfo</code>.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            ['Prefill peak', '581.8 t/s', '20K+ cached', false],
            ['Prefill floor', '502.1 t/s', 'still >500', false],
            ['Decode', '22–23 t/s', 'flat 40K+', false],
            ['Context', '131072', 'stable q8_0', false],
            ['Threads', '4 @83C', 'vs 3 @95C spikes', false],
            ['Batch', '1024', '2048 +10C no gain', false],
            ['Engines', '6 native', 'incl. SGLang vLLM', false],
            ['Override', 'None', 'gfx1031 native', true],
          ].map(([label, value, note, green], i) => (
            <div key={i} className="border border-black/10 rounded-xl p-5 bg-paper">
              <p className="text-[0.62rem] font-display font-bold tracking-[0.14em] uppercase text-neutral-400">{label}</p>
              <p className={`mt-2 font-display font-extrabold text-lg leading-tight ${green ? 'text-[#2E8B2E]' : ''}`}>{value}</p>
              <p className="text-xs text-neutral-500">{note}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    label: 'Result',
    body: <p className="text-base text-neutral-700 leading-relaxed">Native ROCm/HIPBLAS/ROCBLAS with no override, flash-attention stable, KV q8_0, 131K confirmed stable, Ollama moved from Vulkan to native ROCm too. Prefill is what was fixed. Decode stayed consistent as expected.</p>,
  },
  {
    label: 'What I Learned',
    body: <p className="text-base text-neutral-700 leading-relaxed">What generalizes isn't 512, it's the method: stable-backend baseline + kernel watch + dispatch correlation finds your fix without deep theory. I genuinely don't know why SGLang/vLLM (no shared ggml code) also fixed, likely parallel ROCm changes untracked. If you understand shared-memory mechanics here, I'd appreciate the explanation.</p>,
  },
  {
    label: 'Practical Implication',
    body: <p className="text-base text-neutral-700 leading-relaxed"><strong>For under-documented AMD:</strong> don't hardcode 512 blindly: check failure mode, HIP build, commit, board and RAM first. <strong>For repro:</strong> pin TheRock 7.14.60850 + fc3f10b38 + Sapphire PULSE + i5-11400F/DDR4 context. Chain: <code className="code-inline">EXP 009 (native stack) → EXP 001 (35B usable) → EXP 008 (why ROCm wins)</code>.</p>,
  },
];

/* ---------- config ---------- */
const CONFIG_FIX = `// Force MMA kernel for head_dim 512 on AMD to avoid tile kernel shared memory limit
if (amd_mfma_available(cc) && Q->ne[0] == 512) {
  return BEST_FATTN_KERNEL_MMA_F16;
}
return BEST_FATTN_KERNEL_TILE;`;

const CONFIG_SERVER = `BASE="$HOME/Documents/Model LLM/Ornith-1.0-35B"
MODEL="$BASE/Ornith-1.0-35B-UD-IQ4_NL.gguf"
PORT=8082
~/Projects/llama2/build-rocm-test/bin/llama-server \\
 --model "$MODEL" --host 0.0.0.0 --port "$PORT" \\
 --n-gpu-layers 99 --threads 4 --threads-batch 4 --n-cpu-moe 22 \\
 --ctx-size 131072 --batch-size 1024 --ubatch-size 1024 --keep 20480 \\
 --cache-type-k q8_0 --cache-type-v q8_0 --swa-checkpoints 24 \\
 --checkpoint-min-step 2048 --embd-normalize 0 --no-kv-unified --kv-offload \\
 --jinja --reasoning-preserve --flash-attn on --parallel 1 \\
 --cache-ram 8192 --cache-idle-slots \\
 --temp 0.6 --top-k 20 --top-p 0.95 --min-p 0.1 \\
 --repeat-penalty 1.1 --repeat-last-n 512 --alias udinllama --log-verbosity 4`;

/* ---------- comparison bar ---------- */
function CompareBar({ title, delta, deltaClass, leftW, rightW, leftClass, rightClass }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-display font-bold uppercase">
        <span>{title}</span>
        <span className={deltaClass}>{delta}</span>
      </div>
      <div className="mt-2 flex h-7 rounded-full overflow-hidden border border-black/10">
        <div className={leftClass} style={{ width: leftW }}></div>
        <div className={rightClass} style={{ width: rightW }}></div>
      </div>
    </div>
  );
}

/* ---------- FAQ ---------- */
const faq = [
  {
    q: 'Why require native instead of HSA_OVERRIDE?',
    a: <>Override gave FA-off, top_k CPU fallback tanking decode, and random mid-inference core dumps. For 35B split at 70K+ that is unusable. Native was slower to achieve but stable, with rocminfo proving no spoofing.</>,
  },
  {
    q: 'Is head_dim 512 a universal fix I can copy?',
    a: <>No. Conditional on <code className="code-inline">amd_mfma_available</code> and this HIP + commit. Validate failure mode first. Method generalizes, number doesn't.</>,
  },
  {
    q: 'Why did SGLang and vLLM start working too?',
    a: <>Unknown. Flagged honestly. Likely parallel ROCm-level changes untracked. If you understand the mechanics, author invites explanation.</>,
  },
];

export default function Exp009() {
  const ref = useScrollReveal();

  return (
    <main ref={ref} className="bg-white">
      <Seo
        title="Experiment 009 — From Override to Native: Robust ROCm gfx1031 Without HSA_OVERRIDE"
        description="Native ROCm on RX 6700 XT gfx1031 with one-line MMA fix: 580 tok/s prefill sustained at 20K+ cached on 35B A3B split, no override, flash-attn + KV q8_0 + 131K ctx."
        image="/images/experiments009/server-prefill-580.webp"
        path="/exp009.html"
        type="article"
      />

      {/* ============ HEADER ============ */}
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
                <li aria-current="page" className="font-semibold text-ink">Experiment 009</li>
              </ol>
            </nav>
            <a href="/experiments-list.html" className="arrow-link text-xs uppercase text-neutral-500" data-reveal>
              <span aria-hidden="true">&larr;</span> Back to Experiments
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="100">
              <p className="eyebrow">Experiment 009</p>
              <StatusBadge variant="stable" label="Stable" />
              <a href="/exp008.html" className="text-xs font-mono underline hover:text-accent">Continuation of EXP 008 →</a>
            </div>
            <h1 className="mt-6 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" data-reveal="200">
              From Override to Native: Robust ROCm gfx1031 Without HSA_OVERRIDE.
            </h1>
            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl" data-reveal="300">
              Can RX 6700 XT (gfx1031) run ROCm natively (no HSA_OVERRIDE, no spoofing) with flash-attention stable and prefill sustained above 500 tok/s at 20K+ cached context on a 35B A3B CPU/GPU split?
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="350">
              <InteractiveCta variant="primary" href="https://github.com/ggml-org/llama.cpp/issues/26702" external>
                Issue #26702 <span aria-hidden="true">↗</span>
              </InteractiveCta>
              <InteractiveCta variant="invert" href="https://www.reddit.com/r/LocalLLM/s/vmF6MQm8OC" external>
                Reddit proof <span aria-hidden="true">↗</span>
              </InteractiveCta>
              <InteractiveCta variant="outline" href="/exp008.html">
                Read EXP 008 first
              </InteractiveCta>
            </div>
            <p className="mt-4 text-xs text-neutral-500 font-mono" data-reveal="360">Phase 1 (EXP 008): override workaround · Phase 2 (this page): native robust fix · 581 → 502 tok/s sustained</p>
          </div>
        </div>
      </section>

      {/* ============ SYSTEM REQUIREMENTS ============ */}
      <section className="pb-20">
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
            <code className="code-inline">rocminfo | grep gfx → gfx1031</code> (not spoofed). <code className="code-inline">lspci Navi 22 rev c1 Sapphire PULSE</code>. Exact HIP + commit matter. See Caveats. Previous phase: <a className="underline hover:text-accent" href="/exp008.html">EXP 008</a> + <a className="underline hover:text-accent" href="https://github.com/ggml-org/llama.cpp/issues/26702" target="_blank" rel="noopener">#26702</a>.
          </p>
        </div>
      </section>

      {/* ============ SCREENSHOTS (carousel) ============ */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Screenshots</p>
          <p className="mt-4 text-sm text-neutral-600 max-w-3xl" data-reveal="50">
            Native evidence: versions, sustained prefill, btop + lact + logs in one frame. Full write-up in <a className="underline hover:text-accent" href="https://www.reddit.com/r/LocalLLM/s/vmF6MQm8OC" target="_blank" rel="noopener">Reddit post</a>.
          </p>
          <div className="mt-8" data-reveal="100">
            <ScreenshotCarousel items={gallery} />
          </div>
        </div>
      </section>

      {/* ============ VISUALIZATION ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Visualization</p>
          <div className="mt-8" data-reveal="100">
            <h2 className="font-display font-bold text-xl sm:text-2xl tracking-tight">580 to 502 tok/s sustained — not a cold-start number.</h2>
            <p className="mt-2 text-sm text-neutral-600">Real session on <code className="code-inline">Ornith-1.0-35B</code> split CPU/GPU, 18–23K already cached, prompt chunks 2048→6144. This is TTFT that matters for 70K+.</p>
            <p className="mt-2 text-xs text-neutral-500">Note: different model than <a className="underline hover:text-accent" href="/exp008.html">EXP 008</a> (gemma4 12B fully on GPU) — same goal, different experiment, do not compare 581 vs 653 directly.</p>
          </div>

          <div className="mt-8 border border-black/10 rounded-2xl p-6 sm:p-10 bg-paper" data-reveal="150">
            <p className="font-display font-extrabold text-sm uppercase tracking-[0.08em]">Prefill sustained <span className="text-[#2E8B2E]">500+ floor</span></p>
            <div className="mt-4">
              <LineChart data={[
                { label: '2K 581', value: 581.81 },
                { label: '3K 548', value: 548.24 },
                { label: '4K 531', value: 531.24 },
                { label: '5K 508', value: 508.61 },
                { label: '6K 502', value: 502.11 },
              ]} yMax={650} />
            </div>
            <p className="mt-3 text-xs text-neutral-500 font-mono">3.52s/581.81 → 5.60s/548.24 → 7.71s/531.24 → 10.07s/508.61 → 12.24s/502.11 · Vulkan same regime 70–100</p>
          </div>

          <div className="mt-6 border border-black/10 rounded-2xl p-6 sm:p-10 bg-paper" data-reveal="200">
            <h3 className="font-display font-bold text-lg tracking-tight">Clock +45% vs bandwidth +7% — prefill is compute, decode is bandwidth.</h3>
            <div className="mt-6 space-y-5">
              <CompareBar
                title="6700XT 2581MHz vs 3060 1777MHz"
                delta="+45% clock"
                deltaClass="text-[#2E8B2E]"
                leftW="59%"
                rightW="41%"
                leftClass="bg-[#2E8B2E]"
                rightClass="bg-neutral-200"
              />
              <CompareBar
                title="384 vs 360 GB/s"
                delta="+7% bandwidth"
                deltaClass="text-neutral-500"
                leftW="52%"
                rightW="48%"
                leftClass="bg-ink"
                rightClass="bg-neutral-200"
              />
            </div>
            <blockquote className="quote-block mt-8 text-sm text-neutral-600 leading-relaxed">
              3060 split peaks ~300 tok/s prefill. 6700XT should clear it widely, but Vulkan didn't. That gap signaled software bottleneck, not hardware ceiling. Decode 22–23 tok/s flat past 40K, consistent and not the bottleneck chased.
            </blockquote>
          </div>
        </div>
      </section>

      {/* ============ NON-TECHNICAL SUMMARY ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="summary-callout p-8 sm:p-12" data-reveal>
            <h2 className="font-display font-extrabold text-base sm:text-lg tracking-[0.08em] uppercase leading-relaxed max-w-3xl">
              For those of you unable to read this data from technical standpoint, here is the conclusion:
            </h2>
            <div className="mt-8 space-y-5 text-sm sm:text-base text-neutral-700 leading-relaxed max-w-3xl">
              <p>Running a big 35B model split across 12GB GPU + CPU means waiting for the prompt to process at 70K+ context is what hurts, not writing answers.</p>
              <p>Easy mode was okay at 16–32K but painful beyond. Pretending my card is a different model caused crashes and silent slowdowns.</p>
              <p>I insisted on native recognition, watched a stable mode to find the real kernel, and forced the matrix-core path for one specific size: just one line of code.</p>
              <p>Result: ~580 pages/sec peak staying above 500 with 20K already loaded, 131K context stable, working across 6 apps, not just one.</p>
              <p>I'm self-taught and found this by observation. If you know why it works deeper, I'd love to learn. Full repro versions and flags are inside. Don't copy the number blindly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ EXPERIMENT DETAILS ============ */}
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

      {/* ============ CONFIGURATION TEMPLATE ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Configuration Template</p>

          <div className="mt-8" data-reveal="100">
            <p className="font-mono text-sm text-neutral-500">The fix — ggml/src/ggml-cuda/fattn.cu</p>
            <pre className="code-block mt-4">{CONFIG_FIX}</pre>
          </div>

          <div className="mt-8" data-reveal="100">
            <p className="font-mono text-sm text-neutral-500">Full llama-server — Ornith-35B split (copy-paste, then tune VRAM)</p>
            <pre className="code-block mt-4">{CONFIG_SERVER}</pre>
          </div>

          <blockquote className="quote-block mt-10 text-sm sm:text-base text-ink leading-relaxed max-w-3xl" data-reveal>
            Do not hardcode 512 or copy <code className="code-inline">--n-cpu-moe 22</code> blindly. 22 came from my 12GB headroom. Threads 4 is bandwidth + thermal optimum on my DDR4 rig, not a universal best.
          </blockquote>

          <ol className="mt-10 space-y-8 max-w-3xl list-none" data-reveal="100">
            <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">1.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">I validated <strong>versions first</strong>: TheRock 7.14.60850 + fc3f10b38, because drift changes <code className="code-inline">fattn.cu</code> behavior.</p></li>
            <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">2.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">I proved <strong>native</strong> with <code className="code-inline">rocminfo gfx1031</code> + board ID, not just "it runs."</p></li>
            <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">3.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">I measured <strong>sustained</strong> (20K+ cached), not cold-start peaks.</p></li>
            <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">4.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">I kept <strong>unknowns explicit</strong>: SGLang/vLLM side-effect unexplained, 512 observational.</p></li>
          </ol>
        </div>
      </section>

      {/* ============ FAQ ============ */}
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

      {/* ============ DISCLAIMER ============ */}
      <section className="py-16 border-t border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow">Disclaimer</p>
            <h2 className="mt-4 font-display font-bold text-lg sm:text-xl tracking-tight">Version-pinned, not universal</h2>
            <blockquote className="quote-block mt-6 text-sm sm:text-base text-neutral-600 leading-relaxed">
              Validated on Ubuntu Desktop 26.04 LTS + TheRock HIP 7.14.60850 + commit fc3f10b38 + Sapphire PULSE 6700 XT + Intel Core i5-11400F/16GB DDR4. Commit drift is real. Other ROCm sources and distros may differ, and 512 is conditional. Numbers are sustained-session logs, not cold-start peaks. I'm self-taught, so the method is empirical. Corrections on the why are welcome.
            </blockquote>
            <p className="mt-6 text-sm text-neutral-700 leading-relaxed">
              <strong>Previous phase:</strong> <a className="underline hover:text-accent" href="/exp008.html">EXP 008</a> ·{' '}
              <strong>Upstream:</strong> <a className="underline hover:text-accent font-mono text-[13px]" href="https://github.com/ggml-org/llama.cpp/issues/26702" target="_blank" rel="noopener">ggml-org/llama.cpp#26702</a> ·{' '}
              <strong>Write-up:</strong> <a className="underline hover:text-accent" href="https://www.reddit.com/r/LocalLLM/s/vmF6MQm8OC" target="_blank" rel="noopener">Reddit r/LocalLLM native gfx1031 post</a>
            </p>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
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
            Chain: <a className="underline hover:text-accent" href="/exp008.html">EXP 008 workaround</a> → EXP 009 native → <a className="underline hover:text-accent" href="/exp001.html">EXP 001 35B usable</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
