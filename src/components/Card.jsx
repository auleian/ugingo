export default function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-white/95 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] px-6 py-5 ${className}`}
    >
      {children}
    </div>
  )
}
