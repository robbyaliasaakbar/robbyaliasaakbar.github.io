import { useRef, useEffect, useState, useLayoutEffect } from 'react'
import Eyebrow from '../shared/Eyebrow.jsx'
import InteractiveCta from '../shared/InteractiveCta.jsx'
import StatusBadge from '../shared/StatusBadge.jsx'
import TiltBox from '../shared/TiltBox.jsx'

/*
  FeaturedExperiments — port konten asli section SELECTED EXPERIMENTS
  dari index.html (6 card), + efek tilt per card (M4).

  Catatan:
  - data-reveal delay per card dipertahankan persis dari aslinya (0/0/0/120/240/360)
  - status "local" (EXP 011) gak punya style khusus — setia sama versi asli
  - tilt max 5° — halus, card grid gerak bareng bisa bikin pusing kalo kegedean
*/

const EXPERIMENTS = [
  {
    href: '/exp017.html',
    aria: 'Read EXP 017: Four Apps, One Door, Zero Funnel, Supabase Migration by Robby Aliasa Akbar',
    image: '/images/Homepage/exp017.webp',
    imageAlt: 'Supabase database schema linking four app tables to auth users',
    code: 'EXP 017',
    badges: [
      { variant: 'stable' },
      { variant: 'live' },
    ],
    title:
      'Four Apps, One Door, Zero Funnel — Tracing Outages and Moving Auth and Data to Supabase.',
    desc: 'Can a home based multi app stack survive a broken public door, then move the auth and data of four apps to one managed backend? Supabase Auth, Postgres, Edge Functions, row locks from minute one, 13 failures on record, zero VPS bill.',
    cta: 'Read EXP 017: Supabase Migration',
    reveal: '0',
  },
  {
    href: '/exp016.html',
    aria: 'Read EXP 016: From Static Tracker to Enterprise System JobTracker by Robby Aliasa Akbar',
    image: '/images/Homepage/exp016.webp',
    imageAlt: 'JobTracker v2 enterprise dashboard preview',
    code: 'EXP 016',
    badges: [
      { variant: 'stable' },
      { variant: 'live' },
    ],
    title:
      'From Static Tracker to Enterprise System JobTracker EXP010 Rebuilt on a Home PC Without VPS Bills.',
    desc: 'Can a static tracker be rebuilt to enterprise standards on a home private server with honest tradeoffs? React + Express + Postgres + Caddy one door + CI green, 18 failures on record.',
    cta: 'Read EXP 016: Enterprise JobTracker',
    reveal: '0',
  },
  {
    href: '/exp014.html',
    aria: 'Read EXP 014: Content Tracking Web App by Robby Aliasa Akbar',
    image: '/images/Homepage/exp014.webp',
    imageAlt: 'ContentOS dashboard preview',
    code: 'EXP 014',
    badges: [
      { variant: 'stable' },
      { variant: 'live' },
    ],
    title:
      'Content Tracking Web App With Server Side Pagination, React + Vite, Live on GitHub Pages.',
    desc: 'Can a personal content tracker ship live on shared auth while keeping all 12 failures on the page? React + Vite, server side pagination, Chart.js tap to filter, 12 failures on record.',
    cta: 'Read EXP 014: Content Tracking Web App',
    reveal: '0',
  },
  {
    href: '/exp011.html',
    aria: 'Read EXP 011: One Auth Backend for Many Frontends by Robby Aliasa Akbar',
    image: '/images/Homepage/exp011.webp',
    imageAlt: 'Auth backend terminal proof',
    code: 'EXP 011',
    badges: [
      { variant: 'local', label: 'Local Infra' },
      { variant: 'stable' },
    ],
    title:
      'One Auth Backend for Many Frontends, PHP, SQLite and Docker Entry Point in a Day.',
    desc: 'Can one small auth backend serve many frontends with real OTP, opaque tokens and per user Job Tracker sync? PHP + SQLite + Docker, zero dependencies.',
    cta: 'Read EXP 011: Auth Backend PHP SQLite',
    reveal: '120',
  },
  {
    href: '/exp012.html',
    aria: 'Read EXP 012: Multi User CRM With Server Side Pagination by Robby Aliasa Akbar',
    image: '/images/Homepage/exp012.webp',
    imageAlt: 'miniLeads CRM dashboard preview',
    code: 'EXP 012',
    badges: [
      { variant: 'stable' },
      { variant: 'live' },
    ],
    title:
      'Multi User CRM With Server Side Pagination, React + Vite, Live on GitHub Pages.',
    desc: 'Can a second, heavier frontend reuse the same auth backend from EXP 011 with zero new auth code? React + Vite, 2049 leads, server pagination, tap to filter charts, dark mode.',
    cta: 'Read EXP 012: React CRM Shared Auth',
    reveal: '240',
  },
  {
    href: '/exp004.html',
    aria: 'Read EXP 004: Digital Employees with LLMs by Robby Aliasa Akbar',
    image: '/images/Homepage/exp004.webp',
    imageAlt: 'n8n workflow overview 266 nodes',
    code: 'EXP 004',
    badges: [{ variant: 'stable' }],
    title: 'Creating digital employees with the help of open source LLMs.',
    desc: '3 workflows, 266 nodes, customer service plus sales admin plus lead routing, running 24/7 on modest hardware. Equivalent to 9 to 10 administrative roles.',
    cta: 'Read EXP 004: Digital Employees',
    reveal: '360',
  },
]

// plain=true → kartu CLONE infinite (set kiri/kanan): tanpa data-reveal
// biar gak pernah kejadian "blank flash" pas kartu clone di-scroll ke tengah
// (dia langsung tampil, bukan nunggu animasi fade).
// throwDelay/throwDur: "lempar ke atas" per card (desktop grid) — stagger
// delay + durasi beda-beda biar gak seragam (revisi user).
function ExperimentCard({ exp, plain = false, throwDelay, throwDur }) {
  return (
    // Mobile: w 75% BENERAN (flex item ngambil max-content gambar ~844px kalo
    // cuma min-w → card kepotong lebar layar) + snap-center (card aktif
    // selalu pas DI TENGAH layar, kartu sebelah nyipul kiri-kanan).
    // min-w-0: neutralisir min-content flex biar semua card LEBAR SERAGAM 75%.
    // TANPA h-full: height:100% di flex item MELARANG align-items:stretch jalan
    // → tinggi card beda-beda. Tanpa itu stretch bikin semua card TINGGI SERAGAM.
    // Desktop: sm:w-auto → grid yang atur lebar kolom, seperti semula
    <TiltBox max={5} className="min-w-0 w-[75%] shrink-0 snap-center sm:w-auto">
      <a
        href={exp.href}
        aria-label={exp.aria}
        className={
          'exp-card group flex flex-col h-full border border-black/10 rounded-2xl p-5 sm:p-8 bg-paper' +
          (plain ? '' : ' reveal-throw')
        }
        data-reveal={plain ? undefined : throwDelay}
        style={plain ? undefined : { '--throw-dur': throwDur }}
      >
        <div className="rounded-xl overflow-hidden border border-black/10 mb-4 sm:mb-6">
          <img
            src={exp.image}
            alt={exp.imageAlt}
            width="800"
            height="500"
            loading="lazy"
            decoding="async"
            className="w-full aspect-[16/10] object-cover object-top"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-sm tracking-[0.2em] text-neutral-400">
            {exp.code}
          </span>
          <span className="flex flex-wrap justify-end gap-2">
            {exp.badges.map((badge) => (
              <StatusBadge
                key={badge.variant + (badge.label || '')}
                variant={badge.variant}
                label={badge.label}
              />
            ))}
          </span>
        </div>

        <h3 className="mt-4 sm:mt-6 font-display font-bold text-base sm:text-lg leading-snug">
          {exp.title}
        </h3>

        {/* Revisi user: description DIHAPUS tampilannya di semua ukuran
            (mobile udah locked hidden — desktop ikut disembunyikan) */}
        <p className="mt-4 text-base text-neutral-600 leading-relaxed flex-1 hidden">
          {exp.desc}
        </p>

        {/* Spacer khusus MOBILE: nyodorin arrow nempel ke bawah card biar rata
            (judul tiap card beda-beda jumlah barisnya).
            Desktop: sm:hidden → display:none, nol pengaruh */}
        <div className="flex-1 sm:hidden" aria-hidden="true" />

        <span className="exp-card-arrow mt-5 sm:mt-8 inline-flex items-center gap-2 font-display font-bold text-xs sm:text-sm tracking-[0.14em] uppercase">
          {exp.cta} <span aria-hidden="true">-&gt;</span>
        </span>
      </a>
    </TiltBox>
  )
}

// Variasi "lempar ke atas" per card (revisi user): stagger delay & durasi
// beda-beda biar gak seragam — pola diulang pakai modulo per idx.
const THROW_DELAY = [0, 140, 300, 180, 340, 500]
const THROW_DUR = ['0.9s', '1.12s', '1s', '1.22s', '1.06s', '1.3s']

export default function FeaturedExperiments() {
  const trackRef = useRef(null)

  // Breakpoint yang sama dengan CSS (Tailwind sm = 640px).
  // Mobile → render 3 SET kartu (clone) buat efek INFINITE.
  // Desktop → render 6 kartu biasa — struktur grid gak tersentuh.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Set asli tetap tengah; clone di kiri & kanan biar geser terus = infinite
  const list = isMobile
    ? [...EXPERIMENTS, ...EXPERIMENTS, ...EXPERIMENTS]
    : EXPERIMENTS

  // Jarak 1 kartu (pitch) & lebar 1 set pake offsetLeft — akurat berapa pun padding
  const getPitch = () => {
    const kids = trackRef.current?.children
    if (!kids || kids.length < 2) return 0
    return kids[1].offsetLeft - kids[0].offsetLeft
  }
  const getSetW = () => {
    const kids = trackRef.current?.children
    if (!kids || kids.length < 7) return 0
    return kids[6].offsetLeft - kids[0].offsetLeft
  }

  // Posisi awal: LOMPAT langsung ke set tengah (sebelum paint, tanpa animasi)
  // biar dari detik pertama pengguna sudah di tengah — clone kiri siap
  // menyambut kalau di-swipe ke kiri (infinite ke belakang).
  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track || !isMobile) return
    const setW = getSetW()
    if (setW) track.scrollLeft = setW
  }, [isMobile])

  // INFINITE NORMALISASI: begitu scroll menyeberang batas set kiri/kanan,
  // geser diam-diam ±1 setW ke posisi padanannya di set tengah.
  // Konten clone IDENTIK → reset gak kelihatan mata (infinite mulus).
  // Dijalankan setelah scroll/animasi beneran berhenti (debounce 140ms).
  useEffect(() => {
    const track = trackRef.current
    if (!track || !isMobile) return

    let timer = null
    const normalize = () => {
      const setW = getSetW()
      if (!setW) return
      const sl = track.scrollLeft
      if (sl < setW - 2) track.scrollLeft = sl + setW
      else if (sl >= setW * 2 - 2) track.scrollLeft = sl - setW
    }
    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(normalize, 140)
    }

    track.addEventListener('scroll', onScroll)
    normalize() // sekali di awal — posisi init kadang keburu sebelum listener pasang

    return () => {
      track.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [isMobile])

  // COVER-FLOW SCALE (revisi user): card yang lagi DI TENGAH = active (scale 1),
  // kartu samping = spoiler → mengecil makin jauh dari tengah (0.85).
  // Efek sampingnya: tepi kiri-kanan jadi lebih lega (background putih full)
  // tanpa nambah padding → ukuran card active TIDAK berubah.
  // Transform di <a> (anak TiltBox) — gak bentrok sama transform tilt.
  useEffect(() => {
    const track = trackRef.current
    if (!track || !isMobile) return

    let raf = null
    const update = () => {
      raf = null
      const pitch = getPitch() || 1
      const rect = track.getBoundingClientRect()
      const viewCenter = rect.left + rect.width / 2
      const kids = track.children
      for (let i = 0; i < kids.length; i++) {
        const r = kids[i].getBoundingClientRect()
        const cardCenter = r.left + r.width / 2
        const dist = Math.abs(cardCenter - viewCenter)
        const t = Math.min(1, dist / pitch) // 0 = center, ≥1 = kartu samping
        const card = kids[i].firstElementChild
        if (!card) continue
        // Origin ke arah TENGAH layar: spoiler menyusut menjauhi tepi luar
        // → nyipulnya tetap lebar, tapi card-nya tetap lebih kecil dari active
        card.style.transformOrigin =
          dist < 1 ? 'center' : cardCenter < viewCenter ? 'right center' : 'left center'
        card.style.transform = `scale(${1 - 0.15 * t})`
        // Efek blur ringan khusus spoiler: active (t=0) jernih,
        // makin jauh dari tengah makin blur (max ~2px di ujung)
        card.style.filter = t > 0.02 ? `blur(${(2 * t).toFixed(2)}px)` : ''
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      track.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
      // balikin normal kalau layar di-resize ke desktop (grid)
      for (const kid of track.children) {
        const card = kid.firstElementChild
        if (card) {
          card.style.transform = ''
          card.style.filter = ''
        }
      }
    }
  }, [isMobile])

  // AUTO-PLAY carousel mobile (revisi user): jalan sendiri tiap 3.2 detik,
  // maju 1 kartu halus (smooth). Gak ada lagi "balik ke awal" yang kasar —
  // lewat batas set → normalisasi invisible di atas yang bikin INFINITE.
  // - pause saat hover mouse / pegang layar (touch), jalan lagi setelah lepas
  // - reduced-motion / desktop (grid, gak scrollable) → mati otomatis
  useEffect(() => {
    const track = trackRef.current
    if (!track || !isMobile) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (track.scrollWidth <= track.clientWidth + 4) return // desktop grid → skip

    let timer = null

    const tick = () => {
      const pitch = getPitch()
      if (pitch) track.scrollBy({ left: pitch, behavior: 'smooth' })
    }

    const start = () => {
      if (!timer) timer = setInterval(tick, 3200)
    }
    const stop = () => {
      clearInterval(timer)
      timer = null
    }
    const pause = () => stop()
    const resume = () => start()

    start()
    track.addEventListener('mouseenter', pause)
    track.addEventListener('mouseleave', resume)
    track.addEventListener('touchstart', pause, { passive: true })
    track.addEventListener('touchend', resume, { passive: true })

    return () => {
      stop()
      track.removeEventListener('mouseenter', pause)
      track.removeEventListener('mouseleave', resume)
      track.removeEventListener('touchstart', pause)
      track.removeEventListener('touchend', resume)
    }
  }, [isMobile])

  // DRAG-TO-SCROLL (mouse): di desktop browser, klik-tarik emang gak nge-scroll
  // container secara default — jadi carousel "gak bisa digeser" pakai mouse.
  // Ditambahin manual. Touch (HP) → di-skip, biar swipe native jalan sendiri.
  // Klik tanpa tarikan → tetap buka link card seperti biasa.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let startX = 0
    let startLeft = 0
    let dragged = false

    const down = (e) => {
      if (e.pointerType === 'touch') return
      e.preventDefault() // cegah native image-drag & text selection
      dragged = false // klik baru SELALU mulai dari "belum drag"
      startX = e.clientX
      startLeft = track.scrollLeft
    }

    const move = (e) => {
      if (e.buttons === 0) return
      const dx = e.clientX - startX
      if (Math.abs(dx) > 5) {
        dragged = true
        track.scrollLeft = startLeft - dx
      }
    }

    // CATATAN urutan event: pointerup → BARU click.
    // Jadi flag dragged JANGAN di-reset di sini — biar click yang lahir dari
    // drag sempat ke-block dulu di blockClick, baru di-reset di sana/down().

    // Kalau tadi sempet di-drag, klik sesudahnya jangan buka link
    const blockClick = (e) => {
      if (dragged) {
        e.preventDefault()
        e.stopPropagation()
        dragged = false
      }
    }

    track.addEventListener('pointerdown', down)
    track.addEventListener('pointermove', move)
    track.addEventListener('click', blockClick, true)

    return () => {
      track.removeEventListener('pointerdown', down)
      track.removeEventListener('pointermove', move)
      track.removeEventListener('click', blockClick, true)
    }
  }, [])

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Revisi user: header animasi kayak hero — eyebrow slide dari kiri
            (duluan), h2 jatuh dari atas (nyusul), description jatuh lagi
            belakangan, CTA fade terakhir. Durasi easing beda-beda (CSS). */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div data-reveal className="reveal-from-left">
              <Eyebrow>Selected Experiments</Eyebrow>
            </div>
            <h2
              className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl reveal-drop"
              data-reveal="500"
            >
              Selected Experiments
            </h2>
            <p
              className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl"
              data-reveal="850"
            >
              6 of 17 experiments. Every claim below links to a live app, public source
              code, or proof from outside my site. For the complete collection with full
              evidence, failure logs, and live demos, head to the full experiments list.
            </p>
          </div>
          <div data-reveal="1200" className="shrink-0">
            <InteractiveCta variant="primary" href="/experiments-list.html">
              View All Experiments <span aria-hidden="true">-&gt;</span>
            </InteractiveCta>
          </div>
        </div>

        {/* Revisi user langkah 2+3 (center-peek cover-flow, mobile):
            - Track FULL-BLEED (-mx-6) → konten scroll clip di TEPi layar,
              spoiler NYempel ke pinggir (kiri-kanan).
            - px-6 di track: card 75% dihitung dari content box (342px)
              → ukuran card TETAP sama seperti aslinya.
            - Spoiler scale 0.85 origin ke arah tengah → lebih kecil dari
              active tapi nyipulnya gak kepotong (nempel tapi menyusut).
            - 3 set clone (infinite) + autoplay halus.
            Desktop (≥640px) → grid persis semula, gak tersentuh.
            py-4: buffer vertical biar card miring gak kepotong (clip-y). */}
        <div
          ref={trackRef}
          className="mt-12 -mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar py-4 sm:mx-0 sm:px-0 sm:py-0 sm:overflow-visible sm:grid sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
            {list.map((exp, idx) => (
              <ExperimentCard
                key={exp.code + '-' + idx}
                exp={exp}
                plain={isMobile}
                throwDelay={THROW_DELAY[idx % THROW_DELAY.length]}
                throwDur={THROW_DUR[idx % THROW_DUR.length]}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
