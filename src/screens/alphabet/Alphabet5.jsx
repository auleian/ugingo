import AlphabetFrame from '../../components/alphabet/AlphabetFrame'
import AlphabetCard from '../../components/alphabet/AlphabetCard'
import AlphabetPillButton from '../../components/alphabet/AlphabetPillButton'
import Mascot from '../../components/Mascot'

const CARDS = [
  { letter: 'KK', say: 'Say "KKA"', emoji: '🐈', word: 'Kkapa', translation: 'Cat', top: 310, left: -3 },
  { letter: 'L', say: 'Say "LA"', emoji: '👁️', word: 'Liiso', translation: 'Eye', top: 312, left: 174 },
  { letter: 'MM', say: 'Say "MMA"', emoji: '🍞', word: 'Mmere', translation: 'Food', top: 441, left: -3 },
  { letter: 'NN', say: 'Say "NNA"', emoji: '😉', word: 'Naatera', translation: 'Almost', top: 441, left: 174 },
  { letter: 'PP', say: 'Say "PPA"', emoji: '🥭', word: 'Ppaapaali', translation: 'Papaya/Pawpaw', top: 569, left: 85 },
]

export default function Alphabet5() {
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
        Continuing the alphabet (K-P)
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

      <AlphabetPillButton size="sm" to="/alphabet/4" className="absolute" style={{ top: 749, left: 24 }}>
        Previous
      </AlphabetPillButton>
      <AlphabetPillButton size="sm" to="/alphabet/6" className="absolute" style={{ top: 749, left: 266 }}>
        Next
      </AlphabetPillButton>
    </AlphabetFrame>
  )
}
