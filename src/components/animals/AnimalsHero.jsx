import antelopeHead from '../../assets/people-antelope-head.png'

// Orange hero ribbon at the top of every Animals lesson screen (Figma frames
// 529:160 / 529:196 / 529:261 / etc). The ribbon itself is a 423×201 navy-orange
// box that bleeds off the left edge; an antelope-head sprite is cropped into
// a 139×171 box on the right via the standard sprite-crop technique
// (gotcha rule #11). `children` receives the title slot.
//
// `antelopeCrop` defaults to the list-page crop (head waving). Quiz pages
// nudge the crop slightly so the antelope appears more centered — pass the
// quiz crop variant when reusing on test screens.
export const LIST_ANTELOPE_CROP = { top: -82.56, left: -353.39, width: 781.69, height: 503.22 }
export const QUIZ_ANTELOPE_CROP = { top: -77.95, left: -451.33, width: 781.69, height: 503.22 }

export default function AnimalsHero({ children, antelopeCrop = LIST_ANTELOPE_CROP }) {
  return (
    <>
      <div
        className="absolute bg-[#f16522] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-10"
        style={{ top: 87, left: -36, width: 423, height: 201 }}
      />

      <div
        className="absolute overflow-hidden pointer-events-none z-20"
        style={{ top: 99, left: 208, width: 139, height: 171 }}
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
    </>
  )
}
