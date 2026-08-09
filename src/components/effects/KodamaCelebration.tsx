import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSiteState } from '../../state/SiteStateContext'
import { randomBetween } from '../../utils/random'

export default function KodamaCelebration() {
  const { kodamaMode } = useSiteState()
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (!kodamaMode) return
    setShowToast(true)
    const timer = setTimeout(() => setShowToast(false), 3200)
    return () => clearTimeout(timer)
  }, [kodamaMode])

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[110] flex flex-col items-center justify-start pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl"
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: randomBetween(-180, 180),
                  y: randomBetween(60, 220),
                  rotate: randomBetween(-180, 180),
                  opacity: 0,
                }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
              >
                🌰
              </motion.span>
            ))}
          </div>
          <p className="rounded-full bg-ghibli-leaf/90 px-6 py-3 font-handwritten text-3xl text-white shadow-lg">
            Kodama Mode activated! *rattle rattle*
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
