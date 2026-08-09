import { motion } from 'framer-motion'

/** A little stack of round, pastel, suspiciously mouse-eared characters. Purely coincidental. */
function StackedBlobs() {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col-reverse items-center" title="definitely not any particular stacked mouse-eared characters">
      {['#ffd166', '#f4a988', '#9fd8a0'].map((color, i) => (
        <svg key={color} width={54 - i * 10} height={54 - i * 10} viewBox="0 0 54 54" className="-mb-3">
          <circle cx="14" cy="10" r="8" fill={color} />
          <circle cx="40" cy="10" r="8" fill={color} />
          <circle cx="27" cy="27" r="22" fill={color} />
          <circle cx="20" cy="24" r="2.4" fill="#1c2541" />
          <circle cx="34" cy="24" r="2.4" fill="#1c2541" />
        </svg>
      ))}
    </div>
  )
}

export default function LaputaScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] overflow-hidden bg-gradient-to-b from-[#7fb8e0] via-[#a9d3ea] to-[#e9f4fb]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className="absolute"
            style={{
              top: `${10 + i * 12}%`,
              animation: `drift ${20 + i * 6}s linear infinite`,
              animationDelay: `${-i * 5}s`,
            }}
            width="90"
            height="10"
            viewBox="0 0 90 10"
          >
            <rect x="0" y="4" width="90" height="2" fill="#2b2b40" opacity="0.5" />
            <rect x="20" y="0" width="6" height="10" fill="#2b2b40" opacity="0.5" />
          </svg>
        ))}
      </div>

      <motion.div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="360" height="260" viewBox="0 0 360 260">
          <path d="M60 140 C40 200 90 230 180 230 C270 230 320 200 300 140 Z" fill="#6b5b45" />
          <path d="M60 140 C90 150 270 150 300 140 C310 100 250 70 180 70 C110 70 50 100 60 140 Z" fill="#6f9d5a" />
          <circle cx="150" cy="60" r="26" fill="#598a4a" />
          <circle cx="190" cy="50" r="30" fill="#6ca458" />
          <rect x="176" y="60" width="8" height="30" fill="#5b432f" />
          <path d="M120 230 C130 245 150 245 155 230" stroke="#a9d3ea" strokeWidth="6" fill="none" />
        </svg>
      </motion.div>

      <StackedBlobs />

      <p className="absolute bottom-6 left-6 max-w-xs font-handwritten text-2xl text-white drop-shadow">
        You found the floating island. There is nothing productive here either.
      </p>
    </motion.div>
  )
}
