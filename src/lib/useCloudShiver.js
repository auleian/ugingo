import { useEffect } from 'react'

// Tremble — dense, high-frequency micro-jitter meant to read as a real
// shiver (think baby or chicken), not a slow theatrical wiggle. Keyframes
// are generated once at module load with a seeded PRNG so every element
// uses the same motion.
const SHIVER_KEYFRAMES = (() => {
  const FRAMES = 33
  const AMP_X = 3.0
  const AMP_Y = 1.7
  const AMP_ROT = 1.45
  let s = 1
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280 - 0.5
  }
  const out = [{ transform: 'translate(0,0) rotate(0deg)' }]
  for (let i = 1; i < FRAMES - 1; i++) {
    const t = i / (FRAMES - 1)
    // Envelope: ramp in over first 10%, hold, taper to 0 in last 25%.
    const env = t < 0.1 ? t / 0.1 : t > 0.75 ? (1 - t) / 0.25 : 1
    const x = (rand() * 2 * AMP_X * env).toFixed(2)
    const y = (rand() * 2 * AMP_Y * env).toFixed(2)
    const r = (rand() * 2 * AMP_ROT * env).toFixed(2)
    out.push({ transform: `translate(${x}px, ${y}px) rotate(${r}deg)` })
  }
  out.push({ transform: 'translate(0,0) rotate(0deg)' })
  return out
})()

const DEFAULT_OPTIONS = { duration: 1200, easing: 'linear', fill: 'none' }

/**
 * Plays the shiver animation on `ref.current` while `isActive` is true. When
 * `loop` is true the animation repeats forever (until isActive flips false or
 * the element unmounts). Otherwise it plays once per isActive toggle — pair
 * with `useShiverCycle` to walk a list of cards.
 */
export default function useCloudShiver(ref, isActive, { loop = false } = {}) {
  useEffect(() => {
    if (!isActive) return
    const el = ref?.current
    if (!el || typeof el.animate !== 'function') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const opts = loop ? { ...DEFAULT_OPTIONS, iterations: Infinity } : DEFAULT_OPTIONS
    const anim = el.animate(SHIVER_KEYFRAMES, opts)
    return () => anim.cancel()
  }, [ref, isActive, loop])
}
