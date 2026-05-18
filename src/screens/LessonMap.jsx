import { useRef } from 'react'
import { Link } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import bgMap from '../assets/bg-lesson-map.png'
import abcIsland from '../assets/lesson-map-abc.png'
import island15 from '../assets/lesson-map-island-15.png'
import smallIsland from '../assets/lesson-map-island-16.png'
import animalsMarker from '../assets/image-13.png'
import island12 from '../assets/lesson-map-island-12.png'
import starActive from '../assets/lesson-map-star.svg'
import starLocked from '../assets/star-locked.svg'
import starBurst from '../assets/lesson-map-star-burst.svg'

const STAR_W = 94.314
const STAR_H = 90.451

// Each cluster of 5 stars leads to one topic island. The FIRST star in each
// cluster (by path-order y) is the entry point — wired to /<topic>/1.
const STARS = [
  { left: 114.21, top: 60.88, to: '/alphabet/1' },
  { left: 67, top: 124 },
  { left: 20, top: 187 },
  { left: 77, top: 244 },
  { left: 133, top: 300 },
  { left: 264, top: 441, flipped: true, to: '/numbers' },
  { left: 217, top: 505, flipped: true },
  { left: 143, top: 531, flipped: true },
  { left: 70, top: 560, flipped: true },
  { left: 23, top: 621, flipped: true },
  { left: 134, top: 865, to: '/people' },
  { left: 93, top: 932 },
  { left: 111, top: 1022 },
  { left: 205, top: 1051 },
  { left: 289, top: 1068 },
  { left: 478, top: 1177, flipped: true, to: '/animals' },
  { left: 431, top: 1241, flipped: true },
  { left: 384, top: 1303, flipped: true },
  { left: 311, top: 1332, flipped: true },
  { left: 264, top: 1393, flipped: true },
  { left: 39, top: 1589, flipped: true, to: '/places' },
  { left: -8, top: 1653, flipped: true },
  { left: -55, top: 1715, flipped: true },
  { left: -1, top: 1778, flipped: true },
  { left: 61, top: 1833, flipped: true },
]

function StarMarker({ left, top, flipped, to, index = 0 }) {
  const transform = flipped ? 'scaleY(-1) rotate(180deg)' : undefined
  const src = to ? starActive : starLocked
  // Float animation lives on the absolute wrapper. Glow pulse lives on the
  // inner <img> so transforms don't fight (translateY × scale × filter compose
  // cleanly when on different DOM elements). Hover/active scale lives on its
  // own inner wrapper for active stars.
  const imgCls = to
    ? 'star-glow block w-full h-full select-none'
    : 'block w-full h-full select-none'
  const node = (
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      className={imgCls}
      style={{ transform }}
    />
  )
  const wrapperStyle = {
    left,
    top,
    width: STAR_W,
    height: STAR_H,
    animationDelay: `${((index * 0.27) % 3.4).toFixed(2)}s`,
  }
  if (to) {
    return (
      <Link
        to={to}
        className="absolute star-float"
        style={wrapperStyle}
        aria-label={`Start lesson at ${to}`}
      >
        <div className="w-full h-full cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-95">
          {node}
        </div>
      </Link>
    )
  }
  return (
    <div className="absolute star-float" style={wrapperStyle} aria-hidden>
      {node}
    </div>
  )
}

function useDragScroll() {
  const ref = useRef(null)
  const state = useRef(null)

  const onPointerDown = (e) => {
    // Don't hijack drags that start on an interactive child (the star Links).
    if (e.target.closest('a')) return
    const el = ref.current
    if (!el) return
    state.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startLeft: el.scrollLeft,
      startTop: el.scrollTop,
      dragging: false,
    }
    try {
      el.setPointerCapture(e.pointerId)
    } catch {
      // older browsers without pointer capture — drag still works
    }
  }

  const onPointerMove = (e) => {
    const s = state.current
    const el = ref.current
    if (!s || !el || s.pointerId !== e.pointerId) return
    const dx = e.clientX - s.startX
    const dy = e.clientY - s.startY
    if (!s.dragging && Math.hypot(dx, dy) < 4) return // ignore tiny jitters
    s.dragging = true
    el.style.cursor = 'grabbing'
    el.scrollLeft = s.startLeft - dx
    el.scrollTop = s.startTop - dy
  }

  const endDrag = () => {
    const s = state.current
    const el = ref.current
    if (!s || !el) return
    try {
      el.releasePointerCapture(s.pointerId)
    } catch {
      // ignore — capture may already have been released
    }
    el.style.cursor = ''
    state.current = null
  }

  return { ref, onPointerDown, onPointerMove, onPointerUp: endDrag, onPointerCancel: endDrag }
}

export default function LessonMap() {
  const { ref: scrollRef, onPointerDown, onPointerMove, onPointerUp, onPointerCancel } = useDragScroll()
  return (
    <div className="flex-1 relative overflow-hidden bg-white">
      <img
        src={bgMap}
        alt=""
        aria-hidden
        draggable={false}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute max-w-none pointer-events-none select-none object-cover"
        style={{ top: -2, left: -80, width: 516, height: 814 }}
      />

      <AppHeader />

      <div
        className="absolute z-20 bg-[#F16522] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center"
        style={{ top: 103, left: 7, width: 110, height: 24 }}
      >
        <span className="font-poppins font-black text-white text-[11px] leading-none">
          OLULIMI
        </span>
      </div>

      <div
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        className="absolute z-10 overflow-auto scrollbar-hover cursor-grab select-none"
        style={{ top: 143, left: 0, width: 375, height: 621, touchAction: 'pan-x pan-y' }}
      >
        <div className="relative" style={{ width: 650, height: 2135 }}>
          <div
            className="absolute flex items-center justify-center pointer-events-none"
            style={{ left: 181, top: 0, width: 187.967, height: 176.754 }}
          >
            <img
              src={abcIsland}
              alt="Alphabet"
              draggable={false}
              className="block max-w-none select-none object-cover animate-[spin_18s_linear_infinite]"
              style={{ width: 172.225, height: 159.626 }}
            />
          </div>

          <div
            className="absolute flex items-center justify-center pointer-events-none"
            style={{ left: 205, top: 272, width: 190.738, height: 199.661 }}
          >
            <img
              src={island15}
              alt=""
              aria-hidden
              draggable={false}
              className="block max-w-none select-none object-cover animate-[spin_22s_linear_infinite]"
              style={{ width: 163, height: 174 }}
            />
          </div>

          <img
            src={smallIsland}
            alt=""
            aria-hidden
            draggable={false}
            loading="lazy"
            decoding="async"
            className="absolute max-w-none select-none pointer-events-none animate-[spin_16s_linear_infinite]"
            style={{ left: 61, top: 711, width: 158, height: 154 }}
          />

          <img
            src={animalsMarker}
            alt="Animals"
            draggable={false}
            loading="lazy"
            decoding="async"
            className="absolute max-w-none select-none pointer-events-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] animate-[spin_20s_linear_infinite]"
            style={{ left: 380, top: 1010, width: 180, height: 224 }}
          />

          <img
            src={island12}
            alt=""
            aria-hidden
            draggable={false}
            loading="lazy"
            decoding="async"
            className="absolute max-w-none select-none pointer-events-none animate-[spin_24s_linear_infinite]"
            style={{ left: 73, top: 1389, width: 234, height: 252 }}
          />

          {STARS.map((s, i) => (
            <StarMarker key={i} {...s} index={i} />
          ))}

          <Link
            to="#"
            aria-label="Final reward"
            className="absolute origin-center transition-transform duration-200 ease-out hover:scale-[1.3]"
            style={{ left: 53, top: 1849, width: 305, height: 286 }}
          >
            <img
              src={starBurst}
              alt=""
              aria-hidden
              draggable={false}
              className="block w-full h-full select-none animate-[spin_8s_linear_infinite]"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
