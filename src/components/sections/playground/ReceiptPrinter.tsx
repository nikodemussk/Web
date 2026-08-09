import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateFortune, generateReceiptLines, formatVisitDuration } from '../../../utils/receipt'
import type { ReceiptLine } from '../../../types'
import { playPrinterClick } from '../../../utils/sound'

const pageLoadTime = performance.now()

export default function ReceiptPrinter() {
  const [lines, setLines] = useState<ReceiptLine[] | null>(null)
  const [fortune, setFortune] = useState('')
  const [duration, setDuration] = useState('')
  const printCount = useRef(0)

  function handlePrint() {
    printCount.current += 1
    playPrinterClick()
    setLines(generateReceiptLines())
    setFortune(generateFortune())
    setDuration(formatVisitDuration(performance.now() - pageLoadTime))
  }

  return (
    <div className="shatter-piece flex flex-col items-center gap-3 rounded-3xl bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm">
      <span className="text-3xl">🧾</span>
      <h3 className="font-display text-xl font-700">The Receipt Printer</h3>
      <p className="text-sm text-stone-600">Prints an entirely accurate summary of your visit so far.</p>
      <button
        onClick={handlePrint}
        className="rounded-full bg-stone-700 px-5 py-2 font-display text-white shadow transition hover:scale-105"
      >
        Print Receipt
      </button>

      <AnimatePresence>
        {lines && (
          <motion.div
            key={printCount.current}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-xs overflow-hidden"
          >
            <div className="mt-2 w-full rounded-sm bg-white p-4 text-left font-terminal text-lg text-stone-800 shadow-inner">
              <p className="text-center text-base font-bold tracking-widest">NIKODEMUS.SITE</p>
              <p className="text-center text-sm">visitor receipt — no refunds</p>
              <div className="my-2 border-t border-dashed border-stone-400" />
              {lines.map((line) => (
                <div key={line.label} className="flex justify-between text-sm">
                  <span>{line.label}</span>
                  <span>{line.value}</span>
                </div>
              ))}
              <div className="my-2 border-t border-dashed border-stone-400" />
              <div className="flex justify-between text-sm">
                <span>Time wasted here</span>
                <span>{duration}</span>
              </div>
              <p className="mt-3 text-sm italic">Fortune: {fortune}</p>
              <div
                className="mt-3 h-6 w-full"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, #1c1917 0 2px, transparent 2px 5px)',
                }}
                aria-hidden="true"
              />
              <p className="mt-2 text-center text-xs">THANK YOU FOR VISITING. COME BACK NEVER... OR SOON.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
