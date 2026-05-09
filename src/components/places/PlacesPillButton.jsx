import { Link } from 'react-router-dom'
import { playTap } from '../../lib/sound'

export default function PlacesPillButton({
  to,
  onClick,
  children,
  width = 106,
  height = 28,
  fontSize = 11,
  className = '',
  style,
}) {
  const cls = `inline-flex items-center justify-center bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] font-poppins font-black text-[#f8c83c] select-none ${className}`
  const allStyle = { width, height, fontSize, lineHeight: 1, ...style }

  if (to) {
    return (
      <Link to={to} onClick={() => playTap()} className={cls} style={allStyle}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" onClick={(e) => { playTap(); onClick?.(e) }} className={cls} style={allStyle}>
      {children}
    </button>
  )
}
