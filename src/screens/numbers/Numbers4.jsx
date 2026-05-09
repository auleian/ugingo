import { Link } from 'react-router-dom'
import NumbersFrame from '../../components/numbers/NumbersFrame'
import Mascot from '../../components/Mascot'

const TENS = [
  { num: 20, word: 'Abiri' },
  { num: 30, word: 'Asatu' },
  { num: 40, word: 'Ana' },
  { num: 50, word: 'Ataano' },
  { num: 60, word: 'Nkaaga' },
  { num: 70, word: 'Nsanvu' },
  { num: 80, word: 'Kinaana' },
  { num: 90, word: 'Kyenda' },
  { num: 100, word: 'Kikumi' },
]

function TensCard({ num, word }) {
  const balls = '⚽'.repeat(num)
  return (
    <div className="relative w-[161px] h-[108px] bg-[#f8c83c] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
      <div className="absolute top-[12px] left-[11px] w-[45px] h-[43px] rounded-full bg-[#69cad3] border-[3px] border-white shadow-[0_4px_4px_rgba(0,0,0,0.18)] flex items-center justify-center">
        <span className="font-opensans font-extrabold text-[#2e4858] text-[20px] leading-none">
          {num}
        </span>
      </div>

      <p
        className="absolute font-poppins font-black text-[#2e4858] leading-none"
        style={{ left: 15, bottom: 14, fontSize: 14 }}
      >
        {word}
      </p>

      <p
        className="absolute leading-[1.05] break-all"
        style={{ left: 89, bottom: 8, width: 62, fontSize: 6 }}
        aria-hidden
      >
        {balls}
      </p>
    </div>
  )
}

export default function Numbers4() {
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
        className="absolute z-10 text-center font-poppins font-black text-[#2e4858] leading-tight"
        style={{ top: 185, left: 16, width: 219, height: 58 }}
      >
        <p className="text-[16px]">The Tens (20-100)</p>
        <p className="text-[11px]">Notice they sound like the single numbers</p>
      </div>

      <div
        className="absolute bg-[#2e4858] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-10"
        style={{ top: 270, left: -24, width: 423, height: 18 }}
      />

      <div
        className="absolute z-10 overflow-y-auto scrollbar-hover"
        style={{ top: 300, left: 19, width: 335, height: 359 }}
      >
        <div className="grid grid-cols-2 gap-x-[13px] gap-y-[21px]">
          {TENS.slice(0, 8).map((t) => (
            <TensCard key={t.num} {...t} />
          ))}
          <div className="col-span-2 flex justify-center">
            <TensCard num={100} word="Kikumi" />
          </div>
        </div>
      </div>

      <Link
        to="/numbers/3"
        className="absolute bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-20"
        style={{ top: 716, left: 38, width: 115, height: 33.75 }}
      >
        <span className="font-poppins font-black text-[#f8c83c] text-[11px] leading-none">
          Previous
        </span>
      </Link>

      <Link
        to="/numbers/5"
        className="absolute bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-20"
        style={{ top: 716, left: 212, width: 115, height: 33.75 }}
      >
        <span className="font-poppins font-black text-[#f8c83c] text-[11px] leading-none">
          Next
        </span>
      </Link>
    </NumbersFrame>
  )
}
