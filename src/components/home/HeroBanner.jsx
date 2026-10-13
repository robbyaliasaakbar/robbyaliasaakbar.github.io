import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import TiltBox from '../shared/TiltBox.jsx'

/*
  HeroBanner — tile kanan Hero.
  Logo di tengah (TiltBox) + 12 ikon drift ngelilingin.
  Semua ikon DI ATAS logo (over: true). Ukuran seragam w-14 sm:w-16.
  prefers-reduced-motion → ikon diam (aksesibilitas).
  Random di-generate SEKALI per mount (useMemo []).
*/

const BASE = '/images/banner%20Homepage/'

const ICONS = [
  { file: 'HITML5.webp', label: 'HTML5', x: 12, y: 22 },
  { file: 'LLama-cpp.webp', label: 'llama.cpp', x: 12, y: 40 },
  { file: 'postgres.webp', label: 'PostgreSQL', x: 12, y: 60 },
  { file: 'mysql.webp', label: 'MySQL', x: 12, y: 78 },
  { file: 'VLLM.webp', label: 'vLLM', x: 88, y: 22, big: true },
  { file: 'SGLang.webp', label: 'SGLang', x: 88, y: 40, big: true },
  { file: 'node-js.webp', label: 'Node.js', x: 88, y: 60, big: true },
  { file: 'github.webp', label: 'GitHub', x: 88, y: 78, big: true },
  { file: 'React.webp', label: 'React', x: 38, y: 10 },
  { file: 'vue-js.webp', label: 'Vue.js', x: 64, y: 10 },
  { file: 'Vite.webp', label: 'Vite', x: 38, y: 90 },
  { file: 'Tailwindcss.webp', label: 'Tailwind CSS', x: 64, y: 90 },
]

// Path drift acak — 5 titik: 0 → acak → acak → acak → 0 (repeat seamless).
function makeDriftPath(amp) {
  const r = () => (Math.random() * 2 - 1) * amp
  return [0, r(), r(), r(), 0]
}

function DriftIcon({ icon, reduceMotion }) {
  const drift = useMemo(() => {
    const amp = 20 + Math.random() * 14
    return {
      x: makeDriftPath(amp),
      y: makeDriftPath(amp),
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 4,
    }
  }, [])

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
      style={{ left: `${icon.x}%`, top: `${icon.y}%` }}
      aria-hidden="true"
    >
      <motion.img
        src={BASE + icon.file + '?v=fresh2'}
        alt=""
        width="96"
        height="96"
        loading="lazy"
        decoding="async"
        className={`${icon.big ? 'hero-ico-lg' : 'w-14 sm:w-16'} select-none drop-shadow-sm`}
        style={{
          willChange: 'transform',
          ...(icon.big ? { width: 62, maxWidth: 'none' } : {}),
        }}
        animate={reduceMotion ? undefined : { x: drift.x, y: drift.y }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: drift.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: drift.delay,
              }
        }
      />
    </div>
  )
}

export default function HeroBanner() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[560px]">
      {ICONS.map((icon) => (
        <DriftIcon key={icon.file} icon={icon} reduceMotion={reduceMotion} />
      ))}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <TiltBox max={3.5} className="relative">
          <img
            src={BASE + 'logo%20gue.webp'}
            alt="Robby Aliasa Akbar logo mark"
            width="176"
            height="176"
            loading="eager"
            decoding="async"
            className="hero-logo"
          />
        </TiltBox>
      </div>
    </div>
  )
}
