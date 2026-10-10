import { Link } from 'react-router-dom'

/*
  Button — shared component (dipake semua halaman).
  variant: 'primary' | 'outline' | 'invert'
  size:    'md' (default) | 'sm' (buat navbar/CTA kecil)
  - href + external → <a> (URL eksternal)
  - href            → <Link> (SPA)
  - tanpa href      → <button>
*/

const VARIANTS = {
  primary: 'btn-primary bg-ink text-white',
  outline: 'btn-outline border border-ink text-ink',
  invert: 'btn-invert bg-accent text-white font-extrabold',
}

const SIZES = {
  md: 'text-sm px-8 py-4',
  sm: 'text-xs px-5 py-2.5',
}

const BASE =
  'inline-flex items-center gap-2 font-display font-bold tracking-[0.18em] uppercase rounded-full'

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  children,
  className = '',
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  // URL eksternal → <a> biasa (router nggak boleh tangani)
  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  // URL internal → <Link> biar nggak reload
  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  )
}
