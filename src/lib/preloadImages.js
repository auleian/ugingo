// Pre-warm the browser cache with every image/asset in /assets while the user
// is on the first page. Subsequent route navigations then render instantly
// because the bytes are already in disk cache.
//
// `import.meta.glob` with eager: true causes Vite to include every matching
// asset in the build graph and resolve their hashed URLs at build time. We
// trigger the actual network fetches via `new Image()` (or fetch() for SVGs),
// scheduled in browser idle time so they don't compete with critical resources.

const ASSET_URLS = Object.values(
  import.meta.glob('../assets/*.{png,jpg,jpeg,webp,svg}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
)

let started = false

export function preloadAllImages() {
  if (started || typeof window === 'undefined') return
  started = true

  const schedule =
    window.requestIdleCallback ||
    ((cb) => setTimeout(() => cb({ timeRemaining: () => 50, didTimeout: false }), 200))

  schedule(
    () => {
      for (const url of ASSET_URLS) {
        if (url.endsWith('.svg')) {
          // <img> won't fire a HEAD-only request for SVGs we use as <img src>;
          // a tiny GET via fetch warms cache and stays in HTTP cache.
          fetch(url, { cache: 'force-cache', priority: 'low' }).catch(() => {})
        } else {
          const img = new Image()
          img.decoding = 'async'
          img.fetchPriority = 'low'
          img.src = url
        }
      }
    },
    { timeout: 3000 }
  )
}
