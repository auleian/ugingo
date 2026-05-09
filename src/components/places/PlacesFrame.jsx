import AppHeader from '../AppHeader'
import LessonsMusicGate from '../LessonsMusicGate'
import cityBg from '../../assets/places-city-bg.png'
import { useLessonsMusic } from '../../lib/lessonsMusic'

export default function PlacesFrame({ children, showCityBg = true, showPill = true, playMusic = true }) {
  const ready = useLessonsMusic(playMusic)
  const showGate = playMusic && !ready

  return (
    <div className="flex-1 relative overflow-hidden bg-white">
      {showCityBg && (
        <div
          className="absolute pointer-events-none"
          style={{ top: 54, left: -537, width: 1377, height: 758, opacity: 0.42 }}
        >
          <img
            src={cityBg}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute inset-0 max-w-none w-full h-full object-cover select-none"
          />
        </div>
      )}

      <AppHeader />

      {showPill && (
        <div className="absolute top-[103px] left-[7px] w-[110px] h-[24px] bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-20">
          <span className="font-poppins font-black text-[#f16522] text-[11px] leading-none">
            Ebifo
          </span>
        </div>
      )}

      {children}

      {showGate && <LessonsMusicGate />}
    </div>
  )
}
