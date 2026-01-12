# Listing Detail Template Specification

**Created:** 2025-01-12  
**Page Type:** Stable Structure with Parametric Booking Section

---

## Overview

The Listing Detail page is a template that displays comprehensive listing information with a parametric booking section. The page structure is fixed and consistent, but the booking section adapts based on the listing's configuration (booking model, availability rules, pricing).

---

## Page Structure (Stable)

### Header Section
- **Breadcrumb navigation** - Back to search results
- **Share button** - Share listing
- **Contact button** - Contact listing owner/manager

### Hero Section
- **Image gallery** - Multiple images with primary image
- **Image navigation** - Previous/next, thumbnail strip
- **Image indicators** - Current image number

### Main Content (Two Column Layout)

#### Left Column (Primary Content)
1. **Listing Title & Location**
   - Listing name
   - Location/address
   - Distance indicator (if location-based search)

2. **Quick Info Bar**
   - Listing type badge
   - Capacity (if applicable)
   - Key amenities/icons
   - Rating/reviews (if applicable)

3. **Description Section**
   - Full description
   - Features and amenities list
   - Accessibility information
   - Rules and restrictions

4. **Additional Information**
   - Opening hours
   - Contact information
   - Map/location (if applicable)
   - Related listings

#### Right Column (Sticky Booking Section)
- **BookingWidget** - Parametric booking component
- Sticky positioning on scroll
- Fixed width, responsive

### Footer Section
- **Related Listings** - Similar listings
- **Footer Navigation** - Links to other sections

---

## Booking Section (Parametric)

### Integration Point
The BookingWidget component is embedded in the right column, replacing a static booking form.

### Section Behavior
- **Sticky positioning** - Stays visible while scrolling
- **Responsive** - Moves below content on mobile
- **Dynamic content** - Adapts to listing's booking model
- **Real-time updates** - Availability and pricing update as user interacts

### Section Content (via BookingWidget)
- Bookable unit selection (if multiple)
- Availability display (adapted to booking model)
- Booking parameter inputs (varies by model)
- Pricing calculation and display
- Rules and restrictions
- Action buttons

---

## Information Display Rules

### Listing Type Indicators
- Visual badge/icon for listing type
- Color coding (optional)
- Clear type label

### Availability Status
- "Available now" indicator
- Next available date/time
- Booking status summary

### Pricing Display
- Price range or starting price
- "From [price]" format
- Actor type pricing (if applicable)
- Discount indicators

### Rules & Restrictions
- Minimum/maximum duration
- Advance booking limits
- Eligibility requirements
- Age restrictions
- Cancellation policy

---

## User Actions

### Primary Actions
1. **Book Now** - Initiate booking (via BookingWidget)
2. **Check Availability** - View detailed availability
3. **Share** - Share listing with others
4. **Contact** - Contact listing owner/manager

### Secondary Actions
- Add to favorites (if authenticated)
- Report issue/problem
- View on map
- View similar listings

---

## Responsive Behavior

### Desktop (> 1024px)
- Two-column layout
- BookingWidget sticky in right column
- Full image gallery
- Expanded information sections

### Tablet (768px - 1024px)
- Two-column layout maintained
- BookingWidget may move below content
- Condensed image gallery
- Collapsible sections

### Mobile (< 768px)
- Single column layout
- BookingWidget at top (below hero)
- Image gallery with swipe
- Accordion sections for information
- Bottom navigation bar

---

## Loading States

### Initial Load
- Skeleton loader for content
- Progressive image loading
- Lazy load BookingWidget

### BookingWidget Loading
- Skeleton for booking form
- Loading state for availability fetch
- Loading state for pricing calculation

---

## Error States

### Listing Not Found
- 404 error page
- Link back to search
- Suggested listings

### Listing Unavailable
- Clear unavailable message
- Reason for unavailability
- Alternative suggestions

### Booking Errors
- Handled within BookingWidget
- Clear error messages
- Retry options

---

## Accessibility

### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Arrow keys for image gallery
- Escape to close modals

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for all interactive elements
- Alt text for all images
- Descriptive link text

### Focus Management
- Focus trap in modals
- Focus return after modal close
- Visible focus indicators

---

## Component Props Interface

```typescript
interface ListingDetailPageProps {
  listing: Listing;
  bookableUnits: BookableUnit[];
  availability: AvailabilityData;
  relatedListings?: Listing[];
  onBookingSubmit: (bookingData: BookingFormData) => void;
  onShare: (listing: Listing) => void;
  onContact: (listing: Listing) => void;
  userActorType?: ActorType;
}
```

---

## Data Requirements

### Listing Data
- Basic information (name, description, location)
- Images (multiple, with primary)
- Amenities and features
- Rules and restrictions
- Pricing configuration
- Booking model configuration
- Time policy configuration

### Availability Data
- Current availability
- Allocation information
- Conflict data
- Time policy rules

### User Context (if authenticated)
- Actor type
- Booking history (for this listing)
- Favorites status

---

## Design Requirements

### Visual Hierarchy
- Clear primary action (Book Now)
- Secondary actions clearly distinguished
- Information organized by importance
- Consistent spacing and typography

### Visual Design
- High-quality images
- Clear typography hierarchy
- Consistent color usage
- Appropriate use of whitespace

### Performance
- Optimize image loading
- Lazy load below-fold content
- Efficient availability fetching
- Minimize initial bundle size

---

## Scope Boundaries

### In Scope
- ✅ Listing information display
- ✅ Image gallery
- ✅ Parametric BookingWidget integration
- ✅ Related listings
- ✅ Share and contact actions
- ✅ Responsive design

### Out of Scope
- ❌ Admin editing functionality
- ❌ User reviews/ratings (future feature)
- ❌ Advanced filtering (handled in search)
- ❌ Booking management (handled in My Bookings)

---

## Integration with BookingWidget

The Listing Detail page integrates BookingWidget as follows:

1. **Data Flow**
   - Listing data passed to BookingWidget
   - Availability data fetched and passed
   - Booking submission handled via callback

2. **Layout Integration**
   - BookingWidget placed in right column (desktop)
   - BookingWidget placed below hero (mobile)
   - Sticky positioning on desktop

3. **State Management**
   - ListingDetail manages page-level state
   - BookingWidget manages booking form state
   - Communication via props and callbacks

---

**Next:** Design the actual Listing Detail template component
