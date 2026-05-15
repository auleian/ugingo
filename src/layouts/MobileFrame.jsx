import { useEffect, useState } from 'react'

// Design canvas every screen is laid out against (iPhone-ish portrait).
// Screens use absolute positioning with hard-coded coords in this space.
// Below the desktop breakpoint we scale the whole canvas to the viewport
// width so it fills any phone edge-to-edge. At or above the breakpoint we
// stop scaling and render the canvas at its native 375x812 size, centered
// in a neutral backdrop — assets are mobile-only and look bad upscaled.
const DESIGN_W = 375
const DESIGN_H = 812
const DESKTOP_BREAKPOINT = 768

function computeLayout() {
  if (typeof window === 'undefined') return { scale: 1, isDesktop: false }
  const vw = window.innerWidth
  const isDesktop = vw >= DESKTOP_BREAKPOINT
  const scale = isDesktop ? 1 : vw / DESIGN_W
  return { scale, isDesktop }
}

export default function MobileFrame({ children }) {
  // Initialize eagerly so first paint already has the right layout.
  const [{ scale, isDesktop }, setLayout] = useState(computeLayout)

  useEffect(() => {
    const update = () => setLayout(computeLayout())
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  if (isDesktop) {
    // Native-size frame centered in a neutral backdrop. min-h-dvh keeps the
    // backdrop full-height; when the viewport is shorter than DESIGN_H the
    // container grows to fit the frame and the body scrolls vertically.
    return (
      <div
        className="relative w-full flex justify-center items-center bg-gray-100"
        style={{ minHeight: '100dvh' }}
      >
        <div
          className="relative flex flex-col bg-white overflow-hidden shadow-xl"
          style={{ width: DESIGN_W, height: DESIGN_H }}
        >
          {children}
        </div>
      </div>
    )
  }

  // Outer wrapper reserves the scaled height so document flow / body
  // scrolling work correctly when scaled content is taller than the
  // viewport. min-height keeps the background filling the screen on
  // short scaled content (narrow phones where vw < DESIGN_W).
  return (
    <div
      className="relative w-full bg-white"
      style={{ height: DESIGN_H * scale, minHeight: '100dvh' }}
    >
      <div
        className="absolute top-0 left-0 flex flex-col bg-white overflow-hidden"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  )
}
