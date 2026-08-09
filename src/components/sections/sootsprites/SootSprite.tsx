import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { randomBetween } from '../../../utils/random'
import { playSproutCapture } from '../../../utils/sound'
import { useSiteState } from '../../../state/SiteStateContext'

const SCAMPER_DELAY_MS = 500

export default function SootSprite({ initialTop, initialLeft }: { initialTop: number; initialLeft: number }) {
  const [top, setTop] = useState(initialTop)
  const [left, setLeft] = useState(initialLeft)
  const [captured, setCaptured] = useState(false)
  const scamperTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { captureSprite } = useSiteState()

  function scheduleScamper() {
    scamperTimeout.current = setTimeout(() => {
      setTop(randomBetween(6, 90))
      setLeft(randomBetween(4, 92))
    }, SCAMPER_DELAY_MS)
  }

  function cancelScamper() {
    if (scamperTimeout.current) clearTimeout(scamperTimeout.current)
  }

  function handleCapture() {
    cancelScamper()
    setCaptured(true)
    captureSprite()
    playSproutCapture()
  }

  return (
    <AnimatePresence>
      {!captured && (
        <motion.button
          aria-label="A soot sprite. Click to capture it before it scampers off."
          className="absolute text-3xl"
          style={{ top: `${top}%`, left: `${left}%` }}
          animate={{ top: `${top}%`, left: `${left}%`, y: [0, -4, 0] }}
          transition={{ top: { duration: 0.4 }, left: { duration: 0.4 }, y: { duration: 1.6, repeat: Infinity } }}
          exit={{ scale: 1.6, opacity: 0, transition: { duration: 0.3 } }}
          whileHover={{ scale: 1.15 }}
          onMouseEnter={scheduleScamper}
          onMouseLeave={cancelScamper}
          onClick={handleCapture}
        >
          <svg width="30" height="30" viewBox="0 0 30 30">
            <circle cx="15" cy="16" r="12" fill="#211f26" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
            <circle cx="11" cy="15" r="2.4" fill="white" />
            <circle cx="19" cy="15" r="2.4" fill="white" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
