import { useEffect, useRef } from 'react'
import cloudCard from '../../assets/bg-success-cloud.png'
import creamPill from '../../assets/cream-pill.svg'

// Tremble — dense, high-frequency micro-jitter meant to read as a real
// shiver (think baby or chicken), not a slow theatrical wiggle. Generated
// once at module load so every card uses the same motion.
const SHIVER_KEYFRAMES = (() => {
  const FRAMES = 33
  const AMP_X = 3.0
  const AMP_Y = 1.7
  const AMP_ROT = 1.45
  // Pseudo-random with a fixed seed so the trembling is deterministic.
  let s = 1
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280 - 0.5
  }
  const out = [{ transform: 'translate(0,0) rotate(0deg)' }]
  for (let i = 1; i < FRAMES - 1; i++) {
    // Envelope: ramp in over first 10%, hold, taper to 0 in last 25%.
    const t = i / (FRAMES - 1)
    const env = t < 0.1 ? t / 0.1 : t > 0.75 ? (1 - t) / 0.25 : 1
    const x = (rand() * 2 * AMP_X * env).toFixed(2)
    const y = (rand() * 2 * AMP_Y * env).toFixed(2)
    const r = (rand() * 2 * AMP_ROT * env).toFixed(2)
    out.push({ transform: `translate(${x}px, ${y}px) rotate(${r}deg)` })
  }
  out.push({ transform: 'translate(0,0) rotate(0deg)' })
  return out
})()
const SHIVER_OPTIONS = { duration: 1200, easing: 'linear', fill: 'none' }

export default function AlphabetCard({
  letter,
  say,
  emoji,
  word,
  translation,
  top,
  left,
  width = 199,
  height = 124,
  isShivering = false,
}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!isShivering || !ref.current) return
    if (typeof ref.current.animate !== 'function') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const anim = ref.current.animate(SHIVER_KEYFRAMES, SHIVER_OPTIONS)
    return () => anim.cancel()
  }, [isShivering])

  return (
    <div
      ref={ref}
      className="absolute drop-shadow-[0_4px_4px_rgba(241,101,34,0.34)]"
      style={{ top, left, width, height, transformOrigin: 'center center' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={cloudCard}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute max-w-none select-none"
          style={{ top: '-70.36%', left: '-25.5%', width: '151.98%', height: '242.69%' }}
        />
      </div>

      <p className="absolute top-[9px] left-1/2 -translate-x-1/2 font-poppins font-black text-[#2e4858] text-[30px] leading-none whitespace-nowrap">
        {letter}
      </p>

      <p className="absolute top-[44px] left-1/2 -translate-x-1/2 font-opensans font-semibold text-[#2e4858] text-[11px] leading-none whitespace-nowrap">
        {say}
      </p>

      <div
        className="absolute"
        style={{ top: 68, left: 36, width: 128, height: 38 }}
      >
        <img src={creamPill} alt="" aria-hidden draggable={false} className="absolute inset-0 w-full h-full" />
        <span className="absolute left-[8px] top-1/2 -translate-y-1/2 text-[16px] leading-none">
          {emoji}
        </span>
        <div className="absolute right-[6px] top-1/2 -translate-y-1/2 w-[88px] text-center font-opensans font-semibold text-[#2e4858] leading-tight">
          <p className="text-[10px] leading-none">{word}</p>
          {translation && (
            <p className="mt-[2px] text-[5px] leading-none">{translation}</p>
          )}
        </div>
      </div>
    </div>
  )
}
