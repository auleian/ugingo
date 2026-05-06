export default function SelectableOption({
  leading,
  trailing,
  children,
  selected = false,
  disabled = false,
  onClick,
  className = '',
  style,
}) {
  const borderClass = disabled
    ? 'border-[#eff1f5]'
    : selected
    ? 'border-brand'
    : 'border-[#eff1f5] hover:border-zinc-300'

  const textClass = disabled
    ? 'text-[rgba(30,28,28,0.56)]'
    : 'text-[#1e1c1c] font-bold'

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={style}
      className={`w-full flex items-center gap-3 bg-white rounded-[16px] border-2 px-5 shadow-[0_4px_0_0_#eff1f5] transition text-left overflow-hidden ${borderClass} ${
        disabled ? 'cursor-not-allowed' : ''
      } ${className}`}
    >
      {leading && <span className="shrink-0 text-xl leading-none">{leading}</span>}
      <span className={`flex-1 text-[16px] font-baloo ${textClass}`}>{children}</span>
      {trailing && <span className="shrink-0 text-xs text-zinc-500 font-baloo font-bold">{trailing}</span>}
    </button>
  )
}
