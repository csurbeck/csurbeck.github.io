import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ladybug from '@src/assets/ladybug.svg'
import orangeLadybug from '@src/assets/small-orange-ladybug.svg'
import App from './App'
import './App.css'

const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')

function applyFavicon() {
    let icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!icon) {
        icon = document.createElement('link')
        icon.rel = 'icon'
        document.head.appendChild(icon)
    }
    icon.type = 'image/svg+xml'
    icon.href = colorScheme.matches ? ladybug : orangeLadybug
}

applyFavicon()
colorScheme.addEventListener('change', applyFavicon)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
