// Settings.jsx — tampil URL + profile + toggle + logout + export info.
import { AUTH_API } from './auth.js';
import { API } from './api.js';

export default function Settings({ user, theme, onTheme, onBack, onLogout }) {
  return (
    <div>
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <button onClick={onBack} className="text-sm font-semibold">← Kembali</button>
        <h1 className="font-display font-extrabold text-2xl">Settings</h1>
        <section className="border rounded-2xl p-4 text-sm space-y-1">
          <p>Username: <b>{user.username}</b></p>
          <p>Email: <b>{user.email}</b></p>
          <p>Role: <b>{user.role}</b></p>
          <p className="text-xs text-neutral-500">AUTH: {AUTH_API}</p>
          <p className="text-xs text-neutral-500">API: {API}</p>
        </section>
        <section className="border rounded-2xl p-4">
          <p className="text-sm font-semibold">Mode</p>
          <div className="mt-2 flex gap-2">
            {['light', 'dark'].map((t) => (
              <button key={t} onClick={() => onTheme(t)} className={'flex-1 border rounded-xl py-3 min-h-[44px] text-sm ' + (theme === t ? 'border-accent ring-2 ring-accent/30' : '')}>{t} {theme === t && '✓'}</button>
            ))}
          </div>
        </section>
        <button onClick={onLogout} className="w-full border rounded-xl py-3 min-h-[44px] text-sm">Logout</button>
      </main>
    </div>
  );
}
