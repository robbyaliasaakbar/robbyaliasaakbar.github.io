import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Eyebrow from '../shared/Eyebrow.jsx'
import InteractiveCta from '../shared/InteractiveCta.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { pick } from '../../i18n/translations.js'

/*
  CTASection — port section "SPOILER — CONTACT" dari index.html
  (teks 100% sama) + efek parallax framer-motion (M5).

  Konsep parallax:
  - LATAR  = grid pattern, gerak CEPAT  (±15% tinggi section)
  - DEPAN  = konten teks/tombol, gerak PELAN (±40px), arah berlawanan
  → dua elemen beda kecepatan = depth
  - prefers-reduced-motion → gerakan mati total (y = 0)
*/
export default function CTASection() {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { lang } = useLanguage()
  const t = (key) => pick(lang, 'ctaSection', key)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const fgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={ref} className="relative overflow-hidden py-24 lg:py-32 bg-[#F8FAFC]">
      {/* DEPAN — konten gerak pelan, arah berlawanan.
          Revisi tema: konten dibungkus .neu-card (tile penutup).
          neu-card DI DALAM motion.div (bukan di motion.div-nya sendiri)
          — kalau di motion.div, CSS transition transform .neu-card bakal
          nimpa transform parallax framer-motion tiap frame → jank. */}
      <motion.div
        className="relative mx-auto max-w-6xl px-6 lg:px-8 text-center"
        style={{ y: reduceMotion ? 0 : fgY }}
      >
        <div className="neu-card p-8 sm:p-14">
          <Eyebrow className="justify-center" data-reveal>
            {t('eyebrow')}
          </Eyebrow>

          <h2
            className="mt-6 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl"
            data-reveal="100"
          >
            {t('heading')}
          </h2>

          <p
            className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto"
            data-reveal="200"
          >
            {t('desc')}
          </p>

          <div className="mt-10" data-reveal="300">
            <InteractiveCta
              variant="primary"
              href="https://wa.me/+6282249072873"
              external
              buttonClassName="px-10"
            >
              {t('button')}
            </InteractiveCta>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
