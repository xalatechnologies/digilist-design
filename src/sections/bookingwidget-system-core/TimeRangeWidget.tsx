/**
 * TIME_RANGE BookingWidget Wireframe
 * Focus on structure and interaction, not visual polish
 * Note: AppShell is automatically wrapped by Design OS
 */
export default function TimeRangeWidget() {
  return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              TIME_RANGE BookingWidget
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

            {/* Bookable Unit Selection (if multiple) */}
            <div className="mb-6 p-4 border border-stone-200 dark:border-stone-700 rounded bg-stone-50 dark:bg-stone-800">
              <div className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                Select Unit (if multiple available)
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="unit" className="w-4 h-4" />
                  <span className="text-sm text-stone-600 dark:text-stone-400">Main Hall</span>
                </label>
              </div>
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
                      i % 7 === 0 || i % 7 === 6
                        ? 'bg-stone-100 dark:bg-stone-800'
                        : 'bg-white dark:bg-stone-900'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-stone-500 dark:text-stone-500">
                [Available] [Booked] [Blocked]
              </div>
            </div>

            {/* Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Start Time
                </label>
                <select className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900">
                  <option>18:00</option>
                  <option>18:30</option>
                  <option>19:00</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  End Time
                </label>
                <select className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900">
                  <option>19:00</option>
                  <option>19:30</option>
                  <option>20:00</option>
                </select>
              </div>
            </div>

            {/* Duration Alternative */}
            <div className="mb-6 p-3 border border-stone-200 dark:border-stone-700 rounded bg-stone-50 dark:bg-stone-800">
              <div className="text-xs text-stone-600 dark:text-stone-400">
                Or select duration: [Duration Selector: 1h, 2h, 3h, 4h]
              </div>
            </div>

            {/* Pricing Display */}
            <div className="mb-6 p-4 border border-stone-200 dark:border-stone-700 rounded bg-blue-50 dark:bg-blue-900/20">
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-700 dark:text-stone-300">Total Price</span>
                <span className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  1000 NOK
                </span>
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-500 mt-1">
                2 hours × 500 NOK/hour
              </div>
            </div>

            {/* Rules Display */}
            <div className="mb-6 p-3 border border-stone-200 dark:border-stone-700 rounded">
              <div className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
                <div>• Minimum duration: 1 hour</div>
                <div>• Maximum duration: 4 hours</div>
                <div>• Bookings must be made 24 hours in advance</div>
                <div>• 15 min buffer required before/after</div>
              </div>
            </div>

            {/* Error State Example */}
            <div className="mb-6 p-3 border-2 border-red-300 dark:border-red-700 rounded bg-red-50 dark:bg-red-900/20">
              <div className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400">⚠</span>
                <div className="text-sm text-red-700 dark:text-red-300">
                  Booking must be at least 24 hours in advance. Earliest available: 2025-01-14 18:00
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full px-6 py-3 bg-[#33649E] text-white rounded-md font-medium hover:bg-[#2C5688] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
            >
              Book now
            </button>
          </div>

          {/* Interaction Notes */}
          <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 bg-stone-50 dark:bg-stone-800">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Interaction Notes
            </h3>
            <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1 list-disc list-inside">
              <li>Date/time pickers constrained by slot size (30 min intervals)</li>
              <li>Real-time validation as user selects dates/times</li>
              <li>Pricing updates automatically based on duration</li>
              <li>Error messages appear near relevant inputs</li>
              <li>All inputs keyboard accessible</li>
            </ul>
          </div>
        </div>
      </div>
  )
}
