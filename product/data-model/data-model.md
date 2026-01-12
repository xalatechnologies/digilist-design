# Data Model: Listing Detail (Public)

**Created:** 2025-01-12  
**Scope:** Public end-user experience - Listing Detail page only

---

## Entities

### Tenant

**Description:** Organization or municipality that owns/manages listings. Used for multi-tenant support and timezone configuration.

**Fields:**
- `id` - Unique identifier
- `name` - Organization name
- `timezone` - Timezone for date/time display

**Public Usage:** Used for timezone-aware date/time display. Not directly displayed to users.

---

### Listing

**Description:** The main entity that users view on the detail page. Represents a bookable resource (space, equipment, event, service, etc.).

**Fields:**
- `id` - Unique identifier
- `tenant_id` - Reference to Tenant
- `name` - Listing title/name
- `slug` - URL-friendly identifier
- `description` - Full description (rich text)
- `listing_type` - Type enum: `SPACE | RESOURCE | EVENT | SERVICE | VEHICLE | OTHER`
- `booking_model` - Booking model enum: `TIME_RANGE | SLOT | ALL_DAY | QUANTITY | CAPACITY | PACKAGE`
- `status` - Status enum: `PUBLISHED | MAINTENANCE | ARCHIVED`
- `capacity` - Maximum capacity (optional, for capacity-based listings)
- `quantity` - Available quantity (optional, for quantity-based listings)
- `location` - Location object:
  - `address` - Full address string
  - `geo` - Geographic coordinates (optional): `{ lat, lng }`
- `contact` - Contact information:
  - `email` - Contact email
  - `phone` - Contact phone
- `opening_hours` - Opening hours (optional): `{ weekdays: { start, end }, weekends: { start, end } }`
- `metadata` - Additional metadata (JSON, flexible)

**Public Usage:** Core entity displayed on Listing Detail page. Determines which BookingWidget variant to render based on `booking_model`.

**Notes:** Listing Detail must work without BookableUnit (default unit is implicit). BookingWidget variant is controlled by `listing.booking_model` + `BookingTimePolicy`.

---

### ListingMedia

**Description:** Images and media associated with a listing. Used in hero section image gallery.

**Fields:**
- `listing_id` - Reference to Listing
- `url` - Media URL
- `alt_text` - Alternative text for accessibility
- `sort_order` - Display order

**Public Usage:** Displayed in hero section image gallery. Primary image shown first, thumbnails for navigation.

---

### FacilityTag

**Description:** Facility/amenity tags displayed as chips on listing detail page (e.g., Parking, WiFi, Accessible).

**Fields:**
- `id` - Unique identifier
- `label` - Display label (e.g., "Parking", "WiFi")
- `icon_key` - Icon key for Designsystemet.no icon mapping

**Public Usage:** Displayed as chips/badges showing listing amenities. Used for filtering and quick scanning.

**Relationships:** Many-to-many with Listing via `listing_facilities` join table.

---

### RuleItem

**Description:** Rules and guidelines displayed in rules section. Categorized by type for better organization.

**Fields:**
- `id` - Unique identifier
- `listing_id` - Reference to Listing
- `title` - Rule title/heading
- `description` - Rule description/details
- `is_required` - Boolean indicating if rule is mandatory
- `category` - Category enum: `SAFETY | CLEANING | BOOKING | EQUIPMENT | OTHER`

**Public Usage:** Displayed in rules section, organized by category. Helps users understand restrictions and requirements before booking.

---

### FAQItem

**Description:** Frequently asked questions displayed in FAQ section.

**Fields:**
- `id` - Unique identifier
- `listing_id` - Reference to Listing
- `question` - FAQ question
- `answer` - FAQ answer

**Public Usage:** Displayed in FAQ/help section to answer common questions about the listing.

---

### BookableUnit

**Description:** Individual bookable units within a listing. Used when a listing has multiple units (e.g., multiple rooms, equipment sets).

**Fields:**
- `id` - Unique identifier
- `listing_id` - Reference to Listing
- `name` - Unit name (e.g., "Main Hall", "Room A")
- `is_default` - Boolean indicating default unit
- `capacity` - Capacity override (optional, overrides listing capacity)
- `quantity` - Quantity override (optional, overrides listing quantity)

**Public Usage:** If listing has multiple units, user selects unit before booking. If only one unit or no units defined, default unit is implicit.

**Notes:** Listing Detail must function without BookableUnit (default unit implicit). If no BookableUnit exists, listing itself is the bookable unit.

---

### BookingTimePolicy

**Description:** Time policy constraints that control booking availability and selection. Applied per BookableUnit (or listing if no units).

**Fields:**
- `bookable_unit_id` - Reference to BookableUnit (or listing if no units)
- `slot_step_minutes` - Minimum time slot size (e.g., 30 minutes)
- `min_duration` - Minimum booking duration (minutes)
- `max_duration` - Maximum booking duration (minutes)
- `lead_time` - Minimum advance booking time (minutes)
- `max_advance_days` - Maximum days in advance bookings can be made
- `buffer_before` - Buffer time required before bookings (minutes)
- `buffer_after` - Buffer time required after bookings (minutes)
- `check_in_time` - Check-in time before start (minutes, for ALL_DAY)
- `check_out_time` - Check-out time after end (minutes, for ALL_DAY)

**Public Usage:** Controls BookingWidget validation and availability display. Determines which time slots/dates are selectable.

**Notes:** BookingWidget variant is controlled by `listing.booking_model` + `BookingTimePolicy`. Policy constraints are enforced in BookingWidget validation.

---

### AllocationSummary

**Description:** Public view of availability - shows blocked/available periods without exposing booking details.

**Fields:**
- `listing_id` - Reference to Listing
- `unit_id` - Reference to BookableUnit (optional, if multiple units)
- `starts_at` - Start timestamp
- `ends_at` - End timestamp
- `allocation_type` - Type enum: `BOOKING | BLOCK | MAINTENANCE | SEASONAL`
- `status` - Status enum: `ACTIVE`

**Public Usage:** Used to display availability calendar. Shows which periods are blocked/available without exposing booking details. Allocation types determine visual display (maintenance = red, seasonal = orange, booking = gray, block = yellow).

**Notes:** This is a summary view - does not expose individual booking details, only availability status per time period.

---

## Relationships

- **Tenant → Listing:** One-to-many. Tenant owns multiple listings.
- **Listing → ListingMedia:** One-to-many. Listing has multiple media items.
- **Listing → FacilityTag:** Many-to-many via `listing_facilities` join table. Listing has multiple facilities, facilities appear on multiple listings.
- **Listing → RuleItem:** One-to-many. Listing has multiple rules.
- **Listing → FAQItem:** One-to-many. Listing has multiple FAQs.
- **Listing → BookableUnit:** One-to-many. Listing can have multiple bookable units (optional).
- **BookableUnit → BookingTimePolicy:** One-to-one. Each unit has one time policy (or listing has policy if no units).
- **Listing/BookableUnit → AllocationSummary:** One-to-many. Multiple allocation periods per listing/unit.

---

## Booking Model to Data Mapping

### TIME_RANGE
- Uses: `BookingTimePolicy` (slot_step_minutes, min/max_duration, lead_time, buffers)
- Uses: `AllocationSummary` (shows blocked periods)
- Input: Start date/time, end date/time (or duration)

### SLOT
- Uses: `BookingTimePolicy` (slot_step_minutes, lead_time, max_advance_days)
- Uses: `AllocationSummary` (shows booked slots)
- Input: Date, pre-defined slot selection

### ALL_DAY
- Uses: `BookingTimePolicy` (min/max_duration in days, lead_time, max_advance_days, check_in/out)
- Uses: `AllocationSummary` (shows blocked dates)
- Input: Date range or single date + duration

### QUANTITY
- Uses: `Listing.quantity` or `BookableUnit.quantity`
- Uses: `BookingTimePolicy` (lead_time, max_advance_days, if time-bound)
- Uses: `AllocationSummary` (if time-bound, shows quantity availability per period)
- Input: Quantity selector, optional date/time

### CAPACITY
- Uses: `Listing.capacity` or `BookableUnit.capacity`
- Uses: `BookingTimePolicy` (lead_time, max_advance_days)
- Uses: `AllocationSummary` (shows remaining capacity per period)
- Input: Attendee count, date/time

### PACKAGE
- Uses: `BookingTimePolicy` (lead_time, max_advance_days, if time-bound)
- Uses: `AllocationSummary` (if time-bound)
- Input: Package selection, optional date/time

---

## Key Design Implications

### Parametric BookingWidget
- BookingWidget variant determined by `listing.booking_model`
- Policy constraints from `BookingTimePolicy` applied to validation
- Availability display from `AllocationSummary` adapted to booking model

### Default Unit Handling
- If no `BookableUnit` exists, listing itself is the bookable unit
- `BookingTimePolicy` can be attached directly to listing
- `AllocationSummary` references `listing_id` directly

### Availability Display
- `AllocationSummary` provides public view (no booking details exposed)
- Allocation types determine visual treatment:
  - `BOOKING` - Gray/blocked (existing booking)
  - `BLOCK` - Yellow/warning (reserved/blocked)
  - `MAINTENANCE` - Red/error (maintenance period)
  - `SEASONAL` - Orange/warning (seasonal closure)

---

## Scope Boundaries

### In Scope (Public Listing Detail)
- ✅ Viewing listing information
- ✅ Viewing rules and facilities
- ✅ Viewing availability (public summary)
- ✅ Selecting booking parameters via BookingWidget
- ✅ Understanding constraints and restrictions

### Out of Scope
- ❌ Booking creation (handled in separate flow)
- ❌ Payment processing
- ❌ User authentication
- ❌ Booking management
- ❌ Admin configuration of policies
- ❌ Detailed booking information (only summary shown)

---

**Related Documents:**
- `/product/product-overview.md` - Product vision for Listing Detail
- `/product/sections/bookingwidget-system-core/spec.md` - BookingWidget component specification
