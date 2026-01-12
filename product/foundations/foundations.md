# DigiList Foundations (Public)

**Created:** 2025-01-12  
**Scope:** Public end-user experience only  
**Base System:** Designsystemet.no (Digdir)  
**Brand Accent:** Blue (#33649E)

---

## Objective

Establish design, accessibility, and scope foundations for the DigiList public booking experience. These foundations serve as guardrails for all design and implementation decisions.

---

## Scope Definition

### In Scope: Public End Users Only

**Roles:**
- **Innbygger** - Individual citizens making bookings
- **Organisasjonsbruker** - Organizations (idrettslag, forening, firma) making bookings

**User Jobs (In Scope):**
1. Find the right listing
2. Understand rules, pricing, and eligibility
3. View availability correctly for listing type
4. Select time slot, quantity, or capacity
5. Complete booking or submit application
6. Understand why something cannot be booked
7. View status, confirmation, and receipt

**Entities User Interacts With:**
- Listing (viewing and understanding)
- Calendar / Availability (checking availability)
- Reservation (creating and managing bookings)
- Payment / Receipt (payment processing and receipts)

### Explicitly Out of Scope

**Roles:**
- ❌ Administrator
- ❌ Saksbehandler (Case worker)
- ❌ System administrator
- ❌ Backoffice users

**Functionality:**
- ❌ Admin interfaces
- ❌ Case worker workflows
- ❌ System configuration UI
- ❌ User management
- ❌ Backoffice operations
- ❌ Reporting dashboards (admin)
- ❌ System settings
- ❌ Multi-tenant configuration

**This is not bureaucracy. This is damage control.**

---

## Design System Usage Rules

### Base System: Designsystemet.no

**Designsystemet.no** is the single source of truth for:
- Typography (font families, scales, line heights)
- Spacing (margins, padding, gaps)
- Layout (grid, containers, breakpoints)
- Component structure and behavior
- Color system (neutral colors, semantic colors)

### Design System Principles

1. **Use Designsystemet.no fully**
   - Do not create custom component styles
   - Do not override Designsystemet.no spacing/typography
   - Reference Designsystemet.no tokens, don't redefine them

2. **This is NOT "creating a new blue design"**
   - We use Designsystemet.no fully
   - We choose #33649E as primary accent within the system's allowed usage
   - This distinction is critical for audits and tenders

3. **Component Mapping**
   - Map all UI needs to Designsystemet.no components first
   - Only create custom components if Designsystemet.no doesn't provide equivalent
   - Document any deviations from Designsystemet.no patterns

4. **Token Approach**
   - Reference Designsystemet.no tokens directly
   - Only define brand accent tokens (#33649E variants)
   - Do not create custom color palettes

### Typography

- **Font Stack:** Designsystemet.no default (system fonts)
- **Scales:** Use Designsystemet.no heading and body scales
- **No Custom Fonts:** Do not introduce custom font families

### Spacing

- **Scale:** Use Designsystemet.no spacing scale
- **Consistency:** Maintain consistent spacing across all pages
- **Responsive:** Follow Designsystemet.no responsive spacing rules

### Layout

- **Grid:** Use Designsystemet.no grid system
- **Containers:** Follow Designsystemet.no container max-widths
- **Breakpoints:** Use Designsystemet.no breakpoints (mobile/tablet/desktop)

### Components

- **Base Components:** Use Designsystemet.no components (Button, Input, Card, etc.)
- **Customization:** Only customize with brand accent (#33649E) where appropriate
- **Patterns:** Follow Designsystemet.no interaction patterns

---

## Brand Accent Usage Rules

### Primary Accent: Blue (#33649E)

**Color Tokens:**
- `color.primary` = #33649E
- `color.primary.hover` = #2C5688
- `color.primary.active` = #24496F
- `color.primary.subtle` = #E6EEF7

### Usage: Where to Use Brand Blue

✅ **Primary Actions:**
- Primary CTA buttons ("Book now", "Search", "Submit")
- Primary links where emphasis is required
- Primary form submit buttons

✅ **Selected States:**
- Active navigation link indicator (underline or left border)
- Selected items (always combined with icon or text)
- Checked checkboxes/radio buttons (with checkmark icon)

✅ **Focus Indicators:**
- Focus rings on interactive elements (when contrast ≥ 3:1)
- Focus states on buttons and links

✅ **Subtle Highlights:**
- Selected state backgrounds (#E6EEF7) with dark text
- Active filter indicators (with icon/text)

### Usage: Where NOT to Use Brand Blue

❌ **Do NOT use for:**
- Large header backgrounds
- Body text
- Status colors (use semantic colors instead)
- Error/warning/success indicators
- General layout surfaces
- Disabled states
- Hover states (unless it's a primary action)
- Background fills (except subtle selected states)

### Semantic Colors (from Designsystemet.no)

Use Designsystemet.no semantic colors for status:
- **Success:** Green (from Designsystemet.no)
- **Warning:** Orange/Amber (from Designsystemet.no)
- **Error:** Red (from Designsystemet.no)
- **Info:** Blue (from Designsystemet.no, different from brand accent)

**Brand blue (#33649E) is NOT a replacement for semantic states.**

### Visual State Communication

**Critical Rule: No Color-Only Communication**

All states must include visual indicators beyond color:
- **Active:** Color + border/background + icon/text
- **Selected:** Color + icon (checkmark) + text
- **Focus:** Ring (visible) + color change
- **Hover:** Background change + color change
- **Disabled:** Opacity + cursor change + text indicator

---

## Accessibility Constraints

### WCAG 2.1 AA Compliance Required

**Contrast Requirements:**
- **Text contrast:** ≥ 4.5:1 (normal text)
- **Large text contrast:** ≥ 3:1 (18pt+ or 14pt+ bold)
- **UI component contrast:** ≥ 3:1 (icons, borders, focus indicators)
- **Focus indicator contrast:** ≥ 3:1 against background and component surface

### Text Contrast

- **Normal text:** Minimum 4.5:1 against background
- **Large text:** Minimum 3:1 against background
- **Brand blue (#33649E) on white:** 4.5:1+ ✅ (WCAG compliant)
- **Brand blue (#33649E) on #E6EEF7:** 4.5:1+ ✅ (WCAG compliant)

### UI Component Contrast

- **Icons:** Minimum 3:1 against background
- **Borders:** Minimum 3:1 against background
- **Focus rings:** Minimum 3:1 against background and component surface
- **Interactive elements:** Clear visual distinction

### Focus States

**Requirements:**
- Focus indicators must be visible (not color-only)
- Focus ring: 2px solid, brand blue (#33649E) or blue variant
- Focus ring offset: 2px (ring-offset-2) for visibility
- Focus contrast: ≥ 3:1 against background

**Implementation:**
- All interactive elements must have visible focus states
- Focus trap in modals/drawers
- Focus return after modal close
- Skip links for main content

### Keyboard Navigation

**Requirements:**
- All interactive elements keyboard accessible
- Tab order follows visual flow
- Enter/Space activates buttons/links
- ESC closes modals/drawers
- Arrow keys navigate lists (where appropriate)

### Screen Reader Support

**Requirements:**
- Semantic HTML structure (`<nav>`, `<header>`, `<main>`, `<footer>`)
- ARIA labels where needed
- `aria-current="page"` for active navigation
- `aria-label` for icon-only buttons
- Landmark regions properly marked

### Visual States

**No Color-Only Communication:**
- Active states: Color + border/background + icon/text
- Selected states: Color + icon (checkmark) + text
- Focus states: Ring (visible) + color change
- Disabled states: Opacity + cursor + text indicator
- Error states: Color + icon + text message

### Touch Targets

**Mobile Requirements:**
- Minimum touch target size: 44x44px
- Adequate spacing between interactive elements
- No horizontal scrolling on mobile (≥ 320px viewport)

### Responsive Behavior

**Requirements:**
- Content fits viewport width on all devices
- No horizontal scrolling
- Text readable without zooming
- Interactive elements accessible on all screen sizes

---

## Implementation Guardrails

### Design Decisions

1. **Always reference Designsystemet.no first**
   - Check if component/pattern exists in Designsystemet.no
   - Use Designsystemet.no tokens and values
   - Document any deviations

2. **Brand accent application**
   - Use #33649E only for primary actions and selected states
   - Never use brand blue for status colors
   - Always combine color with icon/text for states

3. **Accessibility first**
   - Check contrast ratios before finalizing colors
   - Ensure keyboard navigation works
   - Test with screen readers
   - Verify focus states are visible

4. **Scope enforcement**
   - If feature is admin/backoffice → Out of scope
   - If feature is for saksbehandler → Out of scope
   - If feature is system configuration → Out of scope
   - Only public end-user features are in scope

### Quality Checklist

Before finalizing any design:

- [ ] Uses Designsystemet.no components/tokens
- [ ] Brand accent (#33649E) used appropriately
- [ ] No color-only state communication
- [ ] WCAG 2.1 AA contrast compliance
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Mobile responsive (no horizontal scroll)
- [ ] Touch targets ≥ 44x44px
- [ ] In scope (public end-user only)

---

## Out of Scope: Explicit Documentation

### Roles Out of Scope

- ❌ **Administrator** - System administration, user management, configuration
- ❌ **Saksbehandler** - Case worker workflows, request processing, approval workflows
- ❌ **System Administrator** - System configuration, tenant management, integrations
- ❌ **Backoffice Users** - Internal operations, reporting, analytics

### Functionality Out of Scope

**Admin Interfaces:**
- ❌ User management UI
- ❌ Role/permission management
- ❌ Organization management (admin view)
- ❌ System configuration UI
- ❌ Integration management
- ❌ API key management

**Case Worker Workflows:**
- ❌ Request approval/rejection workflows
- ❌ Case processing interfaces
- ❌ Document management (case worker view)
- ❌ Communication tools (case worker)
- ❌ Assignment workflows

**System Configuration:**
- ❌ Booking model configuration
- ❌ Time policy configuration
- ❌ Pricing rule configuration
- ❌ Availability rule configuration
- ❌ Multi-tenant configuration
- ❌ Feature flags

**Backoffice Operations:**
- ❌ Reporting dashboards (admin)
- ❌ Analytics views (admin)
- ❌ Audit logs (admin view)
- ❌ System health monitoring
- ❌ Performance metrics (admin)

**This list is not exhaustive. If it's not for public end users, it's out of scope.**

---

## Foundation Summary

### Design System
- **Base:** Designsystemet.no (use fully, don't override)
- **Approach:** Reference tokens, don't redefine
- **Components:** Use Designsystemet.no components first

### Brand Accent
- **Color:** #33649E (blue)
- **Usage:** Primary actions, selected states, focus indicators
- **Not for:** Status colors, backgrounds, body text

### Accessibility
- **Standard:** WCAG 2.1 AA compliance required
- **Contrast:** Text 4.5:1+, UI 3:1+
- **States:** No color-only communication
- **Keyboard:** Full keyboard navigation required

### Scope
- **In:** Public end users (Innbygger, Organisasjonsbruker)
- **Out:** Admin, saksbehandler, system configuration, backoffice

**These foundations are non-negotiable guardrails for all design and implementation work.**

---

**Next Steps:**
1. Apply these foundations to all design work
2. Reference this document when making design decisions
3. Enforce scope boundaries strictly
4. Test accessibility compliance before finalizing designs
