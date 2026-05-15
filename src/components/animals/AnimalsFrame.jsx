import AppHeader from '../AppHeader'
import LessonsMusicGate from '../LessonsMusicGate'
import jungleBg from '../../assets/animals-jungle-bg.png'
import { useLessonsMusic } from '../../lib/lessonsMusic'

// Shared shell for Animals 1–7 lesson screens. Renders the jungle background
// (image 61 in Figma — sized 448×722 at offset (-10, 90) per gotcha rule #3),
// the standard AppHeader, and the topic pill ("Ebisoro").
export default function AnimalsFrame({
  children,
  bgColor = '#ffffff',
  showPill = true,
  showJungle = true,
  pillLabel = 'Ebisoro',
  pillBg = '#FFFFFF',
  pillTextColor = '#000000',
  playMusic = true,
}) {
  const ready = useLessonsMusic(playMusic)
  const showGate = playMusic && !ready

  return (
    <div className="flex-1 relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      {showJungle && (
        <img
          src={jungleBg}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute max-w-none pointer-events-none select-none object-cover"
          style={{ top: 48, left: -10, width: 448, height: 764 }}
        />
      )}

      <AppHeader />

      {showPill && (
        <div
          className="absolute top-[61px] left-[7px] w-[110px] h-[24px] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-30"
          style={{ backgroundColor: pillBg }}
        >
          <span
            className="font-poppins font-black text-[11px] leading-none"
            style={{ color: pillTextColor }}
          >
            {pillLabel}
          </span>
        </div>
      )}

      {children}

      {showGate && <LessonsMusicGate />}
    </div>
  )
}
