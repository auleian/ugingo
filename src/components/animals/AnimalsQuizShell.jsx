import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AnimalsFrame from './AnimalsFrame'
import AnimalsHero, { QUIZ_ANTELOPE_CROP } from './AnimalsHero'
import { playCorrectClip, playWrong } from '../../lib/sound'

const OPTION_TOPS = [448, 547, 646]
const OPTION_LEFTS = [45, 42, 39]

// Animals quiz screens (4–7). The hero ribbon shows the "Ekigezo / Test"
// header; a cyan banner (h:83 at top:267) carries the question; three yellow
// option buttons (≈293×67) sit below. On a wrong pick we navigate to
// `failPath` with `state.back` so the try-again screen can route back here
// (gotcha rule #7). When `failPath` is unset we no-op — useful while the
// /animals/try-again screen has not been built yet.
export default function AnimalsQuizShell({
  question,
  options,
  correctIndex,
  nextPath,
  failPath,
  questionStyle,
  pillBg,
  pillTextColor,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const busy = useRef(false)

  async function handlePick(i) {
    if (busy.current) return
    if (i === correctIndex) {
      busy.current = true
      await playCorrectClip()
      navigate(nextPath)
    } else if (failPath) {
      busy.current = true
      playWrong()
      navigate(failPath, { state: { back: location.pathname } })
    }
  }

  return (
    <AnimalsFrame playMusic={false} pillBg={pillBg} pillTextColor={pillTextColor}>
      <AnimalsHero antelopeCrop={QUIZ_ANTELOPE_CROP}>
        <div
          className="absolute z-30 text-center"
          style={{ top: 151, left: 15, width: 199, height: 96 }}
        >
          <p className="font-poppins font-black text-white" style={{ fontSize: 48, lineHeight: 1 }}>
            Ekigezo
          </p>
          <p
            className="font-poppins font-black text-[#2e4858]"
            style={{ fontSize: 24, lineHeight: 1, marginTop: 6 }}
          >
            Test
          </p>
        </div>
      </AnimalsHero>

      <div
        className="absolute bg-[#69cad3] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-10"
        style={{ top: 267, left: -24, width: 423, height: 83 }}
      />

      <p
        className="absolute z-20 font-poppins font-black text-white"
        style={{
          top: 292,
          left: 21,
          width: 339,
          fontSize: 22,
          lineHeight: 1.1,
          textAlign: 'left',
          ...questionStyle,
        }}
      >
        {question}
      </p>

      {options.map((label, i) => (
        <button
          key={i}
          type="button"
          onClick={() => handlePick(i)}
          className="absolute bg-[#f8c83c] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-20 flex items-center active:opacity-90"
          style={{ top: OPTION_TOPS[i], left: OPTION_LEFTS[i], width: 292.947, height: 67 }}
        >
          <span
            className="font-poppins font-black text-[#2e4858]"
            style={{ marginLeft: 36, fontSize: 24, lineHeight: 1 }}
          >
            {label}
          </span>
        </button>
      ))}
    </AnimalsFrame>
  )
}
