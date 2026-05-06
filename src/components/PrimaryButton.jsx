import { Link } from 'react-router-dom'

const BASE_CLASS =
  'inline-flex items-center justify-center w-full max-w-[280px] rounded-full bg-brand text-white py-3 font-medium active:opacity-90 transition'

export default function PrimaryButton({ to, onClick, children, className = '', type = 'button' }) {
  const cls = `${BASE_CLASS} ${className}`.trim()

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
