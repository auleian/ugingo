import { Link } from 'react-router-dom'

const VARIANTS = {
  primary:
    'bg-accent text-white shadow-[0_4px_0_0_rgba(85,137,244,0.25)] active:translate-y-[2px] active:shadow-[0_2px_0_0_rgba(85,137,244,0.25)]',
  brand: 'bg-brand text-white active:opacity-90',
  ghost: 'bg-transparent text-zinc-700 border border-zinc-200',
}

const SIZES = {
  md: 'h-[50px] px-6 text-[18px] rounded-[16px]',
  full: 'h-[50px] w-full text-[18px] rounded-[16px]',
}

export default function Button({
  to,
  onClick,
  children,
  variant = 'primary',
  size = 'full',
  className = '',
  type = 'button',
}) {
  const cls =
    `inline-flex items-center justify-center font-semibold transition select-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
