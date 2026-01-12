import { Clock, ArrowLeft, Calendar, MapPin, FileText, AlertCircle } from 'lucide-react'

/**
 * Confirmation Page - Pending Approval State
 * Shows pending approval booking with timeline and next steps
 * Note: AppShell is automatically wrapped by Design OS
 */
export default function ConfirmationPending() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
        <button className="flex items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100">
          <ArrowLeft className="w-4 h-4" />
          Back to search
        </button>
        <span>/</span>
        <span>Application Submitted</span>
      </div>

      {/* Status Panel */}
      <div className="mb-8 p-6 border-2 border-amber-200 dark:border-amber-800 rounded-lg bg-amber-50 dark:bg-amber-900/20">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <Clock className="w-12 h-12 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-2">
              Pending Approval
            </h1>
            <p className="text-amber-700 dark:text-amber-300 mb-4">
              Your application has been submitted and is awaiting approval. You will receive a
              response within 2-3 business days.
            </p>
            <div className="text-sm text-amber-600 dark:text-amber-400">
              <div className="font-medium mb-1">Application Reference:</div>
              <div className="font-mono">BK-2025-001235</div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Summary Card */}
      <div className="mb-8 border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden bg-white dark:bg-stone-900">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
            Application Summary
          </h2>

          {/* Listing Info */}
          <div className="flex gap-4 mb-6">
            <div className="w-24 h-24 bg-stone-200 dark:bg-stone-800 rounded shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-1">
                Conference Room A
              </h3>
              <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 mb-2">
                <MapPin className="w-4 h-4" />
                <span>Karl Johans gate 1, 0162 Oslo, Sentrum</span>
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
                <div className="text-xs text-stone-500 dark:text-stone-500">Date Range</div>
                <div className="text-sm font-medium text-stone-900 dark:text-stone-100">
                  2025-01-20 to 2025-01-22
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-500">(3 days)</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-stone-400 dark:text-stone-500" />
              <div>
                <div className="text-xs text-stone-500 dark:text-stone-500">Unit</div>
                <div className="text-sm font-medium text-stone-900 dark:text-stone-100">
                  Conference Room A
                </div>
              </div>
            </div>
          </div>

          {/* Estimated Pricing */}
          <div className="border-t border-stone-200 dark:border-stone-700 pt-4">
            <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
              Estimated Price
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>3 days × 2000 NOK/day</span>
                <span>6000 NOK</span>
              </div>
              <div className="pt-2 border-t border-stone-200 dark:border-stone-700">
                <div className="flex justify-between text-lg font-semibold text-stone-900 dark:text-stone-100">
                  <span>Estimated Total</span>
                  <span>6000 NOK</span>
                </div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                <div className="text-xs text-amber-700 dark:text-amber-300">
                  Final price may vary. Payment will be required upon approval.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approval Timeline */}
      <div className="mb-8 p-6 border border-stone-200 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-800">
        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
          Approval Timeline
        </h2>
        <div className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-400 mt-1.5 shrink-0" />
            <div>
              <div className="font-medium text-stone-900 dark:text-stone-100">
                Application Submitted
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-500">2025-01-12</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-stone-300 dark:bg-stone-600 mt-1.5 shrink-0" />
            <div>
              <div className="font-medium text-stone-700 dark:text-stone-300">
                Expected Response
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-500">
                2025-01-17 (2-3 business days)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mb-8 p-6 border border-stone-200 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-800">
        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
          What Happens Next
        </h2>
        <ul className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
            <span>We will review your application</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
            <span>You will be notified via email when a decision is made</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
            <span>If approved, payment instructions will be provided</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
            <span>
              Contact us if you have questions: support@digilist.no or +47 12 34 56 78
            </span>
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 px-6 py-3 bg-[#33649E] text-white rounded-md font-medium hover:bg-[#2C5688] focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2">
          View in My Bookings
        </button>
        <button className="px-6 py-3 border border-stone-300 dark:border-stone-700 rounded-md font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2">
          Contact Support
        </button>
        <button className="px-6 py-3 border border-stone-300 dark:border-stone-700 rounded-md font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2">
          Return to Search
        </button>
      </div>
    </div>
  )
}
