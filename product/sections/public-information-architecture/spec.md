# Public Information Architecture Section Specification

**Created:** 2025-01-12  
**Section Type:** Information Architecture & Navigation  
**Scope:** Public end-user experience only

---

## Overview

This section defines the complete public user journey and navigation structure for DigiList's public booking experience. The architecture supports a generic booking system where "everything can be listed" with varying booking models, while maintaining consistent user experience patterns.

---

## Specification

### Core Pages

#### 1. Search / Results Page
**Purpose:** Discover and find available listings

**Key Features:**
- Search interface (text search, filters)
- Results display (list/grid view)
- Filtering by listing type, location, availability
- Sorting options

**Stable Structure:** ✅ Fixed layout, consistent across all listings

**Navigation:**
- Entry point: Home page, direct URL, logo click
- Exit points: Listing Detail (click listing), My Bookings (nav), Help (nav)

---

#### 2. Listing Detail Page
**Purpose:** View listing information and initiate booking

**Key Features:**
- Listing information display (images, description, amenities, rules, pricing)
- Availability calendar/view (varies by booking model)
- BookingWidget (parametric, adapts to booking model)
- Pricing information

**Stable Structure:** ✅ Fixed page layout  
**Variable Structure:** ⚠️ BookingWidget and availability display adapt to listing configuration

**Navigation:**
- Entry point: Search/Results (click listing), direct URL, share link
- Exit points: Back to Search (preserves filters), Confirmation (after booking), My Bookings (nav)

**BookingWidget Integration:**
- Appears in right column (desktop) or below content (mobile)
- Sticky positioning on desktop
- Connects to Confirmation page after successful booking

---

#### 3. Booking Confirmation / Receipt Page
**Purpose:** Confirm booking completion and display receipt

**Key Features:**
- Booking confirmation details
- Receipt/invoice display
- Next steps information
- Link to "My Bookings"

**Stable Structure:** ✅ Fixed layout, consistent format

**Navigation:**
- Entry point: Listing Detail (after booking submission)
- Exit points: My Bookings (view booking), Search (find more), Home (logo)

**States:**
- Confirmed (immediate confirmation)
- Pending approval (requires approval)
- Payment required (payment pending)
- Cancelled (if cancellation occurs)

---

#### 4. My Bookings Page
**Purpose:** View and manage user's bookings

**Key Features:**
- List of user's bookings (all statuses)
- Filter by status (pending, confirmed, cancelled, completed)
- View booking details
- Cancel bookings (within deadline)
- View receipts

**Stable Structure:** ✅ Fixed layout, consistent list/card format

**Navigation:**
- Entry point: Navigation menu, Confirmation page link
- Exit points: Listing Detail (click booking), Search (nav), Help (nav)

---

### Navigation Rules Between Pages

#### Primary Navigation Flow

```
Search/Results
    ↓ (click listing)
Listing Detail
    ↓ (complete booking via BookingWidget)
Confirmation/Receipt
    ↓ (optional)
My Bookings
```

#### Secondary Navigation Paths

**From Search/Results:**
- → My Bookings (via nav menu)
- → Help (via nav menu)
- → Listing Detail (via listing click)

**From Listing Detail:**
- → Search/Results (back button, preserves filters via URL params)
- → Confirmation (after booking, via BookingWidget)
- → My Bookings (via nav menu)

**From Confirmation:**
- → My Bookings (primary action, view booking)
- → Search/Results (secondary action, find more)
- → Listing Detail (if viewing same listing)

**From My Bookings:**
- → Listing Detail (click booking to view details)
- → Search/Results (nav menu)
- → Confirmation (if viewing booking receipt)

#### URL Parameter Preservation

**Search Filters:**
- Preserved in URL when navigating from Search → Listing Detail
- Restored when returning via "Back to results"
- Format: `/search?type=sports&location=oslo&available=true`

**Booking Context:**
- Booking ID preserved in Confirmation URL
- Allows direct linking to confirmation page
- Format: `/confirmation?booking=12345`

---

### Stable vs Variable UI Areas

#### Stable Areas (Fixed Structure)

**All Pages:**
- Header (logo, navigation, mobile menu)
- Footer (contact, legal links)
- Page container (max-width, consistent padding)

**Search/Results Page:**
- Search bar layout
- Filter panel structure
- Results list/grid container
- Sorting controls

**Listing Detail Page:**
- Hero section (images, title, location)
- Content sections (description, rules, amenities)
- Page layout (two-column desktop, single-column mobile)

**Confirmation Page:**
- Status panel structure
- Booking summary card layout
- Action buttons layout

**My Bookings Page:**
- Filter controls
- Booking list/card structure
- Status badges layout

#### Variable Areas (Parametric/Adaptive)

**Listing Detail Page:**
- ⚠️ **BookingWidget** - Adapts to `booking_model`:
  - TIME_RANGE: Date/time pickers
  - SLOT: Slot selector
  - ALL_DAY: Date picker
  - QUANTITY: Quantity input
  - CAPACITY: Capacity selector
  - PACKAGE: Package selector

- ⚠️ **Availability Display** - Adapts to `time_policy` and `allocation_type`:
  - Calendar view (varies by booking model)
  - Time slot display (varies by slot size)
  - Blocked periods (maintenance, seasonal, bookings)

- ⚠️ **Pricing Display** - Adapts to `charge_unit`:
  - Per hour, per day, per unit, per package
  - Dynamic calculation based on selection

**Search/Results Page:**
- Results content (varies by listing type)
- Filter options (varies by listing categories)

**My Bookings Page:**
- Booking details (varies by booking model)
- Available actions (varies by booking status and policy)

---

### BookingWidget Integration Points

#### Where BookingWidget Appears

**Primary Location:**
- **Listing Detail Page** - Right column (desktop), below content (mobile)
- Sticky positioning on desktop (stays visible while scrolling)
- Full-width on mobile

**Secondary Location:**
- **My Bookings Page** - Embedded in booking detail view (if viewing booking)
- Read-only mode (shows booking details, no editing)

#### How BookingWidget Connects Pages

**Flow: Listing Detail → Confirmation**

1. User selects booking parameters in BookingWidget
2. User clicks "Book now" / "Send application" button
3. BookingWidget validates input and submits booking
4. On success: Navigate to Confirmation page with booking ID
5. On error: Show error message in BookingWidget (stay on Listing Detail)

**Flow: Confirmation → My Bookings**

1. Confirmation page displays booking details
2. "View in My Bookings" button/link
3. Navigate to My Bookings page
4. Booking appears in list (filtered or highlighted)

**Flow: My Bookings → Listing Detail**

1. User clicks booking in My Bookings list
2. Navigate to Listing Detail page for that listing
3. BookingWidget shows booking details (read-only or editable based on policy)

---

## Sample Data

### Example Listing

**Listing: "Community Sports Hall"**
- Type: SPACE
- Booking Model: TIME_RANGE
- Location: Oslo, Grunerløkka
- Capacity: 50 people
- Price: 500 NOK/hour
- Availability: Weekdays 18:00-22:00, Weekends 10:00-20:00

**Example Journey:**
1. User searches for "sports hall" in Oslo
2. Finds "Community Sports Hall" in results
3. Clicks listing → Listing Detail page
4. Views images, description, rules
5. BookingWidget shows TIME_RANGE interface (date/time pickers)
6. Selects: 2025-01-15, 19:00-21:00
7. Reviews pricing: 2 hours × 500 NOK = 1000 NOK
8. Clicks "Book now"
9. Redirected to Confirmation page
10. Sees booking confirmation with receipt
11. Clicks "View in My Bookings"
12. Sees booking in My Bookings list

### Example Booking Journey

**Scenario: Slot-based Fitness Class**

1. **Search/Results:** User searches "fitness class"
2. **Listing Detail:** Views "Morning Yoga Class"
   - Booking Model: SLOT
   - BookingWidget shows: Date picker + Slot selector (09:00, 10:00, 11:00)
3. **BookingWidget:** User selects date (2025-01-20) + slot (10:00)
4. **Confirmation:** Booking confirmed, shows slot details
5. **My Bookings:** Booking appears in list with status "Confirmed"

**Scenario: Quantity-based Equipment Rental**

1. **Search/Results:** User searches "sports equipment"
2. **Listing Detail:** Views "Basketball Set"
   - Booking Model: QUANTITY
   - BookingWidget shows: Quantity input (1-10 available)
3. **BookingWidget:** User selects quantity (3 sets)
4. **Confirmation:** Booking confirmed, shows quantity and total price
5. **My Bookings:** Booking appears with quantity details

---

## Screen Designs

### Information Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        HEADER                                │
│  [Logo]  [Home] [My Bookings] [Help]                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    SEARCH / RESULTS                          │
│                                                              │
│  [Search Bar]                    [Filters]                  │
│  ┌────────────────────────────────────────────────────┐      │
│  │ ┌────┐  Listing Card 1                          │      │
│  │ │Img │  Title, Location, Price                   │      │
│  │ └────┘  [View Details] →                         │      │
│  │                                                  │      │
│  │ ┌────┐  Listing Card 2                          │      │
│  │ │Img │  Title, Location, Price                   │      │
│  │ └────┘  [View Details] →                         │      │
│  └────────────────────────────────────────────────────┘      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              ↓ (click listing)
┌─────────────────────────────────────────────────────────────┐
│                    LISTING DETAIL                            │
│                                                              │
│  [← Back to Results]  [Share] [Contact]                     │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────────────────┐   │
│  │  Hero Section    │  │   BOOKING WIDGET             │   │
│  │  [Images]         │  │   (Parametric)              │   │
│  │  Title            │  │                              │   │
│  │  Location         │  │  [Availability Display]      │   │
│  └──────────────────┘  │  [Booking Controls]         │   │
│                         │  [Pricing]                   │   │
│  ┌──────────────────┐  │  [Book Now Button] →         │   │
│  │  Description     │  └──────────────────────────────┘   │
│  │  Rules            │                                      │
│  │  Amenities        │                                      │
│  │  Location Map     │                                      │
│  └──────────────────┘                                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              ↓ (complete booking)
┌─────────────────────────────────────────────────────────────┐
│                  CONFIRMATION / RECEIPT                      │
│                                                              │
│  [✓] Booking Confirmed                                      │
│                                                              │
│  ┌────────────────────────────────────────────────────┐      │
│  │  Booking Summary                                  │      │
│  │  Listing: Community Sports Hall                   │      │
│  │  Date: 2025-01-15                                │      │
│  │  Time: 19:00-21:00                                │      │
│  │  Price: 1000 NOK                                  │      │
│  └────────────────────────────────────────────────────┘      │
│                                                              │
│  [View in My Bookings] →  [Search More]                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              ↓ (optional)
┌─────────────────────────────────────────────────────────────┐
│                      MY BOOKINGS                             │
│                                                              │
│  [All] [Confirmed] [Pending] [Cancelled]                    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐      │
│  │  Booking Card 1                                    │      │
│  │  [Status Badge]  Title, Date, Time                │      │
│  │  [View Details] →  [Cancel]                       │      │
│  └────────────────────────────────────────────────────┘      │
│                                                              │
│  ┌────────────────────────────────────────────────────┐      │
│  │  Booking Card 2                                    │      │
│  │  [Status Badge]  Title, Date, Time                │      │
│  │  [View Details] →                                 │      │
│  └────────────────────────────────────────────────────┘      │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        FOOTER                                │
│  Contact | Privacy | Terms | Accessibility                  │
└─────────────────────────────────────────────────────────────┘
```

### Navigation Flow Map

```
                    ┌─────────────┐
                    │   SEARCH    │
                    │  / RESULTS  │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ↓                  ↓                  ↓
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   MY         │  │   LISTING    │  │     HELP     │
│  BOOKINGS    │  │    DETAIL    │  │              │
└──────┬───────┘  └──────┬───────┘  └──────────────┘
       │                 │
       │                 │ (BookingWidget)
       │                 ↓
       │          ┌──────────────┐
       │          │ CONFIRMATION │
       │          │  / RECEIPT   │
       │          └──────┬───────┘
       │                 │
       └─────────────────┘
              (View booking)
```

### BookingWidget Integration Flow

```
LISTING DETAIL PAGE
    │
    ├─→ BookingWidget (Parametric)
    │   │
    │   ├─→ TIME_RANGE: Date/Time Pickers
    │   ├─→ SLOT: Slot Selector
    │   ├─→ ALL_DAY: Date Picker
    │   ├─→ QUANTITY: Quantity Input
    │   ├─→ CAPACITY: Capacity Selector
    │   └─→ PACKAGE: Package Selector
    │
    └─→ [Submit Booking]
            │
            ↓ (Success)
    CONFIRMATION PAGE
            │
            └─→ [View in My Bookings]
                    │
                    ↓
            MY BOOKINGS PAGE
```

---

## Component Architecture

### Stable Components (Reusable)

- **SearchBar** - Consistent search interface
- **ListingCard** - Standard listing card in results
- **ListingDetailLayout** - Fixed page structure
- **ConfirmationLayout** - Fixed confirmation format
- **BookingList** - Standard booking list/card format
- **Navigation** - Header navigation (stable across pages)

### Variable Components (Parametric)

- **BookingWidget** - Adapts to `booking_model` (6 variants)
- **AvailabilityDisplay** - Adapts to `time_policy` and `allocation_type`
- **PricingDisplay** - Adapts to `charge_unit` and `booking_model`

---

## Key Design Principles

1. **Consistency in Structure** - Pages have fixed layouts for navigation and information display
2. **Flexibility in Booking** - Booking components adapt to listing configuration
3. **Progressive Disclosure** - Show information when needed, hide complexity
4. **Clear Feedback** - Always explain why something cannot be booked
5. **Mobile-First** - All components work on mobile devices
6. **URL Preservation** - Filters and context preserved in URLs for shareability

---

## Scope Boundaries

### In Scope
- ✅ Public listing discovery
- ✅ Listing detail viewing
- ✅ Booking creation (all 6 booking models)
- ✅ Booking confirmation and receipts
- ✅ User's own booking management
- ✅ Navigation between public pages

### Out of Scope
- ❌ Admin/backoffice functionality
- ❌ Approval workflows (admin side)
- ❌ Listing management (admin side)
- ❌ User management (admin side)
- ❌ Reporting and analytics (admin side)
- ❌ Multi-level navigation menus
- ❌ Complex filtering (admin-level)

---

**Related Documents:**
- `/product/sections/public-booking/booking-widget-spec.md` - BookingWidget component specification
- `/product/sections/public-booking/listing-detail-spec.md` - Listing Detail template specification
- `/product/shell/spec.md` - Application shell specification
