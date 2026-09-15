// Settings.jsx — Account (real, via :7002) + Appearance (live theme).
// Profile: PUT /api/me {nama, username}. Password: forgot OTP -> reset (10 min window).

import { useState } from 'react';
import { getTheme, saveTheme } from './theme.js';
import { apiUpdateProfile, apiForgot, apiReset } from './auth.js';

const inputCls =
  'w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent transition';

export default function Settings({ user, token, onUser }) {
  const [theme, setTheme] = useState(getTheme());

  // Profile form (prefilled from :7002).
  const [nama, setNama] = useState(user?.nama || '');
  const [username, setUsername] = useState(user?.username || '');
  const [pPesan, setPPesan] = useState({ text: '', ok: false });
  const [pBusy, setPBusy] = useState(false);

  // Password form: step 1 kirim OTP, step 2 tukar kode + password baru.
  const [otpTerkirim, setOtpTerkirim] = useState(false);
  const [kode, setKode] = useState('');
  const [baru1, setBaru1] = useState('');
  const [baru2, setBaru2] = useState('');
  const [wPesan, setWPesan] = useState({ text: '', ok: false });
  const [wBusy, setWBusy] = useState(false);

  function pick(next) {
    setTheme(next);
    saveTheme(next);
  }

  async function saveProfile(e) {
    e.preventDefault();
    setPPesan({ text: '', ok: false });
    if (!nama.trim()) { setPPesan({ text: 'Full name is required.', ok: false }); return; }
    setPBusy(true);
    const r = await apiUpdateProfile(token, { nama: nama.trim(), username: username.trim() });
    setPBusy(false);
    if (r.ok) {
      onUser({ ...(user || {}), nama: r.data.nama ?? nama.trim(), username: r.data.username ?? username.trim() });
      setPPesan({ text: 'Profile saved.', ok: true });
    } else {
      setPPesan({ text: r.data.error || 'Could not save profile.', ok: false });
    }
  }

  async function sendOtp() {
    setWPesan({ text: '', ok: false });
    setWBusy(true);
    const r = await apiForgot(user?.email || '');
    setWBusy(false);
    // Backend answers generic either way (anti email-harvest). Same words here.
    setOtpTerkirim(true);
    setWPesan({ text: r.data.message || 'If the email is registered, an OTP was sent.', ok: true });
  }

  async function changePassword(e) {
    e.preventDefault();
    setWPesan({ text: '', ok: false });
    if (baru1 !== baru2) { setWPesan({ text: 'New passwords do not match.', ok: false }); return; }
    setWBusy(true);
    const r = await apiReset(user?.email || '', kode.trim(), baru1);
    setWBusy(false);
    if (r.ok) {
      setKode('');
      setBaru1('');
      setBaru2('');
      setOtpTerkirim(false);
      setWPesan({ text: 'Password changed. Other sessions were signed out.', ok: true });
    } else {
      setWPesan({ text: r.data.error || 'Could not change password.', ok: false });
    }
  }

  return (
    <div className="space-y-4">
      <div className="card-float border border-black/10 dark:border-white/10 rounded-2xl p-5">
        <p className="text-xs font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400">Profile</p>
        <form onSubmit={saveProfile} className="mt-3 space-y-3">
          <div>
            <p className="text-xs opacity-70 mb-1.5">Email (cannot be changed)</p>
            <p className="text-sm font-mono font-bold break-all">{user?.email || '-'}</p>
          </div>
          <input className={inputCls} placeholder="Full name" autoComplete="name"
            value={nama} onChange={(e) => setNama(e.target.value)} required />
          <input className={inputCls} placeholder="Username (lowercase, _ allowed)" autoComplete="username"
            value={username} onChange={(e) => setUsername(e.target.value)} />
          <button disabled={pBusy}
            className="inline-flex items-center justify-center gap-2 bg-accent text-white hover:bg-[#a50000] active:scale-[.98] transition font-bold text-xs tracking-[0.14em] uppercase px-6 py-3 rounded-xl disabled:opacity-50">
            {pBusy ? 'Saving...' : 'Save profile'}
          </button>
          {pPesan.text && (
            <p className={'text-xs ' + (pPesan.ok ? 'text-emerald-600 dark:text-emerald-300' : 'text-accent')}>{pPesan.text}</p>
          )}
        </form>
      </div>

      <div className="card-float border border-black/10 dark:border-white/10 rounded-2xl p-5">
        <p className="text-xs font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400">Change password</p>
        {!otpTerkirim ? (
          <div className="mt-3">
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              We email a reset code first. Changing it signs out your other sessions.
            </p>
            <button onClick={sendOtp} disabled={wBusy}
              className="mt-3 inline-flex items-center justify-center gap-2 border border-black/10 dark:border-white/10 rounded-xl px-5 py-2.5 text-sm font-medium transition hover:bg-accent hover:border-accent hover:text-white disabled:opacity-50">
              {wBusy ? 'Sending...' : 'Send reset code'}
            </button>
          </div>
        ) : (
          <form onSubmit={changePassword} className="mt-3 space-y-3">
            <input className={inputCls + ' text-center tracking-[0.5em] font-mono'} placeholder="••••••"
              inputMode="numeric" maxLength={6} value={kode} onChange={(e) => setKode(e.target.value)} required />
            <input className={inputCls} placeholder="New password (min 8, one uppercase, one digit)"
              type="password" autoComplete="new-password"
              value={baru1} onChange={(e) => setBaru1(e.target.value)} required />
            <input className={inputCls} placeholder="Repeat new password" type="password" autoComplete="new-password"
              value={baru2} onChange={(e) => setBaru2(e.target.value)} required />
            <button disabled={wBusy}
              className="inline-flex items-center justify-center gap-2 bg-accent text-white hover:bg-[#a50000] active:scale-[.98] transition font-bold text-xs tracking-[0.14em] uppercase px-6 py-3 rounded-xl disabled:opacity-50">
              {wBusy ? 'Changing...' : 'Change password'}
            </button>
          </form>
        )}
        {wPesan.text && (
          <p className={'mt-3 text-xs ' + (wPesan.ok ? 'text-emerald-600 dark:text-emerald-300' : 'text-accent')}>{wPesan.text}</p>
        )}
      </div>

      <div className="card-float border border-black/10 dark:border-white/10 rounded-2xl p-5">
        <p className="text-xs font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400">Appearance</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => pick('light')}
            aria-pressed={theme === 'light'}
            className={
              'rounded-xl border px-4 py-3 text-sm font-bold transition ' +
              (theme === 'light'
                ? 'border-accent bg-accent text-white'
                : 'border-black/10 dark:border-white/10 opacity-70 hover:opacity-100 hover:bg-accent hover:border-accent hover:text-white')
            }
          >
            Light
          </button>
          <button
            onClick={() => pick('dark')}
            aria-pressed={theme === 'dark'}
            className={
              'rounded-xl border px-4 py-3 text-sm font-bold transition ' +
              (theme === 'dark'
                ? 'border-accent bg-accent text-white'
                : 'border-black/10 dark:border-white/10 opacity-70 hover:opacity-100 hover:bg-accent hover:border-accent hover:text-white')
            }
          >
            Dark
          </button>
        </div>
        <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-300">Saved on this device. Applied instantly across every page.</p>
      </div>
    </div>
  );
}
