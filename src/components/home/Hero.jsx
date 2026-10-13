import Eyebrow from '../shared/Eyebrow.jsx'
import InteractiveCta from '../shared/InteractiveCta.jsx'
import HeroBanner from './HeroBanner.jsx'
import TiltBox from '../shared/TiltBox.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { pick } from '../../i18n/translations.js'

/*
  Hero — konten di-port dari index.html (section HERO).
  Revisi user: foto pribadi → HeroBanner (logo pusat + 12 ikon drift).
  Reveal animation: pakai data-reveal + useScrollReveal (dipanggil di Home).

  Revisi tema v4 — bento layout persis sketsa user:
  - eyebrow di LUAR tile (baris 1, kiri)
  - tile besar (span 8): H1 + 2 paragraf (reveal 500 / 2100)
  - banner (span 4, col-start 9, row 1-3): dari baris eyebrow sampe bawah
    baris intro/quote, neu-card di DIV GRID (tile penuh kolom & span),
    isi = HeroBanner (logo center + ikon-ikon ngambang)
  - tile intro (span 4) + quote inset (span 4) di baris 3
  - tombol CTA TANPA tile, span 8, baris 4 kiri bawah (sejajar horizontal)
  - baris 4 kolom 9-12 KOSONG sengaja (kayak sketsa)
  Semua delay reveal DIPERTAHANKAN persis:
    0 (eyebrow) / 500 (h1) / 1000 (foto bounce) / 1500 / 1800 / 2100 / 2400.
  Mobile: stack — urutan eyebrow → tile besar → intro → quote → tombol → foto.
  Copy 100% sama, TiltBox di logo banner tetap, tombol gak diubah.
*/
export default function Hero() {
  const { lang } = useLanguage()
  const t = (key) => pick(lang, 'hero', key)
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F8FAFC]">
      {/* TEKSTUR — kertas lecek (crumpled paper) via SVG noise */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.035' numOctaves='5' stitchTiles='stitch'/%3E%3CfeDiffuseLighting lighting-color='%23ffffff' surfaceScale='4'%3E%3CfeDistantLight azimuth='45' elevation='55'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8 w-full pt-32 pb-20 grid lg:grid-cols-12 gap-6">

        {/* Eyebrow — baris 1, di luar tile (sketsa) */}
        <div data-reveal className="reveal-from-left lg:col-span-8">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
        </div>

        {/* Banner — DOM dipindah ke sini khusus MOBILE: urutan eyebrow → banner → nama.
            Desktop TIDAK berubah karena placement eksplisit (col-start-9, row-start-1, row-span-3)
            di grid lg:grid-cols-12 — CSS Grid mengabaikan DOM order untuk item explicit. */}
        <div
          className="lg:col-start-9 lg:col-span-4 lg:row-start-1 lg:row-span-3 neu-card p-6 flex items-center justify-center reveal-bounce"
          data-reveal="1000"
        >
          <HeroBanner />
        </div>

        {/* Tile besar — H1 + 2 paragraf. Tile TANPA data-reveal (langsung
            kelihatan pas splash buka), isinya yang animate sendiri. */}
        <TiltBox max={5} className="lg:col-span-8">
          <div className="neu-card h-full p-8 sm:p-10">
          {/* Revisi user: nama JATUH dari ATAS (delay 500) */}
          <h1
            className="font-display font-extrabold uppercase tracking-tight text-5xl sm:text-6xl lg:text-7xl leading-[1.02] reveal-drop"
            style={{ WebkitTextStroke: '1px currentColor' }}
            data-reveal="500"
          >
            Robby Aliasa Akbar
          </h1>

          <div
            className="mt-8 space-y-4 text-base sm:text-lg text-neutral-600 leading-relaxed"
            data-reveal="2100"
          >
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
          </div>
          </div>
        </TiltBox>

        {/* Tile intro (drafts) */}
        <TiltBox max={5} className="lg:col-span-4">
          <div className="neu-card h-full p-8" data-reveal="1500">
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              {lang === 'id'
                ? 'Hal yang dihasilkan AI itu, seharusnya hanya dijadikan sebagai draft, dan bukan sebagai jawaban mutlak.'
                : 'AI gives you drafts, not answers.'}
              <br />
              {lang === 'id'
                ? 'Setiap outputnya wajib di cek, wajib di test untuk ngebuktiin kalau memang outputnya bener bener berguna buat kerjaan harian.'
                : 'Every output needs checking. Every result has to prove itself in real daily work.'}
            </p>
          </div>
        </TiltBox>

        {/* Tile quote — sama persis kayak tile lain (revisi user) */}
        <TiltBox max={5} className="lg:col-span-4">
          <blockquote
            className="neu-card h-full p-6 text-base sm:text-lg text-ink font-semibold"
            data-reveal="1800"
          >
            {t('quote')}
          </blockquote>
        </TiltBox>

        {/* Tombol CTA — baris 4, kolom 1-8 (kiri bawah, kayak sketsa):
            span lebar → 2 tombol SEJAJAR horizontal tanpa numpuk.
            Kolom 9-12 baris 4 KOSONG sengaja (ruang kosong kanan bawah). */}
        <div
          className="lg:col-span-8 flex flex-wrap items-center gap-4"
          data-reveal="2400"
        >
          <InteractiveCta variant="primary" href="/experiments-list.html">
            {t('ctaPrimary')}
          </InteractiveCta>
          <InteractiveCta
            variant="invert"
            href="https://github.com/robbyaliasaakbar"
            external
          >
            {t('ctaSecondary')} <span aria-hidden="true">↗</span>
          </InteractiveCta>
        </div>
      </div>
    </section>
  )
}
