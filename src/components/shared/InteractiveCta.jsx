import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import TiltBox from './TiltBox.jsx'
import Button from './Button.jsx'

/*
  InteractiveCta — tombol CTA dengan EFEK GANDA (revisi user M7):
  1. TILT     → miring ngikutin mouse (TiltBox, mati di reduced-motion/HP)
  2. PARALLAX → naik-turun beda kecepatan saat scroll (framer-motion,
                ±20px dari posisi tengah, mati juga di reduced-motion)

  Layer dipisah biar gak tabrakan:
  - motion.div  = parallax (translateY pas scroll)
  - TiltBox     = tilt (rotate pas hover)

  API = API Button + beberapa prop efek:
  <InteractiveCta variant="primary" href="/..." max={6} scale={1.03}>Teks</InteractiveCta>
*/
export default function InteractiveCta({
  children,
  className = '',
  buttonClassName = '',
  max = 6,
  scale = 1.03,
  parallax = 20,
  ...buttonProps
}) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax])

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ y: reduceMotion ? 0 : y }}
    >
      <TiltBox max={max} scale={scale}>
        <Button {...buttonProps} className={buttonClassName}>
          {children}
        </Button>
      </TiltBox>
    </motion.div>
  )
}
