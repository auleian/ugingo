import Mascot from './Mascot'

export default function MascotSpeechBubble({ children, mascotSize = 70, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Mascot variant="default" size={mascotSize} withCircle={false} />
      <div className="flex-1 bg-[rgba(85,137,244,0.05)] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.08)] px-5 py-4">
        <p className="text-[16px] text-zinc-900 leading-snug">{children}</p>
      </div>
    </div>
  )
}
