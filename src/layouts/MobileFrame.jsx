import { useEffect, useState } from 'react'

// Design canvas every screen is laid out against (iPhone-ish portrait).
// Screens use absolute positioning with hard-coded coords in this space, so
// instead of refactoring every screen to be fluid we scale the whole canvas
// uniformly to fit the viewport. Letterboxing fills with the page background.
const DESIGN_W = 375
const DESIGN_H = 812

export default function MobileFrame({ children }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const compute = () => {
      const s = Math.min(
        window.innerWidth / DESIGN_W,
        window.innerHeight / DESIGN_H,
      )
      setScale(s)
    }
    compute()
    window.addEventListener('resize', compute)
    window.addEventListener('orientationchange', compute)
    return () => {
      window.removeEventListener('resize', compute)
      window.removeEventListener('orientationchange', compute)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden bg-white sm:bg-zinc-100"
      style={{ height: '100dvh' }}
    >
      <div
        className="relative flex flex-col bg-white overflow-hidden sm:rounded-[40px] sm:shadow-2xl sm:ring-1 sm:ring-black/5"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  )
}
