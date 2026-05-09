import { useEffect } from 'react'
import AppHeader from '../../components/AppHeader'
import AlphabetPillButton from '../../components/alphabet/AlphabetPillButton'
import Mascot from '../../components/Mascot'
import Confetti from '../../components/Confetti'
import bgSky from '../../assets/bg-success-sky.png'
import bgConfetti from '../../assets/bg-success-mountains.png'
import cloudCard from '../../assets/bg-success-cloud.png'
import trophy from '../../assets/trophy.png'
import starEarned from '../../assets/star-earned.svg'
import { playMilestone } from '../../lib/sound'

const CONFETTI = [
  { left: 312, top: 303, size: 40, rotate: 178, w: 88, h: 52 },
  { left: 62, top: 211, size: 15, rotate: 96, w: 24, h: 31 },
  { left: 312, top: 194, size: 20, rotate: -123, w: 33, h: 35 },
  { left: 127, top: 367, size: 20, rotate: 18, w: 34, h: 28 },
]

export default function Alphabet12() {
  useEffect(() => {
    playMilestone()
  }, [])

  return (
    <div className="flex-1 relative overflow-hidden bg-white">
      <Confetti />
      <img
        src={bgSky}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute max-w-none pointer-events-none select-none object-cover"
        style={{ top: 0, left: -32, width: 459, height: 815 }}
      />

      <div
        className="absolute pointer-events-none"
        style={{ top: 69, left: -78, width: 566, height: 438, opacity: 0.9 }}
      >
        <img
          src={bgConfetti}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover select-none"
        />
      </div>

      <AppHeader roundedBottom />

      <p
        className="absolute font-poppins font-black text-white text-[24px] leading-none"
        style={{ top: 164, left: 45, width: 286 }}
      >
        {' '}Challenge completed
      </p>

      <img
        src={trophy}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute pointer-events-none select-none object-contain"
        style={{ top: 147, left: 86, width: 200, height: 200 }}
      />

      <Mascot
        variant="antelopeFront"
        size={163}
        withCircle={false}
        className="absolute"
        style={{ top: 242, left: 104 }}
      />

      <img
        src={starEarned}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute pointer-events-none select-none"
        style={{ top: 307, left: 37, width: 46, height: 46 }}
      />

      <div
        className="absolute font-opensans font-extrabold text-[#2e4858] text-[12px] text-center leading-tight"
        style={{ top: 356, left: 18, width: 73 }}
      >
        <p>You earned</p>
        <p>a star</p>
      </div>

      <div
        className="absolute overflow-hidden pointer-events-none"
        style={{ top: 403, left: -23, width: 418.37, height: 262 }}
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

      <div
        className="absolute text-center"
        style={{ top: 488, left: 38, width: 296 }}
      >
        <p className="font-poppins font-black text-[#2e4858] text-[40px] leading-none">
          Weebale Nyo
        </p>
        <p className="mt-2 font-poppins font-black text-[#f16522] text-[24px] leading-none">
          4/4
        </p>
      </div>

      {CONFETTI.map((c, i) => (
        <span
          key={i}
          className="absolute select-none pointer-events-none"
          style={{
            top: c.top,
            left: c.left,
            transform: `rotate(${c.rotate}deg)`,
            fontSize: c.size,
            lineHeight: 1,
          }}
          aria-hidden
        >
          🎉
        </span>
      ))}

      <AlphabetPillButton size="sm" to="/lessons" className="absolute" style={{ top: 701, left: 150 }}>
        Next
      </AlphabetPillButton>
    </div>
  )
}
