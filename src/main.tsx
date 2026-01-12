import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from '@/lib/router'

// Initialize theme on load (before React renders)
const initializeTheme = () => {
  const theme = localStorage.getItem('theme') || 'system'
  const root = document.documentElement

  let isDark = false
  if (theme === 'system') {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  } else {
    isDark = theme === 'dark'
  }
  
  // Tailwind dark mode
  root.classList.toggle('dark', isDark)
  
  // designsystemet.no dark mode
  root.setAttribute('data-theme', isDark ? 'dark' : 'light')
}

initializeTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
