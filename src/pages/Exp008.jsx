import Seo from '../components/shared/Seo.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import InteractiveCta from '../components/shared/InteractiveCta';
import StatusBadge from '../components/shared/StatusBadge';
import { BarChart } from '../components/experiment/Chart';
import ScreenshotCarousel from '../components/experiment/ScreenshotCarousel';

/* ---------- gallery ---------- */
const gallery = [
  { n: '1.', title: 'LACT — ROCm run', tag: 'LACT', src: '/images/exp008-1.webp', alt: 'LACT tuning during ROCm benchmark — Manual Compute 182W minus 90mV VRAM 1900MHz', w: 877, h: 400, caption: 'LACT — ROCm run (same tuning)' },
  { n: '2.', title: 'LACT — Vulkan run', tag: 'LACT', src: '/images/exp008-2.webp', alt: 'LACT tuning during Vulkan benchmark — same Manual Compute profile', w: 1952, h: 881, caption: 'LACT — Vulkan run (same tuning)' },
  { n: '3.', title: 'Core dump assert crash', tag: 'Bug', src: '/images/exp008-3.webp', alt: 'Core dump assert crash max_blocks_per_sm greater than 0 on gfx1031 ROCm', w: 1080, h: 589, caption: 'The bug that gates ROCm out of long-context' },
  { n: '4.', title: 'ROCm bench', tag: 'Bench', src: '/images/exp008-4.webp', alt: 'llama-bench ROCm 3 runs pp8192 653 t/s tg512 34.6 t/s gemma 12B', w: 1264, h: 886, caption: 'ROCm bench — 653 t/s prefill (3 runs)' },
  { n: '5.', title: 'Vulkan bench', tag: 'Bench', src: '/images/exp008-5.webp', alt: 'llama-bench Vulkan 3 runs pp8192 354 t/s tg512 40.9 t/s same model flags', w: 1264, h: 886, caption: 'Vulkan bench — 354 t/s prefill (3 runs)' },
];

/* ---------- specs ---------- */
const specs = [
  { label: 'CPU', value: 'Intel Core i5-11400F' },
  { label: 'RAM', value: '16GB DDR4 3200 MT/s XMP' },
  { label: 'GPU', value: 'RX 6700 XT 12GB (gfx1031 Navi22)' },
  { label: 'OS', value: 'Ubuntu Desktop 26.04 LTS' },
  { label: 'ROCm / HIP', value: '7.1.52801 + clang 21.1.8' },
  { label: 'llama.cpp', value: '0a50d99 build 10108' },
  { label: 'Model Under Test', value: 'gemma-4-12b-it-IQ4_NL 6.24GiB' },
  { label: 'Tuning', value: 'LACT Manual Compute 182W -90mV' },
  { label: 'Status', value: 'STABLE (workaround)' },
];

/* ---------- details ---------- */
const detailSections = [
  {
    label: 'Problem',
    body: (
      <>
        <p className="text-base text-neutral-700 leading-relaxed">
          My RX 6700 XT is gfx1031 (Navi22), with no first-class ROCm target in llama.cpp. The choice is painful: Vulkan just works but is ~85% slower on prefill at 8K, while ROCm is faster but needs manual workarounds and crashes on flash-attention. For long-context research and agentic workloads that routinely run 32K–120K+ tokens, this decides whether 12GB VRAM is usable or constantly OOM.
        </p>
        <p className="text-base text-neutral-700 leading-relaxed">
          This backend optimization was not optional. <a className="underline hover:text-accent" href="/exp001.html">EXP 001</a> would not exist without it. EXP 001 is the result after successfully tuning the GPU backend. This page (EXP 008) is the first mandatory unlock via override workaround, and <a className="underline hover:text-accent" href="/exp009.html">EXP 009</a> refines it to native without override.
        </p>
      </>
    ),
  },
  {
    label: 'Specifications',
    body: (
      <ol className="space-y-4 list-none">
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">1.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">LACT sweet-spot for long-context: Manual level, Compute profile, power 182/223W, max clock 2350MHz (vs 2600 stock), voltage -90mV, VRAM 1900MHz. Identical tuning for both backends, no backend-specific tuning.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">2.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">ROCm build from commit <code className="code-inline">0a50d99</code>: <code className="code-inline">-DGGML_HIP=ON -DAMDGPU_TARGETS=gfx1030</code> with <code className="code-inline">clang / hipcc</code>, runtime <code className="code-inline">HSA_OVERRIDE_GFX_VERSION=10.3.0</code> to masquerade gfx1031 as gfx1030.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">3.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">Vulkan build: <code className="code-inline">cmake -B build -DGGML_VULKAN=1</code>. No tweak, no drama, RADV NAVI22.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">4.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">Bench template (only backend changed): <code className="code-inline">--n-prompt 8192 --n-gen 512 --batch-size 1024 --ubatch-size 1024 --cache-type-k q8_0 --cache-type-v q8_0 --n-gpu-layers 99 --flash-attn on</code> on <code className="code-inline">gemma-4-12b-it-IQ4_NL.gguf</code> (6.24 GiB).</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">5.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">Server template proving long-context usable: <code className="code-inline">--ctx-size 131072 --spec-draft-model mtp-gemma --flash-attn on --kv-unified --kv-offload</code>. Full command in Configuration Template. Note: at this stage I had not yet understood <code className="code-inline">kv-unified</code> in detail. See <a className="underline hover:text-accent" href="/exp009.html">EXP 009</a> for the refined <code className="code-inline">--no-kv-unified</code> iteration.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">6.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">Flash-attention is mandatory: KV quant, usable context size, and MTP speculative decoding all depend on it. Turning FA off is not a viable fallback.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">7.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">Measurement: 3 runs per backend, identical batch/cache, <code className="code-inline">llama-bench</code> excludes sampling time, so the decode gap needs separate isolation.</p></li>
      </ol>
    ),
  },
  {
    label: 'Hypothesis',
    body: <p className="text-base text-neutral-700 leading-relaxed">For gfx1031 long-context, ROCm with correct GFX handling and working flash-attention will beat Vulkan net wall-clock despite a decode deficit, because prefill dominates the cycle. The friction is build/runtime packaging, not hardware capability.</p>,
  },
  {
    label: 'Experiment',
    body: <p className="text-base text-neutral-700 leading-relaxed">I built both backends from the same commit, ran <code className="code-inline">llama-bench</code> 3× each with identical flags, and captured terminal tables. I attempted a native <code className="code-inline">gfx1031</code> target first and confirmed it fails without override. I then hit the FA assert, patched it locally with a minimal guard, kept FA on, and re-ran. Finally I converted t/s to wall-clock math and computed the crossover point.</p>,
  },
  {
    label: 'What Failed',
    body: (
      <ol className="space-y-4 list-none">
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">1.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><strong>gfx1031 has no working native target.</strong> Building with <code className="code-inline">-DAMDGPU_TARGETS=gfx1031</code> fails to run correctly. I must build for neighboring <code className="code-inline">gfx1030</code> and override at runtime with <code className="code-inline">HSA_OVERRIDE_GFX_VERSION=10.3.0</code>. Ask: native Navi22 support without masquerade.</p></li>
        <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">2.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed"><strong>Flash-attention assert crash.</strong> <code className="code-inline">GGML_ASSERT(max_blocks_per_sm &gt; 0)</code> in <code className="code-inline">ggml/src/ggml-cuda/fattn-common.cuh</code> crashes on this backend/target combo. Workaround <code className="code-inline">if &lt;=0 then =1</code> avoids crash but correctness/occupancy is unknown. Ask: root-cause fix or reviewed guidance.</p></li>
      </ol>
    ),
  },
  {
    label: 'Iteration',
    body: <p className="text-base text-neutral-700 leading-relaxed">From "Vulkan is enough" to "ROCm is worth the friction." I kept Vulkan as baseline, isolated ROCm variables one by one (GFX override → FA patch → bench), and refused to disable FA because that would hide the exact workload where ROCm wins. I documented workarounds honestly with an unknown-correctness disclaimer instead of silently forking, so maintainers can fix root cause while users stay productive.</p>,
  },
  {
    label: 'Evidence',
    body: (
      <>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-6">3-run average per backend, same commit <code className="code-inline">0a50d99</code>, same model and flags. Full tables in <a className="underline hover:text-accent" href="https://github.com/ggml-org/llama.cpp/issues/26702" target="_blank" rel="noopener">issue #26702</a> + screenshots above.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            ['pp8192 ROCm', '653.9 t/s', 'avg of 3', false],
            ['pp8192 Vulkan', '354.4 t/s', 'avg of 3', false],
            ['Delta prefill', '+84.5%', 'ROCm wins', true],
            ['tg512 ROCm', '34.6 t/s', 'avg of 3', false],
            ['tg512 Vulkan', '40.9 t/s', 'avg of 3', false],
            ['Delta decode', '-15.4%', 'Vulkan wins', false],
            ['Total 8192+512', '27.3s vs 35.6s', 'ROCm vs Vulkan', false],
            ['Net win', '~23% Stable', 'workaround', true],
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
    body: <p className="text-base text-neutral-700 leading-relaxed">ROCm wins net wall-clock by ~23% at 8K (27.3s vs 35.6s) despite losing decode throughput. Crossover is ~1760 prompt tokens. ROCm is the better backend for effectively all long-context workloads on this hardware, once it can be built and run without manual patching. The workaround stack is <strong>STABLE</strong> locally for 131K server + MTP speculative decoding use.</p>,
  },
  {
    label: 'What I Learned',
    body: <p className="text-base text-neutral-700 leading-relaxed">Optimization lives under the model: GFX target handling + flash-attention occupancy matter more than prompt tricks for long-context. A one-line assert can gate an entire hardware family out of its best workload. An honest workaround with an unknown-correctness disclaimer + an upstream report beats a silent fork: it keeps me productive today while letting maintainers fix the root cause for everyone.</p>,
  },
  {
    label: 'Practical Implication',
    body: <p className="text-base text-neutral-700 leading-relaxed"><strong>For RDNA2 owners (RX 6600/6700):</strong> don't settle for Vulkan if you do long-context: use the override + patch documented below, keep LACT conservative, keep KV <code className="code-inline">q8_0</code> + FA on. <strong>For llama.cpp:</strong> two small fixes (native gfx1031 + FA occupancy) would unlock this series without user patching. Until then this page + <code className="code-inline">#26702</code> is the reproducible reference. Decode TOP_K gap is next. See the EXP 009 teaser.</p>,
  },
];

/* ---------- config ---------- */
const CONFIG_ROCM = `# Build ROCm as gfx1030 (gfx1031 native fails without override)
cmake -S ~/Projects/llama2 -B ~/Projects/llama2/build-rocm \\
  -DCMAKE_BUILD_TYPE=Release \\
  -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=hipcc \\
  -DGGML_HIP=ON -DAMDGPU_TARGETS=gfx1030 -DCMAKE_HIP_ARCHITECTURES=gfx1030
cmake --build ~/Projects/llama2/build-rocm -j"$(nproc)"

# FA assert workaround (correctness UNKNOWN — see #26702)
sed -i 's/GGML_ASSERT(max_blocks_per_sm > 0);/if (max_blocks_per_sm <= 0) { max_blocks_per_sm = 1; }/g' \\
  ~/Projects/llama2/ggml/src/ggml-cuda/fattn-common.cuh

# Bench (only backend changed vs Vulkan)
HSA_OVERRIDE_GFX_VERSION=10.3.0 ~/Projects/llama2/build-rocm/bin/llama-bench \\
  --model "$MODEL" --n-prompt 8192 --n-gen 512 \\
  --batch-size 1024 --ubatch-size 1024 \\
  --cache-type-k q8_0 --cache-type-v q8_0 \\
  --n-gpu-layers 99 --flash-attn on`;

const CONFIG_VULKAN = `cmake -B build -DGGML_VULKAN=1
cmake --build build --config Release
~/Projects/llama.cpp/build/bin/llama-bench \\
  --model "$MODEL" --n-prompt 8192 --n-gen 512 \\
  --batch-size 1024 --ubatch-size 1024 \\
  --cache-type-k q8_0 --cache-type-v q8_0 \\
  --n-gpu-layers 99 --flash-attn on`;

/* ---------- wall-clock bar ---------- */
function TimeBar({ title, meta, prefill, decode, total, prefillPct, decodePct, prefillColor, decodeColor, aria }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-display font-bold tracking-[0.12em] uppercase">
        <span className={prefillColor === 'bg-[#2E8B2E]' ? 'text-[#2E8B2E]' : ''}>{title}</span>
        <span className="text-neutral-400">{meta}</span>
      </div>
      <div className="mt-2 flex h-8 rounded-full overflow-hidden border border-black/10" role="img" aria-label={aria}>
        <div className={prefillColor} style={{ width: prefillPct }}></div>
        <div className={decodeColor} style={{ width: decodePct }}></div>
      </div>
      <p className="mt-1 text-xs text-neutral-500 font-mono">prefill {prefill} + decode {decode} — {total}</p>
    </div>
  );
}

/* ---------- FAQ ---------- */
const faq = [
  {
    q: 'Why not just use Vulkan? It works out of the box.',
    a: <>Vulkan needs no patch, but at 8192 context it does 354 t/s prefill vs ROCm 653 t/s. That is 23.1s vs 12.5s prefill, net 35.6s vs 27.3s full cycle. Below ~1760 tokens Vulkan is net-faster, above that ROCm wins. For long-context research and agentic work, ROCm is clearly better once running.</>,
  },
  {
    q: 'Is forcing max_blocks_per_sm = 1 safe?',
    a: <>Unknown. That is why it is reported as <code className="code-inline">bug #26702</code>, not a fix. It avoids the crash and benches stably across 3 runs, but only a maintainer can confirm correctness and occupancy for gfx1031. Do not treat the one-liner as an upstream fix.</>,
  },
  {
    q: 'Does this explain the decode being slower on ROCm?',
    a: <>No. <code className="code-inline">llama-bench</code> excludes sampling time, so the <code className="code-inline">TOP_K unsupported on ROCm</code> log seen in <code className="code-inline">llama-server</code> is not confirmed as the cause of the tg512 gap here. That TOP_K CPU fallback was a side effect of the gfx override. It is indirectly fixed in <a className="underline hover:text-accent" href="/exp009.html">EXP 009</a> by running natively without override.</>,
  },
];

export default function Exp008() {
  const ref = useScrollReveal();

  return (
    <main ref={ref} className="bg-white">
      <Seo
        title="Experiment 008 — Found the Bug, Fixed the Stack: ROCm gfx1031 vs Vulkan on RX 6700 XT"
        description="Can RX 6700 XT gfx1031 beat Vulkan by 23% wall-clock on 8K context once the ROCm GFX-target bug and flash-attention assert are fixed? ROCm 653 vs Vulkan 354 t/s prefill."
        image="/images/experiments008/rocm-bench.webp"
        path="/exp008.html"
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
                <li aria-current="page" className="font-semibold text-ink">Experiment 008</li>
              </ol>
            </nav>
            <a href="/experiments-list.html" className="arrow-link text-xs uppercase text-neutral-500" data-reveal>
              <span aria-hidden="true">&larr;</span> Back to Experiments
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="100">
              <p className="eyebrow">Experiment 008</p>
              <StatusBadge variant="stable" label="Stable" />
            </div>
            <h1 className="mt-6 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" data-reveal="200">
              Found the Bug, Fixed the Stack: ROCm gfx1031 vs Vulkan on RX 6700 XT.
            </h1>
            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl" data-reveal="300">
              Can an "unsupported" RDNA2 card (RX 6700 XT gfx1031) beat Vulkan by 23% wall-clock on 8K context, once the GFX-target bug and flash-attention assert are found and fixed?
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="350">
              <InteractiveCta variant="primary" href="https://github.com/ggml-org/llama.cpp/issues/26702" external>
                View upstream issue #26702 <span aria-hidden="true">↗</span>
              </InteractiveCta>
              <span className="text-xs text-neutral-500 font-mono">ROCm 653.9 vs Vulkan 354.4 t/s prefill · 3 runs each</span>
            </div>
            <div className="mt-8 border border-[#2E8B2E]/25 bg-[#F3FAF3] rounded-2xl p-5 sm:p-6 max-w-3xl" data-reveal="400">
              <p className="text-sm text-neutral-700 leading-relaxed">
                <strong>Looking for the better native version?</strong> This page uses override workaround. <a className="underline hover:text-accent font-semibold" href="/exp009.html">EXP 009 refines it to native without override</a> + <a className="underline hover:text-accent" href="https://www.reddit.com/r/LocalLLM/s/vmF6MQm8OC" target="_blank" rel="noopener">Reddit write-up</a> (580 tok/s sustained, 35B split).
              </p>
            </div>
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
            Native gfx1031 requires <code className="code-inline">HSA_OVERRIDE_GFX_VERSION=10.3.0</code> + FA assert patch. Upstream fix pending. See <a className="underline hover:text-accent" href="https://github.com/ggml-org/llama.cpp/issues/26702" target="_blank" rel="noopener">GitHub #26702</a>.
          </p>
        </div>
      </section>

      {/* ============ SCREENSHOTS (carousel) ============ */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="eyebrow" data-reveal>Screenshots</p>
          <p className="mt-4 text-sm text-neutral-600 max-w-3xl" data-reveal="50">
            Same LACT tuning for both backends, with no backend-specific tuning. Full terminal tables in <a className="underline hover:text-accent" href="https://github.com/ggml-org/llama.cpp/issues/26702" target="_blank" rel="noopener">issue #26702</a>.
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
            <h2 className="font-display font-bold text-xl sm:text-2xl tracking-tight">Prefill wins, decode loses — net win.</h2>
            <p className="mt-2 text-sm text-neutral-600">Same model <code className="code-inline">gemma-4-12b-it-IQ4_NL</code> (layers fully on GPU), same flags. Only backend changed. 3-run average from issue #26702.</p>
            <p className="mt-2 text-xs text-neutral-500">Note: numbers here use a different model than <a className="underline hover:text-accent" href="/exp009.html">EXP 009</a> (35B A3B split CPU/GPU), same goal, different experiment, do not compare directly.</p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="border border-black/10 rounded-2xl p-6 sm:p-8 bg-paper" data-reveal="150">
              <p className="font-display font-extrabold text-sm uppercase tracking-[0.08em]">Prefill pp8192 <span className="text-[#2E8B2E]">+84.5%</span></p>
              <p className="mt-1 text-xs text-neutral-500">tokens / second, higher is better</p>
              <div className="mt-4 mx-auto max-w-md">
                <BarChart data={[{ label: 'ROCm 653.9', value: 653.9 }, { label: 'Vulkan 354.4', value: 354.4 }]} yMax={750} />
              </div>
              <p className="mt-3 text-xs text-neutral-500">ROCm 653.37 / 654.06 / 654.38 · Vulkan 354.24 / 354.53 / 354.35</p>
            </div>
            <div className="border border-black/10 rounded-2xl p-6 sm:p-8 bg-paper" data-reveal="200">
              <p className="font-display font-extrabold text-sm uppercase tracking-[0.08em]">Decode tg512 <span className="text-neutral-500">-15.4%</span></p>
              <p className="mt-1 text-xs text-neutral-500">tokens / second, higher is better — ROCm loses here</p>
              <div className="mt-4 mx-auto max-w-md">
                <BarChart data={[{ label: 'ROCm 34.6', value: 34.6 }, { label: 'Vulkan 40.9', value: 40.9 }]} yMax={50} />
              </div>
              <p className="mt-3 text-xs text-neutral-500">ROCm 34.61 / 34.62 / 34.56 · Vulkan 40.94 / 40.89 / 40.93 — TOP_K gap under investigation (EXP 009)</p>
            </div>
          </div>

          <div className="mt-6 border border-black/10 rounded-2xl p-6 sm:p-10 bg-paper" data-reveal="250">
            <h3 className="font-display font-bold text-lg tracking-tight">23% net wall-clock win — why prefill matters more.</h3>
            <p className="mt-2 text-sm text-neutral-600">Full cycle: 8192 prefill + 512 generate. Prefill dominates at this depth.</p>
            <div className="mt-8 space-y-6">
              <TimeBar
                title="ROCm — 27.3s total"
                meta="12.5s + 14.8s"
                prefill="12.5s (653.9 t/s)"
                decode="14.8s (34.6 t/s)"
                total="27.3s"
                prefillPct="45.8%"
                decodePct="54.2%"
                prefillColor="bg-[#2E8B2E]"
                decodeColor="bg-ink"
                aria="ROCm total 27.3 seconds: 12.5 prefill plus 14.8 decode"
              />
              <TimeBar
                title="Vulkan — 35.6s total"
                meta="23.1s + 12.5s"
                prefill="23.1s (354.4 t/s)"
                decode="12.5s (40.9 t/s)"
                total="35.6s"
                prefillPct="64.9%"
                decodePct="35.1%"
                prefillColor="bg-neutral-400"
                decodeColor="bg-neutral-700"
                aria="Vulkan total 35.6 seconds: 23.1 prefill plus 12.5 decode"
              />
            </div>
            <blockquote className="quote-block mt-8 text-sm text-neutral-600 leading-relaxed">
              Crossover ~1760 tokens: below that Vulkan is net-faster, above that ROCm wins. Effectively all long-context workloads (32K–120K+) favor ROCm once it runs.
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
              <p>My graphics card (RX 6700 XT) is officially "unsupported" by the fast AI software (ROCm). The easy software (Vulkan) works instantly but is slow where it matters most.</p>
              <p>I found two roadblocks: the software didn't recognize my card so I had to disguise it as its close neighbor, and a safety check crashed the fast-memory mode I need for long documents.</p>
              <p>I fixed both locally with two small workarounds and measured carefully 3 times each: fast mode reads 653 pages per second vs 354 for easy mode on long documents.</p>
              <p>Over a full job (read 8192 + write 512), fast mode finishes in 27 seconds vs 36 seconds, 23% faster, even though it writes slightly slower. For long documents, reading dominates the total time.</p>
              <p>My fix is stable for daily use, but I reported it publicly upstream so everyone benefits. I linked the bug report so you can verify: no magic numbers. The remaining write-speed mystery is next in EXP 009.</p>
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
            <p className="font-mono text-sm text-neutral-500">ROCm workaround — build + FA patch + bench (from #26702)</p>
            <pre className="code-block mt-4">{CONFIG_ROCM}</pre>
          </div>

          <div className="mt-8" data-reveal="100">
            <p className="font-mono text-sm text-neutral-500">Vulkan baseline — no bug, no drama</p>
            <pre className="code-block mt-4">{CONFIG_VULKAN}</pre>
          </div>

          <blockquote className="quote-block mt-10 text-sm sm:text-base text-ink leading-relaxed max-w-3xl" data-reveal>
            Do not copy the <code className="code-inline">sed</code> patch blindly. It avoids the crash and benches stably, but only a maintainer can confirm it is safe for gfx1031. Track <a className="underline hover:text-accent" href="https://github.com/ggml-org/llama.cpp/issues/26702" target="_blank" rel="noopener">issue #26702</a> for reviewed guidance.
          </blockquote>

          <ol className="mt-10 space-y-8 max-w-3xl list-none" data-reveal="100">
            <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">1.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">I kept <strong>LACT identical</strong> for both backends so the win cannot be dismissed as tuning difference: Manual Compute, 182W, -90mV.</p></li>
            <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">2.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">I kept <strong>FA on</strong> because KV <code className="code-inline">q8_0</code> + long context + MTP all require it. Disabling FA would hide ROCm's advantage.</p></li>
            <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">3.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">I used <strong>override at runtime, not build time</strong>: <code className="code-inline">HSA_OVERRIDE_GFX_VERSION=10.3.0</code> lets gfx1031 masquerade as gfx1030 without forking the build.</p></li>
            <li className="flex gap-4"><span className="font-display font-extrabold text-accent shrink-0">4.</span><p className="text-sm sm:text-base text-neutral-700 leading-relaxed">I reported <strong>upstream with full tables</strong>: 3 runs each, same commit, so anyone can reproduce instead of trusting my summary.</p></li>
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
            <h2 className="mt-4 font-display font-bold text-lg sm:text-xl tracking-tight">Workaround, Not Upstream Fix</h2>
            <blockquote className="quote-block mt-6 text-sm sm:text-base text-neutral-600 leading-relaxed">
              This experiment is STABLE with my local workarounds (GFX override + FA assert guard) on the hardware and commit listed above. It is not an upstream fix. Native gfx1031 support and a reviewed flash-attention fix are pending with maintainers. Numbers are from 3-run <code className="code-inline">llama-bench</code> on <code className="code-inline">gemma-4-12b-it-IQ4_NL</code>, reproducible with the commands above, not a guarantee for every model or ROCm version. I disclosed the <code className="code-inline">max_blocks_per_sm = 1</code> guard as correctness-unknown on purpose.
            </blockquote>
            <p className="mt-6 text-sm text-neutral-700 leading-relaxed">
              <strong>Upstream report:</strong>{' '}
              <a className="underline hover:text-accent font-mono text-[13px]" href="https://github.com/ggml-org/llama.cpp/issues/26702" target="_blank" rel="noopener">
                ggml-org/llama.cpp#26702 — Misc. bug: ROCm gfx1031 build report (why ROCM is better than vulkan)
              </a>
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
            <InteractiveCta variant="primary" href="https://github.com/ggml-org/llama.cpp/issues/26702" external>
              View issue #26702 <span aria-hidden="true">↗</span>
            </InteractiveCta>
          </div>
        </div>
      </section>
    </main>
  );
}
