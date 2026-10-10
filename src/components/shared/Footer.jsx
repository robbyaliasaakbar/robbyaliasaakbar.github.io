import { Link, useLocation } from 'react-router-dom'

/*
  Footer — di-port identik dari index.html (baris FOOTER).
  Link internal pakai <Link>, active state ngikutin lokasi route.
*/

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/profile.html', label: 'Profile' },
  { to: '/experiments-list.html', label: 'Experiments' },
  { to: '/contact.html', label: 'Contact' },
]

const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/in/robby-aliasa-akbar-001a2a267', label: 'LinkedIn' },
  { href: 'https://www.reddit.com/user/Full_Director87/', label: 'Reddit' },
  { href: 'https://www.instagram.com/ybboraa/', label: 'Instagram' },
  { href: 'mailto:ibborarts@gmail.com', label: 'Email' },
  { href: 'https://wa.me/+6282249072873', label: 'WhatsApp' },
]

export default function Footer() {
  const location = useLocation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark-section text-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 pt-16 pb-8">

        {/* Currently — live status block */}
        <div className="border-b border-white/10 pb-10 mb-10">
          <p className="eyebrow">Currently</p>
          <p className="mt-4 flex items-start gap-3 font-display font-bold text-lg sm:text-xl leading-snug">
            <span className="live-dot mt-2" aria-hidden="true"></span>
            Testing where AI helps — and where it gets in the way.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {/* Left: brand */}
          <div>
            <p className="font-display font-extrabold tracking-tight text-lg">
              Robby Aliasa Akbar
            </p>
            <p className="mt-3 font-display font-bold text-xs tracking-[0.22em] uppercase text-accent">
              Applied AI Systems Builder
            </p>
            <p className="mt-5 text-base text-white/60 leading-relaxed max-w-sm">
              Exploring AI systems, local LLMs, automation workflows, and practical tools
              that actually work in real business operations.
              <br />
              Building what matters, and checking whether AI is truly useful in everyday
              work.
            </p>
          </div>

          {/* Middle: navigate */}
          <div className="md:justify-self-center">
            <p className="font-display font-bold text-sm tracking-[0.22em] uppercase text-white/40">
              Navigate
            </p>
            <ul className="mt-5 space-y-3 text-base">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`footer-link ${isActive ? 'footer-active' : ''}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Right: connect */}
          <div className="md:justify-self-end">
            <p className="font-display font-bold text-sm tracking-[0.22em] uppercase text-white/40">
              Connect
            </p>
            <ul className="mt-5 space-y-3 text-base">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
          <p>&copy; {year} Robby Aliasa Akbar. All rights reserved.</p>
          <p className="font-display tracking-[0.14em] uppercase">
            robbyaliasaakbar.github.io
          </p>
        </div>
      </div>
    </footer>
  )
}
