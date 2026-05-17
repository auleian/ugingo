import PeopleFrame from '../../components/people/PeopleFrame'
import PeopleHero from '../../components/people/PeopleHero'
import PeopleCard from '../../components/people/PeopleCard'
import PeoplePillButton from '../../components/people/PeoplePillButton'
import { getTopicAudio } from '../../lib/topicAudio'

const SCREEN = 4

const ANTELOPE_CROP = { top: -82.56, left: -353.39, width: 781.69, height: 503.22 }

const CARDS = [
  { top: 351, left: -4, emoji: '🙋‍♂️', word: 'Nze', translation: 'Me/I' },
  { top: 351, left: 172, emoji: '🫵', word: 'Gwe', translation: 'You' },
  { top: 478, left: 85, emoji: '👫', word: 'Ffe', translation: 'Us/We' },
]

export default function People4() {
  return (
    <PeopleFrame>
      <PeopleHero antelopeCrop={ANTELOPE_CROP}>
        <div
          className="absolute text-center font-poppins font-black text-white"
          style={{ top: 143, left: 26, width: 174 }}
        >
          <p className="text-[20px] leading-tight">Ebigambo bilala</p>
          <p className="mt-1 font-opensans font-semibold text-[#f16522] text-[12px] leading-tight">
            Other terms
          </p>
        </div>
      </PeopleHero>

      {CARDS.map((c, i) => (
        <PeopleCard key={i} {...c} audioSrc={getTopicAudio('people', SCREEN, i + 1)} />
      ))}

      <PeoplePillButton
        to="/people/5"
        size="lg"
        className="absolute z-20"
        style={{ top: 685, left: 129 }}
      >
        Next
      </PeoplePillButton>
    </PeopleFrame>
  )
}
