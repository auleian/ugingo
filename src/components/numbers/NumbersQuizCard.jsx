import Mascot from '../Mascot'

export default function NumbersQuizCard() {
  return (
    <>
      <div
        className="absolute bg-[#2e4858] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-10"
        style={{ top: 143, left: -8, width: 214, height: 110 }}
      />

      <p
        className="absolute z-10 font-poppins font-black text-white text-[24px] text-center leading-tight"
        style={{ top: 152, left: 26, width: 140, height: 67 }}
      >
        Numbers
        <br />
        Quiz
      </p>

      <p
        className="absolute z-10 font-opensans font-semibold text-[#F8C83C] text-[14px] text-center leading-none"
        style={{ top: 219, left: 39, width: 113, height: 28 }}
      >
        Gezesa byoyize
      </p>

      <Mascot
        variant="antelopeSide"
        size={139}
        withCircle={false}
        className="absolute z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.18)]"
        style={{ top: 99, left: 212 }}
      />

      <div
        className="absolute bg-[#2e4858] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-10"
        style={{ top: 270, left: -24, width: 423, height: 18 }}
      />
    </>
  )
}
