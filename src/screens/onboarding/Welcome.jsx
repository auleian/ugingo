import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mascotHead from '../../assets/mascot-default.png'

// Splash sits on the mascot-in-circle for HOLD ms, then the circle (with the
// mascot inside it) spins and shrinks away before we navigate to the branded
// welcome.
const SIZE = 170
const HOLD_MS = 1000
const SPIN_MS = 900

export default function Welcome() {
  const navigate = useNavigate()
  const [spin, setSpin] = useState(false)

  useEffect(() => {
    const spinId = setTimeout(() => setSpin(true), HOLD_MS)
    const navId = setTimeout(() => navigate('/sign-in'), HOLD_MS + SPIN_MS)
    return () => {
      clearTimeout(spinId)
      clearTimeout(navId)
    }
  }, [navigate])

  function skip() {
    navigate('/sign-in')
  }

  return (
    <div
      className="flex-1 flex items-center justify-center bg-white cursor-pointer overflow-hidden"
      onClick={skip}
      role="button"
      aria-label="Continue"
    >
      <div
        className="rounded-full bg-brand flex items-center justify-center overflow-hidden"
        style={{
          width: SIZE,
          height: SIZE,
          transform: spin ? 'rotate(720deg) scale(0)' : 'rotate(0deg) scale(1)',
          opacity: spin ? 0 : 1,
          transition: `transform ${SPIN_MS}ms cubic-bezier(0.55, 0.05, 0.45, 0.95), opacity ${SPIN_MS}ms ease-in`,
        }}
      >
        <img
          src={mascotHead}
          alt=""
          draggable={false}
          className="select-none"
          style={{ width: '60%', height: 'auto' }}
        />
      </div>
    </div>
  )
}
