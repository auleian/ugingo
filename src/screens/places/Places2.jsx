import PlacesFrame from '../../components/places/PlacesFrame'
import PlacesAntelope from '../../components/places/PlacesAntelope'
import PlacesListRow from '../../components/places/PlacesListRow'
import PlacesPillButton from '../../components/places/PlacesPillButton'
import cloudCard from '../../assets/bg-success-cloud.png'
import akataleImg from '../../assets/places-akatale.png'
import useShiverCycle from '../../lib/useShiverCycle'

const akataleIcon = (
  <img
    src={akataleImg}
    alt=""
    aria-hidden
    draggable={false}
    className="w-full h-full object-cover rounded-full select-none pointer-events-none"
  />
)

const ROWS = [
  { top: 389, luganda: 'Akatale', english: 'Market', icon: akataleIcon, iconSize: 46 },
  { top: 460, luganda: 'Dduuka',  english: 'Shop',   icon: '🏬' },
  { top: 531, luganda: 'Woteeri', english: 'Hotel',  icon: '🏨' },
  { top: 602, luganda: 'Banka',   english: 'Bank',   icon: '🏦️' },
]

export default function Places2() {
  const pulseIdx = useShiverCycle(ROWS.length, 1200)
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
        style={{ top: 233, left: 65, width: 188 }}
      >
        <p className="text-[#ff5300] text-[20px] leading-tight m-0">Ebifo Mu Kibuga</p>
        <p className="text-[#2e4858] text-[14px] leading-tight mt-1">places in town</p>
      </div>

      <PlacesAntelope mode="list" />

      {ROWS.map((r, i) => (
        <PlacesListRow key={r.luganda} {...r} isPulsing={i === pulseIdx} />
      ))}

      <PlacesPillButton to="/places/3" className="absolute" style={{ top: 750, left: 244 }}>
        Next
      </PlacesPillButton>
    </PlacesFrame>
  )
}
