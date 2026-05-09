import antelope from '../../assets/places-antelope.png'

const MODES = {
  list:   { height: 246, imgH: '297.75%', imgTop: '-48.85%' },
  banner: { height: 155, imgH: '472.56%', imgTop: '-77.53%' },
}

export default function PlacesAntelope({ mode = 'list', top = 115, left = 218, width = 118 }) {
  const m = MODES[mode] ?? MODES.list
  return (
    <div
      className="absolute"
      style={{ top, left, width, height: m.height, filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.25))' }}
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
