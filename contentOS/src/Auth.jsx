// Auth.jsx — login reuse :7002. Mode: login/register/otp/forgot/reset.
import { useState } from 'react';
import { apiLogin, apiRegister, apiVerify, apiForgot, apiReset } from './auth.js';

const inputCls = 'w-full px-3 py-2.5 min-h-[44px] border border-ink/15 dark:border-white/15 rounded-xl text-sm focus:ring-2 focus:ring-accent focus:border-accent bg-paper dark:bg-[#0e0e10]';
const btnCls = 'w-full bg-ink dark:bg-[#ededed] text-paper dark:text-[#0e0e10] font-display font-bold text-xs tracking-[0.14em] uppercase rounded-xl px-4 py-3 min-h-[44px] disabled:opacity-40';

export default function Auth({ onAuthed }) {
  const [mode, setMode] = useState('login');
  const [msg, setMsg] = useState({ text: '', error: false });
  const [busy, setBusy] = useState(false);
  const [liId, setLiId] = useState('');
  const [liPass, setLiPass] = useState('');
  const [rgNama, setRgNama] = useState('');
  const [rgUser, setRgUser] = useState('');
  const [rgEmail, setRgEmail] = useState('');
  const [rgPass, setRgPass] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [otpKode, setOtpKode] = useState('');
  const [lpEmail, setLpEmail] = useState('');
  const [rsKode, setRsKode] = useState('');
  const [rsBaru, setRsBaru] = useState('');

  function say(text, error = false) { setMsg({ text, error }); }
  function goto(m) { setMode(m); say(''); }
  async function doLogin(e) {
    e.preventDefault();
    if (!liId.trim() || !liPass) return say('Isi identifier + password.', true);
    setBusy(true);
    const r = await apiLogin(liId.trim(), liPass);
    setBusy(false);
    if (r.status === 0) return say('Auth mati, nyalain :7002 dulu', true);
    if (r.status === 429) return say('Kebanyakan coba', true);
    if (!r.ok) return say('Email/password salah', true);
    say('Login ok', false);
    onAuthed(r.data.token, r.data.user);
  }
  async function doRegister(e) {
    e.preventDefault();
    if (!rgNama.trim() || !rgUser.trim() || !rgEmail.trim() || !rgPass) return say('Semua field wajib.', true);
    if (!rgEmail.includes('@')) return say('Email harus ada @.', true);
    setBusy(true);
    // backend auth butuh nama_depan/belakang + username + tanggal_lahir (pola miniLeads)
    const parts = rgNama.trim().split(/\s+/);
    const r = await apiRegister({
      email: rgEmail.trim(), password: rgPass, password_konfirmasi: rgPass,
      username: rgUser.trim().toLowerCase(),
      nama_depan: parts[0] || rgNama.trim(), nama_belakang: parts.slice(1).join(' ') || '-',
      tanggal_lahir: '2000-01-01',
    });
    setBusy(false);
    if (!r.ok) return say(r.data.error || 'Gagal daftar', true);
    setOtpEmail(rgEmail.trim());
    setMode('otp');
    say('OTP terkirim, cek inbox.', false);
  }
  async function doVerify(e) {
    e.preventDefault();
    if (!/^\d{6}$/.test(otpKode.trim())) return say('OTP 6 angka.', true);
    setBusy(true);
    const r = await apiVerify(otpEmail, otpKode.trim());
    setBusy(false);
    if (!r.ok) return say('Kode salah atau expired', true);
    onAuthed(r.data.token, r.data.user);
  }
  async function doForgot(e) {
    e.preventDefault();
    if (!lpEmail.includes('@')) return say('Email harus ada @.', true);
    setBusy(true);
    await apiForgot(lpEmail.trim());
    setBusy(false);
    setOtpEmail(lpEmail.trim());
    setMode('reset');
    say('Kalau email terdaftar, OTP terkirim.', false);
  }
  async function doReset(e) {
    e.preventDefault();
    if (!rsKode.trim() || !rsBaru) return say('Isi kode + password baru.', true);
    setBusy(true);
    const r = await apiReset(otpEmail, rsKode.trim(), rsBaru);
    setBusy(false);
    if (!r.ok) return say('Kode salah atau expired', true);
    setMode('login');
    say('Reset ok, silakan Masuk.', false);
  }

  return (
    <div className="min-h-screen">
      <header id="site-navbar" className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <p className="font-display font-extrabold text-white">CONTENT<span className="text-accent">OS.</span></p>
          <span className="text-[11px] font-semibold text-white/90 border border-white/15 bg-white/10 px-3 py-1.5 rounded-full">ContentOS</span>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8 flex justify-center">
        <div className="w-full max-w-md bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-6">
          <p className="eyebrow">Auth</p>
          <h1 className="mt-2 font-display font-extrabold text-2xl">{mode === 'login' ? 'Masuk' : mode === 'register' ? 'Daftar' : mode === 'otp' ? 'Verifikasi' : mode === 'forgot' ? 'Lupa' : 'Reset'}</h1>
          {msg.text && <div className={'mt-4 px-4 py-3 rounded-xl text-sm ' + (msg.error ? 'bg-accent/10 text-accent' : 'bg-emerald-50 text-emerald-700')}>{msg.text}</div>}
          {mode === 'login' && (
            <form onSubmit={doLogin} className="mt-4 space-y-3">
              <input value={liId} onChange={(e) => setLiId(e.target.value)} placeholder="Username / email" className={inputCls} />
              <input type="password" value={liPass} onChange={(e) => setLiPass(e.target.value)} placeholder="Password" className={inputCls} />
              <button disabled={busy} className={btnCls}>Masuk</button>
              <div className="flex justify-between text-sm">
                <button type="button" onClick={() => goto('register')} className="text-accent font-semibold">Daftar</button>
                <button type="button" onClick={() => goto('forgot')} className="text-neutral-500">Lupa?</button>
              </div>
            </form>
          )}
          {mode === 'register' && (
            <form onSubmit={doRegister} className="mt-4 space-y-3">
              <input value={rgNama} onChange={(e) => setRgNama(e.target.value)} placeholder="Nama" className={inputCls} />
              <input value={rgUser} onChange={(e) => setRgUser(e.target.value)} placeholder="Username" className={inputCls} />
              <input value={rgEmail} onChange={(e) => setRgEmail(e.target.value)} placeholder="Email" className={inputCls} />
              <input type="password" value={rgPass} onChange={(e) => setRgPass(e.target.value)} placeholder="Password min 8" className={inputCls} />
              <button disabled={busy} className={btnCls}>Daftar</button>
              <button type="button" onClick={() => goto('login')} className="w-full text-sm text-neutral-500">Punya akun? Masuk</button>
            </form>
          )}
          {mode === 'otp' && (
            <form onSubmit={doVerify} className="mt-4 space-y-3">
              <p className="text-sm">Kode ke <b>{otpEmail}</b></p>
              <input value={otpKode} onChange={(e) => setOtpKode(e.target.value)} placeholder="6-digit" className={inputCls + ' text-center tracking-[0.3em]'} />
              <button disabled={busy} className={btnCls}>Verifikasi</button>
            </form>
          )}
          {mode === 'forgot' && (
            <form onSubmit={doForgot} className="mt-4 space-y-3">
              <input value={lpEmail} onChange={(e) => setLpEmail(e.target.value)} placeholder="Email" className={inputCls} />
              <button disabled={busy} className={btnCls}>Kirim OTP</button>
              <button type="button" onClick={() => goto('login')} className="w-full text-sm text-neutral-500">Kembali</button>
            </form>
          )}
          {mode === 'reset' && (
            <form onSubmit={doReset} className="mt-4 space-y-3">
              <input value={rsKode} onChange={(e) => setRsKode(e.target.value)} placeholder="Kode OTP" className={inputCls + ' text-center tracking-[0.3em]'} />
              <input type="password" value={rsBaru} onChange={(e) => setRsBaru(e.target.value)} placeholder="Password baru" className={inputCls} />
              <button disabled={busy} className={btnCls}>Reset</button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
