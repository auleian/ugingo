import { useRef } from 'react'
import usePulse from '../../lib/usePulse'

// One vocabulary card on Animals 1–3: a yellow square (51×67) holding an
// emoji, butted against a cyan rounded rectangle (109.798×67) holding the
// Luganda word + English translation. Per Figma 529:165–189 etc. The two
// halves overlap by ~4.32px (`leftOffset`) so the rounded corners meet
// cleanly.
export default function AnimalsListRow({
  top,
  left,
  emoji,
  word,
  translation,
  wordSize = 20,
  textTop = 13,
  textLeftOffset = 14,
  isPulsing = false,
}) {
  const ref = useRef(null)
  usePulse(ref, isPulsing)
  return (
    <div ref={ref} className="absolute z-20" style={{ top, left, width: 174.798, height: 67, transformOrigin: 'center center' }}>
      <div
        className="absolute bg-[#69cad3] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        style={{ top: 0, left: 55.68, width: 109.798, height: 67 }}
      />
      <div
        className="absolute bg-[#f8c83c] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center"
        style={{ top: 0, left: 0, width: 51, height: 67 }}
      >
        <span style={{ fontSize: 36, lineHeight: 1 }}>{emoji}</span>
      </div>
      <div
        className="absolute font-poppins font-black text-white leading-tight"
        style={{ top: textTop, left: 51 + textLeftOffset, width: 110 }}
      >
        <p style={{ fontSize: wordSize, lineHeight: 1.05 }}>{word}</p>
        <p className="text-[#2e4858]" style={{ fontSize: 12, lineHeight: 1.1 }}>
          {translation}
        </p>
      </div>
    </div>
  )
}
