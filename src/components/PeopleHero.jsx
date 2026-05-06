import antelopeHead from '../assets/people-antelope-head.png'

// Cyan #69cad3 banner with antelope head peeking out, plus a dark navy ribbon
// at y=270. Used by People 1-8. Title content is supplied via children.
//
// `antelopeCrop` lets each screen tweak the image-37 inner crop percentages
// (Figma varies them slightly per screen so the head is framed differently).
const DEFAULT_CROP = { top: -76.05, left: -450.33, width: 781.69, height: 503.22 }

export default function PeopleHero({ children, antelopeCrop = DEFAULT_CROP }) {
  return (
    <>
      <div
        className="absolute bg-[#69cad3] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        style={{ top: 87, left: -32, width: 423, height: 201 }}
      />

      <div
        className="absolute overflow-hidden pointer-events-none"
        style={{ top: 99, left: 212, width: 139, height: 171 }}
      >
        <img
          src={antelopeHead}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute max-w-none select-none"
          style={{
            top: `${antelopeCrop.top}%`,
            left: `${antelopeCrop.left}%`,
            width: `${antelopeCrop.width}%`,
            height: `${antelopeCrop.height}%`,
          }}
        />
      </div>

      {children}

      <div
        className="absolute bg-[#2e4858] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        style={{ top: 270, left: -32, width: 423, height: 18 }}
      />
    </>
  )
}
