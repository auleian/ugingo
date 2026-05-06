import AnimalsFrame from '../components/AnimalsFrame'
import AnimalsHero from '../components/AnimalsHero'
import AnimalsListRow from '../components/AnimalsListRow'
import AnimalsPillButton from '../components/AnimalsPillButton'

const ROWS = [
  { top: 363, left: 9, emoji: '🦁', word: 'Empologoma', translation: 'Lion', wordSize: 14, textTop: 17 },
  { top: 363, left: 200, emoji: '🐘', word: 'Enjovu', translation: 'Elephant' },
  { top: 470, left: 6, emoji: '🐆', word: 'Engo', translation: 'Leopard' },
  { top: 470, left: 197, emoji: '🐒', word: 'Enkima', translation: 'Monkey' },
  { top: 577, left: 103, emoji: '🦒', word: 'Entugga', translation: 'Giraffe' },
]

export default function Animals2() {
  return (
    <AnimalsFrame>
      <AnimalsHero>
        <div
          className="absolute z-30 text-center font-poppins font-black"
          style={{ top: 154, left: 25, width: 177 }}
        >
          <p className="text-white" style={{ fontSize: 20, lineHeight: 1.15 }}>
            Eby&rsquo;omu nsiko
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.2, marginTop: 6 }}>
            <span className="text-[#2e4858]">(Wild) </span>
            <span className="text-white">some of the animals found in forests/zoos/parks</span>
          </p>
        </div>
      </AnimalsHero>

      <div
        className="absolute bg-[#69cad3] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-10"
        style={{ top: 270, left: -24, width: 423, height: 18 }}
      />

      {ROWS.map((row, i) => (
        <AnimalsListRow key={i} {...row} />
      ))}

      <AnimalsPillButton
        to="/animals/3"
        size="md"
        className="absolute z-30"
        style={{ top: 717, left: 132 }}
      >
        Next
      </AnimalsPillButton>
    </AnimalsFrame>
  )
}
