/**
 * CAPACITY BookingWidget Wireframe
 * Focus on structure and interaction, not visual polish
 * Note: AppShell is automatically wrapped by Design OS
 */
export default function CapacityWidget() {
  return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              CAPACITY BookingWidget
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

            {/* Date/Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Time
                </label>
                <select className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900">
                  <option>14:00</option>
                  <option>15:00</option>
                  <option>16:00</option>
                </select>
              </div>
            </div>

            {/* Attendee Count Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
                Number of Attendees
              </label>
              <div className="flex items-center gap-4">
                <button className="w-10 h-10 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900 font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800">
                  -
                </button>
                <input
                  type="number"
                  value="5"
                  min="1"
                  max="12"
                  className="w-20 px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900 text-center font-medium"
                />
                <button className="w-10 h-10 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900 font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800">
                  +
                </button>
                <div className="text-sm text-stone-600 dark:text-stone-400">
                  of 12 spots remaining
                </div>
              </div>
            </div>

            {/* Capacity Indicator */}
            <div className="mb-6 p-4 border border-stone-200 dark:border-stone-700 rounded bg-stone-50 dark:bg-stone-800">
              <div className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                Capacity
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-stone-600 dark:text-stone-400">
                  <span>Total capacity: 30</span>
                  <span>Booked: 18</span>
                  <span>Available: 12</span>
                </div>
                <div className="w-full h-4 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 dark:bg-blue-600"
                    style={{ width: '60%' }}
                  />
                  <div
                    className="h-full bg-green-500 dark:bg-green-600 -mt-4"
                    style={{ width: '40%', marginLeft: '60%' }}
                  />
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-500">
                  [Booked] [Available]
                </div>
              </div>
            </div>

            {/* Pricing Display */}
            <div className="mb-6 p-4 border border-stone-200 dark:border-stone-700 rounded bg-blue-50 dark:bg-blue-900/20">
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-700 dark:text-stone-300">Total Price</span>
                <span className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  2500 NOK
                </span>
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-500 mt-1">
                5 attendees × 500 NOK/person
              </div>
            </div>

            {/* Rules Display */}
            <div className="mb-6 p-3 border border-stone-200 dark:border-stone-700 rounded">
              <div className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
                <div>• Maximum 30 attendees</div>
                <div>• Bookings must be made 72 hours in advance</div>
                <div>• Maximum 60 days in advance</div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full px-6 py-3 bg-[#33649E] text-white rounded-md font-medium hover:bg-[#2C5688] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
            >
              Book for 5 attendees
            </button>
          </div>

          {/* Interaction Notes */}
          <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 bg-stone-50 dark:bg-stone-800">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Interaction Notes
            </h3>
            <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1 list-disc list-inside">
              <li>Attendee count input with +/- buttons</li>
              <li>Capacity visualization shows booked vs available</li>
              <li>Real-time capacity check as user selects count</li>
              <li>Price updates automatically based on attendee count</li>
              <li>CTA button text includes count ("Book for 5 attendees")</li>
            </ul>
          </div>
        </div>
      </div>
  )
}
