import AlphabetFrame from '../components/AlphabetFrame'
import AlphabetCard from '../components/AlphabetCard'
import AlphabetPillButton from '../components/AlphabetPillButton'
import Mascot from '../components/Mascot'

const CARDS = [
  { letter: 'BB', say: 'Say "BBA"', emoji: '🤕', word: 'Bbwa', translation: 'wound', top: 310, left: -3 },
  { letter: 'CC', say: 'Say "CCA"', emoji: '☕️', word: 'Chai', translation: 'Tea', top: 312, left: 174 },
  { letter: 'DD', say: 'Say "DDA"', emoji: '🏬', word: 'Dduuka', translation: 'Shop', top: 441, left: -3 },
  { letter: 'FF', say: 'Say "FFA"', emoji: '🐈', word: 'Ffumbe', translation: 'Civet cat', top: 441, left: 174 },
  { letter: 'GG', say: 'Say "GGA"', emoji: '🌌', word: 'Ggulu', translation: 'Sky', top: 569, left: -3 },
  { letter: 'JJ', say: 'Say "JJA"', emoji: '👴👵', word: 'Jjaja', translation: 'Grand Parents', top: 569, left: 177 },
]

export default function Alphabet4() {
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
        The first set of consonants (A-J)
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

      <AlphabetPillButton size="sm" to="/alphabet/3" className="absolute" style={{ top: 749, left: 24 }}>
        Previous
      </AlphabetPillButton>
      <AlphabetPillButton size="sm" to="/alphabet/5" className="absolute" style={{ top: 749, left: 266 }}>
        Next
      </AlphabetPillButton>
    </AlphabetFrame>
  )
}
