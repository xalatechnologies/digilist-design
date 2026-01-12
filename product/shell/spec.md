# Application Shell: DigiList Public

**Created:** 2025-01-12  
**Scope:** Public end-user experience only  
**Base System:** Designsystemet.no  
**Brand Accent:** Blue (#33649E)

---

## Overview

Application shell for DigiList Public booking experience. Responsive, mobile-first layout with top navigation, consistent max-width container, and clear hierarchy (header → main content → footer). Uses Designsystemet.no components and accessibility patterns. Brand accent (#33649E) used for primary actions, not for general layout surfaces.

---

## Navigation Structure

- Home (Search/Results) → Search/Results page
- My Bookings → My Bookings page
- Help / Contact → Help/Contact (optional, can be footer only)

---

## Layout Pattern

Top Navigation pattern - horizontal nav at top, content below. Best for public-facing booking experience with minimal navigation items. Mobile uses hamburger menu with drawer/side sheet.

---

## Scope

### Pages Covered
- Search/Results
- Listing Detail
- Confirmation/Receipt
- My Bookings

### Out of Scope
- ❌ Admin/backoffice navigation
- ❌ Saksbehandler workflows
- ❌ System configuration

---

## Layout Principles

- **Responsive, mobile-first** approach
- **Consistent max-width container** for content
- **Clear hierarchy:** header (global) → main content → footer
- **Designsystemet.no components** and accessibility patterns
- **Brand accent (#33649E)** used for primary actions, not for general layout surfaces

---

## Global Navigation Model

### Primary Navigation (Top)

**Items:**
- Home (Search/Results)
- My Bookings
- Help / Contact (optional, can be footer only)

**Rules:**
- Keep top nav minimal
- Avoid complex menus in public scope

---

## App Shell Structure

### 1) Header (Global)

#### Contains

**Left:**
- DigiList logo (clickable, returns to Search/Results)

**Center/Right (Desktop):**
- Main nav links
- Language switch (if supported)
- "My Bookings" link

**Mobile:**
- Logo left
- Hamburger menu right
- Menu opens a side sheet / drawer with:
  - Home (Search/Results)
  - My Bookings
  - Help/Contact

#### Accessibility

- Skip to content link at top
- Keyboard navigation through header items
- Visible focus states (not color-only)
- Focus ring uses #33649E or blue variant (contrast ≥ 3:1)

#### Components (Designsystemet Mapping)

- Header container (Designsystemet.no header component)
- Link / Button (for nav items)
- Drawer/Modal (mobile menu)

---

### 2) Main Content

#### Base Container

- **Max width:** Fixed, consistent across pages
- **Default layout:** Single column
- **Listing Detail:** 2-column on desktop (content + booking widget), 1-column on mobile

#### Key Rules

- Headings must be consistent (H1 once per page)
- Breadcrumbs only on Listing Detail and Confirmation (optional but recommended)
- Content follows Designsystemet.no spacing and typography

---

### 3) Footer (Global)

#### Contains

- Contact information (municipality or platform contact)
- Legal links:
  - Privacy
  - Terms
  - Accessibility statement (recommended)
- Optional: "Report an issue"

#### Accessibility

- Clear link styling
- Good contrast (≥ 4.5:1 for text)
- Not overly dense
- Keyboard navigable

---

## Page-level Layout Templates

### Template A: Search / Results

**Structure:**
```
Header
Main:
  - Page title + short description
  - Search bar
  - Filters + results count
  - Results list
Footer
```

**Responsive:**
- **Desktop:** Filters left sidebar (optional) or top filter row
- **Mobile:** Filters in drawer with "Apply" and "Clear"

---

### Template B: Listing Detail

**Structure:**
```
Header
Main:
  - Breadcrumbs (optional)
  - Hero section: title, images/media, key facts
  - Two-column layout (desktop):
    - Left: description, rules, location, details
    - Right: BookingWidget card (sticky within viewport if appropriate)
  - Mobile:
    - BookingWidget moves below key facts
    - Sticky CTA bar at bottom (optional)
Footer
```

**Key Features:**
- BookingWidget is parametric and adapts to booking_model
- Sticky positioning on desktop for booking widget
- Mobile-first responsive breakpoints

---

### Template C: Confirmation / Receipt

**Structure:**
```
Header
Main:
  - Page title: Booking status
  - Status panel (icon + text + next steps)
  - Booking summary card
  - Actions:
    - Download receipt
    - Back to search
    - Go to My bookings
Footer
```

**Key Features:**
- Clear status indication (icon + text, not color-only)
- Next steps clearly communicated
- Brand blue (#33649E) used as accent, not dominant color

---

### Template D: My Bookings

**Structure:**
```
Header
Main:
  - Bookings list with status filters
  - Each booking links to booking detail page/screen
  - Booking detail shows timeline + actions allowed by policy
Footer
```

**Key Features:**
- Status filters use semantic colors (not brand blue)
- Clear status badges (icon + text)
- Actions respect cancellation policies

---

## Navigation Rules (Public)

### Logo Behavior
- Logo always returns to Search/Results
- Clickable, clear visual indication

### Back Navigation
- "Back to results" preserves filters (URL params)
- Breadcrumbs support navigation history

### Confirmation Page
- Includes clear next actions
- Links to relevant pages (My Bookings, Search)

### Authentication
- My Bookings requires authentication if applicable
- Shell stays identical regardless of auth state
- Login/logout handled gracefully

---

## Visual Rules for Brand Accent (#33649E)

### Use Brand Color For

- ✅ Primary CTA button
- ✅ Active nav link indicator (underline or left border, not background fill)
- ✅ Selected states (combined with icon/text)
- ✅ Focus rings (when contrast ≥ 3:1)

### Do Not Use Brand Color For

- ❌ Large header backgrounds
- ❌ Body text
- ❌ Status colors (use semantic colors: green=success, red=error, orange=warning, blue=info)
- ❌ General layout surfaces
- ❌ Disabled states

---

## Responsive Breakpoints

Follow Designsystemet.no breakpoints:

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

---

## Accessibility Requirements

### Keyboard Navigation
- All interactive elements keyboard accessible
- Tab order follows visual flow
- Skip links for main content
- Focus indicators visible (not color-only)

### Screen Reader Support
- Semantic HTML structure
- ARIA labels where needed
- Landmark regions (header, main, footer, navigation)

### Focus Management
- Focus trap in modals/drawers
- Focus return after modal close
- Visible focus indicators (2px ring, #33649E or blue variant)

---

## Component Mapping (Designsystemet.no)

### Header Components
- Use Designsystemet.no header component
- Customize with DigiList logo and navigation items
- Mobile drawer uses Designsystemet.no drawer/modal component

### Navigation Components
- Use Designsystemet.no link/button components
- Apply brand accent (#33649E) for active states
- Ensure proper focus states

### Layout Components
- Use Designsystemet.no container/grid components
- Follow spacing and max-width guidelines
- Maintain consistent padding/margins

---

## Implementation Notes

### Sticky Elements
- BookingWidget can be sticky on desktop (Listing Detail)
- Mobile: Consider bottom CTA bar instead
- Ensure sticky elements don't overlap content

### Mobile Menu
- Hamburger icon opens drawer
- Drawer contains full navigation
- Close button clearly visible
- Backdrop dims main content

### Breadcrumbs
- Optional but recommended for Listing Detail and Confirmation
- Use Designsystemet.no breadcrumb component
- Clear visual hierarchy

---

## Mobile Navigation Drawer Behavior

### Trigger
- **Icon:** Hamburger menu (☰) in header, right side
- **Breakpoint:** Hidden on desktop (≥ 768px), visible on mobile (< 768px)
- **Accessibility:** `aria-label="Open menu"` on button

### Drawer Structure
- **Position:** Right side slide-in (side sheet)
- **Width:** 320px (80vw max on very small screens)
- **Backdrop:** Semi-transparent overlay (50% opacity, dark)
- **Animation:** Slide-in from right, fade backdrop

### Drawer Content
1. **Header:** Close button (X icon) in top-right corner
2. **Navigation Items:** Full list of nav items:
   - Home (Search/Results)
   - My Bookings
   - Help / Contact
3. **Each Item:**
   - Icon + Label
   - Active state: Blue background (#E6EEF7) + blue left border (4px) + blue text (#33649E)
   - Inactive state: Default text color + hover background
   - Full-width clickable area
   - Closes drawer on click

### Interaction Rules
- **Opening:** Click hamburger → drawer slides in, backdrop appears
- **Closing:**
  - Click close button (X)
  - Click backdrop
  - Click any nav item (navigates + closes)
  - ESC key (keyboard)
- **Focus Management:**
  - Focus trap inside drawer when open
  - Focus returns to hamburger button on close
  - First nav item receives focus on open (or close button)

### Accessibility
- Focus trap: Tab cycles within drawer only
- ESC closes drawer
- Keyboard navigation: Arrow keys navigate items (optional enhancement)
- Screen reader: Announces "Navigation menu" when opened
- Close button: `aria-label="Close menu"`

---

## Navigation State Table

### Desktop Navigation Links

| State | Visual Indicator | Text Color | Background | Border | Icon | WCAG Contrast |
|-------|-----------------|-----------|------------|--------|------|---------------|
| **Default** | None | `stone-600` / `stone-400` (dark mode) | Transparent | None | Icon visible | 4.5:1+ |
| **Hover** | Background change | `stone-900` / `stone-100` (dark mode) | `stone-100` / `stone-800` (dark mode) | None | Icon visible | 4.5:1+ |
| **Focus** | Ring | `stone-900` / `stone-100` | Transparent | 2px ring `#33649E` | Icon visible | 3:1+ (ring) |
| **Active** | Underline + color | `#33649E` | Transparent | Bottom: 2px solid `#33649E` | Icon `#33649E` | 4.5:1+ |
| **Disabled** | Opacity + cursor | `stone-400` / `stone-600` | Transparent | None | Icon muted | N/A (disabled) |

### Mobile Navigation Drawer Items

| State | Visual Indicator | Text Color | Background | Border | Icon | WCAG Contrast |
|-------|-----------------|-----------|------------|--------|------|---------------|
| **Default** | None | `stone-700` / `stone-300` (dark mode) | Transparent | None | Icon visible | 4.5:1+ |
| **Hover** | Background change | `stone-900` / `stone-100` | `stone-100` / `stone-800` | None | Icon visible | 4.5:1+ |
| **Focus** | Ring | `stone-900` / `stone-100` | Transparent | 2px ring `#33649E` | Icon visible | 3:1+ (ring) |
| **Active** | Left border + background | `#33649E` | `#E6EEF7` (light) / `stone-800` (dark) | Left: 4px solid `#33649E` | Icon `#33649E` | 4.5:1+ |
| **Disabled** | Opacity + cursor | `stone-400` / `stone-600` | Transparent | None | Icon muted | N/A (disabled) |

### Key Principles
- **No color-only states:** All states include visual indicator (border, background, or ring)
- **Focus always visible:** 2px ring with brand blue (#33649E), contrast ≥ 3:1
- **Active state:** Always includes icon color change + border/background
- **Hover feedback:** Subtle background change, not color-only
- **Disabled:** Reduced opacity (50%) + "not-allowed" cursor

---

## Accessibility Checklist for Navigation

### Keyboard Navigation
- [x] All nav items keyboard accessible (Tab key)
- [x] Tab order follows visual flow (left to right, top to bottom)
- [x] Enter/Space activates nav items
- [x] ESC closes mobile drawer
- [x] Focus trap in mobile drawer (Tab cycles within drawer)
- [x] Focus returns to trigger after drawer close
- [x] Skip to content link at top of page

### Focus Indicators
- [x] Visible focus ring on all interactive elements
- [x] Focus ring uses brand blue (#33649E) with 2px width
- [x] Focus ring contrast ≥ 3:1 against background
- [x] Focus ring offset (ring-offset-2) for visibility
- [x] No color-only focus indicators

### Screen Reader Support
- [x] Semantic `<nav>` element with `aria-label="Main navigation"`
- [x] Active page marked with `aria-current="page"`
- [x] Mobile menu button has `aria-label="Open menu"`
- [x] Close button has `aria-label="Close menu"`
- [x] Drawer announces when opened/closed (via ARIA live region or role)
- [x] Logo link has descriptive text or `aria-label="DigiList Home"`

### Visual States
- [x] Active state includes icon + text color change + border/background
- [x] Hover state provides clear feedback (background change)
- [x] Focus state always visible (ring)
- [x] Disabled state clearly indicated (opacity + cursor)
- [x] No reliance on color-only communication

### Mobile Drawer
- [x] Drawer accessible via keyboard (hamburger button focusable)
- [x] Focus trap inside drawer when open
- [x] Backdrop clickable to close (keyboard: ESC)
- [x] Drawer content keyboard navigable
- [x] Drawer closes on navigation (prevents navigation trap)

### Responsive Behavior
- [x] No horizontal scrolling on mobile
- [x] Touch targets ≥ 44x44px (mobile nav items)
- [x] Adequate spacing between interactive elements
- [x] Mobile menu doesn't obscure critical content

---

## Acceptance Criteria

### Keyboard Navigation
- ✅ **Full keyboard navigation:** All interactive elements accessible via Tab/Enter/Space
- ✅ **Visible focus:** Focus indicators visible on all elements (2px ring, #33649E)
- ✅ **Logical tab order:** Tab order follows visual flow
- ✅ **Focus trap:** Mobile drawer traps focus when open
- ✅ **Focus return:** Focus returns to trigger after drawer close
- ✅ **Skip links:** Skip to content link available

### Mobile Experience
- ✅ **No horizontal scrolling:** Content fits viewport width on all mobile devices (≥ 320px)
- ✅ **Touch targets:** All interactive elements ≥ 44x44px
- ✅ **Mobile menu:** Hamburger menu accessible, drawer opens/closes smoothly
- ✅ **Responsive layout:** Layout adapts correctly at breakpoints (mobile/tablet/desktop)

### Layout Consistency
- ✅ **Container width:** Consistent max-width (7xl / 1280px) across all pages
- ✅ **Spacing:** Consistent padding/margins using Designsystemet.no spacing scale
- ✅ **Header height:** Consistent header height (64px / h-16) across pages
- ✅ **Footer:** Footer consistent across all pages

### Visual States
- ✅ **No color-only states:** All states include visual indicator (border, background, ring, or icon)
- ✅ **Active state:** Active nav item clearly indicated (border + color + icon)
- ✅ **Focus state:** Focus ring always visible (2px, #33649E, contrast ≥ 3:1)
- ✅ **Hover feedback:** Hover states provide clear visual feedback
- ✅ **Disabled state:** Disabled elements clearly indicated (opacity + cursor)

### Accessibility Compliance
- ✅ **WCAG 2.1 AA:** Text contrast ≥ 4.5:1, UI contrast ≥ 3:1
- ✅ **Semantic HTML:** Proper use of `<nav>`, `<header>`, `<main>`, `<footer>`
- ✅ **ARIA labels:** All interactive elements have appropriate labels
- ✅ **Screen reader:** Navigation structure clear to screen readers

---

## Scope Boundaries

### In Scope
- ✅ Public navigation structure
- ✅ Responsive layout templates
- ✅ Header, main content, footer structure
- ✅ Mobile menu/drawer
- ✅ Brand accent application

### Out of Scope
- ❌ Admin/backoffice navigation
- ❌ Complex multi-level menus
- ❌ User management UI
- ❌ System configuration UI

---

**Next:** Implement shell components using Designsystemet.no components with brand accent (#33649E) applied appropriately.
