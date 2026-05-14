import { Link } from 'react-router-dom'
import Mascot from './Mascot'
import { playTap } from '../lib/sound'
import { useUserDisplay } from '../lib/firebase'

export default function AppHeader({ roundedBottom = false }) {
  // `initial` falls back to '?' when not signed in (e.g., splash). The
  // AppHeader is only mounted on protected routes in practice so this is
  // mostly cosmetic.
  const { initial } = useUserDisplay()
  return (
    <header
      className="relative w-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] z-30"
      style={{
        height: 87,
        borderBottomLeftRadius: roundedBottom ? 15 : 0,
        borderBottomRightRadius: roundedBottom ? 15 : 0,
      }}
    >
      <Link
        to="/lessons"
        aria-label="Go to lessons"
        className="absolute block select-none transition-transform duration-150 hover:scale-110 active:scale-95"
        style={{ left: 12, top: 47 }}
      >
        <Mascot variant="default" size={27} withCircle={false} />
      </Link>

      <Link
        to="/profile"
        onClick={() => playTap()}
        aria-label="Profile"
        className="absolute rounded-full border-[3px] border-[#F7AE2B] flex items-center justify-center font-poppins font-black text-white text-[13px] leading-none bg-[#2E4858] transition-transform duration-150 hover:scale-110 active:scale-95"
        style={{ left: 326, top: 47, width: 34.909, height: 35.265 }}
      >
        {initial}
      </Link>
    </header>
  )
}
