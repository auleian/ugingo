import { playWordAudio } from '../../lib/sound'

export default function PlacesListRow({ top, luganda, english, icon, iconSize = 50, audioSrc }) {
  // Wrapper anchors to frame x = -19. Inner children use frame-coordinates
  // shifted by +19 so they line up with Figma's absolute values.
  const ROW_H = 61.474
  const FRAME_X_ICON = 80
  const FRAME_X_TEXT = 175
  const speak = () => playWordAudio(audioSrc)
  return (
    <div
      className="absolute cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-1.5"
      style={{ top, left: -19, width: 426, height: ROW_H }}
      onPointerEnter={speak}
      onClick={speak}
    >
      <div className="absolute inset-0 bg-[#69cad3] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]" />

      <div
        className="absolute flex items-center justify-center"
        style={{
          top: (ROW_H - iconSize) / 2,
          left: FRAME_X_ICON + 19 - (iconSize - 46) / 2,
          width: iconSize,
          height: iconSize,
        }}
      >
        {typeof icon === 'string' ? (
          <span className="font-poppins font-black text-white leading-none" style={{ fontSize: 42 }}>
            {icon}
          </span>
        ) : (
          icon
        )}
      </div>

      <div
        className="absolute"
        style={{ top: 6, left: FRAME_X_TEXT + 19, width: 200 }}
      >
        <p className="font-poppins font-black text-white text-[24px] leading-tight">
          {luganda}
        </p>
        <p className="font-opensans font-semibold text-[#f8c83c] text-[13px] leading-tight">
          {english}
        </p>
      </div>
    </div>
  )
}
