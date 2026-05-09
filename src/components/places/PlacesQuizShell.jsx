import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PlacesFrame from './PlacesFrame'
import PlacesAntelope from './PlacesAntelope'
import cloudCard from '../../assets/bg-success-cloud.png'
import { playCorrectClip, playWrong } from '../../lib/sound'

const OPTION_TOPS = [446, 515.66, 585.32]

export default function PlacesQuizShell({ question, questionStyle, options, correctIndex, nextPath }) {
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
      navigate('/places/try-again', { state: { back: location.pathname } })
    }
  }

  return (
    <PlacesFrame playMusic={false}>
      {/* Cyan banner block (top) */}
      <div
        className="absolute bg-[#69cad3] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        style={{ top: 142, left: -10, width: 286, height: 116 }}
      />

      {/* Cyan strip below banner */}
      <div
        className="absolute bg-[#69cad3] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        style={{ top: 258, left: -10, width: 413, height: 23 }}
      />

      {/* Antelope mascot (banner crop) */}
      <PlacesAntelope mode="banner" />

      {/* "Ekigezo / Test" title */}
      <div
        className="absolute text-center font-poppins font-black"
        style={{
          top: 161,
          left: 18,
          width: 191,
          textShadow: '0px 4px 4px rgba(0,0,0,0.51)',
        }}
      >
        <p className="text-[#ff5300] text-[40px] leading-none m-0">Ekigezo</p>
        <p className="text-[#f8c83c] text-[24px] leading-tight mt-1">Test</p>
      </div>

      {/* Cloud-card BG behind question/options */}
      <div
        className="absolute overflow-hidden pointer-events-none"
        style={{ top: 315, left: -158, width: 628, height: 393 }}
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

      {/* Question text — positioning comes from per-screen questionStyle */}
      <p
        className="absolute font-poppins font-black text-[#2e4858] text-[20px] leading-snug"
        style={questionStyle}
      >
        {question}
      </p>

      {/* 3 option pills */}
      {options.map((label, i) => (
        <button
          key={i}
          type="button"
          onClick={() => handlePick(i)}
          className="absolute bg-[#69cad3] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center active:opacity-90"
          style={{
            top: OPTION_TOPS[i],
            left: i === 0 ? 14 : 15.08,
            width: 349.92,
            height: 44.681,
          }}
        >
          <span className="ml-[29px] font-poppins font-black text-white text-[24px] leading-none">
            {label}
          </span>
        </button>
      ))}
    </PlacesFrame>
  )
}
