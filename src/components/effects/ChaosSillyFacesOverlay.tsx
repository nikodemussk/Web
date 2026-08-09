import { useMemo } from 'react'
import { useSiteState } from '../../state/SiteStateContext'
import { randomBetween } from '../../utils/random'

const FACES = ['🥸', '🤪', '🫠', '👽', '🤡', '🗿', '🥴', '😵‍💫']

export default function ChaosSillyFacesOverlay() {
  const { chaosMode } = useSiteState()
  const faces = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        emoji: FACES[i % FACES.length],
        top: randomBetween(4, 92),
        left: randomBetween(2, 92),
        size: randomBetween(28, 56),
        delay: randomBetween(0, 1.2),
      })),
    [],
  )

  if (chaosMode !== 'silly-faces') return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">
      {faces.map((face, i) => (
        <span
          key={i}
          className="un-flip absolute animate-wiggle"
          style={{
            top: `${face.top}%`,
            left: `${face.left}%`,
            fontSize: `${face.size}px`,
            animationDelay: `${face.delay}s`,
          }}
        >
          {face.emoji}
        </span>
      ))}
    </div>
  )
}
