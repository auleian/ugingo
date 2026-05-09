import AppHeader from '../../components/AppHeader'
import bgCulture from '../../assets/bg-culture.png'

function CulturePlanCard({ y, title, subtitle }) {
  return (
    <div
      className="absolute left-[37px] w-[304px] h-[167px] bg-[#c5c0b3] rounded-[41px] shadow-[0_4px_4px_rgba(46,72,88,0.3)] flex flex-col items-center justify-center"
      style={{ top: y }}
    >
      <p className="font-poppins font-black text-[32px] leading-tight text-[#665d5d]">
        {title}
      </p>
      <p className="font-poppins font-black text-[24px] leading-tight text-[#8c8b87] mt-1">
        {subtitle}
      </p>
    </div>
  )
}

export default function CulturePlan() {
  return (
    <div className="flex-1 relative overflow-hidden bg-[#6b6666]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${bgCulture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-[rgba(107,102,102,0.82)] pointer-events-none" />

      <AppHeader />

      <div className="absolute top-[103px] left-[6px] w-[122px] h-[24px] bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center">
        <span className="font-poppins font-black text-[#f16522] text-[11px] leading-none">
          EBYOBUWANGWA
        </span>
      </div>

      <p
        className="absolute top-[143px] left-1/2 -translate-x-1/2 w-[259px] text-center font-poppins font-black text-[36px] text-[#f8c83c] leading-[1.4]"
        style={{ textShadow: '0px 4px 4px rgba(255,255,255,0.23)' }}
      >
        Coming soon
      </p>

      <CulturePlanCard y={211} title="obulombolombo" subtitle="Traditions" />
      <CulturePlanCard y={398} title="Engero" subtitle="Proverbs" />
      <CulturePlanCard y={585} title="Emizannyo" subtitle="Games" />
    </div>
  )
}
