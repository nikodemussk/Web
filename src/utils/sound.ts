let sharedContext: AudioContext | null = null

function getContext(): AudioContext {
  if (!sharedContext) {
    sharedContext = new AudioContext()
  }
  if (sharedContext.state === 'suspended') {
    void sharedContext.resume()
  }
  return sharedContext
}

function playTone(freq: number, startTime: number, duration: number, ctx: AudioContext, gain = 0.05) {
  const osc = ctx.createOscillator()
  const amp = ctx.createGain()
  osc.type = 'square'
  osc.frequency.value = freq
  amp.gain.setValueAtTime(gain, startTime)
  amp.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)
  osc.connect(amp)
  amp.connect(ctx.destination)
  osc.start(startTime)
  osc.stop(startTime + duration)
}

/** A cheesy, entirely original 8-bit tune for Vibe Shift mode (not a cover of anything). */
const CHEESY_MELODY = [523, 659, 784, 659, 523, 659, 784, 988, 880, 784, 659, 784]

let vibeShiftInterval: ReturnType<typeof setInterval> | null = null

export function startVibeShiftJingle(): void {
  const ctx = getContext()
  const noteDuration = 0.22

  function playLoop() {
    const now = ctx.currentTime
    CHEESY_MELODY.forEach((freq, i) => {
      playTone(freq, now + i * noteDuration, noteDuration * 0.9, ctx, 0.04)
    })
  }

  playLoop()
  vibeShiftInterval = setInterval(playLoop, CHEESY_MELODY.length * noteDuration * 1000)
}

export function stopVibeShiftJingle(): void {
  if (vibeShiftInterval) {
    clearInterval(vibeShiftInterval)
    vibeShiftInterval = null
  }
}

export function playPrinterClick(): void {
  const ctx = getContext()
  const bufferSize = ctx.sampleRate * 0.03
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.3
  }
  const noise = ctx.createBufferSource()
  noise.buffer = buffer
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.25, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)
  noise.connect(gain)
  gain.connect(ctx.destination)
  noise.start()
}

export function playSproutCapture(): void {
  const ctx = getContext()
  const now = ctx.currentTime
  playTone(660, now, 0.1, ctx, 0.06)
  playTone(880, now + 0.08, 0.15, ctx, 0.06)
}

export function playKodamaPop(): void {
  const ctx = getContext()
  const now = ctx.currentTime
  playTone(300, now, 0.08, ctx, 0.05)
  playTone(500, now + 0.06, 0.08, ctx, 0.05)
  playTone(700, now + 0.12, 0.12, ctx, 0.05)
}
