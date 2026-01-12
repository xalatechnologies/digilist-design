/**
 * QUANTITY BookingWidget Wireframe
 * Focus on structure and interaction, not visual polish
 * Note: AppShell is automatically wrapped by Design OS
 */
export default function QuantityWidget() {
  return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              QUANTITY BookingWidget
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

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button className="w-10 h-10 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900 font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800">
                  -
                </button>
                <input
                  type="number"
                  value="3"
                  min="1"
                  max="7"
                  className="w-20 px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900 text-center font-medium"
                />
                <button className="w-10 h-10 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900 font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800">
                  +
                </button>
                <div className="text-sm text-stone-600 dark:text-stone-400">
                  of 7 available
                </div>
              </div>
            </div>

            {/* Availability Indicator */}
            <div className="mb-6 p-4 border border-stone-200 dark:border-stone-700 rounded bg-stone-50 dark:bg-stone-800">
              <div className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                Availability
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
                <div>Total stock: 10 units</div>
                <div>Available now: 7 units</div>
                <div>Currently booked: 3 units</div>
              </div>
            </div>

            {/* Pricing Display */}
            <div className="mb-6 p-4 border border-stone-200 dark:border-stone-700 rounded bg-blue-50 dark:bg-blue-900/20">
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-700 dark:text-stone-300">Total Price</span>
                <span className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  600 NOK
                </span>
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-500 mt-1">
                3 units × 200 NOK/unit
              </div>
            </div>

            {/* Rules Display */}
            <div className="mb-6 p-3 border border-stone-200 dark:border-stone-700 rounded">
              <div className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
                <div>• Maximum 7 units per booking</div>
                <div>• Bookings must be made 24 hours in advance</div>
              </div>
            </div>

            {/* Error State Example */}
            <div className="mb-6 p-3 border-2 border-red-300 dark:border-red-700 rounded bg-red-50 dark:bg-red-900/20">
              <div className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400">⚠</span>
                <div className="text-sm text-red-700 dark:text-red-300">
                  Only 7 units available. Please reduce quantity.
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full px-6 py-3 bg-[#33649E] text-white rounded-md font-medium hover:bg-[#2C5688] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
            >
              Book 3 units
            </button>
          </div>

          {/* Interaction Notes */}
          <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 bg-stone-50 dark:bg-stone-800">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Interaction Notes
            </h3>
            <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1 list-disc list-inside">
              <li>Quantity selector with +/- buttons (keyboard accessible)</li>
              <li>Real-time availability check</li>
              <li>Price updates automatically based on quantity</li>
              <li>Error shown if quantity exceeds available stock</li>
              <li>CTA button text includes quantity ("Book 3 units")</li>
            </ul>
          </div>
        </div>
      </div>
  )
}
