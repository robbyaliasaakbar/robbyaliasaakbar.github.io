import Eyebrow from '../shared/Eyebrow.jsx'

/*
  ClosingSection — port section "CLOSING — ADAPTIVE BY DESIGN" dari
  index.html (M6). Blok hitam, judul uppercase, reveal 0/100/200.
*/
export default function ClosingSection() {
  return (
    <section className="py-24 lg:py-32 bg-dark-section text-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <Eyebrow data-reveal>Adaptive by Design</Eyebrow>

          <h2
            className="mt-6 font-display font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl uppercase"
            data-reveal="100"
          >
            Adaptive by Design
          </h2>

          <p
            className="mt-8 text-base sm:text-lg text-white/70 leading-relaxed"
            data-reveal="200"
          >
            AI systems are evaluated as complete stacks from hardware to app. I work across
            local runtimes, hosted models, coding agents, and automation. I often mix them in
            unusual ways such as local backends with public frontends to fit cost and control.
            The work goes from scratch to something you can use every day to see what holds up
            across different setups.
          </p>
        </div>
      </div>
    </section>
  )
}
