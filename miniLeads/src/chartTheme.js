// chartTheme.js — 1 bahasa warna + 1 urutan buat SEMUA chart.
// Ranking realtime: terbanyak hijau → tengah kuning → tersedikit merah.
// Semua chart (bar, donat, garis) ngitung dari sini, jadi tidak ada yang beda.

// Urutan tetap (bukan abjad) biar gampang dibaca + konsisten tiap render.
export const ORDER = ['New', 'Contacted', 'Connected', 'Qualified', 'Opportunity', 'Closed Won', 'Closed Lost'];

// Nilai → warna. t = 0 (terbawah, merah) sampai 1 (teratas, hijau).
// Kalau semua sama (misal loading) → kuning semua, biar tidak ngaco.
export function rankColor(value, min, max, alpha = 1) {
  if (max === min) return `rgba(234, 179, 8, ${alpha})`;
  const t = (value - min) / (max - min);
  const lerp = (a, b, k) => Math.round(a + (b - a) * k);
  const RED = [220, 38, 38];
  const YELLOW = [234, 179, 8];
  const GREEN = [22, 163, 74];
  let c;
  if (t < 0.5) {
    const k = t / 0.5; // merah → kuning
    c = RED.map((v, i) => lerp(v, YELLOW[i], k));
  } else {
    const k = (t - 0.5) / 0.5; // kuning → hijau
    c = YELLOW.map((v, i) => lerp(v, GREEN[i], k));
  }
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
}

// Satu array nilai → satu array warna. Yang tidak kepilih dibuat pudar (0.2).
export function rankColors(values, selected = '') {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return values.map((v, i) =>
    !selected || selected === ORDER[i] ? rankColor(v, min, max, 1) : rankColor(v, min, max, 0.2)
  );
}
