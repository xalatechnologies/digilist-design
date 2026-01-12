import React, { useState } from 'react'
import { MapPin, Heart, Share2, ChevronRight, Users, Mail, Phone, ChevronLeft, Projector, Wifi, Video, Check, AlertCircle, ArrowRight } from 'lucide-react'
import { Button, Tag, Tabs } from '@navikt/ds-react'
import { Card } from '@/components/ui/card'

/**
 * Mobile Screen Design for Listing Detail Page
 * Shows single-column layout with swipeable gallery, scrollable tabs, stacked booking section
 */
export default function ListingDetailMobile() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([])
  const [tabScrollIndex, setTabScrollIndex] = useState(0)

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
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 max-w-sm mx-auto">
      <main className="px-4 py-6 space-y-6">
        {/* Swipeable Hero Gallery */}
        <div className="relative">
          <div className="aspect-video bg-stone-200 dark:bg-stone-800 rounded-lg flex items-center justify-center relative overflow-hidden">
            <span className="text-stone-500 dark:text-white">Hero bilde {selectedImage + 1}</span>
            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    selectedImage === i ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Gå til bilde ${i + 1}`}
                />
              ))}
            </div>
            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {selectedImage + 1}/3
            </div>
          </div>
          {/* Thumbnail Strip */}
          <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(i - 1)}
                className={`flex-shrink-0 w-20 h-20 bg-stone-200 dark:bg-stone-800 rounded-lg flex items-center justify-center cursor-pointer border-2 ${
                  selectedImage === i - 1 ? 'border-brand-blue' : 'border-transparent'
                }`}
              >
                <span className="text-xs text-stone-500 dark:text-white">T{i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Listing Header */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-2 flex-1 min-w-0">
              <Tag variant="neutral" className="w-fit text-xs">
                {listing.type}
              </Tag>
              <h1 className="text-2xl font-bold text-stone-900 dark:text-white">{listing.name}</h1>
              <div className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-white">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{listing.address}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button variant="tertiary" size="small" className="h-9 w-9">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="tertiary" size="small" className="h-9 w-9">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Tabs with Navigation - Show 2 at a time */}
          <div className="relative -mx-4 px-4">
            <Tabs defaultValue="oversikt" className="w-full">
              <div className="relative flex items-center w-full">
                <Tabs.List className="flex-1 w-full">
                  <div className="flex items-center gap-0">
                    {/* First 2 tabs */}
                    {tabScrollIndex === 0 && (
                      <>
                        <Tabs.Tab
                          value="oversikt"
                          label="Oversikt"
                          className="text-sm whitespace-nowrap flex-1"
                        />
                        <Tabs.Tab
                          value="aktivitetskalender"
                          label="Aktivitetskalender"
                          className="text-sm whitespace-nowrap flex-1"
                        />
                      </>
                    )}
                    {/* Last 2 tabs */}
                    {tabScrollIndex === 1 && (
                      <>
                        <Tabs.Tab
                          value="retningslinjer"
                          label="Retningslinjer"
                          className="text-sm whitespace-nowrap flex-1"
                        />
                        <Tabs.Tab
                          value="faq"
                          label="FAQ"
                          className="text-sm whitespace-nowrap flex-1"
                        />
                      </>
                    )}
                  </div>
                </Tabs.List>
                {/* Navigation Button - Show ">" when on first 2 tabs */}
                {tabScrollIndex === 0 && (
                  <button
                    onClick={() => setTabScrollIndex(1)}
                    className="flex-shrink-0 p-2 text-stone-600 dark:text-white hover:text-stone-900 dark:hover:text-stone-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded"
                    aria-label="Neste tabs"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
                {/* Navigation Button - Show "<" when on last 2 tabs */}
                {tabScrollIndex === 1 && (
                  <button
                    onClick={() => setTabScrollIndex(0)}
                    className="flex-shrink-0 p-2 text-stone-600 dark:text-white hover:text-stone-900 dark:hover:text-stone-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded"
                    aria-label="Forrige tabs"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="mt-6">
                {/* Oversikt Tab - Includes sidebar cards */}
                <Tabs.Panel value="oversikt" className="space-y-6 mt-0">
                  <div>
                    <h2 className="text-lg font-semibold text-stone-900 dark:text-white mb-2">Beskrivelse</h2>
                    <p className="text-sm text-stone-600 dark:text-white leading-relaxed">{listing.description}</p>
                  </div>

                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-blue-light dark:bg-brand-blue/30 rounded-lg flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-brand-blue dark:text-brand-blue" />
                      </div>
                      <div>
                        <h3 className="text-xs font-medium text-stone-500 dark:text-white uppercase mb-1">
                          Maks tillatt
                        </h3>
                        <p className="text-xl font-bold text-stone-900 dark:text-white">{listing.capacity} personer</p>
                      </div>
                    </div>
                  </Card>

                  <div>
                    <h3 className="text-xs font-medium text-stone-500 dark:text-white uppercase mb-2">Fasiliteter</h3>
                    <div className="flex flex-wrap gap-2">
                      {listing.facilities.map((facility) => (
                        <Tag key={facility.label} variant="neutral" className="flex items-center gap-1.5 text-xs">
                          <facility.icon className="w-3 h-3" />
                          {facility.label}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium text-stone-500 dark:text-white uppercase mb-2">
                      Tilleggstjenester
                    </h3>
                    <div className="space-y-2">
                      {listing.additionalServices.map((service) => (
                        <div
                          key={service.name}
                          className="flex items-start gap-2 p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg"
                        >
                          <div className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium text-stone-900 dark:text-white block mb-1">
                                  {service.name}
                                </span>
                                <span className="text-xs text-stone-600 dark:text-white">{service.description}</span>
                              </div>
                              <Tag
                                variant="neutral"
                                className="bg-brand-blue-light dark:bg-brand-blue/20 text-brand-blue dark:text-brand-blue border-brand-blue/30 dark:border-brand-blue/50 shrink-0 text-xs"
                              >
                                +{service.price} kr
                              </Tag>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sidebar Cards - Only in Oversikt tab on mobile */}
                  <div className="space-y-4">
                    <Card className="p-4">
                      <h3 className="text-xs font-medium text-stone-500 dark:text-white uppercase mb-3">
                        Kontaktinformasjon
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-stone-600 dark:text-white">
                          <Mail className="w-4 h-4 shrink-0" />
                          <span className="break-all">E-post: {listing.contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-stone-600 dark:text-white">
                          <Phone className="w-4 h-4 shrink-0" />
                          <span>Telefon: {listing.contact.phone}</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h3 className="text-xs font-medium text-stone-500 dark:text-white uppercase mb-3">Lokasjon</h3>
                      <div className="aspect-video bg-stone-200 dark:bg-stone-800 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-stone-500 dark:text-white">Kart</span>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h3 className="text-xs font-medium text-stone-500 dark:text-white uppercase mb-3">Åpningstider</h3>
                      <div className="space-y-1.5 text-sm text-stone-600 dark:text-white">
                        <p>Mandag-Fredag: {listing.openingHours.mondayFriday}</p>
                        <p>Lørdag: {listing.openingHours.saturday}</p>
                        <p>Søndag: {listing.openingHours.sunday}</p>
                      </div>
                    </Card>
                  </div>
                </Tabs.Panel>

                {/* Other Tabs - Full Width */}
                <Tabs.Panel value="aktivitetskalender" className="mt-0">
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-stone-900 dark:text-white">
                      Aktivitetskalender
                    </h2>
                    <p className="text-sm text-stone-600 dark:text-white">
                      Listevisning per dag med tidsblokker (read-only kalendervisning)
                    </p>
                  </div>
                </Tabs.Panel>

                <Tabs.Panel value="retningslinjer" className="mt-0">
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-stone-900 dark:text-white">Retningslinjer</h2>
                    <p className="text-sm text-stone-600 dark:text-white">
                      Regelkort med kategori og "Påkrevd" badge kommer her.
                    </p>
                  </div>
                </Tabs.Panel>

                <Tabs.Panel value="faq" className="mt-0">
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-stone-900 dark:text-white">
                      Ofte stilte spørsmål
                    </h2>
                    <p className="text-sm text-stone-600 dark:text-white">
                      Accordion-liste med spørsmål og svar kommer her.
                    </p>
                  </div>
                </Tabs.Panel>
              </div>
            </Tabs>
          </div>

          {/* Booking Section - Stacked Below Content */}
          <Card className="p-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-white mb-1">Ledighetskalender</h2>
              <p className="text-xs text-stone-600 dark:text-white">Legg inn din reservasjon raskt og enkelt på 4 steg.</p>
            </div>

            {/* Compressed Stepper */}
            <div className="flex items-center gap-1 mb-4 pb-3 border-b border-stone-200 dark:border-stone-800 overflow-x-auto">
              <span className="px-2 py-1 bg-brand-blue text-white rounded text-xs font-medium whitespace-nowrap shrink-0">
                Velg tidspunkter
              </span>
              <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
              <span className="px-2 py-1 text-xs text-stone-600 dark:text-white whitespace-nowrap shrink-0">
                Detaljer
              </span>
              <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
              <span className="px-2 py-1 text-xs text-stone-600 dark:text-white whitespace-nowrap shrink-0">
                Bekreft
              </span>
              <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
              <span className="px-2 py-1 text-xs text-stone-600 dark:text-white whitespace-nowrap shrink-0">
                Sendt
              </span>
              <span className="ml-auto text-xs text-stone-500 dark:text-white whitespace-nowrap shrink-0">
                Steg 1 av 4
              </span>
            </div>

            <div className="space-y-4">
              {/* Calendar Navigation */}
              <div className="flex items-center justify-between">
                <button className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md">
                  <ChevronLeft className="w-4 h-4 text-stone-600 dark:text-white" />
                </button>
                <span className="text-xs font-medium text-stone-900 dark:text-white">12. - 18. Jan 2026</span>
                <button className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md">
                  <ChevronRight className="w-4 h-4 text-stone-600 dark:text-white" />
                </button>
              </div>

              {/* Calendar Grid - Responsive */}
              <div className="bg-stone-50 dark:bg-stone-800 rounded-lg p-3">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['MA', 'TI', 'ON', 'TO', 'FR', 'LØ', 'SØ'].map((day, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs font-medium text-stone-600 dark:text-white">{day}</div>
                      <div className="text-xs text-stone-500 dark:text-white">{[12, 13, 14, 15, 16, 17, 18][i]}</div>
                      {i === 0 && (
                        <Tag variant="neutral" className="text-xs mt-1">
                          I dag
                        </Tag>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-1">
                  {['08:00', '10:00', '12:00', '14:00'].map((time) => (
                    <div key={time} className="grid grid-cols-7 gap-1">
                      <div className="text-xs text-stone-600 dark:text-white py-1">{time}</div>
                      {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                        const slotId = `${day}-${time}`
                        const isSelected = selectedTimeSlots.includes(slotId)
                        const availability =
                          day === 0 && time === '08:00'
                            ? 'unavailable'
                            : day === 0 && time === '10:00'
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
                            className={`h-7 rounded text-xs font-medium transition-colors ${
                              availability === 'available'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : availability === 'booked'
                                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                  : availability === 'selected'
                                    ? 'bg-brand-blue text-white'
                                    : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-white'
                            }`}
                          >
                            {availability === 'selected' ? '✓' : ''}
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-700">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-100 dark:bg-green-900/30 rounded" />
                      <span className="text-stone-600 dark:text-white">Ledig</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-100 dark:bg-red-900/30 rounded" />
                      <span className="text-stone-600 dark:text-white">Opptatt</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-brand-blue rounded" />
                      <span className="text-stone-600 dark:text-white">Valgt</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Times Panel */}
              <Card className="p-3">
                <h3 className="text-sm font-medium text-stone-900 dark:text-white mb-2">Valgte tidspunkter</h3>
                {selectedTimeSlots.length === 0 ? (
                  <p className="text-xs text-stone-600 dark:text-white">
                    Klikk på ledige tidspunkter for å velge dem.
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {selectedTimeSlots.map((slot) => {
                      const [dayIndex, time] = slot.split('-')
                      const dates = [12, 13, 14, 15, 16, 17, 18]
                      const date = dates[parseInt(dayIndex)]
                      return (
                        <div
                          key={slot}
                          className="flex items-center justify-between gap-2 p-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded text-xs"
                        >
                          <span className="text-stone-700 dark:text-white">
                            {date}. jan, {time}
                          </span>
                          <button
                            onClick={() => setSelectedTimeSlots((prev) => prev.filter((id) => id !== slot))}
                            className="text-stone-400"
                          >
                            <ChevronRight className="w-3 h-3 rotate-45" />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </Card>

              {/* Tips Panel */}
              <Card className="p-3 bg-brand-blue-light dark:bg-brand-blue/20">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="w-3.5 h-3.5 text-brand-blue dark:text-brand-blue shrink-0 mt-0.5" />
                  <h3 className="text-sm font-medium text-brand-blue dark:text-brand-blue">Tips</h3>
                </div>
                <ul className="space-y-1 text-xs text-brand-blue dark:text-brand-blue list-disc list-inside mb-3">
                  <li>Klikk på ledige tidspunkter</li>
                  <li>Du kan velge flere samtidig</li>
                </ul>
                {selectedTimeSlots.length > 0 && (
                  <Button variant="primary" size="small" className="w-full">
                    Gå videre
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </Button>
                )}
              </Card>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
