import { Link } from 'react-router-dom'
import Eyebrow from '../components/shared/Eyebrow.jsx'
import InteractiveCta from '../components/shared/InteractiveCta.jsx'
import TiltBox from '../components/shared/TiltBox.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'
import Seo from '../components/shared/Seo.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { pick } from '../i18n/translations.js'

/*
  Profile — porting penuh dari profile.html (M8, 8 Okt 2026).
  8 section: Hero Identity → Positioning → Journey → Focus Areas →
  Adaptive Approach → Principles → Value Proposition → Closing.
  Revisi tema: neumorphism + bento grid (konsisten sama homepage).
  - Hero backdrop TETAP bg-grid (keputusan Bang Rob)
  - Quote block → neu-card
  - Foto → neu-card frame
  - Journey/Principles → grid zigzag 2-1-1-2 (kayak Capability homepage)
  - Adaptive Approach TETAP dark (anchor visual)
  - Closing → light, clean tanpa kartu
  - TiltBox aktif di semua tile bento
  - i18n aktif (EN/ID). ID copy via COPY-TRACKING.md.
*/

const JOURNEY = [
  { num: '01', current: false },
  { num: '02', current: false },
  { num: '03', current: false },
  { num: '04', current: true },
]

const FOCUS_AREAS = [
  {
    key: 'f1',
    reveal: '0',
  },
  {
    key: 'f2',
    reveal: '100',
  },
  {
    key: 'f3',
    reveal: '200',
  },
  {
    key: 'f4',
    reveal: '300',
  },
  {
    key: 'f5',
    reveal: '400',
  },
  {
    key: 'f6',
    reveal: '500',
  },
]

const EVAL_LIST = [
  { key: 'eval1' },
  { key: 'eval2' },
  { key: 'eval3' },
  { key: 'eval4' },
  { key: 'eval5' },
  { key: 'eval6' },
  { key: 'eval7' },
  { key: 'eval8' },
  { key: 'eval9' },
  { key: 'eval10' },
]

const PRINCIPLES = [
  { num: '01', reveal: '0' },
  { num: '02', reveal: '100' },
  { num: '03', reveal: '200' },
  { num: '04', reveal: '300' },
]

const VALUES = [
  { key: 'v1', reveal: '0' },
  { key: 'v2', reveal: '80' },
  { key: 'v3', reveal: '160' },
  { key: 'v4', reveal: '240' },
  { key: 'v5', reveal: '320', span: true },
]

export default function Profile() {
  useScrollReveal()
  const { lang } = useLanguage()

  // Helper per section
  const tHero = (key) => pick(lang, 'profileHero', key)
  const tPos = (key) => pick(lang, 'profilePositioning', key)
  const tJourney = (key) => pick(lang, 'profileJourney', key)
  const tFocus = (key) => pick(lang, 'profileFocus', key)
  const tAdaptive = (key) => pick(lang, 'profileAdaptive', key)
  const tPrinciples = (key) => pick(lang, 'profilePrinciples', key)
  const tValues = (key) => pick(lang, 'profileValues', key)
  const tClosing = (key) => pick(lang, 'profileClosing', key)

  return (
    <main>
      <Seo
        title="Profile — Robby Aliasa Akbar"
        description="I'm a self-taught applied AI systems builder. I explore local LLMs, inference, automation, agent architecture, and practical AI systems."
        image="/images/metadata-banner.webp"
        path="/profile.html"
        type="website"
      />
      {/* ================= HERO — IDENTITY (bento grid, pola homepage) ================= */}
      <section className="relative overflow-hidden bg-[#F8FAFC]">
        <div className="absolute inset-0 bg-grid" aria-hidden="true"></div>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 w-full pt-36 pb-20 grid lg:grid-cols-12 gap-6">
          {/* Breadcrumb — baris 1, di luar tile */}
          <div className="lg:col-span-8" data-reveal>
            <nav aria-label="Breadcrumb" className="text-xs font-display tracking-wide">
              <ol className="flex items-center gap-2 text-neutral-500">
                <li>
                  <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                </li>
                <li aria-hidden="true" className="text-neutral-300">/</li>
                <li aria-current="page" className="font-semibold text-ink">Profile</li>
              </ol>
            </nav>
          </div>

          {/* Tile besar — Eyebrow + H1 + subtitle + intro (span 8) — DOM sebelum photo biar mobile: nama dulu */}
          <TiltBox max={5} className="lg:col-span-8">
            <div className="neu-card h-full p-8 sm:p-10">
              <Eyebrow>{tHero('eyebrow')}</Eyebrow>
              <h1
                className="mt-4 font-display font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05]"
                data-reveal="100"
              >
                {tHero('h1')}
              </h1>
              <p
                className="mt-4 font-display font-bold text-sm tracking-[0.18em] uppercase text-neutral-500"
                data-reveal="150"
              >
                {tHero('subtitle')}
              </p>
              <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed" data-reveal="200">
                {tHero('intro1')}
                <br />
                {tHero('intro2')}
              </p>
            </div>
          </TiltBox>

          {/* Photo — kolom 9-12, baris 1-4 (explicit placement, desktop tetap di kanan) */}
          <TiltBox max={5} className="lg:col-start-9 lg:col-span-4 lg:row-start-1 lg:row-span-4 flex justify-center lg:justify-end" >
            <div className="neu-card p-4 w-64 sm:w-80 lg:w-full max-w-sm h-full" data-reveal="300">
              <img
                src="/images/mypp.webp"
                alt="Portrait of Robby Aliasa Akbar — Applied AI Systems Builder"
                decoding="async"
                width="443"
                height="1210"
                className="w-full h-full rounded-2xl object-cover"
              />
            </div>
          </TiltBox>

          {/* Tile paragraph 2 (span 4) — kiri */}
          <TiltBox max={5} className="lg:col-span-4">
            <div className="neu-card h-full p-6 text-sm sm:text-base text-neutral-600 leading-relaxed space-y-4" data-reveal="400">
              <p>{tHero('para1')}</p>
              <p>{tHero('para2')}</p>
            </div>
          </TiltBox>

          {/* Tile quote 1 (span 4) — kanan, decorative quote marks */}
          <TiltBox max={5} className="lg:col-span-4">
            <div className="neu-card h-full p-6 text-sm sm:text-base text-ink flex flex-col justify-center relative" data-reveal="300">
              <span aria-hidden="true" className="absolute top-4 left-5 font-display font-extrabold text-6xl leading-none text-ink select-none">&ldquo;</span>
              <p className="relative z-10 px-6 text-center text-lg sm:text-xl font-semibold leading-relaxed">{tHero('quote')}</p>
              <span aria-hidden="true" className="absolute bottom-4 right-5 font-display font-extrabold text-6xl leading-none text-ink select-none">&rdquo;</span>
            </div>
          </TiltBox>

          {/* Tile quote 2 (span 8) */}
          <TiltBox max={5} className="lg:col-span-8">
            <div className="neu-card h-full p-6 text-sm sm:text-base text-ink leading-relaxed" data-reveal="500">
              {tHero('quote2')}
            </div>
          </TiltBox>
        </div>
      </section>

      {/* ================= POSITIONING (bento grid) ================= */}
      <section className="py-24 lg:py-32 bg-[#F8FAFC]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Eyebrow card (span 4) */}
            <div className="lg:col-span-4" data-reveal>
              <div className="neu-card h-full p-8 flex items-center">
                <Eyebrow>{tPos('eyebrow')}</Eyebrow>
              </div>
            </div>

            {/* Tagline card (span 8) */}
            <TiltBox max={5} className="lg:col-span-8">
              <div className="neu-card h-full p-8" data-reveal>
                <p className="text-lg sm:text-xl font-display font-semibold text-ink leading-relaxed">
                  {tPos('tagline')}
                </p>
              </div>
            </TiltBox>

            {/* Paragraph 1 card (span 4) */}
            <TiltBox max={5} className="lg:col-span-4">
              <div className="neu-card h-full p-8 text-base text-neutral-600 leading-relaxed" data-reveal="100">
                {tPos('para1')}
              </div>
            </TiltBox>

            {/* Paragraph 2 card (span 4) */}
            <TiltBox max={5} className="lg:col-span-4">
              <div className="neu-card h-full p-8 text-base text-neutral-600 leading-relaxed" data-reveal="150">
                {tPos('para2')}
              </div>
            </TiltBox>

            {/* Quote card (span 4) */}
            <TiltBox max={5} className="lg:col-span-4">
              <div className="neu-card h-full p-8 text-lg sm:text-xl text-ink leading-relaxed" data-reveal="200">
                {tPos('quote')}
              </div>
            </TiltBox>
          </div>
        </div>
      </section>

      {/* ================= JOURNEY ================= */}
      <section className="py-24 lg:py-32 bg-[#F8FAFC]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div data-reveal>
            <Eyebrow>{tJourney('eyebrow')}</Eyebrow>
            <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
              {tJourney('heading')}
            </h2>
          </div>

          {/* Bento zigzag 2-1-1-2 — grid persis Capability homepage */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {JOURNEY.map((item) => (
              <TiltBox
                key={item.num}
                max={5}
                className={
                  (item.num === '01'
                    ? ' sm:col-span-2 lg:col-span-2 lg:row-span-2'
                    : item.num === '04'
                      ? ' sm:col-span-2 lg:col-span-2'
                      : '')
                }
              >
                <div
                  className={`neu-card neu-card-hover h-full p-8 ${item.current ? 'neu-inset' : ''}`}
                  data-reveal
                >
                  <span className="font-display font-extrabold text-4xl sm:text-5xl text-accent">{item.num}</span>
                  <h3 className="mt-6 font-display font-bold text-xl sm:text-2xl tracking-tight">{tJourney(`j${item.num}.title`)}</h3>
                  <span className="status-badge status-stable mt-4 inline-block">{tJourney(`j${item.num}.status`)}</span>
                  <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">{tJourney(`j${item.num}.desc`)}</p>
                </div>
              </TiltBox>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOCUS AREAS ================= */}
      <section className="py-24 lg:py-32 bg-[#F8FAFC]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div data-reveal>
            <Eyebrow>{tFocus('eyebrow')}</Eyebrow>
            <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
              {tFocus('heading')}
            </h2>
          </div>

          {/* Bento: 2 tile pertama span-2, 4 sisanya 1 kolom */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOCUS_AREAS.map((item, idx) => (
              <TiltBox
                key={item.key}
                max={5}
                className={idx < 2 ? 'lg:col-span-2' : ''}
              >
                <div className="neu-card neu-card-hover h-full p-8" data-reveal={item.reveal}>
                  <h3 className="font-display font-bold text-sm tracking-[0.12em] uppercase leading-relaxed">
                    {tFocus(`${item.key}.title`)}
                  </h3>
                  <p className="mt-4 text-sm text-neutral-600 leading-relaxed">{tFocus(`${item.key}.desc`)}</p>
                </div>
              </TiltBox>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HARDWARE-AGNOSTIC APPROACH ================= */}
      <section className="py-24 lg:py-32 bg-dark-section text-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6">
              <Eyebrow data-reveal>{tAdaptive('eyebrow')}</Eyebrow>
              <p className="mt-8 text-lg sm:text-xl font-display font-semibold leading-relaxed" data-reveal="100">
                {tAdaptive('tagline')}
              </p>
              <p className="mt-6 text-base text-white/70 leading-relaxed" data-reveal="200">
                {tAdaptive('para')}
              </p>
            </div>

            <div className="lg:col-span-6" data-reveal="250">
              <p className="font-display font-bold text-xs tracking-[0.22em] uppercase text-white/40">
                {tAdaptive('listLabel')}
              </p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                {EVAL_LIST.map((item) => (
                  <li key={item.key} className="flex items-start gap-3 border-b border-white/10 pb-4">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                    <span className="text-white/80">{tAdaptive(item.key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRINCIPLES ================= */}
      <section className="py-24 lg:py-32 bg-[#F8FAFC]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div data-reveal>
            <Eyebrow>{tPrinciples('eyebrow')}</Eyebrow>
            <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
              {tPrinciples('heading')}
            </h2>
          </div>

          {/* Bento zigzag 2-1-1-2 — sama kayak Journey/Capability */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRINCIPLES.map((item) => (
              <TiltBox
                key={item.num}
                max={5}
                className={
                  (item.num === '01'
                    ? ' sm:col-span-2 lg:col-span-2 lg:row-span-2'
                    : item.num === '04'
                      ? ' sm:col-span-2 lg:col-span-2'
                      : '')
                }
              >
                <div className="neu-card neu-card-hover h-full p-8" data-reveal={item.reveal}>
                  <span className="font-display font-extrabold text-2xl text-accent">{item.num}</span>
                  <h3 className="mt-5 font-display font-bold text-lg leading-snug">{tPrinciples(`p${item.num}.title`)}</h3>
                  <p className="mt-4 text-sm text-neutral-600 leading-relaxed">{tPrinciples(`p${item.num}.desc`)}</p>
                </div>
              </TiltBox>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VALUE PROPOSITION ================= */}
      <section className="py-24 lg:py-32 bg-[#F8FAFC]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div data-reveal>
            <Eyebrow>{tValues('eyebrow')}</Eyebrow>
            <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
              {tValues('heading')}
            </h2>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((item) => (
              <TiltBox
                key={item.key}
                max={5}
                className={item.span ? 'sm:col-span-2 lg:col-span-1' : ''}
              >
                <div className="neu-card neu-card-hover h-full p-8" data-reveal={item.reveal}>
                  <h3 className="font-display font-bold text-sm tracking-[0.12em] uppercase leading-relaxed">
                    {tValues(`${item.key}.title`)}
                  </h3>
                  <p className="mt-4 text-sm text-neutral-600 leading-relaxed">{tValues(`${item.key}.desc`)}</p>
                </div>
              </TiltBox>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="py-24 lg:py-32 bg-[#F8FAFC]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2
              className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight"
              data-reveal
            >
              {tClosing('h2')}
            </h2>
            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed" data-reveal="150">
              {tClosing('p')}
            </p>
            <div className="mt-10" data-reveal="250">
              <InteractiveCta variant="primary" href="/experiments-list.html">
                {tClosing('cta')}
              </InteractiveCta>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
