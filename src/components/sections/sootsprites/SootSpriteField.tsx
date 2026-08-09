import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SootSprite from './SootSprite'
import { useSiteState } from '../../../state/SiteStateContext'
import { randomBetween } from '../../../utils/random'

export default function SootSpriteField() {
  const { capturedSprites, totalSprites } = useSiteState()
  const positions = useMemo(
    () =>
      Array.from({ length: totalSprites }, () => ({
        top: randomBetween(6, 88),
        left: randomBetween(4, 90),
      })),
    [totalSprites],
  )
  const allCaptured = capturedSprites >= totalSprites

  return (
    <section id="sprites" className="relative overflow-hidden px-6 py-24">
      <div className="shatter-piece mx-auto max-w-2xl rounded-3xl bg-white/75 px-6 py-8 text-center shadow-lg backdrop-blur-sm">
        <h2 className="font-display text-4xl font-700 text-stone-900 sm:text-5xl">Soot Sprites Are Hiding</h2>
        <p className="mx-auto mt-4 text-stone-700">
          They scamper if you hover too long. Click fast. Sprites captured:{' '}
          <span className="font-700">
            {capturedSprites}/{totalSprites}
          </span>
        </p>
      </div>

      <div className="relative mx-auto mt-10 h-[50vh] max-w-4xl">
        {positions.map((pos, i) => (
          <SootSprite key={i} initialTop={pos.top} initialLeft={pos.left} />
        ))}

        <AnimatePresence>
          {allCaptured && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <p className="rounded-full bg-white/90 px-6 py-3 font-handwritten text-2xl text-ghibli-leaf shadow-lg">
                🌿 All sprites captured! They&apos;ll be back once you reload, don&apos;t worry. 🌿
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
