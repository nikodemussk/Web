import { useSiteState } from '../../../state/SiteStateContext'

export default function VibeShiftButton() {
  const { vibeShift, toggleVibeShift } = useSiteState()

  return (
    <div className="shatter-piece flex flex-col items-center gap-3 rounded-3xl bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm">
      <span className="text-3xl">💿</span>
      <h3 className="font-display text-xl font-700">The Vibe Shift</h3>
      <p className="text-sm text-stone-600">One click completely derails the aesthetic. There is no undo button. There is only this button, again.</p>
      <button
        onClick={toggleVibeShift}
        className="rounded-full bg-fuchsia-600 px-5 py-2 font-display text-white shadow transition hover:scale-105"
      >
        {vibeShift ? 'Make It Stop' : 'Shift The Vibe'}
      </button>
    </div>
  )
}
