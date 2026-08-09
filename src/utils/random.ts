export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function randomInt(min: number, max: number): number {
  return Math.floor(randomBetween(min, max + 1))
}

export function pickRandom<T>(items: readonly T[]): T {
  return items[randomInt(0, items.length - 1)]
}

export function makeId(): string {
  return Math.random().toString(36).slice(2, 10)
}
