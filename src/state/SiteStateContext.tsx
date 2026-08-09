import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { ChaosMode } from '../types'

const TOTAL_SOOT_SPRITES = 6

interface SiteState {
  isDeflated: boolean
  triggerDeflate: () => void
  resetDeflate: () => void
  vibeShift: boolean
  toggleVibeShift: () => void
  chaosMode: ChaosMode
  cycleChaosMode: () => void
  kodamaMode: boolean
  activateKodamaMode: () => void
  capturedSprites: number
  totalSprites: number
  captureSprite: () => void
}

const SiteStateContext = createContext<SiteState | null>(null)

export function SiteStateProvider({ children }: { children: ReactNode }) {
  const [isDeflated, setIsDeflated] = useState(false)
  const [vibeShift, setVibeShift] = useState(false)
  const [chaosMode, setChaosMode] = useState<ChaosMode>('none')
  const [kodamaMode, setKodamaMode] = useState(false)
  const [capturedSprites, setCapturedSprites] = useState(0)

  const triggerDeflate = useCallback(() => setIsDeflated(true), [])
  const resetDeflate = useCallback(() => setIsDeflated(false), [])
  const toggleVibeShift = useCallback(() => setVibeShift((v) => !v), [])

  const cycleChaosMode = useCallback(() => {
    setChaosMode((mode) => {
      if (mode === 'none') return 'gravity'
      if (mode === 'gravity') return 'giant-font'
      if (mode === 'giant-font') return 'silly-faces'
      return 'none'
    })
  }, [])

  const activateKodamaMode = useCallback(() => setKodamaMode((v) => !v), [])
  const captureSprite = useCallback(() => {
    setCapturedSprites((c) => Math.min(c + 1, TOTAL_SOOT_SPRITES))
  }, [])

  const value = useMemo<SiteState>(
    () => ({
      isDeflated,
      triggerDeflate,
      resetDeflate,
      vibeShift,
      toggleVibeShift,
      chaosMode,
      cycleChaosMode,
      kodamaMode,
      activateKodamaMode,
      capturedSprites,
      totalSprites: TOTAL_SOOT_SPRITES,
      captureSprite,
    }),
    [
      isDeflated,
      triggerDeflate,
      resetDeflate,
      vibeShift,
      toggleVibeShift,
      chaosMode,
      cycleChaosMode,
      kodamaMode,
      activateKodamaMode,
      capturedSprites,
      captureSprite,
    ],
  )

  return <SiteStateContext.Provider value={value}>{children}</SiteStateContext.Provider>
}

export function useSiteState() {
  const ctx = useContext(SiteStateContext)
  if (!ctx) throw new Error('useSiteState must be used within a SiteStateProvider')
  return ctx
}
