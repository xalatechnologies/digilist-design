/**
 * PACKAGE BookingWidget Wireframe
 * Focus on structure and interaction, not visual polish
 * Note: AppShell is automatically wrapped by Design OS
 */
export default function PackageWidget() {
  return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              PACKAGE BookingWidget
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

            {/* Date Selection (if time-bound) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                Select Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900"
              />
            </div>

            {/* Package Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
                Select Package
              </label>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border-2 border-[#33649E] rounded bg-blue-50 dark:bg-blue-900/20 cursor-pointer">
                  <input type="radio" name="package" className="w-4 h-4 mt-1" defaultChecked />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-base font-semibold text-stone-900 dark:text-stone-100">
                          Basic Package
                        </div>
                        <div className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                          Includes: Venue access, Basic equipment
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                        5000 NOK
                      </div>
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">
                      Available
                    </div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-4 border border-stone-300 dark:border-stone-700 rounded cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800">
                  <input type="radio" name="package" className="w-4 h-4 mt-1" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-base font-semibold text-stone-900 dark:text-stone-100">
                          Premium Package
                        </div>
                        <div className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                          Includes: Venue access, Premium equipment, Catering
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                        8000 NOK
                      </div>
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">
                      Available
                    </div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-4 border border-stone-300 dark:border-stone-700 rounded bg-stone-100 dark:bg-stone-800 opacity-50 cursor-not-allowed">
                  <input type="radio" name="package" className="w-4 h-4 mt-1" disabled />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-base font-semibold text-stone-500 dark:text-stone-500">
                          Deluxe Package
                        </div>
                        <div className="text-sm text-stone-500 dark:text-stone-500 mt-1">
                          Includes: Venue access, Premium equipment, Catering, Entertainment
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-stone-500 dark:text-stone-500">
                        12000 NOK
                      </div>
                    </div>
                    <div className="text-xs text-red-600 dark:text-red-400">
                      Unavailable
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Package Details (when selected) */}
            <div className="mb-6 p-4 border border-stone-200 dark:border-stone-700 rounded bg-stone-50 dark:bg-stone-800">
              <div className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                Package Includes
              </div>
              <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1 list-disc list-inside">
                <li>Venue access</li>
                <li>Basic equipment</li>
              </ul>
            </div>

            {/* Pricing Display */}
            <div className="mb-6 p-4 border border-stone-200 dark:border-stone-700 rounded bg-blue-50 dark:bg-blue-900/20">
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-700 dark:text-stone-300">Total Price</span>
                <span className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  5000 NOK
                </span>
              </div>
            </div>

            {/* Rules Display */}
            <div className="mb-6 p-3 border border-stone-200 dark:border-stone-700 rounded">
              <div className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
                <div>• Bookings must be made 120 hours in advance</div>
                <div>• Maximum 180 days in advance</div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full px-6 py-3 bg-[#33649E] text-white rounded-md font-medium hover:bg-[#2C5688] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
            >
              Book package
            </button>
          </div>

          {/* Interaction Notes */}
          <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 bg-stone-50 dark:bg-stone-800">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Interaction Notes
            </h3>
            <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1 list-disc list-inside">
              <li>Package selection with radio buttons or cards</li>
              <li>Selected package highlighted with brand blue</li>
              <li>Unavailable packages disabled with explanation</li>
              <li>Package details shown when selected</li>
              <li>Price updates based on selected package</li>
            </ul>
          </div>
        </div>
      </div>
  )
}
