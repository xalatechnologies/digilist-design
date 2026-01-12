# DigiList Listing Detail

## Description

DigiList Listing Detail is a public-facing page that displays comprehensive information about a single listing, allowing end users to understand what the listing offers, view rules and facilities, check availability, and proceed with booking based on the listing's booking model.

## Scope

**In Scope:**
- Detail view of a single Listing for public end users
- Display of listing information, rules, facilities, and practical details
- Availability display (adapted to booking model)
- Booking parameter selection (time/quantity based on booking model)
- Navigation to next step in booking flow

**Out of Scope:**
- ❌ Search/results functionality
- ❌ Backoffice/admin functionality
- ❌ Login/authentication flows
- ❌ Checkout or payment processing
- ❌ Administration of rules/calendar
- ❌ Listing editing
- ❌ Case handling (saksbehandling)
- ❌ "My Bookings" functionality

## Primary Users

### Innbygger (Private Individual)
- Individual citizens making bookings
- Needs clear information and simple booking process

### Organisasjonsbruker (Organization User)
- Organizations (sports clubs, associations, companies) making bookings
- May need to book multiple units or larger quantities

## Core Job

Users must be able to:

1. **Understand what the Listing is**
   - Clear title, description, and visual representation
   - Listing type and category clearly indicated
   - Key features and amenities visible

2. **View rules, facilities, and practical information**
   - Rules and restrictions clearly displayed
   - Facilities and amenities listed
   - Accessibility information available
   - Contact information and opening hours

3. **View availability**
   - Availability displayed in format appropriate for booking model
   - Calendar or availability view adapted to listing type
   - Clear indication of available vs. unavailable periods

4. **Select time/quantity (based on booking model)**
   - Booking parameters selectable via parametric BookingWidget
   - Input controls adapt to booking model (TIME_RANGE, SLOT, ALL_DAY, QUANTITY, CAPACITY, PACKAGE)
   - Real-time validation and feedback

5. **Proceed to next step in booking flow**
   - Clear call-to-action to continue booking
   - Navigation to confirmation/payment (not designed in this scope)

## Problems & Solutions

### Problem 1: Users Can't Find Key Information
**Solution:** Structured layout with clear hierarchy, all essential information visible without excessive scrolling. Information organized in logical sections (description, rules, facilities, availability, booking).

### Problem 2: Users Don't Understand Booking Rules Before Selecting Time
**Solution:** Rules and restrictions displayed prominently before booking section. Clear explanations of constraints (lead time, duration limits, availability windows).

### Problem 3: Booking Interface Doesn't Match Listing Type
**Solution:** Parametric BookingWidget that adapts to listing's booking model. Same template works for all listing types, but booking interface varies appropriately.

### Problem 4: Users Can't Access Information via Keyboard
**Solution:** Full keyboard navigation, WCAG AA compliant. All interactive elements accessible, focus states visible, screen reader support.

## Key Features

- **Stable Page Layout** - Consistent structure across all listing types
- **Parametric BookingWidget** - Adapts to booking model (6 variants)
- **Comprehensive Information Display** - Description, rules, facilities, location, contact
- **Availability Visualization** - Calendar/availability view adapted to booking model
- **Responsive Design** - Desktop two-column, mobile single-column
- **WCAG AA Compliance** - Keyboard navigation, screen reader support, no color-only communication
- **Clear Information Hierarchy** - Essential information visible, progressive disclosure for details

## Design Principles

### Base System
- **Designsystemet.no** used for layout, typography, components, and accessibility
- No custom component styles, reference Designsystemet.no tokens

### Brand Accent
- **Brand color #33649E** used only as accent (CTA buttons, active tabs, selected states)
- Not used for status colors or large background surfaces
- Not used as only indicator for status or selection

### Visual Communication
- **No color-only communication** - All states include icon/text indicators
- Status colors use semantic colors (green=success, amber=warning, red=error)
- Focus states always visible (2px ring, brand blue #33649E)

### Layout
- **Centered container layout** - Consistent max-width, clear hierarchy
- **Mobile-first responsive** - Adapts to all screen sizes
- **Clear visual hierarchy** - Headings, spacing, and content organization

## Success Criteria

### Information Accessibility
- ✅ User finds key information without blind scrolling
- ✅ Essential information visible above the fold
- ✅ Clear section organization and navigation

### Understanding
- ✅ Availability and rules are understandable before user selects time
- ✅ Rules displayed prominently before booking section
- ✅ Clear explanations of constraints and restrictions

### Accessibility
- ✅ UI is fully keyboard navigable
- ✅ WCAG AA compliant (contrast, focus states, screen reader support)
- ✅ No color-only communication of state or selection

## Non-Goals

**Explicitly Out of Scope:**
- ❌ Login/authentication flows
- ❌ Checkout or payment processing
- ❌ Search/results functionality
- ❌ Backoffice/admin functionality
- ❌ Listing administration/editing
- ❌ Case handling workflows
- ❌ "My Bookings" functionality
- ❌ User account management

---

**Related:** This is a focused product vision for the Listing Detail page within the broader DigiList public booking experience.
