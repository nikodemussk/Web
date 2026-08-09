import { useEffect, useState } from 'react'

export function useTypewriter(text: string, speedMs = 18): { displayed: string; done: boolean } {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, speedMs)
    return () => clearInterval(interval)
  }, [text, speedMs])

  return { displayed, done: displayed.length === text.length }
}
