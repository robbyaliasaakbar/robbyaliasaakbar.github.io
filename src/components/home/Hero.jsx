import Eyebrow from '../shared/Eyebrow.jsx'
import InteractiveCta from '../shared/InteractiveCta.jsx'
import TiltBox from '../shared/TiltBox.jsx'

/*
  Hero — konten di-port dari index.html (section HERO).
  Foto: me-nobg.webp (HD, background transparan — hasil cutout).
  Reveal animation: pakai data-reveal + useScrollReveal (dipanggil di Home).
*/
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Blueprint grid backdrop — identik website asli */}
      <div className="absolute inset-0 bg-grid" aria-hidden="true"></div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8 w-full pt-32 pb-20 grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">

        {/* Left: identity */}
        <div className="lg:col-span-7">
          {/* Revisi user: eyebrow slide masuk dari KIRI, duluan (delay 0) */}
          <div data-reveal className="reveal-from-left">
            <Eyebrow>Applied AI System</Eyebrow>
          </div>

          {/* Revisi user: nama JATUH dari ATAS, barengan sama eyebrow (delay 0) */}
          <h1
            className="mt-6 font-display font-extrabold tracking-tight text-5xl sm:text-6xl lg:text-7xl leading-[1.02] reveal-drop"
            data-reveal="500"
          >
            Robby Aliasa Akbar
          </h1>

          <p
            className="mt-8 text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-xl"
            data-reveal="1500"
          >
            AI gives you drafts, not answers.
            <br />
            Every output needs checking. Every result has to prove itself in real daily
            work.
          </p>

          <blockquote
            className="quote-block mt-8 text-base sm:text-lg text-ink max-w-xl"
            data-reveal="1800"
          >
            No hype. I test AI in real conditions and keep what survives real business
            use.
          </blockquote>

          <div
            className="mt-8 space-y-4 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl"
            data-reveal="2100"
          >
            <p>
              I spend most of my time testing where AI helps and where it gets in the
              way. A lot of ideas fail here first so they do not fail on you.
            </p>
            <p>
              What stays is usually boring in a good way. Clear steps, checked outputs,
              and a backup plan for when AI guesses wrong.
            </p>
          </div>

          {/* CTA — minimalis: 2 tombol sejajar (revisi M3) + tilt/parallax */}
          <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal="2400">
            <InteractiveCta variant="primary" href="/experiments-list.html">
              View All Experiments
            </InteractiveCta>
            <InteractiveCta
              variant="invert"
              href="https://github.com/robbyaliasaakbar"
              external
            >
              View GitHub Profile <span aria-hidden="true">↗</span>
            </InteractiveCta>
          </div>
        </div>

        {/* Right: profile photo — cutout + tilt ngikutin mouse
            Revisi user: foto BOUNCE IN (sedikit delay biar kepisah dari
            eyebrow+nama yang masuk duluan) */}
        <div
          className="lg:col-span-5 flex justify-center lg:justify-end reveal-bounce"
          data-reveal="1000"
        >
          <TiltBox max={3.5} className="photo-frame relative w-48 sm:w-64 lg:w-full max-w-[18rem]">
            <img
              src="/images/mypp.webp"
              alt="Portrait of Robby Aliasa Akbar — Applied AI Systems Builder"
              width="444"
              height="1211"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              className="relative z-10 w-full rounded-2xl object-cover drop-shadow-2xl"
            />
          </TiltBox>
        </div>
      </div>
    </section>
  )
}
