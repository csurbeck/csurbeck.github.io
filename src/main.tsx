import { initAll } from '@amplitude/unified'
import { StrictMode } from 'react'
import { trackSiteVisited } from './analytics'
import { createRoot } from 'react-dom/client'
import whiteLadybug from '@src/assets/ladybug.svg'
import orangeLadybug from '@src/assets/small-orange-ladybug.svg'
import App from './App'
import './App.css'

const amplitudeKey = process.env.AMPLITUDE_API_KEY
if (!amplitudeKey) {
    console.error('[amplitude] AMPLITUDE_API_KEY is not set — no events will be sent')
} else {
    void initAll(amplitudeKey, { // key is the positional first argument — an options-object-only call silently no-ops
        serverZone: 'US',
        analytics: { autocapture: true },
        sessionReplay: { sampleRate: 1 },
    }).then(() => {
        trackSiteVisited()
    })
}

const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')

function applyFavicon() {
    let icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!icon) {
        icon = document.createElement('link')
        icon.rel = 'icon'
        document.head.appendChild(icon)
    }
    icon.type = 'image/svg+xml'
    icon.href = colorScheme.matches ? whiteLadybug : orangeLadybug
}

applyFavicon()
colorScheme.addEventListener('change', applyFavicon)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
