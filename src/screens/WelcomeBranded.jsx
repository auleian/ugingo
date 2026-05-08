import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import logoUgingo from '../assets/logo-ugingo-sprite.png'
import bgSky from '../assets/bg-sky.png'

export default function WelcomeBranded() {
  const navigate = useNavigate()

  return (
    <div
      className="flex-1 flex flex-col bg-sky-100 cursor-pointer"
      onClick={() => navigate('/gingo')}
      style={{
        backgroundImage: `url(${bgSky})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <AppHeader roundedBottom />
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-8">
        <img
          src={logoUgingo}
          alt="UGINGO"
          draggable={false}
          className="select-none w-[260px] h-auto drop-shadow-[0_4px_4px_rgba(0,0,0,0.18)]"
        />
        <p className="mt-3 text-[26px] font-semibold text-brand text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]">
          Speak your Roots
        </p>
      </main>
    </div>
  )
}
