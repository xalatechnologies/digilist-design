import { AppShell } from '../components/AppShell'
import { Calendar, Clock, MapPin, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function MyBookingsPage() {
  const bookings = [
    {
      id: 1,
      title: 'Meeting Room A',
      date: '2025-01-15',
      time: '10:00 - 12:00',
      location: 'City Hall, 2nd Floor',
      status: 'confirmed',
      statusLabel: 'Confirmed',
    },
    {
      id: 2,
      title: 'Sports Equipment Set',
      date: '2025-01-20',
      time: '14:00 - 16:00',
      location: 'Sports Center',
      status: 'pending',
      statusLabel: 'Pending Approval',
    },
    {
      id: 3,
      title: 'Community Hall',
      date: '2025-01-10',
      time: '18:00 - 22:00',
      location: 'Community Center',
      status: 'cancelled',
      statusLabel: 'Cancelled',
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
      default:
        return null
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default'
      case 'pending':
        return 'secondary'
      case 'cancelled':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            My Bookings
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            View and manage your bookings and reservations.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="bg-[#E6EEF7] border-[#33649E] text-[#33649E]">
            All
          </Button>
          <Button variant="outline" size="sm">
            Confirmed
          </Button>
          <Button variant="outline" size="sm">
            Pending
          </Button>
          <Button variant="outline" size="sm">
            Cancelled
          </Button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-stone-200 dark:border-stone-700 rounded-lg p-6 bg-white dark:bg-stone-900 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                {/* Left: Booking Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-1">
                        {booking.title}
                      </h3>
                      <Badge variant={getStatusBadgeVariant(booking.status) as any} className="w-fit">
                        <span className="flex items-center gap-1.5">
                          {getStatusIcon(booking.status)}
                          {booking.statusLabel}
                        </span>
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400 sm:col-span-2">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span>{booking.location}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col sm:flex-row gap-2 sm:items-start">
                  <Button
                    variant="outline"
                    size="sm"
                    className="sm:w-auto"
                  >
                    View Details
                  </Button>
                  {booking.status === 'confirmed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="sm:w-auto text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no bookings) */}
        {bookings.length === 0 && (
          <div className="text-center py-12 border border-stone-200 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900">
            <Calendar className="w-12 h-12 text-stone-400 dark:text-stone-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-2">
              No bookings yet
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              Start by searching for available listings.
            </p>
            <Button
              className="bg-[#33649E] text-white hover:bg-[#2C5688] focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
            >
              Browse Listings
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  )
}
