import { Link } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import Mascot from '../components/Mascot'
import bgHome from '../assets/bg-home.png'

function PlanPill({ to, title, subtitle, titleColor, x, y, w, h }) {
  return (
    <Link
      to={to}
      className="absolute bg-[#2E4858] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center text-center active:scale-[0.98] transition"
      style={{
        top: y,
        left: x,
        width: w,
        height: h,
        borderRadius: 52.5,
        color: titleColor,
      }}
    >
      <div className="font-poppins font-black text-[26px] leading-none">{title}</div>
      <div className="font-poppins font-black text-[11px] leading-tight mt-1">
        {subtitle}
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <div
      className="flex-1 bg-sky-200 relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgHome})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <AppHeader roundedBottom />

      <PlanPill
        to="/language-plan"
        title="OLULIMI"
        subtitle="Language"
        titleColor="#F16522"
        x={78}
        y={300}
        w={218}
        h={91}
      />

      <PlanPill
        to="/culture-plan"
        title="EBYOBUWANGWA"
        subtitle="Culture"
        titleColor="#F7AE2B"
        x={46}
        y={422}
        w={283}
        h={91}
      />

      <div
        className="absolute bg-[#69CAD3] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center px-5"
        style={{ top: 642, left: 63, width: 184, height: 45, borderRadius: 52.5 }}
      >
        <p className="text-[#FCCA3E] font-opensans font-bold text-[10px] text-center leading-tight">
          Choose a plan to start your lessons
        </p>
      </div>

      <Mascot
        variant="body"
        size={79}
        withCircle={false}
        className="absolute z-20 drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
        style={{ top: 553, left: 222 }}
      />
    </div>
  )
}
