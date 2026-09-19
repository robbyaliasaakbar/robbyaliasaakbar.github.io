// StatusChart.jsx — chart status interaktif: tap batang → tabel ikut kefilter.
// Chart.js langsung (tanpa wrapper), pola sama kayak JobTracker dulu.
// 1 state di App (status) dipakai 2 tempat: highlight chart + isi tabel.
import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

import { ORDER, rankColors } from './chartTheme.js';

export default function StatusChart({ byStatus = {}, total = 0, selected = '', dark = false, onSelect }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const cbRef = useRef(onSelect);
  cbRef.current = onSelect; // selalu panggil versi terbaru tanpa bikin chart ulang

  // Bikin chart SEKALI pas komponen lahir.
  useEffect(() => {
    const chart = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: ORDER,
        datasets: [{ data: ORDER.map(() => 0), backgroundColor: rankColors(ORDER.map(() => 0), ''), borderRadius: 8, borderSkipped: false }],
      },
      options: {
        indexAxis: 'x', // batang vertikal
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 600 }, // animasi pas data ganti (habis search/filter)
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              // Tap/hover → "321 leads (16%)". Total dijaga biar tidak NaN pas loading.
              label: (ctx) => {
                const v = ctx.raw;
                const t = Number(total) || 0;
                const pct = t ? Math.round((v / t) * 100) : 0;
                return ` ${v} leads (${pct}%)`;
              },
            },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 }, maxRotation: 45, color: dark ? '#a3a3a3' : '#64748b' } },
          y: { beginAtZero: true, ticks: { precision: 0, color: dark ? '#a3a3a3' : '#64748b' }, grid: { color: dark ? 'rgba(255,255,255,.08)' : 'rgba(12,12,12,.06)' } },
        },
        // Klik batang → kirim nama status ke App. App yang mutusin filter/clear.
        onClick: (evt, els) => {
          if (!els.length) return;
          cbRef.current(ORDER[els[0].index]);
        },
        onHover: (evt, els) => { evt.native.target.style.cursor = els.length ? 'pointer' : 'default'; },
      },
    });
    chartRef.current = chart;
    return () => chart.destroy();
  }, []);

  // Tiap data/seleksi berubah → ranking dihitung ulang + update isi chart (tanpa bikin ulang).
  // Batang yang tidak kepilih dibuat pudar biar fokus keliatan.
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const values = ORDER.map((s) => byStatus[s] ?? 0);
    chart.data.datasets[0].data = values;
    chart.data.datasets[0].backgroundColor = rankColors(values, selected);
    // Bingkai chart ngikutin tema (isi warna JANGAN: tetap ranking).
    chart.options.scales.x.ticks.color = dark ? '#a3a3a3' : '#64748b';
    chart.options.scales.y.ticks.color = dark ? '#a3a3a3' : '#64748b';
    chart.options.scales.y.grid.color = dark ? 'rgba(255,255,255,.08)' : 'rgba(12,12,12,.06)';
    chart.update();
  }, [byStatus, selected, dark]);

  return (
    <div className="h-full">
      <canvas ref={canvasRef} aria-label="Leads by status chart. Tap a bar to filter the list." />
    </div>
  );
}
