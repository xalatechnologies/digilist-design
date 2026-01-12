# Listing Detail UI Spec Specification

## Overview

Defines the complete UI specifications for the Listing Detail page, including layout patterns, component definitions, interaction states, and accessibility requirements. This specification provides detailed guidance for implementing all visual and interactive elements of the Listing Detail page.

The UI spec covers desktop and mobile layouts, component-level specifications, state management, and accessibility patterns to ensure a consistent and accessible user experience across all devices.

## User Flows

- User views listing detail page and sees all components in their default states
- User interacts with image gallery to view different images
- User navigates between tabs to access different content sections
- User hovers over interactive elements to see hover states
- User uses keyboard to navigate through all interactive elements
- User focuses on elements to see focus indicators
- User selects time slots in calendar to see selected states
- User encounters loading states while data is fetched
- User sees empty states when no availability exists
- User encounters disabled states for unavailable slots

## UI Requirements

### Layout Specifications

**Desktop Layout:**
- **Two-column layout:**
  - Left column (2/3 width): Main content area with tabs and tab content
  - Right column (1/3 width): Sidebar with contextual cards (contact, location, opening hours)
- **Booking section:** Full-width below tabs, two-column grid (calendar + summary panel)
- **Max-width container:** Centered with consistent padding

**Mobile Layout:**
- **Single-column layout:**
  - All content stacked vertically
  - Tabs scrollable horizontally
  - Booking section placed below main content
  - Sidebar cards moved below main content
- **Responsive breakpoints:** Follow Designsystemet.no breakpoints

### Component Specifications

**Image Gallery:**
- Hero image: Large display (3/4 width on desktop), aspect ratio maintained
- Thumbnails: 3 thumbnails stacked vertically (1/4 width on desktop)
- Navigation: Left/right arrows on hero image (visible on hover)
- Fullscreen: Icon button in bottom-right corner of hero image
- Image counter: "1/3" indicator overlay
- Active thumbnail: Blue border indicator

**Breadcrumb Component:**
- Horizontal navigation trail
- Clickable links (except current page)
- Chevron separators between items
- Keyboard navigable

**Tab Navigation Component:**
- Four tabs: Oversikt, Aktivitetskalender, Retningslinjer, Ofte stilte spørsmål
- Active tab: Blue underline + blue text
- Inactive tabs: Gray text
- Horizontal scrollable on mobile
- Keyboard navigable (arrow keys to switch tabs)

**Content Cards:**

- **Description Card:**
  - Text content with proper typography
  - Readable line length and spacing

- **Capacity Card:**
  - Icon (Users) in blue circle
  - Label: "Maks tillatt"
  - Value: Number + "personer"
  - White background with border

- **Facilities Card:**
  - Section title: "Fasiliteter"
  - Chips/badges with icons and labels
  - Flex wrap layout

- **Additional Services Card:**
  - Section title: "Tilleggstjenester"
  - List items with:
    - Green checkmark icon
    - Service name
    - Description text
    - Price badge (blue)

**Side Cards:**

- **Contact Information Card:**
  - Title: "Kontaktinformasjon"
  - Email with mail icon
  - Phone with phone icon
  - White background with border

- **Location Card:**
  - Title: "Lokasjon"
  - Map container (placeholder or embedded map)
  - Aspect ratio maintained

- **Opening Hours Card:**
  - Title: "Åpningstider"
  - List of days and hours
  - White background with border

**Booking Section:**

- **Stepper:**
  - Four steps: Velg tidspunkter → Detaljer og vilkår → Bekreft → Sendt
  - Active step: Blue background, white text
  - Inactive steps: Gray text
  - Step indicator: "Steg 1 av 4" on right side

- **Availability Calendar:**
  - Week view with day headers
  - Time slots in grid format
  - Color coding:
    - Green: Available
    - Red: Booked/Occupied
    - Blue: Selected
    - Gray: Unavailable
  - Legend below calendar
  - Navigation arrows for week navigation
  - "I dag" badge on current day

- **Selected Times Panel:**
  - Title: "Valgte tidspunkter"
  - List of selected slots with remove button
  - Empty state message when no selections

- **Tips Panel:**
  - Blue background
  - Info icon
  - Bullet list of tips
  - "Gå videre" button (shown when selections exist)

### State Specifications

**Loading States:**
- Image gallery: Skeleton loader or spinner
- Calendar: Skeleton grid or loading indicator
- Content cards: Skeleton placeholders

**Empty States:**
- No availability: Message explaining no available slots
- No selected times: Instructional text in selected times panel

**Disabled States:**
- Unavailable time slots: Gray background, disabled cursor, not clickable
- Booked slots: Red background, disabled cursor, not clickable

**Interactive States:**

- **Hover:**
  - Buttons: Background color change, cursor pointer
  - Links: Underline or color change
  - Image thumbnails: Opacity change
  - Calendar slots: Background color change (if available)

- **Focus:**
  - Visible focus ring (2px, blue #33649E, contrast ≥ 3:1)
  - Applied to all interactive elements
  - Never color-only

- **Active:**
  - Button press: Slight scale or background darkening
  - Tab selection: Blue underline + blue text

- **Selected:**
  - Time slots: Blue background, white text
  - Checkboxes: Blue background with checkmark icon
  - Always includes non-color indicator (icon or text)

### Accessibility Requirements

**Keyboard Navigation:**
- Full keyboard navigation for all interactive elements
- Tab order follows visual flow (top to bottom, left to right)
- Enter/Space to activate buttons and links
- Arrow keys for tab navigation and calendar navigation
- ESC to close modals or cancel actions

**Focus Management:**
- Focus visible at all times (not color-only)
- Focus ring: 2px solid #33649E, contrast ≥ 3:1
- Focus trap in modals
- Focus returns to trigger element after modal close

**ARIA Labels:**
- Tabs: `role="tablist"`, `role="tab"`, `role="tabpanel"` with `aria-selected` and `aria-controls`
- Calendar cells: `role="gridcell"` with `aria-label` describing date/time and availability
- Buttons: Descriptive `aria-label` for icon-only buttons
- Image gallery: `aria-label` for navigation buttons, `alt` text for images
- Breadcrumbs: `aria-label="Breadcrumb"` on nav element

**Screen Reader Support:**
- Semantic HTML (nav, main, section, article)
- Descriptive alt text for images
- Hidden labels for icon-only buttons
- Live regions for dynamic content updates

## Configuration

- shell: true
