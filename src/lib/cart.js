import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ugingo.cart.v1'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore quota errors — UI still updates via in-memory state
  }
}

let state = load()
const listeners = new Set()

function emit() {
  for (const l of listeners) l(state)
}

export function getCart() {
  return state
}

export function setQty(id, qty) {
  const next = { ...state }
  if (qty <= 0) delete next[id]
  else next[id] = qty
  state = next
  save(state)
  emit()
}

export function addOne(id) {
  setQty(id, (state[id] || 0) + 1)
}

export function removeItem(id) {
  setQty(id, 0)
}

export function totalCount() {
  return Object.values(state).reduce((a, b) => a + b, 0)
}

export function useCart() {
  const [, setTick] = useState(0)
  useEffect(() => {
    const l = () => setTick((t) => t + 1)
    listeners.add(l)
    return () => {
      listeners.delete(l)
    }
  }, [])
  return state
}
