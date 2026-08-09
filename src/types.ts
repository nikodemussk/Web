export type ChaosMode = 'none' | 'gravity' | 'giant-font' | 'silly-faces'

export interface SootSpriteData {
  id: string
  top: number
  left: number
  captured: boolean
}

export interface ReceiptLine {
  label: string
  value: string
}
