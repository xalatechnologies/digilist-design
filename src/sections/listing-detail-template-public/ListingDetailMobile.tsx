import { ArrowLeft, Share2, MapPin, Users, Clock, CheckCircle } from 'lucide-react'

/**
 * Listing Detail Template - Mobile Layout
 * Single-column layout with BookingWidget below content
 * Note: AppShell is automatically wrapped by Design OS
 */
export default function ListingDetailMobile() {
  return (
      <div className="max-w-7xl mx-auto py-4 px-4">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
          <button className="flex items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span>/</span>
          <span className="truncate">Community Sports Hall</span>
        </div>

        {/* Header Actions */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-2 border border-stone-300 dark:border-stone-700 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-md text-sm font-medium hover:bg-stone-100 dark:hover:bg-stone-800">
              Contact
            </button>
          </div>
        </div>

        {/* Hero Section - Image Gallery */}
        <div className="mb-6">
          <div className="aspect-video bg-stone-200 dark:bg-stone-800 rounded-lg overflow-hidden mb-3">
            <div className="w-full h-full flex items-center justify-center text-stone-400 dark:text-stone-600">
              [Main Image - Swipeable]
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-20 h-14 bg-stone-200 dark:bg-stone-800 rounded border-2 border-stone-300 dark:border-stone-700 shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Single-Column Content */}
        <div className="space-y-6">
          {/* Title & Location */}
          <div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              Community Sports Hall
            </h1>
            <div className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <div>Storgata 1, 0182 Oslo</div>
                <div className="text-stone-500 dark:text-stone-500">2.5 km away</div>
              </div>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className="flex flex-wrap items-center gap-3 p-3 border border-stone-200 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-800">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
              SPACE
            </span>
            <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400">
              <Users className="w-3.5 h-3.5" />
              <span>50 people</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400">
              <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              <span>4.5 (23)</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Description
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
              A modern, well-equipped sports hall perfect for various activities including
              basketball, volleyball, badminton, and fitness classes. The hall features high
              ceilings, professional flooring, and excellent lighting.
            </p>
            <div>
              <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Amenities
              </h3>
              <ul className="grid grid-cols-1 gap-1.5 text-sm text-stone-600 dark:text-stone-400">
                <li>• Parking</li>
                <li>• Accessible entrance</li>
                <li>• Changing rooms</li>
                <li>• Showers</li>
                <li>• Equipment storage</li>
                <li>• WiFi</li>
              </ul>
            </div>
          </div>

          {/* Rules */}
          <div>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Rules & Restrictions
            </h2>
            <ul className="space-y-1.5 text-sm text-stone-600 dark:text-stone-400">
              <li>• No smoking</li>
              <li>• No alcohol</li>
              <li>• Sports shoes required</li>
              <li>• Respect other users</li>
              <li>• Clean up after use</li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Opening Hours
            </h2>
            <div className="space-y-1.5 text-sm text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Weekdays: 18:00 - 22:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Weekends: 10:00 - 20:00</span>
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Location
            </h2>
            <div className="aspect-video bg-stone-200 dark:bg-stone-800 rounded-lg flex items-center justify-center text-stone-400 dark:text-stone-600 text-sm">
              [Map]
            </div>
          </div>

          {/* BookingWidget - Below Content */}
          <div className="border-2 border-stone-300 dark:border-stone-600 rounded-lg p-4 bg-white dark:bg-stone-900">
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
              Book Now
            </h2>

            {/* BookingWidget Content */}
            <div className="space-y-4">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900"
                />
              </div>

              {/* Time Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Start
                  </label>
                  <select className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900">
                    <option>18:00</option>
                    <option>18:30</option>
                    <option>19:00</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    End
                  </label>
                  <select className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900">
                    <option>19:00</option>
                    <option>19:30</option>
                    <option>20:00</option>
                  </select>
                </div>
              </div>

              {/* Pricing */}
              <div className="p-3 border border-stone-200 dark:border-stone-700 rounded bg-blue-50 dark:bg-blue-900/20">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-700 dark:text-stone-300">Total</span>
                  <span className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                    1000 NOK
                  </span>
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-500 mt-1">
                  2 hours × 500 NOK/hour
                </div>
              </div>

              {/* Rules */}
              <div className="p-3 border border-stone-200 dark:border-stone-700 rounded bg-stone-50 dark:bg-stone-800">
                <div className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
                  <div>• Min: 1 hour, Max: 4 hours</div>
                  <div>• Book 24h in advance</div>
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full px-6 py-3 bg-[#33649E] text-white rounded-md font-medium hover:bg-[#2C5688] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2">
                Book now
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
