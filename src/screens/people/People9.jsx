import { useEffect } from 'react'
import AppHeader from '../../components/AppHeader'
import PeoplePillButton from '../../components/people/PeoplePillButton'
import Confetti from '../../components/Confetti'
import skyBg from '../../assets/bg-success-sky.png'
import confettiBg from '../../assets/bg-success-mountains.png'
import cloudCard from '../../assets/bg-success-cloud.png'
import antelopeHead from '../../assets/people-antelope-head.png'
import starEarned from '../../assets/star-earned.svg'
import { playMilestone } from '../../lib/sound'

const CONFETTI = [
  { top: 211, left: 50, size: 15, rotate: 96 },
  { top: 194, left: 296, size: 20, rotate: -123 },
  { top: 367, left: 110, size: 20, rotate: 18 },
  { top: 303, left: 267, size: 40, rotate: 178 },
  { top: 490, left: -94, size: 15, rotate: 14 },
]

export default function People9() {
  useEffect(() => {
    playMilestone()
  }, [])

  return (
    <div className="flex-1 relative overflow-hidden bg-[#5cc7f4]">
      <Confetti />
      <img
        src={skyBg}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute max-w-none select-none pointer-events-none object-cover"
        style={{ top: 0, left: -32, width: 459, height: 815 }}
      />

      <div
        className="absolute pointer-events-none overflow-hidden opacity-[0.31]"
        style={{ top: 69, left: -78, width: 566, height: 438 }}
      >
        <img
          src={confettiBg}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute max-w-none select-none"
          style={{ top: '-33.29%', left: '-30.22%', width: '147.15%', height: '189.96%' }}
        />
      </div>

      <AppHeader roundedBottom />

      <div
        className="absolute overflow-hidden pointer-events-none"
        style={{ top: 242, left: 104, width: 163, height: 321 }}
      >
        <img
          src={antelopeHead}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute max-w-none select-none"
          style={{ top: '-172.45%', left: '-343.04%', width: '781.69%', height: '315.1%' }}
        />
      </div>

      <p
        className="absolute font-poppins font-black text-white text-[24px] leading-none z-10"
        style={{ top: 164, left: 45, width: 286 }}
      >
        Challenge completed
      </p>


      <div className="absolute z-10" style={{ top: 307, left: 37 }}>
        <img
          src={starEarned}
          alt=""
          draggable={false}
          className="select-none"
          style={{ width: 49, height: 56 }}
        />
        <p className="mt-1 text-center font-opensans font-extrabold text-[#2e4858] text-[12px] leading-tight w-[73px] -ml-[12px]">
          You earned
          <br />a star
        </p>
      </div>

      <div
        className="absolute drop-shadow-[0_4px_4px_rgba(241,101,34,0.34)] overflow-hidden pointer-events-none z-10"
        style={{ top: 403, left: -23, width: 418.372, height: 262 }}
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
        className="absolute z-20 text-center"
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
          className="absolute z-20 select-none pointer-events-none"
          style={{
            top: c.top,
            left: c.left,
            fontSize: c.size,
            transform: `rotate(${c.rotate}deg)`,
          }}
        >
          🎉
        </span>
      ))}

      <PeoplePillButton
        to="/animals"
        size="sm"
        className="absolute z-30"
        style={{ top: 701, left: 150 }}
      >
        Next
      </PeoplePillButton>
    </div>
  )
}
