export function printConsoleEasterEgg(): void {
  const art = `
   /\\_/\\
  ( o.o )   psst. you found the console.
   > ^ <    since you're here: hi, I'm Nikodemus.
            try the Konami code somewhere on this page.
`
  console.log('%c' + art, 'color:#5b8c5a;font-family:monospace;font-size:12px;')
  console.log(
    '%cLooking for a job to do this instead of me? github.com/nikodemussk',
    'color:#6b4a3a;font-size:12px;',
  )
}
