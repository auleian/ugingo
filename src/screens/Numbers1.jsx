import { Link } from 'react-router-dom'
import NumbersFrame from '../components/NumbersFrame'
import NumbersListRow from '../components/NumbersListRow'
import Mascot from '../components/Mascot'

const ROWS = [
  { index: 1, word: 'Emu', pronounce: 'Eh-moo', icon: '☝️' },
  { index: 2, word: 'Bbiri', pronounce: 'Bbee-ree', icon: '✌️' },
  { index: 3, word: 'Ssatu', pronounce: 'Sah-too', icon: '🤟' },
  { index: 4, word: 'Nnya', pronounce: 'Nn-yah', icon: '⚽⚽⚽⚽' },
  { index: 5, word: 'Ttaano', pronounce: 'Tah-no', icon: '🖐' },
]

const TOPS = [270, 344.15, 418.3, 492, 566.15]

export default function Numbers1() {
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
        <p>Ennamba Ezisookerwako</p>
        <p>The basics (1-5)</p>
      </div>

      {ROWS.map((row, i) => (
        <NumbersListRow key={row.index} {...row} top={TOPS[i]} />
      ))}

      <Link
        to="/numbers/2"
        className="absolute bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-20"
        style={{ top: 711, left: 121, width: 115, height: 33.75 }}
      >
        <span className="font-poppins font-black text-[#f8c83c] text-[11px] leading-none">
          Next
        </span>
      </Link>
    </NumbersFrame>
  )
}
