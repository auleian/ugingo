import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AlphabetFrame from './AlphabetFrame'
import Mascot from '../Mascot'
import cloudCard from '../../assets/bg-success-cloud.png'
import { playCorrectClip, playWrong } from '../../lib/sound'

const OPTION_TOPS = [542.37, 597.87, 653.36]

export default function AlphabetQuizShell({ question, options, correctIndex, nextPath }) {
  const navigate = useNavigate()
  const location = useLocation()
  const busy = useRef(false)

  async function handlePick(i) {
    if (busy.current) return
    busy.current = true
    if (i === correctIndex) {
      await playCorrectClip()
      navigate(nextPath)
    } else {
      playWrong()
      navigate('/alphabet/try-again', { state: { back: location.pathname } })
    }
  }

  return (
    <AlphabetFrame playMusic={false}>
      <Mascot
        variant="antelopeSide"
        size={163}
        withCircle={false}
        className="absolute"
        style={{ top: 99, left: 213 }}
      />

      <p
        className="absolute font-poppins font-black text-[#2e4858] text-[20px] leading-none"
        style={{ top: 147, left: 25 }}
      >
        Walifu challenge
      </p>

      <p
        className="absolute font-opensans font-semibold text-[#2e4858] text-[13px] leading-none"
        style={{ top: 232, left: 102, width: 136 }}
      >
        Test your knowledge
      </p>

      <div className="absolute bg-[#69cad3]" style={{ top: 295, left: -16, width: 404, height: 17 }} />

      <p
        className="absolute font-poppins font-black text-[#2e4858] text-[24px] text-center leading-snug"
        style={{ top: 371, left: 31, width: 311 }}
      >
        {question}
      </p>

      <div
        className="absolute drop-shadow-[0_4px_4px_rgba(241,101,34,0.34)] overflow-hidden pointer-events-none"
        style={{ top: 483, left: -22, width: 418.37, height: 262 }}
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

      {options.map((label, i) => (
        <button
          key={i}
          type="button"
          onClick={() => handlePick(i)}
          className="absolute rounded-[12px] flex items-center bg-[#2e4858] active:opacity-90"
          style={{
            top: OPTION_TOPS[i],
            left: 65.76,
            width: 262,
            height: 43.88,
          }}
        >
          <span className="ml-[12px] font-opensans font-extrabold text-[#f16522] text-[24px] leading-none">
            {label}
          </span>
        </button>
      ))}
    </AlphabetFrame>
  )
}
