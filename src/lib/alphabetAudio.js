// Resolves per-card phonic + word audio URLs for the alphabet lesson screens.
// Files live in src/assets/audio/alphabet/ named "<screen>-<idx>-phonic.<ext>"
// and "<screen>-<idx>-word.<ext>" (e.g. "03-01-phonic.m4a"). Accepts m4a, mp3,
// or ogg. Missing files resolve to undefined so partial uploads don't break
// the UI.

const MODULES = import.meta.glob('../assets/audio/alphabet/*.{m4a,mp3,ogg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const URLS = {}
for (const [path, url] of Object.entries(MODULES)) {
  const name = path.split('/').pop().replace(/\.(m4a|mp3|ogg)$/, '')
  URLS[name] = url
}

function pad2(n) {
  return String(n).padStart(2, '0')
}

export function alphabetAudioKey(screen, idx) {
  return `${pad2(screen)}-${pad2(idx)}`
}

export function getAlphabetAudio(screen, idx) {
  const key = alphabetAudioKey(screen, idx)
  return {
    phonicSrc: URLS[`${key}-phonic`],
    wordSrc: URLS[`${key}-word`],
  }
}
