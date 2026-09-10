/* ============================================
   Job Tracker - store.js (OTAK DATABASE)
   Aturan: app.js DILARANG pegang localStorage langsung.
   Semua lewat 5 fungsi di bawah ini.
   Nanti upgrade login, cukup ganti isi file ini aja.
   ============================================ */

const DB_KEY = "jobTracker.lamaran.v1";
const COUNTER_KEY = "jobTracker.counter.v1";

// Baca semua data dari browser. Kalau kosong, kasih array kosong.
function load() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

// Tulis semua data ke browser.
function saveAll(list) {
  localStorage.setItem(DB_KEY, JSON.stringify(list));
}

// Baca counter terakhir. Kalau belum ada, mulai dari 0.
function loadCounter() {
  const raw = localStorage.getItem(COUNTER_KEY);
  const n = parseInt(raw, 10);
  return isNaN(n) ? 0 : n;
}

// Simpan counter.
function saveCounter(n) {
  localStorage.setItem(COUNTER_KEY, String(n));
}

// Bikin ID urut: lamaran-001, lamaran-002... lanjut terus, gak dipakai ulang.
function makeId() {
  const next = loadCounter() + 1;
  saveCounter(next);
  return "lamaran-" + String(next).padStart(3, "0");
}

// Rapihin link: kosong boleh, kalau isi tapi belum ada http, tambahin https://
function normalizeLink(s) {
  const t = String(s || "").trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t)) return t;
  return "https://" + t;
}

// 1. Ambil semua lamaran
function getAll() {
  return load();
}

// 2. Tambah 1 lamaran. data = {company, position, date, status, portal, link}
function add(data) {
  const list = load();
  const now = new Date().toISOString();
  const item = {
    id: makeId(),
    company: data.company.trim(),
    position: data.position.trim(),
    date: data.date, // format yyyy-mm-dd dari input date
    status: data.status,
    portal: data.portal.trim(),
    link: normalizeLink(data.link),
    createdAt: now,
  };
  list.push(item);
  saveAll(list);
  return item;
}

// 3. Edit 1 lamaran berdasar id
function update(id, dataBaru) {
  const list = load();
  const i = list.findIndex((x) => x.id === id);
  if (i === -1) return null;
  list[i] = {
    ...list[i],
    company: dataBaru.company.trim(),
    position: dataBaru.position.trim(),
    date: dataBaru.date,
    status: dataBaru.status,
    portal: dataBaru.portal.trim(),
    link: normalizeLink(dataBaru.link),
  };
  saveAll(list);
  return list[i];
}

// 4. Hapus 1 berdasar id. Counter TIDAK mundur (biar ID gak dipakai ulang).
function remove(id) {
  const list = load();
  const sisa = list.filter((x) => x.id !== id);
  saveAll(sisa);
  return sisa;
}

// 5. Hapus semua (buat testing / reset)
function clear() {
  saveAll([]);
  // counter sengaja TIDAK direset biar ID tetap lanjut (anti tabrakan)
}
