import { useState } from 'react';
import { useStore } from '../store/AppStore.jsx';
import { AuthFields } from '../components/AuthFields.jsx';
import { SampleLedger } from '../components/SampleLedger.jsx';

const JUDUL = {
  login: ['Masuk', 'Lanjutkan arsip lamaranmu.'],
  daftar: ['Daftar', 'Buat akun, cek kode di email, selesai.'],
  otp: ['Cek email', 'Masukkan 6 digit kode yang kami kirim.'],
  lupa: ['Lupa password', 'Kami kirim kode reset kalau email terdaftar.'],
  reset: ['Password baru', 'Masukkan kode reset dan password baru.'],
  ganti: ['Password baru', 'Tautan dibuka — buat password baru untuk akunmu.'],
};

const TOMBOL = {
  login: 'masuk',
  daftar: 'daftar',
  otp: 'verifikasi kode',
  lupa: 'kirim kode reset',
  reset: 'ganti password',
  ganti: 'simpan password baru',
};

const SWITCH = {
  login: [
    ['Belum punya akun? Daftar', 'daftar'],
    ['Lupa password?', 'lupa'],
  ],
  daftar: [['Sudah punya akun? Masuk', 'login']],
  otp: [['Batal, kembali masuk', 'login']],
  lupa: [['Ingat password? Masuk', 'login']],
  reset: [['Kembali masuk', 'login']],
  ganti: [['Batal, kembali masuk', 'login']],
};

function KotakPesan({ teks, jenis }) {
  if (!teks) return null;
  return (
    <p
      role={jenis === 'error' ? 'alert' : 'status'}
      className={`rounded-[8px] px-3.5 py-2.5 font-sans text-[13px] leading-relaxed border-l-2 ${
        jenis === 'error' ? 'border-stamp bg-stamp/[0.07] text-ink' : 'border-ink bg-ink/[0.06] text-ink'
      }`}
    >
      {teks}
    </p>
  );
}

export function AuthPage({ awal = 'login' }) {
  const { login, register, verify, forgot, reset, selesaikanPulih, keluar } = useStore();
  const [mode, setMode] = useState(awal);
  const [v, setV] = useState({});
  const [pesan, setPesan] = useState(null); // {teks, jenis}
  const [sibuk, setSibuk] = useState(false);

  const set = (k) => (e) => setV((old) => ({ ...old, [k]: e.target.value }));
  const ke = (m) => {
    setMode(m);
    setV({});
    setPesan(null);
  };

  async function kirim(e) {
    e.preventDefault();
    setPesan(null);
    setSibuk(true);
    try {
      if (mode === 'login') {
        await login({ email: v.email, password: v.password });
        // App otomatis pindah ke dashboard (state 'ready').
      } else if (mode === 'daftar') {
        if (v.password !== v.konfirmasi) throw new Error('Konfirmasi password tidak sama');
        const r = await register({
          email: v.email,
          password: v.password,
          password_konfirmasi: v.konfirmasi,
          nama: v.nama || '',
          telepon: v.telepon || '',
        });
        if (r && r.user) return; // langsung aktif + auto-login — App pindah ke dashboard.
        setPesan({ teks: r.message || 'Kode sudah dikirim. Cek email kamu.', jenis: 'ok' });
        setMode('otp');
      } else if (mode === 'otp') {
        await verify({ email: v.email, kode: v.kode });
      } else if (mode === 'lupa') {
        const r = await forgot(v.email);
        // OTP: Supabase mengirim KODE 6 digit lewat email — lanjut ke mode
        // 'reset' (kode + password baru). Email dipertahankan biar gak ketik ulang.
        const email = v.email;
        setMode('reset');
        setV({ email });
        setPesan({ teks: r.message || 'Kode reset dikirim ke email.', jenis: 'ok' });
      } else if (mode === 'reset') {
        await reset({ email: v.email, kode: v.kode, password_baru: v.passwordBaru });
        ke('login');
        setPesan({ teks: 'Password diganti. Silakan masuk.', jenis: 'ok' });
      } else if (mode === 'ganti') {
        // Sesi recovery dari link email sudah terbuka di background.
        if (v.passwordBaru !== v.konfirmasi) throw new Error('Konfirmasi password tidak sama');
        await selesaikanPulih(v.passwordBaru);
        // App otomatis pindah ke dashboard (state 'ready').
      }
    } catch (err) {
      setPesan({ teks: err.message || 'Gagal. Coba lagi.', jenis: 'error' });
    } finally {
      setSibuk(false);
    }
  }

  const [judul, sub] = JUDUL[mode];

  return (
    <div className="min-h-screen bg-white text-ink lg:grid lg:grid-cols-2">
      <main className="px-6 sm:px-10 lg:px-16 py-10 flex flex-col justify-center w-full max-w-[440px] mx-auto lg:mx-0 lg:justify-self-start">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-[2px] w-8 bg-stamp" />
          <span className="font-sans text-[13px] font-medium text-graphite">
            Jobtracker untuk arsip lamaran
          </span>
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="font-display text-[30px] font-extrabold tracking-tight">Jobtracker</span>
        </div>
        <div className="mt-3 h-px bg-ink/10" />

        <h1 className="mt-8 font-display text-[1.9rem] font-bold leading-[1.15] tracking-tight">{judul}</h1>
        <p className="mt-2 mb-7 font-sans text-[13px] leading-relaxed text-graphite">{sub}</p>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-[6px] translate-y-[6px] sm:translate-x-[10px] sm:translate-y-[10px] rounded-[12px] border-2 border-stamp/90"
          />
          <form
            onSubmit={kirim}
            className="relative rounded-[12px] border border-rule bg-white p-6 sm:p-7 space-y-4"
          >
            {pesan && <KotakPesan teks={pesan.teks} jenis={pesan.jenis} />}
            <AuthFields mode={mode} v={v} set={set} />
            <button
              type="submit"
              disabled={sibuk}
              className="w-full rounded-[8px] bg-ink text-white min-h-[48px] py-3 font-sans text-sm font-semibold transition-all duration-200 hover:bg-stamp hover:-translate-y-[1px] hover:shadow-[0_12px_24px_-10px_rgba(215,0,0,.5)] active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none mt-2"
            >
              {sibuk ? 'memproses…' : TOMBOL[mode]}
            </button>
          </form>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-sans text-[13px] text-graphite">
          {SWITCH[mode].map(([teks, m]) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                // Mode ganti (sesi recovery): batal = tutup sesi, bukan pindah tab.
                if (mode === 'ganti') keluar();
                else ke(m);
              }}
              className="underline underline-offset-4 transition-colors hover:text-stamp"
            >
              {teks}
            </button>
          ))}
        </div>

        <p className="mt-10 font-sans text-xs leading-relaxed text-faded">
          Login aktif 24 jam — arsip lamaranmu tetap aman.
        </p>
      </main>

      <SampleLedger />
    </div>
  );
}
