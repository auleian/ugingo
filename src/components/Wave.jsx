import { useEffect, useState } from 'react'
import waveSrc from '../assets/wave-source.svg'

// The 4 frames live inside one source SVG laid out horizontally inside a
// 5662.2 × 4529.8 canvas. The actual artwork only occupies a band in the
// middle (y ≈ 1132–2867). Instead of splitting into 4 files we treat the
// source as a sprite sheet: a CSS background-image cropped & repositioned
// per frame.
//
// Ping-pong loop (1→2→3→4→3→2→…) so the hand swings out and back smoothly
// with no visible jump at wrap-around.

const FRAMES = 4
const SRC_W = 5662.2         // viewBox width of the source SVG
const SRC_H = 4529.8         // viewBox height
const FRAME_W_SRC = SRC_W / FRAMES // 1415.55
const FRAME_H_SRC = 2246     // artwork band height (y 883 → 3129, real bbox)
const FRAME_Y_OFFSET = 883   // crop above this in source is empty canvas
const FRAME_ASPECT = FRAME_H_SRC / FRAME_W_SRC // ≈ 1.587

const PING_PONG = (() => {
  // [0, 1, 2, 3, 2, 1] — endpoints visited once per cycle so the wrap is seamless.
  const fwd = Array.from({ length: FRAMES }, (_, i) => i)
  const back = Array.from({ length: FRAMES - 2 }, (_, i) => FRAMES - 2 - i)
  return [...fwd, ...back]
})()

export default function Wave({
  size = 120,
  width,
  height,
  fps = 8,
  className = '',
  style,
}) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % PING_PONG.length),
      Math.max(16, 1000 / fps),
    )
    return () => clearInterval(id)
  }, [fps])

  const frame = PING_PONG[idx]
  // Width and height can be set independently. When height is omitted we keep
  // the artwork's natural aspect. When both are given we stretch each axis
  // independently so the frame exactly fills the requested box.
  const w = width ?? size
  const h = height ?? w * FRAME_ASPECT
  const scaleX = w / FRAME_W_SRC
  const scaleY = h / FRAME_H_SRC

  return (
    <div
      aria-hidden
      className={`select-none pointer-events-none ${className}`}
      style={{
        width: w,
        height: h,
        backgroundImage: `url(${waveSrc})`,
        backgroundSize: `${SRC_W * scaleX}px ${SRC_H * scaleY}px`,
        backgroundPosition: `${-frame * w}px ${-FRAME_Y_OFFSET * scaleY}px`,
        backgroundRepeat: 'no-repeat',
        // Crop ~2px off the right edge to hide a sub-pixel sliver of the
        // neighbouring frame that bleeds in from the source SVG.
        clipPath: 'inset(0 2px 0 0)',
        ...style,
      }}
    />
  )
}
