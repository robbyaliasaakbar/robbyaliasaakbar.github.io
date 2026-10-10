import { Link } from 'react-router-dom'
import Eyebrow from '../components/shared/Eyebrow.jsx'
import StatusBadge from '../components/shared/StatusBadge.jsx'
import InteractiveCta from '../components/shared/InteractiveCta.jsx'
import TiltBox from '../components/shared/TiltBox.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'
import Seo from '../components/shared/Seo.jsx'
import { EXPERIMENTS, FILTERS } from '../data/experiments.js'
import { useState } from 'react'

/*
  ExperimentsList — porting penuh dari experiments-list.html (M8, 8 Okt 2026).
  3 section: Hero → Status Legend → Grid + Filter + Closing.

  Filter: kartu SEMUA dirender sekali, kategori non-aktif cuma di-toggle
  class `hidden` (persis JS asli). Penting: jangan unmount/mount kartu —
  class `.revealed` harus tetep nempel biar kartu gak balik transparan.
*/
export default function ExperimentsList() {
  useScrollReveal()
  const [active, setActive] = useState('all')

  const match = (exp) => active === 'all' || exp.categories.includes(active)
  const visibleCount = EXPERIMENTS.filter(match).length
  const countOf = (value) =>
    value === 'all' ? EXPERIMENTS.length : EXPERIMENTS.filter((e) => e.categories.includes(value)).length

  return (
    <main>
      <Seo
        title="Experiments by Robby Aliasa Akbar"
        description="Exploring AI capabilities, limits, and practical usability. Each experiment is documented as problem, hypothesis, failure, iteration, and evidence."
        image="/images/experiments001/experiment001.webp"
        path="/experiments-list.html"
        type="website"
      />
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true"></div>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 w-full pt-36 pb-20">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="text-xs font-display tracking-wide" data-reveal>
              <ol className="flex items-center gap-2 text-neutral-500">
                <li>
                  <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                </li>
                <li aria-hidden="true" className="text-neutral-300">/</li>
                <li aria-current="page" className="font-semibold text-ink">Experiments</li>
              </ol>
            </nav>

            <Eyebrow data-reveal>Experiments</Eyebrow>

            <h1
              className="mt-6 font-display font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05]"
              data-reveal="100"
            >
              A collection of experiments.
            </h1>

            <blockquote className="quote-block mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed" data-reveal="200">
              Exploring AI capabilities, limitations, and practical usability. Each experiment is
              documented as a process: problem, hypothesis, experiment, failure, iteration,
              evidence, result, and lesson.
            </blockquote>
          </div>
        </div>
      </section>

      {/* ================= STATUS LEGEND ================= */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow data-reveal>Status</Eyebrow>

          <div className="mt-6 flex flex-wrap items-center gap-4" data-reveal="150">
            <StatusBadge variant="working">Working On It</StatusBadge>
            <StatusBadge variant="exploring">Exploring</StatusBadge>
            <StatusBadge variant="failed">Failed</StatusBadge>
            <StatusBadge variant="stable">Stable</StatusBadge>
            <StatusBadge variant="live">Live</StatusBadge>
            <StatusBadge variant="local" label="Local Infra" />
          </div>
        </div>
      </section>

      {/* ================= EXPERIMENT GRID + FILTER ================= */}
      <section className="pb-24 lg:pb-32 bg-neutral-50 pt-20 lg:pt-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div data-reveal>
            <Eyebrow>Selected Experiments</Eyebrow>
            <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
              All Experiments
            </h2>
          </div>

          {/* Filter chips */}
          <div className="mt-8" data-reveal="100">
            <div className="flex flex-wrap gap-3" role="group" aria-label="Filter experiments by category">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={active === f.value}
                  className={`filter-chip ${active === f.value ? 'filter-chip-active' : ''}`}
                  onClick={() => setActive(f.value)}
                >
                  {f.label} <span className="filter-chip-count">({countOf(f.value)})</span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-neutral-500" aria-live="polite">
              Showing {visibleCount} of {EXPERIMENTS.length} experiments
            </p>
          </div>

          {/* Grid — 17 kartu dirender sekali, filter toggle `hidden`.
              Tilt: bungkus TiltBox max={5} — sama persis kayak card Featured homepage.
              h-full di TiltBox + Link biar tinggi card tetep seragam (stretch grid). */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {EXPERIMENTS.map((exp, i) => (
              <TiltBox
                key={exp.code}
                max={5}
                className={`min-w-0 h-full ${match(exp) ? '' : 'hidden'}`}
              >
                <Link
                  to={exp.href}
                  aria-label={exp.aria}
                  className="exp-card group flex flex-col h-full border border-black/10 rounded-2xl p-8 bg-paper"
                  data-reveal={String(i * 100)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-xs tracking-[0.2em] text-neutral-400">{exp.code}</span>
                    {exp.badges.length > 1 ? (
                      <span className="flex flex-wrap justify-end gap-2">
                        {exp.badges.map((b) => (
                          <StatusBadge key={b} variant={b} label={b === 'local' ? 'Local Infra' : undefined} />
                        ))}
                      </span>
                    ) : (
                      <StatusBadge variant={exp.badges[0]} label={exp.badges[0] === 'local' ? 'Local Infra' : undefined} />
                    )}
                  </div>
                  <h3 className="mt-6 font-display font-bold text-xl leading-snug">{exp.title}</h3>
                  <p className="mt-4 text-sm text-neutral-600 leading-relaxed flex-1">{exp.desc}</p>
                  <span className="exp-card-arrow mt-8 inline-flex items-center gap-2 font-display font-bold text-xs tracking-[0.14em] uppercase">
                    {exp.cta} <span aria-hidden="true">-&gt;</span>
                  </span>
                </Link>
              </TiltBox>
            ))}
          </div>

          {/* Empty state */}
          <div
            className={`mt-8 border border-dashed border-black/20 rounded-2xl p-10 text-center bg-white ${visibleCount !== 0 ? 'hidden' : ''}`}
            role="status"
          >
            <p className="font-display font-bold text-lg">No experiments found.</p>
            <p className="mt-2 text-sm text-neutral-500">Try another category.</p>
          </div>

          {/* ================= CLOSING ================= */}
          <div className="mt-20 lg:mt-28 max-w-3xl" data-reveal>
            <p className="font-display font-semibold text-xl sm:text-2xl leading-relaxed text-ink">
              Each experiment is documented as a technical case study, showing not just results,
              but the process of thinking, testing, failing, and iterating.
            </p>
            <div className="mt-10">
              <InteractiveCta variant="invert" href="/contact.html" buttonClassName="px-10">
                Get In Touch
              </InteractiveCta>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
