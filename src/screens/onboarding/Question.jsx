import { useNavigate, useParams, Link } from 'react-router-dom'
import Mascot from '../../components/Mascot'
import SelectableOption from '../../components/SelectableOption'
import StatIcon from '../../components/StatIcon'
import StatBarsIcon from '../../components/StatBarsIcon'
import { QUESTIONS } from '../../data/questions'

function renderIcon(icon) {
  if (!icon) return null
  if (typeof icon === 'string') return icon
  if (icon.type === 'stat') return <StatIcon level={icon.level} size={34} />
  if (icon.type === 'bars') return <StatBarsIcon level={icon.level} size={34} />
  return null
}

export default function Question() {
  const { num } = useParams()
  const navigate = useNavigate()
  const index = Number(num) - 1
  const q = QUESTIONS[index]

  if (!q) {
    return <div className="p-6">Unknown question</div>
  }

  const total = QUESTIONS.length
  const isLast = index === total - 1
  const nextPath = isLast ? '/creating-plan' : `/question/${index + 2}`
  const prevPath = index === 0 ? '/languages' : `/question/${index}`
  const progress = (index + 1) / total

  const cardHeight = q.layout?.cardHeight ?? 84
  const cardVerticalAlign = q.layout?.cardVerticalAlign ?? 'top'
  const listLeft = q.layout?.listLeft ?? 20
  const optionHeight = q.layout?.optionHeight ?? 64

  const cardJustify =
    cardVerticalAlign === 'center' ? 'flex items-center' : 'pt-3'

  function handleSelect(_id) {
    setTimeout(() => navigate(nextPath), 150)
  }

  return (
    <div className="flex-1 bg-white relative overflow-y-auto">
      <div className="absolute top-[44px] left-0 w-[375px] h-[48px] flex items-center">
        <Link
          to={prevPath}
          aria-label="Back"
          className="absolute left-[30px] top-[16px] w-4 h-4 flex items-center justify-center text-zinc-700 text-xl leading-none"
        >
          ‹
        </Link>
        <div className="absolute left-[137px] top-[21px] w-[100px] h-[6px] bg-zinc-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-[width] duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <Mascot
        variant="default"
        size={70}
        withCircle={false}
        className="absolute top-[114px] left-[26px]"
      />

      <div
        className={`absolute left-[117px] w-[228px] bg-[rgba(85,137,244,0.05)] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-4 ${cardJustify}`}
        style={{ top: 116, height: cardHeight }}
      >
        <p className="text-left text-[18px] font-baloo font-bold leading-snug text-[#1e1c1c]">
          {q.question}
        </p>
      </div>

      <div
        className="absolute w-[335px] flex flex-col gap-[18px]"
        style={{ top: 232, left: listLeft }}
      >
        {q.options.map((opt) => (
          <SelectableOption
            key={opt.id}
            leading={renderIcon(opt.icon ?? opt.leading)}
            trailing={opt.trailing}
            onClick={() => handleSelect(opt.id)}
            style={{ height: optionHeight }}
          >
            {opt.label}
          </SelectableOption>
        ))}
      </div>
    </div>
  )
}
