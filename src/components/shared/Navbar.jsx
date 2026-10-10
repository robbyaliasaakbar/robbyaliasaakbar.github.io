import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button.jsx'

/*
  Navbar — Opsi A: "Status-Forward".
  - Logo + status dot "Building" (live indicator)
  - Nav links + CTA merah GitHub
  - Scroll → navbar blur + garis merah tumbuh dari kiri (global.css)
  - Hamburger toggle, mobile menu tutup saat pindah halaman
*/

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/profile.html', label: 'Profile' },
  { to: '/experiments-list.html', label: 'Experiments' },
  { to: '/contact.html', label: 'Contact' },
]

const isActivePath = (pathname, to) =>
  pathname === to || (to === '/experiments-list.html' && pathname.startsWith('/exp'))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

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
            Building
          </span>
        </div>

        {/* Right: Desktop nav + CTA */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 text-base font-medium">
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
      </div>
    </header>
  )
}
