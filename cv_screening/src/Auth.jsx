// Auth.jsx — Sign in / Create account / Verify code. Talks only to :7002 (shared exp011).
// Contract (from backend/src/auth.php, not guessed):
// - login: POST /api/login {identifier, password} -> {token, user}
// - register: POST /api/register {nama, email, password, password_konfirmasi} -> 201 {message}
// - verify: POST /api/verify {email, kode} -> {token, user}
// Password rule (server): min 8 chars + one uppercase + one digit.

import { useState } from 'react';
import { apiLogin, apiRegister, apiVerify } from './auth.js';
import Logo from './Logo.jsx';

const inputCls =
  'w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent transition';

// Client rules mirror miniLeads (server stays the safety net).
function usernameError(u) {
  if (!/^[a-z0-9_]{3,20}$/.test(u)) return 'Username: 3-20 chars, lowercase, numbers, underscore.';
  if (u === 'root' || u === 'system') return 'Username is not available.';
  return '';
}

function passwordError(p) {
  if (p.length < 8) return 'Password: min 8 chars, capital letter first, include a number.';
  if (!/^[A-Z]/.test(p)) return 'Password: capital letter must be first.';
  if (!/[0-9]/.test(p)) return 'Password: must include a number.';
  return '';
}

export default function Auth({ onAuthed }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'verify'
  const [identifier, setIdentifier] = useState('');
  const [namaDepan, setNamaDepan] = useState('');
  const [namaBelakang, setNamaBelakang] = useState('');
  const [username, setUsername] = useState('');
  const [tglLahir, setTglLahir] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [kode, setKode] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);

  function switchMode(next) {
    setMode(next);
    setError('');
    setInfo('');
  }

  async function doLogin(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    const r = await apiLogin(identifier.trim(), password);
    setBusy(false);
    if (r.ok && r.data.token) onAuthed(r.data.token, r.data.user || null);
    else setError(r.data.error || 'Sign in failed. Check your details and try again.');
  }

  async function doRegister(e) {
    e.preventDefault();
    setError('');
    if (!namaDepan.trim() || !namaBelakang.trim() || !email.trim() || !username.trim() || !tglLahir || !password || !password2) {
      setError('All fields are required. Fill every column to register.');
      return;
    }
    if (tglLahir > new Date().toISOString().slice(0, 10)) { setError('Birthdate cannot be in the future.'); return; }
    const ue = usernameError(username.trim());
    if (ue) { setError(ue); return; }
    const pe = passwordError(password);
    if (pe) { setError(pe); return; }
    if (password !== password2) { setError('Password confirmation does not match.'); return; }
    setBusy(true);
    const r = await apiRegister({
      email: email.trim(),
      password,
      password_konfirmasi: password2,
      username: username.trim(),
      nama_depan: namaDepan.trim(),
      nama_belakang: namaBelakang.trim(),
      tanggal_lahir: tglLahir,
    });
    setBusy(false);
    if (r.ok) {
      setInfo('Code sent to ' + email.trim() + '. Enter the 6-digit code below.');
      setMode('verify');
    } else {
      setError(r.data.error || 'Registration failed. Try again.');
    }
  }

  async function doVerify(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    const r = await apiVerify(email.trim(), kode.trim());
    setBusy(false);
    if (r.ok && r.data.token) onAuthed(r.data.token, r.data.user || null);
    else setError(r.data.error || 'Invalid or expired code.');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 justify-center">
          <Logo />
          <span className="font-extrabold tracking-tight text-sm">CV SCREENING<span className="text-accent">.</span></span>
        </div>
        <h1 className="mt-6 text-center text-2xl font-extrabold tracking-tight">
          {mode === 'login' ? 'Welcome back.' : mode === 'register' ? 'Create your account.' : 'Check your inbox.'}
        </h1>
        <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-300">
          {mode === 'verify'
            ? 'Enter the 6-digit code we emailed you.'
            : 'One account works across every app on this platform.'}
        </p>

        <div className="card-float border border-black/10 dark:border-white/10 rounded-2xl p-5 mt-6">
          {mode === 'login' && (
            <form onSubmit={doLogin} className="space-y-3">
              <input className={inputCls} placeholder="Username or email" autoComplete="username"
                value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
              <div className="relative">
                <input className={inputCls + ' pr-16'} placeholder="Password" autoComplete="current-password"
                  type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPw((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-2 opacity-70">
                  {showPw ? 'Hide' : 'Show'}
                </button>
              </div>
              <button disabled={busy}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white hover:bg-[#a50000] active:scale-[.98] transition font-bold text-xs tracking-[0.14em] uppercase px-6 py-3 rounded-xl disabled:opacity-50">
                {busy ? 'Signing in...' : 'Sign in'}
              </button>
              <p className="text-center text-xs opacity-70">
                No account yet?{' '}
                <button type="button" onClick={() => switchMode('register')} className="font-bold text-accent">Create one</button>
              </p>
            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={doRegister} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input className={inputCls} placeholder="First name" autoComplete="given-name"
                  value={namaDepan} onChange={(e) => setNamaDepan(e.target.value)} required />
                <input className={inputCls} placeholder="Last name" autoComplete="family-name"
                  value={namaBelakang} onChange={(e) => setNamaBelakang(e.target.value)} required />
              </div>
              <input className={inputCls} placeholder="Email" type="email" autoComplete="email"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input className={inputCls} placeholder="Username (lowercase, _ allowed)" autoComplete="username"
                value={username} onChange={(e) => setUsername(e.target.value)} required />
              <input className={inputCls} type="date" aria-label="Birthdate"
                value={tglLahir} onChange={(e) => setTglLahir(e.target.value)} required />
              <div className="relative">
                <input className={inputCls + ' pr-16'} placeholder="Password (capital first + number)"
                  type={showPw ? 'text' : 'password'} autoComplete="new-password"
                  value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPw((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-2 opacity-70">
                  {showPw ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="relative">
                <input className={inputCls + ' pr-16'} placeholder="Confirm password"
                  type={showPw2 ? 'text' : 'password'} autoComplete="new-password"
                  value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                <button type="button" onClick={() => setShowPw2((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-2 opacity-70">
                  {showPw2 ? 'Hide' : 'Show'}
                </button>
              </div>
              <button disabled={busy}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white hover:bg-[#a50000] active:scale-[.98] transition font-bold text-xs tracking-[0.14em] uppercase px-6 py-3 rounded-xl disabled:opacity-50">
                {busy ? 'Creating...' : 'Create account'}
              </button>
              <p className="text-center text-xs opacity-70">
                Already registered?{' '}
                <button type="button" onClick={() => switchMode('login')} className="font-bold text-accent">Sign in</button>
              </p>
            </form>
          )}

          {mode === 'verify' && (
            <form onSubmit={doVerify} className="space-y-3">
              <input className={inputCls} placeholder="Email" type="email" autoComplete="email"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input className={inputCls + ' text-center tracking-[0.5em] font-mono'} placeholder="••••••"
                inputMode="numeric" maxLength={6} value={kode} onChange={(e) => setKode(e.target.value)} required />
              <button disabled={busy}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white hover:bg-[#a50000] active:scale-[.98] transition font-bold text-xs tracking-[0.14em] uppercase px-6 py-3 rounded-xl disabled:opacity-50">
                {busy ? 'Verifying...' : 'Verify & sign in'}
              </button>
              <p className="text-center text-xs opacity-70">
                Wrong email?{' '}
                <button type="button" onClick={() => switchMode('register')} className="font-bold text-accent">Back to register</button>
              </p>
            </form>
          )}

          {info && <p className="mt-3 text-xs text-emerald-600 dark:text-emerald-300">{info}</p>}
          {error && <p className="mt-3 text-xs text-accent">{error}</p>}
        </div>
      </div>
    </div>
  );
}
