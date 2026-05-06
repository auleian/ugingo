import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Mascot from '../components/Mascot'

const SPLASH_DURATION_MS = 2000

export default function Welcome() {
  const navigate = useNavigate()

  useEffect(() => {
    const id = setTimeout(() => navigate('/welcome'), SPLASH_DURATION_MS)
    return () => clearTimeout(id)
  }, [navigate])

  return (
    <div
      className="flex-1 flex items-center justify-center bg-white cursor-pointer"
      onClick={() => navigate('/welcome')}
      role="button"
      aria-label="Continue"
    >
      <Mascot size={170} />
    </div>
  )
}
