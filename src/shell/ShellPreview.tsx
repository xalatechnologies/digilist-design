import { useLocation } from 'react-router-dom'
import { SearchResultsPage } from './pages/SearchResultsPage'
import { MyBookingsPage } from './pages/MyBookingsPage'
import { HelpContactPage } from './pages/HelpContactPage'
import { useEffect } from 'react'

/**
 * Shell Preview for Design OS
 * This component demonstrates the shell layout with all three pages
 * Determines which page to show based on current pathname
 * Already within RouterProvider context, so uses useLocation directly
 */
function ShellPreview() {
  const location = useLocation()

  // Sync route with parent window for iframe navigation
  useEffect(() => {
    if (window.parent !== window) {
      window.parent.postMessage(
        { type: 'shell-route-change', path: location.pathname },
        '*'
      )
    }
  }, [location.pathname])

  // Determine which page to show based on current path
  if (location.pathname === '/my-bookings' || location.pathname.startsWith('/my-bookings')) {
    return <MyBookingsPage />
  }
  
  if (location.pathname === '/help' || location.pathname.startsWith('/help')) {
    return <HelpContactPage />
  }
  
  // Default to search/results page (for /, /search, /shell/design/fullscreen, etc.)
  return <SearchResultsPage />
}

// Default export for React.lazy
export default ShellPreview
