import cloudCard from '../../assets/bg-success-cloud.png'
import creamPill from '../../assets/cream-pill.svg'

export default function AlphabetCard({
  letter,
  say,
  emoji,
  word,
  translation,
  top,
  left,
  width = 199,
  height = 124,
}) {
  return (
    <div
      className="absolute drop-shadow-[0_4px_4px_rgba(241,101,34,0.34)]"
      style={{ top, left, width, height }}
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

      <p className="absolute top-[9px] left-1/2 -translate-x-1/2 font-poppins font-black text-[#2e4858] text-[30px] leading-none whitespace-nowrap">
        {letter}
      </p>

      <p className="absolute top-[44px] left-1/2 -translate-x-1/2 font-opensans font-semibold text-[#2e4858] text-[11px] leading-none whitespace-nowrap">
        {say}
      </p>

      <div
        className="absolute"
        style={{ top: 68, left: 36, width: 128, height: 38 }}
      >
        <img src={creamPill} alt="" aria-hidden draggable={false} className="absolute inset-0 w-full h-full" />
        <span className="absolute left-[8px] top-1/2 -translate-y-1/2 text-[16px] leading-none">
          {emoji}
        </span>
        <div className="absolute right-[6px] top-1/2 -translate-y-1/2 w-[88px] text-center font-opensans font-semibold text-[#2e4858] leading-tight">
          <p className="text-[10px] leading-none">{word}</p>
          {translation && (
            <p className="mt-[2px] text-[5px] leading-none">{translation}</p>
          )}
        </div>
      </div>
    </div>
  )
}
