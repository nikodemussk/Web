import { motion } from 'framer-motion'
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons'
import MagneticDoodles from '../effects/MagneticDoodles'

const NAME_WORDS = 'Nikodemus Kohar'.split(' ')

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <MagneticDoodles />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 0.6 }}
        className="flex gap-4 rounded-full bg-white/60 px-4 py-2 backdrop-blur-sm shadow-sm"
      >
        <a
          href="https://github.com/nikodemussk"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="shatter-piece text-stone-700 transition hover:-translate-y-0.5 hover:text-ghibli-leaf"
        >
          <GithubIcon className="h-6 w-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/nikodemusstanley"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="shatter-piece text-stone-700 transition hover:-translate-y-0.5 hover:text-ghibli-leaf"
        >
          <LinkedinIcon className="h-6 w-6" />
        </a>
      </motion.div>

      <h1 className="mt-8 flex flex-wrap justify-center gap-x-4 font-display text-5xl font-700 text-stone-900 drop-shadow-sm sm:text-7xl md:text-8xl">
        {NAME_WORDS.map((word, wordIndex) => {
          const priorLetters = NAME_WORDS.slice(0, wordIndex).join('').length
          return (
            <span key={word} className="inline-flex whitespace-nowrap">
              {word.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="shatter-piece inline-block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4 + (priorLetters + i) * 0.03, duration: 0.5, ease: 'easeOut' }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          )
        })}
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.6 }}
        className="shatter-piece mt-4 max-w-xl font-body text-lg text-stone-700 sm:text-xl"
      >
        Journey to new frontiers. Journey to a website that does absolutely nothing productive
        &mdash; on purpose.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.6 }}
        className="mt-10 flex flex-col items-center gap-2"
      >
        <button
          onClick={() => scrollToId('bio')}
          className="shatter-piece rounded-full bg-ghibli-leaf px-6 py-3 font-display text-white shadow-md transition hover:scale-105 hover:shadow-lg active:scale-95"
        >
          Start the journey →
        </button>
        <span className="animate-float text-2xl" aria-hidden="true">
          🍃
        </span>
      </motion.div>
    </section>
  )
}
