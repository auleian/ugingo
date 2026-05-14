import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmail, signInWithGoogle, sendResetEmail, friendlyAuthError } from '../../lib/firebase'

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

function HeartIcon() {
  return (
    <svg width="16" height="15" viewBox="0 0 24 22" fill="none" aria-hidden>
      <path
        d="M12 20.35l-1.45-1.32C5.4 14.36 2 11.28 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.78-3.4 6.86-8.55 11.54L12 20.35z"
        fill="#202020"
      />
    </svg>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleLogin() {
    if (busy) return
    setError('')
    setInfo('')
    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }
    setBusy(true)
    try {
      await signInWithEmail({ email: email.trim(), password })
      navigate('/home')
    } catch (err) {
      setError(friendlyAuthError(err))
      setBusy(false)
    }
  }

  async function handleGoogle() {
    if (busy) return
    setError('')
    setInfo('')
    setBusy(true)
    try {
      await signInWithGoogle()
      navigate('/home')
    } catch (err) {
      setError(friendlyAuthError(err))
      setBusy(false)
    }
  }

  async function handleForgot(e) {
    e.preventDefault()
    setError('')
    setInfo('')
    if (!email.trim()) {
      setError('Enter your email above first, then tap Forgot Password?')
      return
    }
    try {
      await sendResetEmail(email.trim())
      setInfo('Password reset email sent. Check your inbox.')
    } catch (err) {
      setError(friendlyAuthError(err))
    }
  }

  return (
    <div className="flex-1 relative overflow-hidden bg-white">

      {/* Title "Login" — Figma 829:366 (left=28 top=183, Raleway Bold 52px tracking -0.52px #202020) */}
      <h1
        className="absolute font-raleway font-bold whitespace-nowrap"
        style={{
          left: 28,
          top: 183,
          color: '#202020',
          fontSize: 52,
          lineHeight: 'normal',
          letterSpacing: '-0.52px',
        }}
      >
        Login
      </h1>

      {/* Subtitle "Good to see you back!" — Figma 829:364
          left=28 (7.47%), top=calc(50%-158)=248, Nunito Sans Light 19px lh=35 #202020 */}
      <p
        className="absolute font-nunito font-light whitespace-nowrap"
        style={{
          left: 28,
          top: 248,
          color: '#202020',
          fontSize: 19,
          lineHeight: '35px',
        }}
      >
        Good to see you back!
      </p>

      {/* Heart icon — Figma 829:365 (16×15 at left=217 top=257) */}
      <div className="absolute" style={{ left: 217, top: 257, width: 16, height: 15 }}>
        <HeartIcon />
      </div>

      {/* Email — Figma 829:369 (left=19 top=328 w=334 h=52.218, rounded-[60px] bg-#f8f8f8) */}
      <div
        className="absolute bg-[#F8F8F8] flex items-center rounded-[60px]"
        style={{
          top: 328,
          left: 19,
          width: 334,
          height: 52.218,
          paddingLeft: 19.705,
          paddingRight: 19.705,
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="flex-1 min-w-0 bg-transparent font-poppins font-medium outline-none placeholder:text-[#D2D2D2] placeholder:font-poppins placeholder:font-medium"
          style={{ fontSize: 13.79, lineHeight: 1.4, color: '#1F1F1F' }}
        />
      </div>

      {/* Password — Figma 829:367 (left=19 top=396.08 w=334 h=52.218) */}
      <div
        className="absolute bg-[#F8F8F8] flex items-center rounded-[60px]"
        style={{
          top: 396.08,
          left: 19,
          width: 334,
          height: 52.218,
          paddingLeft: 19.705,
          paddingRight: 19.705,
        }}
      >
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          onKeyDown={(e) => { if (e.key === 'Enter') handleLogin() }}
          className="flex-1 min-w-0 bg-transparent font-poppins font-medium outline-none placeholder:text-[#D2D2D2] placeholder:font-poppins placeholder:font-medium"
          style={{ fontSize: 13.79, lineHeight: 1.4, color: '#1F1F1F' }}
        />
      </div>

      {/* Forgot Password? — Figma 829:368 (centered at left=184, top=457, Poppins Medium 13.794px #d2d2d2)
          Now sends a real password-reset email via Firebase when the email
          input above is filled. */}
      <button
        type="button"
        onClick={handleForgot}
        className="absolute -translate-x-1/2 font-poppins font-medium text-center hover:text-[#F16522] transition-colors cursor-pointer"
        style={{
          left: 184,
          top: 457,
          color: '#D2D2D2',
          fontSize: 13.794,
          lineHeight: 1.4,
        }}
      >
        Forgot Password?
      </button>

      {/* Login button — Figma 829:370 (left=20 top=503 335×61, rounded-[16px] bg-#f7ae2b)
          (centered: left-1/2 -translate-x-1/2 in 375 frame → left=20) */}
      <button
        type="button"
        onClick={handleLogin}
        disabled={busy}
        className="absolute flex items-center justify-center rounded-[16px] overflow-hidden disabled:opacity-60"
        style={{ top: 503, left: 20, width: 335, height: 61, backgroundColor: '#F7AE2B' }}
      >
        <span
          className="font-nunito font-light text-center whitespace-nowrap"
          style={{ color: '#F3F3F3', fontSize: 22, lineHeight: '31px' }}
        >
          {busy ? 'Signing in…' : 'Login'}
        </span>
      </button>

      {/* Inline auth status — error or success-info message. */}
      {(error || info) && (
        <p
          className="absolute text-center font-poppins"
          style={{
            top: 565,
            left: 20,
            width: 335,
            fontSize: 12,
            lineHeight: '14px',
            color: error ? '#DC2626' : '#16A34A',
          }}
        >
          {error || info}
        </p>
      )}

      {/* OR divider — Figma 829:379 (left=26 top=577 325×26) */}
      <div className="absolute" style={{ top: 577, left: 26, width: 325, height: 26 }}>
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
            left: 188 - 26,
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

      {/* Login with Google — Figma 829:371 (group at left=35 top=617 318×39) */}
      <button
        type="button"
        onClick={handleGoogle}
        disabled={busy}
        className="absolute disabled:opacity-60"
        style={{ top: 617, left: 35, width: 318, height: 39 }}
      >
        <div className="absolute bg-[#F8F8F8] rounded-[60px]" style={{ left: 22, top: 0, width: 250, height: 39 }} />
        <div className="absolute" style={{ left: 40, top: 9, width: 21, height: 20 }}>
          <GoogleIcon />
        </div>
        <p
          className="absolute -translate-x-1/2 font-poppins font-medium text-center whitespace-nowrap"
          style={{ left: 159, top: 10, color: '#D2D2D2', fontSize: 13.794, lineHeight: 1.4 }}
        >
          LOGIN WITH GOOGLE
        </p>
      </button>

      {/* Login with Apple — Figma 829:375 (group at left=35 top=668 318×39) */}
      <div className="absolute" style={{ top: 668, left: 35, width: 318, height: 39 }}>
        <div className="absolute bg-[#F8F8F8] rounded-[60px]" style={{ left: 22, top: 0, width: 250, height: 39 }} />
        <div className="absolute" style={{ left: 40, top: 9, width: 22, height: 21 }}>
          <AppleIcon />
        </div>
        <p
          className="absolute -translate-x-1/2 font-poppins font-medium text-center whitespace-nowrap"
          style={{ left: 159, top: 11, color: '#D2D2D2', fontSize: 13.794, lineHeight: 1.4 }}
        >
          LOGIN WITH APPLE
        </p>
      </div>

      {/* Don't have an account? Sign up — improvised reverse link to /create-account */}
      <p
        className="absolute left-0 right-0 text-center font-poppins font-medium whitespace-nowrap"
        style={{ top: 728, fontSize: 13, lineHeight: '20px', color: '#9CA3AF' }}
      >
        Don&apos;t have an account?{' '}
        <Link to="/create-account" className="font-poppins font-semibold text-[#F16522] hover:underline">
          Sign up
        </Link>
      </p>

      {/* Bottom bar — Figma 829:383 (left=121 top=798 134×5 bg-black rounded-[34px]) */}
      <div
        className="absolute bg-black"
        style={{ top: 798, left: 121, width: 134, height: 5, borderRadius: 34 }}
      />
    </div>
  )
}
