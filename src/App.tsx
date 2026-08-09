import SkyBackdrop from './components/layout/SkyBackdrop'
import FloatingNav from './components/layout/FloatingNav'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import RetroTerminalBio from './components/sections/RetroTerminalBio'
import Playground from './components/sections/playground/Playground'
import SootSpriteField from './components/sections/sootsprites/SootSpriteField'
import PetalFall from './components/effects/PetalFall'
import CursorSparkleTrail from './components/effects/CursorSparkleTrail'
import SpiritTreeLoader from './components/effects/SpiritTreeLoader'
import GlobalModeEffects from './components/effects/GlobalModeEffects'
import VibeShiftOverlay from './components/effects/VibeShiftOverlay'
import ChaosSillyFacesOverlay from './components/effects/ChaosSillyFacesOverlay'
import KodamaCelebration from './components/effects/KodamaCelebration'
import DeflateEngine from './components/effects/DeflateEngine'

export default function App() {
  return (
    <>
      <SpiritTreeLoader />
      <GlobalModeEffects />
      <SkyBackdrop />
      <PetalFall />
      <CursorSparkleTrail />
      <FloatingNav />
      <VibeShiftOverlay />
      <ChaosSillyFacesOverlay />
      <KodamaCelebration />
      <DeflateEngine />

      <main className="relative">
        <Hero />
        <RetroTerminalBio />
        <Playground />
        <SootSpriteField />
        <Footer />
      </main>
    </>
  )
}
