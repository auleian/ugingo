import { Link } from 'react-router-dom'
import AccountBackHeader from '../components/AccountBackHeader'
import userIcon from '../assets/account-user.svg'
import paletteIcon from '../assets/account-palette.svg'
import badgeIcon from '../assets/account-badge.svg'
import boltIcon from '../assets/account-bolt.svg'
import { useAvatar } from '../lib/avatar'
import { useUserDisplay } from '../lib/firebase'

// One gradient card in the 2×2 grid — Figma 878:262/272/294/304
function MenuCard({ left, top, gradient, iconSrc, title, subtitle, to }) {
  return (
    <Link
      to={to}
      className="absolute block rounded-[24px] overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:shadow-[0_18px_25px_-3px_rgba(0,0,0,0.18),0_8px_10px_-4px_rgba(0,0,0,0.14)] active:translate-y-0"
      style={{
        left,
        top,
        width: 157.4,
        height: 171.988,
        backgroundImage: gradient,
      }}
    >
      {/* Inner padding pt-24 px-24 → 109.4 wide content area */}
      <div className="relative" style={{ paddingTop: 24, paddingLeft: 24, paddingRight: 24, height: 123.988 + 24 }}>
        {/* Icon circle — 64×64, bg rgba(255,255,255,0.3), shadow, centered in 109.4 inner area (offset 22.7) */}
        <div
          className="absolute flex items-center justify-center rounded-full"
          style={{
            top: 24,
            left: 24 + 22.7,
            width: 64,
            height: 64,
            backgroundColor: 'rgba(255,255,255,0.3)',
            boxShadow: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <img src={iconSrc} alt="" aria-hidden draggable={false} style={{ width: 32, height: 32 }} />
        </div>
        {/* Title — Inter Black 20 white, centered in 109.4 inner box at top=76 */}
        <p
          className="absolute text-center font-inter font-black text-white whitespace-nowrap"
          style={{
            top: 24 + 76 - 1.2,
            left: 24,
            width: 109.4,
            fontSize: 20,
            lineHeight: '28px',
          }}
        >
          {title}
        </p>
        {/* Subtitle — Inter Medium 12 white/90, centered */}
        <p
          className="absolute text-center font-inter font-medium"
          style={{
            top: 24 + 108,
            left: 24,
            width: 109.4,
            fontSize: 12,
            lineHeight: '16px',
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          {subtitle}
        </p>
      </div>
    </Link>
  )
}

export default function MyAccount({ name: nameOverride, email: emailOverride, avatarSrc }) {
  const avatar = useAvatar()
  const { name: authName, email: authEmail } = useUserDisplay()
  const name = nameOverride ?? authName ?? 'Friend'
  const email = emailOverride ?? authEmail ?? ''
  const finalAvatar = avatarSrc ?? avatar.src

  return (
    <div className="flex-1 relative overflow-hidden bg-white">

      <AccountBackHeader to="/profile" label="Back" ariaLabel="Back to profile" />

      {/* Lower tinted area — stretches full viewport */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 291,
          left: 0,
          right: 0,
          height: 521,
          backgroundColor: 'rgba(247,174,43,0.16)',
        }}
      />

      {/* 375-wide centered content frame — all positioned content sits inside */}
      <div className="relative w-[375px] max-w-full h-full mx-auto">

      {/* Avatar — Figma 881:169 (72×72 cyan at top=215, centered at x=57.5 by translate-x-1/2 + left=calc(50%-130px)) */}
      <div
        className="absolute -translate-x-1/2 flex items-center justify-center rounded-full bg-[#69CAD3]"
        style={{
          top: 142,
          left: 187.5 - 130,
          width: 72,
          height: 72,
          filter:
            'drop-shadow(0 10px 7.5px rgba(0,0,0,0.1)) drop-shadow(0 4px 3px rgba(0,0,0,0.1))',
        }}
      >
        <img
          src={finalAvatar}
          alt={`${name}'s avatar`}
          draggable={false}
          className="select-none pointer-events-none"
          style={{ width: 48, height: 48, objectFit: 'contain' }}
        />
      </div>

      {/* Name + email — Figma 878:251 (left=103 top=230) */}
      <div className="absolute" style={{ left: 103, top: 157 }}>
        <p
          className="font-inter font-black whitespace-nowrap"
          style={{ fontSize: 32, lineHeight: '36px', color: '#F16522' }}
        >
          {name}
        </p>
        <p
          className="font-inter font-black"
          style={{ fontSize: 12, lineHeight: '19px', color: '#2E4858', marginTop: 2 }}
        >
          {email}
        </p>
      </div>

      {/* MainMenu grid — Figma 878:261 (328×365 at left=23 top=392, 2×2 with 12px gap) */}
      <div className="absolute" style={{ top: 339, left: 23, width: 328, height: 365 }}>
        {/* Top-left: Profile (purple → magenta) — Figma 878:262 */}
        <MenuCard
          left={0}
          top={0}
          gradient="linear-gradient(132.464deg, #C27AFF 0%, #F6339A 100%)"
          iconSrc={userIcon}
          title="Profile"
          subtitle="Edit info"
          to="/account/profile"
        />
        {/* Top-right: Avatar (orange → red) — Figma 878:272 */}
        <MenuCard
          left={169.4}
          top={0}
          gradient="linear-gradient(132.464deg, #FF8904 0%, #FB2C36 100%)"
          iconSrc={paletteIcon}
          title="Avatar"
          subtitle="Change look"
          to="/account/avatar"
        />
        {/* Bottom-left: Progress (blue → cyan) — Figma 878:304 */}
        <MenuCard
          left={0}
          top={184}
          gradient="linear-gradient(132.464deg, #51A2FF 0%, #00B8DB 100%)"
          iconSrc={boltIcon}
          title="Progress"
          subtitle="Your stats"
          to="/account/progress"
        />
        {/* Bottom-right: Badges (yellow → orange) — Figma 878:294 */}
        <MenuCard
          left={169.4}
          top={183.99}
          gradient="linear-gradient(132.464deg, #FDC700 0%, #FE9A00 100%)"
          iconSrc={badgeIcon}
          title="Badges"
          subtitle="Trophies"
          to="/account/badges"
        />
      </div>

      </div>
    </div>
  )
}
