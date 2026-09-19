// StatusDonut.jsx — donat status. Rumus warna + klik SAMA PERSIS kayak bar chart.
// Bedanya cuma bentuk (doughnut) + ada legend bawah yang juga bisa di-tap buat filter.
import { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { ORDER, rankColors } from './chartTheme.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

export default function StatusDonut({ byStatus = {}, total = 0, selected = '', dark = false, onSelect }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const cbRef = useRef(onSelect);
  cbRef.current = onSelect; // selalu panggil versi terbaru tanpa bikin chart ulang

  // Bikin chart SEKALI pas komponen lahir.
  useEffect(() => {
    const chart = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: ORDER,
        datasets: [{ data: ORDER.map(() => 0), backgroundColor: rankColors(ORDER.map(() => 0), ''), borderWidth: 2, borderColor: '#FFFFFF' }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%', // lubang tengah = donat
        animation: { duration: 600 },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 10, font: { size: 10 }, padding: 10, color: dark ? '#d4d4d4' : '#525252' },
            // Klik nama di legend = filter juga (konsisten kayak tap potongan).
            onClick: (e, item) => cbRef.current(item.text),
          },
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
        // Klik potongan → kirim nama status ke App.
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
    chart.data.datasets[0].backgroundColor = rankColors(values, selected);
    // Label legend ngikutin tema (isi warna JANGAN: tetap ranking).
    chart.options.plugins.legend.labels.color = dark ? '#d4d4d4' : '#525252';
    chart.update();
  }, [byStatus, selected, dark]);

  return (
    <div className="h-full">
      <canvas ref={canvasRef} aria-label="Leads by status donut chart. Tap a slice to filter the list." />
    </div>
  );
}
