const ACTIVE_COLOR = '#69CAD3'
const INACTIVE_COLOR = '#C5CDD3'

const BARS = [
  { x: 4, y: 22, w: 6, h: 12 },
  { x: 14, y: 14, w: 6, h: 20 },
  { x: 24, y: 6, w: 6, h: 28 },
]

export default function StatIcon({ level = 0, size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {BARS.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx={1.5}
          fill={i < level ? ACTIVE_COLOR : INACTIVE_COLOR}
        />
      ))}
    </svg>
  )
}
