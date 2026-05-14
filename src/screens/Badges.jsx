import { useNavigate } from 'react-router-dom'
import arrowIcon from '../assets/account-arrow.svg'
import starCornerIcon from '../assets/badge-star.svg'
import lockIcon from '../assets/badge-lock.svg'
import trophyEmoji from '../assets/emojis/trophy.png'
import dartEmoji from '../assets/emojis/dart.png'
import crownEmoji from '../assets/emojis/crown.png'
import fireEmoji from '../assets/emojis/fire.png'
import booksEmoji from '../assets/emojis/books.png'
import starEmoji from '../assets/avatars/star.png'

// Badge catalog — six achievements with three possible states. When the
// stats engine lands this list moves to a context-driven source so unlock
// state updates live; for now it matches the Figma defaults exactly.
//   unlocked → full colour + small star corner indicator
//   progress → gradient + grey overlay + hidden emoji + small centre lock
//   locked   → gradient @40% opacity + dark overlay + centre lock icon
const BADGES = [
  {
    key: 'perfect',
    emoji: starEmoji,
    title: 'Perfect',
    subtitle: '100% score!',
    gradient: 'linear-gradient(139.603deg, #C27AFF 0%, #F6339A 100%)',
    state: 'unlocked',
  },
  {
    key: 'first-steps',
    emoji: trophyEmoji,
    title: 'First Steps',
    subtitle: 'First lesson!',
    gradient: 'linear-gradient(139.603deg, #FDC700 0%, #FE9A00 100%)',
    state: 'unlocked',
  },
  {
    key: 'word-master',
    emoji: booksEmoji,
    title: 'Word Master',
    subtitle: '100 words!',
    gradient: 'linear-gradient(139.603deg, #51A2FF 0%, #615FFF 100%)',
    state: 'progress',
  },
  {
    key: 'streak-7',
    emoji: fireEmoji,
    title: '7 Day Streak',
    subtitle: '7 days in a row!',
    gradient: 'linear-gradient(139.603deg, #FF8904 0%, #FB2C36 100%)',
    state: 'progress',
  },
  {
    key: 'sharp-shooter',
    emoji: dartEmoji,
    title: 'Sharp Shooter',
    subtitle: '10 perfect!',
    gradient: 'linear-gradient(139.603deg, #05DF72 0%, #00BC7D 100%)',
    state: 'locked',
  },
  {
    key: 'king',
    emoji: crownEmoji,
    title: 'King',
    subtitle: 'Master it!',
    gradient: 'linear-gradient(139.603deg, #F0B100 0%, #F54900 100%)',
    state: 'locked',
  },
]

function StarCorner() {
  // Figma 881:274 — 20×20 yellow #FDC700 circle with white star, drop-shadow,
  // positioned half outside the card's top-right corner.
  return (
    <div
      className="absolute flex items-center justify-center rounded-full"
      style={{
        left: 129,
        top: -8,
        width: 20,
        height: 20,
        backgroundColor: '#FDC700',
        filter: 'drop-shadow(0 10px 7.5px rgba(0,0,0,0.1)) drop-shadow(0 4px 3px rgba(0,0,0,0.1))',
      }}
    >
      <img src={starCornerIcon} alt="" aria-hidden draggable={false} style={{ width: 12, height: 12 }} />
    </div>
  )
}

function BadgeCard({ badge, style }) {
  const { emoji, title, subtitle, gradient, state } = badge
  const isUnlocked = state === 'unlocked'
  const isProgress = state === 'progress'
  const isLocked = state === 'locked'

  return (
    <div
      className="absolute rounded-[16px] transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03]"
      style={{
        ...style,
        width: 141,
        height: 119.988,
        opacity: isLocked ? 0.4 : 1,
        // For 'progress', layer a 62%-grey wash over the gradient as in Figma.
        backgroundImage: isProgress
          ? `linear-gradient(90deg, rgba(208,206,206,0.62), rgba(208,206,206,0.62)), ${gradient}`
          : gradient,
        filter: 'drop-shadow(0 4px 3px rgba(0,0,0,0.1)) drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
      }}
    >
      {/* Star corner indicator on unlocked & progress badges (Figma 881:274 etc.) */}
      {(isUnlocked || isProgress) && <StarCorner />}

      {/* Card content: emoji + title + subtitle stacked at top=16 inside 109px wide column */}
      <div className="absolute text-center" style={{ left: 16, top: 16, width: 109, height: 87.988 }}>
        {/* Emoji — hidden on 'progress' state, replaced by small lock icon below */}
        {!isProgress && (
          <div
            className="absolute -translate-x-1/2 flex items-center justify-center"
            style={{ left: 54.77, top: -2, width: 60, height: 40 }}
          >
            <img src={emoji} alt="" aria-hidden draggable={false} style={{ width: 36, height: 36 }} />
          </div>
        )}
        {/* Progress-state lock chip — drops into where the emoji would be */}
        {isProgress && (
          <div
            className="absolute"
            style={{ left: 43, top: 28, width: 24, height: 24 }}
          >
            <img
              src={lockIcon}
              alt=""
              aria-hidden
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                filter: 'brightness(0) invert(1) opacity(0.6)',
              }}
            />
          </div>
        )}

        {/* Title — Inter Black 14, faded on 'progress' state */}
        <p
          className="absolute -translate-x-1/2 font-inter font-black text-center whitespace-nowrap"
          style={{
            left: 54.6,
            top: 47.8,
            fontSize: 14,
            lineHeight: '20px',
            color: isProgress ? 'rgba(255,255,255,0.27)' : '#FFFFFF',
          }}
        >
          {title}
        </p>
        {/* Subtitle — Inter Regular 12 */}
        <p
          className="absolute -translate-x-1/2 font-inter text-center"
          style={{
            left: 54.5,
            top: 72,
            width: 109,
            fontSize: 12,
            lineHeight: '16px',
            color: isProgress ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.9)',
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Locked overlay — full-card dark wash with centre lock icon */}
      {isLocked && (
        <div
          className="absolute rounded-[16px] flex items-center justify-center"
          style={{
            top: 0,
            left: 0,
            width: 141,
            height: 119.988,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          <img
            src={lockIcon}
            alt=""
            aria-hidden
            draggable={false}
            style={{ width: 24, height: 24, filter: 'brightness(0) invert(1)' }}
          />
        </div>
      )}
    </div>
  )
}

export default function Badges() {
  const navigate = useNavigate()
  const unlockedCount = BADGES.filter((b) => b.state === 'unlocked').length

  return (
    <div className="flex-1 relative overflow-hidden bg-white">

      {/* Top header tint band — Figma 881:173 (376×77 at left=-2 top=62) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 62,
          left: -2,
          width: 376,
          height: 77,
          backgroundColor: 'rgba(249,180,56,0.2)',
        }}
      />

      {/* Back nav row — Figma 881:200 (327×36 at left=34 top=83, gap=12) */}
      <div
        className="absolute flex items-center"
        style={{ top: 83, left: 34, width: 327, height: 36, gap: 12 }}
      >
        <button
          type="button"
          onClick={() => navigate('/my-account')}
          className="rounded-full flex items-center justify-center shrink-0 transition-transform duration-150 ease-out hover:scale-105 active:scale-95 cursor-pointer"
          style={{ width: 36, height: 36, backgroundColor: '#F7AE2B' }}
          aria-label="Back to My Account"
        >
          <img
            src={arrowIcon}
            alt=""
            aria-hidden
            draggable={false}
            style={{ width: 20, height: 20, transform: 'rotate(180deg)' }}
          />
        </button>
        <p
          className="font-inter font-bold whitespace-nowrap"
          style={{ fontSize: 20, lineHeight: '28px', color: '#2E4858' }}
        >
          Back
        </p>
      </div>

      {/* Header section — Figma 881:265 (🏆 + "Your Badges!" + count pill) */}
      <div className="absolute" style={{ top: 188, left: 39, width: 294 }}>
        {/* 🏆 trophy emoji centered */}
        <div
          className="absolute -translate-x-1/2 flex items-center justify-center"
          style={{ left: 147, top: -3, width: 60, height: 48 }}
        >
          <img src={trophyEmoji} alt="" aria-hidden draggable={false} style={{ width: 44, height: 44 }} />
        </div>
        {/* "Your Badges!" — Inter Black 24 #1E2939 */}
        <p
          className="absolute text-center font-inter font-black"
          style={{
            left: 0,
            top: 60,
            width: 294,
            color: '#1E2939',
            fontSize: 24,
            lineHeight: '32px',
          }}
        >
          Your Badges!
        </p>
        {/* "X / Y Unlocked" pill — gradient purple→pink, Inter Bold 14 #2E4858 */}
        <div
          className="absolute flex items-center justify-center rounded-full"
          style={{
            left: 83.18,
            top: 95.99,
            width: 127.65,
            height: 40,
            backgroundImage: 'linear-gradient(to right, #F3E8FF, #FCE7F3)',
          }}
        >
          <p
            className="font-inter font-bold text-center whitespace-nowrap"
            style={{ fontSize: 14, lineHeight: '20px', color: '#2E4858' }}
          >
            {unlockedCount} / {BADGES.length} Unlocked
          </p>
        </div>
      </div>

      {/* Badge grid — 2 columns × 3 rows, 141×120 cards at gaps ~12px.
          Outer y-offset = 188 (header start) + 169 (cards start within section) = 357.
          Adjusted per Figma's small ±5px deltas on each card. */}
      <div className="absolute" style={{ top: 357, left: 41, width: 294 }}>
        <BadgeCard badge={BADGES[0]} style={{ left: 0, top: -5.99 }} />
        <BadgeCard badge={BADGES[1]} style={{ left: 151, top: -5.98 }} />
        <BadgeCard badge={BADGES[2]} style={{ left: 0, top: 131.99 }} />
        <BadgeCard badge={BADGES[3]} style={{ left: 153, top: 129.02 }} />
        <BadgeCard badge={BADGES[4]} style={{ left: 0, top: 263.97 }} />
        <BadgeCard badge={BADGES[5]} style={{ left: 153, top: 263.97 }} />
      </div>
    </div>
  )
}
