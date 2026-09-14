// Settings.jsx — layar pengaturan: akun (readonly) + tema.
// Ganti password nyusul (butuh alur OTP sendiri, 1 fitur terpisah).
import Logo from './Logo.jsx';

export default function Settings({ user, theme, onTheme, onBack, onLogout }) {
  const card = 'bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-4 sm:p-5';

  function ThemeCard({ value, label, preview }) {
    const active = theme === value;
    return (
      <button
        onClick={() => onTheme(value)}
        className={'flex-1 min-h-[44px] border rounded-2xl p-4 text-left transition ' + (active ? 'border-accent ring-2 ring-accent/30' : 'border-ink/15 dark:border-white/15')}
      >
        <span className="block h-12 rounded-xl overflow-hidden border border-ink/10 dark:border-white/10">{preview}</span>
        <span className="mt-2 flex items-center justify-between text-sm font-semibold">
          {label}
          {active && <span className="text-accent">✓</span>}
        </span>
      </button>
    );
  }

  return (
    <div>
      <header id="site-navbar" className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-3">
          <Logo />
          <span className="inline-flex items-center gap-2 whitespace-nowrap text-[11px] sm:text-xs font-semibold text-white/90 border border-white/15 bg-white/10 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Online
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <button onClick={onBack} className="text-sm font-semibold hover:underline">← Back</button>

        <div>
          <p className="eyebrow">Settings</p>
          <h1 className="mt-3 font-display font-extrabold tracking-tight text-3xl sm:text-4xl">Settings</h1>
        </div>

        <section className={card}>
          <p className="eyebrow">Account</p>
          <h2 className="mt-3 font-display font-bold">Account</h2>
          <div className="mt-3 space-y-2 text-sm">
            <p><span className="text-neutral-500 dark:text-neutral-400">Username:</span> <b>{user.username || '-'}</b></p>
            <p><span className="text-neutral-500 dark:text-neutral-400">Email:</span> <b>{user.email}</b></p>
            <p><span className="text-neutral-500 dark:text-neutral-400">Role:</span> <b className="uppercase">{user.role}</b></p>
            <p><span className="text-neutral-500 dark:text-neutral-400">Password:</span> <b>••••••••</b> <span className="text-xs text-neutral-400">(change coming soon)</span></p>
          </div>
          <button onClick={onLogout} className="mt-4 jt-btn text-[11px] sm:text-xs font-semibold border border-ink/15 dark:border-white/15 hover:bg-ink dark:hover:bg-[#ededed] hover:text-paper dark:hover:text-[#0e0e10] px-4 py-2.5 min-h-[44px] rounded-full">Logout</button>
        </section>

        <section className={card}>
          <p className="eyebrow">Appearance</p>
          <h2 className="mt-3 font-display font-bold">Theme</h2>
          <div className="mt-3 flex flex-col sm:flex-row gap-3">
            <ThemeCard
              value="light"
              label="Light"
              preview={<span className="block w-full h-full bg-white"><span className="block h-4 bg-[#0C0C0C]"></span><span className="block m-2 h-3 rounded bg-neutral-200"></span><span className="block mx-2 h-3 w-2/3 rounded bg-neutral-200"></span></span>}
            />
            <ThemeCard
              value="dark"
              label="Dark"
              preview={<span className="block w-full h-full bg-[#0C0C0C]"><span className="block h-4 bg-black"></span><span className="block m-2 h-3 rounded bg-neutral-800"></span><span className="block mx-2 h-3 w-2/3 rounded bg-neutral-800"></span></span>}
            />
          </div>
          <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Charts keep their colors in both themes.</p>
        </section>
      </main>
    </div>
  );
}
