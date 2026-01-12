import React, { useState } from 'react'
import { MapPin, Heart, Share2, ChevronRight, Users, Mail, Phone, ChevronLeft, Projector, Wifi, Video, Check, AlertCircle, ArrowRight, Maximize2 } from 'lucide-react'
import { Button, Tag, Tabs } from '@navikt/ds-react'
import { Card } from '@/components/ui/card'

/**
 * Desktop Screen Design for Listing Detail Page
 * Shows two-column layout with content left, sidebar right, booking section below
 */
export default function ListingDetailDesktop() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([])

  // Sample data from Section 3
  const listing = {
    name: 'Møterom 101',
    type: 'Space',
    address: 'Storgata 1, 0155 Oslo',
    description: 'Moderne møterom lokalisert i biblioteket. Egnet for foreninger, lag og mindre arrangementer. Passer godt til møter, kurs, workshops og interne samlinger. Rommet har moderne standard og tilrettelegging for møtevirksomhet. Tilbys for aktiviteter med begrenset antall deltakere.',
    capacity: 50,
    facilities: [
      { label: 'Projektor', icon: Projector },
      { label: 'WiFi', icon: Wifi },
      { label: 'Videokonferanse', icon: Video },
    ],
    additionalServices: [
      { name: 'Ekstra tid', description: 'Forleng bookingen med 30 minutter', price: 200 },
      { name: 'Vaktmesterhjelp', description: 'Hjelp med oppsett og nedrigg av utstyr', price: 300 },
    ],
    contact: {
      email: 'kontakt@digilist.no',
      phone: '+47 12 34 56 78',
    },
    openingHours: {
      mondayFriday: '08:00 - 22:00',
      saturday: '09:00 - 20:00',
      sunday: '10:00 - 18:00',
    },
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Media Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3 relative group">
              <div className="aspect-video bg-stone-200 dark:bg-stone-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                <span className="text-stone-500 dark:text-white">Hero bilde {selectedImage + 1}</span>
                {/* Navigation Arrows */}
                <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-stone-900/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white dark:hover:bg-stone-800">
                  <ChevronLeft className="w-5 h-5 text-stone-700 dark:text-white" />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-stone-900/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white dark:hover:bg-stone-800">
                  <ChevronRight className="w-5 h-5 text-stone-700 dark:text-white" />
                </button>
                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {selectedImage + 1}/3
                </div>
                {/* Fullscreen Icon */}
                <button className="absolute bottom-4 right-4 w-8 h-8 bg-white/90 dark:bg-stone-900/90 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white dark:hover:bg-stone-800">
                  <Maximize2 className="w-4 h-4 text-stone-700 dark:text-white" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(i - 1)}
                  className={`aspect-video bg-stone-200 dark:bg-stone-800 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity border-2 ${
                    selectedImage === i - 1 ? 'border-brand-blue' : 'border-transparent'
                  }`}
                >
                  <span className="text-xs text-stone-500 dark:text-white">Thumb {i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Listing Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Tag variant="neutral" className="w-fit">
                  {listing.type}
                </Tag>
                <h1 className="text-3xl font-bold text-stone-900 dark:text-white">{listing.name}</h1>
                <div className="flex items-center gap-2 text-stone-600 dark:text-white">
                  <MapPin className="w-4 h-4" />
                  <span>{listing.address}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="tertiary" size="small" className="shrink-0">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="tertiary" size="small" className="shrink-0">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="oversikt" className="w-full">
              <Tabs.List className="w-full">
                <Tabs.Tab value="oversikt" label="Oversikt" />
                <Tabs.Tab value="aktivitetskalender" label="Aktivitetskalender" />
                <Tabs.Tab value="retningslinjer" label="Retningslinjer" />
                <Tabs.Tab value="faq" label="FAQ" />
              </Tabs.List>

              <div className="mt-8">
                {/* Oversikt Tab - Two Column Layout */}
                <Tabs.Panel value="oversikt" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-stone-900 dark:text-white mb-3">Beskrivelse</h2>
                        <p className="text-stone-600 dark:text-white leading-relaxed">{listing.description}</p>
                      </div>

                      <Card className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-brand-blue-light dark:bg-brand-blue/30 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-brand-blue dark:text-brand-blue" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-stone-500 dark:text-white uppercase mb-1">
                              Maks tillatt
                            </h3>
                            <p className="text-2xl font-bold text-stone-900 dark:text-white">{listing.capacity} personer</p>
                          </div>
                        </div>
                      </Card>

                      <div>
                        <h3 className="text-sm font-medium text-stone-500 dark:text-white uppercase mb-3">Fasiliteter</h3>
                        <div className="flex flex-wrap gap-2">
                          {listing.facilities.map((facility) => (
                            <Tag key={facility.label} variant="neutral" className="flex items-center gap-1.5">
                              <facility.icon className="w-3.5 h-3.5" />
                              {facility.label}
                            </Tag>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-stone-500 dark:text-white uppercase mb-3">
                          Tilleggstjenester
                        </h3>
                        <div className="space-y-2">
                          {listing.additionalServices.map((service) => (
                            <div
                              key={service.name}
                              className="flex items-start gap-3 p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg"
                            >
                              <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1">
                                    <span className="text-stone-900 dark:text-white font-medium block mb-1">
                                      {service.name}
                                    </span>
                                    <span className="text-sm text-stone-600 dark:text-white">{service.description}</span>
                                  </div>
                                  <Tag
                                    variant="neutral"
                                    className="bg-brand-blue-light dark:bg-brand-blue/20 text-brand-blue dark:text-brand-blue border-brand-blue/30 dark:border-brand-blue/50 shrink-0"
                                  >
                                    +{service.price} kr
                                  </Tag>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Side Column - Only visible in Oversikt tab */}
                    <div className="space-y-6">
                      <Card className="p-4">
                        <h3 className="text-sm font-medium text-stone-500 dark:text-white uppercase mb-3">
                          Kontaktinformasjon
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-2 text-stone-600 dark:text-white">
                            <Mail className="w-4 h-4 shrink-0" />
                            <span>E-post: {listing.contact.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-stone-600 dark:text-white">
                            <Phone className="w-4 h-4 shrink-0" />
                            <span>Telefon: {listing.contact.phone}</span>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h3 className="text-sm font-medium text-stone-500 dark:text-white uppercase mb-3">Lokasjon</h3>
                        <div className="aspect-video bg-stone-200 dark:bg-stone-800 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-stone-500 dark:text-white">Kart</span>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h3 className="text-sm font-medium text-stone-500 dark:text-white uppercase mb-3">Åpningstider</h3>
                        <div className="space-y-2 text-sm text-stone-600 dark:text-white">
                          <p>Mandag-Fredag: {listing.openingHours.mondayFriday}</p>
                          <p>Lørdag: {listing.openingHours.saturday}</p>
                          <p>Søndag: {listing.openingHours.sunday}</p>
                        </div>
                      </Card>
                      </div>
                    </div>
                  </Tabs.Panel>

                  {/* Other Tabs - Full Width */}
                  <div className="lg:col-span-2">
                    <Tabs.Panel value="aktivitetskalender" className="mt-0">
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
                          Aktivitetskalender
                        </h2>
                        <p className="text-stone-600 dark:text-white">
                          Listevisning per dag med tidsblokker (read-only kalendervisning)
                        </p>
                      </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="retningslinjer" className="mt-0">
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-stone-900 dark:text-white">Retningslinjer</h2>
                        <p className="text-stone-600 dark:text-white">
                          Regelkort med kategori og "Påkrevd" badge kommer her.
                        </p>
                      </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="faq" className="mt-0">
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
                          Ofte stilte spørsmål
                        </h2>
                        <p className="text-stone-600 dark:text-white">
                          Accordion-liste med spørsmål og svar kommer her.
                        </p>
                      </div>
                    </Tabs.Panel>
                  </div>
                </div>
              </Tabs>

            {/* Booking Section */}
            <Card className="mt-12 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-stone-900 dark:text-white mb-1">Ledighetskalender</h2>
                <p className="text-sm text-stone-600 dark:text-white">
                  Legg inn din reservasjon raskt og enkelt på 4 steg.
                </p>
              </div>

              {/* Stepper */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2 flex-1">
                  <span className="px-3 py-1.5 bg-brand-blue text-white rounded-md text-sm font-medium">
                    Velg tidspunkter
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                  <span className="px-3 py-1.5 text-sm text-stone-600 dark:text-white">Detaljer og vilkår</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                  <span className="px-3 py-1.5 text-sm text-stone-600 dark:text-white">Bekreft</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                  <span className="px-3 py-1.5 text-sm text-stone-600 dark:text-white">Sendt</span>
                </div>
                <span className="text-sm text-stone-500 dark:text-white">Steg 1 av 4</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <button className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md">
                      <ChevronLeft className="w-5 h-5 text-stone-600 dark:text-white" />
                    </button>
                    <span className="text-sm font-medium text-stone-900 dark:text-white">
                      12. - 18. Januar 2026
                    </span>
                    <button className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md">
                      <ChevronRight className="w-5 h-5 text-stone-600 dark:text-white" />
                    </button>
                  </div>

                  <div className="bg-stone-50 dark:bg-stone-800 rounded-lg p-4">
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['MAN 12', 'TIR 13', 'ONS 14', 'TOR 15', 'FRE 16', 'LØR 17', 'SØN 18'].map((day, i) => (
                        <div key={i} className="text-center">
                          <div className="text-xs font-medium text-stone-600 dark:text-white mb-1">{day}</div>
                          {i === 0 && (
                            <Tag variant="neutral" className="text-xs">
                              I dag
                            </Tag>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'].map((time) => (
                        <div key={time} className="grid grid-cols-7 gap-2">
                          <div className="text-xs text-stone-600 dark:text-white py-2">{time}</div>
                          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                            const slotId = `${day}-${time}`
                            const isSelected = selectedTimeSlots.includes(slotId)
                            const availability =
                              day === 0 && time === '08:00'
                                ? 'unavailable'
                                : day === 0 && time === '09:00'
                                  ? 'booked'
                                  : isSelected
                                    ? 'selected'
                                    : 'available'
                            return (
                              <button
                                key={day}
                                onClick={() => {
                                  if (availability === 'available') {
                                    setSelectedTimeSlots((prev) =>
                                      prev.includes(slotId) ? prev.filter((id) => id !== slotId) : [...prev, slotId]
                                    )
                                  }
                                }}
                                disabled={availability === 'unavailable' || availability === 'booked'}
                                className={`h-8 rounded text-xs font-medium transition-colors ${
                                  availability === 'available'
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 cursor-pointer'
                                    : availability === 'booked'
                                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 cursor-not-allowed'
                                      : availability === 'selected'
                                        ? 'bg-brand-blue text-white cursor-pointer'
                                        : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-white cursor-not-allowed'
                                }`}
                              >
                                {availability === 'available'
                                  ? 'Ledig'
                                  : availability === 'booked'
                                    ? 'Opptatt'
                                    : availability === 'selected'
                                      ? 'Valgt'
                                      : ''}
                              </button>
                            )
                          })}
                        </div>
                      ))}
                    </div>

                    {/* Legend */}
                    <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700">
                      <div className="flex flex-wrap gap-4 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-100 dark:bg-green-900/30 rounded" />
                          <span className="text-stone-600 dark:text-white">Ledig</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-red-100 dark:bg-red-900/30 rounded" />
                          <span className="text-stone-600 dark:text-white">Opptatt</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-brand-blue rounded" />
                          <span className="text-stone-600 dark:text-white">Valgt</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-stone-200 dark:bg-stone-700 rounded" />
                          <span className="text-stone-600 dark:text-white">Ikke tilgjengelig</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel */}
                <div className="space-y-4">
                  <Card className="p-4">
                    <h3 className="font-medium text-stone-900 dark:text-white mb-3">Valgte tidspunkter</h3>
                    {selectedTimeSlots.length === 0 ? (
                      <p className="text-sm text-stone-600 dark:text-white">
                        Klikk på ledige tidspunkter for å velge dem. Du kan velge flere tidspunkter samtidig.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {selectedTimeSlots.map((slot) => {
                          const [dayIndex, time] = slot.split('-')
                          const dates = [12, 13, 14, 15, 16, 17, 18]
                          const date = dates[parseInt(dayIndex)]
                          const endTime = time.replace(/(\d+):00/, (_, h) => `${parseInt(h) + 2}:00`)
                          return (
                            <div
                              key={slot}
                              className="flex items-center justify-between gap-2 p-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded text-sm"
                            >
                              <span className="text-stone-700 dark:text-white">
                                {date}. januar 2026, {time} - {endTime}
                              </span>
                              <button
                                onClick={() => setSelectedTimeSlots((prev) => prev.filter((id) => id !== slot))}
                                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                                aria-label="Fjern tidspunkt"
                              >
                                <ChevronRight className="w-4 h-4 rotate-45" />
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </Card>
                  <Card className="p-4 bg-brand-blue-light dark:bg-brand-blue/20">
                    <div className="flex items-start gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-brand-blue dark:text-brand-blue shrink-0 mt-0.5" />
                      <h3 className="font-medium text-brand-blue dark:text-brand-blue">Tips</h3>
                    </div>
                    <ul className="space-y-1.5 text-sm text-brand-blue dark:text-brand-blue list-disc list-inside mb-4">
                      <li>Klikk på ledige tidspunkter for å velge dem</li>
                      <li>Du kan velge flere tidspunkter samtidig</li>
                      <li>Du kan booke flere dager samtidig</li>
                      <li>Bytt mellom soner ved å bruke navigasjonen</li>
                    </ul>
                    {selectedTimeSlots.length > 0 && (
                      <Button variant="primary" className="w-full">
                        Gå videre
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
