// App.jsx — Screen state lives here (token + user + files + payload + page).
// Rule (locked by Bang Rob): sign-in is REQUIRED to use this app. No public screening.
// Pattern: form -> store -> render. No router library: three local pages are enough.

import { useEffect, useState } from 'react';
import Upload from './Upload.jsx';
import Extract from './Extract.jsx';
import Realtime from './Realtime.jsx';
import Navbar from './Navbar.jsx';
import Settings from './Settings.jsx';
import Auth from './Auth.jsx';
import { getToken, saveToken, clearToken, apiMe } from './auth.js';

export default function App() {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [files, setFiles] = useState([]); // queue: [{file, id: cv_1..}]
  const [payload, setPayload] = useState([]); // extracted: [{id, filename, size_kb, page_count, text, uploaded_at}]
  const [page, setPage] = useState('home'); // 'home' | 'settings'
  const [flash, setFlash] = useState('');

  // Validate a saved token once on load. Dead token = back to sign-in.
  useEffect(() => {
    let alive = true;
    (async () => {
      if (!token) { setChecking(false); return; }
      const r = await apiMe(token);
      if (!alive) return;
      if (r.ok) setUser(r.data.user || r.data || null);
      else { clearToken(); setToken(''); }
      setChecking(false);
    })();
    return () => { alive = false; };
  }, []);

  function handleAuthed(t, u) {
    saveToken(t);
    setToken(t);
    setUser(u || null);
    setPage('home');
    setFlash('');
  }

  function handleLogout() {
    clearToken();
    setToken('');
    setUser(null);
    setFiles([]);
    setPayload([]);
    setPage('home');
    setFlash('');
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm opacity-70">Loading...</p>
      </div>
    );
  }

  if (!token) return <Auth onAuthed={handleAuthed} />;

  return (
    <div className="min-h-screen">
      <Navbar page={page} onGo={(p) => { setFlash(''); setPage(p); }} onLogout={handleLogout} />

      {page === 'home' ? (
        <>
          <header className="mx-auto max-w-3xl px-4 sm:px-6 pt-24">
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-accent">
              CV Screening Platform
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
              Screen 1–5 CVs in seconds.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Upload PDF resumes, extract text automatically and receive a ranked shortlist.
              Sign in keeps every screening tied to your account. Files are read in your browser and never stored on a server.
            </p>
            {flash && <p className="mt-3 text-xs opacity-70">{flash}</p>}
          </header>

          <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-4">
            <Upload files={files} setFiles={setFiles} />
            <Extract files={files} payload={payload} setPayload={setPayload} />
            <Realtime payload={payload} />

            <div className="grid sm:grid-cols-3 gap-3">
              <div className="card-float border border-black/10 dark:border-white/10 rounded-2xl p-4">
                <p className="font-bold text-xs tracking-[0.12em] uppercase">01. Upload</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">Add 1–5 PDFs at once or one by one. Remove any file before screening.</p>
              </div>
              <div className="card-float border border-black/10 dark:border-white/10 rounded-2xl p-4">
                <p className="font-bold text-xs tracking-[0.12em] uppercase">02. Extract</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">Text is read in your browser and packaged as structured JSON.</p>
              </div>
              <div className="card-float border border-black/10 dark:border-white/10 rounded-2xl p-4">
                <p className="font-bold text-xs tracking-[0.12em] uppercase">03. Rank</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">Submitted for scoring and returned as an ordered shortlist.</p>
              </div>
            </div>
          </main>
        </>
      ) : (
        <main className="mx-auto max-w-3xl px-4 sm:px-6 pt-24 pb-8">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-accent">Settings</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">Account & appearance.</h1>
          {flash && <p className="mt-3 text-xs opacity-70">{flash}</p>}
          <div className="mt-6">
            <Settings user={user} token={token} onUser={setUser} />
          </div>
        </main>
      )}

      <footer className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 text-center">
          <p className="text-xs opacity-70">© 2026 CV Screening</p>
        </div>
      </footer>
    </div>
  );
}
