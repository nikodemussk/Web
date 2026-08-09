import { useEffect } from 'react'
import { useSiteState } from '../../state/SiteStateContext'
import { useKonamiCode } from '../../hooks/useKonamiCode'
import { startVibeShiftJingle, stopVibeShiftJingle, playKodamaPop } from '../../utils/sound'

/** Applies/removes the document-level classes and sounds behind each toggle. Renders nothing. */
export default function GlobalModeEffects() {
  const { vibeShift, chaosMode, kodamaMode, activateKodamaMode } = useSiteState()

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('vibe-shift', vibeShift)
    if (vibeShift) {
      startVibeShiftJingle()
    } else {
      stopVibeShiftJingle()
    }
    return () => stopVibeShiftJingle()
  }, [vibeShift])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('chaos-gravity', 'chaos-giant-font')
    if (chaosMode === 'gravity') root.classList.add('chaos-gravity')
    if (chaosMode === 'giant-font') root.classList.add('chaos-giant-font')
  }, [chaosMode])

  useEffect(() => {
    document.documentElement.classList.toggle('kodama-mode', kodamaMode)
    if (kodamaMode) playKodamaPop()
  }, [kodamaMode])

  useKonamiCode(activateKodamaMode)

  return null
}
