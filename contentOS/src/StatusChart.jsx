// StatusChart.jsx — bar by_status, tap batang = filter, tap lagi = batal.
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ORDER = ['ide', 'post-production', 'revision', 'posted'];
const COLORS = { ide: '#71717a', 'post-production': '#f59e0b', revision: '#0ea5e9', posted: '#059669' };

export default function StatusChart({ byStatus, selected, dark, onSelect }) {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (chartRef.current) chartRef.current.destroy();
    const data = ORDER.map((k) => byStatus?.[k] ?? 0);
    chartRef.current = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ORDER,
        datasets: [{
          data,
          backgroundColor: ORDER.map((k) => COLORS[k]),
          borderColor: ORDER.map((k) => (k === selected ? (dark ? '#ededed' : '#0C0C0C') : 'transparent')),
          borderWidth: ORDER.map((k) => (k === selected ? 2 : 0)),
          borderRadius: 8,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: dark ? '#ededed' : '#0C0C0C' }, grid: { display: false } },
          y: { beginAtZero: true, ticks: { precision: 0, color: dark ? '#a1a1aa' : '#71717a' }, grid: { color: dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.06)' } },
        },
        onClick: (e) => {
          const els = chartRef.current.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
          if (els.length) onSelect(ORDER[els[0].index]);
        },
      },
    });
    return () => chartRef.current?.destroy();
  });

  return <canvas ref={ref} aria-label="Chart konten per status, tap untuk filter" />;
}
