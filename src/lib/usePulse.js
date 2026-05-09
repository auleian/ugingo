import { useEffect } from 'react'

// Single, slow-moderate up-down pulse. Each row swells then settles; a small
// idle gap before the next row's pulse comes from useShiverCycle's interval
// being a touch longer than the animation duration.
const KEYFRAMES = [
  { transform: 'scale(1)', offset: 0 },
  { transform: 'scale(1.06)', offset: 0.5 },
  { transform: 'scale(1)', offset: 1 },
]
const OPTIONS = { duration: 800, easing: 'ease-in-out', fill: 'none' }

export default function usePulse(ref, isActive) {
  useEffect(() => {
    if (!isActive) return
    const el = ref?.current
    if (!el || typeof el.animate !== 'function') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const anim = el.animate(KEYFRAMES, OPTIONS)
    return () => anim.cancel()
  }, [ref, isActive])
}
