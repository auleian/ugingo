import { readdir, stat, readFile, writeFile } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ASSET_DIR = fileURLToPath(new URL('../src/assets', import.meta.url))
const MIN_BYTES = 250 * 1024 // process anything >250KB
const PNG_OPTS = { palette: true, quality: 80, effort: 9, compressionLevel: 9 }
const JPG_OPTS = { quality: 78, mozjpeg: true, progressive: true }

async function walk(dir, out = []) {
  for (const name of await readdir(dir)) {
    const p = join(dir, name)
    const s = await stat(p)
    if (s.isDirectory()) await walk(p, out)
    else out.push({ path: p, size: s.size })
  }
  return out
}

const files = await walk(ASSET_DIR)
const candidates = files.filter((f) => {
  const ext = extname(f.path).toLowerCase()
  return f.size >= MIN_BYTES && (ext === '.png' || ext === '.jpg' || ext === '.jpeg')
})

candidates.sort((a, b) => b.size - a.size)

let totalIn = 0
let totalOut = 0
let processed = 0

for (const { path: p, size } of candidates) {
  const ext = extname(p).toLowerCase()
  const buf = await readFile(p)
  let out
  try {
    if (ext === '.png') {
      out = await sharp(buf).png(PNG_OPTS).toBuffer()
    } else {
      out = await sharp(buf).jpeg(JPG_OPTS).toBuffer()
    }
  } catch (err) {
    console.warn(`skip ${p}: ${err.message}`)
    continue
  }
  if (out.length < buf.length * 0.95) {
    await writeFile(p, out)
    totalIn += size
    totalOut += out.length
    processed++
    const saved = ((1 - out.length / size) * 100).toFixed(1)
    console.log(`${p.replace(ASSET_DIR, '')}: ${(size / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB (-${saved}%)`)
  } else {
    console.log(`skip (not enough gain): ${p.replace(ASSET_DIR, '')}`)
  }
}

console.log(`\n${processed} files compressed. Total: ${(totalIn / 1024 / 1024).toFixed(1)} MB -> ${(totalOut / 1024 / 1024).toFixed(1)} MB (saved ${((totalIn - totalOut) / 1024 / 1024).toFixed(1)} MB)`)
