import { useMemo } from 'react'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { sampleGradientStops, type ColorStop } from '../../utils/color'
import { randomBetween, randomInt } from '../../utils/random'
import { useSiteState } from '../../state/SiteStateContext'

const SKY_STOPS: ColorStop[] = [
  { at: 0, color: '#bfe3f2' },
  { at: 0.35, color: '#ffdca8' },
  { at: 0.65, color: '#f4a988' },
  { at: 1, color: '#1c2541' },
]

interface Cloud {
  id: number
  top: number
  scale: number
  duration: number
  delay: number
}

function makeClouds(count: number): Cloud[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    top: randomBetween(4, 38),
    scale: randomBetween(0.6, 1.6),
    duration: randomBetween(26, 46),
    delay: randomBetween(-40, 0),
  }))
}

function CloudShape() {
  return (
    <svg width="120" height="48" viewBox="0 0 120 48" fill="white" opacity={0.8}>
      <ellipse cx="30" cy="30" rx="26" ry="16" />
      <ellipse cx="58" cy="20" rx="30" ry="20" />
      <ellipse cx="90" cy="28" rx="24" ry="15" />
    </svg>
  )
}

function BirdV({ delay, top, duration }: { delay: number; top: number; duration: number }) {
  return (
    <svg
      className="absolute"
      style={{ top: `${top}%`, left: '-8%', animation: `drift ${duration}s linear infinite`, animationDelay: `${delay}s` }}
      width="28"
      height="14"
      viewBox="0 0 28 14"
    >
      <path d="M0 8 Q7 0 14 8 Q21 0 28 8" stroke="#3f3f46" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Full-page decorative sky that shifts color across the whole scroll journey
 * (dawn -> midday -> dusk -> night), evoking a train window ride through the day.
 */
export default function SkyBackdrop() {
  const { progress } = useScrollProgress()
  const clouds = useMemo(() => makeClouds(6), [])
  const skyColor = sampleGradientStops(SKY_STOPS, progress)
  const starOpacity = Math.max(0, (progress - 0.6) / 0.4)
  const { vibeShift } = useSiteState()

  if (vibeShift) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'repeating-linear-gradient(45deg, #ff00de, #ff00de 12px, #00fff2 12px, #00fff2 24px)',
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-700" style={{ backgroundColor: skyColor }}>
      {/* stars, fade in as the sky turns to night */}
      <div className="absolute inset-0" style={{ opacity: starOpacity }} aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-white animate-pulseGlow"
            style={{
              top: `${randomInt(0, 55)}%`,
              left: `${randomInt(0, 100)}%`,
              animationDelay: `${randomBetween(0, 3)}s`,
            }}
          />
        ))}
      </div>

      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute"
          style={{
            top: `${cloud.top}%`,
            transform: `scale(${cloud.scale})`,
            animation: `drift ${cloud.duration}s linear infinite`,
            animationDelay: `${cloud.delay}s`,
          }}
        >
          <CloudShape />
        </div>
      ))}

      <BirdV top={14} duration={22} delay={-4} />
      <BirdV top={20} duration={22} delay={-6} />
      <BirdV top={17} duration={30} delay={-18} />

      {/* mountain silhouette layers, parallax via scroll progress */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        style={{ transform: `translateY(${progress * 12}px)` }}
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
      >
        <path d="M0 200 L200 90 L360 180 L560 60 L760 170 L980 80 L1200 190 L1440 120 L1440 260 L0 260 Z" fill="#8c7aa8" opacity="0.55" />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-full"
        style={{ transform: `translateY(${progress * 6}px)` }}
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <path d="M0 180 L240 100 L420 160 L660 70 L900 150 L1140 90 L1440 170 L1440 220 L0 220 Z" fill="#6b5b95" opacity="0.7" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 160" preserveAspectRatio="none">
        <path d="M0 140 L260 60 L500 120 L760 40 L1020 110 L1280 55 L1440 100 L1440 160 L0 160 Z" fill="#5b8c5a" opacity="0.85" />
      </svg>
    </div>
  )
}
