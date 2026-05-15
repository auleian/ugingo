import { useEffect, useState } from 'react'

// Design canvas every screen is laid out against (iPhone-ish portrait).
// Screens use absolute positioning with hard-coded coords in this space, so
// instead of refactoring every screen to be fluid we scale the whole canvas
// uniformly to the viewport width. Width-fit (not aspect-preserving fit)
// keeps the frame edge-to-edge horizontally on every device. If scaled
// height exceeds the viewport we allow normal body scroll.
const DESIGN_W = 375
const DESIGN_H = 812

function computeScale() {
  if (typeof window === 'undefined') return 1
  return window.innerWidth / DESIGN_W
}

export default function MobileFrame({ children }) {
  // Initialize eagerly so first paint already has the right scale.
  const [scale, setScale] = useState(computeScale)

  useEffect(() => {
    const update = () => setScale(computeScale())
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

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
