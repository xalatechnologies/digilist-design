# Application Shell: Listing Detail (Public)

## Overview

Application shell for DigiList Listing Detail (Public) - a focused, single-page experience for viewing listing details and initiating bookings. The shell provides consistent global navigation, breadcrumbs, and a centered container layout following Designsystemet.no patterns. Brand accent color (#33649E) is used for primary actions and active states only.

**Scope:** Listing Detail page only. No search/results, no admin, no payment, no "my bookings" functionality.

**Design Principles:**
- Designsystemet.no for layout, typography, components, and accessibility
- Brand accent (#33649E) for CTA buttons, active tab indicators, selected states
- Centered container layout with consistent max-width
- Mobile-first responsive design
- WCAG AA compliant navigation and interactions

## Navigation Structure

- Logo + "Enkel booking" subtitle → Returns to home/search
- Search field (placeholder "Søk etter fasiliteter…") → Search functionality
- "Logg inn" button → Login entrypoint (no auth flow implementation)
- Breadcrumbs: Hjem > [Kategori] > [Listing navn] → Navigable breadcrumb trail

## Layout Pattern

**Global Header (Desktop)**
- Left: Logo + "Enkel booking" subtitle (clickable, returns to home)
- Center: Search field (full-width search input with placeholder)
- Right: "Logg inn" button (secondary style)

**Global Header (Mobile)**
- Compressed layout: Logo + Search (full-width) + Logg inn button
- Hamburger menu optional if additional navigation needed

**Breadcrumbs**
- Positioned below header, above main content
- Format: Hjem > [Kategori] > [Listing navn]
- All breadcrumb items are clickable and keyboard navigable
- Uses Designsystemet.no breadcrumb component

**Main Container**
- Centered max-width container
- Follows Designsystemet.no vertical rhythm and spacing
- Single column on mobile, two-column on desktop (content + side column)

**Listing Detail Layout (Desktop)**

**Upper Section:**
- Media gallery:
  - Large hero image (left)
  - 3 thumbnails (right, clickable to change hero)
- Below gallery:
  - Listing type pill (small badge)
  - H1: Listing name
  - Address + location icon
  - Like + Share actions (small, secondary buttons)

**Middle Section:**
- Tabs navigation (horizontal, scrollable on mobile):
  - Oversikt (Overview)
  - Aktivitetskalender (Activity Calendar)
  - Retningslinjer (Guidelines/Rules)
  - Ofte stilte spørsmål (FAQ)
- Active tab indicator: Brand color (#33649E) underline or pill indicator (not full blue background)
- Tab content area:

  **Oversikt tab:**
  - Description text
  - Capacity card
  - Facility chips
  - Additional services list (with price badges)

  **Side column (desktop only):**
  - Contact information card
  - Location (map container)
  - Opening hours card

  **Aktivitetskalender tab:**
  - List view per day with time blocks (read-only calendar view)

  **Retningslinjer tab:**
  - Rule cards with category + "Påkrevd" (Required) badge where relevant

  **FAQ tab:**
  - Accordion list of questions and answers

**Lower Section:**
- Availability calendar / Booking process section
- Stepper indicator: Velg tidspunkter → Detaljer og vilkår → Bekreft → Sendt
- Calendar grid (slot view) + legend
- Right panel: "Valgte tidspunkter" (Selected time slots) + Tips panel

**Mobile Layout:**
- Gallery becomes carousel with thumbnails below
- Tabs are horizontally scrollable
- Side column content moves below main content
- Booking section moves below content with clear CTA button
- Sticky CTA bar at bottom (optional)

**Accessibility Requirements:**
- All navigation items keyboard accessible
- Focus states visible (not color-only)
- Breadcrumbs have proper ARIA labels
- Tabs follow ARIA tab pattern
- Skip to content link at top of page
- WCAG AA contrast for all text and UI elements

**Out of Scope:**
- Actual booking submission implementation
- Payment and receipt flows
- "Min side" / user dashboard
- Authentication flow implementation
- Admin or backoffice functionality
