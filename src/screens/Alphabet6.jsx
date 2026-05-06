import AlphabetFrame from '../components/AlphabetFrame'
import AlphabetCard from '../components/AlphabetCard'
import AlphabetPillButton from '../components/AlphabetPillButton'
import Mascot from '../components/Mascot'

const CARDS = [
  { letter: 'RR', say: 'Say "RRA"', emoji: '🎨', word: 'Rangi', translation: 'paint', top: 310, left: -3 },
  { letter: 'SS', say: 'Say "SSA"', emoji: '👵', word: 'Ssenga', translation: 'Aunt', top: 312, left: 174 },
  { letter: 'TT', say: 'Say "TTA"', emoji: '💡', word: 'Ttaala', translation: 'Lamp', top: 441, left: -3 },
  { letter: 'VV', say: 'Say "VVA"', emoji: '🪵', word: 'Vvu', translation: 'Ash', top: 441, left: 174 },
  { letter: 'W', say: 'Say "WA"', emoji: '📍', word: 'Wali', translation: 'There', top: 569, left: -3 },
  { letter: 'Y', say: 'Say "YA"', emoji: '🎤', word: 'Yimba', translation: 'Sing', top: 569, left: 177 },
]

export default function Alphabet6() {
  return (
    <AlphabetFrame>
      <Mascot
        variant="antelopeSide"
        size={81}
        withCircle={false}
        className="absolute"
        style={{ top: 178, left: 230 }}
      />

      <p
        className="absolute font-poppins font-black text-[#2e4858] leading-none"
        style={{ top: 152, left: 25, fontSize: 20 }}
      >
        Ennukuta ensirifu <span className="text-[#f16522] text-[14px]">(Consonants)</span>
      </p>

      <p
        className="absolute font-opensans font-bold text-[#2e4858] text-[13px] leading-none"
        style={{ top: 177, left: 25 }}
      >
        The final standard letters (R-Z)
      </p>

      <p
        className="absolute font-opensans font-bold text-[#2e4858] text-[13px] leading-none"
        style={{ top: 239, left: 25 }}
      >
        Pronouced hard (doubled)
      </p>

      <div className="absolute bg-[#69cad3]" style={{ top: 277, left: -17, width: 404, height: 17 }} />

      {CARDS.map((c) => (
        <AlphabetCard key={c.letter} {...c} />
      ))}

      <AlphabetPillButton size="sm" to="/alphabet/5" className="absolute" style={{ top: 749, left: 24 }}>
        Previous
      </AlphabetPillButton>
      <AlphabetPillButton size="sm" to="/alphabet/7" className="absolute" style={{ top: 749, left: 266 }}>
        Next
      </AlphabetPillButton>
    </AlphabetFrame>
  )
}
