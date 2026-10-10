/*
  Chart — port React dari js/charts.js (SVG renderer, tanpa dependency).
  Dipakai halaman exp detail: tipe "bar" | "line" | "step" | "radar"
  (semua tipe yang didukung versi vanilla udah ke-port).
  Angka/pola: W=640, scaffold 4 gridline — sama persis versi vanilla.
  bar/line: H=340, pad 52/16/28/44 · step: H=360, pad 52/16/28/86
  (sesuai renderStep di js/charts.js) · radar: 560x460 r=165.
*/
const W = 640
const H = 340
const PAD_L = 52
const PAD_R = 16
const PAD_T = 28
const PAD_B = 44

function resolveYMax(yMax, data) {
  if (yMax && yMax > 0) return yMax
  return Math.max(...data.map((d) => d.value)) * 1.15
}

/* Gridline + label sumbu Y (scaffold) — h/padB bisa dioverride (step) */
function Scaffold({ yMax, h = H, padB = PAD_B }) {
  const rows = []
  const steps = 4
  for (let i = 0; i <= steps; i++) {
    const v = (yMax * i) / steps
    const y = h - padB - ((h - padB - PAD_T) * i) / steps
    rows.push(
      <g key={i}>
        <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y} stroke="rgba(12,12,12,.08)" strokeWidth={1} />
        <text x={PAD_L - 8} y={y + 4} textAnchor="end" fontSize={11} fill="#9ca3af">
          {String(Math.round(v))}
        </text>
      </g>
    )
  }
  return <>{rows}</>
}

export function BarChart({ data, yMax }) {
  const max = resolveYMax(yMax, data)
  const bw = (W - PAD_L - PAD_R) / data.length

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img">
      <Scaffold yMax={max} />
      {data.map((d, i) => {
        const bh = ((H - PAD_B - PAD_T) * d.value) / max
        const x = PAD_L + i * bw + bw * 0.2
        const w = bw * 0.6
        const y = H - PAD_B - bh
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={bh} rx={4} fill="#0C0C0C" className="chart-bar" />
            <text x={x + w / 2} y={y - 8} textAnchor="middle" fontSize={12} fontWeight={700} fill="#0C0C0C">
              {String(d.value)}
            </text>
            <text x={PAD_L + i * bw + bw / 2} y={H - PAD_B + 20} textAnchor="middle" fontSize={11} fill="#6b7280">
              {String(d.label)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function LineChart({ data, yMax }) {
  if (data.length < 2) return null
  const max = resolveYMax(yMax, data)

  const pts = data.map((d, i) => ({
    x: PAD_L + ((W - PAD_L - PAD_R) * i) / (data.length - 1),
    y: H - PAD_B - ((H - PAD_B - PAD_T) * d.value) / max,
    d,
  }))

  const areaPath =
    `M ${pts[0].x} ${H - PAD_B} ` +
    pts.map((p) => `L ${p.x} ${p.y}`).join(' ') +
    ` L ${pts[pts.length - 1].x} ${H - PAD_B} Z`

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img">
      <Scaffold yMax={max} />
      <path d={areaPath} fill="rgba(12,12,12,.05)" />
      <path d={linePath} fill="none" stroke="#0C0C0C" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4.5} fill="#FFFFFF" stroke="#D70000" strokeWidth={2.5} className="chart-point" />
          <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize={11.5} fontWeight={700} fill="#0C0C0C">
            {String(p.d.value)}
          </text>
          <text x={p.x} y={H - PAD_B + 20} textAnchor="middle" fontSize={11} fill="#6b7280">
            {String(p.d.label)}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function StepChart({ data, yMax, suffix = '' }) {
  if (data.length < 2) return null
  const max = resolveYMax(yMax, data)
  const HS = 360
  const PADB = 86

  const pts = data.map((d, i) => ({
    x: PAD_L + ((W - PAD_L - PAD_R) * i) / (data.length - 1),
    y: HS - PADB - ((HS - PADB - PAD_T) * d.value) / max,
    d,
  }))

  /* Jalur tangga: horizontal dulu baru vertikal antar titik (persis renderStep) */
  let pathD = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    pathD += ` L ${pts[i].x} ${pts[i - 1].y} L ${pts[i].x} ${pts[i].y}`
  }

  return (
    <svg viewBox={`0 0 ${W} ${HS}`} className="w-full h-auto" role="img">
      <Scaffold yMax={max} h={HS} padB={PADB} />
      <path d={pathD} fill="none" stroke="#0C0C0C" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4.5} fill="#FFFFFF" stroke="#D70000" strokeWidth={2.5} className="chart-point" />
          <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize={11.5} fontWeight={700} fill="#0C0C0C">
            {String(p.d.value) + suffix}
          </text>
          {/* Label x miring -32° (nama stage panjang) */}
          <text
            x={p.x + 4}
            y={HS - PADB + 22}
            textAnchor="end"
            fontSize={10.5}
            fill="#6b7280"
            transform={`rotate(-32 ${p.x + 4} ${HS - PADB + 22})`}
          >
            {String(p.d.label)}
          </text>
        </g>
      ))}
    </svg>
  )
}

/* Radar / polygon — port persis renderRadar (js/charts.js) */
export function RadarChart({ axes, series, max = 100 }) {
  if (!axes?.length || !series?.length) return null
  const n = axes.length
  const RW = 560
  const RH = 460
  const cx = RW / 2
  const cy = RH / 2 - 8
  const radius = 165

  const angle = (i) => -Math.PI / 2 + (2 * Math.PI * i) / n
  const pointAt = (i, ratio) => ({
    x: cx + radius * ratio * Math.cos(angle(i)),
    y: cy + radius * ratio * Math.sin(angle(i)),
  })

  /* Ring grid di 25/50/75/100% */
  const rings = [0.25, 0.5, 0.75, 1].map((r) =>
    Array.from({ length: n }, (_, i) => pointAt(i, r))
      .map((p) => `${p.x},${p.y}`)
      .join(' ')
  )

  return (
    <svg viewBox={`0 0 ${RW} ${RH}`} className="w-full h-auto" role="img">
      {rings.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="rgba(12,12,12,.1)" strokeWidth={1} />
      ))}

      {/* Sumbu + label sumbu */}
      {axes.map((name, i) => {
        const outer = pointAt(i, 1)
        const lp = pointAt(i, 1.2)
        return (
          <g key={name}>
            <line x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="rgba(12,12,12,.1)" strokeWidth={1} />
            <text x={lp.x} y={lp.y} textAnchor="middle" dy="0.32em" fontSize={11} fontWeight={600} fill="#6b7280">
              {name}
            </text>
          </g>
        )
      })}

      {/* Polygon tiap seri + titik + label (nempel vertex sumbu pertama) */}
      {series.map((s) => {
        const pts = s.values.map((v, i) => pointAt(i, Math.max(0, Math.min(1, v / max))))
        const anchor = pointAt(0, Math.max(0, Math.min(1, s.values[0] / max)))
        return (
          <g key={s.label}>
            <polygon
              points={pts.map((p) => `${p.x},${p.y}`).join(' ')}
              fill={s.color}
              fillOpacity={0.15}
              stroke={s.color}
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={s.color} />
            ))}
            <text x={anchor.x} y={anchor.y - 10} textAnchor="middle" fontSize={11.5} fontWeight={700} fill={s.color}>
              {s.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
