// Navbar.jsx — black bar, mobile first. Hamburger on phones, links on desktop.
// Pages are local state for now (home/settings). Sign-in screen arrives in Stage 2a.

import { useState } from 'react';
import Logo from './Logo.jsx';

export default function Navbar({ page, onGo, onLogout }) {
  const [open, setOpen] = useState(false);

  function go(next) {
    setOpen(false);
    onGo(next);
  }

  const link = (key, label) => (
    <button
      key={key}
      onClick={() => go(key)}
      aria-current={page === key ? 'page' : undefined}
      className={
        'px-4 py-2 rounded-lg text-sm font-medium transition ' +
        (page === key ? 'bg-accent text-white' : 'text-white/70 hover:text-white hover:bg-accent')
      }
    >
      {label}
    </button>
  );

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ink text-white">
      <nav className="mx-auto max-w-3xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <button onClick={() => go('home')} className="flex items-center gap-2.5" aria-label="Go home">
          <Logo />
          <span className="font-extrabold tracking-tight text-sm">CV SCREENING<span className="text-accent">.</span></span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          <span className="inline-flex items-center gap-1.5 bg-white text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full mr-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Online
          </span>
          {link('home', 'Home')}
          {link('settings', 'Settings')}
          <button
            onClick={() => { setOpen(false); onLogout(); }}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-accent transition"
          >
            Sign out
          </button>
        </div>

        {/* Mobile: status badge + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-white text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Online
          </span>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5"
          >
            <span className={'block w-6 h-0.5 bg-white transition ' + (open ? 'translate-y-[4px] rotate-45' : '')}></span>
            <span className={'block w-6 h-0.5 bg-white transition ' + (open ? '-translate-y-[4px] -rotate-45' : '')}></span>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-white/10 px-4 py-2 space-y-1 bg-ink">
          <button
            onClick={() => go('home')}
            className={'block w-full text-left py-3.5 px-3 rounded-lg text-sm font-medium transition ' + (page === 'home' ? 'bg-accent text-white' : 'text-white/70 hover:text-white hover:bg-accent')}
          >
            Home
          </button>
          <button
            onClick={() => go('settings')}
            className={'block w-full text-left py-3.5 px-3 rounded-lg text-sm font-medium transition ' + (page === 'settings' ? 'bg-accent text-white' : 'text-white/70 hover:text-white hover:bg-accent')}
          >
            Settings
          </button>
          <button
            onClick={() => { setOpen(false); onLogout(); }}
            className="block w-full text-left py-3.5 px-3 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-accent transition"
          >
            Sign out
          </button>
        </div>
      )}
    </header>
  );
}
