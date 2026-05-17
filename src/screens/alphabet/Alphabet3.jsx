import AlphabetFrame from '../../components/alphabet/AlphabetFrame'
import AlphabetCard from '../../components/alphabet/AlphabetCard'
import AlphabetPillButton from '../../components/alphabet/AlphabetPillButton'
import Mascot from '../../components/Mascot'
import { getAlphabetAudio } from '../../lib/alphabetAudio'

const SCREEN = 3

const VOWELS = [
  { letter: 'A', say: 'Say "AH"', emoji: '👶🏾👶🏾', word: 'Abaana', translation: 'Children', top: 310, left: -3 },
  { letter: 'E', say: 'Say "EH"', emoji: '🐘', word: 'Enjovu', translation: 'Elephant', top: 312, left: 174 },
  { letter: 'I', say: 'Say "EE"', emoji: '😡', word: 'Muny"ii"vu', translation: 'Annoyed', top: 441, left: -3 },
  { letter: 'O', say: 'Say "OH"', emoji: '⚽️', word: 'Omupiira', translation: 'Ball', top: 441, left: 174 },
  { letter: 'U', say: 'Say "OO"', emoji: '🌱', word: 'K"uu"la', translation: 'grow', top: 571, left: 85 },
]

export default function Alphabet3() {
  return (
    <AlphabetFrame>
      <Mascot
        variant="antelopeSide"
        size={81}
        withCircle={false}
        className="absolute"
        style={{ top: 177, left: 16 }}
      />

      <p
        className="absolute font-poppins font-black text-[#2e4858] leading-none"
        style={{ top: 152, left: 110, fontSize: 20 }}
      >
        ENJATUZA <span className="text-[#f16522] text-[14px]">(Vowels)</span>
      </p>

      <p
        className="absolute font-opensans font-bold text-[#2e4858] text-[13px] leading-snug"
        style={{ top: 228, left: 110, width: 221 }}
      >
        Pure Sounds. Pronouce exactly as seen below
      </p>

      <div className="absolute bg-[#69cad3]" style={{ top: 277, left: -17, width: 404, height: 17 }} />

      {VOWELS.map((v, i) => (
        <AlphabetCard key={v.letter} {...v} {...getAlphabetAudio(SCREEN, i + 1)} />
      ))}

      <AlphabetPillButton to="/alphabet/4" className="absolute" style={{ top: 749, left: 134 }}>
        Next
      </AlphabetPillButton>
    </AlphabetFrame>
  )
}
