import { useNavigate } from 'react-router-dom'
import arrowIcon from '../assets/account-arrow.svg'
import feedbackIcon from '../assets/feedback-icon.svg'

// Shared top-of-screen chrome for /account/* sub-screens: orange tint band +
// circular back-arrow + bold label + right-aligned feedback button. MyAccount,
// EditProfile, Progress, Badges all share the same coordinates here — change
// positions in ONE place.

const TINT_TOP = 0
const TINT_HEIGHT = 77
const TINT_COLOR = 'rgba(249,180,56,0.2)'
const ROW_TOP = 30
const ARROW_BG = '#F7AE2B'
const TEXT_COLOR = '#2E4858'
const FEEDBACK_BG = '#1FB0E9'
const FEEDBACK_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdxrwXNL0-pdRVyTY7-lUuZhtBlEZBPtc3Lqj9VwiB4adSOHg/viewform?usp=sharing&ouid=117473555109988128969'

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
        className="absolute flex items-center justify-between z-10"
        style={{
          top: ROW_TOP,
          left: 'calc(50% - 163.5px)',
          width: 327,
          height: 36,
        }}
      >
        <div className="flex items-center" style={{ gap: 12 }}>
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
        <a
          href={FEEDBACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full flex items-center justify-center shrink-0 transition-transform duration-150 ease-out hover:scale-105 active:scale-95 cursor-pointer"
          style={{ width: 36, height: 36, backgroundColor: FEEDBACK_BG }}
          aria-label="Send feedback"
        >
          <img
            src={feedbackIcon}
            alt=""
            aria-hidden
            draggable={false}
            style={{ width: 16, height: 16 }}
          />
        </a>
      </div>
    </>
  )
}
