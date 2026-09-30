import { useEffect, useState } from 'react';
import { useStore } from '../store/AppStore.jsx';
import { Field, Input, PasswordInput } from '../components/ui.jsx';
import { cekPassword, isEmail, perbaruiUser, profilSaya, simpanProfile } from '../api/auth.js';

const POLA_USERNAME = '[A-Za-z0-9_.]+';

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

const kartuClass = 'rounded-[12px] border border-rule bg-white p-5 sm:p-6 space-y-4';

function Kartu({ judul, deskripsi, children }) {
  return (
    <section className={kartuClass}>
      <div>
        <h2 className="font-display text-lg font-bold tracking-tight">{judul}</h2>
        {deskripsi && <p className="mt-1 font-sans text-[13px] leading-relaxed text-graphite">{deskripsi}</p>}
      </div>
      {children}
    </section>
  );
}

function NilaiSaatIni({ label, nilai }) {
  return (
    <p className="font-sans text-[13px] text-graphite">
      {label} <span className="font-medium text-ink">{nilai || '—'}</span>
    </p>
  );
}

// Gerbang konfirmasi: pemilik akun memasukkan password sekarang, baru form
// aksi (children) dirender. Dipakai bersama oleh ganti username, password,
// dan email. Lebih andal daripada OTP email (instan, tanpa expiry).
function GerbangKonfirmasi({ email, children }) {
  const [lolos, setLolos] = useState(false);
  const [password, setPassword] = useState('');
  const [pesan, setPesan] = useState(null);
  const [sibuk, setSibuk] = useState(false);

  async function verifikasi(e) {
    e.preventDefault();
    setPesan(null);
    setSibuk(true);
    try {
      await cekPassword({ email, password });
      setLolos(true);
      setPassword('');
    } catch (err) {
      const mentah = err.message || '';
      setPesan({
        teks: /invalid|credentials|salah/i.test(mentah)
          ? 'Password salah. Coba lagi.'
          : mentah || 'Verifikasi gagal. Coba lagi.',
        jenis: 'error',
      });
    } finally {
      setSibuk(false);
    }
  }

  if (lolos) return children;

  return (
    <form onSubmit={verifikasi} className="space-y-4">
      <KotakPesan
        teks={pesan ? pesan.teks : 'Aksi ini sensitif — masukkan password kamu dulu buat konfirmasi.'}
        jenis={pesan ? pesan.jenis : 'ok'}
      />
      <div className="max-w-sm">
        <Field label="password sekarang" wajib>
          <PasswordInput
            aria-label="password sekarang"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            autoFocus
            required
          />
        </Field>
      </div>
      <button
        type="submit"
        disabled={sibuk || !password}
        className="rounded-[8px] bg-ink text-white px-4 py-2.5 min-h-[44px] font-sans text-sm font-semibold transition-all duration-200 hover:bg-stamp hover:-translate-y-[1px] hover:shadow-[0_12px_24px_-10px_rgba(215,0,0,.5)] active:translate-y-0 disabled:opacity-50"
      >
        {sibuk ? 'memeriksa…' : 'konfirmasi'}
      </button>
    </form>
  );
}

function KartuNama({ user, simpan }) {
  const [nama, setNama] = useState(user.nama || '');
  const [sibuk, setSibuk] = useState(false);
  const [pesan, setPesan] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setPesan(null);
    setSibuk(true);
    try {
      await simpan.nama(nama);
      setPesan({ teks: 'Nama diperbarui.', jenis: 'ok' });
    } catch (err) {
      setPesan({ teks: err.message || 'Gagal menyimpan.', jenis: 'error' });
    } finally {
      setSibuk(false);
    }
  }

  return (
    <Kartu judul="Nama" deskripsi="Nama tampilan akunmu.">
      <NilaiSaatIni label="sekarang:" nilai={user.nama} />
      <form onSubmit={submit} className="space-y-4">
        <KotakPesan teks={pesan?.teks} jenis={pesan?.jenis} />
        <div className="max-w-sm">
          <Field label="nama baru">
            <Input value={nama} onChange={(e) => setNama(e.target.value)} autoComplete="name" placeholder="Nama kamu" />
          </Field>
        </div>
        <button
          type="submit"
          disabled={sibuk}
          className="rounded-[8px] bg-ink text-white px-4 py-2.5 min-h-[44px] font-sans text-sm font-semibold transition-all duration-200 hover:bg-stamp hover:-translate-y-[1px] hover:shadow-[0_12px_24px_-10px_rgba(215,0,0,.5)] active:translate-y-0 disabled:opacity-50"
        >
          {sibuk ? 'menyimpan…' : 'simpan nama'}
        </button>
      </form>
    </Kartu>
  );
}

function KartuUsername({ user, profil, setProfil, simpan }) {
  const [username, setUsername] = useState(profil.username || '');
  const [sibuk, setSibuk] = useState(false);
  const [pesan, setPesan] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setPesan(null);
    const bersih = username.trim().toLowerCase();
    if (bersih === (profil.username || '').toLowerCase()) {
      setPesan({ teks: 'Username tidak berubah.', jenis: 'ok' });
      return;
    }
    setSibuk(true);
    try {
      // profiles dulu (unique constraint menjaga duplikat), lalu metadata.
      await simpan.username(bersih);
      setProfil({ ...profil, username: bersih });
      setPesan({ teks: 'Username diganti. Login berikutnya bisa pakai username baru.', jenis: 'ok' });
    } catch (err) {
      const teks = /duplicate key|23505|already/i.test(err.message || '')
        ? 'Username sudah dipakai orang lain. Coba yang lain.'
        : err.message || 'Gagal menyimpan.';
      setPesan({ teks, jenis: 'error' });
    } finally {
      setSibuk(false);
    }
  }

  return (
    <Kartu judul="Username" deskripsi="Dipakai buat login selain email. Harus unik.">
      <NilaiSaatIni label="sekarang:" nilai={profil.username} />
      <GerbangKonfirmasi email={user.email}>
        <form onSubmit={submit} className="space-y-4">
          <KotakPesan teks={pesan?.teks} jenis={pesan?.jenis} />
          <div className="max-w-sm">
            <Field label="username baru" wajib>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                minLength={3}
                pattern={POLA_USERNAME}
                title="Hanya huruf, angka, titik, dan garis bawah"
                placeholder="usernameku"
              />
            </Field>
          </div>
          <button
            type="submit"
            disabled={sibuk}
            className="rounded-[8px] bg-ink text-white px-4 py-2.5 min-h-[44px] font-sans text-sm font-semibold transition-all duration-200 hover:bg-stamp hover:-translate-y-[1px] hover:shadow-[0_12px_24px_-10px_rgba(215,0,0,.5)] active:translate-y-0 disabled:opacity-50"
          >
            {sibuk ? 'menyimpan…' : 'ganti username'}
          </button>
        </form>
      </GerbangKonfirmasi>
    </Kartu>
  );
}

function KartuPassword({ user, simpan }) {
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasi, setKonfirmasi] = useState('');
  const [sibuk, setSibuk] = useState(false);
  const [pesan, setPesan] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setPesan(null);
    if (passwordBaru !== konfirmasi) {
      setPesan({ teks: 'Konfirmasi password tidak sama.', jenis: 'error' });
      return;
    }
    setSibuk(true);
    try {
      await simpan.password(passwordBaru);
      setPasswordBaru('');
      setKonfirmasi('');
      setPesan({ teks: 'Password diganti. Sesi kamu tetap aman.', jenis: 'ok' });
    } catch (err) {
      setPesan({ teks: err.message || 'Gagal mengganti password.', jenis: 'error' });
    } finally {
      setSibuk(false);
    }
  }

  return (
    <Kartu judul="Password" deskripsi="Password baru berlaku untuk login berikutnya.">
      <GerbangKonfirmasi email={user.email}>
        <form onSubmit={submit} className="space-y-4">
          <KotakPesan teks={pesan?.teks} jenis={pesan?.jenis} />
          <div className="max-w-sm space-y-4">
            <Field label="password baru" wajib>
              <PasswordInput
                aria-label="password baru"
                value={passwordBaru}
                onChange={(e) => setPasswordBaru(e.target.value)}
                autoComplete="new-password"
                required
                minLength={8}
              />
            </Field>
            <Field label="ulangi password baru" wajib>
              <PasswordInput
                aria-label="ulangi password baru"
                value={konfirmasi}
                onChange={(e) => setKonfirmasi(e.target.value)}
                autoComplete="new-password"
                required
                minLength={8}
              />
            </Field>
          </div>
          <button
            type="submit"
            disabled={sibuk}
            className="rounded-[8px] bg-ink text-white px-4 py-2.5 min-h-[44px] font-sans text-sm font-semibold transition-all duration-200 hover:bg-stamp hover:-translate-y-[1px] hover:shadow-[0_12px_24px_-10px_rgba(215,0,0,.5)] active:translate-y-0 disabled:opacity-50"
          >
            {sibuk ? 'menyimpan…' : 'ganti password'}
          </button>
        </form>
      </GerbangKonfirmasi>
    </Kartu>
  );
}

function KartuEmail({ user, simpan }) {
  const [emailBaru, setEmailBaru] = useState('');
  const [sibuk, setSibuk] = useState(false);
  const [pesan, setPesan] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setPesan(null);
    if (!isEmail(emailBaru)) {
      setPesan({ teks: 'Format email baru tidak valid.', jenis: 'error' });
      return;
    }
    setSibuk(true);
    try {
      await simpan.email(emailBaru.trim().toLowerCase());
      setEmailBaru('');
      setPesan({ teks: 'Email diganti. Login berikutnya pakai email baru.', jenis: 'ok' });
    } catch (err) {
      setPesan({ teks: err.message || 'Gagal mengganti email.', jenis: 'error' });
    } finally {
      setSibuk(false);
    }
  }

  return (
    <Kartu judul="Email" deskripsi="Email dipakai buat login dan kirim kode OTP.">
      <NilaiSaatIni label="sekarang:" nilai={user.email} />
      <GerbangKonfirmasi email={user.email}>
        <form onSubmit={submit} className="space-y-4">
          <KotakPesan teks={pesan?.teks} jenis={pesan?.jenis} />
          <div className="max-w-sm">
            <Field label="email baru" wajib>
              <Input
                type="email"
                value={emailBaru}
                onChange={(e) => setEmailBaru(e.target.value)}
                autoComplete="email"
                required
                placeholder="nama@contoh.id"
              />
            </Field>
          </div>
          <button
            type="submit"
            disabled={sibuk}
            className="rounded-[8px] bg-ink text-white px-4 py-2.5 min-h-[44px] font-sans text-sm font-semibold transition-all duration-200 hover:bg-stamp hover:-translate-y-[1px] hover:shadow-[0_12px_24px_-10px_rgba(215,0,0,.5)] active:translate-y-0 disabled:opacity-50"
          >
            {sibuk ? 'menyimpan…' : 'ganti email'}
          </button>
        </form>
      </GerbangKonfirmasi>
    </Kartu>
  );
}

export function SettingsPage({ onKembali }) {
  const { state, toast, perbaruiUser: setdiStore } = useStore();
  const user = state.user || { email: '', nama: '' };
  const [profil, setProfil] = useState({ username: '', nama: '', telepon: '' });

  // Muat baris profiles milik sendiri (username sekarang).
  useEffect(() => {
    let hidup = true;
    profilSaya(user.email)
      .then((row) => {
        if (hidup && row) setProfil({ username: row.username || '', nama: row.nama || '', telepon: row.telepon || '' });
      })
      .catch(() => {
        /* row kosong / RLS: form tetap bisa dipakai, guard tetap jalan */
      });
    return () => {
      hidup = false;
    };
  }, []);

  // Simpan metadata lengkap: GoTrue menimpa user_metadata, bukan merge.
  async function simpanMetadata({ username, nama }) {
    const next = await perbaruiUser({
      data: {
        username: username ?? (profil.username || ''),
        nama: nama ?? (user.nama || ''),
        telepon: profil.telepon || '',
      },
    });
    setdiStore(next);
    return next;
  }

  const simpan = {
    nama: async (nama) => {
      await simpanMetadata({ nama });
      toast('Nama diperbarui.');
    },
    username: async (username) => {
      const row = await simpanProfile({ emailKunci: user.email, patch: { username } });
      setProfil({ ...profil, username: row.username || username });
      await simpanMetadata({ username: row.username || username });
      toast('Username diganti.');
    },
    password: async (password) => {
      await perbaruiUser({ password });
      toast('Password diganti.');
    },
    email: async (email) => {
      const next = await perbaruiUser({ email, data: { username: profil.username || '', nama: user.nama || '', telepon: profil.telepon || '' } });
      setdiStore(next);
      await simpanProfile({ emailKunci: user.email, patch: { email } }).catch(() => {
        // profiles gagal (mis. policy belum dipasang) — email di auth tetap ganti.
        toast('Email auth diganti, tapi sinkron profil gagal. Kabari admin.', 'error');
      });
      toast('Email diganti.');
    },
  };

  return (
    <div className="min-h-screen bg-white text-ink">
      <header className="sticky top-0 z-30 border-b border-rule bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
          <button
            type="button"
            onClick={onKembali}
            className="inline-flex items-center gap-2 font-sans text-[13px] text-graphite transition-colors hover:text-stamp"
          >
            <span aria-hidden="true">←</span> kembali ke dashboard
          </button>
          <span className="font-display text-xl font-extrabold tracking-tight">Pengaturan</span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-8 space-y-5">
        <KartuNama user={user} simpan={simpan} />
        <KartuUsername user={user} profil={profil} setProfil={setProfil} simpan={simpan} />
        <KartuPassword user={user} simpan={simpan} />
        <KartuEmail user={user} simpan={simpan} />

        <p className="pb-10 font-sans text-xs leading-relaxed text-faded">
          Ganti username, password, dan email dijaga konfirmasi password.
        </p>
      </main>
    </div>
  );
}
