# Product Roadmap: DigiList Public Booking

**Created:** 2025-01-12  
**Scope:** Public End User Experience Only  
**Base System:** Designsystemet.no  
**Brand Accent:** Green (WCAG compliant)

---

### 0. Foundations

**Goal:** Lås rammer før UI så alt blir konsistent og WCAG-trygt.

### Deliverables

1. **`product/foundations/designsystemet-base.md`**
   - Designsystemet.no er base for hele appen
   - Komponent-mapping og avviksregler

2. **`product/foundations/branding-accessibility.md`**
   - DigiList Green som aksent
   - Kontrastregler (tekst 4.5:1, UI 3:1)
   - Ikke farge alene for status/valg

3. **`product/foundations/content-style.md`**
   - Ordvalg for booking: Listing, Tilgjengelighet, Reservasjon, Status
   - Microcopy-regler for "hvorfor kan jeg ikke booke"

### Acceptance

- ✅ Alle foundation-filer finnes
- ✅ "Out of scope" (admin/saksbehandler) er eksplisitt skrevet

---

### 1. Public Information Architecture

**Goal:** Én tydelig offentlig reise uten backoffice-lekkasje.

### Deliverables

1. **`product/sections/public-booking/information-architecture.md`**
   - 4 hovedsider: Search/Results, Listing Detail, Confirmation/Receipt, My Bookings
   - Navigasjon: header, breadcrumbs (hvis brukt), "tilbake til treff"
   - Stabil vs variabel komponentarkitektur
   - Dataflyt for public booking

### Acceptance

- ✅ Hver side har klart formål + inngang/utgang
- ✅ Variabilitet (booking_model) er definert som system, ikke tilfeldigheter

---

### 2. BookingWidget System (Core)

**Goal:** Parametrisk booking-komponent som håndterer alle modeller.

### Deliverables

1. **`product/sections/public-booking/booking-widget-spec.md`**
   - Variants: TIME_RANGE, SLOT, ALL_DAY, QUANTITY, CAPACITY, PACKAGE
   - Props interface
   - Validering og feilhåndtering (policy + allocations)
   - Responsiv oppførsel

2. **State matrix:**
   - loading, empty, error
   - disabled-by-policy (lead time, max advance, min/max duration, buffers)
   - blocked-by-allocation (maintenance, seasonal, block)

3. **Microcopy for errors/constraints**

### Acceptance

- ✅ Hver booking_model har:
  - input controls
  - valideringsregler
  - tydelig "why disabled"
  - CTA-tekst som matcher modell ("Book", "Send forespørsel", "Velg antall", osv.)

---

### 3. Listing Detail Template (Public)

**Goal:** Stabil layout + variabel booking-seksjon.

### Deliverables

1. **`product/sections/public-booking/listing-detail-spec.md`**
   - Hero/header, media, nøkkelinfo, pris
   - Tabs/sections: Beskrivelse, Regler, Tilgjengelighet/Booking, Lokasjon, Vilkår
   - BookingWidget integrasjon (parametrisk)
   - Responsiv: desktop 2-kolonne, mobil 1-kolonne med sticky CTA

### Acceptance

- ✅ Samme template fungerer for SPACE/RESOURCE/EVENT/SERVICE uten redesign
- ✅ BookingWidget rendres basert på booking_model

---

### 4. Search & Results (Public)

**Goal:** Finne og forstå listings raskt, WCAG-vennlig filtrering.

### Deliverables

1. **Search page spec:**
   - Søkefelt, filtre (checkbox), sortering
   - Treffliste med ListingCard
   - Empty states og "null treff"

2. **Filter interaction rules:**
   - Ikke bare farge for valgt (bruk check + label)
   - "Treff" teller og "Nullstill filter"

3. **ListingCard spec:**
   - bilde, tittel, kort info, pris fra, tilgjengelighetsindikator (ikke falsk presisjon)

### Acceptance

- ✅ Full tastaturnavigasjon i filter
- ✅ Visuelt tydelige fokus-states
- ✅ Resultatlisten er lesbar på mobil

---

### 5. Confirmation / Receipt (Public)

**Goal:** Etter booking vet brukeren hva som skjedde, hva som skjer videre.

### Deliverables

1. **Confirmation states:**
   - Confirmed
   - Pending approval
   - Payment required / paid
   - Cancelled (hvis støttet)

2. **Receipt content:**
   - booking summary (tid, sted/unit, pris)
   - vilkår lenke
   - kontakt og neste steg

3. **Dokumentnedlasting/kvittering hvis relevant**

### Acceptance

- ✅ Brukeren kan alltid se status + neste steg
- ✅ Grønn brukes som aksent, ikke som eneste "success"-signal

---

### 6. My Bookings (Public)

**Goal:** Se historikk, status, dokumenter, og utføre lovlige handlinger.

### Deliverables

1. **My Bookings list:**
   - filter på status, dato, type
   - status badges (semantiske, ikke alt-grønt)

2. **Booking detail:**
   - timeline/status
   - kvittering
   - kanseller (hvis policy tillater)
   - kontakt

### Acceptance

- ✅ Tydelig status og begrunnelse ved restriksjoner
- ✅ Ingen backoffice-data lekker inn

---

### 7. Sample Data Pack (Required for Design + Dev)

**Goal:** Test alle varianter uten å late som alt er "time range".

### Deliverables

1. **`product/sample-data/public-listings.json`**
   - Minst 12 listings:
     - 2 per booking_model (normal + constrained)
   - Policies:
     - lead time, max advance, buffers, min/max duration
   - Allocations:
     - BOOKING, MAINTENANCE, SEASONAL, BLOCK

2. **Dokumentasjon:** hvilke skjermtilstander hver sample dekker

### Acceptance

- ✅ Hver booking_model kan testes uten å finne på data
- ✅ Hver error/disabled state kan trigges med sample

---

### 8. Implementation Handoff (React)

**Goal:** Gjøre det buildbart uten gjetting.

### Deliverables

1. **Component inventory** (Designsystemet mapping)
2. **Props contracts** (TypeScript interfaces)
3. **Storybook/preview plan** (valgfritt men smart)
4. **Accessibility checklist** per komponent (keyboard, focus, ARIA)

### Acceptance

- ✅ Utvikler kan bygge BookingWidget uten å spørre "hvordan skal SLOT fungere?"

---

## Development Priority

Sections are sequenced by development priority—the first section is your core functionality, with each subsequent section building on it:

1. **Section 0: Foundations** - Establish base before any UI work
2. **Section 1: Public Information Architecture** - Define structure
3. **Section 2: BookingWidget System** - Core booking functionality
4. **Section 3: Listing Detail Template** - Integrate BookingWidget
5. **Section 4: Search & Results** - Discovery and navigation
6. **Section 5: Confirmation / Receipt** - Post-booking experience
7. **Section 6: My Bookings** - User management
8. **Section 7: Sample Data Pack** - Testing and development support
9. **Section 8: Implementation Handoff** - Developer documentation

---

## Scope Boundaries

### In Scope
- ✅ Public end user experience only
- ✅ All 6 booking models (TIME_RANGE, SLOT, ALL_DAY, QUANTITY, CAPACITY, PACKAGE)
- ✅ WCAG 2.1 AA compliance
- ✅ Designsystemet.no base
- ✅ Green brand accent (WCAG compliant)

### Out of Scope
- ❌ Admin/backoffice functionality
- ❌ Saksbehandler workflows
- ❌ System configuration
- ❌ User management (admin side)
- ❌ Approval workflows (admin side)
- ❌ Reporting and analytics (admin side)

---

**Status:** Ready for Design OS section design workflow
