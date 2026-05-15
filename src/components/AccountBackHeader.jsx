import { useNavigate } from 'react-router-dom'
import arrowIcon from '../assets/account-arrow.svg'

// Shared top-of-screen chrome for /account/* sub-screens: orange tint band +
// circular back-arrow + bold label. MyAccount, EditProfile, Progress, Badges
// all share the same coordinates here — change positions in ONE place.

const TINT_TOP = 9
const TINT_HEIGHT = 77
const TINT_COLOR = 'rgba(249,180,56,0.2)'
const ROW_TOP = 30
const ARROW_BG = '#F7AE2B'
const TEXT_COLOR = '#2E4858'

export default function AccountBackHeader({ to = '/my-account', label = 'Back', ariaLabel }) {
  const navigate = useNavigate()
  return (
    <>
      <div
        className="absolute pointer-events-none"
        style={{
          top: TINT_TOP,
          left: 0,
          right: 0,
          height: TINT_HEIGHT,
          backgroundColor: TINT_COLOR,
        }}
      />
      <div
        className="absolute flex items-center"
        style={{
          top: ROW_TOP,
          left: 'calc(50% - 153px)',
          width: 327,
          height: 36,
          gap: 12,
        }}
      >
        <button
          type="button"
          onClick={() => navigate(to)}
          className="rounded-full flex items-center justify-center shrink-0 transition-transform duration-150 ease-out hover:scale-105 active:scale-95 cursor-pointer"
          style={{ width: 36, height: 36, backgroundColor: ARROW_BG }}
          aria-label={ariaLabel ?? `Back to ${to}`}
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
          style={{ fontSize: 20, lineHeight: '28px', color: TEXT_COLOR }}
        >
          {label}
        </p>
      </div>
    </>
  )
}
