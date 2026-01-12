# Listing Detail Template (Public) Section Specification

**Created:** 2025-01-12  
**Section Type:** Page Template with Parametric Component Integration  
**Scope:** Public end-user experience only

---

## Overview

This section defines a stable listing detail layout template that works for all listing types (SPACE, RESOURCE, EVENT, SERVICE). The template has a fixed structure with a parametric BookingWidget integration that adapts based on the listing's configuration.

---

## Specification

### Template Purpose

The Listing Detail Template provides:
1. Comprehensive listing information display
2. Consistent layout across all listing types
3. Parametric BookingWidget integration
4. Responsive behavior (desktop two-column, mobile single-column)
5. Clear navigation and information hierarchy

---

### Page Structure (Stable)

#### Header Section
- **Breadcrumb navigation** - Back to search results (preserves filters)
- **Share button** - Share listing link
- **Contact button** - Contact listing owner/manager

#### Hero Section
- **Image gallery** - Multiple images with primary image
- **Image navigation** - Previous/next arrows, thumbnail strip
- **Image indicators** - Current image number (e.g., "1 of 5")
- **Image zoom** - Full-screen view (optional)

#### Main Content Layout

**Desktop (Two-Column):**
- **Left Column (Primary Content):** Listing information
- **Right Column (Sticky):** BookingWidget

**Mobile (Single-Column):**
- **Top:** Listing information
- **Bottom:** BookingWidget (sticky CTA bar optional)

---

### Left Column Content (Primary)

#### 1. Listing Title & Location
- **Listing name** - H1 heading
- **Location/address** - Full address with map link
- **Distance indicator** - If location-based search (e.g., "2.5 km away")

#### 2. Quick Info Bar
- **Listing type badge** - SPACE, RESOURCE, EVENT, SERVICE
- **Capacity** - If applicable (e.g., "50 people")
- **Key amenities/icons** - Visual indicators (parking, accessibility, etc.)
- **Rating/reviews** - If applicable

#### 3. Description Section
- **Full description** - Rich text content
- **Features and amenities** - Bulleted list
- **Accessibility information** - Detailed accessibility features
- **Rules and restrictions** - Clear list of rules

#### 4. Additional Information Sections
- **Opening hours** - If applicable
- **Contact information** - Phone, email, website
- **Map/location** - Embedded map or link
- **Related listings** - Similar listings suggestions

---

### Right Column Content (BookingWidget Integration)

#### BookingWidget Container
- **Sticky positioning** - Stays visible while scrolling (desktop)
- **Fixed width** - Consistent width, responsive
- **Parametric content** - Adapts to booking model

#### BookingWidget Content (via Component)
- Bookable unit selection (if multiple units)
- Availability display (adapted to booking model)
- Booking parameter inputs (varies by model)
- Pricing calculation and display
- Rules and restrictions
- Action buttons ("Book now" / "Send application")

---

### Responsive Behavior

#### Desktop (≥ 1024px)
- **Two-column layout:**
  - Left: 60-70% width (listing content)
  - Right: 30-40% width (BookingWidget, sticky)
- **BookingWidget:** Sticky positioning, stays in viewport
- **Image gallery:** Full-width hero section

#### Tablet (768px - 1023px)
- **Two-column layout maintained** (narrower columns)
- **BookingWidget:** Sticky positioning maintained
- **Content:** Slightly condensed spacing

#### Mobile (< 768px)
- **Single-column layout:**
  - Top: Listing information (full width)
  - Bottom: BookingWidget (full width)
- **BookingWidget:** Moves below content, optional sticky CTA bar
- **Image gallery:** Full-width, swipeable
- **Navigation:** Hamburger menu, simplified header

---

### BookingWidget Integration Rules

#### Integration Point
- BookingWidget is embedded in right column (desktop) or below content (mobile)
- Replaces static booking form
- Receives listing configuration as props

#### Props Passed to BookingWidget
- `listingId` - Listing identifier
- `bookingModel` - Booking model type
- `bookableUnits` - Available units (if multiple)
- `timePolicy` - Time policy constraints
- `availability` - Availability data
- `pricing` - Pricing configuration
- `requireApproval` - Whether approval is required

#### Dynamic Behavior
- BookingWidget adapts its interface based on `booking_model`
- Availability updates as user interacts
- Pricing calculates in real-time
- Validation occurs client-side before submission

---

### Information Display Rules

#### Listing Type Indicators
- Visual badge/icon for listing type
- Clear type label (SPACE, RESOURCE, EVENT, SERVICE)
- Consistent styling across all types

#### Availability Status
- "Available now" indicator (if applicable)
- Next available date/time display
- Booking status summary

#### Pricing Display
- Price range or starting price
- "From [price]" format in listing header
- Detailed pricing in BookingWidget
- Actor type pricing (if applicable)
- Discount indicators

#### Rules & Restrictions
- Displayed in description section
- Also shown in BookingWidget (context-specific)
- Clear, readable format
- Link to full terms if needed

---

### Navigation Rules

#### Entry Points
- Search/Results page (click listing)
- Direct URL (share link)
- Related listings

#### Exit Points
- Back to Search (preserves filters via URL params)
- Confirmation page (after booking)
- My Bookings (via navigation)
- Share listing

#### Breadcrumb Navigation
- Shows: Home > Search Results > Listing Name
- Clickable breadcrumbs
- Preserves search filters when returning

---

### Accessibility Requirements

#### Keyboard Navigation
- All interactive elements keyboard accessible
- Tab order follows visual flow
- Skip links for main content
- Focus management in modals/image gallery

#### Screen Reader Support
- Semantic HTML structure
- Proper heading hierarchy (H1 for title)
- ARIA labels for images, buttons
- Image alt text for gallery

#### Visual States
- Focus indicators visible on all interactive elements
- No color-only communication
- Clear visual hierarchy

---

### Mobile-Specific Considerations

#### Sticky CTA Bar (Optional)
- Appears at bottom of viewport on mobile
- Shows "Book now" button
- Scrolls with page until BookingWidget visible
- Disappears when BookingWidget in view

#### Image Gallery
- Swipeable on mobile
- Full-screen view option
- Touch-friendly navigation

#### Content Prioritization
- Most important information first
- BookingWidget accessible without excessive scrolling
- Collapsible sections for less critical info

---

## Sample Data

See `data.json` for sample listing data including:
- Listing with one bookable unit
- One booking model (TIME_RANGE)
- One time policy configuration
- Complete listing information

---

## Screen Designs

See screen design components in `src/sections/listing-detail-template-public/` for:
- Desktop layout (two-column with sticky BookingWidget)
- Mobile layout (single-column with BookingWidget below content)
- BookingWidget integrated into template

---

## Scope Boundaries

### In Scope
- ✅ Stable page layout structure
- ✅ Listing information display
- ✅ BookingWidget integration
- ✅ Responsive behavior
- ✅ Navigation and breadcrumbs
- ✅ Image gallery
- ✅ All listing types (SPACE, RESOURCE, EVENT, SERVICE)

### Out of Scope
- ❌ Admin listing management
- ❌ Listing creation/editing
- ❌ Review/rating submission (display only)
- ❌ Payment processing (handled separately)
- ❌ Booking approval workflows (admin side)

---

**Related Documents:**
- `/product/sections/bookingwidget-system-core/spec.md` - BookingWidget component specification
- `/product/sections/public-information-architecture/spec.md` - Information architecture context
