import { Link } from 'react-router-dom'
import AppHeader from '../../components/AppHeader'
import heroBg from '../../assets/numbers-hero-bg.png'

export default function NumbersMain() {
  return (
    <div className="flex-1 relative overflow-hidden bg-white">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute max-w-none pointer-events-none select-none object-cover"
        style={{ top: 33, left: -232, width: 812, height: 812 }}
      />

      <AppHeader />

      <div className="absolute top-[103px] left-[7px] w-[110px] h-[24px] bg-[#F16522] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-10">
        <span className="font-poppins font-black text-white text-[11px] leading-none">
          Ennamba
        </span>
      </div>

      <div
        className="absolute z-10 text-center"
        style={{ top: 339, left: 39, width: 298, height: 222 }}
      >
        <p className="font-poppins font-black text-[#2e4858] text-[64px] leading-none">
          Yiga Okubala
        </p>
        <p className="mt-3 font-poppins font-black text-[#fff] text-[24px] leading-none">
          Learn how to count
        </p>
      </div>

      <Link
        to="/numbers/1"
        className="absolute bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-10"
        style={{ top: 720, left: 241, width: 106, height: 28 }}
      >
        <span className="font-poppins font-black text-white text-[11px] leading-none">
          Next
        </span>
      </Link>
    </div>
  )
}
