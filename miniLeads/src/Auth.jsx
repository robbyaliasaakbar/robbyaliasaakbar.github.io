// Auth.jsx — layar login Mini Leads (React, pola persis JobTracker: 5 mode).
// Mode: login ↔ register → otp | login ↔ forgot → reset. Sukses → onAuthed(token, user).
// Aturan ketat (frontend): username lowercase 3-20, password besar-DI-AWAL + angka,
// semua field wajib, konfirmasi harus match. Backend tetap jadi jaring pengaman.

import { useState } from 'react';
import Logo from './Logo.jsx';
import { apiLogin, apiRegister, apiVerify, apiForgot, apiReset } from './auth.js';

// Backend ngomong Indonesia → petakan ke English biar page tetap full English.
const EN = {
  'Username sudah dipakai': 'Username is taken.',
  'Email sudah terdaftar, silakan login': 'Email is already registered, please log in.',
  'Format email tidak valid': 'Invalid email format.',
  'Konfirmasi password tidak sama': 'Passwords do not match.',
  'Kode salah atau kedaluwarsa': 'Wrong or expired code.',
  'Username atau password salah': 'Wrong username or password.',
  'Email atau password salah': 'Wrong email or password.',
  'Password minimal 8 karakter': 'Password: min 8 characters.',
  'Password wajib ada huruf besar': 'Password: needs a capital letter.',
  'Password wajib ada angka': 'Password: needs a number.',
  'Username 3-20 karakter: huruf kecil, angka, underscore': 'Username: 3-20 chars, lowercase, numbers, underscore.',
  'Username tidak tersedia': 'Username is not available.',
  'Tanggal lahir format YYYY-MM-DD': 'Birthdate format: YYYY-MM-DD.',
  'Tanggal lahir tidak valid': 'Birthdate is invalid.',
  'Tanggal lahir tidak boleh masa depan': 'Birthdate cannot be in the future.',
  'Kebanyakan request, coba lagi sebentar': 'Too many requests, try again shortly.',
  'Gagal kirim OTP, coba lagi sebentar': 'Failed to send OTP, try again shortly.',
};
const en = (s) => EN[s] || s || 'Something went wrong.';

// Input password + tombol mata (1 komponen buat semua field password).
function PasswordField({ value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="new-password"
        className="w-full px-3 py-2.5 min-h-[44px] pr-11 border border-ink/15 dark:border-white/15 rounded-xl text-sm focus:ring-2 focus:ring-accent focus:border-accent"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        title="Show password"
        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-base"
      >
        {show ? '🙈' : '👁'}
      </button>
    </div>
  );
}

const inputCls = 'w-full px-3 py-2.5 min-h-[44px] border border-ink/15 dark:border-white/15 rounded-xl text-sm focus:ring-2 focus:ring-accent focus:border-accent';
const btnCls = 'btn-primary jt-btn w-full bg-ink dark:bg-[#ededed] text-paper dark:text-[#0e0e10] font-display font-bold text-xs tracking-[0.14em] uppercase rounded-xl px-4 py-3 min-h-[44px] disabled:opacity-40';
const linkCls = 'text-accent font-semibold hover:underline';

// Aturan ketat Mini Leads (lihat roadmap): besar DI AWAL + angka + min 8.
function passwordError(p) {
  if (p.length < 8) return 'Password: min 8 chars, capital letter first, include a number.';
  if (!/^[A-Z]/.test(p)) return 'Password: capital letter must be first.';
  if (!/[0-9]/.test(p)) return 'Password: must include a number.';
  return '';
}

function usernameError(u) {
  if (!/^[a-z0-9_]{3,20}$/.test(u)) return 'Username: 3-20 chars, lowercase, numbers, underscore.';
  if (u === 'root' || u === 'system') return 'Username is not available.';
  return '';
}

export default function Auth({ onAuthed }) {
  const [mode, setMode] = useState('login'); // login | register | otp | forgot | reset
  const [msg, setMsg] = useState({ text: '', error: false });
  const [busy, setBusy] = useState(false);

  // login
  const [liId, setLiId] = useState('');
  const [liPass, setLiPass] = useState('');
  const [liShow, setLiShow] = useState(false);
  // register
  const [rgDepan, setRgDepan] = useState('');
  const [rgBelakang, setRgBelakang] = useState('');
  const [rgEmail, setRgEmail] = useState('');
  const [rgUser, setRgUser] = useState('');
  const [rgTgl, setRgTgl] = useState('');
  const [rgPass, setRgPass] = useState('');
  const [rgPass2, setRgPass2] = useState('');
  // otp / reset (nempel ke email yang didaftarkan)
  const [otpEmail, setOtpEmail] = useState('');
  const [otpKode, setOtpKode] = useState('');
  const [rsKode, setRsKode] = useState('');
  const [rsBaru, setRsBaru] = useState('');
  const [lpEmail, setLpEmail] = useState('');

  function say(text, error = false) {
    setMsg({ text, error });
  }

  function goto(m) {
    setMode(m);
    say('', false);
  }

  function done(token, user) {
    onAuthed(token, user);
  }

  async function doLogin(e) {
    e.preventDefault();
    if (!liId.trim() || !liPass) return say('Fill username/email and password.', true);
    setBusy(true);
    const r = await apiLogin(liId.trim(), liPass);
    setBusy(false);
    if (!r.ok) return say(en(r.data.error), true);
    done(r.data.token, r.data.user);
  }

  async function doRegister(e) {
    e.preventDefault();
    if (!rgDepan.trim() || !rgBelakang.trim()) return say('First and last name are required.', true);
    if (!rgEmail.trim()) return say('Email is required.', true);
    if (!rgTgl) return say('Birthdate is required.', true);
    if (rgTgl > new Date().toISOString().slice(0, 10)) return say('Birthdate cannot be in the future.', true);
    const ue = usernameError(rgUser.trim());
    if (ue) return say(ue, true);
    const pe = passwordError(rgPass);
    if (pe) return say(pe, true);
    if (rgPass !== rgPass2) return say('Passwords do not match.', true);
    setBusy(true);
    const r = await apiRegister({
      email: rgEmail.trim(),
      password: rgPass,
      password_konfirmasi: rgPass2,
      username: rgUser.trim(),
      nama_depan: rgDepan.trim(),
      nama_belakang: rgBelakang.trim(),
      tanggal_lahir: rgTgl,
    });
    setBusy(false);
    if (!r.ok) return say(en(r.data.error) || en(r.data.message), r.status >= 400);
    setOtpEmail(rgEmail.trim());
    say(r.data.message ? en(r.data.message) + ' Check your inbox.' : 'OTP sent. Check your inbox.');
    goto('otp');
    say('OTP sent to ' + rgEmail.trim() + '. Check your inbox.', false);
  }

  async function doVerify(e) {
    e.preventDefault();
    if (!otpKode.trim()) return say('Enter the 6-digit code.', true);
    setBusy(true);
    const r = await apiVerify(otpEmail, otpKode.trim());
    setBusy(false);
    if (!r.ok) return say(en(r.data.error), true);
    done(r.data.token, r.data.user);
  }

  async function doForgot(e) {
    e.preventDefault();
    if (!lpEmail.trim()) return say('Email is required.', true);
    setBusy(true);
    const r = await apiForgot(lpEmail.trim());
    setBusy(false);
    if (!r.ok) return say(en(r.data.error), true);
    setOtpEmail(lpEmail.trim());
    say(en(r.data.message) + '.', false);
    goto('reset');
    say('If the email is registered, an OTP was sent.', false);
  }

  async function doReset(e) {
    e.preventDefault();
    if (!rsKode.trim()) return say('Enter the OTP code.', true);
    const pe = passwordError(rsBaru);
    if (pe) return say(pe, true);
    setBusy(true);
    const r = await apiReset(otpEmail, rsKode.trim(), rsBaru);
    setBusy(false);
    if (!r.ok) return say(en(r.data.error), true);
    say(en(r.data.message) + '. Please log in.', false);
    goto('login');
  }

  const TITLES = {
    login: ['Welcome back', 'Log in with your username or email.'],
    register: ['Create account', 'All fields required. OTP goes to your email.'],
    otp: ['Verify OTP', 'Enter the 6-digit code from your inbox.'],
    forgot: ['Forgot password', 'Reset OTP goes to your email if registered.'],
    reset: ['New password', 'Enter the OTP plus your new password.'],
  };

  return (
    <div className="min-h-screen">
      <header id="site-navbar" className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-3">
          <Logo />
          <span className="inline-flex items-center gap-2 whitespace-nowrap text-[11px] sm:text-xs font-semibold text-white/90 border border-white/15 bg-white/10 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Online
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
        <div className="w-full max-w-md bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-6 sm:p-8">
          <p className="eyebrow">Auth</p>
          <h1 className="mt-3 font-display font-extrabold tracking-tight text-2xl sm:text-3xl">{TITLES[mode][0]}</h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{TITLES[mode][1]}</p>

          {msg.text !== '' && (
            <div className={'mt-4 px-4 py-3 rounded-xl text-sm font-medium ' + (msg.error ? 'bg-accent/10 text-accent' : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300')}>
              {msg.text}
            </div>
          )}

          {mode === 'login' && (
            <form onSubmit={doLogin} className="mt-6 space-y-3">
              <input value={liId} onChange={(e) => setLiId(e.target.value)} placeholder="Username or email" autoComplete="username" className={inputCls} />
              <div className="relative">
                <input type={liShow ? 'text' : 'password'} value={liPass} onChange={(e) => setLiPass(e.target.value)} placeholder="Password" autoComplete="current-password" className={inputCls + ' pr-11'} />
                <button type="button" onClick={() => setLiShow(!liShow)} title="Show password" className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-base">{liShow ? '🙈' : '👁'}</button>
              </div>
              <button disabled={busy} className={btnCls}>Log in</button>
              <div className="flex justify-between text-sm pt-1">
                <button type="button" onClick={() => goto('register')} className={linkCls}>Create account</button>
                <button type="button" onClick={() => goto('forgot')} className="text-neutral-500 dark:text-neutral-400 hover:underline">Forgot password?</button>
              </div>
            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={doRegister} className="mt-6 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input value={rgDepan} onChange={(e) => setRgDepan(e.target.value)} placeholder="First name" autoComplete="given-name" className={inputCls} />
                <input value={rgBelakang} onChange={(e) => setRgBelakang(e.target.value)} placeholder="Last name" autoComplete="family-name" className={inputCls} />
              </div>
              <input value={rgEmail} onChange={(e) => setRgEmail(e.target.value)} type="email" placeholder="Email" autoComplete="email" className={inputCls} />
              <input value={rgUser} onChange={(e) => setRgUser(e.target.value)} placeholder="Username (lowercase, _ allowed)" autoComplete="username" className={inputCls} />
              <input value={rgTgl} onChange={(e) => setRgTgl(e.target.value)} type="date" aria-label="Birthdate" className={inputCls} />
              <PasswordField value={rgPass} onChange={setRgPass} placeholder="Password (capital first + number)" />
              <PasswordField value={rgPass2} onChange={setRgPass2} placeholder="Repeat password" />
              <button disabled={busy} className={btnCls}>Register + Send OTP</button>
              <button type="button" onClick={() => goto('login')} className="w-full text-sm text-neutral-500 dark:text-neutral-400 hover:underline pt-1">Have an account? Log in</button>
            </form>
          )}

          {mode === 'otp' && (
            <form onSubmit={doVerify} className="mt-6 space-y-3">
              <p className="text-sm text-neutral-600 dark:text-neutral-300">6-digit code sent to <b>{otpEmail || '-'}</b>.</p>
              <input value={otpKode} onChange={(e) => setOtpKode(e.target.value)} inputMode="numeric" placeholder="482913" className={inputCls + ' tracking-[0.3em] text-center'} />
              <button disabled={busy} className={btnCls}>Verify</button>
            </form>
          )}

          {mode === 'forgot' && (
            <form onSubmit={doForgot} className="mt-6 space-y-3">
              <input value={lpEmail} onChange={(e) => setLpEmail(e.target.value)} type="email" placeholder="Email" autoComplete="email" className={inputCls} />
              <button disabled={busy} className={btnCls}>Send reset OTP</button>
              <button type="button" onClick={() => goto('login')} className="w-full text-sm text-neutral-500 dark:text-neutral-400 hover:underline pt-1">Back to log in</button>
            </form>
          )}

          {mode === 'reset' && (
            <form onSubmit={doReset} className="mt-6 space-y-3">
              <p className="text-sm text-neutral-600 dark:text-neutral-300">Reset for <b>{otpEmail || '-'}</b>.</p>
              <input value={rsKode} onChange={(e) => setRsKode(e.target.value)} inputMode="numeric" placeholder="OTP code" className={inputCls + ' tracking-[0.3em] text-center'} />
              <PasswordField value={rsBaru} onChange={setRsBaru} placeholder="New password" />
              <button disabled={busy} className={btnCls}>Change password</button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
