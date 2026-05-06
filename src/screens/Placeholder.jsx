import { useLocation } from 'react-router-dom'
import Button from '../components/Button'

export default function Placeholder({ title, next }) {
  const { pathname } = useLocation()
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="text-xs uppercase tracking-wider text-zinc-400">{pathname}</div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-zinc-500 text-sm">Screen scaffold — design pending</p>
      {next && <Button to={next}>Continue</Button>}
    </div>
  )
}
