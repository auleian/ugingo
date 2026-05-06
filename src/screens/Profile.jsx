import AppHeader from '../components/AppHeader'
import bgSpace from '../assets/profile-bg.png'
import trophy from '../assets/trophy.png'
import starEarned from '../assets/star-earned.svg'

export default function Profile() {
  return (
    <div className="flex-1 relative overflow-hidden bg-[#0a2745]">
      <img
        src={bgSpace}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute max-w-none pointer-events-none select-none object-cover"
        style={{ top: 0, left: -43, width: 457, height: 812 }}
      />

      <AppHeader />

      <div
        className="absolute z-10 rounded-full border-[3px] border-[#f16522] flex items-center justify-center bg-[#0a2745]/40"
        style={{ top: 156, left: 155, width: 63, height: 62 }}
      >
        <span className="font-poppins font-black text-[#f16522] leading-none" style={{ fontSize: 36 }}>
          A
        </span>
      </div>

      <div
        className="absolute z-20 text-center"
        style={{ top: 223, left: 56, width: 262 }}
      >
        <p className="font-poppins font-black text-[#f8c83c] text-[14px] leading-tight">
          Ameritah
        </p>
        <p className="mt-2 font-poppins font-black text-white text-[14px] leading-tight">
          ameritahnakabuye@gmail.com
        </p>
      </div>

      <img
        src={trophy}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute max-w-none pointer-events-none select-none object-contain z-10"
        style={{ top: 187, left: -24, width: 422, height: 422 }}
      />

      <img
        src={starEarned}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute z-20 pointer-events-none select-none"
        style={{ top: 486, left: 101, width: 45.74, height: 46.48 }}
      />
      <img
        src={starEarned}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute z-20 pointer-events-none select-none"
        style={{ top: 486, left: 164, width: 45.74, height: 46.48 }}
      />
      <img
        src={starEarned}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute z-20 pointer-events-none select-none"
        style={{ top: 485, left: 227, width: 45.74, height: 46.48 }}
      />

      <div
        className="absolute z-20 font-poppins font-black leading-tight"
        style={{ top: 614, left: 79, width: 245, fontSize: 32 }}
      >
        <p>
          <span className="text-white">Plan</span>
          <span className="text-[#f16522]">: Luganda</span>
        </p>
        <p>
          <span className="text-white">Level</span>
          <span className="text-[#f16522]">: Warifu</span>
        </p>
      </div>
    </div>
  )
}
