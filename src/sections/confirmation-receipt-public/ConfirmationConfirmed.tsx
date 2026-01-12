import { CheckCircle, Download, ArrowLeft, Calendar, Clock, MapPin, FileText } from 'lucide-react'

/**
 * Confirmation Page - Confirmed Booking State
 * Shows confirmed booking with receipt and next steps
 * Note: AppShell is automatically wrapped by Design OS
 */
export default function ConfirmationConfirmed() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
        <button className="flex items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100">
          <ArrowLeft className="w-4 h-4" />
          Back to search
        </button>
        <span>/</span>
        <span>Booking Confirmed</span>
      </div>

      {/* Status Panel */}
      <div className="mb-8 p-6 border-2 border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
              Booking Confirmed
            </h1>
            <p className="text-green-700 dark:text-green-300 mb-4">
              Your booking has been confirmed. You will receive a confirmation email shortly.
            </p>
            <div className="text-sm text-green-600 dark:text-green-400">
              <div className="font-medium mb-1">Booking Reference:</div>
              <div className="font-mono">BK-2025-001234</div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Summary Card */}
      <div className="mb-8 border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden bg-white dark:bg-stone-900">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
            Booking Summary
          </h2>

          {/* Listing Info */}
          <div className="flex gap-4 mb-6">
            <div className="w-24 h-24 bg-stone-200 dark:bg-stone-800 rounded shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-1">
                Community Sports Hall
              </h3>
              <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 mb-2">
                <MapPin className="w-4 h-4" />
                <span>Storgata 1, 0182 Oslo, Grunerløkka</span>
              </div>
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                SPACE
              </span>
            </div>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-stone-50 dark:bg-stone-800 rounded">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-stone-400 dark:text-stone-500" />
              <div>
                <div className="text-xs text-stone-500 dark:text-stone-500">Date</div>
                <div className="text-sm font-medium text-stone-900 dark:text-stone-100">
                  2025-01-15
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-stone-400 dark:text-stone-500" />
              <div>
                <div className="text-xs text-stone-500 dark:text-stone-500">Time</div>
                <div className="text-sm font-medium text-stone-900 dark:text-stone-100">
                  19:00 - 21:00 (2 hours)
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-stone-400 dark:text-stone-500" />
              <div>
                <div className="text-xs text-stone-500 dark:text-stone-500">Unit</div>
                <div className="text-sm font-medium text-stone-900 dark:text-stone-100">
                  Main Hall
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="border-t border-stone-200 dark:border-stone-700 pt-4">
            <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
              Price Breakdown
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>2 hours × 500 NOK/hour</span>
                <span>1000 NOK</span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>VAT (25%)</span>
                <span>250 NOK</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-stone-900 dark:text-stone-100 pt-2 border-t border-stone-200 dark:border-stone-700">
                <span>Total</span>
                <span>1250 NOK</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-stone-500 dark:text-stone-500">
              Payment method: Credit Card • Paid on 2025-01-12
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mb-8 p-6 border border-stone-200 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-800">
        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
          What's Next
        </h2>
        <ul className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
            <span>You will receive a confirmation email shortly</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
            <span>Booking details are saved in 'My Bookings'</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
            <span>You will receive a reminder 24 hours before</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
            <span>
              Check-in: Arrive 10 minutes before start time at Storgata 1, 0182 Oslo
            </span>
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 px-6 py-3 bg-[#33649E] text-white rounded-md font-medium hover:bg-[#2C5688] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2 flex items-center justify-center gap-2">
          View in My Bookings
        </button>
        <button className="px-6 py-3 border border-stone-300 dark:border-stone-700 rounded-md font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2 flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Download Receipt
        </button>
        <button className="px-6 py-3 border border-stone-300 dark:border-stone-700 rounded-md font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2">
          Book Another
        </button>
      </div>
    </div>
  )
}
