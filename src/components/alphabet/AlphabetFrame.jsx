import AppHeader from '../AppHeader'
import LessonsMusicGate from '../LessonsMusicGate'
import patternBg from '../../assets/alphabet-pattern-bg.png'
import { useLessonsMusic } from '../../lib/lessonsMusic'

export default function AlphabetFrame({
  children,
  background = 'pattern',
  showPill = true,
  customBg,
  playMusic = true,
}) {
  const ready = useLessonsMusic(playMusic)
  const showGate = playMusic && !ready

  const bgStyle =
    background === 'pattern'
      ? {
          backgroundImage: `url(${patternBg})`,
          backgroundSize: '822px 822px',
          backgroundPosition: '-150px -10px',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#ffffff',
        }
      : background === 'plain'
      ? { backgroundColor: '#ffffff' }
      : customBg || { backgroundColor: '#ffffff' }

  return (
    <div className="flex-1 relative overflow-hidden" style={bgStyle}>
      <AppHeader />

      {showPill && (
        <div className="absolute top-[103px] left-[7px] w-[110px] h-[24px] bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-20">
          <span className="font-poppins font-black text-[#f16522] text-[11px] leading-none">
            Warifu
          </span>
        </div>
      )}

      {children}

      {showGate && <LessonsMusicGate />}
    </div>
  )
}
