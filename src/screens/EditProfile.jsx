import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import arrowIcon from '../assets/account-arrow.svg'
import pencilIcon from '../assets/account-pencil.svg'
import { useAvatar } from '../lib/avatar'

// Design placeholders — overridden by props (and later, by user context fed
// from email-derived name / Google profile). Avatar comes from the picker
// store (lib/avatar.js) so changing it on /account/avatar updates here.
const DEFAULT_NAME = 'Ameritah Nakabuye'
const DEFAULT_EMAIL = 'ameritahnakabuye@gmail.com'
const DEFAULT_PHONE = '+256 751 848 019'

// Labelled text input — Figma 869:418/423/428
function Field({ label, value, onChange, type = 'text' }) {
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
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[14px] outline-none font-inter focus:border-[#69CAD3] transition-colors"
        style={{
          height: 49.6,
          padding: '12px 16px',
          fontSize: 16,
          lineHeight: '24px',
          color: '#0A0A0A',
          border: '0.8px solid #E5E7EB',
        }}
      />
    </div>
  )
}

export default function EditProfile({
  name: initialName = DEFAULT_NAME,
  email: initialEmail = DEFAULT_EMAIL,
  phone: initialPhone = DEFAULT_PHONE,
  avatarSrc,
}) {
  const navigate = useNavigate()
  const avatar = useAvatar()
  const finalAvatar = avatarSrc ?? avatar.src
  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)
  const [phone, setPhone] = useState(initialPhone)

  const handleSave = () => {
    // TODO: when user context lands, persist {name, email, phone} to it here.
    // For now, just return to the account menu.
    navigate('/my-account')
  }

  return (
    <div className="flex-1 relative overflow-hidden bg-white">

      {/* Top header tint band — Figma 871:548 (376×77 at left=-2 top=62, #F9B438 20%) */}
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

      {/* Back nav row — Figma 870:542 (327×36 at left=34 top=83, gap=12) */}
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
          Edit Profile
        </p>
      </div>

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
        <Field label="Email" value={email} onChange={setEmail} type="email" />
        <Field label="Phone Number" value={phone} onChange={setPhone} type="tel" />
      </div>

      {/* Save Changes button — Figma 869:433 (311×56 cyan at left=29 top=690, rounded-full) */}
      <button
        type="button"
        onClick={handleSave}
        className="absolute flex items-center justify-center rounded-full transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
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
          Save Changes
        </span>
      </button>
    </div>
  )
}
