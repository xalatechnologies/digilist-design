/**
 * ALL_DAY BookingWidget Wireframe
 * Focus on structure and interaction, not visual polish
 * Note: AppShell is automatically wrapped by Design OS
 */
export default function AllDayWidget() {
  return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              ALL_DAY BookingWidget
            </h1>
            <p className="text-stone-600 dark:text-stone-400">
              Wireframe-level design showing structure and interaction patterns
            </p>
          </div>

          {/* BookingWidget Container */}
          <div className="border-2 border-stone-300 dark:border-stone-600 rounded-lg p-6 bg-white dark:bg-stone-900">
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
              BookingWidget
            </h2>

            {/* Date Range Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900"
                />
              </div>
            </div>

            {/* Duration Alternative */}
            <div className="mb-6 p-3 border border-stone-200 dark:border-stone-700 rounded bg-stone-50 dark:bg-stone-800">
              <div className="text-xs text-stone-600 dark:text-stone-400 mb-2">
                Or select duration:
              </div>
              <select className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900">
                <option>1 day</option>
                <option>2 days</option>
                <option>3 days</option>
                <option>7 days</option>
              </select>
            </div>

            {/* Availability Calendar */}
            <div className="mb-6 p-4 border border-stone-200 dark:border-stone-700 rounded">
              <div className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
                Availability Calendar
              </div>
              <div className="grid grid-cols-7 gap-1 text-xs">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="text-center text-stone-500 dark:text-stone-500 p-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className={`border border-stone-300 dark:border-stone-600 rounded p-2 text-center text-xs ${
                      i === 19 || i === 20
                        ? 'bg-red-100 dark:bg-red-900/30 border-red-400'
                        : i >= 15 && i <= 18
                        ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-400'
                        : ''
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-stone-500 dark:text-stone-500 space-y-1">
                <div>[Available] [Selected Range] [Blocked]</div>
                <div>Blocked dates: 20-21 Jan (Maintenance)</div>
              </div>
            </div>

            {/* Pricing Display */}
            <div className="mb-6 p-4 border border-stone-200 dark:border-stone-700 rounded bg-blue-50 dark:bg-blue-900/20">
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-700 dark:text-stone-300">Total Price</span>
                <span className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  4000 NOK
                </span>
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-500 mt-1">
                2 days × 2000 NOK/day
              </div>
            </div>

            {/* Rules Display */}
            <div className="mb-6 p-3 border border-stone-200 dark:border-stone-700 rounded">
              <div className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
                <div>• Minimum duration: 1 day</div>
                <div>• Maximum duration: 7 days</div>
                <div>• Bookings must be made 72 hours in advance</div>
                <div>• Maximum 180 days in advance</div>
              </div>
            </div>

            {/* Error State Example */}
            <div className="mb-6 p-3 border-2 border-red-300 dark:border-red-700 rounded bg-red-50 dark:bg-red-900/20">
              <div className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400">⚠</span>
                <div className="text-sm text-red-700 dark:text-red-300">
                  Selected dates include unavailable dates (20-21 Jan blocked for maintenance)
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full px-6 py-3 bg-[#33649E] text-white rounded-md font-medium hover:bg-[#2C5688] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
            >
              Book dates
            </button>
          </div>

          {/* Interaction Notes */}
          <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 bg-stone-50 dark:bg-stone-800">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Interaction Notes
            </h3>
            <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1 list-disc list-inside">
              <li>Date range selection highlights consecutive available days</li>
              <li>Blocked dates clearly marked and disabled</li>
              <li>Duration selector updates end date automatically</li>
              <li>Pricing updates based on number of days</li>
              <li>Validation ensures all dates in range are available</li>
            </ul>
          </div>
        </div>
      </div>
  )
}
