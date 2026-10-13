import Eyebrow from '../shared/Eyebrow.jsx'
import TiltBox from '../shared/TiltBox.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { pick } from '../../i18n/translations.js'

/*
  CapabilitySection — port section "CAPABILITY" dari index.html (M6).
  4 kartu bernomor 01–04, bg abu, reveal stagger 0/100/200/300.
  Revisi tema: bento grid + neumorphism.
  - lg (4 kolom): 01 tile besar span 2x2, 02 & 03 tile kecil,
    04 tile lebar span 2 → grid penuh tanpa lubang.
  - sm (2 kolom): 01 & 04 lebar, 02 & 03 kecil.
  Reveal stagger + copy TIDAK berubah.
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
  const { lang } = useLanguage()
  const t = (key) => pick(lang, 'capability', key)

  return (
    <section className="py-24 lg:py-32 bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div data-reveal>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
            {t('heading')}
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((item) => (
            <TiltBox
              key={item.num}
              max={5}
              className={
                // Bento spans — mobile: semua 1 kolom penuh (stack)
                (item.num === '01'
                  ? ' sm:col-span-2 lg:col-span-2 lg:row-span-2'
                  : item.num === '04'
                    ? ' sm:col-span-2 lg:col-span-2'
                    : '')
              }
            >
              <div
                className="neu-card neu-card-hover h-full p-8"
                data-reveal={item.reveal}
              >
                <span className="font-display font-extrabold text-3xl text-accent">
                  {item.num}
                </span>
                <h3 className="mt-6 font-display font-bold text-sm tracking-[0.12em] uppercase leading-relaxed">
                  {t(`c${item.num}.title`)}
                </h3>
                <p className="mt-4 text-base text-neutral-600 leading-relaxed">{t(`c${item.num}.desc`)}</p>
              </div>
            </TiltBox>
          ))}
        </div>
      </div>
    </section>
  )
}
