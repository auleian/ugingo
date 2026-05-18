// One-shot helper: scan src/assets/wave-source.svg and print the true Y-band
// the artwork occupies (including bezier control points). Used to tune the
// crop window in src/components/Wave.jsx.

import { readFileSync } from 'node:fs'

const svg = readFileSync('src/assets/wave-source.svg', 'utf8')
const paths = [...svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1])

// Cmd → arg count (per repetition; M/m groups after the first behave like L/l)
const ARGS = { M: 2, m: 2, L: 2, l: 2, H: 1, h: 1, V: 1, v: 1, C: 6, c: 6, S: 4, s: 4, Q: 4, q: 4, T: 2, t: 2, A: 7, a: 7, Z: 0, z: 0 }

let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity

for (const d of paths) {
  let cx = 0, cy = 0, startX = 0, startY = 0
  // Tokenize: command letters + signed decimals
  const tokens = d.match(/[A-Za-z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || []
  let i = 0
  let cmd = null
  while (i < tokens.length) {
    if (/[A-Za-z]/.test(tokens[i])) {
      cmd = tokens[i++]
    }
    if (cmd == null) break
    const c = cmd
    const upper = c.toUpperCase()
    const rel = c !== upper
    let n = ARGS[c] ?? 0
    if (n === 0) {
      // Z — pen returns to subpath start; doesn't extend bbox further
      cx = startX; cy = startY
      // After Z, an implicit next command must be specified explicitly — leave cmd as-is
      continue
    }
    const args = tokens.slice(i, i + n).map(Number)
    i += n
    let nx = cx, ny = cy
    switch (upper) {
      case 'M':
      case 'L': {
        nx = rel ? cx + args[0] : args[0]
        ny = rel ? cy + args[1] : args[1]
        if (upper === 'M') { startX = nx; startY = ny; cmd = rel ? 'l' : 'L' }
        break
      }
      case 'H': nx = rel ? cx + args[0] : args[0]; break
      case 'V': ny = rel ? cy + args[0] : args[0]; break
      case 'C': {
        const xs = rel ? [cx + args[0], cx + args[2], cx + args[4]] : [args[0], args[2], args[4]]
        const ys = rel ? [cy + args[1], cy + args[3], cy + args[5]] : [args[1], args[3], args[5]]
        for (let k = 0; k < 3; k++) { if (xs[k] < minX) minX = xs[k]; if (xs[k] > maxX) maxX = xs[k]; if (ys[k] < minY) minY = ys[k]; if (ys[k] > maxY) maxY = ys[k] }
        nx = xs[2]; ny = ys[2]; break
      }
      case 'S':
      case 'Q': {
        const xs = rel ? [cx + args[0], cx + args[2]] : [args[0], args[2]]
        const ys = rel ? [cy + args[1], cy + args[3]] : [args[1], args[3]]
        for (let k = 0; k < 2; k++) { if (xs[k] < minX) minX = xs[k]; if (xs[k] > maxX) maxX = xs[k]; if (ys[k] < minY) minY = ys[k]; if (ys[k] > maxY) maxY = ys[k] }
        nx = xs[1]; ny = ys[1]; break
      }
      case 'T': nx = rel ? cx + args[0] : args[0]; ny = rel ? cy + args[1] : args[1]; break
      case 'A': nx = rel ? cx + args[5] : args[5]; ny = rel ? cy + args[6] : args[6]; break
    }
    if (nx < minX) minX = nx
    if (nx > maxX) maxX = nx
    if (ny < minY) minY = ny
    if (ny > maxY) maxY = ny
    cx = nx; cy = ny
  }
}

console.log(`X: ${minX.toFixed(1)} → ${maxX.toFixed(1)}  (width ${(maxX - minX).toFixed(1)})`)
console.log(`Y: ${minY.toFixed(1)} → ${maxY.toFixed(1)}  (height ${(maxY - minY).toFixed(1)})`)
const frameW = 5662.2 / 4
console.log(`\nPer-frame width: ${frameW.toFixed(2)}`)
console.log(`Artwork-band height: ${(maxY - minY).toFixed(2)}`)
console.log(`Frame aspect (artwork): ${((maxY - minY) / frameW).toFixed(3)}`)
console.log(`\nFor Wave.jsx:`)
console.log(`  FRAME_W_SRC = ${frameW.toFixed(2)}`)
console.log(`  FRAME_H_SRC = ${(maxY - minY).toFixed(0)}`)
console.log(`  FRAME_Y_OFFSET = ${minY.toFixed(0)}`)
