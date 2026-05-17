import PlacesFrame from '../../components/places/PlacesFrame'
import PlacesAntelope from '../../components/places/PlacesAntelope'
import PlacesListRow from '../../components/places/PlacesListRow'
import PlacesPillButton from '../../components/places/PlacesPillButton'
import cloudCard from '../../assets/bg-success-cloud.png'
import { getTopicAudio } from '../../lib/topicAudio'

const SCREEN = 1

const ROWS = [
  { top: 389, luganda: 'Awaka',     english: 'Home',     icon: '🏠' },
  { top: 460, luganda: 'Essomero',  english: 'School',   icon: '🏫' },
  { top: 531, luganda: 'Eddwaliro', english: 'Hospital', icon: '🏨' },
  { top: 602, luganda: 'Ekanisa',   english: 'Church',   icon: '⛪️' },
]

export default function Places1() {
  return (
    <PlacesFrame>
      {/* Subtitle cloud-card (behind antelope) */}
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

      {/* Subtitle text (behind antelope) */}
      <div
        className="absolute text-center font-poppins font-black"
        style={{ top: 233, left: 65, width: 188 }}
      >
        <p className="text-[#ff5300] text-[20px] leading-tight m-0">Ebifo ebikulu</p>
        <p className="text-[#2e4858] text-[14px] leading-tight mt-1">Essential places</p>
      </div>

      {/* Antelope (list crop) — render LAST so it sits on top of the cloud-card */}
      <PlacesAntelope mode="list" />

      {ROWS.map((r, i) => (
        <PlacesListRow key={r.luganda} {...r} audioSrc={getTopicAudio('places', SCREEN, i + 1)} />
      ))}

      <PlacesPillButton to="/places/2" className="absolute" style={{ top: 750, left: 244 }}>
        Next
      </PlacesPillButton>
    </PlacesFrame>
  )
}
