import React from 'react'
import { Layout, Image, MapPin, Calendar, FileText, HelpCircle, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'

/**
 * Information Architecture Diagram for Listing Detail Page
 * Shows the structural layout and information hierarchy
 */
export default function InformationArchitectureDiagram() {
  return (
    <div className="space-y-6 p-6 bg-stone-50 dark:bg-stone-950 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            Listing Detail Information Architecture
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Structural layout and information hierarchy
          </p>
        </div>

        {/* IA Diagram */}
        <Card className="p-6 border-2 border-dashed border-stone-300 dark:border-stone-700">
          <div className="space-y-4">
            {/* Global Header */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Layout className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="font-semibold text-blue-900 dark:text-blue-100">1. Global Header</h2>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm text-blue-700 dark:text-blue-300">
                <div>Logo</div>
                <div className="text-center">Search (centered)</div>
                <div className="text-right">Login</div>
              </div>
            </div>

            {/* Breadcrumbs */}
            <div className="bg-stone-100 dark:bg-stone-800 p-3 rounded-lg border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                <span>2. Breadcrumbs:</span>
                <span className="font-medium">Hjem → Fasiliteter → Møterom 101</span>
              </div>
            </div>

            {/* Hero Section */}
            <div className="bg-stone-100 dark:bg-stone-800 p-4 rounded-lg border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-2 mb-3">
                <Image className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                <h2 className="font-semibold text-stone-900 dark:text-stone-100">3. Hero Section</h2>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-3 bg-stone-200 dark:bg-stone-700 p-8 rounded text-center text-sm text-stone-500 dark:text-stone-400">
                  Primary Image
                </div>
                <div className="space-y-2">
                  <div className="bg-stone-200 dark:bg-stone-700 p-4 rounded text-center text-xs text-stone-500 dark:text-stone-400">
                    Thumb 1
                  </div>
                  <div className="bg-stone-200 dark:bg-stone-700 p-4 rounded text-center text-xs text-stone-500 dark:text-stone-400">
                    Thumb 2
                  </div>
                  <div className="bg-stone-200 dark:bg-stone-700 p-4 rounded text-center text-xs text-stone-500 dark:text-stone-400">
                    Thumb 3
                  </div>
                </div>
              </div>
            </div>

            {/* Listing Header */}
            <div className="bg-stone-100 dark:bg-stone-800 p-4 rounded-lg border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                <h2 className="font-semibold text-stone-900 dark:text-stone-100">4. Listing Header</h2>
              </div>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="text-xs bg-stone-200 dark:bg-stone-700 px-2 py-1 rounded w-fit">Type Badge</div>
                  <div className="text-lg font-bold">Listing Name</div>
                  <div className="text-sm text-stone-600 dark:text-stone-400 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Address
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="text-xs bg-stone-200 dark:bg-stone-700 px-2 py-1 rounded">Like</div>
                  <div className="text-xs bg-stone-200 dark:bg-stone-700 px-2 py-1 rounded">Share</div>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-stone-100 dark:bg-stone-800 p-4 rounded-lg border border-stone-200 dark:border-stone-700">
              <h2 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">5. Section Navigation (Tabs)</h2>
              <div className="flex gap-4 text-sm">
                <div className="px-3 py-1 bg-blue-600 text-white rounded">Oversikt</div>
                <div className="px-3 py-1 bg-stone-200 dark:bg-stone-700 rounded text-stone-600 dark:text-stone-400">
                  Aktivitetskalender
                </div>
                <div className="px-3 py-1 bg-stone-200 dark:bg-stone-700 rounded text-stone-600 dark:text-stone-400">
                  Retningslinjer
                </div>
                <div className="px-3 py-1 bg-stone-200 dark:bg-stone-700 rounded text-stone-600 dark:text-stone-400">
                  FAQ
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-stone-100 dark:bg-stone-800 p-4 rounded-lg border border-stone-200 dark:border-stone-700">
              <h2 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">6. Main Content Area</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-3">
                  <div className="bg-white dark:bg-stone-900 p-3 rounded border border-stone-200 dark:border-stone-700">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-stone-500" />
                      <span className="text-sm font-medium">Tab Content</span>
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
                      <div>• Description</div>
                      <div>• Capacity card</div>
                      <div>• Facilities chips</div>
                      <div>• Additional services</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-stone-900 p-3 rounded border border-stone-200 dark:border-stone-700">
                    <div className="text-xs font-medium mb-2">Sidebar</div>
                    <div className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
                      <div>• Contact</div>
                      <div>• Location</div>
                      <div>• Opening hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Section */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-2 border-green-300 dark:border-green-800">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h2 className="font-semibold text-green-900 dark:text-green-100">7. Booking Section</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <div className="bg-white dark:bg-stone-900 p-3 rounded border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium">Availability Calendar</span>
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400">
                      Calendar grid with time slots
                    </div>
                  </div>
                  <div className="bg-white dark:bg-stone-900 p-2 rounded border border-green-200 dark:border-green-800 text-xs text-stone-600 dark:text-stone-400">
                    Booking process steps: Velg tidspunkter → Detaljer → Bekreft → Sendt
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-white dark:bg-stone-900 p-3 rounded border border-green-200 dark:border-green-800">
                    <div className="text-xs font-medium mb-2">Selected Time Summary</div>
                    <div className="text-xs text-stone-600 dark:text-stone-400">Selected slots</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Information Hierarchy */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
            Information Hierarchy
          </h2>
          <ol className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">1.</span>
              <span>
                <strong>What is this listing?</strong> - Hero image, type badge, name
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">2.</span>
              <span>
                <strong>Where is it?</strong> - Address with location icon
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">3.</span>
              <span>
                <strong>What can I use it for?</strong> - Description, capacity, facilities (Oversikt tab)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">4.</span>
              <span>
                <strong>What rules apply?</strong> - Retningslinjer tab
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">5.</span>
              <span>
                <strong>When is it available?</strong> - Aktivitetskalender tab, Booking section calendar
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">6.</span>
              <span>
                <strong>What happens next?</strong> - Booking process steps, selected time summary
              </span>
            </li>
          </ol>
        </Card>
      </div>
    </div>
  )
}
