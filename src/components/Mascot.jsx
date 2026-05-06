import mascotHead from '../assets/mascot-default.png'
import mascotBody from '../assets/mascot-body-default.png'
import mascotBodyFront from '../assets/mascot-body-thinking.png'
import kingoWaving from '../assets/kingo-waving.png'
import kingoFront from '../assets/kingo-front.png'
import antelopeSide from '../assets/mascot-antelope-side.png'
import antelopeFront from '../assets/mascot-antelope-front.png'
import antelopeCry from '../assets/mascot-antelope-cry.png'

const VARIANTS = {
  default: { src: mascotHead, ratio: 783 / 976 },
  body: { src: mascotBody, ratio: 1107 / 2055 },
  bodyFront: { src: mascotBodyFront, ratio: 943 / 1952 },
  kingoWaving: { src: kingoWaving, ratio: 644 / 1062 },
  kingoFront: { src: kingoFront, ratio: 524 / 684 },
  antelopeSide: { src: antelopeSide, ratio: 524 / 652 },
  antelopeFront: { src: antelopeFront, ratio: 524 / 1040 },
  antelopeCry: { src: antelopeCry, ratio: 524 / 684 },
}

export default function Mascot({
  variant = 'default',
  size = 170,
  withCircle = true,
  innerScale = 0.6,
  className = '',
  style,
}) {
  const { src } = VARIANTS[variant] ?? VARIANTS.default

  if (!withCircle) {
    return (
      <img
        src={src}
        alt=""
        draggable={false}
        className={`select-none ${className}`}
        style={{ width: size, height: 'auto', ...style }}
      />
    )
  }

  return (
    <div
      className={`rounded-full bg-brand flex items-center justify-center overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        className="select-none"
        style={{ width: `${innerScale * 100}%`, height: 'auto' }}
      />
    </div>
  )
}
