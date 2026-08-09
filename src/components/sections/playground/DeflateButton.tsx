import { useSiteState } from '../../../state/SiteStateContext'

export default function DeflateButton() {
  const { isDeflated, triggerDeflate } = useSiteState()

  return (
    <div className="shatter-piece flex flex-col items-center gap-3 rounded-3xl bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm">
      <span className="text-3xl">🧨</span>
      <h3 className="font-display text-xl font-700">The Deflate Button</h3>
      <p className="text-sm text-stone-600">A real physics engine lives behind this button. Use responsibly. (You won&apos;t.)</p>
      <button
        onClick={triggerDeflate}
        disabled={isDeflated}
        className="rounded-full bg-stone-900 px-5 py-2 font-display text-white shadow transition hover:scale-105 disabled:opacity-40"
      >
        Do Not Press
      </button>
    </div>
  )
}
