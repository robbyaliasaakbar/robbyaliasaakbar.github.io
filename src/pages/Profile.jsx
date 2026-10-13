import { Link } from 'react-router-dom'
import Eyebrow from '../components/shared/Eyebrow.jsx'
import InteractiveCta from '../components/shared/InteractiveCta.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'
import Seo from '../components/shared/Seo.jsx'

/*
  Profile — porting penuh dari profile.html (M8, 8 Okt 2026).
  8 section: Hero Identity → Positioning → Journey → Focus Areas →
  Adaptive Approach → Principles → Value Proposition → Closing.
  Reveal delays disalin persis dari asli (0/100/150/200/300/400/500, dst).
*/

const JOURNEY = [
  {
    num: '01',
    title: 'AI USER',
    status: 'Starting Point',
    desc: 'Starting as a regular AI user without deep technical understanding. Using AI tools to solve everyday tasks, without understanding the architecture behind them.',
  },
  {
    num: '02',
    title: 'AI EXPLORER',
    status: 'Deepening',
    desc: 'Moving from using AI to understanding how AI systems work. Exploring local and hosted models, model architecture, quantization, inference engines, and hardware requirements.',
  },
  {
    num: '03',
    title: 'AI BUILDER',
    status: 'Creating',
    desc: 'Building integrated systems using models, tools, automation, memory, and infrastructure. Moving from running models to orchestrating complete AI workflows.',
  },
  {
    num: '04',
    title: 'AI SYSTEMS EXPERIMENTER',
    status: 'Current',
    desc: 'Testing limits, measuring behavior, investigating bottlenecks, and refining systems based on evidence. Focused on checking every output and building from scratch to daily use.',
    current: true,
  },
]

const FOCUS_AREAS = [
  {
    title: 'Local and Hosted AI',
    desc: 'Model choice, quantization, runtime setup, CPU and GPU tuning, and performance checks in real conditions.',
    reveal: '0',
  },
  {
    title: 'AI Systems and Infrastructure',
    desc: 'Mixing models, interfaces, automation, tools, memory, and workflows into systems that hold up daily.',
    reveal: '100',
  },
  {
    title: 'Agent Architecture',
    desc: 'Systems that take goals, use tools, read info, reason, act, and improve with checks at each step.',
    reveal: '200',
  },
  {
    title: 'Hardware Aware AI Evaluation',
    desc: 'Reading the full stack from hardware to app and testing what survives limits of cost, power, and context.',
    reveal: '300',
  },
  {
    title: 'Coding Agents and Automation',
    desc: 'Daily work with coding agents and automation to move from scratch to working systems.',
    reveal: '400',
  },
  {
    title: 'Full Stack Backend to Frontend',
    desc: 'Building complete paths from backend to frontend including local backends with public frontends to fit cost, control, and scale.',
    reveal: '500',
  },
]

const EVAL_LIST = [
  'CPU and GPU behavior',
  'Memory and bandwidth limits',
  'Runtime compatibility',
  'Inference configuration',
  'Model architecture',
  'Context length',
  'Thermal and power behavior',
  'Stability and usability',
  'Mixed private and public setups',
  'Coding agents and automation',
]

const PRINCIPLES = [
  {
    num: '01',
    title: 'Evidence Is Not a Conclusion',
    desc: 'Observations must be understood in context. Experimental results are separated into: observation, interpretation, hypothesis, and conclusion.',
    reveal: '0',
  },
  {
    num: '02',
    title: 'Newbie Mindset',
    desc: 'Assumptions are treated as hypotheses. When evidence contradicts understanding, the mental model changes.',
    reveal: '100',
  },
  {
    num: '03',
    title: 'AI as a Building Partner',
    desc: 'AI is used as a partner for exploration, debugging, coding, research, and documentation. But AI output is still tested against documentation, experiments, and actual system behavior.',
    reveal: '200',
  },
  {
    num: '04',
    title: 'Coding as a Tool',
    desc: 'Coding is used to understand, modify, automate, and control AI systems, not as the final goal.',
    reveal: '300',
  },
]

const VALUES = [
  {
    title: 'Check If It Can Work',
    desc: 'Telling you plainly if your AI idea is worth trying and what the first safe test looks like.',
    reveal: '0',
  },
  {
    title: 'Design The Full System',
    desc: 'Drawing the whole path from input to output so you know what to build and what to skip.',
    reveal: '80',
  },
  {
    title: 'Fit To Real Limits',
    desc: 'Matching model and setup to your budget, power, and context so it keeps running daily.',
    reveal: '160',
  },
  {
    title: 'Connect Tools and Agents',
    desc: 'Linking models to your tools and data with checks so each step stays safe to trust.',
    reveal: '240',
  },
  {
    title: 'Test Small Before Big',
    desc: 'Trying the risky part first at small scale before you pay for the full build.',
    reveal: '320',
    span: true,
  },
]

export default function Profile() {
  useScrollReveal()

  return (
    <main>
      <Seo
        title="Profile — Robby Aliasa Akbar"
        description="I'm a self-taught applied AI systems builder. I explore local LLMs, inference, automation, agent architecture, and practical AI systems."
        image="/images/metadata-banner.webp"
        path="/profile.html"
        type="website"
      />
      {/* ================= HERO — IDENTITY ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true"></div>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 w-full pt-36 pb-20 grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          {/* Left: identity */}
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-xs font-display tracking-wide" data-reveal>
              <ol className="flex items-center gap-2 text-neutral-500">
                <li>
                  <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                </li>
                <li aria-hidden="true" className="text-neutral-300">/</li>
                <li aria-current="page" className="font-semibold text-ink">Profile</li>
              </ol>
            </nav>

            <Eyebrow data-reveal>Identity</Eyebrow>

            <h1
              className="mt-6 font-display font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05]"
              data-reveal="100"
            >
              Robby Aliasa Akbar
            </h1>

            <p
              className="mt-4 font-display font-bold text-sm tracking-[0.18em] uppercase text-neutral-500"
              data-reveal="150"
            >
              Applied AI Systems Builder
            </p>

            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl" data-reveal="200">
              AI gives you drafts, not answers.
              <br />
              Every output needs checking. Every result has to prove itself in real daily work.
            </p>

            <blockquote className="quote-block mt-8 text-sm sm:text-base text-ink max-w-xl" data-reveal="300">
              No hype. I test AI in real conditions and keep what survives real business use.
            </blockquote>

            <div className="mt-8 space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl" data-reveal="400">
              <p>I spend most of my time testing where AI helps and where it gets in the way. A lot of ideas fail here first so they do not fail on you.</p>
              <p>What stays is usually boring in a good way. Clear steps, checked outputs, and a backup plan for when AI guesses wrong.</p>
            </div>

            <blockquote className="quote-block mt-8 text-sm sm:text-base text-ink leading-relaxed max-w-xl" data-reveal="500">
              I am a self taught builder who learns by shipping. I use local and hosted models plus workflows and systems in real conditions, check every output, and keep only what holds up. This site is my open notebook of what worked, what failed, and why.
            </blockquote>
          </div>

          {/* Right: profile photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end" data-reveal="300">
            <div className="photo-frame relative w-64 sm:w-80 lg:w-full max-w-sm">
              <img
                src="/images/mypp.webp"
                alt="Portrait of Robby Aliasa Akbar — Applied AI Systems Builder"
                decoding="async"
                width="443"
                height="1210"
                className="relative z-10 w-full rounded-2xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= POSITIONING ================= */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4" data-reveal>
              <Eyebrow>Positioning</Eyebrow>
            </div>

            <div className="lg:col-span-8">
              <p className="text-lg sm:text-xl font-display font-semibold text-ink leading-relaxed" data-reveal>
                I am an independent builder. I build AI systems for real daily work.
              </p>
              <p className="mt-6 text-base text-neutral-600 leading-relaxed max-w-2xl" data-reveal="100">
                I do not claim mastery over every new tool. I test what new capabilities can do in real world conditions, check the outputs, and turn what holds up into systems you can use every day.
              </p>
              <p className="mt-6 text-base text-neutral-600 leading-relaxed max-w-2xl" data-reveal="150">
                14 experiments shipped. 5 live apps. Source code public. Every claim links to something you can open and check.
              </p>
              <blockquote className="quote-block mt-10 text-lg sm:text-xl text-ink leading-relaxed max-w-2xl" data-reveal="200">
                Exploring what AI can do. Building what works. And asking one more question: is it really useful in everyday life?
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ================= JOURNEY ================= */}
      <section className="py-24 lg:py-32 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div data-reveal>
            <Eyebrow>Journey</Eyebrow>
            <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
              Journey
            </h2>
          </div>

          <div className="mt-14">
            {JOURNEY.map((item) => (
              <div
                key={item.num}
                className={`journey-item relative grid md:grid-cols-12 gap-4 md:gap-10 py-10 border-t border-black/10 ${item.current ? 'border-b' : ''}`}
                data-reveal
              >
                <div className="md:col-span-2">
                  <span className="font-display font-extrabold text-4xl sm:text-5xl text-accent">{item.num}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight">{item.title}</h3>
                  <span className="status-badge status-stable mt-4">{item.status}</span>
                </div>
                <p className="md:col-span-6 text-sm sm:text-base text-neutral-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOCUS AREAS ================= */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div data-reveal>
            <Eyebrow>Focus Areas</Eyebrow>
            <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
              Focus Areas
            </h2>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {FOCUS_AREAS.map((item) => (
              <div key={item.title} className="border border-black/10 rounded-2xl p-8" data-reveal={item.reveal}>
                <h3 className="font-display font-bold text-sm tracking-[0.12em] uppercase leading-relaxed">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HARDWARE-AGNOSTIC APPROACH ================= */}
      <section className="py-24 lg:py-32 bg-dark-section text-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6">
              <Eyebrow data-reveal>Adaptive Approach</Eyebrow>
              <p className="mt-8 text-lg sm:text-xl font-display font-semibold leading-relaxed" data-reveal="100">
                I adapt across hardware and software stacks.
              </p>
              <p className="mt-6 text-base text-white/70 leading-relaxed" data-reveal="200">
                I am not tied to one GPU vendor, one device class, or one platform. I look at the full path from hardware to app and find ways to make AI work with what is actually available, mixed to fit cost, control, and scale.
              </p>
            </div>

            <div className="lg:col-span-6" data-reveal="250">
              <p className="font-display font-bold text-xs tracking-[0.22em] uppercase text-white/40">
                This includes evaluating:
              </p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                {EVAL_LIST.map((label) => (
                  <li key={label} className="flex items-start gap-3 border-b border-white/10 pb-4">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                    <span className="text-white/80">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRINCIPLES ================= */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div data-reveal>
            <Eyebrow>Principles</Eyebrow>
            <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
              Principles
            </h2>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {PRINCIPLES.map((item) => (
              <div key={item.num} className="border border-black/10 rounded-2xl p-8" data-reveal={item.reveal}>
                <span className="font-display font-extrabold text-2xl text-accent">{item.num}</span>
                <h3 className="mt-5 font-display font-bold text-lg leading-snug">{item.title}</h3>
                <p className="mt-4 text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VALUE PROPOSITION ================= */}
      <section className="py-24 lg:py-32 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div data-reveal>
            <Eyebrow>Value Proposition</Eyebrow>
            <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
              Value Proposition
            </h2>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((item) => (
              <div
                key={item.title}
                className={`border border-black/10 rounded-2xl p-8 bg-paper ${item.span ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                data-reveal={item.reveal}
              >
                <h3 className="font-display font-bold text-sm tracking-[0.12em] uppercase leading-relaxed">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2
              className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight"
              data-reveal
            >
              I don&apos;t claim to have all the answers in AI.
            </h2>
            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed" data-reveal="150">
              I do not have all the answers. I just keep asking, keep testing, and learn from what fails. If it holds up, I build it into something you can use every day.
            </p>
            <div className="mt-10" data-reveal="250">
              <InteractiveCta variant="primary" href="/experiments-list.html">
                View Experiments
              </InteractiveCta>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
