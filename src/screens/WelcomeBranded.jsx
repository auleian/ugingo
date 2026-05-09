import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import bgSky from '../assets/bg-sky.png'
import wordmark from '../assets/logo-ugingo-sprite.png'
import kingoSprite from '../assets/shop-kingo-head.png'

export default function WelcomeBranded() {
  const navigate = useNavigate()

  return (
    <div
      className="flex-1 relative overflow-hidden bg-white cursor-pointer"
      onClick={() => navigate('/gingo')}
    >
      {/* Background — two layered copies of bg-sky at 37% opacity each
          (Figma image 7 + image 10 both reference imgImage7 at left=-84 top=0 542×813 opacity 37%) */}
      <img
        src={bgSky}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute max-w-none object-cover pointer-events-none select-none"
        style={{ top: 0, left: -84, width: 542, height: 813, opacity: 0.37 }}
      />
      <img
        src={bgSky}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute max-w-none object-cover pointer-events-none select-none"
        style={{ top: 0, left: -84, width: 542, height: 813, opacity: 0.37 }}
      />

      <AppHeader roundedBottom />

      {/* Kingo character — image 4 cropped from sprite via Figma overflow technique */}
      <div
        className="absolute overflow-hidden pointer-events-none"
        style={{ left: 125, top: 229, width: 124, height: 143 }}
      >
        <img
          src={kingoSprite}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute max-w-none select-none"
          style={{
            width: '388.88%',
            height: '268.86%',
            left: '-261.54%',
            top: '-60.81%',
          }}
        />
      </div>

      {/* UGINGO wordmark — image 9 cropped from sprite */}
      <div
        className="absolute overflow-hidden pointer-events-none"
        style={{
          left: 42,
          top: 388,
          width: 280,
          height: 65,
          filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))',
        }}
      >
        <img
          src={wordmark}
          alt="UGINGO"
          draggable={false}
          className="absolute max-w-none select-none"
          style={{
            width: '98.74%',
            height: '324.62%',
            left: '1.17%',
            top: '-227.69%',
          }}
        />
      </div>

      {/* "Speak your Roots" tagline — Open Sans SemiBold 26px #f16522, text-shadow */}
      <p
        className="absolute font-opensans font-semibold text-[#f16522] text-center"
        style={{
          left: 42,
          top: 447,
          width: 290,
          height: 43,
          fontSize: 26,
          lineHeight: 'normal',
          textShadow: '0px 4px 4px rgba(0,0,0,0.25)',
        }}
      >
        Speak your Roots
      </p>
    </div>
  )
}
