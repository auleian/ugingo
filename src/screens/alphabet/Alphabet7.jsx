import AlphabetFrame from '../../components/alphabet/AlphabetFrame'
import AlphabetPillButton from '../../components/alphabet/AlphabetPillButton'
import Mascot from '../../components/Mascot'
import cloudCard from '../../assets/bg-success-cloud.png'
import creamPillLg from '../../assets/cream-pill-lg.svg'

function SpecialCard({ top, letter, say, hint, emoji, word, translation, useCircleEmoji }) {
  return (
    <div
      className="absolute drop-shadow-[0_4px_4px_rgba(241,101,34,0.34)] pointer-events-none"
      style={{ top, left: 22, width: 324, height: 203 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={cloudCard}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute max-w-none select-none"
          style={{ top: '-70.36%', left: '-25.5%', width: '151.98%', height: '242.69%' }}
        />
      </div>

      <div className="absolute inset-0">
        <p
          className="absolute font-poppins font-black text-[#2e4858] text-[30px] text-center leading-none whitespace-nowrap"
          style={{ top: 23, left: '50%', transform: 'translateX(-50%)' }}
        >
          {letter}
        </p>

        <p
          className="absolute font-opensans font-semibold text-[#2e4858] text-[11px] leading-none"
          style={{ top: 65, left: '50%', transform: 'translateX(-50%)' }}
        >
          {say}
        </p>

        <p
          className="absolute font-opensans font-semibold text-[#f16522] text-[11px] text-center leading-snug"
          style={{ top: 87, left: 80, width: 164 }}
        >
          {hint}
        </p>

        <div className="absolute" style={{ top: 128, left: 83, width: 157, height: 47 }}>
          <img src={creamPillLg} alt="" aria-hidden draggable={false} className="absolute inset-0 w-full h-full" />
          <span className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[16px] leading-none">
            {emoji}
          </span>
          <div className="absolute right-[8px] top-1/2 -translate-y-1/2 w-[110px] text-center font-opensans font-semibold text-[#2e4858] leading-tight">
            <p className="text-[10px] leading-none">{word}</p>
            <p className="mt-[2px] text-[5px] leading-none">{translation}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Alphabet7() {
  return (
    <AlphabetFrame>
      <Mascot
        variant="antelopeSide"
        size={81}
        withCircle={false}
        className="absolute"
        style={{ top: 178, left: 230 }}
      />

      <p
        className="absolute font-poppins font-black text-[#2e4858] leading-tight"
        style={{ top: 152, left: 25, width: 220, fontSize: 20 }}
      >
        Ennukuta ezenjawulo{' '}
        <span className="text-[#f16522] text-[14px]">(special consonants</span>
      </p>

      <p
        className="absolute font-opensans font-semibold text-[#2e4858] text-[13px] leading-none"
        style={{ top: 233, left: 61, width: 200 }}
      >
        These are single consonants
      </p>

      <div className="absolute bg-[#69cad3]" style={{ top: 277, left: -17, width: 404, height: 17 }} />

      <SpecialCard
        top={307}
        letter="Ny"
        say='Say "NNYA"'
        hint='Sounds like "canyon" or "ng" in the French word cognac'
        emoji="🆘️"
        word="Nyamba"
        translation="Help me"
      />

      <SpecialCard
        top={505}
        letter="Ŋ"
        say='Say "Nga"'
        hint='Sounds like "ng" sound in sing'
        emoji="🦤"
        word="Ŋŋaali"
        translation="Crane"
      />

      <AlphabetPillButton size="sm" to="/alphabet/6" className="absolute" style={{ top: 750, left: 30 }}>
        Previous
      </AlphabetPillButton>
      <AlphabetPillButton size="sm" to="/alphabet/8" className="absolute" style={{ top: 750, left: 272 }}>
        Next
      </AlphabetPillButton>
    </AlphabetFrame>
  )
}
