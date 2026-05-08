const LEVELS = {
  1: [
    { x: 4, y: 21, h: 6, fill: '#b4ffb3' },
    { x: 13, y: 18, h: 9, fill: '#a4f0a3' },
    { x: 22, y: 15, h: 12, fill: '#8fdc8d' },
  ],
  2: [
    { x: 4, y: 19, h: 8, fill: '#b3e4ff' },
    { x: 13, y: 16, h: 11, fill: '#a3cbf0' },
    { x: 22, y: 12, h: 15, fill: '#8daddc' },
  ],
  3: [
    { x: 4, y: 18, h: 9, fill: '#c7b3ff' },
    { x: 13, y: 11, h: 16, fill: '#aea3f0' },
    { x: 22, y: 6, h: 21, fill: '#ab8ddc' },
  ],
  4: [
    { x: 4, y: 24, h: 6, fill: '#ffb3dc' },
    { x: 13, y: 13, h: 17, fill: '#f0a3d1' },
    { x: 22, y: 4, h: 26, fill: '#d776b0' },
  ],
}

export default function StatBarsIcon({ level = 1, size = 34 }) {
  const bars = LEVELS[level] || LEVELS[1]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={8} height={b.h} rx={2} fill={b.fill} />
      ))}
    </svg>
  )
}
