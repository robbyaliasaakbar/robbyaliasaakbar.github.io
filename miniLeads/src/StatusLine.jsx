// StatusLine.jsx — garis status. Rumus warna + klik SAMA PERSIS kayak bar & donat.
// Bedanya cuma bentuk garis biar keliatan naik-turunnya antar status.
import { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Filler } from 'chart.js';
import { ORDER, rankColors } from './chartTheme.js';

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Filler);

export default function StatusLine({ byStatus = {}, total = 0, selected = '', dark = false, onSelect }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const cbRef = useRef(onSelect);
  cbRef.current = onSelect; // selalu panggil versi terbaru tanpa bikin chart ulang

  // Bikin chart SEKALI pas komponen lahir.
  useEffect(() => {
    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: ORDER,
        datasets: [{
          data: ORDER.map(() => 0),
          borderColor: '#0C0C0C',
          backgroundColor: 'rgba(12,12,12,0.05)',
          fill: true,
          tension: 0.35, // garis melengkung halus
          borderWidth: 2,
          pointBackgroundColor: rankColors(ORDER.map(() => 0), ''),
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBorderWidth: 0,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 600 },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
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
        // Klik titik → kirim nama status ke App.
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

  // Tiap data/seleksi berubah → ranking dihitung ulang (realtime).
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const values = ORDER.map((s) => byStatus[s] ?? 0);
    chart.data.datasets[0].data = values;
    chart.data.datasets[0].pointBackgroundColor = rankColors(values, selected);
    // Bingkai chart ngikutin tema (isi warna JANGAN: tetap ranking).
    chart.options.scales.x.ticks.color = dark ? '#a3a3a3' : '#64748b';
    chart.options.scales.y.ticks.color = dark ? '#a3a3a3' : '#64748b';
    chart.options.scales.y.grid.color = dark ? 'rgba(255,255,255,.08)' : 'rgba(12,12,12,.06)';
    chart.update();
  }, [byStatus, selected, dark]);

  return (
    <div className="h-full">
      <canvas ref={canvasRef} aria-label="Leads by status line chart. Tap a point to filter the list." />
    </div>
  );
}
