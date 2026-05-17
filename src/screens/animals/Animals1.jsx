import AnimalsFrame from '../../components/animals/AnimalsFrame'
import AnimalsHero from '../../components/animals/AnimalsHero'
import AnimalsListRow from '../../components/animals/AnimalsListRow'
import AnimalsPillButton from '../../components/animals/AnimalsPillButton'
import { getTopicAudio } from '../../lib/topicAudio'

const SCREEN = 1

const ROWS = [
  { top: 321, left: 9, emoji: '🐕', word: 'Embwa', translation: 'Dog' },
  { top: 321, left: 200, emoji: '🐈', word: 'Kkapa', translation: 'Cat' },
  { top: 428, left: 6, emoji: '🐄', word: 'Ente', translation: 'Cow' },
  { top: 428, left: 197, emoji: '🐐', word: 'Embuzi', translation: 'Goat' },
  { top: 535, left: 103, emoji: '🐔', word: 'Enkoko', translation: 'Chicken' },
]

export default function Animals1() {
  return (
    <AnimalsFrame>
      <AnimalsHero>
        <div
          className="absolute z-30 text-center font-poppins font-black"
          style={{ top: 113, left: 25, width: 177 }}
        >
          <p className="text-white" style={{ fontSize: 20, lineHeight: 1.15 }}>
            Eby&rsquo;awaka
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.2, marginTop: 6 }}>
            <span className="text-[#2e4858]">(Domestic) </span>
            <span className="text-white">some of the animals we live with at home</span>
          </p>
        </div>
      </AnimalsHero>

      <div
        className="absolute bg-[#69cad3] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-10"
        style={{ top: 228, left: -24, width: 423, height: 18 }}
      />

      {ROWS.map((row, i) => (
        <AnimalsListRow key={i} {...row} audioSrc={getTopicAudio('animals', SCREEN, i + 1)} />
      ))}

      <AnimalsPillButton
        to="/animals/2"
        size="md"
        className="absolute z-30"
        style={{ top: 675, left: 132 }}
      >
        Next
      </AnimalsPillButton>
    </AnimalsFrame>
  )
}
