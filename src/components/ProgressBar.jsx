export default function ProgressBar({ value = 0, max = 1, className = '' }) {
  const pct = Math.max(0, Math.min(1, value / max)) * 100
  return (
    <div className={`h-[10px] w-full bg-zinc-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-accent transition-[width] duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
