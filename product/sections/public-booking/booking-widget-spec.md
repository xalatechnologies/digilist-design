# BookingWidget Component Specification

**Created:** 2025-01-12  
**Component Type:** Parametric, Variable Structure

---

## Overview

BookingWidget is a single, flexible component that adapts its form and behavior based on the listing's `booking_model`. It handles all six booking models through a unified interface that presents the appropriate input controls for each model type.

---

## Component Purpose

The BookingWidget allows users to:
1. Select a bookable unit (if multiple available)
2. View availability in the correct format for the booking model
3. Select booking parameters (time, quantity, capacity, package, etc.)
4. Review pricing calculation
5. Submit booking or application

---

## Booking Model Variants

### 1. TIME_RANGE
**Input Controls:**
- Start date picker
- Start time picker
- End date picker (or duration selector)
- End time picker

**Availability Display:**
- Calendar view showing available time ranges
- Visual indication of booked/blocked periods
- Time slot selection with conflict detection

**Example Use Case:** Sports hall hourly rental

---

### 2. SLOT
**Input Controls:**
- Date picker
- Pre-defined slot selector (radio buttons or dropdown)
- Slot availability indicator

**Availability Display:**
- Calendar view with available slots highlighted
- List of available slots for selected date
- Slot capacity indicator (if applicable)

**Example Use Case:** Fitness classes, appointments

---

### 3. ALL_DAY
**Input Controls:**
- Date picker (single date or date range)
- Duration selector (number of days)

**Availability Display:**
- Calendar view showing available dates
- Blocked dates clearly marked
- Date range selection

**Example Use Case:** Conference rooms, event spaces

---

### 4. QUANTITY
**Input Controls:**
- Quantity selector (number input with +/- buttons)
- Date picker (if time-bound)
- Time picker (if applicable)

**Availability Display:**
- Available quantity indicator
- Stock/availability count
- Quantity-based availability calendar

**Example Use Case:** Equipment rental, resource booking

---

### 5. CAPACITY
**Input Controls:**
- Number of attendees input
- Date picker
- Time picker (if applicable)

**Availability Display:**
- Capacity availability indicator
- Remaining capacity display
- Capacity-based calendar view

**Example Use Case:** Events with attendee limits, workshops

---

### 6. PACKAGE
**Input Controls:**
- Package selector (radio buttons or cards)
- Date picker (if applicable)
- Package details display

**Availability Display:**
- Package availability calendar
- Package-specific availability rules

**Example Use Case:** Event packages, bundled services

---

## Common Elements (All Variants)

### Bookable Unit Selection
- If listing has multiple bookable units, show selector first
- Display unit name, capacity, and pricing
- Only show if multiple units exist

### Availability Display
- Adapts to booking model and time policy
- Shows conflicts and restrictions
- Clear visual feedback for unavailable options
- Explains why something cannot be booked

### Pricing Display
- Real-time price calculation
- Shows base price, discounts, VAT
- Adapts to charge_unit (per hour, per day, per unit, etc.)
- Actor type discounts displayed

### Rules & Restrictions Display
- Minimum/maximum duration
- Advance booking limits
- Eligibility requirements
- Age restrictions (if applicable)

### Action Buttons
- "Book Now" or "Send Application" (based on approval mode)
- "Check Availability" (if needed)
- Clear, disabled state when booking not possible

---

## Component Props Interface

```typescript
interface BookingWidgetProps {
  listing: Listing;
  bookableUnits: BookableUnit[];
  bookingModel: BookingModel; // TIME_RANGE | SLOT | ALL_DAY | QUANTITY | CAPACITY | PACKAGE
  availability: AvailabilityData;
  timePolicy: TimePolicy;
  pricing: PricingConfig;
  onBookingSubmit: (bookingData: BookingFormData) => void;
  onAvailabilityCheck?: (params: AvailabilityParams) => void;
  userActorType?: ActorType;
}
```

---

## User Flow

1. **Select Bookable Unit** (if multiple)
   - User sees list of available units
   - Selects desired unit
   - Widget updates to show unit-specific availability

2. **View Availability**
   - Widget displays availability in format appropriate for booking model
   - User can navigate calendar/time slots
   - Conflicts and restrictions clearly marked

3. **Select Booking Parameters**
   - User selects parameters based on booking model
   - Real-time validation and feedback
   - Pricing updates as selections change

4. **Review & Submit**
   - User reviews selections and pricing
   - Accepts terms and conditions
   - Submits booking or application

---

## Error States & Validation

### Validation Rules
- Required fields must be filled
- Selected time/date must be available
- Quantity/capacity must be within limits
- Minimum/maximum duration rules enforced
- Advance booking limits enforced

### Error Messages
- Clear, specific error messages
- Explain why selection is invalid
- Suggest alternatives when possible
- Link to rules/restrictions for more info

### Disabled States
- Disable booking when:
  - No availability
  - User doesn't meet eligibility requirements
  - Required information missing
  - Validation errors present

---

## Design Requirements

### Responsive Design
- Mobile-first approach
- Touch-friendly controls
- Accessible date/time pickers
- Responsive calendar views

### Accessibility
- Keyboard navigation
- Screen reader support
- ARIA labels for all inputs
- Focus management

### Visual Design
- Clear visual hierarchy
- Consistent spacing and typography
- Loading states for async operations
- Success/error feedback

---

## Technical Considerations

### State Management
- Component manages its own form state
- Availability data fetched asynchronously
- Pricing calculated client-side when possible
- Optimistic updates for better UX

### Performance
- Lazy load availability data
- Debounce availability checks
- Cache availability data
- Minimize re-renders

---

## Scope Boundaries

### In Scope
- ✅ All 6 booking model variants
- ✅ Bookable unit selection
- ✅ Availability display (adapted to model)
- ✅ Pricing calculation and display
- ✅ Form validation and error handling
- ✅ Booking submission

### Out of Scope
- ❌ Admin approval workflows
- ❌ Payment processing (handled separately)
- ❌ Booking management (handled in My Bookings)
- ❌ Listing management (admin only)

---

**Next:** Design the actual BookingWidget component with all variants
