import { useEffect, useRef, useState, type ReactNode } from 'react'

const MAGNET_RADIUS = 140
const MAGNET_STRENGTH = 26

function MagneticDoodle({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const frame = useRef<number | null>(null)

  useEffect(() => {
    function handleMove(event: MouseEvent) {
      if (frame.current) return
      frame.current = requestAnimationFrame(() => {
        frame.current = null
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = event.clientX - cx
        const dy = event.clientY - cy
        const distance = Math.hypot(dx, dy)

        if (distance < MAGNET_RADIUS) {
          const pull = (1 - distance / MAGNET_RADIUS) * MAGNET_STRENGTH
          setOffset({ x: (dx / distance) * pull, y: (dy / distance) * pull })
        } else {
          setOffset({ x: 0, y: 0 })
        }
      })
    }

    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute select-none transition-transform duration-200 ease-out ${className}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      {children}
    </div>
  )
}

/** A handful of decorative doodles that gently gravitate toward the cursor as it glides past. */
export default function MagneticDoodles() {
  return (
    <>
      <MagneticDoodle className="left-[8%] top-[18%] text-3xl animate-floatSlow">✏️</MagneticDoodle>
      <MagneticDoodle className="right-[10%] top-[24%] text-3xl animate-float">✈️</MagneticDoodle>
      <MagneticDoodle className="left-[14%] bottom-[16%] text-2xl animate-floatSlow">⭐</MagneticDoodle>
      <MagneticDoodle className="right-[14%] bottom-[20%] text-3xl animate-float">☁️</MagneticDoodle>
    </>
  )
}
