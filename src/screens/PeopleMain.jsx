import PeopleFrame from '../components/PeopleFrame'
import PeoplePillButton from '../components/PeoplePillButton'
import heroBg from '../assets/people-hero-bg.png'
import heroCloud from '../assets/people-hero-cloud.png'

export default function PeopleMain() {
  return (
    <PeopleFrame showHandsBg={false}>
      <img
        src={heroBg}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute max-w-none select-none pointer-events-none object-cover"
        style={{ top: 81, left: -58, width: 487, height: 731 }}
      />

      <div
        className="absolute drop-shadow-[0_4px_10.8px_rgba(0,0,0,0.25)] overflow-hidden pointer-events-none"
        style={{ top: 202, left: -143, width: 625, height: 359 }}
      >
        <img
          src={heroCloud}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute max-w-none select-none"
          style={{ top: '-60.02%', left: '-28.68%', width: '159.47%', height: '277.83%' }}
        />
      </div>

      <div
        className="absolute z-10 text-center"
        style={{ top: 293, left: 46, width: 284 }}
      >
        <p className="font-poppins font-black text-[#2e4858] text-[70px] leading-none">
          Abantu
        </p>
        <p className="mt-3 font-poppins font-black text-[#f8c83c] text-[32px] leading-none">
          People
        </p>
      </div>

      <PeoplePillButton
        to="/people/1"
        size="md"
        className="absolute z-20"
        style={{ top: 720, left: 241 }}
      >
        Next
      </PeoplePillButton>
    </PeopleFrame>
  )
}
