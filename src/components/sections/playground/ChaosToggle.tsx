import { useSiteState } from '../../../state/SiteStateContext'

const MODE_LABEL: Record<string, string> = {
  none: 'Off',
  gravity: 'Reversed Gravity',
  'giant-font': 'Creeping Font Size',
  'silly-faces': 'Silly Face Invasion',
}

export default function ChaosToggle() {
  const { chaosMode, cycleChaosMode } = useSiteState()

  return (
    <div className="shatter-piece un-flip flex flex-col items-center gap-3 rounded-3xl bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm">
      <span className="text-3xl">🌀</span>
      <h3 className="font-display text-xl font-700">The Chaos Toggle</h3>
      <p className="text-sm text-stone-600">Mild, harmless inconvenience. Click again to cycle to the next flavor of chaos.</p>
      <button
        onClick={cycleChaosMode}
        className="rounded-full bg-orange-500 px-5 py-2 font-display text-white shadow transition hover:scale-105"
      >
        {MODE_LABEL[chaosMode]}
      </button>
    </div>
  )
}
