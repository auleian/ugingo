import PlacesFrame from '../../components/places/PlacesFrame'
import PlacesAntelope from '../../components/places/PlacesAntelope'
import PlacesListRow from '../../components/places/PlacesListRow'
import PlacesPillButton from '../../components/places/PlacesPillButton'
import cloudCard from '../../assets/bg-success-cloud.png'
import ekyaaloImg from '../../assets/places-ekyaalo.png'
import { getTopicAudio, getTopicIntro } from '../../lib/topicAudio'
import { useIntroAudio } from '../../lib/sound'

const SCREEN = 3

const ekyaaloIcon = (
  <img
    src={ekyaaloImg}
    alt=""
    aria-hidden
    draggable={false}
    className="w-full h-full object-cover rounded-full select-none pointer-events-none"
  />
)

const ROWS = [
  { top: 389, luganda: 'Ekyaalo',  english: 'Village',     icon: ekyaaloIcon, iconSize: 50 },
  { top: 460, luganda: 'Ekibira',  english: 'Forest',      icon: '🌳' },
  { top: 531, luganda: 'Ennyanja', english: 'Lake',        icon: '🌊' },
  { top: 602, luganda: 'Ennimiro', english: 'Garden/Farm', icon: '🌱' },
]

export default function Places3() {
  useIntroAudio(getTopicIntro('places', SCREEN))
  return (
    <PlacesFrame>
      <div
        className="absolute overflow-hidden pointer-events-none"
        style={{
          top: 177,
          left: 43,
          width: 242,
          height: 155,
          filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.25))',
        }}
      >
        <img
          src={cloudCard}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute max-w-none select-none"
          style={{ top: '-68.64%', left: '-25.5%', width: '151.98%', height: '236.75%' }}
        />
      </div>

      <div
        className="absolute text-center font-poppins font-black"
        style={{ top: 220, left: 65, width: 177 }}
      >
        <p className="text-[#ff5300] text-[20px] leading-tight m-0">Ebifo byo butonde</p>
        <p className="text-[#2e4858] text-[14px] leading-tight mt-1">Places of nature</p>
      </div>

      <PlacesAntelope mode="list" />

      {ROWS.map((r, i) => (
        <PlacesListRow key={r.luganda} {...r} audioSrc={getTopicAudio('places', SCREEN, i + 1)} />
      ))}

      <PlacesPillButton to="/places/4" className="absolute" style={{ top: 750, left: 244 }}>
        Next
      </PlacesPillButton>
    </PlacesFrame>
  )
}
