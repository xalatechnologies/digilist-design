# Product Roadmap: Listing Detail Only

**Created:** 2025-01-12  
**Scope:** Listing Detail page for public end users only  
**Base System:** Designsystemet.no  
**Brand Accent:** Blue (#33649E)

---

### 0. Foundations

**Goal:** Lås scope + Designsystemet.no + brand aksent.

**Deliverables:**

1. **Scope definition**
   - Explicit in-scope: Listing detail view only
   - Explicit out-of-scope: Search, admin, login, payment, "My Bookings"
   - User roles: Innbygger, Organisasjonsbruker

2. **Designsystemet.no base**
   - Designsystemet.no is base for layout, typography, components, accessibility
   - Component mapping rules
   - Token reference approach

3. **Brand accent rules**
   - Brand color #33649E used only for primary actions and selected states
   - Not used for status colors or large backgrounds
   - WCAG compliance (contrast ≥ 4.5:1 for text, ≥ 3:1 for UI)

**Acceptance:**

- ✅ Scope explicitly defined (in and out)
- ✅ Designsystemet.no usage documented
- ✅ Brand accent rules documented
- ✅ WCAG compliance requirements clear

---

### 1. Listing Detail Information Architecture

**Goal:** Definere struktur for detaljsiden (hero, tabs, sidekort, bookingseksjon).

**Deliverables:**

1. **Page structure definition**
   - Hero section (images, title, location)
   - Content sections (description, rules, facilities, location)
   - Booking section (parametric BookingWidget integration)
   - Desktop vs. mobile layout differences

2. **Information hierarchy**
   - What information appears where
   - Order of information display
   - Progressive disclosure rules

3. **Navigation structure**
   - Breadcrumb navigation
   - Section navigation (tabs or sections)
   - Exit points and next steps

**Acceptance:**

- ✅ Page structure clearly defined
- ✅ Information hierarchy established
- ✅ Desktop and mobile layouts specified
- ✅ BookingWidget integration point defined

---

### 2. Listing Detail UI Spec

**Goal:** Full spesifikasjon av layout, komponenter, states.

**Deliverables:**

1. **Layout specification**
   - Desktop: Two-column layout (content + booking widget)
   - Mobile: Single-column layout
   - Responsive breakpoints
   - Container widths and spacing

2. **Component specifications**
   - Hero section components
   - Content section components
   - BookingWidget integration
   - Navigation components

3. **State specifications**
   - Loading states
   - Error states
   - Empty states
   - Interactive states (hover, focus, active)

4. **Accessibility specifications**
   - Keyboard navigation
   - Screen reader support
   - Focus management
   - WCAG AA compliance requirements

**Acceptance:**

- ✅ All components specified
- ✅ All states documented
- ✅ Accessibility requirements clear
- ✅ Responsive behavior defined

---

### 3. Listing Detail Sample Data Pack

**Goal:** Realistiske listing-eksempler (rom, utstyr) og variasjoner.

**Deliverables:**

1. **Sample listings**
   - Space listing (e.g., sports hall, conference room)
   - Resource listing (e.g., equipment, tools)
   - Event listing (e.g., workshop, class)
   - Service listing (e.g., package, bundle)

2. **Booking model variations**
   - At least one listing per booking model
   - TIME_RANGE example
   - SLOT example
   - ALL_DAY example
   - QUANTITY example
   - CAPACITY example
   - PACKAGE example

3. **Variation examples**
   - Different time policies
   - Different availability constraints
   - Different pricing models
   - Different amenities

**Acceptance:**

- ✅ Realistic sample data for all listing types
- ✅ All booking models represented
- ✅ Variations in policies and constraints
- ✅ Data usable for testing all UI states

---

### 4. Screen Designs (Desktop + Mobile)

**Goal:** Skjermdesign som matcher skjermbildene dine (hero + tabs + bookingseksjon).

**Deliverables:**

1. **Desktop screen design**
   - Hero section with images
   - Content sections (description, rules, facilities)
   - BookingWidget integrated in right column
   - Sticky booking widget behavior

2. **Mobile screen design**
   - Hero section (swipeable images)
   - Content sections (stacked)
   - BookingWidget below content
   - Mobile-optimized interactions

3. **Design fidelity**
   - Wireframe-level focus on structure
   - Clear component boundaries
   - Interaction states visible
   - Matches specified layout (hero + tabs + booking section)

**Acceptance:**

- ✅ Desktop design matches specification
- ✅ Mobile design matches specification
- ✅ BookingWidget properly integrated
- ✅ All states represented

---

### 5. Implementation Handoff (React)

**Goal:** Component inventory + props + states for implementering.

**Deliverables:**

1. **Component inventory**
   - List of all components needed
   - Designsystemet.no component mapping
   - Custom components (if any)

2. **Props interfaces**
   - TypeScript interfaces for all components
   - BookingWidget props specification
   - Data model interfaces

3. **State management**
   - Component state requirements
   - Props vs. state decisions
   - State transitions documented

4. **Implementation checklist**
   - Accessibility checklist per component
   - Keyboard navigation requirements
   - Screen reader requirements
   - WCAG compliance checklist

**Acceptance:**

- ✅ Developer can build without guessing
- ✅ All props interfaces defined
- ✅ State management clear
- ✅ Accessibility requirements documented

---

**Next Steps:**
1. Complete Foundations (Section 0)
2. Define Information Architecture (Section 1)
3. Create UI Specification (Section 2)
4. Generate Sample Data (Section 3)
5. Design Screens (Section 4)
6. Prepare Implementation Handoff (Section 5)
