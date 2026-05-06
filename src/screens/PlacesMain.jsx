import AppHeader from '../components/AppHeader'
import PlacesPillButton from '../components/PlacesPillButton'
import mainBg from '../assets/places-main-bg.png'

export default function PlacesMain() {
  return (
    <div className="flex-1 relative overflow-hidden bg-white">
      {/* Full-frame landscape (city + grass + road) */}
      <img
        src={mainBg}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute max-w-none object-cover pointer-events-none select-none"
        style={{ top: 42, left: -352, width: 1127, height: 770 }}
      />

      <AppHeader />

      {/* "Ebifo" pill */}
      <div className="absolute top-[103px] left-[7px] w-[110px] h-[24px] bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-20">
        <span className="font-poppins font-black text-[#f16522] text-[11px] leading-none">
          Ebifo
        </span>
      </div>

      {/* "Ebifo / Places" headline */}
      <div
        className="absolute text-center font-poppins font-black"
        style={{
          top: 339,
          left: 21,
          width: 320,
          height: 129,
          textShadow: '0px 4px 4px rgba(0,0,0,0.51)',
        }}
      >
        <p className="text-[#ff5300] text-[70px] leading-none m-0">Ebifo</p>
        <p className="text-[#f8c83c] text-[32px] leading-none mt-2">Places</p>
      </div>

      {/* Next button */}
      <PlacesPillButton
        to="/places/1"
        className="absolute"
        style={{ top: 702, left: 244 }}
      >
        Next
      </PlacesPillButton>
    </div>
  )
}
