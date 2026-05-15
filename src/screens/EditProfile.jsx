import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AccountBackHeader from '../components/AccountBackHeader'
import pencilIcon from '../assets/account-pencil.svg'
import { useAvatar } from '../lib/avatar'
import { useUserDisplay, updateDisplayName } from '../lib/firebase'

// Phone has no Firebase Auth field for email-password users — it'd need
// Firestore. For now it lives only in this screen's local state; gets reset
// on each visit. Deferred until the Firestore scope.
const DEFAULT_PHONE = ''

// Labelled text input — Figma 869:418/423/428
function Field({ label, value, onChange, type = 'text', readOnly = false }) {
  return (
    <div className="flex flex-col w-full" style={{ gap: 8, height: 77.6 }}>
      <label
        className="font-inter font-medium whitespace-nowrap"
        style={{ fontSize: 14, lineHeight: '20px', color: '#364153' }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={readOnly ? undefined : (e) => onChange(e.target.value)}
        readOnly={readOnly}
        className="w-full rounded-[14px] outline-none font-inter focus:border-[#69CAD3] transition-colors"
        style={{
          height: 49.6,
          padding: '12px 16px',
          fontSize: 16,
          lineHeight: '24px',
          color: readOnly ? '#6B7280' : '#0A0A0A',
          backgroundColor: readOnly ? '#F9FAFB' : '#FFFFFF',
          border: '0.8px solid #E5E7EB',
        }}
      />
    </div>
  )
}

export default function EditProfile({ avatarSrc }) {
  const navigate = useNavigate()
  const avatar = useAvatar()
  const finalAvatar = avatarSrc ?? avatar.src
  const { name: authName, email: authEmail } = useUserDisplay()

  // Initialise from auth on first mount; user can then edit. The full email
  // is read-only display — changing the Firebase auth email needs
  // re-authentication and verification, which is out of scope tonight.
  const [name, setName] = useState(authName || '')
  const [email] = useState(authEmail || '')
  const [phone, setPhone] = useState(DEFAULT_PHONE)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (busy) return
    setError('')
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Please enter your name.')
      return
    }
    setBusy(true)
    try {
      await updateDisplayName(trimmed)
      navigate('/my-account')
    } catch (err) {
      setError(err?.message || 'Could not save. Try again.')
      setBusy(false)
    }
  }

  return (
    <div className="flex-1 relative overflow-hidden bg-white">

      <AccountBackHeader to="/my-account" label="Edit Profile" ariaLabel="Back to My Account" />

      {/* 375-wide centered content frame */}
      <div className="relative w-[375px] max-w-full h-full mx-auto">

      {/* Avatar circle — Figma 869:519 (128×128 cyan #69CAD3 at left=112 top=209) */}
      <div
        className="absolute flex items-center justify-center rounded-full bg-[#69CAD3]"
        style={{
          top: 209,
          left: 112,
          width: 128,
          height: 128,
          filter:
            'drop-shadow(0 10px 7.5px rgba(0,0,0,0.1)) drop-shadow(0 4px 3px rgba(0,0,0,0.1))',
        }}
      >
        <img
          src={finalAvatar}
          alt={`${name}'s avatar`}
          draggable={false}
          className="select-none pointer-events-none"
          style={{ width: 88, height: 88, objectFit: 'contain' }}
        />
      </div>

      {/* Edit pencil chip — Figma 869:539 (32×32 white at left=206.48 top=305, opens avatar picker) */}
      <button
        type="button"
        onClick={() => navigate('/account/avatar')}
        className="absolute rounded-full bg-white flex items-center justify-center transition-transform duration-150 ease-out hover:scale-110 active:scale-95 cursor-pointer"
        style={{
          top: 305,
          left: 206.48,
          width: 32,
          height: 32,
          filter:
            'drop-shadow(0 10px 7.5px rgba(0,0,0,0.1)) drop-shadow(0 4px 3px rgba(0,0,0,0.1))',
        }}
        aria-label="Change avatar"
      >
        <img src={pencilIcon} alt="" aria-hidden draggable={false} style={{ width: 16, height: 16 }} />
      </button>

      {/* Form — Figma 869:417 (311×264.8 at left=32 top=374, gap=16) */}
      <div
        className="absolute flex flex-col"
        style={{ top: 374, left: 32, width: 311, height: 264.8, gap: 16 }}
      >
        <Field label="Full Name" value={name} onChange={setName} />
        <Field label="Email" value={email} type="email" readOnly />
        <Field label="Phone Number" value={phone} onChange={setPhone} type="tel" />
      </div>

      {/* Inline status — auth error if save fails. */}
      {error && (
        <p
          className="absolute text-center font-poppins"
          style={{ top: 654, left: 29, width: 311, fontSize: 12, lineHeight: '14px', color: '#DC2626' }}
        >
          {error}
        </p>
      )}

      {/* Save Changes button — Figma 869:433 (311×56 cyan at left=29 top=690, rounded-full) */}
      <button
        type="button"
        onClick={handleSave}
        disabled={busy}
        className="absolute flex items-center justify-center rounded-full transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-60"
        style={{
          top: 690,
          left: 29,
          width: 311,
          height: 56,
          backgroundColor: '#69CAD3',
          filter:
            'drop-shadow(0 10px 7.5px rgba(0,0,0,0.1)) drop-shadow(0 4px 3px rgba(0,0,0,0.1))',
        }}
      >
        <span
          className="font-inter font-bold text-white text-center whitespace-nowrap"
          style={{ fontSize: 16, lineHeight: '24px' }}
        >
          {busy ? 'Saving…' : 'Save Changes'}
        </span>
      </button>

      </div>
    </div>
  )
}
