# Public Booking Experience - Information Architecture

**Created:** 2025-01-12  
**Scope:** Public End User Experience Only

---

## Overview

This document defines the information architecture for DigiList's public booking experience. The architecture is designed to support a generic booking system where "everything can be listed" with varying booking models, while maintaining consistent user experience patterns.

---

## Core Pages & Navigation

### 1. Search / Results Page
**Purpose:** Discover and find available listings

**Key Features:**
- Search interface (text search, filters)
- Results display (list/grid view)
- Filtering by listing type, location, availability
- Sorting options

**Stable Structure:** ✅ Fixed layout, consistent across all listings

---

### 2. Listing Detail Page
**Purpose:** View listing information and initiate booking

**Key Features:**
- Listing information display (images, description, amenities, rules, pricing)
- Availability calendar/view (varies by booking model)
- Booking widget (parametrisk, adapts to booking model)
- Pricing information

**Stable Structure:** ✅ Fixed page layout  
**Variable Structure:** ⚠️ Booking widget and availability display adapt to listing configuration

---

### 3. Booking Confirmation / Receipt Page
**Purpose:** Confirm booking completion and display receipt

**Key Features:**
- Booking confirmation details
- Receipt/invoice display
- Next steps information
- Link to "My Bookings"

**Stable Structure:** ✅ Fixed layout, consistent format

---

### 4. My Bookings Page
**Purpose:** View and manage user's bookings

**Key Features:**
- List of user's bookings (all statuses)
- Filter by status (pending, confirmed, cancelled, completed)
- View booking details
- Cancel bookings (within deadline)
- View receipts

**Stable Structure:** ✅ Fixed layout, consistent list/card format

---

## Information Hierarchy

### Primary Navigation (Public)
1. **Search** - Find listings
2. **My Bookings** - Manage bookings (authenticated users)

### Secondary Navigation (Per Page)
- **Listing Detail:** Back to search, Share, Contact
- **Confirmation:** View booking, My bookings, Search more
- **My Bookings:** Search listings, View details, Cancel

---

## Data Flow

### Booking Flow (Simplified)
```
Search → Listing Detail → Booking Widget → Confirmation → My Bookings
```

### Booking Widget Flow (Parametric)
```
Select Bookable Unit → View Availability → Select Booking Parameters → Review → Submit
```

Where "Select Booking Parameters" varies by booking model:
- **TIME_RANGE:** Start time + End time
- **SLOT:** Pre-defined slot selection
- **ALL_DAY:** Date selection
- **QUANTITY:** Quantity input
- **CAPACITY:** Capacity/attendee input
- **PACKAGE:** Package selection

---

## Component Architecture

### Stable Components (Reusable)
- **SearchBar** - Consistent search interface
- **ListingCard** - Standard listing card in results
- **ListingDetailLayout** - Fixed page structure
- **ConfirmationLayout** - Fixed confirmation format
- **BookingList** - Standard booking list/card format

### Variable Components (Parametric)
- **BookingWidget** - Adapts to booking_model
- **AvailabilityDisplay** - Adapts to time_policy and allocation_type
- **PricingDisplay** - Adapts to charge_unit and booking_model

---

## Key Design Principles

1. **Consistency in Structure** - Pages have fixed layouts for navigation and information display
2. **Flexibility in Booking** - Booking components adapt to listing configuration
3. **Progressive Disclosure** - Show information when needed, hide complexity
4. **Clear Feedback** - Always explain why something cannot be booked
5. **Mobile-First** - All components work on mobile devices

---

## Scope Boundaries

### In Scope
- ✅ Public listing discovery
- ✅ Listing detail viewing
- ✅ Booking creation (all 6 booking models)
- ✅ Booking confirmation and receipts
- ✅ User's own booking management

### Out of Scope
- ❌ Admin/backoffice functionality
- ❌ Approval workflows (admin side)
- ❌ Listing management (admin side)
- ❌ User management (admin side)
- ❌ Reporting and analytics (admin side)

---

**Next Steps:**
1. Design BookingWidget component with variants for all booking models
2. Design Listing Detail template with parametric booking section
3. Design remaining stable pages (Search, Confirmation, My Bookings)
