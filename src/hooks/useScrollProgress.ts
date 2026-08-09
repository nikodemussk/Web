import { useEffect, useRef, useState } from 'react'

interface ScrollProgress {
  /** 0 (top) to 1 (bottom) of the whole document */
  progress: number
  /** rough scroll speed in px/frame, used to trigger "wind gust" effects */
  gust: number
}

export function useScrollProgress(): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({ progress: 0, gust: 0 })
  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    lastY.current = window.scrollY

    function onScroll() {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const y = window.scrollY
        const max = document.documentElement.scrollHeight - window.innerHeight
        const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
        const gust = Math.min(40, Math.abs(y - lastY.current))
        lastY.current = y
        setState({ progress, gust })
        ticking.current = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return state
}
