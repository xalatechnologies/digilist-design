import { Search, Filter, X, MapPin, Users, Clock, CheckCircle } from 'lucide-react'

/**
 * Search & Results - Desktop Layout
 * Search bar, filters sidebar, results grid
 * Note: AppShell is automatically wrapped by Design OS
 */
export default function SearchResultsDesktop() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Find Available Listings
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          Search and discover available municipal listings for booking.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search listings..."
              className="w-full pl-10 pr-4 py-3 border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
            />
          </div>
          <button className="px-6 py-3 bg-[#33649E] text-white rounded-md hover:bg-[#2C5688] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2">
            Search
          </button>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Filters */}
        <div className="lg:col-span-1">
          <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 bg-white dark:bg-stone-900">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                Filters
              </h2>
              <button className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100">
                Clear all
              </button>
            </div>

            {/* Listing Type Filter */}
            <div className="mb-6">
              <fieldset>
                <legend className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Listing Type
                </legend>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#33649E] border-stone-300 dark:border-stone-700 rounded focus:ring-2 focus:ring-[#33649E]"
                      defaultChecked
                    />
                    <span className="text-sm text-stone-600 dark:text-stone-400">SPACE</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#33649E] border-stone-300 dark:border-stone-700 rounded focus:ring-2 focus:ring-[#33649E]"
                    />
                    <span className="text-sm text-stone-600 dark:text-stone-400">RESOURCE</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#33649E] border-stone-300 dark:border-stone-700 rounded focus:ring-2 focus:ring-[#33649E]"
                    />
                    <span className="text-sm text-stone-600 dark:text-stone-400">EVENT</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#33649E] border-stone-300 dark:border-stone-700 rounded focus:ring-2 focus:ring-[#33649E]"
                    />
                    <span className="text-sm text-stone-600 dark:text-stone-400">SERVICE</span>
                  </label>
                </div>
              </fieldset>
            </div>

            {/* Location Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                Location
              </label>
              <select className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2">
                <option>All locations</option>
                <option>Grunerløkka</option>
                <option>Sagene</option>
                <option>Sentrum</option>
                <option>Frogner</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                Price Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
                />
              </div>
            </div>

            {/* Amenities Filter */}
            <div>
              <fieldset>
                <legend className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Amenities
                </legend>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#33649E] border-stone-300 dark:border-stone-700 rounded focus:ring-2 focus:ring-[#33649E]"
                    />
                    <span className="text-sm text-stone-600 dark:text-stone-400">Parking</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#33649E] border-stone-300 dark:border-stone-700 rounded focus:ring-2 focus:ring-[#33649E]"
                    />
                    <span className="text-sm text-stone-600 dark:text-stone-400">Accessible</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#33649E] border-stone-300 dark:border-stone-700 rounded focus:ring-2 focus:ring-[#33649E]"
                    />
                    <span className="text-sm text-stone-600 dark:text-stone-400">WiFi</span>
                  </label>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-3">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Showing <span className="font-medium text-stone-900 dark:text-stone-100">6</span> listings
            </p>
            <select className="px-3 py-1.5 text-sm border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2">
              <option>Sort by: Relevance</option>
              <option>Sort by: Price (Low to High)</option>
              <option>Sort by: Price (High to Low)</option>
              <option>Sort by: Availability</option>
            </select>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-stone-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
                tabIndex={0}
              >
                <div className="aspect-video bg-stone-200 dark:bg-stone-800" />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                      Sample Listing {i}
                    </h3>
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                      SPACE
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-stone-400 mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Oslo, Grunerløkka</span>
                  </div>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mb-3 line-clamp-2">
                    Description of listing with key details...
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                      From 500 NOK
                    </span>
                    <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Available
                    </span>
                  </div>
                  <button className="w-full px-4 py-2 bg-[#33649E] text-white rounded-md hover:bg-[#2C5688] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
