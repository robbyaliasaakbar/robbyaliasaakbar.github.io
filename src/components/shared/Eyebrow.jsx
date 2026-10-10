/*
  Eyebrow — label kecil merah dengan garis di depan.
  Dipake di semua section header.
  Terima props tambahan (mis. data-reveal) via ...props.
*/
export default function Eyebrow({ children, className = '', ...props }) {
  return (
    <p className={`eyebrow ${className}`} {...props}>
      {children}
    </p>
  )
}
