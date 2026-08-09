import DeflateButton from './DeflateButton'
import VibeShiftButton from './VibeShiftButton'
import ChaosToggle from './ChaosToggle'
import ReceiptPrinter from './ReceiptPrinter'

export default function Playground() {
  return (
    <section id="playground" className="relative px-6 py-24">
      <div className="shatter-piece mx-auto max-w-4xl rounded-3xl bg-white/75 px-6 py-8 text-center shadow-lg backdrop-blur-sm">
        <h2 className="font-display text-4xl font-700 text-stone-900 sm:text-5xl">
          The Useless Button (and Other Absurd Mechanics)
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-stone-700">
          You have the power of modern JavaScript at your fingertips. Naturally, it has been used
          for this instead of anything productive.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
        <DeflateButton />
        <VibeShiftButton />
        <ChaosToggle />
        <ReceiptPrinter />
      </div>
    </section>
  )
}
