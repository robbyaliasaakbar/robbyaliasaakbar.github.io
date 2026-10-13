import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { pick } from '../../i18n/translations.js'

/*
  Navbar — Opsi A: "Status-Forward".
  - Logo + status dot "Building" (live indicator)
  - Nav links + CTA merah GitHub
  - Scroll → navbar blur + garis merah tumbuh dari kiri (global.css)
  - Hamburger toggle, mobile menu tutup saat pindah halaman
*/

const isActivePath = (pathname, to) =>
  pathname === to || (to === '/experiments-list.html' && pathname.startsWith('/exp'))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { lang, setLang } = useLanguage()

  const NAV_LINKS = [
    { to: '/', label: pick(lang, 'navbar', 'home') },
    { to: '/profile.html', label: pick(lang, 'navbar', 'profile') },
    { to: '/experiments-list.html', label: pick(lang, 'navbar', 'experiments') },
    { to: '/contact.html', label: pick(lang, 'navbar', 'contact') },
  ]

  // Scroll state — sama persis dengan main.js (threshold > 12px)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Tutup mobile menu saat pindah halaman
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      id="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 ${scrolled ? 'nav-scrolled' : ''}`}
    >
      <nav className="mx-auto max-w-6xl px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Logo + live status */}
        <div className="flex items-center gap-5">
          <Link to="/" className="font-display font-extrabold tracking-tight text-base md:text-lg">
            ROBBY ALIASA AKBAR<span className="text-accent">.</span>
          </Link>
          <span
            className="hidden lg:inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-ink/55"
            title="Currently building"
          >
            <span className="live-dot" aria-hidden="true"></span>
            {pick(lang, 'navbar', 'building')}
          </span>
        </div>

        {/* Right: Desktop nav + Language toggle + CTA */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-base font-medium">
          {/* Language toggle */}
          <div className="flex items-center gap-1 text-xs font-bold tracking-widest uppercase">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'en' ? 'text-accent' : 'text-ink/40 hover:text-ink/70'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <span className="text-ink/25" aria-hidden="true">|</span>
            <button
              onClick={() => setLang('id')}
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'id' ? 'text-accent' : 'text-ink/40 hover:text-ink/70'
              }`}
              aria-label="Ganti ke Bahasa Indonesia"
            >
              ID
            </button>
          </div>

          {NAV_LINKS.map((link) => {
            const isActive = isActivePath(location.pathname, link.to)
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${isActive ? 'nav-active' : ''}`}
              >
                {link.label}
              </Link>
            )
          })}
          <Button
            variant="invert"
            size="sm"
            href="https://github.com/robbyaliasaakbar"
            external
          >
            GitHub <span aria-hidden="true">↗</span>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          id="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className={`md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 ${
            menuOpen ? 'menu-open' : ''
          }`}
        >
          <span className="menu-bar block w-6 h-0.5 bg-ink"></span>
          <span className="menu-bar block w-6 h-0.5 bg-ink"></span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-full inset-x-0 bg-white border-b border-black/10 px-6 py-4 space-y-1 ${
          menuOpen ? '' : 'menu-hidden-state'
        }`}
      >
        {NAV_LINKS.map((link, index) => {
          const isActive = location.pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={`block py-3 text-base border-b border-black/5 ${
                isActive ? 'text-accent font-semibold' : 'text-ink font-medium'
              } ${index === NAV_LINKS.length - 1 ? 'border-b-0' : ''}`}
            >
              {link.label}
            </Link>
          )
        })}
        <a
          href="https://github.com/robbyaliasaakbar"
          target="_blank"
          rel="noopener noreferrer"
          className="block py-3 text-base font-semibold text-accent"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>

        {/* Language toggle mobile */}
        <div className="flex items-center gap-2 pt-3 text-xs font-bold tracking-widest uppercase">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 rounded transition-colors ${
              lang === 'en' ? 'text-accent' : 'text-ink/40'
            }`}
          >
            EN
          </button>
          <span className="text-ink/25" aria-hidden="true">|</span>
          <button
            onClick={() => setLang('id')}
            className={`px-3 py-1.5 rounded transition-colors ${
              lang === 'id' ? 'text-accent' : 'text-ink/40'
            }`}
          >
            ID
          </button>
        </div>
      </div>
    </header>
  )
}
