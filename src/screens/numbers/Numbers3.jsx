import { Link } from 'react-router-dom'
import NumbersFrame from '../../components/numbers/NumbersFrame'
import Mascot from '../../components/Mascot'

const EXAMPLES = [
  { index: 12, word: 'Kkumi na bbiri', icon: '⚽'.repeat(12), top: 418.3 },
  { index: 15, word: 'Kkumi na ttaano', icon: '⚽'.repeat(15), top: 492 },
  { index: 19, word: 'Kkumi na mwenda', icon: '⚽'.repeat(19), top: 566.15 },
]

function ExampleRow({ index, word, icon, top }) {
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
        <span className="font-opensans font-extrabold text-[#2e4858] text-[20px] leading-none">
          {index}
        </span>
      </div>
      <p
        className="absolute z-20 font-poppins font-black text-[#2e4858] text-[18px] leading-tight"
        style={{ top: top + 18, left: 84, right: 70 }}
      >
        {word}
      </p>
      <div
        className="absolute rounded-full bg-[#2e4858] flex items-center justify-center z-20 overflow-hidden"
        style={{ top: top + 9, left: 286, width: 45, height: 43 }}
      >
        <span
          className="text-white text-center break-all"
          style={{ width: 30, fontSize: 4, lineHeight: 1.05 }}
          aria-hidden
        >
          {icon}
        </span>
      </div>
    </>
  )
}

export default function Numbers3() {
  return (
    <NumbersFrame>
      <Mascot
        variant="antelopeSide"
        size={139}
        withCircle={false}
        className="absolute z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.18)]"
        style={{ top: 99, left: 212 }}
      />

      <div
        className="absolute z-10 text-center font-poppins font-black text-[#2e4858] text-[16px] leading-tight"
        style={{ top: 185, left: 15, width: 219, height: 48 }}
      >
        <p>Eteeka ga &ldquo;Na&rdquo;</p>
        <p>The &ldquo;Na&rdquo; rule (11-19)</p>
      </div>

      <div
        className="absolute bg-[#2e4858] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center z-10 px-3"
        style={{ top: 270, left: 20, width: 327, height: 108 }}
      >
        <p className="font-poppins font-black text-white text-[20px] text-center leading-tight">
          10 + 1 = 11
        </p>
        <p className="mt-2 font-poppins font-black text-white text-[20px] text-center leading-tight">
          Kkumi gatako emu = kkumi-ne-mu
        </p>
      </div>

      <p
        className="absolute z-10 font-opensans font-extrabold text-[#2e4858] text-[13px]"
        style={{ top: 391, left: '50%', transform: 'translateX(-50%)' }}
      >
        Examples
      </p>

      {EXAMPLES.map((ex) => (
        <ExampleRow key={ex.index} {...ex} />
      ))}

      <Link
        to="/numbers/2"
        className="absolute bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-20"
        style={{ top: 711, left: 35, width: 115, height: 33.75 }}
      >
        <span className="font-poppins font-black text-[#f8c83c] text-[11px] leading-none">
          Previous
        </span>
      </Link>

      <Link
        to="/numbers/4"
        className="absolute bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-20"
        style={{ top: 711, left: 209, width: 115, height: 33.75 }}
      >
        <span className="font-poppins font-black text-[#f8c83c] text-[11px] leading-none">
          Next
        </span>
      </Link>
    </NumbersFrame>
  )
}
