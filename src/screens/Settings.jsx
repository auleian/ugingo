import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import mascotSprite from '../assets/profile-mascot-head.png'
import avatarRing from '../assets/settings-avatar-ring.svg'
import volumeMutedIcon from '../assets/settings-volume.svg'
import musicIcon from '../assets/settings-music.svg'
import sparklesIcon from '../assets/settings-sparkles.svg'
import bellIcon from '../assets/settings-bell.svg'
import logoutIcon from '../assets/settings-logout.svg'
import chevronIcon from '../assets/settings-chevron.svg'
import {
  useMusicEnabled,
  setMusicEnabled,
  useSoundsEnabled,
  setSoundsEnabled,
  useVolume,
  setVolume,
  playTap,
} from '../lib/sound'
import { signOut, useUserDisplay } from '../lib/firebase'

// Speaker-with-waves icon — same stroke style as settings-volume.svg (the
// muted variant), used when master audio is ON.
function VolumeOnIcon() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" aria-hidden>
      <path
        d="M14.6667 6.26933C14.6664 6.08362 14.6111 5.90214 14.5078 5.74781C14.4045 5.59348 14.2578 5.4732 14.0862 5.40217C13.9146 5.33114 13.7258 5.31252 13.5437 5.34868C13.3615 5.38484 13.1941 5.47415 13.0627 5.60533L8.55067 10.116C8.37654 10.2912 8.16938 10.43 7.94119 10.5246C7.713 10.6191 7.46832 10.6674 7.22133 10.6667H4C3.64638 10.6667 3.30724 10.8071 3.05719 11.0572C2.80714 11.3072 2.66667 11.6464 2.66667 12V20C2.66667 20.3536 2.80714 20.6928 3.05719 20.9428C3.30724 21.1929 3.64638 21.3333 4 21.3333H7.22133C7.46832 21.3326 7.713 21.3809 7.94119 21.4754C8.16938 21.57 8.37654 21.7088 8.55067 21.884L13.0613 26.396C13.1928 26.5277 13.3604 26.6175 13.5429 26.6538C13.7254 26.6902 13.9146 26.6716 14.0866 26.6003C14.2585 26.5291 14.4054 26.4084 14.5087 26.2536C14.6119 26.0988 14.6669 25.9168 14.6667 25.7307V6.26933Z"
        stroke="white"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 10.6667C21.4145 12.0812 22.2089 13.9999 22.2089 16C22.2089 18.0001 21.4145 19.9188 20 21.3333"
        stroke="white"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.6667 6C27.4853 8.81862 29.0686 12.6403 29.0686 16.625C29.0686 20.6097 27.4853 24.4314 24.6667 27.25"
        stroke="white"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Reused from Profile.jsx — Figma 659:279 / 861:598 white pill chrome at top
function HeaderShape() {
  return (
    <svg
      viewBox="0 0 412 124"
      fill="none"
      preserveAspectRatio="none"
      className="absolute pointer-events-none"
      style={{
        top: -71,
        left: -19,
        width: 412,
        height: 124,
        filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.25))',
      }}
      aria-hidden
    >
      <path d="M0 0H412V124H0Z" fill="white" />
    </svg>
  )
}

// Toggle switch — Figma 863:181 etc. (48×27, thumb 24×24, off-bg #CBCED4, on-bg accent)
function Toggle({ on, onClick, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className="relative flex items-center rounded-full transition-colors duration-200 cursor-pointer"
      style={{
        width: 48,
        height: 27,
        padding: 1.2,
        backgroundColor: on ? '#F16522' : '#CBCED4',
      }}
    >
      <span
        className="block bg-white rounded-full shadow-sm transition-transform duration-200"
        style={{
          width: 24,
          height: 24,
          transform: on ? 'translateX(21px)' : 'translateX(0)',
        }}
      />
    </button>
  )
}

// One settings card with gradient bg, icon tile, title, subtitle, toggle
function SettingsCard({ top, height, gradient, iconBg, iconSrc, iconBoxSize, title, subtitle, on, onToggle }) {
  return (
    <div
      className="absolute rounded-[16px] overflow-hidden"
      style={{
        top,
        left: 17,
        width: 337,
        height,
        backgroundImage: gradient,
        filter: 'drop-shadow(0 4px 2px rgba(0,0,0,0.11))',
      }}
    >
      <div className="absolute flex items-center" style={{ top: 24, left: 24, gap: 16, height: height - 48 }}>
        {/* Icon tile */}
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: iconBoxSize?.w ?? 56,
            height: iconBoxSize?.h ?? 56,
            backgroundColor: iconBg,
            borderRadius: 14,
          }}
        >
          <img src={iconSrc} alt="" aria-hidden draggable={false} style={{ width: 28, height: 28 }} />
        </div>
        {/* Text stack */}
        <div className="flex flex-col">
          <p
            className="font-inter font-bold whitespace-nowrap"
            style={{ fontSize: 24, lineHeight: '32px', color: '#1E2939' }}
          >
            {title}
          </p>
          <p
            className="font-inter"
            style={{ fontSize: 18, lineHeight: '28px', color: '#6A7282' }}
          >
            {subtitle}
          </p>
        </div>
      </div>
      {/* Toggle on the right, vertically centered */}
      <div className="absolute" style={{ top: (height - 27) / 2, right: 12 }}>
        <Toggle on={on} onClick={onToggle} label={title} />
      </div>
    </div>
  )
}

export default function Settings({ avatarLetter: letterOverride }) {
  // Top-right circle uses the same dynamic initial as the AppHeader chip.
  const { initial } = useUserDisplay()
  const avatarLetter = letterOverride ?? initial
  const navigate = useNavigate()
  // Music & sounds are wired to the global audio store in lib/sound.js so the
  // toggle on this screen actually pauses/starts background music and gates
  // every sound effect across the app.
  const music = useMusicEnabled()
  const sounds = useSoundsEnabled()
  const volume = useVolume()
  // Master volume reflects the COMBINED state of the two category toggles:
  // ON if either music or sounds is on; OFF only when both are off. Clicking
  // it cascades to both toggles at once.
  const audioOn = music || sounds
  const toggleMaster = () => {
    if (audioOn) {
      setMusicEnabled(false)
      setSoundsEnabled(false)
    } else {
      setMusicEnabled(true)
      setSoundsEnabled(true)
      // Give an audible tap on the way back on so the user hears it works.
      playTap()
    }
  }
  // Notifications has no underlying system yet — keep local until we wire push.
  const [notifications, setNotifications] = useState(false)

  return (
    <div className="flex-1 relative overflow-hidden bg-white">

      {/* Cream tint overlay below header — Figma 863:167 (375×717 at top=95, bg #FFECCB 20%) */}
      <div
        className="absolute pointer-events-none"
        style={{ top: 53, left: 0, width: 375, height: 759, backgroundColor: 'rgba(255,236,203,0.2)' }}
      />

      {/* White header pill */}
      <HeaderShape />

      {/* Mascot sprite cropped — links back to lessons */}
      <Link
        to="/lessons"
        aria-label="Back to lessons"
        className="absolute overflow-hidden"
        style={{ top: 13, left: 13, width: 27, height: 34 }}
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

      {/* User avatar circle (top-right) — Figma 891:178 — links back to profile */}
      <Link
        to="/profile"
        aria-label="Profile"
        className="absolute"
        style={{ top: 13, left: 327, width: 34.909, height: 35.265 }}
      >
        <img src={avatarRing} alt="" aria-hidden draggable={false} className="block w-full h-full" />
        <span
          className="absolute -translate-x-1/2 font-poppins font-black text-center text-white pointer-events-none"
          style={{
            left: 344.45 - 327,
            top: 62 - 55,
            width: 20,
            height: 20,
            fontSize: 13,
            lineHeight: '20px',
          }}
        >
          {avatarLetter}
        </span>
      </Link>

      {/* Volume heading row — Figma 861:475 (left=35 top=141, 214×64, gap-16) */}
      <div
        className="absolute flex items-center"
        style={{ top: 99, left: 35, width: 214, height: 64, gap: 16 }}
      >
        {/* Master volume toggle — cascades to BOTH music and sounds at once.
            Icon reflects the combined state: ON if either toggle is on; OFF
            only when both are off. */}
        <button
          type="button"
          onClick={toggleMaster}
          className="flex items-center justify-center rounded-[16px] shrink-0 transition-transform duration-150 ease-out hover:scale-105 active:scale-95 cursor-pointer"
          style={{ width: 64, height: 64, backgroundColor: '#2E4858' }}
          aria-label={audioOn ? 'Turn off all audio' : 'Turn on all audio'}
          aria-pressed={!audioOn}
        >
          {audioOn ? (
            <VolumeOnIcon />
          ) : (
            <img src={volumeMutedIcon} alt="" aria-hidden draggable={false} style={{ width: 32, height: 32 }} />
          )}
        </button>
        {/* Volume slider — controls master loudness (0..100%). Slides the
            global volume in lib/sound.js; updates music gain + clip volume in
            real time as the thumb moves. */}
        <div className="flex-1 flex items-center" style={{ height: 64 }}>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={Math.round(volume * 100)}
            onChange={(e) => setVolume(parseInt(e.target.value, 10) / 100)}
            className="volume-slider"
            style={{ '--pct': `${Math.round(volume * 100)}%` }}
            aria-label="Volume"
            aria-valuetext={`${Math.round(volume * 100)} percent`}
          />
        </div>
      </div>

      {/* Music card — Figma 861:483 (gradient pink, 337×136 at top=237) */}
      <SettingsCard
        top={237}
        height={136}
        gradient="linear-gradient(to right, #faf5ff, #fdf2f8)"
        iconBg="#F16522"
        iconBoxSize={{ w: 50.188, h: 56 }}
        iconSrc={musicIcon}
        title="Music"
        subtitle="Background music"
        on={music}
        onToggle={() => setMusicEnabled(!music)}
      />

      {/* Sounds card — Figma 861:497 (gradient blue/cyan, 337×136 at top=388) */}
      <SettingsCard
        top={388}
        height={136}
        gradient="linear-gradient(to right, #eff6ff, #ecfeff)"
        iconBg="#43D2DF"
        iconBoxSize={{ w: 47.475, h: 56 }}
        iconSrc={sparklesIcon}
        title="Sounds"
        subtitle="Game sound effects"
        on={sounds}
        onToggle={() => setSoundsEnabled(!sounds)}
      />

      {/* Notifications card — Figma 861:626 (gradient orange/yellow, 337×108 at top=539) */}
      <SettingsCard
        top={539}
        height={108}
        gradient="linear-gradient(to right, #fff7ed, #fefce8)"
        iconBg="#F8C83C"
        iconBoxSize={{ w: 56, h: 56 }}
        iconSrc={bellIcon}
        title="Notifications"
        subtitle="Daily reminders"
        on={notifications}
        onToggle={() => setNotifications((v) => !v)}
      />

      {/* Log Out button — Figma 861:563 (gradient pink, 336×104 at top=663) */}
      <button
        type="button"
        onClick={async () => {
          try {
            await signOut()
          } catch {}
          navigate('/sign-in')
        }}
        className="absolute flex items-center justify-between rounded-[16px] cursor-pointer transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0"
        style={{
          top: 663,
          left: 17,
          width: 336,
          height: 104,
          padding: 24,
          backgroundImage: 'linear-gradient(to right, #fef2f2, #fdf2f8)',
          filter: 'drop-shadow(0 4px 2px rgba(0,0,0,0.11))',
        }}
      >
        <div className="flex items-center" style={{ gap: 16 }}>
          <div
            className="flex items-center justify-center rounded-[14px] shrink-0"
            style={{ width: 56, height: 56, backgroundColor: '#2E4858' }}
          >
            <img src={logoutIcon} alt="" aria-hidden draggable={false} style={{ width: 28, height: 28 }} />
          </div>
          <p
            className="font-inter font-bold whitespace-nowrap"
            style={{ fontSize: 24, lineHeight: '32px', color: '#1E2939' }}
          >
            Log Out
          </p>
        </div>
        <img src={chevronIcon} alt="" aria-hidden draggable={false} style={{ width: 28, height: 28 }} />
      </button>
    </div>
  )
}
