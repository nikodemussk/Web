import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VISIBLE_DURATION_MS = 2100

export default function SpiritTreeLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), VISIBLE_DURATION_MS)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ghibli-night"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          role="status"
          aria-label="Loading"
        >
          <svg width="140" height="180" viewBox="0 0 140 180">
            <motion.path
              d="M70 170 C70 130 70 110 70 90"
              stroke="#8a6a4f"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
            <motion.path
              d="M70 120 C50 110 40 95 35 80 M70 110 C90 100 100 85 105 70"
              stroke="#8a6a4f"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
            />
            <motion.circle
              cx="70"
              cy="65"
              r="46"
              fill="#9fd8a0"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.95 }}
              transition={{ type: 'spring', stiffness: 120, damping: 10, delay: 1.1 }}
              className="animate-pulseGlow"
              style={{ transformOrigin: '70px 65px' }}
            />
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: [0, -8, 8, -4, 0] }}
              transition={{ delay: 1.5, duration: 0.7 }}
              style={{ transformOrigin: '70px 155px' }}
            >
              <circle cx="70" cy="155" r="12" fill="#f5f5f5" />
              <circle cx="66" cy="154" r="1.6" fill="#1c2541" />
              <circle cx="74" cy="154" r="1.6" fill="#1c2541" />
            </motion.g>
          </svg>
          <motion.p
            className="mt-4 font-handwritten text-2xl text-ghibli-cream"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
          >
            growing something fun...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
