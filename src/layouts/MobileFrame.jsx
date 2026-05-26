import { useEffect, useState } from 'react'

// Design canvas every screen is laid out against (iPhone-ish portrait).
// Screens use absolute positioning with hard-coded coords in this space.
// On mobile we scale the whole canvas to fit the viewport (width AND height
// minus iOS safe-area insets), so notch / dynamic-island devices reserve
// room at the top without clipping the bottom. At or above the desktop
// breakpoint we stop scaling and render the canvas at its native 375x812
// size, centered in a neutral backdrop.
const DESIGN_W = 375
const DESIGN_H = 812
const DESKTOP_BREAKPOINT = 768

// Read the iOS safe-area insets that index.css exposes as :root CSS vars.
// Falls back to 0 anywhere env() isn't supported (most desktop / Android).
function readInsets() {
  if (typeof window === 'undefined' || !document.documentElement) {
    return { top: 0, bottom: 0 }
  }
  const cs = getComputedStyle(document.documentElement)
  const parse = (v) => {
    const n = parseFloat(v)
    return Number.isFinite(n) ? n : 0
  }
  return {
    top: parse(cs.getPropertyValue('--sat')),
    bottom: parse(cs.getPropertyValue('--sab')),
  }
}

function computeLayout() {
  if (typeof window === 'undefined') {
    return { scale: 1, isDesktop: false, insetTop: 0, insetBottom: 0 }
  }
  const vw = window.innerWidth
  const vh = window.innerHeight
  const isDesktop = vw >= DESKTOP_BREAKPOINT
  const { top: insetTop, bottom: insetBottom } = readInsets()
  if (isDesktop) {
    return { scale: 1, isDesktop, insetTop, insetBottom }
  }
  // Fit to BOTH width and height (minus insets) so the canvas always fits.
  // On dynamic-island phones the canvas would otherwise overflow the
  // viewport once we reserve the top strip — heightScale handles that.
  const widthScale = vw / DESIGN_W
  const heightScale = (vh - insetTop - insetBottom) / DESIGN_H
  const scale = Math.min(widthScale, heightScale)
  return { scale, isDesktop, insetTop, insetBottom }
}

export default function MobileFrame({ children }) {
  // Initialize eagerly so first paint already has the right layout.
  const [{ scale, isDesktop, insetTop, insetBottom }, setLayout] = useState(computeLayout)

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
    // Native-size frame centered in a neutral backdrop. safe-h-screen keeps
    // the backdrop full-height; when the viewport is shorter than DESIGN_H
    // the container grows to fit the frame and the body scrolls vertically.
    return (
      <div className="relative w-full flex justify-center items-center bg-gray-100 safe-h-screen">
        <div
          className="relative flex flex-col bg-white overflow-hidden shadow-xl"
          style={{ width: DESIGN_W, height: DESIGN_H }}
        >
          {children}
        </div>
      </div>
    )
  }

  // Outer wrapper paints the safe-area bands (top color comes from
  // --mf-top-band, which AppHeader overrides per-screen) and uses the
  // .safe-top / .safe-bottom utilities to reserve room for the notch /
  // dynamic island / home indicator. The inner canvas is shifted down by
  // the top inset so screen content starts below the island.
  const canvasHeight = DESIGN_H * scale
  return (
    <div
      className="relative w-full safe-top safe-bottom safe-h-screen"
      style={{
        height: canvasHeight + insetTop + insetBottom,
        background: 'var(--mf-top-band, #ffffff)',
        boxSizing: 'border-box',
      }}
    >
      <div
        className="absolute left-0 flex flex-col bg-white overflow-hidden"
        style={{
          top: insetTop,
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
