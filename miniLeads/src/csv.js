// csv.js — parser CSV murni (no React), bisa ditest via node.
// Ngerti kutip "..." + koma di dalam Notes (mis: "Halo, ada koma").

// Pecah teks CSV jadi array baris, tiap baris = array kolom.
export function parseCSV(text) {
  const rows = [];
  let row = [];
  let cur = '';
  let inQuote = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    if (c === '"' && inQuote && next === '"') { cur += '"'; i++; continue; } // "" = kutip beneran
    if (c === '"') { inQuote = !inQuote; continue; }
    if (c === ',' && !inQuote) { row.push(cur); cur = ''; continue; }
    if ((c === '\n' || c === '\r') && !inQuote) {
      if (c === '\r' && next === '\n') i++;
      row.push(cur); cur = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
      continue;
    }
    cur += c;
  }
  row.push(cur);
  if (row.length > 1 || row[0] !== '') rows.push(row);
  return rows;
}
