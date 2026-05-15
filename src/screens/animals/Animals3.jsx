import AnimalsFrame from '../../components/animals/AnimalsFrame'
import AnimalsHero from '../../components/animals/AnimalsHero'
import AnimalsListRow from '../../components/animals/AnimalsListRow'
import AnimalsPillButton from '../../components/animals/AnimalsPillButton'

// Animals 3 lays out a 2×2 grid of birds-and-others. The hero text is
// centered (no antelope mascot in Figma 529:258), so we render the ribbon
// without the head sprite.
const ROWS = [
  { top: 416, left: 9, emoji: '🐦', word: 'Ekinyonyi', translation: 'Bird', wordSize: 16, textTop: 13 },
  { top: 416, left: 200, emoji: '🐟', word: 'Ekyennyanja', translation: 'Fish', wordSize: 14, textTop: 16 },
  { top: 523, left: 9, emoji: '🐍', word: 'Omusota', translation: 'Snake' },
  { top: 524, left: 200, emoji: '🐜', word: 'Ekiwuka', translation: 'Insect' },
]

export default function Animals3() {
  return (
    <AnimalsFrame>
      <div
        className="absolute bg-[#f16522] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-10"
        style={{ top: 45, left: -36, width: 423, height: 201 }}
      />

      <div
        className="absolute z-20 text-center font-poppins font-black"
        style={{ top: 166, left: 27, width: 172 }}
      >
        <p className="text-white" style={{ fontSize: 20, lineHeight: 1.15 }}>
          Ebinyonyi ne birara
        </p>
        <p className="text-[#2e4858]" style={{ fontSize: 13, lineHeight: 1.2, marginTop: 6 }}>
          Birds and others
        </p>
      </div>

      <div
        className="absolute bg-[#69cad3] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-10"
        style={{ top: 270, left: -24, width: 423, height: 18 }}
      />

      {ROWS.map((row, i) => (
        <AnimalsListRow key={i} {...row} />
      ))}

      <AnimalsPillButton
        to="/animals/4"
        size="md"
        className="absolute z-30"
        style={{ top: 714, left: 134 }}
      >
        Next
      </AnimalsPillButton>
    </AnimalsFrame>
  )
}
