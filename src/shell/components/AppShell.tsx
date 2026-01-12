import React, { useState } from 'react'
import { Search, LogIn, Home, MapPin, Heart, Share2, ChevronRight, Users, Mail, Phone, ChevronLeft, Calendar as CalendarIcon, Projector, Presentation, Wifi, Video, Clock, Wrench, Shield, AlertCircle, Check, Maximize2, ArrowRight } from 'lucide-react'
import { Button, TextField, Tag, Tabs } from '@navikt/ds-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface AppShellProps {
  children?: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
  listingName?: string
  listingType?: string
  address?: string
  activeTab?: 'oversikt' | 'aktivitetskalender' | 'retningslinjer' | 'faq'
}

export function AppShell({
  children,
  breadcrumbs = [
    { label: 'Hjem', href: '/' },
    { label: 'Fasiliteter', href: '/fasiliteter' },
    { label: 'Møterom 101' },
  ],
  listingName = 'Møterom 101',
  listingType = 'Rom',
  address = 'Storgata 1, 0155 Oslo',
  activeTab = 'oversikt',
}: AppShellProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([])
  const [tabScrollIndex, setTabScrollIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState('2026-01-12') // Format: YYYY-MM-DD
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState(new Date(2026, 0, 12)) // January 2026
  const [bookingStep, setBookingStep] = useState(1) // 1-4: Velg tidspunkter, Detaljer, Bekreft, Sendt
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
      >
        Hopp til innhold
      </a>

      {/* Global Header */}
      <header className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-2 sm:gap-4 h-16">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded-md px-2 py-1 -ml-2 shrink-0"
            >
              <div className="w-8 h-8 bg-brand-blue rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">DL</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-stone-900 dark:text-stone-100">DIGILIST</div>
                <div className="text-xs text-stone-500 dark:text-white">ENKEL BOOKING</div>
              </div>
            </a>

            {/* Search Field - Responsive, shrinks when needed */}
            <div className="flex-1 min-w-0 max-w-2xl mx-auto">
              <TextField
                type="text"
                label="Søk etter fasiliteter"
                hideLabel
                placeholder="Søk etter fasiliteter…"
                className="w-full"
              />
            </div>

            {/* Logg inn Button */}
            <Button
              variant="primary"
              size="small"
              className="shrink-0 bg-brand-blue hover:bg-brand-blue-dark text-white border-none"
            >
              Logg inn
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav
          className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800"
          aria-label="Breadcrumb"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3">
            <ol className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1
                return (
                  <li key={index} className="flex items-center gap-2">
                    {index > 0 && (
                      <ChevronRight className="w-4 h-4 text-stone-400 dark:text-white" />
                    )}
                    {crumb.href && !isLast ? (
                      <a
                        href={crumb.href}
                        className="text-stone-600 dark:text-white hover:text-stone-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded px-1 py-0.5 transition-colors"
                      >
                        {crumb.label}
                      </a>
                    ) : (
                      <span
                        className={isLast ? 'text-stone-900 dark:text-white font-medium' : 'text-stone-600 dark:text-white'}
                        aria-current={isLast ? 'page' : undefined}
                      >
                        {crumb.label}
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        {children || (
          <div className="space-y-8">
            {/* Media Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3 relative group">
                <div className="aspect-video bg-stone-200 dark:bg-stone-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <span className="text-stone-500 dark:text-white">Hero bilde</span>
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
              <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
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
                  <Tag variant="neutral" className="w-fit !dark:text-white">
                    {listingType}
                  </Tag>
                  <h1 className="text-3xl font-bold text-stone-900 dark:text-white">{listingName}</h1>
                  <div className="flex items-center gap-2 text-stone-600 dark:text-white">
                    <MapPin className="w-4 h-4" />
                    <span>{address}</span>
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
              <Tabs defaultValue={activeTab} className="w-full">
                {/* Desktop: All tabs visible */}
                <div className="hidden md:block relative w-full">
                  <Tabs.List className="w-full">
                    <Tabs.Tab
                      value="oversikt"
                      label="Oversikt"
                    />
                    <Tabs.Tab
                      value="aktivitetskalender"
                      label="Aktivitetskalender"
                    />
                    <Tabs.Tab
                      value="retningslinjer"
                      label="Retningslinjer"
                    />
                    <Tabs.Tab
                      value="faq"
                      label="FAQ"
                    />
                  </Tabs.List>
                </div>

                {/* Mobile: Show 2 tabs at a time */}
                <div className="md:hidden relative">
                  <div className="relative flex items-center">
                    <Tabs.List className="flex-1">
                      {tabScrollIndex === 0 ? (
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
                      ) : (
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
                    </Tabs.List>
                    {/* Mobile Navigation Buttons */}
                    <div className="absolute right-0 top-0 bottom-0 flex items-center pr-2">
                      {tabScrollIndex === 0 && (
                        <button
                          onClick={() => setTabScrollIndex(1)}
                          className="flex-shrink-0 p-2 text-stone-600 dark:text-white hover:text-stone-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded"
                          aria-label="Neste tabs"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      )}
                      {tabScrollIndex === 1 && (
                        <button
                          onClick={() => setTabScrollIndex(0)}
                          className="flex-shrink-0 p-2 text-stone-600 dark:text-white hover:text-stone-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded"
                          aria-label="Forrige tabs"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  {/* Oversikt Tab - Two Column Layout */}
                  <Tabs.Panel value="oversikt" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Main Content Column */}
                      <div className="md:col-span-2 space-y-6">
                        <div>
                          <h2 className="text-xl font-semibold text-stone-900 dark:text-white mb-3">Beskrivelse</h2>
                          <p className="text-stone-600 dark:text-white leading-relaxed">
                            Dette er et eksempel på beskrivelse av fasiliteten. Her kan det stå informasjon om rommet,
                            utstyret eller tjenesten som listes.
                          </p>
                        </div>

                        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-blue-light dark:bg-brand-blue/30 rounded-lg flex items-center justify-center">
                              <Users className="w-5 h-5 text-brand-blue dark:text-brand-blue" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-stone-500 dark:text-white uppercase mb-1">
                                Maks tillatt
                              </h3>
                              <p className="text-2xl font-bold text-stone-900 dark:text-white">50 personer</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-stone-500 dark:text-white uppercase mb-3">
                            Fasiliteter
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { name: 'Projektor', icon: Projector },
                              { name: 'Tavle', icon: Presentation },
                              { name: 'WiFi', icon: Wifi },
                              { name: 'Videokonferanse', icon: Video },
                            ].map((facility) => (
                              <Tag key={facility.name} variant="neutral" className="flex items-center gap-1.5 !dark:text-white">
                                <facility.icon className="w-3.5 h-3.5 dark:text-white" />
                                {facility.name}
                              </Tag>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-stone-500 dark:text-white uppercase mb-3">
                            Tilleggstjenester
                          </h3>
                          <div className="space-y-2">
                            {[
                              { name: 'Ekstra tid', description: 'Forleng bookingen med 30 minutter', price: '+200 kr' },
                              { name: 'Utstyr', description: 'Inkluderer ballnett, musikanlegg og annet utstyr', price: '+150 kr' },
                              { name: 'Vaktmesterhjelp', description: 'Hjelp med oppsett og nedrigg av utstyr', price: '+300 kr' },
                              { name: 'Sikkerhet', description: 'Vaktmester til stede under hele arrangementet', price: '+500 kr' },
                            ].map((service) => (
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
                                      <span className="text-stone-900 dark:text-white font-medium block mb-1">{service.name}</span>
                                      <span className="text-sm text-stone-600 dark:text-white">{service.description}</span>
                                    </div>
                                    <Tag variant="neutral" className="bg-brand-blue-light dark:bg-brand-blue/20 text-brand-blue dark:text-brand-blue border-brand-blue/30 dark:border-brand-blue/50 shrink-0">
                                      {service.price}
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
                        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-stone-500 dark:text-white uppercase mb-3">
                            Kontaktinformasjon
                          </h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2 text-stone-600 dark:text-white">
                              <Mail className="w-4 h-4 shrink-0" />
                              <span>E-post: kontakt@digilist.no</span>
                            </div>
                            <div className="flex items-center gap-2 text-stone-600 dark:text-white">
                              <Phone className="w-4 h-4 shrink-0" />
                              <span>Telefon: +47 12 34 56 78</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-stone-500 dark:text-white uppercase mb-3">
                            Lokasjon
                          </h3>
                          <div className="aspect-video bg-stone-200 dark:bg-stone-800 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-stone-500 dark:text-white">Kart</span>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-stone-500 dark:text-white uppercase mb-3">
                            Åpningstider
                          </h3>
                          <div className="space-y-2 text-sm text-stone-600 dark:text-white">
                            <p>Mandag-Fredag: 08:00 - 22:00</p>
                            <p>Lørdag: 09:00 - 20:00</p>
                            <p>Søndag: 10:00 - 18:00</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tabs.Panel>

                  {/* Other Tabs - Full Width */}
                  <div className="md:col-span-2">
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
                        <div className="space-y-3">
                          {[
                            { title: 'Røyking forbudt', category: 'SAFETY', required: true },
                            { title: 'Rydd opp etter bruk', category: 'CLEANING', required: true },
                            { title: 'Maks 20 personer', category: 'BOOKING', required: false },
                          ].map((rule, i) => (
                            <div
                              key={i}
                              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-stone-900 dark:text-white">{rule.title}</span>
                                    {rule.required && (
                                      <Tag variant="error" className="text-xs">
                                        Påkrevd
                                      </Tag>
                                    )}
                                  </div>
                                  <span className="text-xs text-stone-500 dark:text-white">{rule.category}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
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
              <div className="mt-12 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4 md:p-6">
                <div className="mb-4 md:mb-6">
                  <h2 className="text-lg md:text-xl font-semibold text-stone-900 dark:text-white mb-1">
                    Ledighetskalender
                  </h2>
                  <p className="text-xs md:text-sm text-stone-600 dark:text-white">
                    Legg inn din reservasjon raskt og enkelt på 4 steg.
                  </p>
                </div>

                {/* Stepper - Desktop */}
                <div className="hidden md:flex items-center justify-between mb-6 pb-4 border-b border-stone-200 dark:border-stone-800">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="px-3 py-1.5 bg-brand-blue text-white rounded-md text-sm font-medium">
                      Velg tidspunkter
                    </span>
                    <ChevronRight className="w-4 h-4 text-stone-400 dark:text-white" />
                    <span className="px-3 py-1.5 text-sm text-stone-600 dark:text-white">Detaljer og vilkår</span>
                    <ChevronRight className="w-4 h-4 text-stone-400 dark:text-white" />
                    <span className="px-3 py-1.5 text-sm text-stone-600 dark:text-white">Bekreft</span>
                    <ChevronRight className="w-4 h-4 text-stone-400 dark:text-white" />
                    <span className="px-3 py-1.5 text-sm text-stone-600 dark:text-white">Sendt</span>
                  </div>
                  <span className="text-sm text-stone-500 dark:text-white">Steg 1 av 4</span>
                </div>

                {/* Stepper - Mobile (One step at a time) */}
                <div className="md:hidden flex items-center justify-between mb-4 pb-3 border-b border-stone-200 dark:border-stone-800">
                  <div className="flex items-center gap-2 flex-1">
                    {/* Previous button */}
                    {bookingStep > 1 && (
                      <button
                        onClick={() => setBookingStep(bookingStep - 1)}
                        className="p-1 text-stone-600 dark:text-white hover:text-stone-900 dark:hover:text-white transition-colors"
                        aria-label="Forrige steg"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    )}
                    {/* Current step */}
                    <span className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap ${
                      bookingStep === 1 ? 'bg-brand-blue text-white' :
                      bookingStep === 2 ? 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-white' :
                      bookingStep === 3 ? 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-white' :
                      'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-white'
                    }`}>
                      {bookingStep === 1 && 'Velg tidspunkter'}
                      {bookingStep === 2 && 'Detaljer'}
                      {bookingStep === 3 && 'Bekreft'}
                      {bookingStep === 4 && 'Sendt'}
                    </span>
                    {/* Next button */}
                    {bookingStep < 4 && (
                      <button
                        onClick={() => setBookingStep(bookingStep + 1)}
                        className="p-1 text-stone-600 dark:text-white hover:text-stone-900 dark:hover:text-white transition-colors"
                        aria-label="Neste steg"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <span className="text-xs text-stone-500 dark:text-white whitespace-nowrap shrink-0 ml-2">
                    Steg {bookingStep} av 4
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {/* Calendar */}
                  <div className="md:col-span-2 space-y-3 md:space-y-4">
                    {/* Calendar Navigation */}
                    {/* Desktop: Week navigation */}
                    <div className="hidden md:flex items-center justify-between">
                      <button className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md">
                        <ChevronLeft className="w-5 h-5 text-stone-600 dark:text-white" />
                      </button>
                      <span className="text-sm font-medium text-stone-900 dark:text-white">
                        12. - 18. Jan 2026
                      </span>
                      <button className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md">
                        <ChevronRight className="w-5 h-5 text-stone-600 dark:text-white" />
                      </button>
                    </div>
                    {/* Mobile: Date picker with calendar dropdown */}
                    <div className="md:hidden">
                      <label htmlFor="date-select" className="block text-xs font-medium text-stone-700 dark:text-white mb-2">
                        Velg dag
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setCalendarOpen(!calendarOpen)}
                          className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-md text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue text-left flex items-center justify-between"
                        >
                          <span>
                            {(() => {
                              // Parse date string (YYYY-MM-DD) as local date to avoid timezone issues
                              const [year, month, day] = selectedDate.split('-').map(Number)
                              const dateObj = new Date(year, month - 1, day)
                              const dayNames = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
                              const dayName = dayNames[dateObj.getDay()]
                              const dayNumber = dateObj.getDate()
                              const monthNames = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']
                              const monthName = monthNames[dateObj.getMonth()]
                              return `${dayName} ${dayNumber}. ${monthName} ${dateObj.getFullYear()}`
                            })()}
                          </span>
                          <CalendarIcon className="w-4 h-4 text-stone-400 dark:text-white" />
                        </button>
                        {calendarOpen && (
                          <div className="absolute z-50 mt-1 w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-md shadow-lg p-3">
                            {/* Calendar Navigation */}
                            <div className="flex items-center justify-between mb-3">
                              <button
                                onClick={() => {
                                  const newMonth = new Date(calendarMonth)
                                  newMonth.setMonth(newMonth.getMonth() - 1)
                                  setCalendarMonth(newMonth)
                                }}
                                className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded"
                                disabled={(() => {
                                  const today = new Date()
                                  const prevMonth = new Date(calendarMonth)
                                  prevMonth.setMonth(prevMonth.getMonth() - 1)
                                  return prevMonth < today && prevMonth.getMonth() !== today.getMonth()
                                })()}
                              >
                                <ChevronLeft className="w-4 h-4 text-stone-600 dark:text-white" />
                              </button>
                              <div className="text-sm font-medium text-stone-900 dark:text-white">
                                {(() => {
                                  const monthNames = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']
                                  return `${monthNames[calendarMonth.getMonth()]} ${calendarMonth.getFullYear()}`
                                })()}
                              </div>
                              <button
                                onClick={() => {
                                  const newMonth = new Date(calendarMonth)
                                  newMonth.setMonth(newMonth.getMonth() + 1)
                                  setCalendarMonth(newMonth)
                                }}
                                disabled={(() => {
                                  const maxDate = new Date()
                                  maxDate.setMonth(maxDate.getMonth() + 4)
                                  const nextMonth = new Date(calendarMonth)
                                  nextMonth.setMonth(nextMonth.getMonth() + 1)
                                  return nextMonth > maxDate
                                })()}
                                className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <ChevronRight className="w-4 h-4 text-stone-600 dark:text-white" />
                              </button>
                            </div>
                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {['MA', 'TI', 'ON', 'TO', 'FR', 'LØ', 'SØ'].map((day) => (
                                <div key={day} className="text-center text-xs font-medium text-stone-500 dark:text-white py-1">
                                  {day}
                                </div>
                              ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                              {(() => {
                                const year = calendarMonth.getFullYear()
                                const month = calendarMonth.getMonth()
                                const firstDay = new Date(year, month, 1)
                                const lastDay = new Date(year, month + 1, 0)
                                const startDate = new Date(firstDay)
                                startDate.setDate(startDate.getDate() - startDate.getDay() + (startDate.getDay() === 0 ? -6 : 1)) // Start on Monday
                                const today = new Date()
                                today.setHours(0, 0, 0, 0)
                                const maxDate = new Date()
                                maxDate.setMonth(maxDate.getMonth() + 4)
                                maxDate.setHours(23, 59, 59, 999)
                                const days = []
                                for (let i = 0; i < 42; i++) {
                                  const date = new Date(startDate)
                                  date.setDate(startDate.getDate() + i)
                                  // Format date as YYYY-MM-DD using local timezone
                                  const year = date.getFullYear()
                                  const monthNum = date.getMonth() + 1
                                  const dayNum = date.getDate()
                                  const dateStr = `${year}-${String(monthNum).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
                                  const isCurrentMonth = date.getMonth() === month
                                  // Compare dates using local timezone
                                  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
                                  const isToday = dateStr === todayStr
                                  const isSelected = dateStr === selectedDate
                                  const isDisabled = date < today || date > maxDate
                                  days.push(
                                    <button
                                      key={i}
                                      onClick={() => {
                                        if (!isDisabled) {
                                          setSelectedDate(dateStr)
                                          setCalendarOpen(false)
                                        }
                                      }}
                                      disabled={isDisabled}
                                      className={`h-8 text-xs rounded transition-colors ${
                                        !isCurrentMonth
                                          ? 'text-stone-300 dark:text-stone-600'
                                          : isDisabled
                                            ? 'text-stone-300 dark:text-stone-600 cursor-not-allowed'
                                            : isSelected
                                              ? 'bg-brand-blue text-white'
                                              : isToday
                                                ? 'bg-brand-blue-light dark:bg-brand-blue/30 text-brand-blue dark:text-white'
                                                : 'text-stone-700 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                                      }`}
                                    >
                                      {date.getDate()}
                                    </button>
                                  )
                                }
                                return days
                              })()}
                            </div>
                          </div>
                        )}
                      </div>
                      {/* Click outside to close */}
                      {calendarOpen && (
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setCalendarOpen(false)}
                        />
                      )}
                    </div>

                    {/* Calendar Grid */}
                    <div className="bg-stone-50 dark:bg-stone-800 rounded-lg p-3 md:p-4">
                      {/* Desktop Day Headers */}
                      <div className="hidden md:grid grid-cols-8 gap-2 mb-4">
                        {/* Empty cell for time column */}
                        <div></div>
                        {['MAN 12', 'TIR 13', 'ONS 14', 'TOR 15', 'FRE 16', 'LØR 17', 'SØN 18'].map((day, i) => (
                          <div key={i} className="text-center">
                            <div className="text-xs font-medium text-stone-600 dark:text-white mb-1">{day}</div>
                            {i === 0 && (
                              <Tag variant="neutral" className="text-xs !dark:text-white">
                                I dag
                              </Tag>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Mobile: Single Day Header */}
                      <div className="md:hidden mb-4 pb-3 border-b border-stone-200 dark:border-stone-700">
                        {(() => {
                          // Parse date string (YYYY-MM-DD) as local date to avoid timezone issues
                          const [year, month, day] = selectedDate.split('-').map(Number)
                          const dateObj = new Date(year, month - 1, day)
                          const dayNames = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
                          const dayName = dayNames[dateObj.getDay()]
                          const dayNumber = dateObj.getDate()
                          const monthNames = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']
                          const monthName = monthNames[dateObj.getMonth()]
                          // Check if selected date is today
                          const today = new Date()
                          today.setHours(0, 0, 0, 0)
                          const selectedDateObj = new Date(year, month - 1, day)
                          selectedDateObj.setHours(0, 0, 0, 0)
                          const isToday = selectedDateObj.getTime() === today.getTime()
                          return (
                            <div className="text-center">
                              <div className="text-sm font-medium text-stone-900 dark:text-white">
                                {dayName} {dayNumber}. {monthName}
                              </div>
                              {isToday && (
                                <Tag variant="neutral" className="text-xs mt-1 !dark:text-white">
                                  I dag
                                </Tag>
                              )}
                            </div>
                          )
                        })()}
                      </div>

                      {/* Time Slots */}
                      <div className="space-y-1 md:space-y-2">
                        {/* Mobile: Show single day with all time slots */}
                        <div className="md:hidden space-y-2">
                          {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map((time) => {
                            const slotId = `${selectedDate}-${time}`
                            const isSelected = selectedTimeSlots.includes(slotId)
                            // Simulate availability based on date and time
                            const availability = 
                              selectedDate === '2026-01-12' && time === '08:00' ? 'unavailable' :
                              selectedDate === '2026-01-12' && time === '10:00' ? 'booked' :
                              selectedDate === '2026-01-14' && time === '12:00' ? 'booked' :
                              isSelected ? 'selected' : 'available'
                            return (
                              <button
                                key={time}
                                onClick={() => {
                                  if (availability === 'available') {
                                    setSelectedTimeSlots((prev) =>
                                      prev.includes(slotId) ? prev.filter((id) => id !== slotId) : [...prev, slotId]
                                    )
                                  }
                                }}
                                disabled={availability === 'unavailable' || availability === 'booked'}
                                className={`w-full flex items-center justify-between p-3 rounded-md text-sm font-medium transition-colors ${
                                  availability === 'available'
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-white hover:bg-green-200 dark:hover:bg-green-900/50'
                                    : availability === 'booked'
                                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-white cursor-not-allowed'
                                      : availability === 'selected'
                                        ? 'bg-brand-blue text-white'
                                        : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-white cursor-not-allowed'
                                }`}
                              >
                                <span>{time}</span>
                                <span className="text-xs">
                                  {availability === 'available' ? 'Ledig' : 
                                   availability === 'booked' ? 'Opptatt' : 
                                   availability === 'selected' ? '✓ Valgt' : 
                                   'Ikke tilgjengelig'}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                        {/* Desktop: Show all time slots in week grid */}
                        <div className="hidden md:block space-y-2">
                          {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                            <div key={time} className="grid grid-cols-8 gap-2">
                              {/* Time column */}
                              <div className="text-xs font-medium text-stone-600 dark:text-white py-2 flex items-center">
                                {time}
                              </div>
                              {/* Day columns */}
                              {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                                const slotId = `${day}-${time}`
                                const isSelected = selectedTimeSlots.includes(slotId)
                                const availability = day === 0 && time === '08:00' ? 'unavailable' : day === 2 && time === '10:00' ? 'booked' : isSelected ? 'selected' : 'available'
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
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-white hover:bg-green-200 dark:hover:bg-green-900/50 cursor-pointer'
                                        : availability === 'booked'
                                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-white cursor-not-allowed'
                                          : availability === 'selected'
                                            ? 'bg-brand-blue text-white cursor-pointer'
                                            : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-white cursor-not-allowed'
                                    }`}
                                  >
                                    {availability === 'available' ? 'Ledig' : availability === 'booked' ? 'Opptatt' : availability === 'selected' ? 'Valgt' : ''}
                                  </button>
                                )
                              })}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-stone-200 dark:border-stone-700">
                        {/* Desktop Legend */}
                        <div className="hidden md:flex flex-wrap gap-4 text-xs">
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
                        {/* Mobile Legend */}
                        <div className="md:hidden flex flex-wrap gap-2 text-xs">
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
                  </div>

                  {/* Right Panel - Desktop */}
                  <div className="hidden md:block space-y-4">
                    <div className="bg-stone-50 dark:bg-stone-800 rounded-lg p-4">
                      <h3 className="font-medium text-stone-900 dark:text-white mb-3">
                        Valgte tidspunkter
                      </h3>
                      {selectedTimeSlots.length === 0 ? (
                        <p className="text-sm text-stone-600 dark:text-white">
                          Klikk på ledige tidspunkter for å velge dem. Du kan velge flere tidspunkter samtidig.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {selectedTimeSlots.map((slot) => {
                            // Parse slot ID to display format
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
                                  className="text-stone-400 hover:text-stone-600 dark:text-white dark:hover:text-white"
                                  aria-label="Fjern tidspunkt"
                                >
                                  <ChevronRight className="w-4 h-4 rotate-45" />
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                    <div className="bg-brand-blue-light dark:bg-brand-blue/20 rounded-lg p-4">
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
                    </div>
                  </div>
                </div>

                {/* Mobile Panels - Below Calendar */}
                <div className="md:hidden space-y-3 mt-4">
                  {/* Selected Times Panel */}
                  <div className="bg-stone-50 dark:bg-stone-800 rounded-lg p-3">
                    <h3 className="text-sm font-medium text-stone-900 dark:text-white mb-2">Valgte tidspunkter</h3>
                    {selectedTimeSlots.length === 0 ? (
                      <p className="text-xs text-stone-600 dark:text-white">
                        Klikk på ledige tidspunkter for å velge dem.
                      </p>
                    ) : (
                      <div className="space-y-1.5">
                        {selectedTimeSlots.map((slot) => {
                          // Handle both old format (day-time) and new format (date-time)
                          let dateStr = ''
                          let time = ''
                          if (slot.includes('2026-') || slot.match(/^\d{4}-\d{2}-\d{2}-/)) {
                            // New format: YYYY-MM-DD-HH:MM
                            // Split on last occurrence of '-' to separate date from time
                            const lastDashIndex = slot.lastIndexOf('-')
                            const datePart = slot.substring(0, lastDashIndex)
                            time = slot.substring(lastDashIndex + 1)
                            const [year, month, day] = datePart.split('-').map(Number)
                            // Parse as local date to avoid timezone issues
                            const dateObj = new Date(year, month - 1, day)
                            const dayNumber = dateObj.getDate()
                            const monthNames = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']
                            const monthName = monthNames[dateObj.getMonth()]
                            dateStr = `${dayNumber}. ${monthName}`
                          } else {
                            // Old format: day-time (for desktop compatibility)
                            const [dayIndex, timePart] = slot.split('-')
                            const dates = [12, 13, 14, 15, 16, 17, 18]
                            const date = dates[parseInt(dayIndex)]
                            time = timePart
                            dateStr = `${date}. jan`
                          }
                          return (
                            <div
                              key={slot}
                              className="flex items-center justify-between gap-2 p-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded text-xs"
                            >
                              <span className="text-stone-700 dark:text-stone-300">
                                {dateStr}, {time}
                              </span>
                              <button
                                onClick={() => setSelectedTimeSlots((prev) => prev.filter((id) => id !== slot))}
                                className="text-stone-400 dark:text-white"
                              >
                                <ChevronRight className="w-3 h-3 rotate-45" />
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Tips Panel */}
                  <div className="bg-brand-blue-light dark:bg-brand-blue/20 rounded-lg p-3">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
      </main>
    </div>
  )
}
