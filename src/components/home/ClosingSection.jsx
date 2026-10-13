import Eyebrow from '../shared/Eyebrow.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { pick } from '../../i18n/translations.js'

/*
  ClosingSection — port section "CLOSING — ADAPTIVE BY DESIGN" dari
  index.html (M6). Blok hitam, judul uppercase, reveal 0/100/200.
*/
export default function ClosingSection() {
  const { lang } = useLanguage()
  const t = (key) => pick(lang, 'closing', key)

  return (
    <section className="py-24 lg:py-32 bg-dark-section text-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <Eyebrow data-reveal>{t('eyebrow')}</Eyebrow>

          <h2
            className="mt-6 font-display font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl uppercase"
            data-reveal="100"
          >
            {t('heading')}
          </h2>

          <p
            className="mt-8 text-base sm:text-lg text-white/70 leading-relaxed"
            data-reveal="200"
          >
            {t('desc')}
          </p>
        </div>
      </div>
    </section>
  )
}
