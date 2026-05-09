import { useEffect, useRef } from 'react'

// Brand-coloured 1-shot confetti burst. ~80 lines, no library. Mounts a
// fixed-positioned canvas covering the parent stacking context, spawns N
// particles from the origin, applies gravity + drag, fades them out, then
// removes itself. Use it inside any screen's celebration moment — render once
// (e.g. on first mount of a webale screen) and let the effect run to completion.

const COLORS = ['#F16522', '#F7AE2B', '#F8C83C', '#69CAD3', '#2E4858', '#FF66C4']

export default function Confetti({
  count = 80,
  duration = 2400,
  originX = 0.5, // 0–1 of frame width
  originY = 0.35, // 0–1 of frame height (upper-third looks best behind a mascot)
  spreadDeg = 80,
  className = '',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      const rect = parent.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
    }
    resize()

    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    const w = parent.getBoundingClientRect().width
    const h = parent.getBoundingClientRect().height

    // Spawn particles from the origin point with a vertical-ish spread.
    const particles = []
    const baseAngle = -Math.PI / 2 // straight up
    const half = (spreadDeg * Math.PI) / 180 / 2
    for (let i = 0; i < count; i++) {
      const angle = baseAngle + (Math.random() * 2 - 1) * half
      const speed = 280 + Math.random() * 320
      particles.push({
        x: originX * w,
        y: originY * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 12,
        size: 5 + Math.random() * 5,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        life: 0,
      })
    }

    let raf = 0
    let last = performance.now()
    const start = last

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const elapsed = now - start
      const fade = Math.max(0, 1 - elapsed / duration)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        // physics
        p.vy += 900 * dt // gravity
        p.vx *= Math.pow(0.99, dt * 60) // mild drag
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.rot += p.vrot * dt
        p.life += dt

        // draw — small rounded rect, rotated
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = fade
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size * 0.3, p.size, p.size * 0.6)
        ctx.restore()
      }

      if (elapsed < duration) {
        raf = requestAnimationFrame(tick)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [count, duration, originX, originY, spreadDeg])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 pointer-events-none z-30 ${className}`}
    />
  )
}
