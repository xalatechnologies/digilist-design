import type { ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Home, Calendar, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'

interface AppShellProps {
  children?: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 flex flex-col">
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#33649E] focus:text-white focus:rounded-md focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
      >
        Skip to content
      </a>

      {/* Header */}
      <header className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-stone-900 dark:text-stone-100 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="DigiList Home"
            >
              <span className="text-xl font-bold text-[#33649E]">DigiList</span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path)
                      setMobileMenuOpen(false)
                    }}
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

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" strokeWidth={1.5} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col gap-2 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.path)
                    return (
                      <button
                        key={item.path}
                        onClick={() => {
                          navigate(item.path)
                          setMobileMenuOpen(false)
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2 ${
                          active
                            ? 'bg-[#E6EEF7] text-[#33649E] border-l-4 border-[#33649E]'
                            : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                        <span>{item.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">
                Contact
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Municipality Contact Information
              </p>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/privacy"
                    className="text-sm text-stone-600 dark:text-stone-400 hover:text-[#33649E] dark:hover:text-[#33649E] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2 rounded"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-sm text-stone-600 dark:text-stone-400 hover:text-[#33649E] dark:hover:text-[#33649E] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2 rounded"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/accessibility"
                    className="text-sm text-stone-600 dark:text-stone-400 hover:text-[#33649E] dark:hover:text-[#33649E] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2 rounded"
                  >
                    Accessibility Statement
                  </a>
                </li>
              </ul>
            </div>

            {/* Help / Report Issue */}
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">
                Help
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/help"
                    className="text-sm text-stone-600 dark:text-stone-400 hover:text-[#33649E] dark:hover:text-[#33649E] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2 rounded"
                  >
                    Help & Support
                  </a>
                </li>
                <li>
                  <a
                    href="/report-issue"
                    className="text-sm text-stone-600 dark:text-stone-400 hover:text-[#33649E] dark:hover:text-[#33649E] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2 rounded"
                  >
                    Report an Issue
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
