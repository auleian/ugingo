// Tiny Web Audio synth — no audio files, no library, ~1KB total.
// All tones are synthesised on demand from oscillators with per-note ADSR
// envelopes. Adequate for kid-app UI feedback (tap / correct / wrong /
// success). Replace with sample-based playback later if desired.

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ugingo.muted'

let _ctx = null
function ctx() {
  if (!_ctx && typeof window !== 'undefined') {
    const Ctor = window.AudioContext || window.webkitAudioContext
    if (Ctor) _ctx = new Ctor()
  }
  return _ctx
}

// --- mute state (persisted, observable) ----------------------------------

function loadMuted() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

let muted = loadMuted()
const muteListeners = new Set()

export function isMuted() {
  return muted
}

export function setMuted(next) {
  muted = !!next
  try {
    localStorage.setItem(STORAGE_KEY, muted ? '1' : '0')
  } catch {
    // ignore quota errors
  }
  for (const l of muteListeners) l(muted)
}

export function toggleMute() {
  setMuted(!muted)
}

export function useMute() {
  const [m, setM] = useState(muted)
  useEffect(() => {
    const l = (next) => setM(next)
    muteListeners.add(l)
    return () => {
      muteListeners.delete(l)
    }
  }, [])
  return m
}

// --- synth primitives ----------------------------------------------------

// Browsers require a user gesture before AudioContext can resume. We try to
// resume on every play; if the user has tapped at least once, this succeeds.
function ensureRunning() {
  const c = ctx()
  if (!c) return null
  if (c.state === 'suspended') c.resume().catch(() => {})
  return c
}

// One short tone with an ADSR envelope.
function tone(c, { freq, start, dur, peak = 0.18, attack = 0.005, type = 'sine' }) {
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(peak, start + attack)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start(start)
  osc.stop(start + dur + 0.02)
}

// --- public sounds -------------------------------------------------------

export function playTap() {
  if (muted) return
  const c = ensureRunning()
  if (!c) return
  const t = c.currentTime
  tone(c, { freq: 660, start: t, dur: 0.08, peak: 0.12, type: 'triangle' })
}

export function playCorrect() {
  if (muted) return
  const c = ensureRunning()
  if (!c) return
  const t = c.currentTime
  // Two-note rising chime: C5 -> E5 -> G5
  tone(c, { freq: 523.25, start: t, dur: 0.18, peak: 0.18 })
  tone(c, { freq: 659.25, start: t + 0.09, dur: 0.22, peak: 0.18 })
  tone(c, { freq: 783.99, start: t + 0.18, dur: 0.32, peak: 0.16 })
}

export function playWrong() {
  if (muted) return
  const c = ensureRunning()
  if (!c) return
  const t = c.currentTime
  // Descending muted dyad
  tone(c, { freq: 392, start: t, dur: 0.18, peak: 0.16, type: 'triangle' })
  tone(c, { freq: 311.13, start: t + 0.12, dur: 0.28, peak: 0.16, type: 'triangle' })
}

export function playSuccess() {
  if (muted) return
  const c = ensureRunning()
  if (!c) return
  const t = c.currentTime
  // Ascending C major arpeggio: C5 E5 G5 C6
  const notes = [523.25, 659.25, 783.99, 1046.5]
  notes.forEach((f, i) => {
    tone(c, { freq: f, start: t + i * 0.08, dur: 0.4 - i * 0.04, peak: 0.18 })
  })
}
