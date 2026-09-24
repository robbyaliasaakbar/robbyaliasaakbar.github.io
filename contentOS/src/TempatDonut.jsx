// TempatDonut.jsx — donat by_tempat, tap potongan = filter, tap lagi = batal.
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ORDER = ['IG', 'LinkedIn', 'Reddit', 'WA'];
const COLORS = { IG: '#D70000', LinkedIn: '#0A66C2', Reddit: '#FF4500', WA: '#25D366' };

export default function TempatDonut({ byTempat, selected, dark, onSelect }) {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (chartRef.current) chartRef.current.destroy();
    const data = ORDER.map((k) => byTempat?.[k] ?? 0);
    chartRef.current = new Chart(canvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ORDER,
        datasets: [{
          data,
          backgroundColor: ORDER.map((k) => COLORS[k]),
          borderColor: dark ? '#0e0e10' : '#FFFFFF',
          borderWidth: 3,
          hoverOffset: 8,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
          legend: { position: 'bottom', labels: { color: dark ? '#ededed' : '#0C0C0C', boxWidth: 12, padding: 12 } },
        },
        onClick: (e) => {
          const els = chartRef.current.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
          if (els.length) onSelect(ORDER[els[0].index]);
        },
      },
    });
    return () => chartRef.current?.destroy();
  });

  return <canvas ref={ref} aria-label="Chart konten per platform, tap untuk filter" />;
}
