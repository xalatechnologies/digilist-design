# Screen Designs (Desktop + Mobile) Specification

## Overview

Creates visual screen designs for the Listing Detail page matching the approved shell design. These designs demonstrate the complete user interface for both desktop and mobile viewports, showing all components, interactions, and states in context.

The screen designs use sample data from Section 3 and follow all design rules established in the foundations, including Designsystemet.no components, brand color usage, and accessibility requirements.

## User Flows

- User views Listing Detail page on desktop and sees two-column layout
- User views Listing Detail page on mobile and sees single-column layout
- User interacts with hero image gallery (desktop: thumbnails, mobile: swipeable)
- User navigates tabs to view different content sections
- User views availability calendar with legend
- User selects time slots and sees selected state
- User sees booking section with stepper and summary panel

## UI Requirements

### Desktop Screen Design

**Layout:**
- Two-column layout (content left, sidebar right)
- Hero image with thumbnails on right side
- Tabs below listing header
- Content area: Left column (2/3 width) with tab content
- Sidebar: Right column (1/3 width) with contact, location, opening hours
- Booking section: Full-width below tabs, two-column grid (calendar left, summary right)

**Components to Show:**
- Hero image with navigation arrows and fullscreen button
- Thumbnail images (3) stacked vertically
- Listing header with type badge, name, address, like/share buttons
- Tab navigation (4 tabs) with active state indicator
- Tab content (Oversikt tab shown):
  - Description text
  - Capacity card with icon
  - Facilities chips with icons
  - Additional services list with checkmarks and prices
- Sidebar cards:
  - Contact information with icons
  - Location map container
  - Opening hours
- Booking section:
  - Stepper with 4 steps (first step active)
  - Calendar grid with week view and time slots
  - Legend showing color coding
  - Selected times panel (empty state)
  - Tips panel with bullet points

**Interaction States:**
- Hover states on buttons and links
- Focus states visible on interactive elements
- Active tab with blue underline
- Selected time slots (if any) with blue background

### Mobile Screen Design

**Layout:**
- Single-column layout (all content stacked)
- Swipeable hero gallery (carousel style)
- Thumbnails below hero image
- Tabs as horizontal scroll
- Content area: Full-width tab content
- Sidebar cards moved below main content
- Booking section stacked below content

**Components to Show:**
- Hero image carousel with navigation dots
- Thumbnail strip below hero
- Listing header (compressed layout)
- Scrollable tabs navigation
- Tab content (full-width)
- Sidebar cards (full-width, below content)
- Booking section (full-width, stacked layout):
  - Stepper (compressed)
  - Calendar grid (responsive)
  - Selected times panel
  - Tips panel

**Mobile-Specific Features:**
- Touch-friendly targets (≥44x44px)
- Swipe gestures for image gallery
- Horizontal scroll for tabs
- Sticky CTA button (optional, at bottom)

### Design Rules

**Components:**
- Use Designsystemet.no components for all UI elements
- Follow Designsystemet.no spacing and typography scales
- Use Designsystemet.no color system for neutrals and semantics

**Brand Color (#33649E):**
- Use only for:
  - Primary CTA buttons ("Gå videre")
  - Active tab indicator (underline)
  - Selected time slots (background)
- Do NOT use for:
  - Status colors (use semantic colors)
  - Large backgrounds
  - Body text

**Interaction States:**
- Show hover states clearly (background color change)
- Show focus states clearly (2px blue ring, contrast ≥ 3:1)
- Show active states (blue underline for tabs)
- Show selected states (blue background + white text + icon)

**Accessibility:**
- All interactive elements keyboard navigable
- Focus indicators visible at all times
- ARIA labels on tabs, calendar cells, buttons
- Semantic HTML structure

## Configuration

- shell: true
