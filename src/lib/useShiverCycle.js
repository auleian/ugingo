import { useEffect, useState } from 'react'

// Returns the current "active" index in [0, count), advancing once per
// periodMs. When mounted on a page with N cloud cards, pass N and the period
// (default 2000 ms) — render only the card at this index with its shiver
// animation playing, and the cycle marches one card at a time, looping.
export default function useShiverCycle(count, periodMs = 2000) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!count || count < 2) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count)
    }, periodMs)
    return () => clearInterval(id)
  }, [count, periodMs])
  return index
}
