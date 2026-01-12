# Product Overview - Digilist

**Created:** 2025-01-12  
**Source:** PRD v2.0 (January 2025)

---

## ⚠️ SCOPE DEFINITION - CRITICAL

**Produkt:** DigiList – Public Booking Experience

**This scope definition must be strictly enforced throughout Design OS to prevent scope creep into admin/backoffice functionality.**

### Scope: Public End User Experience Only

**Kun offentlige sluttbrukerflater**

### Roles (In Scope)

- **Innbygger** - Individual citizens making bookings
- **Organisasjonsbruker** - Organizations (idrettslag, forening, firma) making bookings

### Explicitly Out of Scope

- ❌ Ingen admin
- ❌ Ingen saksbehandler
- ❌ Ingen systemkonfigurasjon
- ❌ Ingen backoffice-funksjoner

### Public User Jobs (In Scope)

1. **Finne riktig listing** - Search and discover the right listing for their needs
2. **Forstå regler, pris og hvem som kan booke** - Understand booking rules, pricing, and eligibility requirements
3. **Se tilgjengelighet på riktig måte for denne listing-typen** - View availability in the correct format for this specific listing type (varies by booking model)
4. **Velge tidspunkt, mengde eller kapasitet** - Select time slot, quantity, or capacity based on booking model
5. **Fullføre booking eller sende søknad** - Complete booking process or submit application
6. **Forstå hvorfor noe ikke kan bookes** - Understand why something cannot be booked (conflicts, rules, restrictions)
7. **Se status, bekreftelse og kvittering etterpå** - View status, confirmation, and receipt after booking

### Entities User Interacts With (In Scope)

1. **Listing** - Viewing and understanding available listings
2. **Kalender / Tilgjengelighet** - Checking availability and calendar views
3. **Reservasjon** - Creating and managing reservations/bookings
4. **Betaling / Kvittering** - Payment processing and receipts

**Alt utenfor dette er eksplisitt utenfor scope.**

**This is not bureaucracy. This is damage control.**

---

## Product Name

**Digilist**

---

## Description

Digilist is a comprehensive SaaS platform that modernizes how Norwegian municipalities manage public listing bookings. The platform connects citizens, sports clubs, schools, and organizations with available municipal listings while ensuring fair access, compliance with regulations, and efficient resource utilization.

---

## Problems & Solutions

### Problems

Norwegian municipalities face significant challenges in listing management:

1. **Fragmented Systems** - Multiple disconnected booking systems across departments
2. **Manual Processes** - Paper-based applications, phone calls, and email chains
3. **Inequitable Access** - Lack of transparency in allocation decisions
4. **Administrative Burden** - Staff overwhelmed with booking requests and conflicts
5. **Poor Visibility** - Citizens unaware of available listings and time slots
6. **Compliance Risks** - Difficulty tracking GDPR consent and audit trails

### Solutions

Digilist provides a unified platform with:

- **Single Portal** - One place for all listing bookings
- **Self-Service** - Citizens can discover, book, and pay online
- **Fair Allocation** - Rules-based approval with transparent criteria
- **Automation** - Workflows reduce manual intervention
- **Compliance** - Built-in GDPR, audit trails, and documentation

---

## Product Positioning

Digilist is positioned as the **leading Norwegian municipal booking platform**, designed specifically for the Norwegian public sector with:

- **Native Integration** - ID-porten, Vipps, BRREG, NIF
- **Regulatory Compliance** - GDPR, Offentleglova, Arkivlova, Universal Design
- **Multi-Tenant SaaS** - Scalable platform serving multiple municipalities
- **Modern Technology** - React 19, Fastify 5, PostgreSQL 16, TypeScript strict mode

---

## Key Differentiators

1. **Norwegian-First Design** - Built for Norwegian municipalities, not adapted
2. **Unified Booking Model** - Single system handles all listing types (SPACE, RESOURCE, EVENT, SERVICE, VEHICLE, OTHER)
3. **Flexible Booking Models** - TIME_RANGE, SLOTS, ALL_DAY, QUANTITY, CAPACITY, PACKAGE
4. **Comprehensive Compliance** - Built-in GDPR, audit trails, retention policies
5. **Open Architecture** - API-first design, extensible integration points

---

## Key Features (Public End User Scope)

### Core Capabilities

- **Listing Discovery** - Search and browse available listings
- **Availability Calendar** - View real-time availability and calendar views
- **Booking Creation** - Create reservations/bookings for listings
- **Payment Processing** - Complete payments via Vipps and receive receipts
- **Booking Management** - View and manage own bookings

### Integration Capabilities

- **ID-porten** - National authentication (BankID/MinID)
- **Vipps** - Mobile payment (Norwegian standard)
- **BRREG** - Organization verification
- **NIF** - Sports club verification

---

## Core Architecture: Generic Booking System

**DigiList er et generisk bookingsystem der "alt kan listes".**

### Kjerneobjekter

1. **Listing** - Det brukeren ser (rom, utstyr, arrangement, tjeneste, kjøretøy, annet)
   - The primary entity users discover and view
   - Can be of different types: SPACE, RESOURCE, EVENT, SERVICE, VEHICLE, OTHER

2. **Bookable Unit** - Det brukeren faktisk booker (kan være én eller flere per listing)
   - What users actually book
   - A listing can have one or multiple bookable units
   - Example: "Skien Idrettshall" (Listing) can have "Hele hallen" and "Halv hall" (Bookable Units)

3. **Booking Model** - Hvordan booking skjer
   - Defines how the booking process works for a specific listing/bookable unit

### Booking Models (Must Support All)

The system must support all six booking models:

1. **TIME_RANGE** - Start and end time selection
   - Standard bookings, hourly rentals
   - User selects start time and end time

2. **SLOT** - Pre-defined time slots
   - Classes, appointments
   - User selects from available pre-defined slots

3. **ALL_DAY** - Full day booking
   - Events, conferences
   - User selects a date (full day)

4. **QUANTITY** - Quantity-based booking
   - Equipment rentals, resources
   - User selects quantity needed

5. **CAPACITY** - Capacity-based booking
   - Events with attendee limits
   - User specifies number of attendees

6. **PACKAGE** - Pre-defined packages
   - Event packages, bundles
   - User selects from pre-defined package options

### Availability Management

Tilgjengelighet styres av:

**Booking Time Policies:**
- Slot-størrelse (slot duration)
- Min/max booking duration
- Lead time (advance booking limits)
- Buffer time (between bookings)
- Check-in/out times

**Allocations:**
- **BOOKING** - Actual bookings
- **BLOCK** - Blocked time periods
- **MAINTENANCE** - Maintenance windows
- **SEASONAL** - Seasonal availability rules

### Critical Design Implication

**Konsekvens:** Kalender og booking-opplevelse er ikke lik for alle listings.

- Different listings use different booking models
- Different listings have different availability rules
- Different listings have different time policies

**Booking-UI må være parametrisk, ikke hardkodet.**

The booking interface must adapt based on:
- The listing's booking model
- The listing's availability rules
- The listing's time policies
- The bookable unit configuration

This means the UI components must be flexible and data-driven, not hardcoded for a specific booking flow.

---

## UI Structure: Stable vs Variable Components

### Stable Structure (Fixed Layouts)

These pages/components have consistent structure across all listings:

1. **Search / Results** - Listing search and results page
   - Consistent search interface
   - Results list/grid view
   - Filtering and sorting

2. **Listing Detail Layout** - Individual listing detail page
   - Consistent page structure
   - Standard sections (images, description, amenities, etc.)
   - Fixed navigation and layout

3. **Confirmation / Receipt** - Booking confirmation and receipt page
   - Consistent confirmation layout
   - Standard receipt format
   - Fixed information display

4. **My Bookings** - User's booking list and management
   - Consistent list view
   - Standard booking card/item format
   - Fixed navigation and filters

### Variable Structure (Dynamic Components)

These components must adapt based on listing configuration:

1. **Booking Component** - Changes form based on `booking_model`
   - **TIME_RANGE**: Start/end time pickers
   - **SLOT**: Pre-defined slot selection
   - **ALL_DAY**: Date picker only
   - **QUANTITY**: Quantity selector
   - **CAPACITY**: Capacity/attendee input
   - **PACKAGE**: Package selection

2. **Availability Display** - Varies based on `time_policy` and `allocation_type`
   - Different calendar views (month/week/day)
   - Different time slot displays
   - Different availability indicators
   - Handles BOOKING, BLOCK, MAINTENANCE, SEASONAL allocations differently

3. **Pricing Calculation** - Changes based on `charge_unit`
   - Different pricing displays
   - Different calculation methods
   - Different breakdown formats
   - Varies by booking model and charge unit

### Design Implication

- **Stable components** can be designed once and reused
- **Variable components** must be designed as flexible, parameterized components
- The booking flow must adapt dynamically based on listing configuration
- UI must handle all combinations of booking_model, time_policy, allocation_type, and charge_unit

---

## Personas (In Scope Only)

### Leietaker (Tenant/Booker) - Innbygger

**Who:** Citizens, families, event organizers  
**Goals:** Find and book listings quickly, understand rules, pay securely  
**Pain Points:** Complex processes, unclear availability, unexpected rejections

**Public User Jobs:**
1. Finne riktig listing
2. Forstå regler, pris og hvem som kan booke
3. Se tilgjengelighet på riktig måte for denne listing-typen
4. Velge tidspunkt, mengde eller kapasitet
5. Fullføre booking eller sende søknad
6. Forstå hvorfor noe ikke kan bookes
7. Se status, bekreftelse og kvittering etterpå

### Organisasjonsbruker (Organization User)

**Who:** Sports clubs, organizations, businesses  
**Goals:** Book listings for organizational activities, manage recurring bookings  
**Pain Points:** Complex processes, unclear availability, organizational verification

**Public User Jobs:**
1. Finne riktig listing for organisasjonen
2. Forstå regler, pris og hvem som kan booke (organisasjonsrabatter)
3. Se tilgjengelighet på riktig måte for denne listing-typen
4. Velge tidspunkt, mengde eller kapasitet (ofte gjentakende bookinger)
5. Fullføre booking eller sende søknad
6. Forstå hvorfor noe ikke kan bookes
7. Se status, bekreftelse og kvittering etterpå

**Note:** Admin personas (Saksbehandler, Eiendomseier, Administrator, Kommune) are explicitly out of scope for this Design OS session.

---

## Success Metrics / KPIs

### User Adoption

| Metric | Target (Year 1) | Target (Year 2) | Measurement |
|--------|-----------------|-----------------|-------------|
| Registered users | 10,000+ | 25,000+ | User database |
| Monthly active users | 5,000+ | 15,000+ | Analytics |
| Online booking rate | > 80% | > 90% | Booking source tracking |
| Mobile usage | > 40% | > 50% | User agent analysis |
| Repeat booking rate | > 60% | > 70% | User booking history |

### Operational Efficiency

| Metric | Target | Measurement |
|--------|--------|-------------|
| Average booking time | < 5 minutes | User session analytics |
| Auto-approval rate | > 60% | Approval workflow metrics |
| Staff time per booking | < 2 minutes | Case handler analytics |
| Support tickets/booking | < 0.05 | Support system integration |
| Booking completion rate | > 85% | Funnel analysis |

### Business Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Listing utilization | > 70% | Booking calendar analysis |
| No-show rate | < 5% | Attendance tracking |
| Payment success rate | > 98% | Payment provider analytics |
| Customer satisfaction | > 4.2/5 | Post-booking surveys |
| Net Promoter Score (NPS) | > 50 | User surveys |

### Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| System uptime | > 99.9% | Monitoring system |
| API error rate | < 0.1% | Application monitoring |
| Page load performance | < 2.5s LCP | Core Web Vitals |
| Test coverage | > 95% | Test reports |
| Security incidents | 0 critical/high | Security monitoring |

---

**Note:** This document is extracted directly from the PRD without language improvements, as Design OS requires precision over marketing language. **Scope definition is critical and must be enforced throughout all Design OS activities.**
