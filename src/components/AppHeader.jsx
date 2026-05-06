import Mascot from './Mascot'

export default function AppHeader({ level = 'A' }) {
  return (
    <header className="relative w-full h-14 px-4 flex items-center justify-between bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] z-10">
      <Mascot variant="default" size={32} withCircle={false} />
      <div className="w-9 h-9 rounded-full border-2 border-brand flex items-center justify-center font-bold text-brand text-sm">
        {level}
      </div>
    </header>
  )
}
