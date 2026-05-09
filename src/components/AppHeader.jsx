import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Mascot from './Mascot'
import { playTap, toggleMute, useMute } from '../lib/sound'

function ProfileIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function ShopIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function SoundOnIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

function SoundOffIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}

export default function AppHeader({ level = 'A', roundedBottom = false }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const muted = useMute()

  useEffect(() => {
    if (!open) return
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className="relative w-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] z-30"
      style={{
        height: 87,
        borderBottomLeftRadius: roundedBottom ? 15 : 0,
        borderBottomRightRadius: roundedBottom ? 15 : 0,
      }}
    >
      <Link
        to="/lessons"
        aria-label="Go to lessons"
        className="absolute block select-none transition-transform duration-150 hover:scale-110 active:scale-95"
        style={{ left: 12, top: 47 }}
      >
        <Mascot variant="default" size={27} withCircle={false} />
      </Link>

      <div ref={ref}>
        <button
          type="button"
          onClick={() => {
            playTap()
            setOpen((v) => !v)
          }}
          aria-label="Open menu"
          aria-expanded={open}
          aria-haspopup="menu"
          className="absolute rounded-full border-[3px] border-[#F7AE2B] flex items-center justify-center font-poppins font-black text-[#f16522] text-[13px] leading-none bg-[#2E4858] transition-transform duration-150 hover:scale-110 active:scale-95"
          style={{ left: 326, top: 47, width: 34.909, height: 35.265 }}
        >
          {level}
        </button>

        {open && (
          <div
            role="menu"
            className="absolute bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.18)] flex flex-col items-center gap-1 z-40 ring-1 ring-black/5"
            style={{ top: 90, right: 8, width: 56, paddingTop: 8, paddingBottom: 8 }}
          >
            <Link
              to="/profile"
              role="menuitem"
              onClick={() => {
                playTap()
                setOpen(false)
              }}
              aria-label="Profile"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#f16522] hover:bg-[#f16522]/10 active:scale-95 transition"
            >
              <ProfileIcon />
            </Link>
            <Link
              to="/shop"
              role="menuitem"
              onClick={() => {
                playTap()
                setOpen(false)
              }}
              aria-label="Shop"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#f16522] hover:bg-[#f16522]/10 active:scale-95 transition"
            >
              <ShopIcon />
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                toggleMute()
                if (muted) playTap()
              }}
              aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
              aria-pressed={muted}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#f16522] hover:bg-[#f16522]/10 active:scale-95 transition"
            >
              {muted ? <SoundOffIcon /> : <SoundOnIcon />}
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
