import { useNavigate } from 'react-router-dom'
import mascotSprite from '../assets/mascot.png'
import flagLuganda from '../assets/flag-luganda.png'
import flagLangi from '../assets/flag-langi.png'
import flagLugisu from '../assets/flag-lugisu.png'
import flagLusoga from '../assets/flag-lusoga.png'
import flagAteso from '../assets/flag-ateso.png'
import flagRuyankore from '../assets/flag-ruyankore.png'
import flagRunyoro from '../assets/flag-runyoro.png'

const LANGUAGES = [
  {
    id: 'luganda',
    label: 'Luganda',
    src: flagLuganda,
    img: { left: -1, top: -1, width: 33, height: 22 },
    available: true,
  },
  {
    id: 'langi',
    label: 'Langi',
    src: flagLangi,
    img: { left: -4, top: -1.5, width: 37, height: 25 },
    overlay: 'rgba(48,44,44,0.85)',
    available: false,
  },
  {
    id: 'lugbara',
    label: 'Lugbara',
    src: flagLangi,
    img: { left: -4, top: -1.5, width: 37, height: 25 },
    overlay: 'rgba(48,44,44,0.85)',
    available: false,
  },
  {
    id: 'lugisu',
    label: 'Lugisu',
    src: flagLugisu,
    img: { left: -3, top: -3, width: 36, height: 27 },
    overlay: 'rgba(48,44,44,0.89)',
    available: false,
  },
  {
    id: 'lusoga',
    label: 'Lusoga',
    src: flagLusoga,
    img: { left: -1, top: 0, width: 32, height: 21 },
    overlay: 'rgba(48,44,44,0.79)',
    available: false,
  },
  {
    id: 'ateso',
    label: 'Ateso',
    src: flagAteso,
    img: { left: -8, top: 0, width: 46, height: 20 },
    overlay: 'rgba(48,44,44,0.85)',
    available: false,
  },
  {
    id: 'ruyankore',
    label: 'Ruyankore',
    src: flagRuyankore,
    img: { left: 0, top: 0, width: 30, height: 20, rounded: true },
    overlay: 'rgba(48,44,44,0.86)',
    available: false,
  },
  {
    id: 'runyoro',
    label: 'Runyoro',
    src: flagRunyoro,
    img: { left: 0, top: 0, width: 30, height: 20 },
    overlay: 'rgba(48,44,44,0.85)',
    available: false,
  },
]

function Flag({ lang }) {
  const { src, img, overlay, available } = lang
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{
        width: 30,
        height: 20,
        borderRadius: 2,
        background: available ? undefined : '#e8e8f4',
      }}
    >
      <img
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute max-w-none object-cover pointer-events-none select-none"
        style={{
          left: img.left,
          top: img.top,
          width: img.width,
          height: img.height,
          borderRadius: img.rounded ? 2 : undefined,
        }}
      />
      {!available && (
        <div className="absolute inset-0 pointer-events-none" style={{ background: overlay }} />
      )}
    </div>
  )
}

export default function Languages() {
  const navigate = useNavigate()

  function handleSelect(lang) {
    if (!lang.available) return
    navigate('/question/1')
  }

  return (
    <div className="flex-1 relative bg-white overflow-y-auto scrollbar-hover">
      {/* Mascot 70×88 at (27, 80) — uses mascot.png sprite cropped via overflow technique */}
      <div className="absolute overflow-hidden" style={{ left: 27, top: 80, width: 70, height: 88 }}>
        <img
          src={mascotSprite}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute max-w-none pointer-events-none select-none"
          style={{ width: '525.8%', height: '335.66%', left: '-415.53%', top: '-108.5%' }}
        />
      </div>

      {/* Question bubble at (117, 82) 228×84 */}
      <div
        className="absolute"
        style={{
          left: 117,
          top: 82,
          width: 228,
          height: 84,
          background: 'rgba(85,137,244,0.05)',
          borderRadius: 20,
          boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
        }}
      />
      {/* Question text at (133, 98) 188×52 */}
      <p
        className="absolute font-baloo font-normal text-[#1e1c1c]"
        style={{ left: 133, top: 98, width: 188, height: 52, fontSize: 18, lineHeight: 'normal' }}
      >
        What language would you like to learn?
      </p>

      {/* Language list at (12, 232) 335×502 — 8 rows of 47px height with 18px gap */}
      <div
        className="absolute flex flex-col"
        style={{ left: 12, top: 232, width: 335, gap: 18 }}
      >
        {LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            type="button"
            onClick={() => handleSelect(lang)}
            disabled={!lang.available}
            className={`bg-white border-2 border-[#eff1f5] rounded-[16px] flex items-center text-left transition ${
              lang.available ? 'active:scale-[0.99]' : 'cursor-not-allowed'
            }`}
            style={{
              width: 335,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 12,
              paddingBottom: 12,
              gap: 12,
              boxShadow: '0px 4px 0px 0px #eff1f5',
            }}
          >
            <Flag lang={lang} />
            <span
              className="font-baloo font-normal whitespace-nowrap"
              style={{
                fontSize: 16,
                color: lang.available ? '#1e1c1c' : 'rgba(30,28,28,0.56)',
                lineHeight: 'normal',
              }}
            >
              {lang.label}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom spacer so the last row clears the viewport on small frames */}
      <div style={{ position: 'absolute', top: 232 + 502 + 24, left: 0, width: 1, height: 1 }} />
    </div>
  )
}
