import { Link, useLocation } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import Mascot from '../components/Mascot'
import skyBg from '../assets/bg-success-sky.png'
import cloudCard from '../assets/bg-success-cloud.png'

export default function AnimalsTryAgain() {
  const location = useLocation()
  const back = location.state?.back || '/animals/4'

  return (
    <div className="flex-1 relative overflow-hidden bg-[#5cc7f4]">
      <img
        src={skyBg}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute max-w-none pointer-events-none select-none object-cover"
        style={{ top: 0, left: -32, width: 459, height: 815 }}
      />

      <AppHeader />

      <Mascot
        variant="antelopeCry"
        size={148}
        withCircle={false}
        className="absolute drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        style={{ top: 183, left: 112 }}
      />

      <div
        className="absolute overflow-hidden pointer-events-none"
        style={{ top: 344, left: -23, width: 418.37, height: 262 }}
      >
        <img
          src={cloudCard}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute max-w-none select-none"
          style={{ top: '-70.36%', left: '-25.5%', width: '151.98%', height: '242.69%' }}
        />
      </div>

      <p
        className="absolute font-poppins font-black text-[#2e4858] text-center leading-none"
        style={{ top: 446, left: 39, width: 296, fontSize: 48 }}
      >
        Try Again
      </p>

      <Link
        to={back}
        className="absolute bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center z-10"
        style={{ top: 672, left: 151, width: 72, height: 26 }}
      >
        <span className="font-poppins font-black text-[#f8c83c] text-[11px] leading-none">
          Back
        </span>
      </Link>
    </div>
  )
}
