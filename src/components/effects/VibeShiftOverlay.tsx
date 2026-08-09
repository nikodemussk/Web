import { useSiteState } from '../../state/SiteStateContext'

const DANCERS = ['🕺', '💃', '👾', '🐸', '⭐', '💾']

export default function VibeShiftOverlay() {
  const { vibeShift } = useSiteState()

  if (!vibeShift) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[80]">
      <div className="overflow-hidden border-y-4 border-dashed border-yellow-300 bg-black/80 py-2">
        <p className="vibe-marquee whitespace-nowrap font-pixel text-sm text-yellow-300">
          🌟 UNDER CONSTRUCTION 🌟 BEST VIEWED AT 800x600 🌟 SIGN MY GUESTBOOK 🌟 YOU ARE VISITOR NUMBER 000042 🌟
          NOW WITH 100% MORE MIDI 🌟
        </p>
      </div>
      <div className="flex justify-center gap-6 bg-cyan-300/70 py-3 text-4xl">
        {DANCERS.map((emoji, i) => (
          <span
            key={i}
            className="animate-wiggle inline-block"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  )
}
