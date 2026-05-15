import AppHeader from './AppHeader'
import Button from './Button'
import Mascot from './Mascot'
//import bgWaves from '../assets/bg-waves.png'

export default function IntroLayout({ message, ctaTo, ctaLabel = "Let's go!" }) {
  return (
    <div className="flex-1 flex flex-col bg-white relative"> 
      <AppHeader />
      <div className="absolute top-[170px] left-[74px] w-[228px] h-[84px] flex items-start justify-center bg-[rgba(85,137,244,0.05)] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-6 pt-3">
        <p className="text-center text-[18px] font-bold leading-snug font-baloo">{message}</p>
      </div>
      <Mascot
        variant="body"
        size={108}
        withCircle={false}
        className="absolute top-[307px] left-[129px] pointer-events-none"
      />
      <div className="absolute top-[606px] left-[30px] w-[315px] h-[50px]">
        <Button to={ctaTo}>{ctaLabel}</Button>
      </div>
    </div>
  )
}
