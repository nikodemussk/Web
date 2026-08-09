import { useState } from 'react'
import { motion } from 'framer-motion'

interface NavItem {
  id: string
  label: string
  whimsical: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home', whimsical: 'The Beginning' },
  { id: 'bio', label: 'About', whimsical: 'The Forest' },
  { id: 'playground', label: 'Chaos', whimsical: 'Do Not Press' },
  { id: 'sprites', label: 'Sprites', whimsical: 'Soot & Co.' },
  { id: 'footer', label: 'Contact', whimsical: 'The Exit' },
]

function NavPill({ item, index }: { item: NavItem; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="shatter-piece relative overflow-hidden rounded-full bg-white/70 px-4 py-2 text-sm font-display font-600 text-stone-700 shadow-sm backdrop-blur-sm transition hover:shadow-md"
      style={{ animation: `float ${5 + index * 0.4}s ease-in-out infinite`, animationDelay: `${index * 0.3}s` }}
      whileTap={{ scale: 0.92 }}
    >
      <span className="grid">
        <span
          className="col-start-1 row-start-1 transition-all duration-200"
          style={{ opacity: hovered ? 0 : 1, transform: hovered ? 'translateY(-6px)' : 'translateY(0)' }}
        >
          {item.label}
        </span>
        <span
          className="col-start-1 row-start-1 whitespace-nowrap transition-all duration-200"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(6px)' }}
        >
          {item.whimsical}
        </span>
      </span>
    </motion.button>
  )
}

/** A "Catbus destination sign" style nav: pills drifting gently, labels swap to whimsical alt-text on hover. */
export default function FloatingNav() {
  return (
    <nav className="fixed inset-x-0 top-3 z-30 flex flex-wrap justify-center gap-2 px-3 sm:gap-3">
      {NAV_ITEMS.map((item, i) => (
        <NavPill key={item.id} item={item} index={i} />
      ))}
    </nav>
  )
}
