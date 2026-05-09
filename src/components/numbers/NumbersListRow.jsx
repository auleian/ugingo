function countGraphemes(s) {
  try {
    return [...new Intl.Segmenter().segment(s)].length
  } catch {
    return s.replace(/️/g, '').length / 2
  }
}

function pickFontSize(count) {
  if (count <= 1) return 18
  if (count <= 4) return 9
  if (count <= 6) return 7
  if (count <= 10) return 6
  if (count <= 15) return 5
  return 4
}

export default function NumbersListRow({ index, word, pronounce, icon, top }) {
  const count = countGraphemes(icon)
  const isMulti = count > 1
  const fontSize = pickFontSize(count)
  const iconWidth = isMulti ? 30 : 'auto'

  return (
    <>
      <div
        className="absolute bg-[#f8c83c] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-10"
        style={{ top, left: 19, width: 335, height: 58.63 }}
      />

      <div
        className="absolute rounded-full bg-[#69cad3] border-[3px] border-white shadow-[0_4px_4px_rgba(0,0,0,0.18)] flex items-center justify-center z-20"
        style={{ top: top + 7, left: 30, width: 45, height: 43 }}
      >
        <span className="font-opensans font-extrabold text-[#2e4858] text-[24px] leading-none">
          {index}
        </span>
      </div>

      <div
        className="absolute z-20 leading-none"
        style={{ top: top + 7, left: 103, width: 180 }}
      >
        <p className="font-poppins font-black text-[#2e4858] text-[20px] leading-tight">
          {word}
        </p>
        <p className="mt-[2px] font-poppins font-black text-[#2e4858] text-[13px] leading-tight">
          {pronounce}
        </p>
      </div>

      <div
        className="absolute rounded-full bg-[#2e4858] flex items-center justify-center overflow-hidden z-20"
        style={{ top: top + 9, left: 286, width: 45, height: 43 }}
      >
        <span
          className="text-white text-center break-all"
          style={{ width: iconWidth, fontSize, lineHeight: 1.05 }}
          aria-hidden
        >
          {icon}
        </span>
      </div>
    </>
  )
}
