import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// Compress every image emitted by the build. The PNG sprites in /assets
// (mascot.png ~1MB, logo-ugingo-sprite.png ~600KB, shop-kingo-head.png, etc.)
// are the biggest first-paint cost on Vercel — pngquant + oxipng typically cuts
// them 5-10× without visible quality loss. JPEGs go through mozjpeg.
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: false, quality: 80 },
      avif: { lossless: false, quality: 80 },
      // SVG defaults are fine; we don't need to tweak them.
    }),
  ],
})
