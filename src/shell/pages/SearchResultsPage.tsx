import { AppShell } from '../components/AppShell'
import { Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SearchResultsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Find Available Listings
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Search and discover available municipal listings for booking.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search listings..."
              className="w-full pl-10 pr-4 py-3 border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button
            className="bg-[#33649E] text-white hover:bg-[#2C5688] active:bg-[#24496F] focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
          >
            Search
          </Button>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Showing <span className="font-medium text-stone-900 dark:text-stone-100">24</span> listings
          </p>
          <select className="px-3 py-1.5 text-sm border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2">
            <option>Sort by: Relevance</option>
            <option>Sort by: Price (Low to High)</option>
            <option>Sort by: Price (High to Low)</option>
            <option>Sort by: Availability</option>
          </select>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div
              key={i}
              className="border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-stone-900"
            >
              <div className="h-48 bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-800" />
              <div className="p-4">
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
                  Sample Listing {i}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 mb-3 line-clamp-2">
                  Description of listing with key details and features...
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    From 500 kr
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-500">
                    Available
                  </span>
                </div>
                <Button
                  className="w-full bg-[#33649E] text-white hover:bg-[#2C5688] focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
