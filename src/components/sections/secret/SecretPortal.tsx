import { useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'
import LaputaScene from './LaputaScene'
import { LeafIcon } from '../../icons/SocialIcons'

/**
 * A single unassuming leaf, easy to miss, that opens a secret floating-island scene.
 * Rendered through a portal so its "position: fixed" overlay isn't accidentally
 * scoped by an ancestor's backdrop-blur (which, like `filter`, creates a new
 * containing block for fixed descendants).
 */
export default function SecretPortal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="A single leaf. Probably nothing."
        className="text-stone-400 opacity-60 transition hover:text-ghibli-leaf hover:opacity-100"
      >
        <LeafIcon className="h-4 w-4" />
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <div className="fixed inset-0 z-[120]">
              <LaputaScene />
              <button
                onClick={() => setOpen(false)}
                className="fixed right-6 top-6 z-[130] rounded-full bg-white/80 px-4 py-2 font-display text-sm shadow-lg backdrop-blur-sm"
              >
                ✕ back to reality
              </button>
            </div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
