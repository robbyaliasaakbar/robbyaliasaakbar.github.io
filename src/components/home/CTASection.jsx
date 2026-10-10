import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Eyebrow from '../shared/Eyebrow.jsx'
import InteractiveCta from '../shared/InteractiveCta.jsx'

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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const fgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={ref} className="relative overflow-hidden py-24 lg:py-32 bg-neutral-50">
      {/* LATAR — grid pattern, gerak cepat */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 -top-[20%] -bottom-[20%] bg-grid pointer-events-none"
        style={{ y: reduceMotion ? 0 : bgY }}
      />

      {/* DEPAN — konten gerak pelan, arah berlawanan */}
      <motion.div
        className="relative mx-auto max-w-6xl px-6 lg:px-8 text-center"
        style={{ y: reduceMotion ? 0 : fgY }}
      >
        <Eyebrow className="justify-center" data-reveal>
          Contact
        </Eyebrow>

        <h2
          className="mt-6 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl"
          data-reveal="100"
        >
          Have a problem worth exploring?
        </h2>

        <p
          className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto"
          data-reveal="200"
        >
          If you have a business problem, technical question, or AI opportunity that needs
          validation, feel free to reach out.
        </p>

        <div className="mt-10" data-reveal="300">
          <InteractiveCta
            variant="primary"
            href="https://wa.me/+6282249072873"
            external
            buttonClassName="px-10"
          >
            Send WhatsApp
          </InteractiveCta>
        </div>
      </motion.div>
    </section>
  )
}
