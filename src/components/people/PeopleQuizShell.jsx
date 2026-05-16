import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PeopleFrame from './PeopleFrame'
import PeopleHero from './PeopleHero'
import { playCorrectClip, playWrong } from '../../lib/sound'

const OPTION_TOPS = [416, 483, 550]
const PICK_FLASH_MS = 600
const PICK_CORRECT_BG = 'green'
const PICK_WRONG_BG = 'red'

const TEST_ANTELOPE_CROP = { top: -82.56, left: -353.39, width: 781.69, height: 503.22 }

export default function PeopleQuizShell({ question, options, correctIndex, nextPath }) {
  const navigate = useNavigate()
  const location = useLocation()
  const busy = useRef(false)
  const [picked, setPicked] = useState(null)

  async function handlePick(i) {
    if (busy.current) return
    busy.current = true
    const correct = i === correctIndex
    setPicked({ index: i, correct })
    if (correct) {
      await Promise.all([playCorrectClip(), new Promise((r) => setTimeout(r, PICK_FLASH_MS))])
      navigate(nextPath)
    } else {
      playWrong()
      await new Promise((r) => setTimeout(r, PICK_FLASH_MS))
      navigate('/people/try-again', { state: { back: location.pathname } })
    }
  }

  return (
    <PeopleFrame playMusic={false}>
      <PeopleHero antelopeCrop={TEST_ANTELOPE_CROP}>
        <div
          className="absolute text-center font-poppins font-black text-white"
          style={{ top: 129, left: 30, width: 171 }}
        >
          <p className="text-[#2e4858] text-[40px] leading-none">Ekigezo</p>
          <p className="mt-[6px] text-[20px] leading-none">Test</p>
        </div>
      </PeopleHero>

      <p
        className="absolute font-poppins font-black text-[#2e4858] text-[20px] leading-snug"
        style={{ top: 328, left: 23, width: 338 }}
      >
        {question}
      </p>

      {options.map((label, i) => (
        <button
          key={i}
          type="button"
          onClick={() => handlePick(i)}
          className="absolute bg-[#2e4858] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center active:opacity-90"
          style={{
            top: OPTION_TOPS[i],
            left: 24,
            width: 326,
            height: 47,
            ...(picked?.index === i && {
              backgroundColor: picked.correct ? PICK_CORRECT_BG : PICK_WRONG_BG,
            }),
          }}
        >
          <span className="ml-[20px] font-opensans font-semibold text-white text-[24px] leading-none">
            {label}
          </span>
        </button>
      ))}
    </PeopleFrame>
  )
}
