import Eyebrow from '../shared/Eyebrow.jsx'
import InteractiveCta from '../shared/InteractiveCta.jsx'
import TiltBox from '../shared/TiltBox.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { pick } from '../../i18n/translations.js'

/*
  AboutSection — port section "SPOILER — ABOUT / PROFILE" dari
  index.html (M6). Grid 4/8 + CTA Button primary (revisi user:
  disamain persis sama CTA "View All Experiments").
  Revisi tema: dua kolom jadi 2 tile neumorphism (bento sederhana).
  Reveal 0/150 + copy TIDAK berubah.
*/
export default function AboutSection() {
  const { lang } = useLanguage()
  const t = (key) => pick(lang, 'about', key)

  return (
    <section className="py-24 lg:py-32 bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <TiltBox max={5} className="lg:col-span-4">
            <div className="neu-card neu-card-hover h-full p-8" data-reveal>
              <Eyebrow>{t('eyebrow')}</Eyebrow>
              <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl uppercase">
                {t('heading')}
              </h2>
            </div>
          </TiltBox>

          <TiltBox max={5} className="lg:col-span-8">
            <div className="neu-card neu-card-hover h-full p-8" data-reveal="150">
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
                {t('desc')}
              </p>
              <InteractiveCta variant="primary" href="/profile.html" className="mt-8">
                {t('cta')} <span aria-hidden="true">-&gt;</span>
              </InteractiveCta>
            </div>
          </TiltBox>
        </div>
      </div>
    </section>
  )
}
