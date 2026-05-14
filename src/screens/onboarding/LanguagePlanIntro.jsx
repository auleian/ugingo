import { Link } from 'react-router-dom'
import AppHeader from '../../components/AppHeader'
import Mascot from '../../components/Mascot'
import bgLanguage from '../../assets/bg-language.png'

export default function LanguagePlanIntro() {
  return (
    <div className="flex-1 bg-white relative overflow-hidden">
      <div
        className="absolute pointer-events-none"
        style={{
          top: 87,
          left: -168,
          width: 696,
          height: 725,
          backgroundImage: `url(${bgLanguage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <AppHeader />

      <div className="absolute top-[103px] left-[10px] w-[110px] h-[24px] bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-10">
        <span className="font-poppins font-black text-white text-[11px] leading-none">
          OLULIMI
        </span>
      </div>

      <div className="absolute top-[370px] left-[87px] w-[271px] h-[145px] bg-[#69cad3] rounded-[52.5px] shadow-[-5px_5px_4px_rgba(46,72,88,0.39)]" />

      <p className="absolute top-[404px] left-[152px] w-[207px] text-center font-poppins font-black text-[20px] text-white leading-snug">
        Gyebaale,i&apos;m Kingo, Gingo&apos;s friend.
      </p>

      <Mascot
        variant="kingoWaving"
        size={235}
        withCircle={false}
        className="absolute top-[249px] left-[-30px] z-20 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />

      <Link
        to="/language-plan/start"
        className="absolute top-[602px] left-[187px] w-[100px] h-[29px] bg-[#F8C83C] rounded-[52.5px] shadow-[0_4px_4px_rgba(46,72,88,0.4)] flex items-center justify-center"
      >
        <span className="font-poppins font-black text-white text-[16px] leading-none">
          Continue
        </span>
      </Link>
    </div>
  )
}
