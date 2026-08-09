import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SiteStateProvider } from './state/SiteStateContext.tsx'
import { printConsoleEasterEgg } from './utils/consoleArt.ts'

printConsoleEasterEgg()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteStateProvider>
      <App />
    </SiteStateProvider>
  </StrictMode>,
)
