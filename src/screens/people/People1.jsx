import PeopleFrame from '../../components/people/PeopleFrame'
import PeopleHero from '../../components/people/PeopleHero'
import PeopleCard from '../../components/people/PeopleCard'
import PeoplePillButton from '../../components/people/PeoplePillButton'
import { getTopicAudio, getTopicIntro } from '../../lib/topicAudio'
import { useIntroAudio } from '../../lib/sound'

const SCREEN = 1

const ANTELOPE_CROP = { top: -82.23, left: -556.96, width: 781.69, height: 503.22 }

const CARDS = [
  { top: 351, left: -4, emoji: '👤', word: 'Omuntu', translation: 'Person' },
  { top: 351, left: 172, emoji: '👨🏾', word: 'Omusajja', translation: 'Man' },
  { top: 478, left: 0, emoji: '👩🏾‍🦱', word: 'Omukazi', translation: 'Woman' },
  { top: 478, left: 176, emoji: '👶🏾', word: 'Omwana', translation: 'Baby' },
]

export default function People1() {
  useIntroAudio(getTopicIntro('people', SCREEN))
  return (
    <PeopleFrame>
      <PeopleHero antelopeCrop={ANTELOPE_CROP}>
        <p
          className="absolute text-center font-poppins font-black text-white text-[20px] leading-tight"
          style={{ top: 142, left: 19, width: 215 }}
        >
          These are the basic human terms
        </p>
      </PeopleHero>

      {CARDS.map((c, i) => (
        <PeopleCard key={i} {...c} audioSrc={getTopicAudio('people', SCREEN, i + 1)} />
      ))}

      <PeoplePillButton
        to="/people/2"
        size="lg"
        className="absolute z-20"
        style={{ top: 685, left: 125 }}
      >
        Next
      </PeoplePillButton>
    </PeopleFrame>
  )
}
