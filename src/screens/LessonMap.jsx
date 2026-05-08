import { Link } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import bgMap from '../assets/bg-lesson-map.png'
import abcIsland from '../assets/lesson-map-abc.png'
import island15 from '../assets/lesson-map-island-15.png'
import smallIsland from '../assets/lesson-map-island-16.png'
import animalsMarker from '../assets/mascot-antelope-side.png'
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

function StarMarker({ left, top, flipped, to }) {
  const transform = flipped ? 'scaleY(-1) rotate(180deg)' : undefined
  const src = to ? starActive : starLocked
  const node = (
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      className="block w-full h-full select-none"
      style={{ transform }}
    />
  )
  const style = { left, top, width: STAR_W, height: STAR_H }
  if (to) {
    return (
      <Link
        to={to}
        className="absolute star-glow cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-95"
        style={style}
        aria-label={`Start lesson at ${to}`}
      >
        {node}
      </Link>
    )
  }
  return (
    <div className="absolute" style={style} aria-hidden>
      {node}
    </div>
  )
}

export default function LessonMap() {
  return (
    <div className="flex-1 relative overflow-hidden bg-white">
      <img
        src={bgMap}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute max-w-none pointer-events-none select-none object-cover"
        style={{ top: -2, left: -80, width: 516, height: 814 }}
      />

      <AppHeader roundedBottom />

      <div
        className="absolute z-20 bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center"
        style={{ top: 103, left: 7, width: 110, height: 24 }}
      >
        <span className="font-poppins font-black text-[#f16522] text-[11px] leading-none">
          OLULIMI
        </span>
      </div>

      <div
        className="absolute z-10 overflow-y-auto overflow-x-hidden scrollbar-hover"
        style={{ top: 143, left: 0, width: 375, height: 621 }}
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
              className="block max-w-none select-none object-cover"
              style={{ width: 172.225, height: 159.626, transform: 'rotate(6deg)' }}
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
              className="block max-w-none select-none object-cover"
              style={{ width: 163, height: 174, transform: 'rotate(10deg)' }}
            />
          </div>

          <img
            src={smallIsland}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute max-w-none select-none pointer-events-none"
            style={{ left: 61, top: 711, width: 158, height: 154 }}
          />

          <img
            src={animalsMarker}
            alt="Animals"
            draggable={false}
            className="absolute max-w-none select-none pointer-events-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            style={{ left: 380, top: 1010, width: 180, height: 224 }}
          />

          <img
            src={island12}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute max-w-none select-none pointer-events-none"
            style={{ left: 73, top: 1389, width: 234, height: 252 }}
          />

          {STARS.map((s, i) => (
            <StarMarker key={i} {...s} />
          ))}

          <Link
            to="/profile"
            aria-label="All lessons complete — view profile"
            className="absolute"
            style={{ left: 53, top: 1849, width: 305, height: 286 }}
          >
            <img
              src={starBurst}
              alt=""
              aria-hidden
              draggable={false}
              className="block w-full h-full select-none"
              style={{ transform: 'scaleY(-1) rotate(180deg)' }}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
