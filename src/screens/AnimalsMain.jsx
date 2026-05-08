import AppHeader from '../components/AppHeader'
import AnimalsPillButton from '../components/AnimalsPillButton'
import heroBg from '../assets/animals-hero-bg.png'

// Hero / cover screen for the Animals lesson. The full-bleed scene
// (image 60: 545×738 at offset (-74, 74)) shows the papyrus scroll and a
// frieze of peeking animals — the title sits centered on the scroll.
export default function AnimalsMain() {
  return (
    <div className="flex-1 relative overflow-hidden bg-white">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute max-w-none pointer-events-none select-none object-cover"
        style={{ top: 74, left: -74, width: 545, height: 738 }}
      />

      <AppHeader roundedBottom />

      <div className="absolute top-[103px] left-[7px] w-[110px] h-[24px] bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-30">
        <span className="font-poppins font-black text-[#f16522] text-[11px] leading-none">
          Ebisoro
        </span>
      </div>

      <div
        className="absolute z-20 text-center font-poppins font-black"
        style={{ top: 428, left: 28, width: 320 }}
      >
        <p className="text-white" style={{ fontSize: 70, lineHeight: 1 }}>
          Ebisolo
        </p>
        <p className="text-[#2e4858]" style={{ fontSize: 32, lineHeight: 1, marginTop: 8 }}>
          Animals
        </p>
      </div>

      <AnimalsPillButton
        to="/animals/1"
        size="md"
        className="absolute z-30"
        style={{ top: 746, left: 242 }}
      >
        Next
      </AnimalsPillButton>
    </div>
  )
}
