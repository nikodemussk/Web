import { useState } from 'react'
import { useTypewriter } from '../../hooks/useTypewriter'

interface StoryOption {
  label: string
  next: string
}

interface StoryNode {
  id: string
  text: string
  options: StoryOption[]
}

const STORY: Record<string, StoryNode> = {
  start: {
    id: 'start',
    text: 'A wild NIKODEMUS KOHAR appears. He looks uncaffeinated and is muttering at a bug that, statistically, is probably a typo. What do you do?',
    options: [
      { label: 'A) Offer an iced latte', next: 'latte' },
      { label: 'B) Ask what music he is playing', next: 'music' },
      { label: 'C) Slowly back away', next: 'backaway' },
    ],
  },
  latte: {
    id: 'latte',
    text: "CRITICAL HIT! Nikodemus accepts the latte and becomes 40% more coherent. He rambles for a while about his 500-hour Stardew Valley save file and a farm cat named Mochi. (Skill unlocked: Caffeine Whisperer)",
    options: [
      { label: 'Ask about the farm cat', next: 'cat' },
      { label: 'Restart', next: 'start' },
    ],
  },
  music: {
    id: 'music',
    text: "His eyes light up. He plays something with far too much bass for this hour. You nod along, understanding roughly 30% of the reference. (Skill unlocked: Polite Nodding)",
    options: [
      { label: 'Ask for the playlist', next: 'playlist' },
      { label: 'Restart', next: 'start' },
    ],
  },
  backaway: {
    id: 'backaway',
    text: 'Wise choice. Nikodemus continues negotiating with his rubber duck in peace. You have avoided a 45-minute tangent. (Skill unlocked: Situational Awareness)',
    options: [{ label: 'Restart', next: 'start' }],
  },
  cat: {
    id: 'cat',
    text: 'Mochi the cat has, as far as anyone can verify, never appeared in this codebase, this bio, or reality. Nikodemus insists otherwise. You have reached the edge of provable fact.\n\nTHE END.',
    options: [{ label: 'Restart', next: 'start' }],
  },
  playlist: {
    id: 'playlist',
    text: 'The playlist is 74 songs long and titled "good vibes (definitely finished)". It is not finished. It will never be finished.\n\nTHE END.',
    options: [{ label: 'Restart', next: 'start' }],
  },
}

export default function RetroTerminalBio() {
  const [nodeId, setNodeId] = useState('start')
  const node = STORY[nodeId]
  const { displayed, done } = useTypewriter(node.text, 14)

  return (
    <section id="bio" className="relative flex min-h-screen items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl border-4 border-stone-800 bg-black shadow-2xl">
        <div className="flex items-center gap-2 bg-stone-800 px-3 py-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span className="ml-2 font-terminal text-sm text-stone-300">
            C:\NIKODEMUS&gt;encounter.exe
          </span>
        </div>
        <div className="crt-scanlines relative min-h-[320px] whitespace-pre-wrap p-6 font-terminal text-xl leading-relaxed text-green-400">
          <p>
            {displayed}
            {!done && <span className="animate-blink">▮</span>}
          </p>

          {done && (
            <div className="mt-6 flex flex-col items-start gap-2">
              {node.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => setNodeId(option.next)}
                  className="text-left text-green-300 underline decoration-dotted underline-offset-4 transition hover:text-white"
                >
                  &gt; {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
