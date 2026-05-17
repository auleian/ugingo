import PeopleFrame from '../../components/people/PeopleFrame'
import PeopleHero from '../../components/people/PeopleHero'
import PeopleCard from '../../components/people/PeopleCard'
import PeoplePillButton from '../../components/people/PeoplePillButton'
import { getTopicAudio } from '../../lib/topicAudio'

const SCREEN = 2

const CARDS = [
  { top: 351, left: -4, emoji: '👨🏾', word: 'Taata', translation: 'Father' },
  { top: 351, left: 172, emoji: '👩🏾‍🦱', word: 'Maama', translation: 'Mother' },
  {
    top: 478,
    left: 0,
    emoji: '👧🏾🧑🏾',
    word: 'Baganda bo',
    translation: 'Siblings',
    wordSize: 14,
    emojiSize: 18,
    emojiOffset: { top: 57, left: 36 },
  },
  { top: 478, left: 176, emoji: '🧓🏾', word: 'Jjajja', translation: 'Grandparent' },
]

export default function People2() {
  return (
    <PeopleFrame>
      <PeopleHero>
        <div
          className="absolute text-center font-poppins font-black text-white"
          style={{ top: 132, left: 12, width: 212 }}
        >
          <p className="text-[20px] leading-tight">Amaka (Family)</p>
          <p className="mt-1 text-[#2e4858] text-[13px] leading-tight">
            Family is the center of Luganda culture
          </p>
        </div>
      </PeopleHero>

      {CARDS.map((c, i) => (
        <PeopleCard key={i} {...c} audioSrc={getTopicAudio('people', SCREEN, i + 1)} />
      ))}

      <PeoplePillButton
        to="/people/3"
        size="lg"
        className="absolute z-20"
        style={{ top: 685, left: 129 }}
      >
        Next
      </PeoplePillButton>
    </PeopleFrame>
  )
}
