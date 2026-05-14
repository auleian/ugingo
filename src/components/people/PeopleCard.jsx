import cloudCard from '../../assets/bg-success-cloud.png'

const CIRCLE_SIZE = 45
const CIRCLE_HEIGHT = 43.511

// Single lesson card: scalloped cloud-card holding an orange circle (with an
// emoji) on the left, and a Luganda word + English translation on the right.
//
// The card box is 202×127 (Figma). Inner content uses flex alignment so the
// circle and text stay properly aligned regardless of which slot the card
// occupies in the 2×2 grid (Figma's per-card pixel coords drift 1-12px between
// top-left/top-right/bottom-left/bottom-right; flex centering normalises that).
export default function PeopleCard({
  top,
  left,
  emoji,
  word,
  translation,
  emojiSize = 20,
  wordSize = 16,
  translationSize = 13,
}) {
  return (
    <div
      className="absolute drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-1.5"
      style={{ top, left, width: 202, height: 127 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={cloudCard}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute max-w-none select-none"
          style={{ top: '-70.36%', left: '-25.5%', width: '151.98%', height: '242.69%' }}
        />
      </div>

      <div className="absolute inset-0 flex items-center gap-[14px]" style={{ paddingLeft: 27, paddingRight: 16 }}>
        <div
          className="shrink-0 rounded-full bg-[#f7ae2b] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center"
          style={{ width: CIRCLE_SIZE, height: CIRCLE_HEIGHT }}
        >
          <span
            className="leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            style={{ fontSize: emojiSize }}
            aria-hidden
          >
            {emoji}
          </span>
        </div>

        <div className="min-w-0 flex-1 leading-tight">
          <p
            className="font-poppins font-black text-[#2e4858] truncate"
            style={{ fontSize: wordSize, lineHeight: 1.15 }}
          >
            {word}
          </p>
          <p
            className="font-opensans font-semibold text-[#f16522] truncate"
            style={{ fontSize: translationSize, lineHeight: 1.15 }}
          >
            {translation}
          </p>
        </div>
      </div>
    </div>
  )
}
