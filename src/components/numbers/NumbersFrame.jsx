import AppHeader from '../AppHeader'
import LessonsMusicGate from '../LessonsMusicGate'
import lessonBg from '../../assets/numbers-lesson-bg.png'
import { useLessonsMusic } from '../../lib/lessonsMusic'

export default function NumbersFrame({ children, showBg = true, bgColor = '#f9efde', playMusic = true }) {
  const ready = useLessonsMusic(playMusic)
  const showGate = playMusic && !ready

  return (
    <div className="flex-1 relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      {showBg && (
        <div
          className="absolute pointer-events-none"
          style={{ top: 45, left: -426, width: 1472, height: 725, transform: 'rotate(180deg)' }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={lessonBg}
              alt=""
              aria-hidden
              draggable={false}
              className="absolute max-w-none select-none"
              style={{ top: 0, left: 0, width: '100%', height: '172.66%' }}
            />
          </div>
        </div>
      )}

      <AppHeader />

      <div className="absolute top-[83px] left-[7px] w-[110px] h-[24px] bg-[#F16522] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-20">
        <span className="font-poppins font-black text-white text-[11px] leading-none">
          Ennamba
        </span>
      </div>

      {children}

      {showGate && <LessonsMusicGate />}
    </div>
  )
}
