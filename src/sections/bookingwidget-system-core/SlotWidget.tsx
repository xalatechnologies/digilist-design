/**
 * SLOT BookingWidget Wireframe
 * Focus on structure and interaction, not visual polish
 * Note: AppShell is automatically wrapped by Design OS
 */
export default function SlotWidget() {
  return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              SLOT BookingWidget
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

            {/* Date Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                Select Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900"
              />
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
                      i === 14 ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-400' : ''
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-stone-500 dark:text-stone-500">
                Selected date highlighted
              </div>
            </div>

            {/* Slot Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
                Select Time Slot
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border-2 border-[#33649E] rounded bg-blue-50 dark:bg-blue-900/20">
                  <input type="radio" name="slot" className="w-4 h-4" defaultChecked />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-stone-900 dark:text-stone-100">
                      09:00 - 10:00
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-500">
                      12 spots remaining
                    </div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-stone-300 dark:border-stone-700 rounded">
                  <input type="radio" name="slot" className="w-4 h-4" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-stone-900 dark:text-stone-100">
                      10:00 - 11:00
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-500">
                      8 spots remaining
                    </div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-stone-300 dark:border-stone-700 rounded bg-stone-100 dark:bg-stone-800 opacity-50">
                  <input type="radio" name="slot" className="w-4 h-4" disabled />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-stone-500 dark:text-stone-500">
                      11:00 - 12:00
                    </div>
                    <div className="text-xs text-red-600 dark:text-red-400">
                      Fully booked
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Pricing Display */}
            <div className="mb-6 p-4 border border-stone-200 dark:border-stone-700 rounded bg-blue-50 dark:bg-blue-900/20">
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-700 dark:text-stone-300">Price</span>
                <span className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  150 NOK
                </span>
              </div>
            </div>

            {/* Rules Display */}
            <div className="mb-6 p-3 border border-stone-200 dark:border-stone-700 rounded">
              <div className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
                <div>• Bookings must be made 48 hours in advance</div>
                <div>• Maximum 30 days in advance</div>
                <div>• Each slot is 60 minutes</div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full px-6 py-3 bg-[#33649E] text-white rounded-md font-medium hover:bg-[#2C5688] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
            >
              Book slot
            </button>
          </div>

          {/* Interaction Notes */}
          <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 bg-stone-50 dark:bg-stone-800">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Interaction Notes
            </h3>
            <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1 list-disc list-inside">
              <li>Date selection updates available slots list</li>
              <li>Slots show remaining capacity</li>
              <li>Fully booked slots disabled with explanation</li>
              <li>Selected slot highlighted with brand blue</li>
              <li>Radio buttons keyboard accessible</li>
            </ul>
          </div>
        </div>
      </div>
  )
}
