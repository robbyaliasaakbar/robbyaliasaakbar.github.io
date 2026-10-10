import Tilt from 'react-parallax-tilt'

/*
  TiltBox — bungkus elemen biar miring ngikutin mouse.
  Shared component (foto hero sekarang, card eksperimen menyusul M4).

  Default dijaga halus:
  - tiltMaxAngleX/Y → sudut miring maks (DERAJAT) — prop resmi library,
                      nama "max" TIDAK dikenal dan diam-diam diabaikan!
                      foto hero: 3.5° = 25% dari baseline 14°
  - scale 1.005   → zoom pelan-pelan pas hover (25% dari baseline 1.02)
  - glare OFF     → foto cutout transparan, glare bikin kotak nyala aneh
  - touch screen  → library-nya emang cuma reaksi mouse (HP aman otomatis)
  - prefers-reduced-motion → Tilt dimatikan total
*/
export default function TiltBox({ children, max = 10, className = '', scale = 1.005 }) {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Detektor di console — biar keliatan tilt-nya idup atau mati (debug M3)
  console.info(
    `[TiltBox] reduced-motion = ${reducedMotion} | tilt ${reducedMotion ? 'MATI (mode reduce aktif)' : 'AKTIF'}`
  )

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <Tilt
      className={className}
      tiltMaxAngleX={max}
      tiltMaxAngleY={max}
      speed={400}
      scale={scale}
      perspective={1000}
      glareEnable={false}
      transitionDuration={300}
    >
      {children}
    </Tilt>
  )
}
