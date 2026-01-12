import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Layout, 
  Image, 
  Navigation, 
  MousePointerClick, 
  Eye, 
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle
} from 'lucide-react'

/**
 * Component Diagram for Listing Detail UI Spec
 * Shows component boundaries, states, and desktop vs mobile differences
 */
export default function ComponentDiagram() {
  return (
    <div className="space-y-6 p-6 bg-stone-50 dark:bg-stone-950 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            Listing Detail UI Spec - Component Diagrams
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Annotated component boundaries, states, and responsive differences
          </p>
        </div>

        {/* Desktop Layout */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Layout className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">Desktop Layout (Two-Column)</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {/* Left Column */}
            <div className="col-span-2 space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-dashed border-blue-300 dark:border-blue-700">
                <div className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-2">Left Column (2/3 width)</div>
                <div className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
                  <div>• Image Gallery</div>
                  <div>• Listing Header</div>
                  <div>• Tabs Navigation</div>
                  <div>• Tab Content</div>
                  <div>• Booking Section</div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-2 border-dashed border-green-300 dark:border-green-700">
                <div className="text-xs font-medium text-green-700 dark:text-green-300 mb-2">Right Column (1/3 width)</div>
                <div className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
                  <div>• Contact Card</div>
                  <div>• Location Card</div>
                  <div>• Opening Hours Card</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Mobile Layout */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Layout className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">Mobile Layout (Single-Column)</h2>
          </div>
          
          <div className="space-y-3">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-2 border-dashed border-purple-300 dark:border-purple-700">
              <div className="text-xs font-medium text-purple-700 dark:text-purple-300 mb-2">Single Column (Full Width)</div>
              <div className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
                <div>1. Image Gallery</div>
                <div>2. Listing Header</div>
                <div>3. Tabs Navigation (scrollable)</div>
                <div>4. Tab Content</div>
                <div>5. Sidebar Cards (moved below)</div>
                <div>6. Booking Section</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Component States */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
            <MousePointerClick className="w-5 h-5 text-stone-600 dark:text-stone-400" />
            Component States
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Loading State */}
            <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Loader2 className="w-4 h-4 text-stone-500 animate-spin" />
                <span className="text-sm font-medium">Loading State</span>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-1/2 animate-pulse"></div>
                <div className="h-20 bg-stone-200 dark:bg-stone-700 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Empty State */}
            <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-stone-500" />
                <span className="text-sm font-medium">Empty State</span>
              </div>
              <div className="text-center py-8 text-stone-500 dark:text-stone-400 text-sm">
                Ingen tilgjengelighet funnet
              </div>
            </div>

            {/* Disabled State */}
            <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-stone-500" />
                <span className="text-sm font-medium">Disabled State</span>
              </div>
              <div className="space-y-2">
                <Button disabled variant="outline" className="w-full">
                  Opptatt
                </Button>
                <div className="text-xs text-stone-500 dark:text-stone-400">
                  Grå bakgrunn, disabled cursor
                </div>
              </div>
            </div>

            {/* Selected State */}
            <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium">Selected State</span>
              </div>
              <div className="space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Valgt tidspunkt
                </Button>
                <div className="text-xs text-stone-500 dark:text-stone-400">
                  Blå bakgrunn + hvit tekst + ikon
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Interactive States */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-stone-600 dark:text-stone-400" />
            Interactive States
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Hover */}
            <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4">
              <div className="text-sm font-medium mb-2">Hover</div>
              <Button variant="outline" className="w-full hover:bg-stone-100 dark:hover:bg-stone-800">
                Hover meg
              </Button>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-2">
                Bakgrunnsfarge endres
              </div>
            </div>

            {/* Focus */}
            <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4">
              <div className="text-sm font-medium mb-2">Focus</div>
              <Button variant="outline" className="w-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                Fokuser meg
              </Button>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-2">
                Blå ring (2px)
              </div>
            </div>

            {/* Active */}
            <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4">
              <div className="text-sm font-medium mb-2">Active</div>
              <div className="flex gap-2">
                <Badge className="bg-blue-600 text-white">Oversikt</Badge>
                <Badge variant="outline">Aktivitetskalender</Badge>
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-2">
                Blå understrek + tekst
              </div>
            </div>

            {/* Selected */}
            <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4">
              <div className="text-sm font-medium mb-2">Selected</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 p-2 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-700 dark:text-blue-300">Valgt</span>
                </div>
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-2">
                Blå + ikon + tekst
              </div>
            </div>
          </div>
        </Card>

        {/* Component Boundaries */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-stone-600 dark:text-stone-400" />
            Component Boundaries
          </h2>

          <div className="space-y-4">
            {/* Image Gallery */}
            <div className="border-2 border-blue-300 dark:border-blue-700 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-900/10">
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
                Image Gallery Component
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-3 bg-stone-200 dark:bg-stone-700 p-8 rounded text-center text-xs text-stone-500">
                  Hero Image
                </div>
                <div className="space-y-1">
                  <div className="bg-stone-200 dark:bg-stone-700 p-2 rounded text-xs text-stone-500">T1</div>
                  <div className="bg-stone-200 dark:bg-stone-700 p-2 rounded text-xs text-stone-500">T2</div>
                  <div className="bg-stone-200 dark:bg-stone-700 p-2 rounded text-xs text-stone-500">T3</div>
                </div>
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400 mt-2">
                Boundary: Includes hero, thumbnails, navigation arrows, fullscreen button
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-2 border-green-300 dark:border-green-700 rounded-lg p-4 bg-green-50/50 dark:bg-green-900/10">
              <div className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                Tab Navigation Component
              </div>
              <div className="flex gap-2">
                <Badge className="bg-blue-600 text-white">Oversikt</Badge>
                <Badge variant="outline">Aktivitetskalender</Badge>
                <Badge variant="outline">Retningslinjer</Badge>
                <Badge variant="outline">FAQ</Badge>
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400 mt-2">
                Boundary: Includes all tabs, active state indicator, keyboard navigation
              </div>
            </div>

            {/* Booking Section */}
            <div className="border-2 border-purple-300 dark:border-purple-700 rounded-lg p-4 bg-purple-50/50 dark:bg-purple-900/10">
              <div className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
                Booking Section Component
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 bg-stone-200 dark:bg-stone-700 p-4 rounded text-xs text-stone-500 text-center">
                  Calendar Grid
                </div>
                <div className="bg-stone-200 dark:bg-stone-700 p-4 rounded text-xs text-stone-500 text-center">
                  Summary Panel
                </div>
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400 mt-2">
                Boundary: Includes stepper, calendar, selected times panel, tips panel
              </div>
            </div>
          </div>
        </Card>

        {/* Accessibility Annotations */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
            Accessibility Annotations
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">ARIA</Badge>
              <div>
                <div className="font-medium">Tabs:</div>
                <div className="text-stone-600 dark:text-stone-400 text-xs">
                  role="tablist", role="tab", aria-selected, aria-controls
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">ARIA</Badge>
              <div>
                <div className="font-medium">Calendar:</div>
                <div className="text-stone-600 dark:text-stone-400 text-xs">
                  role="gridcell", aria-label with date/time/availability
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">Keyboard</Badge>
              <div>
                <div className="font-medium">Navigation:</div>
                <div className="text-stone-600 dark:text-stone-400 text-xs">
                  Tab order follows visual flow, arrow keys for tabs/calendar, Enter/Space to activate
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">Focus</Badge>
              <div>
                <div className="font-medium">Focus Ring:</div>
                <div className="text-stone-600 dark:text-stone-400 text-xs">
                  2px solid #33649E, contrast ≥ 3:1, visible at all times
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
