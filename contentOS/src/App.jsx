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
  const [toast, setToast] = useState('');
  const [online, setOnline] = useState(true);

  function say(t) { setToast(t); setTimeout(() => setToast(''), 3000); }
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

  async function load(p = 1, f = filters) {
    setInfo('Loading...');
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
  }

  async function refreshDash() {
    try { const d = await getDashboard(); if (d.total !== undefined) setDash(d); }
    catch (e) { setDash({ total: '-', by_status: {}, by_tempat: {} }); }
  }

  async function handleSave(payload) {
    try {
      const r = await ingestContent(payload);
      say(`Tersimpan jadi ${r.item.id}`);
      setShowForm(false); setEditing(null);
      load(1, filters); refreshDash();
    } catch (e) { say(e.message); }
  }

  async function handleDelete(r) {
    if (!confirm(`Hapus ${r.id}? Ya / Batal`)) return;
    try { await deleteContent(r.id); say(`${r.id} dihapus`); load(page, filters); refreshDash(); }
    catch (e) { say(e.message); }
  }

  async function handleExport() {
    try { await downloadExport(filters); say('content.csv diunduh'); }
    catch (e) { say('Export gagal'); }
  }

  if (!checked) return <p className="p-8 text-sm">Loading...</p>;
  if (!user) return <Auth onAuthed={(t, u) => { saveToken(t); setUser(u); load(1, filters); refreshDash(); say('Login ok'); }} />;
  if (view === 'settings') return <Settings user={user} theme={theme} onTheme={changeTheme} onBack={() => setView('app')} onLogout={() => { clearToken(); setUser(null); setView('app'); }} />;

  return (
    <div>
      <header id="site-navbar" className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-2">
          <p className="font-display font-extrabold text-white">CONTENT<span className="text-accent">OS.</span></p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-white/90 border border-white/15 px-3 py-1.5 rounded-full">{online ? '🟢 Online' : '🔴 Offline'}</span>
            <button onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')} className="text-xs text-white border border-white/25 rounded-full px-3 py-1.5 min-h-[44px]">{theme === 'dark' ? '☀️' : '🌙'}</button>
            <button onClick={() => setView('settings')} className="text-xs text-white border border-white/25 rounded-full px-3 py-1.5 min-h-[44px]">⚙</button>
            <button onClick={() => { clearToken(); setUser(null); }} className="text-xs text-white border border-white/25 rounded-full px-3 py-1.5 min-h-[44px]">Logout</button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <Dashboard dash={dash} onFilter={(f) => { const nf = { q: '', tempat: '', status: '', tipe: '', kategori: '', ...f }; setFilters(nf); load(1, nf); }} />
        <div className="flex gap-2">
          <button onClick={() => { setEditing(null); setShowForm(!showForm); }} className="flex-1 bg-ink dark:bg-[#ededed] text-paper dark:text-black font-bold text-xs uppercase rounded-xl px-4 py-3 min-h-[44px]">+ Ide baru</button>
          <button onClick={handleExport} className="border rounded-xl px-4 py-3 min-h-[44px] text-sm">Export</button>
          <button onClick={() => { setFilters({ q: '', tempat: '', status: '', tipe: '', kategori: '' }); load(1, { q: '', tempat: '', status: '', tipe: '', kategori: '' }); }} className="border rounded-xl px-4 py-3 min-h-[44px] text-sm">Reset</button>
        </div>
        {showForm && <ContentForm initial={editing} onSubmit={handleSave} onCancel={() => { setShowForm(false); setEditing(null); }} />}
        <Board items={items} total={total} page={page} totalPages={totalPages} info={info} filters={filters}
          onFilter={(nf) => { setFilters(nf); load(1, nf); }}
          onPage={(p) => load(p, filters)}
          onEdit={(r) => { setEditing(r); setShowForm(true); window.scrollTo({ top: 0 }); }}
          onDelete={handleDelete} />
      </main>
      {toast && <div className="fixed bottom-4 right-4 bg-ink dark:bg-white text-white dark:text-black text-sm font-semibold px-4 py-3 rounded-xl shadow-lg">{toast}</div>}
    </div>
  );
}
