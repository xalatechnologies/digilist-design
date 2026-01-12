import { AppShell } from '@/shell/components/AppShell'

/**
 * Information Architecture Diagram
 * 
 * This is a simple visual representation of the IA structure,
 * not a pixel-perfect UI design. Focus is on structure and navigation.
 */
export default function InformationArchitectureDiagram() {
  return (
    <AppShell>
      <div className="space-y-8 py-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Public Information Architecture
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Structure and navigation flow for DigiList public booking experience
          </p>
        </div>

        {/* IA Diagram */}
        <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-6 bg-white dark:bg-stone-900">
          <div className="space-y-6">
            {/* Header */}
            <div className="border-b border-stone-200 dark:border-stone-700 pb-4">
              <div className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                HEADER
              </div>
              <div className="flex items-center gap-4 text-sm text-stone-600 dark:text-stone-400">
                <span>[Logo]</span>
                <span>[Home]</span>
                <span>[My Bookings]</span>
                <span>[Help]</span>
              </div>
            </div>

            {/* Search/Results */}
            <div className="border border-stone-200 dark:border-stone-700 rounded p-4 bg-stone-50 dark:bg-stone-800">
              <div className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
                SEARCH / RESULTS
              </div>
              <div className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
                <div>[Search Bar] [Filters]</div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="border border-stone-300 dark:border-stone-600 rounded p-2">
                    <div className="text-xs">Listing Card 1</div>
                    <div className="text-xs text-stone-500">[View Details] →</div>
                  </div>
                  <div className="border border-stone-300 dark:border-stone-600 rounded p-2">
                    <div className="text-xs">Listing Card 2</div>
                    <div className="text-xs text-stone-500">[View Details] →</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-stone-400 dark:text-stone-500">↓ (click listing)</div>
            </div>

            {/* Listing Detail */}
            <div className="border border-stone-200 dark:border-stone-700 rounded p-4 bg-stone-50 dark:bg-stone-800">
              <div className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
                LISTING DETAIL
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
                  <div>[← Back to Results]</div>
                  <div>[Hero Section: Images, Title, Location]</div>
                  <div>[Description, Rules, Amenities]</div>
                </div>
                <div className="border border-stone-300 dark:border-stone-600 rounded p-3 bg-blue-50 dark:bg-blue-900/20">
                  <div className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                    BOOKING WIDGET
                  </div>
                  <div className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
                    <div>[Availability Display]</div>
                    <div>[Booking Controls]</div>
                    <div>[Pricing]</div>
                    <div className="mt-2">[Book Now Button] →</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-stone-400 dark:text-stone-500">↓ (complete booking)</div>
            </div>

            {/* Confirmation */}
            <div className="border border-stone-200 dark:border-stone-700 rounded p-4 bg-stone-50 dark:bg-stone-800">
              <div className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
                CONFIRMATION / RECEIPT
              </div>
              <div className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
                <div>[✓] Booking Confirmed</div>
                <div className="border border-stone-300 dark:border-stone-600 rounded p-2 mt-2">
                  <div className="text-xs">Booking Summary</div>
                  <div className="text-xs text-stone-500">Date, Time, Price</div>
                </div>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs">[View in My Bookings] →</span>
                  <span className="text-xs">[Search More]</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-stone-400 dark:text-stone-500">↓ (optional)</div>
            </div>

            {/* My Bookings */}
            <div className="border border-stone-200 dark:border-stone-700 rounded p-4 bg-stone-50 dark:bg-stone-800">
              <div className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
                MY BOOKINGS
              </div>
              <div className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
                <div>[All] [Confirmed] [Pending] [Cancelled]</div>
                <div className="border border-stone-300 dark:border-stone-600 rounded p-2 mt-2">
                  <div className="text-xs">Booking Card 1</div>
                  <div className="text-xs text-stone-500">[Status Badge] [View Details] →</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-stone-200 dark:border-stone-700 pt-4">
              <div className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                FOOTER
              </div>
              <div className="text-sm text-stone-600 dark:text-stone-400">
                Contact | Privacy | Terms | Accessibility
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Flow */}
        <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-6 bg-white dark:bg-stone-900">
          <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
            Navigation Flow
          </h2>
          <div className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <span className="font-medium">Search/Results</span>
              <span>→</span>
              <span>Listing Detail</span>
              <span className="text-xs text-stone-500">(click listing)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Listing Detail</span>
              <span>→</span>
              <span>Confirmation</span>
              <span className="text-xs text-stone-500">(complete booking)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Confirmation</span>
              <span>→</span>
              <span>My Bookings</span>
              <span className="text-xs text-stone-500">(view booking)</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
