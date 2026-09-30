import { Field, Input, PasswordInput } from './ui.jsx';

// Isian form login per mode. v = nilai form induk, set = pembuat handler.

export function AuthFields({ mode, v, set }) {
  if (mode === 'login' || mode === 'daftar') {
    return (
      <>
        {mode === 'daftar' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="nama">
              <Input value={v.nama || ''} onChange={set('nama')} autoComplete="name" />
            </Field>
            <Field label="telepon">
              <Input value={v.telepon || ''} onChange={set('telepon')} autoComplete="tel" />
            </Field>
          </div>
        )}
        {mode === 'daftar' && (
          <Field label="username" wajib>
            <Input
              value={v.username || ''}
              onChange={set('username')}
              autoComplete="username"
              required
              minLength={3}
              pattern="[A-Za-z0-9_.]+"
              title="Hanya huruf, angka, titik, dan garis bawah"
              placeholder="usernameku"
            />
          </Field>
        )}
        <Field label={mode === 'login' ? 'email atau username' : 'email'} wajib>
          <Input
            type={mode === 'login' ? 'text' : 'email'}
            value={v.email || ''}
            onChange={set('email')}
            autoComplete={mode === 'login' ? 'username' : 'email'}
            required
            placeholder={mode === 'login' ? 'nama@contoh.id atau username' : 'nama@contoh.id'}
          />
        </Field>
        <Field label="password" wajib>
          <PasswordInput
            aria-label="password"
            value={v.password || ''}
            onChange={set('password')}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            required
            minLength={8}
          />
        </Field>
        {mode === 'daftar' && (
          <Field label="ulangi password" wajib>
            <PasswordInput
              aria-label="ulangi password"
              value={v.konfirmasi || ''}
              onChange={set('konfirmasi')}
              autoComplete="new-password"
              required
              minLength={8}
            />
          </Field>
        )}
      </>
    );
  }

  if (mode === 'ganti') {
    // Link recovery: sesi sudah ada, tinggal buat password baru.
    return (
      <>
        <Field label="password baru" wajib>
          <Input
            type="password"
            value={v.passwordBaru || ''}
            onChange={set('passwordBaru')}
            autoComplete="new-password"
            autoFocus
            required
            minLength={8}
          />
        </Field>
        <Field label="ulangi password" wajib>
          <Input
            type="password"
            value={v.konfirmasi || ''}
            onChange={set('konfirmasi')}
            autoComplete="new-password"
            required
            minLength={8}
          />
        </Field>
      </>
    );
  }

  if (mode === 'otp' || mode === 'reset') {
    return (
      <>
        {mode === 'reset' && (
          <Field label="email" wajib>
            <Input type="email" value={v.email || ''} onChange={set('email')} required />
          </Field>
        )}
        <Field label="kode dari email" wajib>
          <Input
            value={v.kode || ''}
            onChange={set('kode')}
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            placeholder="123456"
          />
        </Field>
        {mode === 'reset' && (
          <Field label="password baru" wajib>
            <Input
              type="password"
              value={v.passwordBaru || ''}
              onChange={set('passwordBaru')}
              autoComplete="new-password"
              required
              minLength={8}
            />
          </Field>
        )}
      </>
    );
  }

  // lupa
  return (
    <Field label="email terdaftar" wajib>
      <Input type="email" value={v.email || ''} onChange={set('email')} required />
    </Field>
  );
}
