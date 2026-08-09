import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons'
import { useSiteState } from '../../state/SiteStateContext'
import SecretPortal from '../sections/secret/SecretPortal'

export default function Footer() {
  const { capturedSprites, totalSprites } = useSiteState()

  return (
    <footer id="footer" className="relative flex flex-col items-center px-6 py-16 text-center">
      <div className="shatter-piece flex flex-col items-center gap-4 rounded-3xl bg-white/75 px-8 py-8 shadow-lg backdrop-blur-sm">
        <div className="flex gap-5">
          <a
            href="https://github.com/nikodemussk"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-stone-700 transition hover:-translate-y-0.5 hover:text-ghibli-leaf"
          >
            <GithubIcon className="h-7 w-7" />
          </a>
          <a
            href="https://www.linkedin.com/in/nikodemusstanley"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-stone-700 transition hover:-translate-y-0.5 hover:text-ghibli-leaf"
          >
            <LinkedinIcon className="h-7 w-7" />
          </a>
        </div>

        <p className="text-sm text-stone-600">
          Sprites captured: {capturedSprites}/{totalSprites} &middot; Built by Nikodemus Kohar, mostly for fun.
        </p>

        <div className="flex items-center gap-2 text-xs text-stone-400">
          <span>psst, try the arrow keys</span>
          <SecretPortal />
        </div>
      </div>
    </footer>
  )
}
