import { Link } from 'react-router-dom'
import AppHeader from '../../components/AppHeader'
import Mascot from '../../components/Mascot'
import bgLanguage from '../../assets/bg-language.png'

export default function LanguagePlanStart() {
  return (
    <div className="flex-1 bg-white relative overflow-hidden">
      <div
        className="absolute pointer-events-none"
        style={{
          top: 45,
          left: -144,
          width: 713,
          height: 767,
          backgroundImage: `url(${bgLanguage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      />

      <AppHeader roundedBottom />

      <div className="absolute top-[83px] left-[10px] w-[110px] h-[24px] bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-10">
        <span className="font-poppins font-black text-white text-[11px] leading-none">
          OLULIMI
        </span>
      </div>

      <Mascot
        variant="kingoFront"
        size={191}
        withCircle={false}
        className="absolute top-[175px] left-[92px] z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />

      <div className="absolute top-[424px] left-[26px] w-[323px] h-[211px] bg-[#69cad3] rounded-[52.5px] shadow-[2px_5px_17.5px_rgba(46,72,88,0.7)]" />

      <p className="absolute top-[493px] left-[61px] w-[253px] text-center font-poppins font-black text-[26px] text-white leading-tight">
        Am going to take you through Luganda
      </p>

      <Link
        to="/lessons"
        className="absolute top-[684px] left-[109px] w-[158px] h-[43px] bg-[#F8C83C] rounded-[52.5px] shadow-[0_4px_4px_rgba(46,72,88,0.42)] flex flex-col items-center justify-center leading-none"
      >
        <span className="font-poppins font-black text-white text-[16px]">
          Tutandike
        </span>
        <span className="font-poppins font-black text-[#2E4858] text-[12px] mt-[2px]">
          We start
        </span>
      </Link>
    </div>
  )
}
