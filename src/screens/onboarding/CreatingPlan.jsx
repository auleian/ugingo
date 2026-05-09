import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppHeader from '../../components/AppHeader'
import Mascot from '../../components/Mascot'
import { playMilestone, stopMilestone } from '../../lib/sound'

const ANIMATION_MS = 2500

export default function CreatingPlan() {
  const [progress, setProgress] = useState(0)
  const done = progress >= 1

  useEffect(() => {
    playMilestone()
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / ANIMATION_MS)
      setProgress(t)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      stopMilestone()
    }
  }, [])

  return (
    <div className="flex-1 bg-white relative overflow-hidden">
      <AppHeader />

      <Mascot
        variant="bodyFront"
        size={92}
        withCircle={false}
        className="absolute top-[162px] left-[142px]"
      />

      <div className="absolute top-[352px] left-[74px] w-[228px] h-[84px] bg-[rgba(85,137,244,0.05)] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-4 pt-3">
        <p className="text-center text-[18px] font-baloo font-bold leading-snug text-[#1e1c1c]">
          Gingo has prepared
          <br />
          your practice plan...
        </p>
      </div>

      <div className="absolute top-[529px] left-[49px] w-[220px] h-[6px] bg-[#f2f2f2] rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <p
        className="absolute top-[517px] left-[283px] text-center text-[20px] font-baloo text-[#1e1c1c]"
      >
        {Math.round(progress * 100)}%
      </p>

      {done && (
        <Link
          to="/ready"
          className="absolute flex items-center justify-center text-center text-[#2e4858] font-opensans font-bold text-[16px] tracking-wide"
          style={{ top: 663, left: 105, width: 161, height: 28 }}
        >
          Tap to continue
        </Link>
      )}
    </div>
  )
}
