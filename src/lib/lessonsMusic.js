// Background music for lesson screens (the content lessons, not the quizzes).
//
// Uses the Web Audio API with an AudioBufferSourceNode so looping is
// sample-accurate and seamless — no decoder seek hitch like HTMLAudioElement
// would produce when we reset currentTime to skip the trailing fade-out.
//
// Lifecycle:
//   1. App boot calls startPreload(), which fetches and decodes the file once.
//   2. ensureReady() resolves when the AudioBuffer is ready (or after a
//      timeout, so the lesson never blocks forever).
//   3. The useLessonsMusic() hook spins up a single source node on first play
//      and only ever stops it on a real pause/unmount (debounced so navigating
//      between same-topic lessons doesn't audibly stop & restart).
//
// `loopEnd` is set to `duration - LOOP_TAIL_TRIM_SECONDS` so the trailing
// fade-out of the source clip never plays.

import { useEffect, useState } from 'react'
import musicSrc from '../assets/lessons-music.mp3'
import { isMuted, useMute } from './sound'

const LOAD_TIMEOUT_MS = 12000 // graceful degrade — never block forever
const VOLUME = 0.35
const SEAMLESS_PAUSE_DELAY_MS = 200
// Skip the trailing fade-out by looping back this many seconds before the end.
const LOOP_TAIL_TRIM_SECONDS = 5

let ctx = null
let buffer = null
let readyPromise = null
let source = null // currently-playing AudioBufferSourceNode (null when paused)
let gain = null
let pausedAtCtxTime = 0 // ctx.currentTime when we last paused
let bufferOffset = 0 // where in the buffer to resume from on next play()
let pendingPauseTimer = null

function getCtx() {
  if (ctx || typeof window === 'undefined') return ctx
  const Ctor = window.AudioContext || window.webkitAudioContext
  if (!Ctor) return null
  ctx = new Ctor()
  gain = ctx.createGain()
  gain.gain.value = VOLUME
  gain.connect(ctx.destination)
  return ctx
}

export function startPreload() {
  ensureReady() // also kicks off the fetch+decode
}

export function ensureReady() {
  if (readyPromise) return readyPromise
  const c = getCtx()
  if (!c) return Promise.resolve()
  readyPromise = new Promise((resolve) => {
    let done = false
    const finish = () => {
      if (done) return
      done = true
      clearTimeout(timer)
      resolve()
    }
    const timer = setTimeout(finish, LOAD_TIMEOUT_MS)
    fetch(musicSrc)
      .then((r) => r.arrayBuffer())
      .then((ab) => c.decodeAudioData(ab))
      .then((decoded) => {
        buffer = decoded
        finish()
      })
      .catch(() => finish())
  })
  return readyPromise
}

function loopEndSeconds() {
  if (!buffer) return 0
  return Math.max(0.1, buffer.duration - LOOP_TAIL_TRIM_SECONDS)
}

function play() {
  if (source || !buffer || isMuted()) return
  const c = getCtx()
  if (!c) return
  if (c.state === 'suspended') c.resume().catch(() => {})
  const s = c.createBufferSource()
  s.buffer = buffer
  s.loop = true
  s.loopStart = 0
  s.loopEnd = loopEndSeconds()
  s.connect(gain)
  const len = loopEndSeconds()
  const offset = ((bufferOffset % len) + len) % len
  s.start(0, offset)
  pausedAtCtxTime = c.currentTime
  source = s
}

function pauseNow() {
  if (!source || !ctx) return
  const elapsed = ctx.currentTime - pausedAtCtxTime
  bufferOffset = (bufferOffset + elapsed) % loopEndSeconds()
  try {
    source.stop()
  } catch {}
  source.disconnect()
  source = null
}

function cancelPendingPause() {
  if (pendingPauseTimer) {
    clearTimeout(pendingPauseTimer)
    pendingPauseTimer = null
  }
}

function schedulePause() {
  cancelPendingPause()
  pendingPauseTimer = setTimeout(() => {
    pendingPauseTimer = null
    pauseNow()
  }, SEAMLESS_PAUSE_DELAY_MS)
}

/**
 * Hook for lesson Frames. While `active`, blocks until the music buffer is
 * decoded, then plays seamlessly. Pauses on unmount (debounced for seamless
 * transitions between same-topic lesson screens). Honors the global mute.
 *
 * Returns `ready` — false until the music buffer is decoded. The Frame can
 * use this to render a loading placeholder.
 */
export function useLessonsMusic(active = true) {
  const [ready, setReady] = useState(false)
  const muted = useMute()

  useEffect(() => {
    if (!active) {
      schedulePause()
      return
    }
    cancelPendingPause()
    let cancelled = false
    ensureReady().then(() => {
      if (cancelled) return
      setReady(true)
      play()
    })
    return () => {
      cancelled = true
      schedulePause()
    }
  }, [active])

  // React to mute toggle while a lesson is active.
  useEffect(() => {
    if (!active || !ready) return
    if (muted) pauseNow()
    else play()
  }, [muted, active, ready])

  return ready
}
