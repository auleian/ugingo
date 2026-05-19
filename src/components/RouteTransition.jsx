import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Global per-route entrance animation. Wrap <Routes> with this and every
// route change re-fires a GSAP animation on the freshly-mounted screen.
// Configs are picked by URL prefix so onboarding and lessons can each have
// their own feel.

// Each lesson topic gets its own transition feel. Shared duration/ease keeps
// the rhythm consistent even though the direction differs per topic.
const SLOW = { duration: 1.0, ease: 'power2.out' }

const SLIDE_RIGHT = { opacity: 0, x: 80,  y: 0,   ...SLOW } // start to the right → slide left
const SLIDE_UP    = { opacity: 0, x: 0,   y: 80,  ...SLOW } // start below → rise up
const SLIDE_DOWN  = { opacity: 0, x: 0,   y: -80, ...SLOW } // start above → drop down
const FADE        = { opacity: 0, x: 0,   y: 0,   ...SLOW }

const DEFAULT_CONFIG = {
  opacity: 0,
  x: 0,
  y: 20,        // gentle upward rise for onboarding / profile / settings
  duration: 0.8,
  ease: 'power2.out',
}

// First match wins. Order matters only when prefixes could overlap.
const PREFIX_CONFIGS = [
  { prefix: '/alphabet', config: SLIDE_RIGHT },
  { prefix: '/numbers',  config: SLIDE_UP },
  { prefix: '/people',   config: SLIDE_DOWN },
  { prefix: '/animals',  config: FADE },
  { prefix: '/places',   config: SLIDE_RIGHT },
  { prefix: '/lessons',  config: SLIDE_RIGHT }, // map itself
]

function configFor(pathname) {
  for (const { prefix, config } of PREFIX_CONFIGS) {
    if (pathname === prefix || pathname.startsWith(prefix + '/')) return config
  }
  return DEFAULT_CONFIG
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export default function RouteTransition({ children }) {
  const ref = useRef(null)
  const { pathname } = useLocation()

  useGSAP(
    () => {
      if (!ref.current) return
      if (prefersReducedMotion()) {
        gsap.set(ref.current, { clearProps: 'opacity,transform' })
        return
      }
      gsap.from(ref.current, configFor(pathname))
    },
    { scope: ref, dependencies: [pathname] },
  )

  return (
    <div ref={ref} className="flex-1 flex flex-col">
      {children}
    </div>
  )
}
