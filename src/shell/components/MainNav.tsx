import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Calendar, HelpCircle } from 'lucide-react'

interface MainNavProps {
  onNavigate?: () => void
}

export function MainNav({ onNavigate }: MainNavProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname.startsWith('/search')
    }
    return location.pathname.startsWith(path)
  }

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'My Bookings', path: '/my-bookings', icon: Calendar },
    { label: 'Help / Contact', path: '/help', icon: HelpCircle },
  ]

  const handleClick = (path: string) => {
    navigate(path)
    onNavigate?.()
  }

  return (
    <nav className="flex items-center gap-1" aria-label="Main navigation">
      {navItems.map((item) => {
        const Icon = item.icon
        const active = isActive(item.path)
        return (
          <button
            key={item.path}
            onClick={() => handleClick(item.path)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2 ${
              active
                ? 'text-[#33649E] border-b-2 border-[#33649E]'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
            aria-current={active ? 'page' : undefined}
          >
            <Icon className="w-4 h-4" strokeWidth={1.5} />
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
