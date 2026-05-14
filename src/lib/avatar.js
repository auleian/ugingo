// Avatar catalog + selected-key state. Mirrors the lib/sound.js pattern: a
// module-scoped value persisted to localStorage, with a React hook + a plain
// subscribe so non-React code can observe changes too.
//
// The 12 avatars come from Figma node 873:841 (Choose Your Avatar). Each has
// the emoji shown in Figma, a localised Twemoji PNG so rendering is identical
// across OS/browser, a display label, and the Figma button gradient.

import { useEffect, useState } from 'react'
import lionImg from '../assets/avatars/lion.png'
import giraffeImg from '../assets/avatars/giraffe.png'
import zebraImg from '../assets/avatars/zebra.png'
import elephantImg from '../assets/avatars/elephant.png'
import parrotImg from '../assets/avatars/parrot.png'
import flamingoImg from '../assets/avatars/flamingo.png'
import butterflyImg from '../assets/avatars/butterfly.png'
import flowerImg from '../assets/avatars/flower.png'
import starImg from '../assets/avatars/star.png'
import rainbowImg from '../assets/avatars/rainbow.png'
import artImg from '../assets/avatars/art.png'
import circusImg from '../assets/avatars/circus.png'

const STORAGE_KEY = 'ugingo.avatar'
const DEFAULT_KEY = 'lion'

export const AVATARS = [
  { key: 'lion',      emoji: '🦁', label: 'Lion',      src: lionImg,      gradient: 'linear-gradient(133.156deg, #FDC700 0%, #FF6900 100%)' },
  { key: 'giraffe',   emoji: '🦒', label: 'Giraffe',   src: giraffeImg,   gradient: 'linear-gradient(133.156deg, #FFDF20 0%, #FFB900 100%)' },
  { key: 'zebra',     emoji: '🦓', label: 'Zebra',     src: zebraImg,     gradient: 'linear-gradient(133.156deg, #D1D5DC 0%, #62748E 100%)' },
  { key: 'elephant',  emoji: '🐘', label: 'Elephant',  src: elephantImg,  gradient: 'linear-gradient(133.156deg, #99A1AF 0%, #51A2FF 100%)' },
  { key: 'parrot',    emoji: '🦜', label: 'Parrot',    src: parrotImg,    gradient: 'linear-gradient(133.156deg, #05DF72 0%, #00BC7D 100%)' },
  { key: 'flamingo',  emoji: '🦩', label: 'Flamingo',  src: flamingoImg,  gradient: 'linear-gradient(133.156deg, #FB64B6 0%, #FF2056 100%)' },
  { key: 'butterfly', emoji: '🦋', label: 'Butterfly', src: butterflyImg, gradient: 'linear-gradient(133.156deg, #C27AFF 0%, #F6339A 100%)' },
  { key: 'flower',    emoji: '🌺', label: 'Flower',    src: flowerImg,    gradient: 'linear-gradient(133.156deg, #FDA5D5 0%, #FF6467 100%)' },
  { key: 'star',      emoji: '⭐', label: 'Star',      src: starImg,      gradient: 'linear-gradient(133.156deg, #FFDF20 0%, #FE9A00 100%)' },
  { key: 'rainbow',   emoji: '🌈', label: 'Rainbow',   src: rainbowImg,   gradient: 'linear-gradient(133.156deg, #51A2FF 0%, #C27AFF 50%, #FB64B6 100%)' },
  { key: 'art',       emoji: '🎨', label: 'Art',       src: artImg,       gradient: 'linear-gradient(133.156deg, #7C86FF 0%, #AD46FF 100%)' },
  { key: 'circus',    emoji: '🎪', label: 'Circus',    src: circusImg,    gradient: 'linear-gradient(133.156deg, #FF6467 0%, #F6339A 100%)' },
]

function findByKey(key) {
  return AVATARS.find((a) => a.key === key) || AVATARS[0]
}

function loadKey() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (!v) return DEFAULT_KEY
    return findByKey(v).key
  } catch {
    return DEFAULT_KEY
  }
}

let selectedKey = loadKey()
const listeners = new Set()

export function getAvatarKey() {
  return selectedKey
}

export function getAvatar() {
  return findByKey(selectedKey)
}

export function setAvatarKey(key) {
  const next = findByKey(key).key
  if (next === selectedKey) return
  selectedKey = next
  try {
    localStorage.setItem(STORAGE_KEY, selectedKey)
  } catch {}
  for (const l of listeners) l(selectedKey)
}

export function useAvatar() {
  const [k, setK] = useState(selectedKey)
  useEffect(() => {
    const l = (next) => setK(next)
    listeners.add(l)
    return () => {
      listeners.delete(l)
    }
  }, [])
  return findByKey(k)
}
