import type { ReceiptLine } from '../types'
import { pickRandom, randomInt } from './random'

const ITEM_POOL: ReceiptLine[] = [
  { label: '1x Good Vibe', value: 'FREE' },
  { label: '1x Unsolicited Opinion', value: '$0.00' },
  { label: '1x Existential Shrug', value: '$0.00' },
  { label: '1x Petal (borrowed, not returned)', value: '$0.00' },
  { label: '1x Dad Joke, pre-loaded', value: '$0.00' },
  { label: '1x Scroll-induced Motion Sickness', value: 'N/C' },
  { label: '1x Sense of Accomplishment', value: 'EXPIRED' },
  { label: '1x Nostalgia (Y2K flavor)', value: 'IF FOUND' },
  { label: '1x Soot Sprite Sighting', value: 'MAYBE' },
]

const FORTUNES = [
  'You will close 14 browser tabs today and open 20 more.',
  'A bug you cannot reproduce will fix itself. Do not ask why.',
  'Somewhere, a rubber duck is listening.',
  'Your next commit message will just say "fix".',
  'The wifi will hold. Mostly.',
  'You will find the semicolon. It was never missing.',
]

export function generateReceiptLines(): ReceiptLine[] {
  const count = randomInt(3, 5)
  const items = new Set<ReceiptLine>()
  while (items.size < count) {
    items.add(pickRandom(ITEM_POOL))
  }
  return Array.from(items)
}

export function generateFortune(): string {
  return pickRandom(FORTUNES)
}

export function formatVisitDuration(ms: number): string {
  const seconds = Math.max(1, Math.round(ms / 1000))
  return `${seconds}s`
}
