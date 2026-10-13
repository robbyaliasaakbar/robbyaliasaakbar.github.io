import Eyebrow from '../shared/Eyebrow.jsx'
import TiltBox from '../shared/TiltBox.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { pick } from '../../i18n/translations.js'

/*
  ApproachSection — port section "APPROACH" dari index.html (M6).
  5 pill + blockquote, reveal 0/100.
  Revisi tema: pills + quote digabung jadi SATU bento grid.
  Layout lg (3 kolom, penuh tanpa lubang):
    p1 | quote quote
    p2 | quote quote
    p3 | p4     p5
  Layout sm (2 kolom): quote full width atas, p1|p2, p3|p4, p5 full bawah.
  Mobile: stack biasa. Reveal 0/100 + copy TIDAK berubah.
*/

export default function ApproachSection() {
  const { lang } = useLanguage()
  const t = (key) => pick(lang, 'approach', key)

  const PILLS = [
    t('pill1'),
    t('pill2'),
    t('pill3'),
    t('pill4'),
    t('pill5'),
  ]

  return (
    <section className="py-24 lg:py-32 bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div data-reveal>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
            {t('heading')}
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-reveal="100">
          {PILLS.map((pill, i) => (
            <TiltBox
              key={pill}
              max={5}
              className={
                // Pill terakhir (index 4): lebar penuh di sm, normal lagi di lg
                i === 4 ? ' sm:col-span-2 lg:col-span-1' : ''
              }
            >
              <div className="approach-pill neu-pill h-full px-8 py-5 text-center font-display font-bold text-sm tracking-[0.08em] uppercase">
                {pill}
              </div>
            </TiltBox>
          ))}

          {/* Tile quote besar — sama persis kayak tile lain (revisi user).
              Penempatan eksplisit di lg (kolom 2-3, baris 1-2) biar
              auto-placement 5 pill isi sisa slotnya pas tanpa lubang. */}
          <TiltBox
            max={5}
            className="sm:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-1 lg:row-span-2"
          >
            <blockquote className="neu-card font-semibold h-full p-6 text-lg sm:text-xl text-ink leading-relaxed lg:p-8">
              {t('quote')}
            </blockquote>
          </TiltBox>
        </div>
      </div>
    </section>
  )
}
