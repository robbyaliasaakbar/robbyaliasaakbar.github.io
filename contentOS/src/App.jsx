// App.jsx — pegang user + routing Auth/Board/Settings, jangan fetch langsung (via api.js/auth.js).
import { useEffect, useState } from 'react';
import { getToken, saveToken, clearToken, apiMe } from './auth.js';
import { getContent, ingestContent, deleteContent, getDashboard, downloadExport } from './api.js';
import { getTheme, saveTheme, applyTheme } from './theme.js';
import Auth from './Auth.jsx';
import Board from './Board.jsx';
import ContentForm from './ContentForm.jsx';
import Dashboard from './Dashboard.jsx';
import Settings from './Settings.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const [theme, setTheme] = useState(() => getTheme());
  const [view, setView] = useState('app');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [info, setInfo] = useState('Loading...');
  const [dash, setDash] = useState({ total: '-', by_status: {}, by_tempat: {} });
  const [filters, setFilters] = useState({ q: '', tempat: '', status: '', tipe: '', kategori: '' });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState({ text: '', kind: 'ok' });
  const [online, setOnline] = useState(true);
  const [loading, setLoading] = useState(false); // skeleton shimmer pas fetch
  const [menuOpen, setMenuOpen] = useState(false); // hamburger khusus mobile

  function say(t, kind = 'ok') { setToast({ text: t, kind }); setTimeout(() => setToast({ text: '', kind: 'ok' }), 3000); }
  function changeTheme(t) { setTheme(t); saveTheme(t); applyTheme(t); }

  async function checkAuth() {
    const t = getToken();
    if (!t) { setChecked(true); return; }
    const me = await apiMe(t);
    if (me.ok) { setUser(me.data); load(1, filters); refreshDash(); }
    else { clearToken(); }
    setChecked(true);
  }
  useEffect(() => { checkAuth(); }, []);

  // Rasa realtime: dashboard + chart refresh sendiri tiap 30 detik (tanpa ubah backend).
  useEffect(() => {
    const id = setInterval(() => { if (getToken()) refreshDash(); }, 30000);
    return () => clearInterval(id);
  }, []);

  async function load(p = 1, f = filters) {
    setInfo('Loading...');
    setLoading(true);
    try {
      const j = await getContent({ ...f, page: p, limit: 20 });
      if (!j.data) {
        if (j.error?.includes('Auth')) { setOnline(false); setDash({ total: '-', by_status: {}, by_tempat: {} }); setInfo('Server off 08.00-21.00'); return; }
        setInfo(j.error || 'Gagal load'); return;
      }
      setOnline(true);
      setItems(j.data); setTotal(j.total); setPage(j.page); setTotalPages(j.totalPages);
      setInfo(`Showing ${j.count} of ${j.total}`);
    } catch (e) { setOnline(false); setInfo('Server off 08.00-21.00'); }
    finally { setLoading(false); }
  }

  async function refreshDash() {
    try { const d = await getDashboard(); if (d.total !== undefined) setDash(d); }
    catch (e) { setDash({ total: '-', by_status: {}, by_tempat: {} }); }
  }

  async function handleSave(payload) {
    try {
      const r = await ingestContent(payload);
      say(`Tersimpan jadi ${r.item.id}`, 'ok');
      setShowForm(false); setEditing(null);
      load(1, filters); refreshDash();
    } catch (e) { say(e.message, 'error'); }
  }

  async function handleDelete(r) {
    if (!confirm(`Hapus ${r.id}? Ya / Batal`)) return;
    try { await deleteContent(r.id); say(`${r.id} dihapus`, 'ok'); load(page, filters); refreshDash(); }
    catch (e) { say(e.message, 'error'); }
  }

  async function handleExport() {
    try { await downloadExport(filters); say('content.csv diunduh', 'ok'); }
    catch (e) { say('Export gagal', 'error'); }
  }

  if (!checked) return <p className="p-8 text-sm">Loading...</p>;
  if (!user) return <Auth onAuthed={(t, u) => { saveToken(t); setUser(u); load(1, filters); refreshDash(); say('Login ok'); }} />;
  if (view === 'settings') return <Settings user={user} theme={theme} onTheme={changeTheme} onBack={() => setView('app')} onLogout={() => { clearToken(); setUser(null); setView('app'); }} />;

  return (
    <div>
      <header id="site-navbar" className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-2">
          <p className="font-display font-extrabold text-white">CONTENT<span className="text-accent">OS.</span></p>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-2 whitespace-nowrap text-[11px] font-semibold text-white/90 border border-white/15 px-3 py-1.5 rounded-full">{online ? '🟢 Online' : '🔴 Offline'}</span>
            {/* Desktop: tombol teks biasa */}
            <div className="hidden sm:flex items-center gap-2">
              <button onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')} title="Ganti tema" className="press whitespace-nowrap text-xs text-white border border-white/25 hover:bg-white/10 rounded-full px-3 py-1.5 min-h-[44px]">{theme === 'dark' ? '☀️ Light' : '🌙 Dark'}</button>
              <button onClick={() => setView('settings')} title="Settings" className="press whitespace-nowrap text-xs text-white border border-white/25 hover:bg-white/10 rounded-full px-3 py-1.5 min-h-[44px]">⚙ Settings</button>
              <button onClick={() => { clearToken(); setUser(null); setMenuOpen(false); }} title="Log out" className="press whitespace-nowrap text-xs text-white border border-white/25 hover:bg-white/10 rounded-full px-3 py-1.5 min-h-[44px]">Logout</button>
            </div>
            {/* Mobile: cukup garis tiga. Online tetap di luar menu. */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              className="sm:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 border border-white/25 rounded-full"
            >
              <span className={'block w-5 h-0.5 bg-white transition-transform ' + (menuOpen ? 'translate-y-[7px] rotate-45' : '')}></span>
              <span className={'block w-5 h-0.5 bg-white transition-opacity ' + (menuOpen ? 'opacity-0' : '')}></span>
              <span className={'block w-5 h-0.5 bg-white transition-transform ' + (menuOpen ? '-translate-y-[7px] -rotate-45' : '')}></span>
            </button>
          </div>
        </div>
        {/* Panel menu mobile (nempel di bawah navbar) */}
        {menuOpen && (
          <div className="sm:hidden border-t border-white/10 px-4 py-2 space-y-1 bg-[#0C0C0C]">
            <button
              onClick={() => { changeTheme(theme === 'dark' ? 'light' : 'dark'); }}
              className="w-full text-left text-sm font-semibold text-white/90 hover:bg-white/10 rounded-xl transition px-2 py-3 min-h-[44px]"
            >
              {theme === 'dark' ? '☀️ Mode terang' : '🌙 Mode gelap'}
            </button>
            <button
              onClick={() => { setMenuOpen(false); setView('settings'); }}
              className="w-full text-left text-sm font-semibold text-white/90 hover:bg-white/10 rounded-xl transition px-2 py-3 min-h-[44px]"
            >
              ⚙ Settings
            </button>
            <button
              onClick={() => { clearToken(); setUser(null); setMenuOpen(false); }}
              className="w-full text-left text-sm font-semibold text-white/90 hover:bg-white/10 rounded-xl transition px-2 py-3 min-h-[44px]"
            >
              Logout
            </button>
          </div>
        )}
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <div className="relative">
          <div className="absolute inset-0 bg-grid" aria-hidden="true"></div>
          <div className="relative">
            <p className="eyebrow">Kalender Konten Pribadi</p>
            <h1 className="mt-3 font-display font-extrabold tracking-tight text-3xl sm:text-4xl">ContentOS</h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl">Catat ide, atur jadwal posting IG, LinkedIn, Reddit dan WA, lalu pantau statusnya sampai naik. Ngedit dan posting tetap manual, app ini cuma papan tracking.</p>
          </div>
        </div>
        <Dashboard dash={dash} theme={theme} filters={filters} onFilter={(f) => { const nf = { q: '', tempat: '', status: '', tipe: '', kategori: '', ...filters, ...f }; setFilters(nf); load(1, nf); }} />
        <div className="flex gap-2">
          <button onClick={() => { setEditing(null); setShowForm(!showForm); }} className="btn-primary flex-1 bg-ink dark:bg-[#ededed] text-paper dark:text-black font-bold text-xs uppercase rounded-xl px-4 py-3 min-h-[44px]">+ Ide baru</button>
          <button onClick={handleExport} className="press border border-ink/15 dark:border-white/15 hover:border-black dark:hover:border-white rounded-xl px-4 py-3 min-h-[44px] text-sm">Export</button>
          <button onClick={() => { setFilters({ q: '', tempat: '', status: '', tipe: '', kategori: '' }); load(1, { q: '', tempat: '', status: '', tipe: '', kategori: '' }); }} className="press border border-ink/15 dark:border-white/15 hover:border-black dark:hover:border-white rounded-xl px-4 py-3 min-h-[44px] text-sm">Reset</button>
        </div>
        {showForm && <ContentForm initial={editing} onSubmit={handleSave} onCancel={() => { setShowForm(false); setEditing(null); }} />}
        <Board items={items} total={total} page={page} totalPages={totalPages} info={info} loading={loading} filters={filters}
          onFilter={(nf) => { setFilters(nf); load(1, nf); }}
          onPage={(p) => load(p, filters)}
          onEdit={(r) => { setEditing(r); setShowForm(true); window.scrollTo({ top: 0 }); }}
          onDelete={handleDelete}
          onAdd={() => { setEditing(null); setShowForm(true); window.scrollTo({ top: 0 }); }} />
        <footer className="bg-dark-section text-white dark:text-[#0e0e10] mt-6 rounded-2xl">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-display font-extrabold tracking-tight text-sm">CONTENT<span className="text-accent">OS.</span></p>
            <p className="text-xs text-white/60 dark:text-black/60">© 2026 ContentOS — Kalender Konten Pribadi</p>
          </div>
        </footer>
      </main>
      {toast.text && <div className={'fixed bottom-4 right-4 text-sm font-semibold px-4 py-3 rounded-xl shadow-lg fade-in ' + (toast.kind === 'error' ? 'bg-accent text-white' : toast.kind === 'warn' ? 'bg-amber-400 text-black' : 'bg-emerald-600 text-white')}>{toast.text}</div>}
    </div>
  );
}
