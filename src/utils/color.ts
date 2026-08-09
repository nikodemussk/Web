function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const num = parseInt(clean, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export interface ColorStop {
  at: number
  color: string
}

/** Blends across a list of hex color stops (0..1) for a given progress value. */
export function sampleGradientStops(stops: ColorStop[], progress: number): string {
  const p = Math.min(1, Math.max(0, progress))
  let lower = stops[0]
  let upper = stops[stops.length - 1]

  for (let i = 0; i < stops.length - 1; i++) {
    if (p >= stops[i].at && p <= stops[i + 1].at) {
      lower = stops[i]
      upper = stops[i + 1]
      break
    }
  }

  const span = upper.at - lower.at || 1
  const localT = (p - lower.at) / span
  const [r1, g1, b1] = hexToRgb(lower.color)
  const [r2, g2, b2] = hexToRgb(upper.color)
  const r = Math.round(lerp(r1, r2, localT))
  const g = Math.round(lerp(g1, g2, localT))
  const b = Math.round(lerp(b1, b2, localT))
  return `rgb(${r}, ${g}, ${b})`
}
