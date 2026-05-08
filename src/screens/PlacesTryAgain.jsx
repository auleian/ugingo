import { Link, useLocation } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import Mascot from '../components/Mascot'
import skyBg from '../assets/bg-success-sky.png'
import cloudCard from '../assets/bg-success-cloud.png'

export default function PlacesTryAgain() {
  const location = useLocation()
  const back = location.state?.back || '/places'

  return (
    <div className="flex-1 relative overflow-hidden bg-[#5cc7f4]">
      <img
        src={skyBg}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      <AppHeader roundedBottom />

      <Mascot
        variant="antelopeCry"
        size={170}
        withCircle={false}
        className="absolute top-[180px] left-1/2 -translate-x-1/2 z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />

      <div
        className="absolute overflow-hidden pointer-events-none z-10"
        style={{ top: 380, left: '50%', transform: 'translateX(-50%)', width: 360, height: 220 }}
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

      <p className="absolute top-[440px] left-1/2 -translate-x-1/2 w-[296px] z-20 font-poppins font-black text-[#2e4858] text-[48px] text-center leading-tight">
        Try Again
      </p>

      <Link
        to={back}
        className="absolute top-[672px] left-1/2 -translate-x-1/2 w-[100px] h-[34px] bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center z-30"
      >
        <span className="font-poppins font-black text-[#f8c83c] text-[12px] leading-none">
          Back
        </span>
      </Link>
    </div>
  )
}
