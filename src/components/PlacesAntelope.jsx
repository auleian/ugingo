import antelope from '../assets/places-antelope.png'

const MODES = {
  list:   { height: 246, imgH: '297.75%', imgTop: '-48.85%' },
  banner: { height: 155, imgH: '472.56%', imgTop: '-77.53%' },
}

export default function PlacesAntelope({ mode = 'list', top = 115, left = 218, width = 118 }) {
  const m = MODES[mode] ?? MODES.list
  return (
    <div
      className="absolute shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      style={{ top, left, width, height: m.height }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={antelope}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute max-w-none select-none"
          style={{ height: m.imgH, top: m.imgTop, width: '781.69%', left: '-353.39%' }}
        />
      </div>
    </div>
  )
}
