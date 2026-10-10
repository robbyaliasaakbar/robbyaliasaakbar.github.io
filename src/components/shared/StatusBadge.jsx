/*
  StatusBadge — badge status eksperimen.
  variant: 'stable' | 'live' | 'working' | 'exploring' | 'failed'
  Style-nya ada di global.css (di-port dari css/style.css).
*/
const LABELS = {
  stable: 'Stable',
  live: 'Live',
  working: 'Working On It',
  exploring: 'Exploring',
  failed: 'Failed',
}

export default function StatusBadge({ variant = 'stable', label, className = '' }) {
  return (
    <span className={`status-badge status-${variant} ${className}`}>
      <span className="status-dot" aria-hidden="true"></span>
      {label || LABELS[variant]}
    </span>
  )
}
