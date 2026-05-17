// Resolves per-card audio URLs for non-alphabet topics (numbers, people,
// places, animals). One clip per card — the spoken Luganda word.
//
// Files live in src/assets/audio/<topic>/ named "<screen>-<idx>.<ext>"
// (e.g. "01-03.m4a" = screen 1, third card). Accepts m4a, mp3, or ogg.
// Missing files resolve to undefined so partial uploads don't break the UI.
//
// Vite's import.meta.glob patterns must be statically analyzable, so each
// topic's glob is spelled out explicitly.

const TOPIC_MODULES = {
  numbers: import.meta.glob('../assets/audio/numbers/*.{m4a,mp3,ogg}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
  people: import.meta.glob('../assets/audio/people/*.{m4a,mp3,ogg}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
  places: import.meta.glob('../assets/audio/places/*.{m4a,mp3,ogg}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
  animals: import.meta.glob('../assets/audio/animals/*.{m4a,mp3,ogg}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
}

const URLS = {}
for (const [topic, modules] of Object.entries(TOPIC_MODULES)) {
  URLS[topic] = {}
  for (const [path, url] of Object.entries(modules)) {
    const name = path.split('/').pop().replace(/\.(m4a|mp3|ogg)$/, '')
    URLS[topic][name] = url
  }
}

function pad2(n) {
  return String(n).padStart(2, '0')
}

export function getTopicAudio(topic, screen, idx) {
  const key = `${pad2(screen)}-${pad2(idx)}`
  return URLS[topic]?.[key]
}

export function getTopicIntro(topic, screen) {
  return URLS[topic]?.[`${pad2(screen)}-intro`]
}
