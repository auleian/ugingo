import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NumbersFrame from './NumbersFrame'
import NumbersQuizCard from './NumbersQuizCard'
import { playCorrectClip, playWrong } from '../../lib/sound'

const OPTION_TOPS = [405, 479, 553]
const OPTION_LEFTS = [40, 41, 42]

export default function NumbersQuizShell({ question, options, correctIndex, nextPath, failPath = '/numbers/10' }) {
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
      navigate(failPath, { state: { back: location.pathname } })
    }
  }

  return (
    <NumbersFrame playMusic={false}>
      <NumbersQuizCard />

      <p
        className="absolute z-10 font-poppins font-black text-[#2e4858] text-[24px] text-center leading-tight"
        style={{ top: 327, left: 68, width: 235, height: 51 }}
      >
        {question}
      </p>

      {options.map((label, i) => (
        <button
          key={i}
          type="button"
          onClick={() => handlePick(i)}
          className="absolute rounded-[52.5px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-10 flex items-center justify-center bg-[#2e4858] active:opacity-90"
          style={{ top: OPTION_TOPS[i], left: OPTION_LEFTS[i], width: 288, height: 59 }}
        >
          <span className="font-opensans font-semibold text-white text-[24px] leading-none">
            {label}
          </span>
        </button>
      ))}
    </NumbersFrame>
  )
}
