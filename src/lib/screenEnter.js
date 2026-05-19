// Per-screen entrance animation. Each screen calls useScreenEnter() and
// attaches the returned ref to its root element. On mount we fire a GSAP
// timeline that fades + slides the element in.
//
// Customize per screen:
//   const ref = useScreenEnter({ y: 40, duration: 0.5, delay: 0.1 })
//
// Honors prefers-reduced-motion — if the user has set the OS pref, the
// animation is skipped and the element is shown immediately.

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const DEFAULTS = {
  opacity: 0,
  y: 20,
  duration: 0.8,
  ease: 'power2.out',
  delay: 0,
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export function useScreenEnter(options = {}) {
  const ref = useRef(null)
  const { opacity, y, duration, ease, delay } = { ...DEFAULTS, ...options }

  useGSAP(
    () => {
      if (!ref.current) return
      if (prefersReducedMotion()) {
        // Make sure nothing is left in a hidden state if a previous run
        // staged the element off-screen.
        gsap.set(ref.current, { clearProps: 'opacity,transform' })
        return
      }
      gsap.from(ref.current, { opacity, y, duration, ease, delay })
    },
    { scope: ref },
  )

  return ref
}
