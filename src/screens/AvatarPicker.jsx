import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AVATARS, getAvatarKey, setAvatarKey } from '../lib/avatar'

// One avatar tile in the 4×3 grid — Figma 882:540 / 882:464 / etc.
// Emoji is rendered as text (system emoji) per Figma — 36px Inter Medium.
function AvatarTile({ avatar, selected, onClick, style }) {
  const ringColor = avatar.gradient.match(/#[0-9A-F]{6}/i)?.[0] ?? '#F7AE2B'
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute block rounded-[16px] transition-transform duration-150 ease-out hover:-translate-y-1 hover:scale-[1.03] active:translate-y-0 active:scale-100 cursor-pointer"
      style={{
        ...style,
        width: 90,
        height: 95.988,
        backgroundImage: avatar.gradient,
        boxShadow: selected
          ? `0 0 0 3px ${ringColor}, 0 8px 14px rgba(0,0,0,0.18), 0 3px 6px rgba(0,0,0,0.12)`
          : '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1)',
      }}
      aria-pressed={selected}
      aria-label={avatar.label}
    >
      {/* Emoji glyph — 36px Inter Medium, centered horizontally, top=-2 inside 40-tall container */}
      <div className="absolute" style={{ left: 16, top: 16, width: 58, height: 40 }}>
        <p
          className="absolute -translate-x-1/2 text-center font-inter font-medium whitespace-nowrap"
          style={{
            left: 29.27,
            top: -2,
            color: '#0a0a0a',
            fontSize: 36,
            lineHeight: '40px',
          }}
        >
          {avatar.emoji}
        </p>
      </div>
      {/* Label — Inter Bold 12 white, centered */}
      <p
        className="absolute text-center font-inter font-bold text-white whitespace-nowrap"
        style={{ left: 16, top: 64, width: 58, fontSize: 12, lineHeight: '16px' }}
      >
        {avatar.label}
      </p>
    </button>
  )
}

export default function AvatarPicker() {
  const navigate = useNavigate()
  // Local draft selection — only committed when the user taps "That's Me!".
  const [draftKey, setDraftKey] = useState(getAvatarKey())

  const handleConfirm = () => {
    setAvatarKey(draftKey)
    navigate('/account/profile')
  }

  return (
    <div className="flex-1 relative overflow-hidden bg-white">

      {/* Top tint band — stretches full viewport */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 22,
          left: 0,
          right: 0,
          height: 77,
          backgroundColor: 'rgba(249,180,56,0.2)',
        }}
      />

      {/* 375-wide centered content frame */}
      <div className="relative w-[375px] max-w-full h-full mx-auto">

        {/* Title — Inter Black 28 #1E2939 leading-60, centered */}
        <p
          className="absolute -translate-x-1/2 font-inter font-black text-center whitespace-nowrap"
          style={{
            left: 187.5 + 0.5,
            top: 20,
            color: '#1E2939',
            fontSize: 28,
            lineHeight: '60px',
          }}
        >
          Choose Your Avatar!
        </p>

        {/* Subtitle — Inter Regular 14 #4A5565 leading-20, centered */}
        <p
          className="absolute -translate-x-1/2 font-inter font-normal text-center whitespace-nowrap"
          style={{
            left: 187.5,
            top: 72,
            color: '#4A5565',
            fontSize: 14,
            lineHeight: '20px',
          }}
        >
          Pick your favorite
        </p>

        {/* Grid container — 294×420 at left=40 top=154.99 (4 rows × 3 cols, step 102×107.99) */}
        <div
          className="absolute"
          style={{ top: 184.99, left: 40, width: 294, height: 419.95 }}
        >
          {AVATARS.map((avatar, idx) => {
            const col = idx % 3
            const row = Math.floor(idx / 3)
            return (
              <AvatarTile
                key={avatar.key}
                avatar={avatar}
                selected={draftKey === avatar.key}
                onClick={() => setDraftKey(avatar.key)}
                style={{ left: col * 102, top: row * 107.99 }}
              />
            )
          })}
        </div>

        {/* "That's Me! ✨" button — Inter Black 18 white, bg #69CAD3 */}
        <button
          type="button"
          onClick={handleConfirm}
          className="absolute flex items-center justify-center rounded-[16px] transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          style={{
            top: 675,
            left: 41,
            width: 294,
            height: 60,
            backgroundColor: '#69CAD3',
            filter:
              'drop-shadow(0 10px 7.5px rgba(0,0,0,0.1)) drop-shadow(0 4px 3px rgba(0,0,0,0.1))',
          }}
        >
          <span
            className="font-inter font-black text-white text-center whitespace-nowrap"
            style={{ fontSize: 18, lineHeight: '28px' }}
          >
            That&apos;s Me! ✨
          </span>
        </button>

      </div>
    </div>
  )
}
