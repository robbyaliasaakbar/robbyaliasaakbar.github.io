import { Link } from 'react-router-dom'
import Eyebrow from '../components/shared/Eyebrow.jsx'
import InteractiveCta from '../components/shared/InteractiveCta.jsx'
import TiltBox from '../components/shared/TiltBox.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'
import Seo from '../components/shared/Seo.jsx'

/*
  Contact — porting penuh dari contact.html (M8, 8 Okt 2026).
  3 section: Hero (center) → Contact Channels (5 kartu) → CTA WhatsApp block.
  Reveal delays persis asli: hero 0/100/200, kartu 0–400, CTA block tunggal.
  Kartu tilt max=5 + CTA InteractiveCta — pola revisi user (kayak page lain).
*/

const CHANNELS = [
  {
    num: '01',
    title: 'Email',
    href: 'mailto:ibborarts@gmail.com',
    external: false,
    value: 'ibborarts@gmail.com',
    cta: 'Send email',
    breakAll: true,
    reveal: '0',
  },
  {
    num: '02',
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/robby-aliasa-akbar-001a2a267',
    external: true,
    value: 'robby-aliasa-akbar',
    cta: 'Open profile',
    breakAll: true,
    reveal: '100',
  },
  {
    num: '03',
    title: 'Reddit',
    href: 'https://www.reddit.com/user/Full_Director87/',
    external: true,
    value: 'Full_Director87',
    cta: 'Open profile',
    breakAll: false,
    reveal: '200',
  },
  {
    num: '04',
    title: 'Instagram',
    href: 'https://www.instagram.com/ybboraa/',
    external: true,
    value: 'ybboraa',
    cta: 'Open profile',
    breakAll: false,
    reveal: '300',
  },
]

const GITHUB = {
  num: '05',
  title: 'GitHub',
  href: 'https://github.com/robbyaliasaakbar',
  value: 'robbyaliasaakbar',
  cta: 'Open profile',
}

function ChannelCard({ item }) {
  return (
    <TiltBox max={5} className="min-w-0 h-full">
      <a
        href={item.href}
        {...(item.external ? { target: '_blank', rel: 'noopener' } : {})}
        className="exp-card group flex flex-col h-full border border-black/10 rounded-2xl p-8 bg-paper"
        data-reveal={item.reveal}
      >
        <span className="font-display font-bold text-xs tracking-[0.2em] text-neutral-400">{item.num}</span>
        <h2 className="mt-6 font-display font-bold text-sm tracking-[0.14em] uppercase">{item.title}</h2>
        <p className={`mt-3 text-sm text-neutral-600 leading-relaxed flex-1 ${item.breakAll ? 'break-all' : ''}`}>
          {item.value}
        </p>
        <span className="exp-card-arrow mt-8 inline-flex items-center gap-2 font-display font-bold text-xs tracking-[0.14em] uppercase">
          {item.cta} <span aria-hidden="true">-&gt;</span>
        </span>
      </a>
    </TiltBox>
  )
}

export default function Contact() {
  useScrollReveal()

  return (
    <main>
      <Seo
        title="Contact — Robby Aliasa Akbar"
        description="If you have a business problem, technical question, or AI opportunity that needs validation, feel free to reach out."
        image="/images/metadata-banner.webp"
        path="/contact.html"
        type="website"
      />
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true"></div>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 w-full pt-36 pb-20 text-center">
          <div className="max-w-3xl mx-auto">
            <nav aria-label="Breadcrumb" className="text-xs font-display tracking-wide" data-reveal>
              <ol className="flex items-center gap-2 text-neutral-500">
                <li>
                  <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                </li>
                <li aria-hidden="true" className="text-neutral-300">/</li>
                <li aria-current="page" className="font-semibold text-ink">Contact</li>
              </ol>
            </nav>

            <Eyebrow className="justify-center" data-reveal>
              Contact
            </Eyebrow>

            <h1
              className="mt-6 font-display font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05]"
              data-reveal="100"
            >
              Have a problem worth exploring?
            </h1>

            <p className="mt-8 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto" data-reveal="200">
              If you have a business problem, technical question, or AI opportunity that needs
              validation, feel free to reach out.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT CHANNELS ================= */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHANNELS.map((item) => (
              <ChannelCard key={item.num} item={item} />
            ))}

            {/* GitHub — baris sendiri, center, selebar 1 kolom */}
            <div className="sm:col-span-2 lg:col-span-4 flex justify-center" data-reveal="400">
              <TiltBox max={5} className="w-full sm:max-w-[calc((100%-24px)/2)] lg:max-w-[calc((100%-72px)/4)]">
                <a
                  href={GITHUB.href}
                  target="_blank"
                  rel="noopener"
                  className="exp-card group flex flex-col h-full border border-black/10 rounded-2xl p-8 bg-paper"
                >
                  <span className="font-display font-bold text-xs tracking-[0.2em] text-neutral-400">{GITHUB.num}</span>
                  <h2 className="mt-6 font-display font-bold text-sm tracking-[0.14em] uppercase">{GITHUB.title}</h2>
                  <p className="mt-3 text-sm text-neutral-600 leading-relaxed flex-1 break-all">{GITHUB.value}</p>
                  <span className="exp-card-arrow mt-8 inline-flex items-center gap-2 font-display font-bold text-xs tracking-[0.14em] uppercase">
                    {GITHUB.cta} <span aria-hidden="true">-&gt;</span>
                  </span>
                </a>
              </TiltBox>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRIMARY CTA ================= */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="bg-dark-section rounded-3xl text-white px-8 py-16 sm:px-16 sm:py-20 text-center" data-reveal>
            <p className="font-display font-bold text-xs tracking-[0.22em] uppercase text-accent">
              Fastest Response
            </p>
            <h2 className="mt-6 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Let&apos;s talk directly on WhatsApp.
            </h2>
            <p className="mt-6 text-base text-white/70 leading-relaxed max-w-xl mx-auto">
              Direct message. No forms, no middleman.
            </p>
            <div className="mt-10 flex justify-center">
              <InteractiveCta
                variant="invert"
                href="https://wa.me/+6282249072873?text=Hello%2C%20I%27d%20like%20to%20know%20more%20about%20AI.%20May%20I%20ask%20a%20question%3F"
                external
                buttonClassName="px-10"
              >
                Send WhatsApp
              </InteractiveCta>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
