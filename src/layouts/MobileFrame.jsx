import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// Design canvas every screen is laid out against (iPhone-ish portrait).
// Screens use absolute positioning with hard-coded coords in this space.
// On mobile we scale the canvas to fill the viewport WIDTH so it always
// goes edge-to-edge; the outer wrapper reserves room for iOS safe-area
// insets at the top/bottom, and the body scrolls vertically if the scaled
// canvas + insets exceed the viewport height (only happens on dynamic-
// island / notched phones, by ~50–90px). At or above the desktop
// breakpoint we stop scaling and render at native 375x812 size, centered
// in a neutral backdrop.
const DESIGN_W = 375
const DESIGN_H = 812
const DESKTOP_BREAKPOINT = 768
const DEFAULT_BAND = '#ffffff'

// Context lets the currently-mounted AppHeader push its bg color up to
// MobileFrame, so the top safe-area strip matches whatever header the
// current screen rendered. Using React state (instead of a DOM CSS var)
// avoids race conditions during route transitions where the outgoing
// header's cleanup could overwrite the incoming header's color.
const TopBandContext = createContext(() => {})

export function useTopBand(color) {
  const setColor = useContext(TopBandContext)
  useEffect(() => {
    setColor(color || DEFAULT_BAND)
    return () => setColor(DEFAULT_BAND)
  }, [color, setColor])
}

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
  const isDesktop = vw >= DESKTOP_BREAKPOINT
  const { top: insetTop, bottom: insetBottom } = readInsets()
  if (isDesktop) {
    return { scale: 1, isDesktop, insetTop, insetBottom }
  }
  // Width-only fit so the canvas always fills the viewport edge-to-edge.
  // The body absorbs any vertical overflow via min-h-dvh on the wrapper.
  const scale = vw / DESIGN_W
  return { scale, isDesktop, insetTop, insetBottom }
}

export default function MobileFrame({ children }) {
  // Initialize eagerly so first paint already has the right layout.
  const [{ scale, isDesktop, insetTop, insetBottom }, setLayout] = useState(computeLayout)
  const [topBand, setTopBand] = useState(DEFAULT_BAND)

  // Stable identity so the context consumer's useEffect doesn't re-fire
  // every render — only when the actual color the child cares about changes.
  const setBandColor = useCallback((c) => setTopBand(c || DEFAULT_BAND), [])

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
      <TopBandContext.Provider value={setBandColor}>
        <div className="relative w-full flex justify-center items-center bg-gray-100 safe-h-screen">
          <div
            className="relative flex flex-col bg-white overflow-hidden shadow-xl"
            style={{ width: DESIGN_W, height: DESIGN_H }}
          >
            {children}
          </div>
        </div>
      </TopBandContext.Provider>
    )
  }

  // Outer wrapper paints the safe-area bands (top color comes from the
  // current screen's AppHeader via context) and uses the .safe-top /
  // .safe-bottom utilities to reserve room for the notch / dynamic island
  // / home indicator. The inner canvas is shifted down by the top inset so
  // screen content starts below the island.
  const canvasHeight = DESIGN_H * scale
  return (
    <TopBandContext.Provider value={setBandColor}>
      <div
        className="relative w-full safe-top safe-bottom safe-h-screen"
        style={{
          height: canvasHeight + insetTop + insetBottom,
          backgroundColor: topBand,
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
    </TopBandContext.Provider>
  )
}
