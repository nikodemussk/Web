import { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import { motion, AnimatePresence } from 'framer-motion'
import { useSiteState } from '../../state/SiteStateContext'
import { randomBetween } from '../../utils/random'

interface TrackedPiece {
  element: HTMLElement
  body: Matter.Body
  centerX: number
  centerY: number
}

/**
 * When "Deflate" is triggered, every element tagged with .shatter-piece detaches
 * from the layout, becomes a real Matter.js physics body, and tumbles to the
 * bottom of the screen in a heap.
 */
export default function DeflateEngine() {
  const { isDeflated, resetDeflate } = useSiteState()
  const rafRef = useRef<number | null>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const piecesRef = useRef<TrackedPiece[]>([])
  const [showReassemble, setShowReassemble] = useState(false)

  useEffect(() => {
    if (!isDeflated) return

    const elements = Array.from(document.querySelectorAll<HTMLElement>('.shatter-piece'))
    if (elements.length === 0) return

    const engine = Matter.Engine.create()
    engine.gravity.y = 1
    engineRef.current = engine

    const width = window.innerWidth
    const height = window.innerHeight

    const ground = Matter.Bodies.rectangle(width / 2, height + 40, width * 2, 80, { isStatic: true })
    const leftWall = Matter.Bodies.rectangle(-40, height / 2, 80, height * 2, { isStatic: true })
    const rightWall = Matter.Bodies.rectangle(width + 40, height / 2, 80, height * 2, { isStatic: true })
    Matter.World.add(engine.world, [ground, leftWall, rightWall])

    document.body.style.overflow = 'hidden'

    const pieces: TrackedPiece[] = elements.map((element) => {
      const rect = element.getBoundingClientRect()
      const w = Math.max(rect.width, 4)
      const h = Math.max(rect.height, 4)
      const centerX = rect.left + w / 2
      const centerY = rect.top + h / 2

      element.style.position = 'fixed'
      element.style.left = `${rect.left}px`
      element.style.top = `${rect.top}px`
      element.style.width = `${w}px`
      element.style.height = `${h}px`
      element.style.margin = '0'
      element.style.zIndex = '90'
      element.style.willChange = 'transform'

      const body = Matter.Bodies.rectangle(centerX, centerY, w, h, {
        restitution: 0.35,
        friction: 0.4,
        angle: 0,
      })
      Matter.Body.setAngularVelocity(body, randomBetween(-0.15, 0.15))
      Matter.Body.setVelocity(body, { x: randomBetween(-3, 3), y: 0 })
      Matter.World.add(engine.world, body)

      return { element, body, centerX, centerY }
    })

    piecesRef.current = pieces

    let lastTime = performance.now()
    function tick(now: number) {
      const delta = Math.min(32, now - lastTime)
      lastTime = now
      Matter.Engine.update(engine, delta)

      for (const piece of piecesRef.current) {
        const dx = piece.body.position.x - piece.centerX
        const dy = piece.body.position.y - piece.centerY
        piece.element.style.transform = `translate(${dx}px, ${dy}px) rotate(${piece.body.angle}rad)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const reassembleTimer = setTimeout(() => setShowReassemble(true), 1200)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      clearTimeout(reassembleTimer)
      Matter.World.clear(engine.world, false)
      Matter.Engine.clear(engine)
    }
  }, [isDeflated])

  if (!isDeflated) return null

  return (
    <AnimatePresence>
      {showReassemble && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full bg-white px-6 py-3 font-display font-700 text-stone-800 shadow-xl transition hover:scale-105"
          onClick={() => {
            resetDeflate()
            window.location.reload()
          }}
        >
          🧹 Put it back together
        </motion.button>
      )}
    </AnimatePresence>
  )
}
