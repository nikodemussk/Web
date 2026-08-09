import { useEffect, useMemo, useRef } from 'react'
import { pickRandom, randomBetween, randomInt } from '../../utils/random'
import { useScrollProgress } from '../../hooks/useScrollProgress'

const PETAL_COLORS = ['#f7b9c9', '#f4a988', '#ffd3e0', '#c9e4a2', '#e8d18a']
const PETAL_COUNT = 22

interface Petal {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  swayDuration: number
  color: string
  spin: number
}

function makePetals(): Petal[] {
  return Array.from({ length: PETAL_COUNT }, (_, id) => ({
    id,
    left: randomBetween(0, 100),
    size: randomBetween(10, 20),
    duration: randomBetween(9, 18),
    delay: randomBetween(-18, 0),
    swayDuration: randomBetween(2.5, 5),
    color: pickRandom(PETAL_COLORS),
    spin: randomInt(0, 1) === 0 ? 1 : -1,
  }))
}

/** A single falling petal shape, self-contained so it can rotate independently of its sway wrapper. */
function PetalShape({ size, color, spin }: { size: number; color: string; spin: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ animation: `petal-spin ${randomBetween(3, 6)}s linear infinite ${spin < 0 ? 'reverse' : 'normal'}` }}
    >
      <path
        d="M12 1c4 3 9 7 9 12a9 9 0 1 1-18 0c0-5 5-9 9-12Z"
        fill={color}
        opacity={0.85}
      />
    </svg>
  )
}

/**
 * A continuous, non-stop layer of falling petals/leaves across the whole page.
 * Fast scrolling gives the whole layer a brief "wind gust" nudge.
 */
export default function PetalFall() {
  const petals = useMemo(makePetals, [])
  const { gust } = useScrollProgress()
  const layerRef = useRef<HTMLDivElement>(null)
  const gustOffset = useRef(0)

  useEffect(() => {
    if (!layerRef.current) return
    const target = Math.min(28, gustOffset.current + gust * 0.6)
    gustOffset.current = target
    layerRef.current.style.setProperty('--gust', `${target}px`)

    const decay = setTimeout(() => {
      gustOffset.current = 0
      layerRef.current?.style.setProperty('--gust', '0px')
    }, 500)
    return () => clearTimeout(decay)
  }, [gust])

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden transition-transform duration-500 ease-out"
      style={{ transform: 'translateX(var(--gust, 0px))' }}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-[-10%]"
          style={{
            left: `${petal.left}%`,
            animation: `petal-fall ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          <div
            style={{
              animation: `petal-sway ${petal.swayDuration}s ease-in-out infinite`,
            }}
          >
            <PetalShape size={petal.size} color={petal.color} spin={petal.spin} />
          </div>
        </div>
      ))}
    </div>
  )
}
