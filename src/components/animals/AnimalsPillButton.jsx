import { Link } from 'react-router-dom'

// Standard dark navy pill (Next / Back) used across all Animals screens.
// Sizes per gotcha rule #9.
const SIZES = {
  md: { w: 106, h: 28, text: 11 },
  sm: { w: 72, h: 26, text: 11 },
}

export default function AnimalsPillButton({
  to,
  onClick,
  children = 'Next',
  size = 'md',
  className = '',
  style,
}) {
  const s = SIZES[size]
  const cls = `inline-flex items-center justify-center bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] font-poppins font-black text-[#f8c83c] select-none ${className}`
  const allStyle = { width: s.w, height: s.h, fontSize: s.text, lineHeight: 1, ...style }

  if (to) {
    return (
      <Link to={to} className={cls} style={allStyle}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls} style={allStyle}>
      {children}
    </button>
  )
}
