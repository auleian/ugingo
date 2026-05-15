import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUpWithEmail, signInWithGoogle, friendlyAuthError } from '../../lib/firebase'

// Google "G" logo
function GoogleIcon() {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" aria-hidden>
      <path d="M20.1 10.23c0-.68-.06-1.36-.19-2H10.5v3.79h5.41c-.23 1.24-.93 2.28-1.97 2.98v2.48h3.18c1.87-1.72 2.98-4.25 2.98-7.25z" fill="#4285F4" />
      <path d="M10.5 20.5c2.7 0 4.96-.9 6.62-2.41l-3.18-2.48c-.9.6-2.04.95-3.44.95-2.64 0-4.88-1.79-5.68-4.19H1.54v2.55C3.19 18.28 6.63 20.5 10.5 20.5z" fill="#34A853" />
      <path d="M4.82 12.37c-.21-.6-.32-1.24-.32-1.87s.11-1.27.32-1.87V6.08H1.54A9.95 9.95 0 0 0 .5 10.5c0 1.59.38 3.1 1.04 4.42l3.28-2.55z" fill="#FBBC05" />
      <path d="M10.5 4.31c1.48 0 2.81.51 3.86 1.5l2.89-2.89C15.46 1.29 13.2.5 10.5.5 6.63.5 3.19 2.72 1.54 6.08l3.28 2.55c.8-2.4 3.04-4.32 5.68-4.32z" fill="#EA4335" />
    </svg>
  )
}

// Apple logo (Figma "apple 1" is 22×21)
function AppleIcon() {
  return (
    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" aria-hidden>
      <path
        d="M17.74 11.55c-.02-2.45 2-3.63 2.1-3.7-1.15-1.68-2.93-1.91-3.56-1.93-1.51-.16-2.96.9-3.73.9-.78 0-1.97-.88-3.24-.86-1.66.03-3.2.97-4.06 2.46-1.74 3.02-.45 7.48 1.25 9.93.83 1.2 1.82 2.54 3.12 2.49 1.26-.05 1.73-.81 3.24-.81 1.51 0 1.94.81 3.25.79 1.35-.02 2.2-1.22 3.02-2.42.96-1.38 1.35-2.73 1.37-2.8-.03-.01-2.61-1-2.76-3.04z"
        fill="#1F1F1F"
      />
      <path
        d="M15.27 4.46c.69-.84 1.16-2 1.03-3.15-.99.04-2.2.66-2.9 1.49-.63.73-1.19 1.92-1.04 3.06 1.1.08 2.22-.56 2.91-1.4z"
        fill="#1F1F1F"
      />
    </svg>
  )
}

function EyeSlashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M9.85 6.15A2.62 2.62 0 0 0 8 5.38a2.62 2.62 0 0 0-2.62 2.62c0 .73.3 1.39.77 1.85M10.42 8.36a2.62 2.62 0 0 1-2.07 2.07M5.06 10.94C4 10.21 3.1 9.18 2.5 8c.6-1.18 1.5-2.21 2.56-2.94C6.12 4.33 7.04 4 8 4c.96 0 1.88.33 2.94 1.06M6.95 11.83c.34.11.69.17 1.05.17 1.94 0 3.59-1.34 4.5-3.33C12.13 7.5 11.5 6.5 10.7 5.74"
        stroke="#D2D2D2"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13.17 2.83L2.83 13.17" stroke="#D2D2D2" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function ArrowDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 10.27c-.4 0-.79-.15-1.09-.45L3.31 6.22a.51.51 0 0 1 0-.72.51.51 0 0 1 .72 0l3.6 3.6c.21.21.55.21.76 0l3.6-3.6a.51.51 0 0 1 .72 0 .51.51 0 0 1 0 .72l-3.6 3.6c-.3.3-.7.45-1.09.45z"
        fill="#1F1F1F"
      />
    </svg>
  )
}

// Simple SVG flags — sized to Figma FLAG (23.717×17.788, rounded-[2px])
function FlagSvg({ children, ratio = '60 30', style }) {
  return (
    <svg
      viewBox={`0 0 ${ratio.split(' ')[0]} ${ratio.split(' ')[1]}`}
      preserveAspectRatio="none"
      style={{ width: 23.717, height: 17.788, borderRadius: 2, display: 'block', overflow: 'hidden', ...style }}
      aria-hidden
    >
      {children}
    </svg>
  )
}

function UKFlag() {
  return (
    <FlagSvg>
      <rect width="60" height="30" fill="#012169" />
      <line x1="0" y1="0" x2="60" y2="30" stroke="#FFFFFF" strokeWidth="6" />
      <line x1="60" y1="0" x2="0" y2="30" stroke="#FFFFFF" strokeWidth="6" />
      <line x1="0" y1="0" x2="60" y2="30" stroke="#C8102E" strokeWidth="2" />
      <line x1="60" y1="0" x2="0" y2="30" stroke="#C8102E" strokeWidth="2" />
      <rect x="25" y="0" width="10" height="30" fill="#FFFFFF" />
      <rect x="0" y="10" width="60" height="10" fill="#FFFFFF" />
      <rect x="27" y="0" width="6" height="30" fill="#C8102E" />
      <rect x="0" y="12" width="60" height="6" fill="#C8102E" />
    </FlagSvg>
  )
}

function USFlag() {
  return (
    <FlagSvg>
      {Array.from({ length: 13 }).map((_, i) => (
        <rect key={i} x="0" y={(i * 30) / 13} width="60" height={30 / 13} fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'} />
      ))}
      <rect x="0" y="0" width="24" height={(7 * 30) / 13} fill="#3C3B6E" />
    </FlagSvg>
  )
}

function UgandaFlag() {
  return (
    <FlagSvg>
      <rect x="0" y="0" width="60" height="5" fill="#000000" />
      <rect x="0" y="5" width="60" height="5" fill="#FCDC04" />
      <rect x="0" y="10" width="60" height="5" fill="#D90000" />
      <rect x="0" y="15" width="60" height="5" fill="#000000" />
      <rect x="0" y="20" width="60" height="5" fill="#FCDC04" />
      <rect x="0" y="25" width="60" height="5" fill="#D90000" />
      <circle cx="30" cy="15" r="4" fill="#FFFFFF" />
    </FlagSvg>
  )
}

function KenyaFlag() {
  return (
    <FlagSvg>
      <rect x="0" y="0" width="60" height="10" fill="#000000" />
      <rect x="0" y="10" width="60" height="10" fill="#BB0000" />
      <rect x="0" y="20" width="60" height="10" fill="#006600" />
      <rect x="0" y="9" width="60" height="1" fill="#FFFFFF" />
      <rect x="0" y="20" width="60" height="1" fill="#FFFFFF" />
      <ellipse cx="30" cy="15" rx="4" ry="6" fill="#BB0000" stroke="#FFFFFF" strokeWidth="0.6" />
    </FlagSvg>
  )
}

function TanzaniaFlag() {
  return (
    <FlagSvg>
      <polygon points="0,0 60,0 0,30" fill="#1EB53A" />
      <polygon points="60,0 60,30 0,30" fill="#00A3DD" />
      <polygon points="0,30 60,0 60,6 6,30" fill="#FCDC04" />
      <polygon points="0,24 54,0 60,0 60,6 6,30 0,30" fill="#000000" />
      <polygon points="0,30 60,0 60,3 3,30" fill="#FCDC04" />
    </FlagSvg>
  )
}

function RwandaFlag() {
  return (
    <FlagSvg>
      <rect x="0" y="0" width="60" height="15" fill="#00A1DE" />
      <rect x="0" y="15" width="60" height="8" fill="#FAD201" />
      <rect x="0" y="23" width="60" height="7" fill="#20603D" />
      <circle cx="46" cy="9" r="3" fill="#E5BE01" />
    </FlagSvg>
  )
}

function NigeriaFlag() {
  return (
    <FlagSvg>
      <rect x="0" y="0" width="20" height="30" fill="#008751" />
      <rect x="20" y="0" width="20" height="30" fill="#FFFFFF" />
      <rect x="40" y="0" width="20" height="30" fill="#008751" />
    </FlagSvg>
  )
}

function SAFlag() {
  return (
    <FlagSvg>
      <rect x="0" y="0" width="60" height="15" fill="#E03C31" />
      <rect x="0" y="15" width="60" height="15" fill="#002395" />
      <polygon points="0,0 30,15 0,30" fill="#007749" />
      <polygon points="0,0 24,12 60,12 60,18 24,18 0,30 0,24 18,15 0,6" fill="#FFFFFF" />
      <polygon points="0,0 22,11 60,11 60,19 22,19 0,30 0,26 16,15 0,4" fill="#000000" />
      <polygon points="0,4 16,15 0,26" fill="#FFB81C" />
    </FlagSvg>
  )
}

const COUNTRIES = [
  { code: 'GB', name: 'United Kingdom', dial: '+44', Flag: UKFlag },
  { code: 'US', name: 'United States', dial: '+1', Flag: USFlag },
  { code: 'UG', name: 'Uganda', dial: '+256', Flag: UgandaFlag },
  { code: 'KE', name: 'Kenya', dial: '+254', Flag: KenyaFlag },
  { code: 'TZ', name: 'Tanzania', dial: '+255', Flag: TanzaniaFlag },
  { code: 'RW', name: 'Rwanda', dial: '+250', Flag: RwandaFlag },
  { code: 'ZA', name: 'South Africa', dial: '+27', Flag: SAFlag },
  { code: 'NG', name: 'Nigeria', dial: '+234', Flag: NigeriaFlag },
]

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false)
  const [country, setCountry] = useState(COUNTRIES[0])
  const [pickerOpen, setPickerOpen] = useState(false)
  const pickerRef = useRef(null)
  const navigate = useNavigate()
  // Auth state — controlled inputs, inline error, submission lock.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSignUp() {
    if (busy) return
    setError('')
    if (!email.trim() || !password) {
      setError('Please enter your email and a password.')
      return
    }
    setBusy(true)
    try {
      await signUpWithEmail({ email: email.trim(), password })
      navigate('/welcome-user')
    } catch (err) {
      setError(friendlyAuthError(err))
      setBusy(false)
    }
  }

  async function handleGoogle() {
    if (busy) return
    setError('')
    setBusy(true)
    try {
      await signInWithGoogle()
      navigate('/welcome-user')
    } catch (err) {
      setError(friendlyAuthError(err))
      setBusy(false)
    }
  }

  // Close on outside click or Escape
  useEffect(() => {
    if (!pickerOpen) return
    const onClick = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) setPickerOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setPickerOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [pickerOpen])

  const SelectedFlag = country.Flag

  return (
    <div className="flex-1 relative overflow-hidden bg-white">

      {/* Title — Figma 829:432 (left=33 top=172, Raleway Bold 50px lh=54 tracking -0.5px #202020) */}
      <h1
        className="absolute font-raleway font-bold whitespace-nowrap"
        style={{
          left: 33,
          top: 42,
          color: '#202020',
          fontSize: 50,
          lineHeight: '54px',
          letterSpacing: '-0.5px',
        }}
      >
        <span className="block">Create&nbsp;</span>
        <span className="block">Account</span>
      </h1>

      {/* Email — Form 829:435 (335×52.375, rounded-[60px], bg #f8f8f8, padding 15.811 19.764) */}
      <div
        className="absolute bg-[#F8F8F8] flex items-center rounded-[60px]"
        style={{
          top: 179,
          left: 20,
          width: 335,
          height: 52.375,
          paddingLeft: 19.764,
          paddingRight: 19.764,
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="flex-1 min-w-0 bg-transparent font-poppins font-medium outline-none placeholder:text-[#D2D2D2] placeholder:font-poppins placeholder:font-medium"
          style={{ fontSize: 13.83, lineHeight: 1.4, color: '#1F1F1F' }}
        />
      </div>

      {/* Password — Form 829:436 */}
      <div
        className="absolute bg-[#F8F8F8] flex items-center rounded-[60px]"
        style={{
          top: 179 + 52.375 + 7.906,
          left: 20,
          width: 335,
          height: 52.375,
          paddingLeft: 19.764,
          paddingRight: 19.764,
          gap: 9.882,
        }}
      >
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          onKeyDown={(e) => { if (e.key === 'Enter') handleSignUp() }}
          className="flex-1 min-w-0 bg-transparent font-poppins font-medium outline-none placeholder:text-[#D2D2D2] placeholder:font-poppins placeholder:font-medium"
          style={{ fontSize: 13.83, lineHeight: 1.4, color: '#1F1F1F' }}
        />
        <button
          type="button"
          onClick={() => setShowPassword((p) => !p)}
          className="flex items-center justify-center"
          style={{ width: 15.811, height: 15.811 }}
          aria-label="Toggle password visibility"
        >
          <EyeSlashIcon />
        </button>
      </div>

      {/* Phone — Form 829:437 with country picker */}
      <div
        className="absolute bg-[#F8F8F8] flex items-center rounded-[60px]"
        style={{
          top: 179 + (52.375 + 7.906) * 2,
          left: 20,
          width: 335,
          height: 55.339,
          paddingLeft: 19.764,
          paddingRight: 19.764,
          gap: 15.811,
        }}
      >
        {/* Country picker trigger — flag + arrow */}
        <div ref={pickerRef} className="relative">
          <button
            type="button"
            onClick={() => setPickerOpen((o) => !o)}
            className="flex items-center"
            style={{ gap: 7.906 }}
            aria-label={`Country code: ${country.name} ${country.dial}`}
            aria-expanded={pickerOpen}
          >
            <SelectedFlag />
            <div style={{ width: 15.811, height: 15.811 }} className="flex items-center justify-center">
              <ArrowDownIcon />
            </div>
          </button>

          {/* Dropdown */}
          {pickerOpen && (
            <div
              role="listbox"
              className="absolute z-20 bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] ring-1 ring-black/5 overflow-hidden"
              style={{ top: 38, left: -8, width: 240, maxHeight: 240, overflowY: 'auto' }}
            >
              {COUNTRIES.map((c) => {
                const Flag = c.Flag
                const selected = c.code === country.code
                return (
                  <button
                    key={c.code}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      setCountry(c)
                      setPickerOpen(false)
                    }}
                    className={
                      'w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#F5F7FA] ' +
                      (selected ? 'bg-[#FBFCFE]' : '')
                    }
                  >
                    <Flag />
                    <span className="flex-1 font-poppins font-medium text-[13px] text-[#1F1F1F] truncate">
                      {c.name}
                    </span>
                    <span className="font-poppins font-medium text-[13px] text-[#9CA3AF]">
                      {c.dial}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Vertical divider */}
        <div style={{ width: 1, height: 23.717, background: '#E5E5E5' }} />

        <input
          type="tel"
          placeholder="Your number"
          className="flex-1 min-w-0 bg-transparent font-poppins font-medium outline-none placeholder:text-[#D2D2D2] placeholder:font-poppins placeholder:font-medium"
          style={{ fontSize: 13.83, lineHeight: 1.4, color: '#1F1F1F' }}
        />
      </div>

      {/* Sign Up button — Figma 829:429 (this is a create-account form, so CTA = Sign Up) */}
      <button
        type="button"
        onClick={handleSignUp}
        disabled={busy}
        className="absolute flex items-center justify-center rounded-[16px] overflow-hidden disabled:opacity-60"
        style={{ top: 369, left: 20, width: 335, height: 61, backgroundColor: '#F7AE2B' }}
      >
        <span
          className="font-nunito font-light text-center whitespace-nowrap"
          style={{ color: '#F3F3F3', fontSize: 22, lineHeight: '31px' }}
        >
          {busy ? 'Signing up…' : 'Sign Up'}
        </span>
      </button>

      {/* Inline auth error — sits just under the Sign Up button so it doesn't
          shift any of the pixel-positioned layout below. */}
      {error && (
        <p
          className="absolute text-center font-poppins"
          style={{ top: 432, left: 20, width: 335, fontSize: 12, lineHeight: '14px', color: '#DC2626' }}
        >
          {error}
        </p>
      )}

      {/* OR divider — Figma 829:446 */}
      <div className="absolute" style={{ top: 446, left: 24, width: 325, height: 26 }}>
        <div
          className="absolute"
          style={{
            top: 12,
            left: 0,
            width: 325,
            height: 1,
            background: '#202020',
            opacity: 0.25,
            transform: 'rotate(0.78deg)',
            transformOrigin: 'left center',
          }}
        />
        <p
          className="absolute -translate-x-1/2 bg-white font-nunito font-light text-center"
          style={{
            left: 186 - 24,
            top: 0,
            paddingLeft: 6,
            paddingRight: 6,
            color: '#202020',
            opacity: 0.9,
            fontSize: 15,
            lineHeight: '26px',
          }}
        >
          OR
        </p>
      </div>

      {/* Continue with Google — Figma 829:438 */}
      <button
        type="button"
        onClick={handleGoogle}
        disabled={busy}
        className="absolute disabled:opacity-60"
        style={{ top: 486, left: 33, width: 318, height: 39 }}
      >
        <div className="absolute bg-[#F8F8F8] rounded-[60px]" style={{ left: 22, top: 0, width: 250, height: 39 }} />
        <div className="absolute" style={{ left: 40, top: 9, width: 21, height: 20 }}>
          <GoogleIcon />
        </div>
        <p
          className="absolute -translate-x-1/2 font-poppins font-medium text-center whitespace-nowrap"
          style={{ left: 159, top: 10, color: '#D2D2D2', fontSize: 13.794, lineHeight: 1.4 }}
        >
          CONTINUE WITH GOOGLE
        </p>
      </button>

      {/* Continue with Apple — Figma 829:442 */}
      <div className="absolute" style={{ top: 537, left: 33, width: 318, height: 39 }}>
        <div className="absolute bg-[#F8F8F8] rounded-[60px]" style={{ left: 22, top: 0, width: 250, height: 39 }} />
        <div className="absolute" style={{ left: 40, top: 9, width: 22, height: 21 }}>
          <AppleIcon />
        </div>
        <p
          className="absolute -translate-x-1/2 font-poppins font-medium text-center whitespace-nowrap"
          style={{ left: 159, top: 11, color: '#D2D2D2', fontSize: 13.794, lineHeight: 1.4 }}
        >
          CONTINUE WITH APPLE
        </p>
      </div>

      {/* Have an account? Sign in — improvised: links to /sign-in (to be built) */}
      <p
        className="absolute left-0 right-0 text-center font-poppins font-medium whitespace-nowrap"
        style={{ top: 598, fontSize: 13, lineHeight: '20px', color: '#9CA3AF' }}
      >
        Have an account?{' '}
        <Link to="/sign-in" className="font-poppins font-semibold text-[#F16522] hover:underline">
          Sign in
        </Link>
      </p>

      {/* Bottom bar — Figma 829:450 */}
      <div
        className="absolute bg-black"
        style={{ top: 798, left: 121, width: 134, height: 5, borderRadius: 34 }}
      />
    </div>
  )
}
