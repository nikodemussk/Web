import { useEffect, useRef, useState } from 'react'
import { useSiteState } from '../../state/SiteStateContext'
import { makeId } from '../../utils/random'

interface Sparkle {
  id: string
  x: number
  y: number
  emoji: string
}

const DEFAULT_EMOJI = ['🍃', '✨', '🌸']
const VIBE_EMOJI = ['✨', '💖', '⭐', '💿']
const SPAWN_INTERVAL_MS = 90
const LIFETIME_MS = 700

export default function CursorSparkleTrail() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const { vibeShift } = useSiteState()
  const lastSpawn = useRef(0)

  useEffect(() => {
    function handleMove(event: MouseEvent) {
      const now = performance.now()
      if (now - lastSpawn.current < SPAWN_INTERVAL_MS) return
      lastSpawn.current = now

      const pool = vibeShift ? VIBE_EMOJI : DEFAULT_EMOJI
      const sparkle: Sparkle = {
        id: makeId(),
        x: event.clientX,
        y: event.clientY,
        emoji: pool[Math.floor(Math.random() * pool.length)],
      }

      setSparkles((prev) => [...prev, sparkle])
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id))
      }, LIFETIME_MS)
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [vibeShift])

  return (
    <div className="pointer-events-none fixed inset-0 z-[85]" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-[sparkle-pop_0.7s_ease-out_forwards] text-lg"
          style={{ left: sparkle.x, top: sparkle.y }}
        >
          {sparkle.emoji}
        </span>
      ))}
    </div>
  )
}
