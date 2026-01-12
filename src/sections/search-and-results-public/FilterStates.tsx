import { Search, Filter, X, Check } from 'lucide-react'

/**
 * Filter Interaction States
 * Shows different filter states: open, selected, applied
 * Note: AppShell is automatically wrapped by Design OS
 */
export default function FilterStates() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Filter Interaction States
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mb-6">
          WCAG-compliant filter states and interactions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Default State */}
        <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 bg-white dark:bg-stone-900">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">
            Default State
          </h3>
          <fieldset>
            <legend className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              Listing Type
            </legend>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#33649E] border-stone-300 dark:border-stone-700 rounded focus:ring-2 focus:ring-[#33649E]"
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
            </div>
          </fieldset>
        </div>

        {/* Selected State */}
        <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 bg-white dark:bg-stone-900">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">
            Selected State (WCAG Compliant)
          </h3>
          <fieldset>
            <legend className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              Listing Type
            </legend>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-[#33649E] border-[#33649E] rounded focus:ring-2 focus:ring-[#33649E]"
                  />
                  <Check className="absolute top-0 left-0 w-4 h-4 text-[#33649E] pointer-events-none" />
                </div>
                <span className="text-sm font-medium text-[#33649E]">SPACE</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#33649E] border-stone-300 dark:border-stone-700 rounded focus:ring-2 focus:ring-[#33649E]"
                />
                <span className="text-sm text-stone-600 dark:text-stone-400">RESOURCE</span>
              </label>
            </div>
          </fieldset>
          <div className="mt-3 text-xs text-stone-500 dark:text-stone-500">
            ✓ Checkmark icon + color + text (not color-only)
          </div>
        </div>

        {/* Focus State */}
        <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 bg-white dark:bg-stone-900">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">
            Focus State
          </h3>
          <fieldset>
            <legend className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              Listing Type
            </legend>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#33649E] border-stone-300 dark:border-stone-700 rounded focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
                  autoFocus
                />
                <span className="text-sm text-stone-600 dark:text-stone-400">SPACE</span>
              </label>
            </div>
          </fieldset>
          <div className="mt-3 text-xs text-stone-500 dark:text-stone-500">
            ✓ Visible focus ring (2px, #33649E, contrast ≥ 3:1)
          </div>
        </div>

        {/* Active Filter Chips */}
        <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 bg-white dark:bg-stone-900">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">
            Active Filter Chips
          </h3>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E6EEF7] dark:bg-blue-900/30 text-[#33649E] rounded-full text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2">
              <Check className="w-3 h-3" />
              SPACE
              <X className="w-3 h-3" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E6EEF7] dark:bg-blue-900/30 text-[#33649E] rounded-full text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2">
              <Check className="w-3 h-3" />
              Grunerløkka
              <X className="w-3 h-3" />
            </button>
          </div>
          <div className="mt-3 text-xs text-stone-500 dark:text-stone-500">
            ✓ Background color + icon + text (not color-only)
          </div>
        </div>
      </div>
    </div>
  )
}
