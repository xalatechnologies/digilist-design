# Confirmation / Receipt (Public) Section Specification

**Created:** 2025-01-12  
**Section Type:** Booking Outcome Communication  
**Scope:** Public end-user experience only

---

## Overview

This section defines how booking outcomes are communicated to users after they complete a booking or submit an application. The confirmation page provides clear status information, booking summary, and next steps guidance.

---

## Specification

### Booking Outcome States

#### 1. Confirmed Booking

**Status:** Booking is immediately confirmed and active

**Display Elements:**
- **Status indicator:** Success icon (checkmark) + "Booking Confirmed" text
- **Status color:** Green (semantic color, not brand blue)
- **Booking summary:** Complete booking details
- **Receipt:** Downloadable receipt/invoice
- **Next steps:** Clear guidance on what happens next

**User Actions Available:**
- View booking in "My Bookings"
- Download receipt
- Share booking (optional)
- Book another listing
- Return to search

**Key Information Displayed:**
- Booking reference number
- Listing name and location
- Date and time (or booking parameters)
- Price breakdown
- Payment status (if applicable)
- Contact information

---

#### 2. Pending Approval

**Status:** Booking requires approval before confirmation

**Display Elements:**
- **Status indicator:** Pending icon (clock/hourglass) + "Pending Approval" text
- **Status color:** Amber/orange (semantic color)
- **Booking summary:** Submitted booking details
- **Expected timeline:** When to expect response
- **Next steps:** What happens during approval process

**User Actions Available:**
- View application in "My Bookings"
- Contact support (if questions)
- Return to search
- Cancel application (if allowed)

**Key Information Displayed:**
- Application reference number
- Listing name and location
- Requested date/time (or booking parameters)
- Submitted price estimate
- Approval timeline
- Contact information for questions

---

#### 3. Cancelled or Failed Booking

**Status:** Booking was cancelled or failed

**Display Elements:**
- **Status indicator:** Error icon (X) + "Booking Cancelled" or "Booking Failed" text
- **Status color:** Red (semantic color)
- **Reason:** Clear explanation of why booking failed/cancelled
- **Booking summary:** Original booking details (for reference)
- **Next steps:** What user can do next

**User Actions Available:**
- Try booking again
- Contact support
- Return to search
- View booking history

**Key Information Displayed:**
- Cancellation/failure reason
- Original booking details
- Refund information (if applicable)
- Contact information

---

### Page Structure (Stable)

#### Header Section
- **Breadcrumb navigation** - Back to search or listing detail
- **Status badge** - Visual status indicator (icon + text)

#### Main Content

**Status Panel:**
- Status icon (semantic color)
- Status title (e.g., "Booking Confirmed")
- Status description/explanation
- Next steps guidance

**Booking Summary Card:**
- Booking reference number
- Listing information (name, location, image)
- Booking details (date, time, quantity, etc.)
- Price breakdown
- Payment information (if applicable)

**Actions Section:**
- Primary action (e.g., "View in My Bookings")
- Secondary actions (e.g., "Download Receipt", "Book Another")
- Support/contact link

#### Footer Section
- Related listings (optional)
- Help/contact information

---

### Status Communication Rules

#### Visual States

**Confirmed:**
- Green icon (checkmark) + green text
- Success message
- Clear "what's next" guidance

**Pending:**
- Amber/orange icon (clock) + amber/orange text
- Pending message
- Timeline expectations
- Approval process explanation

**Cancelled/Failed:**
- Red icon (X) + red text
- Error/cancellation message
- Reason explanation
- Recovery options

#### No Color-Only Communication

**All status states must include:**
- Icon (semantic, not brand blue)
- Text label
- Description/explanation
- Next steps text

**Brand blue (#33649E) is NOT used for status colors.**

---

### Next Steps and User Guidance

#### Confirmed Booking Next Steps

**Immediate:**
- "Your booking is confirmed"
- "You will receive a confirmation email"
- "Booking details are saved in 'My Bookings'"

**Before Event:**
- "You will receive a reminder [X days] before"
- "Check-in instructions: [details]"
- "Contact information: [details]"

**After Event:**
- "Thank you for using DigiList"
- "Rate your experience" (optional)

#### Pending Approval Next Steps

**Immediate:**
- "Your application has been submitted"
- "You will receive a response within [timeline]"
- "Application details are saved in 'My Bookings'"

**During Approval:**
- "We will review your application"
- "You will be notified when a decision is made"
- "Contact us if you have questions"

**After Approval:**
- "You will receive confirmation or alternative options"
- "Payment may be required upon approval"

---

### Receipt/Invoice Display

#### Receipt Content

**Header:**
- Receipt number
- Issue date
- Booking reference

**Booking Details:**
- Listing name and location
- Booking date/time
- Booking parameters (quantity, capacity, etc.)
- Duration (if applicable)

**Pricing Breakdown:**
- Base price
- Discounts (if applicable)
- Taxes/VAT (if applicable)
- Total amount
- Payment method (if applicable)

**Footer:**
- Terms and conditions link
- Contact information
- Receipt validity

#### Receipt Actions

- **Download PDF** - Downloadable receipt
- **Print** - Print-friendly version
- **Email** - Send receipt via email (optional)
- **Share** - Share receipt link (optional)

---

### Error Handling

#### Booking Failure Scenarios

**Payment Failure:**
- Clear error message
- Payment retry option
- Alternative payment methods
- Contact support option

**Validation Failure:**
- Explanation of what went wrong
- What user needs to fix
- Link back to booking form

**System Error:**
- Generic error message
- Booking may still be processing
- Check "My Bookings" for status
- Contact support if issue persists

---

### Accessibility Requirements

#### Keyboard Navigation
- All action buttons keyboard accessible
- Tab order follows visual flow
- Download/print actions keyboard accessible

#### Screen Reader Support
- Status clearly announced
- Booking summary structured semantically
- Action buttons have descriptive labels
- Receipt content accessible

#### Visual States
- Status icons + text (not color-only)
- Focus indicators visible
- Error states include icon + text

---

## Sample Data

See `data.json` for sample booking records including:
- Confirmed booking (complete details)
- Pending approval booking (submitted details)
- Booking reference numbers
- Price breakdowns
- Next steps information

---

## Screen Designs

See screen design components in `src/sections/confirmation-receipt-public/` for:
- Confirmation page (confirmed state)
- Confirmation page (pending approval state)
- Booking summary display
- Next actions display

---

## Scope Boundaries

### In Scope
- ✅ Booking confirmation display
- ✅ Pending approval communication
- ✅ Cancelled/failed booking handling
- ✅ Receipt/invoice display
- ✅ Next steps guidance
- ✅ User actions (view booking, download receipt)

### Out of Scope
- ❌ Payment processing (handled separately)
- ❌ Approval workflow (admin side)
- ❌ Booking modification (handled in My Bookings)
- ❌ Refund processing (handled separately)

---

**Related Documents:**
- `/product/sections/public-information-architecture/spec.md` - Information architecture context
- `/product/sections/bookingwidget-system-core/spec.md` - Booking submission context
