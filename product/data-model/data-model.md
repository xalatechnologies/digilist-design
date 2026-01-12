# Data Model: DigiList Public Booking Domain

**Created:** 2025-01-12  
**Purpose:** Define core entities and relationships for the public booking experience.  
**Scope:** Public user flows only (Search/Results, Listing Detail, BookingWidget, Confirmation/Receipt, My Bookings).  
**Out of Scope:** Admin/backoffice concepts except where they affect public behavior (rules, availability, pricing, approvals).

---

## Entities

### Tenant

Represents a municipality or tenant environment.

**Fields:**
- `id` (uuid)
- `name` (string)
- `timezone` (string, default: Europe/Oslo)

**Relationships:**
- Tenant 1..N Listings
- Tenant 1..N Users
- Tenant 1..N Bookings
- Tenant 1..N Allocations

---

### Organization

Represents a booking organization (e.g., sports club) for public users that book as an org.

**Fields:**
- `id` (uuid)
- `tenant_id` (fk Tenant)
- `name` (string)

**Relationships:**
- Organization 1..N Users (membership)
- Organization 1..N Bookings (optional booking-as-org)

**Note:** Public UI must support booking as individual or on behalf of an organization where allowed.

---

### User

Represents the public end user.

**Fields:**
- `id` (uuid)
- `tenant_id` (fk Tenant)
- `email` (string)
- `name` (string)
- `user_type` (INDIVIDUAL | ORG_MEMBER)

**Relationships:**
- User 1..N Bookings
- User N..N Organizations (optional membership)

---

### Listing (Primary Bookable Entity)

The public-facing thing shown in search and detail pages.

**Fields:**
- `id` (uuid)
- `tenant_id` (fk Tenant)
- `org_id` (fk Organization or owning org, optional)
- `name` (string)
- `slug` (string, unique per tenant)
- `description` (text)
- `listing_type` (SPACE | RESOURCE | EVENT | SERVICE | VEHICLE | OTHER)
- `booking_model` (TIME_RANGE | SLOT | ALL_DAY | QUANTITY | CAPACITY | PACKAGE)
- `status` (DRAFT | PUBLISHED | ARCHIVED | MAINTENANCE)
- `capacity` (number, optional, for CAPACITY model)
- `quantity` (number, optional, for QUANTITY model)
- `default_bookable_unit_id` (fk BookableUnit, optional)
- `metadata` (json)

**Relationships:**
- Listing 1..N BookableUnits
- Listing 0..N ListingMedia
- Listing 0..N ListingCategories (via join)
- Listing 0..N AvailabilityRules
- Listing 0..N PricingRules
- Listing 0..N AddOns
- Listing 1..N Bookings (booking records)
- Listing 1..N Allocations (availability blocks)

**Public Constraints:**
- Only PUBLISHED listings appear in Search/Results
- MAINTENANCE listings are visible but not bookable (policy-driven UI)

---

### BookableUnit (Unit of Availability)

A listing can expose one or more bookable units that users actually book.  
Example: A sports hall listing may have multiple courts (units), or equipment listing may have individual items.

**Fields:**
- `id` (uuid)
- `tenant_id` (fk Tenant)
- `listing_id` (fk Listing)
- `name` (string)
- `slug` (string)
- `description` (text)
- `unit_type` (SPACE | EQUIPMENT | RESOURCE | SERVICE)
- `bookable_mode` (TIME_SLOT | DATE_RANGE | HYBRID)
- `charge_unit` (PER_SLOT | PER_HOUR | PER_DAY | PER_WEEK | PER_BOOKING | PER_UNIT_QUANTITY)
- `capacity` (number, optional)
- `min_capacity` (number, optional)
- `base_price_cents` (number)
- `currency` (string, default: NOK)
- `is_default` (boolean)
- `is_active` (boolean)
- `sort_order` (number)
- `time_policy_id` (fk BookingTimePolicy, optional)
- `extra` (json)

**Relationships:**
- BookableUnit 0..1 BookingTimePolicy
- BookableUnit 1..N Bookings
- BookableUnit 1..N Allocations
- BookableUnit 0..N PricingRules (if unit-level pricing is supported)

**Public Behavior:**
- If a listing has multiple active units, the BookingWidget must allow selecting unit first, then availability.
- If only one default unit exists, selection is implicit.

---

### BookingTimePolicy (Time Constraints)

Controls how date/time selection works for TIME_RANGE, SLOT, ALL_DAY (and hybrid).

**Fields:**
- `id` (uuid)
- `tenant_id` (fk Tenant)
- `bookable_unit_id` (fk BookableUnit, optional)
- `bookable_mode` (TIME_SLOT | DATE_RANGE | HYBRID)
- `timezone` (string, default: Europe/Oslo)
- `slot_step_minutes` (number)
- `default_duration_minutes` (number)
- `min_duration_minutes` (number)
- `max_duration_minutes` (number)
- `day_checkin_time` (HH:mm, optional)
- `day_checkout_time` (HH:mm, optional)
- `min_days` (number, optional)
- `max_days` (number, optional)
- `min_lead_time_minutes` (number)
- `max_advance_days` (number)
- `buffer_before_minutes` (number)
- `buffer_after_minutes` (number)
- `rounding` (CEIL | FLOOR | NEAREST)
- `enforce_boundary_alignment` (boolean)

**Relationships:**
- BookingTimePolicy 1..1 BookableUnit (preferred)
- BookingTimePolicy informs BookingWidget variant logic

**Public UX Requirements:**
- UI must clearly explain disabled selections (lead time, max advance, min/max duration, buffers).
- All-day bookings must respect check-in/check-out times where set.

---

### Booking (Booking Record)

A user's reservation request/record.

**Fields:**
- `id` (uuid)
- `tenant_id` (fk Tenant)
- `listing_id` (fk Listing)
- `bookable_unit_id` (fk BookableUnit, optional)
- `user_id` (fk User)
- `organization_id` (fk Organization, optional, if booking-as-org)
- `status` (PENDING | CONFIRMED | CANCELLED | COMPLETED)
- `starts_at` (timestamp)
- `ends_at` (timestamp)
- `quantity` (number, default: 1)
- `total_price_cents` (number)
- `currency` (string, default: NOK)
- `notes` (text)
- `metadata` (json)
- `created_at` (timestamp)

**Relationships:**
- Booking 1..1 Listing
- Booking 0..1 BookableUnit
- Booking 1..1 User
- Booking 0..1 Organization (booking as org)
- Booking 0..N Payments
- Booking 0..1 Invoice
- Booking 0..N Refunds
- Booking 1..N Allocations (usually 1 allocation per booking, but can support split allocations for packages)

**Public Constraints:**
- Public users can view only their own bookings.
- Cancellation rules are enforced by policy and must be reflected in the UI.

---

### Allocation (Anti Double Booking)

Represents blocked/consumed availability.

**Fields:**
- `id` (uuid)
- `tenant_id` (fk Tenant)
- `listing_id` (fk Listing)
- `bookable_unit_id` (fk BookableUnit, optional)
- `booking_id` (fk Booking, optional)
- `starts_at` (timestamp)
- `ends_at` (timestamp)
- `quantity` (number, default: 1)
- `allocation_type` (BOOKING | BLOCK | MAINTENANCE | SEASONAL)
- `status` (ACTIVE | RELEASED | EXPIRED)

**Relationships:**
- Allocation 1..1 Listing
- Allocation 0..1 BookableUnit
- Allocation 0..1 Booking

**Public Behavior:**
- Availability view is computed from allocations.
- MAINTENANCE and SEASONAL must be shown as non-bookable periods with clear labels.
- Quantity/capacity models must calculate remaining availability (total - allocated).

---

### ListingMedia

**Fields:**
- `listing_id` (fk Listing)
- `url` (string)
- `type` (IMAGE | VIDEO)

**Public Usage:** hero/gallery

---

### ListingCategory

**Fields:**
- `id` (uuid)
- `name` (string)
- `slug` (string)

**Join:** ListingCategories(listing_id, category_id)

**Public Usage:** filters and browsing

---

### AvailabilityRule

Defines operating hours and blackouts.

**Public Usage:** determines which days/times can be offered.

---

### PricingRule

Dynamic pricing (weekend, peak, org discount).

**Public Usage:** price summary + "from price" and breakdown.

---

### AddOn

Optional extras (equipment rental, cleaning).

**Public Usage:** checkout selection and total price.

---

### ShareableLink

Public booking entry point.

**Public Usage:** open a specific listing or prefiltered results.

---

## Relationships

- Tenant has many Listings, Users, Bookings, Allocations
- Listing has many BookableUnits, Bookings, Allocations
- BookableUnit has zero/one BookingTimePolicy, many Bookings, many Allocations
- Booking belongs to User and Listing, may belong to Organization and BookableUnit
- Allocation belongs to Listing, may belong to BookableUnit and Booking

---

## Booking Model to Data Mapping (Public UI)

### TIME_RANGE
Requires BookableUnit + BookingTimePolicy + Allocations

### SLOT
Requires BookingTimePolicy.slot_step_minutes + enforce_boundary_alignment + Allocations

### ALL_DAY
Uses checkin/checkout and min/max days + Allocations

### QUANTITY
Uses Listing.quantity or Unit.quantity + Allocations.quantity

### CAPACITY
Uses Listing.capacity or Unit.capacity + Allocations.quantity

### PACKAGE
Maps to multiple BookableUnits or bundled rules (requires package definition in metadata or a package table)

---

## Public UI Implications

### Search/Results
- Only PUBLISHED listings
- Filter by listing_type, categories
- Show availability indicators

### Listing Detail
- Display Listing + BookableUnits
- Show AvailabilityRules and PricingRules
- Integrate BookingWidget based on booking_model

### BookingWidget
- Adapts to booking_model
- Uses BookingTimePolicy for validation
- Checks Allocations for conflicts
- Calculates pricing from PricingRules

### Confirmation/Receipt
- Shows Booking details
- Links to Listing and BookableUnit
- Displays payment status

### My Bookings
- Shows user's Bookings only
- Filters by status, date
- Links to Listing details

---

**Note:** This data model focuses on public-facing entities only. Admin/backoffice entities (approvals, user management, system configuration) are intentionally excluded from this scope.
