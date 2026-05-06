import { Link } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import Mascot from '../components/Mascot'

export default function Ready() {
  return (
    <div className="flex-1 bg-white relative overflow-hidden">
      <AppHeader />

      <Mascot
        variant="body"
        size={101}
        withCircle={false}
        className="absolute top-[245px] left-[134px]"
      />

      <div className="absolute top-[370px] left-[74px] w-[228px] h-[84px] bg-accent rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center z-10">
        <span className="text-[#1e1c1c] font-baloo font-bold text-[42px] leading-none">
          WELCOME
        </span>
      </div>

      <Link
        to="/home"
        className="absolute top-[492px] left-[107px] text-[#2e4858] font-opensans font-bold text-[16px] tracking-wide"
      >
        Tap to continue
      </Link>
    </div>
  )
}
