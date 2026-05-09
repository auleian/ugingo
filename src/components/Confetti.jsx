import { useEffect, useRef } from 'react'

// Brand-coloured 1-shot confetti burst. ~80 lines, no library. Mounts a
// fixed-positioned canvas covering the parent stacking context, spawns N
// particles from the origin, applies gravity + drag, fades them out, then
// removes itself. Use it inside any screen's celebration moment — render once
// (e.g. on first mount of a webale screen) and let the effect run to completion.

const COLORS = ['#F16522', '#F7AE2B', '#F8C83C', '#69CAD3', '#2E4858', '#FF66C4']

// Two modes:
//  - 'burst' (default): particles erupt from (originX, originY) and fall.
//  - 'rain': particles enter from above the top edge at random x and fall
//    straight down — for ambient celebrations like the profile screen.
// Defaults sized to outlast the milestone clip (4.52s) by ~1s — particles keep
// spawning until `spawnUntil` ms and then fade until `duration` ms.
export default function Confetti({
  mode = 'burst',
  count = 160,
  duration = 3500,
  spawnUntil = 2800,
  originX = 0.5, // burst-only: 0–1 of frame width
  originY = 0.35, // burst-only: 0–1 of frame height
  spreadDeg = 80, // burst-only
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

    // Particles are pre-built but each has a spawnAt time so they "pour" over
    // the spawnUntil window rather than all firing in a single burst.
    const baseAngle = -Math.PI / 2 // burst: straight up
    const half = (spreadDeg * Math.PI) / 180 / 2
    const makeBurst = (spawnAt) => {
      const angle = baseAngle + (Math.random() * 2 - 1) * half
      const speed = 280 + Math.random() * 320
      return {
        spawnAt,
        x: originX * w,
        y: originY * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 12,
        size: 5 + Math.random() * 5,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        active: false,
      }
    }
    const makeRain = (spawnAt) => ({
      spawnAt,
      x: Math.random() * w,
      y: -20 - Math.random() * 60, // start above the top edge
      vx: (Math.random() - 0.5) * 60, // slight horizontal drift
      vy: 80 + Math.random() * 80, // gentle downward push, gravity does the rest
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 8,
      size: 5 + Math.random() * 5,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      active: false,
    })
    const makeParticle = mode === 'rain' ? makeRain : makeBurst
    const particles = []
    for (let i = 0; i < count; i++) {
      // Even-ish stagger across spawnUntil with a touch of jitter.
      const t = (i / Math.max(1, count - 1)) * spawnUntil + (Math.random() - 0.5) * 80
      particles.push(makeParticle(Math.max(0, Math.min(spawnUntil, t))))
    }

    let raf = 0
    let last = performance.now()
    const start = last

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const elapsed = now - start
      // Fade only over the last ~700ms so falling stars stay vivid.
      const fadeStart = Math.max(0, duration - 700)
      const fade = elapsed <= fadeStart
        ? 1
        : Math.max(0, 1 - (elapsed - fadeStart) / (duration - fadeStart))

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        if (!p.active) {
          if (elapsed < p.spawnAt) continue
          p.active = true
        }
        p.vy += 900 * dt // gravity
        p.vx *= Math.pow(0.99, dt * 60) // mild drag
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.rot += p.vrot * dt

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
  }, [mode, count, duration, spawnUntil, originX, originY, spreadDeg])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 pointer-events-none z-30 ${className}`}
    />
  )
}
