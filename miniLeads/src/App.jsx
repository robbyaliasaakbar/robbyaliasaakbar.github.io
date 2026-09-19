// App.jsx — React simple 1 page (no auth, no router).
// Pola sama kayak vanilla kemarin: Form -> fetch -> render.
// Vanilla: getElementById + innerHTML
// React: useState (kotak data) + useEffect (jalan otomatis) + fetch
// Pagination production: tiap pindah halaman nembak backend lagi (server-side),
// bukan motong di browser. Backend balikin { total, page, limit, totalPages, data }.

import { useEffect, useState } from 'react';
import { getLeads, getDashboard, downloadExport } from './api.js';
import ImportCsv from './ImportCsv.jsx';
import AddLeadForm from './AddLeadForm.jsx';
import StatusChart from './StatusChart.jsx';
import StatusDonut from './StatusDonut.jsx';
import StatusLine from './StatusLine.jsx';
import Logo from './Logo.jsx';
import Auth from './Auth.jsx';
import Settings from './Settings.jsx';
import { getToken, saveToken, clearToken, apiMe } from './auth.js';
import { getTheme, saveTheme, applyTheme } from './theme.js';

// Warna badge per status (nama class sama kayak CSS).
function badgeClass(s) {
  if (s === 'Closed Won') return 'b-ClosedWon';
  if (s === 'Closed Lost') return 'b-ClosedLost';
  return 'b-' + s;
}

export default function App() {
  // Kotak filter (dulu input id=q/status/country/owner di vanilla).
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [country, setCountry] = useState('');
  const [owner, setOwner] = useState('');

  // Kotak data (dulu innerHTML rows + cards di vanilla).
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState('...');
  const [info, setInfo] = useState('Loading...');
  const [dash, setDash] = useState({ total: '...', by_status: {}, by_channel: {} });

  // Pagination server-side: default 20, pilihan 50 / 100. Fokus mobile: tombol gede.
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Auth: null = belum login. Cuma role admin yang boleh masuk (data milik admin).
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Tema + layar. Tema ditempel ke <html> pas lahir biar tidak kedip.
  const [theme, setTheme] = useState(() => { const t = getTheme(); applyTheme(t); return t; });
  const [view, setView] = useState('app'); // app | settings
  const [menuOpen, setMenuOpen] = useState(false); // hamburger khusus mobile

  function changeTheme(t) {
    setTheme(t);
    saveTheme(t);
  }

  // Ambil dashboard (dipanggil pas buka + tiap ada data masuk). Tolak data rusak.
  async function refreshDash() {
    try {
      const d = await getDashboard();
      if (d.total === undefined) return;
      setDash(d);
    } catch (e) {
      setDash({ total: '-', by_status: {}, by_channel: {} });
    }
  }

  // Export CSV (via fetch biar token ikut) → download file.
  async function handleExport() {
    try {
      await downloadExport({ q, status, country, owner });
    } catch (e) {
      setInfo('Export failed.');
    }
  }

  // Satpam: cek token pas buka halaman. Valid → masuk (data difilter backend per user).
  // Data + dashboard BARU diambil kalau lolos (hemat request + tidak bocor ke anonim).
  async function checkAuth() {
    const t = getToken();
    if (!t) { setAuthChecked(true); return; }
    const me = await apiMe(t);
    if (me.ok) {
      setUser(me.data);
      load(1, 20);
      refreshDash();
    } else {
      clearToken();
      setUser(null);
    }
    setAuthChecked(true);
  }

  // Cek sekali pas buka halaman (pengganti load langsung kayak dulu).
  useEffect(() => { checkAuth(); }, []);

  // Ambil leads dari server (dipanggil pas buka + search + pindah halaman + ganti ukuran).
  // statusArg: biar klik chart bisa kirim status baru tanpa nunggu state update.
  // Pengaman: kalau backend jawab error (bukan data) → tampilkan pesan, JANGAN crash.
  async function load(nextPage = 1, nextSize = pageSize, statusArg = status) {
    setInfo('Loading...');
    try {
      const j = await getLeads({ q, status: statusArg, country, owner, page: nextPage, limit: nextSize });
      if (!j.data) {
        setLeads([]);
        setTotal(0);
        setTotalPages(1);
        setInfo(j.error || 'Failed to load leads.');
        return;
      }
      setLeads(j.data);
      setTotal(j.total);
      setPage(j.page);
      setTotalPages(j.totalPages);
      const start = j.count === 0 ? 0 : (j.page - 1) * j.limit + 1;
      const end = (j.page - 1) * j.limit + j.count;
      setInfo(`Showing ${start}-${end} of ${j.total} leads`);
    } catch (e) {
      setInfo('Backend :7005 is down — run node server.js first.');
    }
  }

  // Load pertama + dashboard dipindah ke checkAuth (cuma jalan kalau admin).

  // Tiap ada data masuk (import/manual) → refresh list + kartu.
  function handleDataChanged() {
    load(1);
    refreshDash();
  }

  // Keluar: buang kartu → balik ke layar Auth (view + menu direset).
  function handleLogout() {
    clearToken();
    setUser(null);
    setView('app');
    setMenuOpen(false);
  }

  // 1 fungsi buat semua chart (bar, donat, garis): tap = filter, tap lagi = batal.
  function handleChartSelect(s) {
    const next = s === status ? '' : s;
    setStatus(next);
    load(1, pageSize, next);
  }

  const topChannel = Object.entries(dash.by_channel || {}).sort((a, b) => b[1] - a[1])[0];

  // Belum cek token → splash bentar (biar tidak kedip layar Auth).
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading...</p>
      </div>
    );
  }

  // Belum login / bukan admin → layar Auth.
  if (!user) {
    return <Auth onAuthed={(t, u) => { saveToken(t); setUser(u); load(1, 20); refreshDash(); }} />;
  }

  // Layar Settings (akun + tema).
  if (view === 'settings') {
    return <Settings user={user} theme={theme} onTheme={changeTheme} onBack={() => setView('app')} onLogout={handleLogout} />;
  }

  return (
    <div>
      <header id="site-navbar" className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-3">
          <Logo />
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-2 whitespace-nowrap text-[11px] sm:text-xs font-semibold text-white/90 border border-white/15 bg-white/10 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Online
            </span>
            {/* Desktop: tombol teks biasa */}
            <div className="hidden sm:flex items-center gap-2">
              <button onClick={() => setView('settings')} title="Settings" className="jt-btn whitespace-nowrap text-xs font-semibold text-white/90 border border-white/25 hover:bg-paper dark:bg-[#0e0e10] hover:text-ink px-3 py-1.5 rounded-full">⚙ Settings</button>
              <button onClick={handleLogout} title="Log out" className="jt-btn whitespace-nowrap text-xs font-semibold text-white/90 border border-white/25 hover:bg-paper dark:bg-[#0e0e10] hover:text-ink px-3 py-1.5 rounded-full">Logout</button>
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
              onClick={() => { setMenuOpen(false); setView('settings'); }}
              className="w-full text-left text-sm font-semibold text-white/90 px-2 py-3 min-h-[44px]"
            >
              ⚙ Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left text-sm font-semibold text-white/90 px-2 py-3 min-h-[44px]"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-grid" aria-hidden="true"></div>
          <div className="relative">
            <p className="eyebrow">Customer Relationship Platform</p>
            <h1 className="mt-3 font-display font-extrabold tracking-tight text-3xl sm:text-4xl">Leads Management</h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl">Search, filter and export CRM leads at scale. Track status, owner and channel in one place.</p>
          </div>

          <section className="relative grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            <div className="jt-lift bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-4">
              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">TOTAL LEADS</p>
              <p className="font-display font-bold text-2xl mt-1">{dash.total}</p>
            </div>
            <div className="jt-lift bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-4">
              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">NEW</p>
              <p className="font-display font-bold text-2xl mt-1">{dash.by_status?.['New'] ?? '...'}</p>
            </div>
            <div className="jt-lift bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-4">
              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">QUALIFIED</p>
              <p className="font-display font-bold text-2xl mt-1">{dash.by_status?.['Qualified'] ?? '...'}</p>
            </div>
            <div className="jt-lift bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-4">
              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">TOP CHANNEL</p>
              <p className="font-display font-bold text-lg mt-1 leading-snug">{topChannel ? `${topChannel[0]} (${topChannel[1]})` : '...'}</p>
            </div>
          </section>

          {/* Analytics: mobile susun ke bawah, desktop berdampingan. */}
          <section className="relative bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-4 sm:p-5 mt-6">
            <p className="eyebrow">Analytics</p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <h2 className="font-display font-bold">Leads by Status</h2>
              {status !== '' && (
                <button
                  onClick={() => { setStatus(''); load(1, pageSize, ''); }}
                  className="text-xs font-semibold border border-ink/15 dark:border-white/15 rounded-full px-3 py-2"
                >
                  ✕ Clear
                </button>
              )}
            </div>
            <div className="mt-3 grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch">
              <div className="lg:col-span-3 h-80 lg:h-[480px]">
                <StatusChart
                  byStatus={dash.by_status}
                  total={dash.total}
                  selected={status}
                  dark={theme === 'dark'}
                  onSelect={handleChartSelect}
                />
              </div>
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="h-72 lg:h-[232px]">
                  <StatusDonut
                    byStatus={dash.by_status}
                    total={dash.total}
                    selected={status}
                    dark={theme === 'dark'}
                    onSelect={handleChartSelect}
                  />
                </div>
                <div className="h-72 lg:h-[232px]">
                  <StatusLine
                    byStatus={dash.by_status}
                    total={dash.total}
                    selected={status}
                    dark={theme === 'dark'}
                    onSelect={handleChartSelect}
                  />
                </div>
              </div>
            </div>
            <p className="mt-2 text-xs text-neutral-400">Green = most leads • Red = fewest • Tap any chart to filter, tap again to clear.</p>
          </section>
        </div>

        <section className="bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && load(1)} placeholder="Search name, company, email..." className="flex-1 px-3 py-2.5 border border-ink/15 dark:border-white/15 rounded-xl text-sm" />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-3 py-2.5 border border-ink/15 dark:border-white/15 rounded-xl text-sm bg-paper dark:bg-[#0e0e10]">
            <option value="">All Statuses</option>
            <option>New</option><option>Contacted</option><option>Connected</option>
            <option>Qualified</option><option>Opportunity</option>
            <option>Closed Won</option><option>Closed Lost</option>
          </select>
          <input value={country} onChange={(e) => setCountry(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && load(1)} placeholder="Country..." className="sm:w-36 px-3 py-2.5 border border-ink/15 dark:border-white/15 rounded-xl text-sm" />
          <input value={owner} onChange={(e) => setOwner(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && load(1)} placeholder="Owner..." className="sm:w-36 px-3 py-2.5 border border-ink/15 dark:border-white/15 rounded-xl text-sm" />
          <div className="flex gap-2">
            <button onClick={() => load(1)} className="btn-primary jt-btn flex-1 sm:flex-none bg-ink dark:bg-[#ededed] text-paper dark:text-[#0e0e10] font-display font-bold text-xs tracking-[0.14em] uppercase rounded-xl px-5 py-2.5">Search</button>
            <button onClick={handleExport} className="jt-btn border border-ink/15 dark:border-white/15 rounded-xl px-4 py-2.5 min-h-[44px] text-sm hover:border-black whitespace-nowrap">Export CSV</button>
          </div>
        </section>

        <ImportCsv onDone={handleDataChanged} />
        <AddLeadForm onDone={handleDataChanged} />

        <section className="bg-paper dark:bg-[#0e0e10] border border-ink/10 dark:border-white/10 rounded-2xl p-4 sm:p-5">
          <p className="eyebrow">Leads</p>
          <div className="mt-3 flex items-center justify-between">
            <h2 className="font-display font-bold">Leads List</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{info}</p>
          </div>

          {/* Baris kontrol: pilihan jumlah + prev/next. Mobile: full width, tombol gede. */}
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
              Show
              <select
                value={pageSize}
                onChange={(e) => { const s = Number(e.target.value); setPageSize(s); load(1, s); }}
                className="px-3 py-2.5 border border-ink/15 dark:border-white/15 rounded-xl text-sm bg-paper dark:bg-[#0e0e10] min-h-[44px]"
              >
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-xs text-neutral-400">per page</span>
            </label>
            <div className="flex items-center gap-2 sm:ml-auto">
              <button
                onClick={() => load(page - 1)}
                disabled={page <= 1}
                className="flex-1 sm:flex-none px-4 py-2.5 min-h-[44px] border border-ink/15 dark:border-white/15 rounded-xl text-sm font-semibold disabled:opacity-40"
              >
                ← Prev
              </button>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap px-1">Page {page} of {totalPages}</span>
              <button
                onClick={() => load(page + 1)}
                disabled={page >= totalPages}
                className="flex-1 sm:flex-none px-4 py-2.5 min-h-[44px] border border-ink/15 dark:border-white/15 rounded-xl text-sm font-semibold disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>

          <div className="overflow-x-auto hidden lg:block mt-3">
            <table className="jt-table w-full text-sm min-w-[800px]">
              <thead>
                <tr className="text-left text-xs text-slate-500 dark:text-neutral-400">
                  <th className="px-3 py-2 font-semibold">Name</th>
                  <th className="px-3 py-2 font-semibold">Company</th>
                  <th className="px-3 py-2 font-semibold">Email</th>
                  <th className="px-3 py-2 font-semibold text-center">Status</th>
                  <th className="px-3 py-2 font-semibold">Country</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((r) => (
                  <tr key={r.id} className="border-t border-ink/5 dark:border-white/5">
                    <td className="p-3 font-medium">{r.display_name}</td>
                    <td className="p-3 text-neutral-600 dark:text-neutral-300">{r.company}</td>
                    <td className="p-3 text-neutral-600 dark:text-neutral-300">{r.email}</td>
                    <td className="p-3 text-center"><span className={'badge ' + badgeClass(r.lead_status)}>{r.lead_status}</span></td>
                    <td className="p-3">{r.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden space-y-3 mt-3">
            {leads.map((r) => (
              <div key={r.id} className="border border-ink/10 dark:border-white/10 rounded-2xl p-4 bg-paper dark:bg-[#0e0e10]">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display font-bold text-sm">{r.display_name}</p>
                  <span className={'badge ' + badgeClass(r.lead_status)}>{r.lead_status}</span>
                </div>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{r.company}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{r.email} • {r.country}</p>
              </div>
            ))}
          </div>

          {leads.length === 0 && <p className="text-center py-10 text-slate-400 dark:text-neutral-500 text-sm">No leads match your filters. Try clearing search.</p>}
          <p className="mt-4 text-xs text-neutral-400">Tip: try Country = Indonesia (56 leads) • Export downloads the full filtered view.</p>
        </section>

        <footer className="bg-dark-section text-white dark:text-[#0e0e10] mt-6 rounded-2xl">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-display font-extrabold tracking-tight text-sm">MINI LEADS<span className="text-accent">.</span></p>
            <p className="text-xs text-white/60 dark:text-black/60">© 2026 CRM Leads Managements</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
