# BookingWidget System (Core) Section Specification

**Created:** 2025-01-12  
**Section Type:** Parametric Component System  
**Scope:** Public end-user experience only

---

## Overview

This section defines a single parametrized BookingWidget component that supports all six booking models. The component adapts its interface, validation, and behavior based on the listing's `booking_model` configuration.

---

## Specification

### Component Purpose

The BookingWidget is a single, flexible component that allows users to:
1. Select a bookable unit (if multiple available)
2. View availability in the correct format for the booking model
3. Select booking parameters (time, quantity, capacity, package, etc.)
4. Review pricing calculation
5. Submit booking or application

---

### Props Interface

```typescript
interface BookingWidgetProps {
  // Listing configuration
  listingId: string
  bookingModel: 'TIME_RANGE' | 'SLOT' | 'ALL_DAY' | 'QUANTITY' | 'CAPACITY' | 'PACKAGE'
  bookableUnits?: BookableUnit[] // If multiple units available
  
  // Time policy constraints
  timePolicy?: {
    slotSize?: number // Minutes
    minDuration?: number // Minutes
    maxDuration?: number // Minutes
    leadTime?: number // Minutes (minimum advance booking)
    maxAdvance?: number // Days (maximum advance booking)
    bufferBefore?: number // Minutes
    bufferAfter?: number // Minutes
    checkInTime?: number // Minutes before start
    checkOutTime?: number // Minutes after end
  }
  
  // Availability data
  availability?: AvailabilityData
  
  // Pricing
  pricing?: {
    chargeUnit: 'HOUR' | 'DAY' | 'UNIT' | 'PACKAGE'
    basePrice: number
    currency: string
  }
  
  // Callbacks
  onSubmit: (bookingData: BookingData) => Promise<void>
  onError?: (error: Error) => void
  
  // UI configuration
  requireApproval?: boolean // Shows "Send application" instead of "Book now"
  disabled?: boolean
}
```

---

### Booking Model Variants

#### 1. TIME_RANGE

**Input Controls:**
- Start date picker
- Start time picker (constrained by slot size)
- End date picker (optional, can use duration instead)
- End time picker (constrained by slot size)
- Duration selector (alternative to end time)

**Availability Display:**
- Calendar view showing available time ranges
- Visual indication of booked/blocked periods
- Time slot selection with conflict detection
- Buffer periods shown (if configured)

**Validation Rules:**
- Start time must be in future (respects lead time)
- End time must be after start time
- Duration must be within min/max duration
- Selected range must not conflict with existing bookings
- Selected range must not overlap maintenance/blocked periods
- Must respect buffer before/after if configured

**Error States:**
- "Booking must be at least X hours in advance" (lead time violation)
- "Booking duration must be between X and Y hours" (duration violation)
- "Selected time conflicts with existing booking" (allocation conflict)
- "This time slot is unavailable" (blocked period)

**Disabled States:**
- Disabled if lead time not met
- Disabled if max advance exceeded
- Disabled if duration constraints violated
- Disabled if time slot blocked

**CTA Text:**
- "Book now" (if immediate confirmation)
- "Send application" (if requires approval)

**Example Use Case:** Sports hall hourly rental

---

#### 2. SLOT

**Input Controls:**
- Date picker
- Pre-defined slot selector (radio buttons or dropdown)
- Slot availability indicator (shows remaining capacity)

**Availability Display:**
- Calendar view with available slots highlighted
- List of available slots for selected date
- Slot capacity indicator (if applicable)
- Disabled slots clearly marked

**Validation Rules:**
- Date must be in future (respects lead time)
- Date must not exceed max advance
- Selected slot must have available capacity
- Slot must not be blocked/maintenance

**Error States:**
- "Booking must be at least X days in advance" (lead time violation)
- "This slot is fully booked" (capacity exceeded)
- "This slot is unavailable" (blocked/maintenance)

**Disabled States:**
- Disabled if lead time not met
- Disabled if max advance exceeded
- Disabled if slot fully booked
- Disabled if slot blocked/maintenance

**CTA Text:**
- "Book slot" (if immediate confirmation)
- "Send application" (if requires approval)

**Example Use Case:** Fitness classes, appointments

---

#### 3. ALL_DAY

**Input Controls:**
- Date picker (single date or date range)
- Duration selector (number of days, if date range)

**Availability Display:**
- Calendar view showing available dates
- Blocked dates clearly marked
- Date range selection
- Consecutive day availability indicator

**Validation Rules:**
- Start date must be in future (respects lead time)
- End date must be after start date
- Date range must not exceed max advance
- All dates in range must be available
- Must respect minimum/maximum duration (days)

**Error States:**
- "Booking must start at least X days in advance" (lead time violation)
- "Selected dates include unavailable dates" (allocation conflict)
- "Booking duration must be between X and Y days" (duration violation)

**Disabled States:**
- Disabled if lead time not met
- Disabled if max advance exceeded
- Disabled if dates blocked/unavailable
- Disabled if duration constraints violated

**CTA Text:**
- "Book dates" (if immediate confirmation)
- "Send application" (if requires approval)

**Example Use Case:** Conference rooms, event spaces

---

#### 4. QUANTITY

**Input Controls:**
- Quantity selector (number input with +/- buttons)
- Date picker (if time-bound)
- Time picker (if applicable)

**Availability Display:**
- Available quantity indicator
- Stock/availability count
- Quantity-based availability calendar (if time-bound)
- Remaining quantity display

**Validation Rules:**
- Quantity must be greater than 0
- Quantity must not exceed available stock
- Date/time must respect lead time and max advance (if time-bound)
- Selected quantity must be available for selected date/time

**Error States:**
- "Only X units available" (quantity exceeded)
- "Booking must be at least X days in advance" (lead time violation, if time-bound)
- "Selected quantity not available for this date" (availability conflict)

**Disabled States:**
- Disabled if quantity exceeds available stock
- Disabled if lead time not met (if time-bound)
- Disabled if max advance exceeded (if time-bound)

**CTA Text:**
- "Book X units" (if immediate confirmation)
- "Send application" (if requires approval)

**Example Use Case:** Equipment rental, resource booking

---

#### 5. CAPACITY

**Input Controls:**
- Number of attendees input
- Date picker
- Time picker (if applicable)

**Availability Display:**
- Capacity availability indicator
- Remaining capacity display
- Capacity-based calendar view
- Attendee count vs. capacity visualization

**Validation Rules:**
- Attendee count must be greater than 0
- Attendee count must not exceed remaining capacity
- Date/time must respect lead time and max advance
- Selected capacity must be available for selected date/time

**Error States:**
- "Only X spots available" (capacity exceeded)
- "Booking must be at least X days in advance" (lead time violation)
- "Selected capacity not available for this date/time" (availability conflict)

**Disabled States:**
- Disabled if attendee count exceeds remaining capacity
- Disabled if lead time not met
- Disabled if max advance exceeded

**CTA Text:**
- "Book for X attendees" (if immediate confirmation)
- "Send application" (if requires approval)

**Example Use Case:** Events with attendee limits, workshops

---

#### 6. PACKAGE

**Input Controls:**
- Package selector (radio buttons or dropdown)
- Date picker (if time-bound)
- Time picker (if applicable)

**Availability Display:**
- Available packages list
- Package details and pricing
- Package availability calendar (if time-bound)
- Package capacity indicator (if applicable)

**Validation Rules:**
- Package must be selected
- Package must be available
- Date/time must respect lead time and max advance (if time-bound)
- Package must have available capacity (if applicable)

**Error States:**
- "This package is unavailable" (package not available)
- "Booking must be at least X days in advance" (lead time violation, if time-bound)
- "Package fully booked" (capacity exceeded, if applicable)

**Disabled States:**
- Disabled if package unavailable
- Disabled if lead time not met (if time-bound)
- Disabled if max advance exceeded (if time-bound)
- Disabled if package capacity exceeded

**CTA Text:**
- "Book package" (if immediate confirmation)
- "Send application" (if requires approval)

**Example Use Case:** Event packages, service bundles

---

### State Matrix

#### Loading State
- Shows loading spinner/skeleton
- Disables all inputs
- Displays "Loading availability..."

#### Empty State
- Shows message: "No availability found"
- Explains why (e.g., "All dates are fully booked")
- Provides alternative actions (contact, waitlist if applicable)

#### Error State
- Shows error message clearly
- Explains what went wrong
- Provides recovery actions (try different date/time, contact support)
- Error message must be accessible (not color-only)

#### Disabled-by-Policy States

**Lead Time Violation:**
- Input disabled with explanation: "Bookings must be made at least X hours/days in advance"
- Shows earliest available booking time

**Max Advance Violation:**
- Input disabled with explanation: "Bookings can only be made up to X days in advance"
- Shows latest available booking date

**Min/Max Duration Violation:**
- Input disabled with explanation: "Booking duration must be between X and Y hours/days"
- Shows valid duration range

**Buffer Periods:**
- Time slots disabled with explanation: "X minutes required before/after bookings"
- Visual indication of buffer periods

#### Blocked-by-Allocation States

**Maintenance:**
- Dates/times disabled with explanation: "Unavailable due to maintenance"
- Shows maintenance period clearly

**Seasonal Block:**
- Dates/times disabled with explanation: "Unavailable during this period"
- Shows seasonal block period

**Existing Booking:**
- Dates/times disabled (no explanation needed, visual indication sufficient)
- Shows booked periods on calendar

**Block Allocation:**
- Dates/times disabled with explanation: "Reserved/blocked"
- Shows block period

---

### Validation Rules Summary

**Common Rules (All Models):**
- Lead time: Booking must be X time units in advance
- Max advance: Booking cannot exceed X days in advance
- Availability: Selected parameters must be available
- Capacity: Must not exceed available capacity (if applicable)

**Model-Specific Rules:**
- **TIME_RANGE:** Duration constraints, time slot alignment, buffer periods
- **SLOT:** Slot availability, slot capacity
- **ALL_DAY:** Consecutive day availability, date range constraints
- **QUANTITY:** Stock availability, quantity limits
- **CAPACITY:** Remaining capacity, attendee limits
- **PACKAGE:** Package availability, package capacity

---

### WCAG Interaction Requirements

#### Keyboard Navigation
- All inputs keyboard accessible (Tab navigation)
- Date/time pickers keyboard navigable
- Quantity selectors keyboard accessible (+/- buttons)
- Radio buttons/dropdowns keyboard navigable
- Submit button keyboard accessible (Enter/Space)

#### Focus Management
- Visible focus indicators on all interactive elements
- Focus ring: 2px solid, brand blue (#33649E), contrast ≥ 3:1
- Focus order follows visual flow
- Focus trap in modals/popups (date pickers, etc.)

#### Screen Reader Support
- All inputs have proper labels (`<label>` or `aria-label`)
- Error messages associated with inputs (`aria-describedby`)
- Disabled states announced ("unavailable", "fully booked")
- Status updates announced ("X spots remaining", "Price updated")

#### Visual States
- **No color-only communication:**
  - Disabled states: Opacity + icon/text indicator
  - Error states: Icon + text message (not just red color)
  - Selected states: Border/background + icon/text
  - Focus states: Ring (visible) + color change

#### Touch Targets
- All interactive elements ≥ 44x44px (mobile)
- Adequate spacing between touch targets
- Date picker cells ≥ 44x44px
- Quantity +/- buttons ≥ 44x44px

---

### Error Handling

#### Error Message Requirements
- Clear, specific error message
- Explains what went wrong
- Explains why it went wrong (if applicable)
- Provides recovery guidance (if applicable)
- Accessible (not color-only, includes icon/text)

#### Error Display
- Error message displayed near relevant input
- Error message associated with input (`aria-describedby`)
- Error state visually distinct (icon + text, not just color)
- Error persists until resolved or dismissed

#### Recovery Actions
- Clear what user needs to do to fix error
- Alternative options suggested (if applicable)
- Contact support option (if error persists)

---

### Microcopy Guidelines

#### CTA Button Text
- **TIME_RANGE:** "Book now" / "Send application"
- **SLOT:** "Book slot" / "Send application"
- **ALL_DAY:** "Book dates" / "Send application"
- **QUANTITY:** "Book X units" / "Send application"
- **CAPACITY:** "Book for X attendees" / "Send application"
- **PACKAGE:** "Book package" / "Send application"

#### Error Messages
- Use clear, user-friendly language
- Avoid technical jargon
- Explain constraints clearly
- Provide context (e.g., "Earliest available booking: [date/time]")

#### Disabled State Explanations
- Explain why input is disabled
- Provide actionable information (e.g., "Earliest available: [date]")
- Use consistent language across all models

#### Availability Indicators
- "X spots remaining"
- "Fully booked"
- "Available"
- "Unavailable" (with reason if applicable)

---

## Sample Data

See `data.json` for sample data for each booking model, including:
- Normal cases for each model
- Time policy constraints
- Availability data
- Pricing examples

---

## Screen Designs

See screen design components in `src/sections/bookingwidget-system-core/` for wireframe-level designs showing:
- Structure and layout for each booking model
- Input controls placement
- Availability display format
- Error and disabled states
- Interaction patterns

---

## Scope Boundaries

### In Scope
- ✅ All six booking model variants
- ✅ Validation and error handling
- ✅ Accessibility compliance (WCAG 2.1 AA)
- ✅ Responsive behavior
- ✅ Time policy enforcement
- ✅ Allocation conflict detection

### Out of Scope
- ❌ Admin configuration UI
- ❌ Time policy configuration
- ❌ Availability management
- ❌ Pricing rule configuration
- ❌ Booking approval workflows (admin side)

---

**Related Documents:**
- `/product/sections/public-booking/listing-detail-spec.md` - Listing Detail template integration
- `/product/sections/public-information-architecture/spec.md` - Information architecture context
