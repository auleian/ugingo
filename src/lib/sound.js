// Tiny Web Audio synth — no audio files, no library, ~1KB total.
// All tones are synthesised on demand from oscillators with per-note ADSR
// envelopes. Adequate for kid-app UI feedback (tap / correct / wrong /
// success). Replace with sample-based playback later if desired.

import { useEffect, useState } from 'react'
import correctClipSrc from '../assets/correct.mp3'
import milestoneClipSrc from '../assets/milestone.mp3'
import completedClipSrc from '../assets/completed.mp3'

const STORAGE_KEY = 'ugingo.muted'
const MUSIC_KEY = 'ugingo.musicEnabled'
const SOUNDS_KEY = 'ugingo.soundsEnabled'
const VOLUME_KEY = 'ugingo.volume'
const DEFAULT_VOLUME = 0.7

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

// --- category toggles ----------------------------------------------------
// `muted` is the master override. `musicEnabled` and `soundsEnabled` are
// per-category gates flipped from the Settings screen. Anything audible must
// pass BOTH the master mute and its category gate to play.
// Default for new categories is ON.

function loadFlag(key, defaultOn) {
  try {
    const v = localStorage.getItem(key)
    if (v === null) return defaultOn
    return v === '1'
  } catch {
    return defaultOn
  }
}

let musicEnabled = loadFlag(MUSIC_KEY, true)
let soundsEnabled = loadFlag(SOUNDS_KEY, true)
const musicListeners = new Set()
const soundsListeners = new Set()

export function isMusicEnabled() {
  return musicEnabled
}

export function setMusicEnabled(next) {
  musicEnabled = !!next
  try {
    localStorage.setItem(MUSIC_KEY, musicEnabled ? '1' : '0')
  } catch {}
  for (const l of musicListeners) l(musicEnabled)
}

export function useMusicEnabled() {
  const [v, setV] = useState(musicEnabled)
  useEffect(() => {
    const l = (next) => setV(next)
    musicListeners.add(l)
    return () => {
      musicListeners.delete(l)
    }
  }, [])
  return v
}

export function isSoundsEnabled() {
  return soundsEnabled
}

export function setSoundsEnabled(next) {
  soundsEnabled = !!next
  try {
    localStorage.setItem(SOUNDS_KEY, soundsEnabled ? '1' : '0')
  } catch {}
  for (const l of soundsListeners) l(soundsEnabled)
}

export function useSoundsEnabled() {
  const [v, setV] = useState(soundsEnabled)
  useEffect(() => {
    const l = (next) => setV(next)
    soundsListeners.add(l)
    return () => {
      soundsListeners.delete(l)
    }
  }, [])
  return v
}

// True if a sound effect would actually be heard. Both gates must allow it.
function soundsBlocked() {
  return muted || !soundsEnabled
}

// --- master volume (0..1) ------------------------------------------------
// Attenuates everything that goes through synth tones, lesson music, and
// MP3 clips. Persisted so the user's setting survives reload.

function loadVolume() {
  try {
    const raw = localStorage.getItem(VOLUME_KEY)
    if (raw === null) return DEFAULT_VOLUME
    const n = parseFloat(raw)
    if (Number.isNaN(n)) return DEFAULT_VOLUME
    return Math.max(0, Math.min(1, n))
  } catch {
    return DEFAULT_VOLUME
  }
}

let volume = loadVolume()
const volumeListeners = new Set()

export function getVolume() {
  return volume
}

export function setVolume(v) {
  const clamped = Math.max(0, Math.min(1, v))
  if (clamped === volume) return
  volume = clamped
  try {
    localStorage.setItem(VOLUME_KEY, String(volume))
  } catch {}
  for (const l of volumeListeners) l(volume)
}

export function useVolume() {
  const [v, setV] = useState(volume)
  useEffect(() => {
    const l = (next) => setV(next)
    volumeListeners.add(l)
    return () => {
      volumeListeners.delete(l)
    }
  }, [])
  return v
}

// Permanent (non-React) subscription so non-component code (e.g. the music
// loop that may be playing while the user is on a different screen) can react
// to volume changes. Returns an unsubscribe function.
export function subscribeVolume(listener) {
  volumeListeners.add(listener)
  return () => volumeListeners.delete(listener)
}

// Audio-clip helper — applied to <audio> elements right before play.
function withVolume(audio) {
  if (audio) audio.volume = volume
  return audio
}

// Keep already-cached clips' .volume in sync with the slider in real time so
// dragging the Settings slider during a clip changes its loudness live.
volumeListeners.add(() => {
  if (_correctClip) _correctClip.volume = volume
  if (_milestoneClip) _milestoneClip.volume = volume
  if (_completedClip) _completedClip.volume = volume
})

// --- synth primitives ----------------------------------------------------

// Browsers require a user gesture before AudioContext can resume. We try to
// resume on every play; if the user has tapped at least once, this succeeds.
function ensureRunning() {
  const c = ctx()
  if (!c) return null
  if (c.state === 'suspended') c.resume().catch(() => {})
  return c
}

// One short tone with an ADSR envelope. `peak` is the configured tone
// loudness; we then attenuate by the user's master volume (0..1) so a single
// volume control affects every synthesised sound consistently.
function tone(c, { freq, start, dur, peak = 0.18, attack = 0.005, type = 'sine' }) {
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  const target = peak * volume
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(target, start + attack)
  // exponentialRampTo can't ramp to 0; floor near-silence
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, target * 0.001), start + dur)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start(start)
  osc.stop(start + dur + 0.02)
}

// --- public sounds -------------------------------------------------------

export function playTap() {
  if (soundsBlocked()) return
  const c = ensureRunning()
  if (!c) return
  const t = c.currentTime
  tone(c, { freq: 660, start: t, dur: 0.08, peak: 0.12, type: 'triangle' })
}

export function playCorrect() {
  if (soundsBlocked()) return
  const c = ensureRunning()
  if (!c) return
  const t = c.currentTime
  // Two-note rising chime: C5 -> E5 -> G5
  tone(c, { freq: 523.25, start: t, dur: 0.18, peak: 0.18 })
  tone(c, { freq: 659.25, start: t + 0.09, dur: 0.22, peak: 0.18 })
  tone(c, { freq: 783.99, start: t + 0.18, dur: 0.32, peak: 0.16 })
}

export function playWrong() {
  if (soundsBlocked()) return
  const c = ensureRunning()
  if (!c) return
  const t = c.currentTime
  // Descending muted dyad
  tone(c, { freq: 392, start: t, dur: 0.18, peak: 0.16, type: 'triangle' })
  tone(c, { freq: 311.13, start: t + 0.12, dur: 0.28, peak: 0.16, type: 'triangle' })
}

// Recorded "correct" clip — plays the .mp3 and resolves the returned promise
// when playback completes (or immediately if muted/blocked) so callers can
// gate navigation on the clip finishing.
let _correctClip = null
function getCorrectClip() {
  if (_correctClip || typeof window === 'undefined') return _correctClip
  _correctClip = new Audio(correctClipSrc)
  _correctClip.preload = 'auto'
  return _correctClip
}

export function playCorrectClip() {
  if (soundsBlocked()) return Promise.resolve()
  const a = withVolume(getCorrectClip())
  if (!a) return Promise.resolve()
  try {
    a.pause()
    a.currentTime = 0
  } catch {}
  return new Promise((resolve) => {
    let done = false
    const finish = () => {
      if (done) return
      done = true
      a.removeEventListener('ended', finish)
      a.removeEventListener('error', finish)
      resolve()
    }
    a.addEventListener('ended', finish, { once: true })
    a.addEventListener('error', finish, { once: true })
    const p = a.play()
    if (p && typeof p.catch === 'function') p.catch(finish)
  })
}

// Recorded "milestone" clip for challenge-completed celebration screens.
// Fire-and-forget — restarts cleanly if a screen remounts.
let _milestoneClip = null
function getMilestoneClip() {
  if (_milestoneClip || typeof window === 'undefined') return _milestoneClip
  _milestoneClip = new Audio(milestoneClipSrc)
  _milestoneClip.preload = 'auto'
  return _milestoneClip
}

let _milestoneStopTimer = null
export function stopMilestone() {
  if (_milestoneStopTimer) {
    clearTimeout(_milestoneStopTimer)
    _milestoneStopTimer = null
  }
  if (_milestoneClip) {
    try {
      _milestoneClip.pause()
      _milestoneClip.currentTime = 0
    } catch {}
  }
}

export function playMilestone(durationMs) {
  if (soundsBlocked()) return
  const a = withVolume(getMilestoneClip())
  if (!a) return
  if (_milestoneStopTimer) {
    clearTimeout(_milestoneStopTimer)
    _milestoneStopTimer = null
  }
  try {
    a.pause()
    a.currentTime = 0
  } catch {}
  const p = a.play()
  if (p && typeof p.catch === 'function') p.catch(() => {})
  if (typeof durationMs === 'number' && durationMs > 0) {
    _milestoneStopTimer = setTimeout(() => {
      _milestoneStopTimer = null
      try {
        a.pause()
        a.currentTime = 0
      } catch {}
    }, durationMs)
  }
}

// Recorded "completed" clip for the profile celebration. Fire-and-forget,
// stoppable so a screen unmount can cut it short.
let _completedClip = null
let _completedStopTimer = null
function getCompletedClip() {
  if (_completedClip || typeof window === 'undefined') return _completedClip
  _completedClip = new Audio(completedClipSrc)
  _completedClip.preload = 'auto'
  return _completedClip
}

export function stopCompleted() {
  if (_completedStopTimer) {
    clearTimeout(_completedStopTimer)
    _completedStopTimer = null
  }
  if (_completedClip) {
    try {
      _completedClip.pause()
      _completedClip.currentTime = 0
    } catch {}
  }
}

export function playCompleted(durationMs) {
  if (soundsBlocked()) return
  const a = withVolume(getCompletedClip())
  if (!a) return
  if (_completedStopTimer) {
    clearTimeout(_completedStopTimer)
    _completedStopTimer = null
  }
  try {
    a.pause()
    a.currentTime = 0
  } catch {}
  const p = a.play()
  if (p && typeof p.catch === 'function') p.catch(() => {})
  if (typeof durationMs === 'number' && durationMs > 0) {
    _completedStopTimer = setTimeout(() => {
      _completedStopTimer = null
      try {
        a.pause()
        a.currentTime = 0
      } catch {}
    }, durationMs)
  }
}

export function playSuccess() {
  if (soundsBlocked()) return
  const c = ensureRunning()
  if (!c) return
  const t = c.currentTime
  // Ascending C major arpeggio: C5 E5 G5 C6
  const notes = [523.25, 659.25, 783.99, 1046.5]
  notes.forEach((f, i) => {
    tone(c, { freq: f, start: t + i * 0.08, dur: 0.4 - i * 0.04, peak: 0.18 })
  })
}
