import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AVATARS, getAvatarKey, setAvatarKey } from '../lib/avatar'

// One avatar tile in the 4×3 grid — Figma 882:540 / 882:464 / etc.
function AvatarTile({ avatar, selected, onClick, style }) {
  // Selected tile gets a ring matching its gradient's start colour for clarity.
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
      {/* Emoji image — 40×40 visible, centered horizontally at top=16 */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 16, top: 16, width: 58, height: 40 }}
      >
        <img
          src={avatar.src}
          alt=""
          aria-hidden
          draggable={false}
          style={{ width: 40, height: 40 }}
        />
      </div>
      {/* Label — Inter Bold 12 white, centered, at top=64 */}
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

      {/* Top tint band — Figma 873:842 (376×77 at left=-2 top=64) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 64,
          left: -2,
          width: 376,
          height: 77,
          backgroundColor: 'rgba(249,180,56,0.2)',
        }}
      />

      {/* Title — Figma 874:1239 (Inter Black 28 #1E2939 lh:60 centered top=62) */}
      <p
        className="absolute -translate-x-1/2 font-inter font-black text-center whitespace-nowrap"
        style={{
          left: 187.5 + 0.5,
          top: 62,
          color: '#1E2939',
          fontSize: 28,
          lineHeight: '60px',
        }}
      >
        Choose Your Avatar!
      </p>

      {/* Subtitle — Figma 882:453 (294×20 at top=114, Inter Regular 14 #4A5565 centered) */}
      <p
        className="absolute -translate-x-1/2 font-inter text-center whitespace-nowrap"
        style={{
          left: 187.5,
          top: 114,
          color: '#4A5565',
          fontSize: 14,
          lineHeight: '20px',
        }}
      >
        Pick your favorite
      </p>

      {/* Grid container — Figma 882:455 (294×420 at left=40 top=227, 4 rows × 3 cols, step 102×107.99) */}
      <div
        className="absolute"
        style={{ top: 196 + 30.99, left: 40, width: 294, height: 419.95 }}
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

      {/* "That's Me! ✨" button — Figma 882:519 (294×60 cyan at left=41 top=717) */}
      <button
        type="button"
        onClick={handleConfirm}
        className="absolute flex items-center justify-center rounded-[16px] transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        style={{
          top: 717,
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
  )
}
