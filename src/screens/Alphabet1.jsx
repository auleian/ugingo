import AppHeader from '../components/AppHeader'
import AlphabetPillButton from '../components/AlphabetPillButton'
import blocksFull from '../assets/alphabet-blocks-full.png'
import blocksStrip from '../assets/alphabet-blocks-strip.png'
import cloudCard from '../assets/bg-success-cloud.png'

export default function Alphabet1() {
  return (
    <div className="flex-1 relative overflow-hidden bg-white">
      <img
        src={blocksFull}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute max-w-none pointer-events-none select-none object-cover"
        style={{ bottom: 0, left: -87, width: 545, height: 818 }}
      />

      <div
        className="absolute overflow-hidden"
        style={{ top: 86, left: -63, width: 553, height: 133 }}
      >
        <div className="absolute inset-0" style={{ transform: 'rotate(180deg)' }}>
          <img
            src={blocksStrip}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute select-none pointer-events-none"
            style={{ top: '-177.08%', height: '277.08%', width: '100%' }}
          />
        </div>
      </div>

      <AppHeader />

      <div className="absolute top-[103px] left-[7px] w-[110px] h-[24px] bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-20">
        <span className="font-poppins font-black text-[#f16522] text-[11px] leading-none">
          Warifu
        </span>
      </div>

      <div
        className="absolute drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden pointer-events-none"
        style={{ top: 249, left: 3, width: 366, height: 229 }}
      >
        <img
          src={cloudCard}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute max-w-none select-none"
          style={{ top: '-70.36%', left: '-25.5%', width: '151.98%', height: '242.69%' }}
        />
      </div>

      <div
        className="absolute text-center font-poppins font-black flex flex-col justify-center"
        style={{ top: 313, left: 67, width: 238, height: 101 }}
      >
        <p
          className="text-[#2e4858] leading-none whitespace-nowrap"
          style={{ fontSize: 54, letterSpacing: '-0.5px' }}
        >
          WALIFU
        </p>
        <p className="mt-1 text-[#f16522] text-[20px] leading-none">Alphabet</p>
      </div>

      <AlphabetPillButton to="/alphabet/2" className="absolute" style={{ top: 720, left: 241 }}>
        Next
      </AlphabetPillButton>
    </div>
  )
}
