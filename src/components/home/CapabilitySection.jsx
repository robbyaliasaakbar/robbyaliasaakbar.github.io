import Eyebrow from '../shared/Eyebrow.jsx'

/*
  CapabilitySection — port section "CAPABILITY" dari index.html (M6).
  4 kartu bernomor 01–04, bg abu, reveal stagger 0/100/200/300.
*/

const CAPABILITIES = [
  {
    num: '01',
    title: 'Business-Oriented Application',
    desc: 'Directing AI capabilities toward real problems, practical workflows, and measurable value.',
    reveal: '0',
  },
  {
    num: '02',
    title: 'Technical Problem Solving',
    desc: 'Investigating bottlenecks, testing variables, and iterating based on actual behavior.',
    reveal: '100',
  },
  {
    num: '03',
    title: 'AI Systems Building',
    desc: 'Connecting model, infrastructure, tools, data, memory, and automation into usable systems.',
    reveal: '200',
  },
  {
    num: '04',
    title: 'AI Exploration',
    desc: 'Exploring emerging AI capabilities and identifying practical limits.',
    reveal: '300',
  },
]

export default function CapabilitySection() {
  return (
    <section className="py-24 lg:py-32 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div data-reveal>
          <Eyebrow>Capability</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
            Capability
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((item) => (
            <div
              key={item.num}
              className="border border-black/10 rounded-2xl p-8 bg-paper"
              data-reveal={item.reveal}
            >
              <span className="font-display font-extrabold text-3xl text-accent">
                {item.num}
              </span>
              <h3 className="mt-6 font-display font-bold text-sm tracking-[0.12em] uppercase leading-relaxed">
                {item.title}
              </h3>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
