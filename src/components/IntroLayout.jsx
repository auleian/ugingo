import AppHeader from './AppHeader'
import Button from './Button'
import Wave from './Wave'
//import bgWaves from '../assets/bg-waves.png'

export default function IntroLayout({ message, ctaTo, ctaLabel = "Let's go!" }) {
  return (
    <div className="flex-1 flex flex-col bg-white relative"> 
      <AppHeader />
      <div className="absolute top-[170px] left-[74px] w-[228px] h-[84px] flex items-center justify-center bg-[rgba(85,137,244,0.05)] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-6">
        <p className="text-center text-[18px] font-bold leading-snug font-baloo">{message}</p>
      </div>
      <Wave
        width={108}
        height={200}
        fps={3}
        className="absolute top-[307px] left-[129px]"
      />
      <div className="absolute top-[606px] left-[30px] w-[315px] h-[50px]">
        <Button to={ctaTo}>{ctaLabel}</Button>
      </div>
    </div>
  )
}
