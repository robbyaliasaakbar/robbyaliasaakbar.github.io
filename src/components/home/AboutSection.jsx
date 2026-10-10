import Eyebrow from '../shared/Eyebrow.jsx'
import InteractiveCta from '../shared/InteractiveCta.jsx'

/*
  AboutSection — port section "SPOILER — ABOUT / PROFILE" dari
  index.html (M6). Grid 4/8 + CTA Button primary (revisi user:
  disamain persis sama CTA "View All Experiments").
*/
export default function AboutSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4" data-reveal>
            <Eyebrow>About</Eyebrow>
            <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl uppercase">
              About
            </h2>
          </div>

          <div className="lg:col-span-8" data-reveal="150">
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
              I am a self taught builder who learns by shipping. I use local and hosted models
              plus workflows and systems in real conditions, check every output, and keep only
              what holds up. This site is my open notebook of what worked, what failed, and why.
            </p>
            <InteractiveCta variant="primary" href="/profile.html" className="mt-8">
              Read Full Profile <span aria-hidden="true">-&gt;</span>
            </InteractiveCta>
          </div>
        </div>
      </div>
    </section>
  )
}
