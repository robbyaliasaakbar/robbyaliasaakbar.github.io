import Eyebrow from '../shared/Eyebrow.jsx'

/*
  ApproachSection — port section "APPROACH" dari index.html (M6).
  5 pill + blockquote, reveal 0/100.
*/

const PILLS = [
  'Test before trust',
  'Show the failures',
  'Check every output',
  'Keep what survives',
  'Build to maintain',
]

export default function ApproachSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div data-reveal>
          <Eyebrow>Approach</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
            Approach
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-reveal="100">
          {PILLS.map((pill) => (
            <div
              key={pill}
              className="approach-pill border border-black/15 rounded-full px-8 py-5 text-center font-display font-bold text-sm tracking-[0.08em] uppercase"
            >
              {pill}
            </div>
          ))}
        </div>

        <blockquote
          className="quote-block mt-16 max-w-3xl text-lg sm:text-xl text-ink leading-relaxed"
          data-reveal
        >
          I do not claim to know every answer in AI. I build, test, measure, investigate
          failure, and find what actually works.
        </blockquote>
      </div>
    </section>
  )
}
