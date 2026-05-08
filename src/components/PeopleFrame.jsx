import AppHeader from './AppHeader'
import handsBg from '../assets/people-hands-bg.png'

export default function PeopleFrame({
  children,
  bgColor = '#ffffff',
  showPill = true,
  showHandsBg = true,
  pillLabel = 'Abantu',
  pillTextColor = '#f16522',
  roundedHeader = false,
}) {
  return (
    <div className="flex-1 relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      <AppHeader roundedBottom={roundedHeader} />

      {showPill && (
        <div className="absolute top-[103px] left-[7px] w-[110px] h-[24px] bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-30">
          <span
            className="font-poppins font-black text-[11px] leading-none"
            style={{ color: pillTextColor }}
          >
            {pillLabel}
          </span>
        </div>
      )}

      {showHandsBg && (
        <div
          className="absolute pointer-events-none overflow-hidden z-0"
          style={{ top: 572, left: -6, width: 467, height: 240 }}
        >
          <img
            src={handsBg}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute max-w-none select-none"
            style={{
              top: '-125.92%',
              left: '-16.86%',
              width: '133.96%',
              height: '260.39%',
            }}
          />
        </div>
      )}

      {children}
    </div>
  )
}
