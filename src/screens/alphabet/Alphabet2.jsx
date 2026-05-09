import AppHeader from '../../components/AppHeader'
import Mascot from '../../components/Mascot'
import AlphabetPillButton from '../../components/alphabet/AlphabetPillButton'
import blocksStrip from '../../assets/alphabet-blocks-strip.png'
import cloudCard from '../../assets/bg-success-cloud.png'

function StripBand({ top, left, width = 553, height = 133, rotate = false }) {
  return (
    <div
      className="absolute overflow-hidden pointer-events-none"
      style={{ top, left, width, height }}
    >
      <div className="absolute inset-0" style={rotate ? { transform: 'rotate(180deg)' } : undefined}>
        <img
          src={blocksStrip}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute select-none"
          style={{ top: '-177.08%', height: '277.08%', width: '100%' }}
        />
      </div>
    </div>
  )
}

export default function Alphabet2() {
  return (
    <div className="flex-1 relative overflow-hidden bg-white">
      <StripBand top={82} left={-178} rotate />
      <StripBand top={666} left={-65} width={669} height={161} />

      <AppHeader />

      <div className="absolute top-[103px] left-[7px] w-[110px] h-[24px] bg-[#2e4858] rounded-[52.5px] shadow-[0_4px_4px_rgba(255,255,255,0.25)] flex items-center justify-center z-20">
        <span className="font-poppins font-black text-[#f16522] text-[11px] leading-none">
          Warifu
        </span>
      </div>

      <Mascot
        variant="antelopeSide"
        size={81}
        withCircle={false}
        className="absolute"
        style={{ top: 212, left: 16 }}
      />

      <div
        className="absolute drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden pointer-events-none"
        style={{ top: 293, left: -90, width: 551, height: 345 }}
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

      <div className="absolute text-center" style={{ top: 245, left: 105, width: 225 }}>
        <p className="font-poppins font-black text-[#2e4858] text-[24px] leading-none">
          Amateeka ga Walifu
        </p>
        <p className="mt-[2px] font-poppins font-black text-[#f16522] text-[15px] leading-none">
          Rules
        </p>
      </div>

      <div
        className="absolute font-opensans font-semibold text-[#2e4858] text-[16px] text-center leading-snug"
        style={{ top: 379, left: 45, width: 275 }}
      >
        <p>There are 24 letters in the Luganda alphabet.</p>
        <p className="mt-3 text-[#69cad3]">We do not use the letters Q or X</p>
        <p className="mt-3 text-[#f16522]">
          Vowels are always pure and Consonants are pronounced hard (doubled)
        </p>
      </div>

      <AlphabetPillButton to="/alphabet/3" className="absolute" style={{ top: 638, left: 230 }}>
        Next
      </AlphabetPillButton>
    </div>
  )
}
