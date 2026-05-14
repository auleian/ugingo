import { Link } from 'react-router-dom'
import bgStars from '../assets/profile-bg-stars.png'
import mascotSprite from '../assets/profile-mascot-head.png'
import gearStarIcon from '../assets/profile-gear.svg'
import cardGearIcon from '../assets/profile-card-gear.svg'
import cardUserIcon from '../assets/profile-card-user.svg'
import lionEmoji from '../assets/profile-emoji-lion.png'

// Design placeholders — overridden by props (and later, by user context fed
// from email-derived name / Google profile + Settings avatar picker).
// Avatar is a static image so it renders identically across OS/browser
// (default uses Twemoji-style lion to match Figma).
const DEFAULT_NAME = 'Ameritah'
const DEFAULT_AVATAR = lionEmoji

function HeaderShape() {
  // Figma 659:279 — rounded pill 412×124 at (-19, -29), bleeds off top/sides
  return (
    <svg
      viewBox="0 0 412 124"
      fill="none"
      preserveAspectRatio="none"
      className="absolute pointer-events-none"
      style={{ top: -29, left: -19, width: 412, height: 124 }}
      aria-hidden
    >
      <path
        d="M0 47C0 21.0426 21.0426 0 47 0H365C390.957 0 412 21.0426 412 47V77C412 102.957 390.957 124 365 124H47C21.0426 124 0 102.957 0 77V47Z"
        fill="white"
      />
    </svg>
  )
}

// Sparkle decoration — 4-pointed star + 1 small accent, white at 70% opacity per Figma 878:190
function SparkleIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="white" aria-hidden>
      {/* Main 4-pointed star — Figma 878:192 takes ~83% of the box, centered */}
      <path d="M18 5 L20 14 Q20.6 16.4 23 17 L31 18 L23 19 Q20.6 19.6 20 22 L18 31 L16 22 Q15.4 19.6 13 19 L5 18 L13 17 Q15.4 16.4 16 14 Z" />
      {/* Small accent sparkle top-right — Figma 878:193 (12.5%/16.67%/70.83%/83.33%) */}
      <path d="M30 6 L30.6 8.4 L33 9 L30.6 9.6 L30 12 L29.4 9.6 L27 9 L29.4 8.4 Z" />
    </svg>
  )
}

function TrophyIcon() {
  // Yellow trophy — Figma 878:209 cluster; rotated -4.91deg in parent wrapper
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#FCD34D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {/* Cup */}
      <path d="M9 4h14v6a7 7 0 0 1-14 0V4Z" />
      {/* Side handles */}
      <path d="M9 7H5a3 3 0 0 0 0 6h4M23 7h4a3 3 0 0 1 0 6h-4" />
      {/* Stem + base */}
      <path d="M16 17v4M10 25h12M13 21h6" />
    </svg>
  )
}

export default function Profile({ name = DEFAULT_NAME, avatarSrc = DEFAULT_AVATAR }) {
  return (
    <div className="flex-1 relative overflow-hidden bg-[#0a2745]">

      {/* Starry background — Figma 534:1251 (457×812 at left=-43 top=0) */}
      <img
        src={bgStars}
        alt=""
        aria-hidden
        draggable={false}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute max-w-none object-cover pointer-events-none select-none"
        style={{ top: 0, left: -43, width: 457, height: 812 }}
      />

      {/* White header pill — Figma 659:279 */}
      <HeaderShape />

      {/* Mascot sprite cropped — Figma 659:281 (27×34 at left=13 top=55) */}
      <Link
        to="/lessons"
        aria-label="Back to lessons"
        className="absolute overflow-hidden"
        style={{ top: 55, left: 13, width: 27, height: 34 }}
      >
        <img
          src={mascotSprite}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute max-w-none select-none"
          style={{ top: '-108.5%', left: '-415.53%', width: '525.8%', height: '335.66%' }}
        />
      </Link>

      {/* Settings star/gear icon — Figma 863:232 (51×51 at left=317 top=47) */}
      <Link
        to="/settings"
        aria-label="Settings"
        className="absolute"
        style={{ top: 47, left: 317, width: 51, height: 51 }}
      >
        <img src={gearStarIcon} alt="" aria-hidden draggable={false} className="block w-full h-full" />
      </Link>

      {/* Large avatar circle — Figma 868:256 (cyan 202×202 at top=127, centered +1px) */}
      <div
        className="absolute -translate-x-1/2 flex items-center justify-center rounded-full bg-[#69CAD3]"
        style={{
          top: 127,
          left: 187.5 + 1,
          width: 202,
          height: 202,
          filter:
            'drop-shadow(0 10px 7.5px rgba(0,0,0,0.1)) drop-shadow(0 4px 3px rgba(0,0,0,0.1))',
        }}
      >
        <img
          src={avatarSrc}
          alt={`${name}'s avatar`}
          draggable={false}
          className="select-none pointer-events-none"
          style={{ width: 128, height: 128, objectFit: 'contain' }}
        />
      </div>

      {/* Name — Figma 868:259 (Inter Bold 24px #f8c83c lh 36, centered x=188 top=329-1.6) */}
      <p
        className="absolute -translate-x-1/2 font-inter font-bold text-center whitespace-nowrap"
        style={{ left: 188, top: 327.4, color: '#F8C83C', fontSize: 24, lineHeight: '36px' }}
      >
        {name}
      </p>

      {/* Settings card — Figma 878:189 (326×152, gradient 155deg, rounded-[24px], at left=24.52 top=385) */}
      <Link
        to="/settings"
        className="absolute block rounded-[24px] overflow-hidden shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_35px_-5px_rgba(0,0,0,0.18),0_12px_15px_-6px_rgba(0,0,0,0.12)] active:translate-y-0"
        style={{
          top: 385,
          left: 27 - 2.48,
          width: 326,
          height: 152,
          backgroundImage: 'linear-gradient(155.002deg, #C27AFF 0%, #FB64B6 50%, #FF8904 100%)',
        }}
      >
        {/* Sparkle decoration — Figma 878:190 (36.316×36.316 at left=275.84 top=13.84, opacity 70%) */}
        <div
          className="absolute"
          style={{ top: 13.84, left: 275.84, width: 36.316, height: 36.316, opacity: 0.7 }}
        >
          <SparkleIcon />
        </div>

        {/* Content row — Figma 878:197 (262×88 at left=32 top=32, gap=24) */}
        <div
          className="absolute flex items-center"
          style={{ top: 32, left: 32, width: 262, height: 88, gap: 24 }}
        >
          {/* Icon circle — 80×80 white/20% bg */}
          <div
            className="flex items-center justify-center rounded-full shrink-0"
            style={{
              width: 80,
              height: 80,
              backgroundColor: 'rgba(255,255,255,0.2)',
              boxShadow: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <img src={cardGearIcon} alt="" aria-hidden draggable={false} style={{ width: 40, height: 40 }} />
          </div>
          {/* Text — Inter Black 30 (Settings), Medium 16 (sub) */}
          <div className="flex flex-col" style={{ width: 158, gap: 4 }}>
            <p
              className="font-inter font-black text-white whitespace-nowrap"
              style={{ fontSize: 30, lineHeight: '36px' }}
            >
              Settings
            </p>
            <p
              className="font-inter font-medium"
              style={{ fontSize: 16, lineHeight: '24px', color: 'rgba(255,255,255,0.9)' }}
            >
              Sound, Language &amp; More
            </p>
          </div>
        </div>
      </Link>

      {/* My Account card — Figma 878:207 (326×164, gradient 153deg, at left=25 top=561) */}
      <Link
        to="/my-account"
        className="absolute block rounded-[24px] overflow-hidden shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_35px_-5px_rgba(0,0,0,0.18),0_12px_15px_-6px_rgba(0,0,0,0.12)] active:translate-y-0"
        style={{
          top: 561,
          left: 27 - 2,
          width: 326,
          height: 164,
          backgroundImage: 'linear-gradient(153.295deg, #51A2FF 0%, #00D3F3 50%, #05DF72 100%)',
        }}
      >
        {/* Trophy decoration — Figma 878:208 (32×32 rotated -4.91deg at left≈276.69 top≈7.95) */}
        <div
          className="absolute flex items-center justify-center"
          style={{ top: 7.95, left: 276.69, width: 34.623, height: 34.623 }}
        >
          <div style={{ transform: 'rotate(-4.91deg)' }}>
            <TrophyIcon />
          </div>
        </div>

        {/* Content row — Figma 878:216 (262×100 at left=32 top=32, gap=24) */}
        <div
          className="absolute flex items-center"
          style={{ top: 32, left: 32, width: 262, height: 100, gap: 24 }}
        >
          <div
            className="flex items-center justify-center rounded-full shrink-0"
            style={{
              width: 80,
              height: 80,
              backgroundColor: 'rgba(255,255,255,0.2)',
              boxShadow: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <img src={cardUserIcon} alt="" aria-hidden draggable={false} style={{ width: 40, height: 40 }} />
          </div>
          <div className="flex flex-col" style={{ width: 158, gap: 4 }}>
            <p
              className="font-inter font-black text-white"
              style={{ fontSize: 30, lineHeight: '36px' }}
            >
              My
              <br />
              Account
            </p>
            <p
              className="font-inter font-medium whitespace-nowrap"
              style={{ fontSize: 16, lineHeight: '24px', color: 'rgba(255,255,255,0.9)' }}
            >
              Stats, Profile &amp; More
            </p>
          </div>
        </div>
      </Link>

      {/* Shop button — Figma 828:128 (140×39 at top=745, centered, bg #95989a rounded-[12px]) */}
      <Link
        to="/shop"
        className="absolute -translate-x-1/2 flex items-center justify-center rounded-[12px]"
        style={{ top: 745, left: 187.5, width: 140, height: 39, backgroundColor: '#95989A' }}
      >
        <span
          className="font-opensans font-extrabold"
          style={{ fontSize: 20, color: '#D3DBE0' }}
        >
          Shop
        </span>
      </Link>
    </div>
  )
}
