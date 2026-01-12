import { Search, Filter, X, MapPin, CheckCircle } from 'lucide-react'

/**
 * Search & Results - Mobile Layout
 * Search bar, filter drawer, results list
 * Note: AppShell is automatically wrapped by Design OS
 */
export default function SearchResultsMobile() {
  return (
    <div className="max-w-7xl mx-auto py-4 px-4">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
          Find Listings
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Search and discover available listings.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search listings..."
              className="w-full pl-9 pr-4 py-2.5 border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
            />
          </div>
          <button className="px-4 py-2.5 bg-[#33649E] text-white rounded-md hover:bg-[#2C5688] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Filters Chips */}
      <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E6EEF7] dark:bg-blue-900/30 text-[#33649E] rounded-full text-xs font-medium whitespace-nowrap">
          SPACE
          <X className="w-3 h-3" />
        </button>
        <button className="px-4 py-1.5 border border-stone-300 dark:border-stone-700 rounded-full text-xs font-medium text-stone-600 dark:text-stone-400 whitespace-nowrap">
          <Filter className="w-3 h-3 inline mr-1" />
          Filters (2)
        </button>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-stone-600 dark:text-stone-400">
          <span className="font-medium text-stone-900 dark:text-stone-100">6</span> listings
        </p>
        <select className="px-2 py-1 text-xs border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2">
          <option>Relevance</option>
          <option>Price</option>
          <option>Availability</option>
        </select>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden bg-white dark:bg-stone-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
            tabIndex={0}
          >
            <div className="flex">
              <div className="w-32 h-24 bg-stone-200 dark:bg-stone-800 shrink-0" />
              <div className="flex-1 p-3 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm truncate">
                    Sample Listing {i}
                  </h3>
                  <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium shrink-0 ml-2">
                    SPACE
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-400 mb-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">Oslo, Grunerløkka</span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 mb-2 line-clamp-2">
                  Description of listing...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    From 500 NOK
                  </span>
                  <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Drawer Placeholder */}
      <div className="mt-6 p-4 border border-stone-200 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-800">
        <div className="text-xs text-stone-600 dark:text-stone-400 text-center">
          [Filter Drawer opens on "Filters" button click]
        </div>
        <div className="mt-2 text-xs text-stone-500 dark:text-stone-500 space-y-1">
          <div>• Listing Type checkboxes</div>
          <div>• Location dropdown</div>
          <div>• Price range inputs</div>
          <div>• Amenities checkboxes</div>
          <div>• "Apply Filters" and "Clear Filters" buttons</div>
        </div>
      </div>
    </div>
  )
}
