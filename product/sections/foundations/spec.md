# Foundations Section Specification

**Created:** 2025-01-12  
**Updated:** 2025-01-12  
**Section Type:** Foundation Rules (No UI Screens)  
**Scope:** DigiList Listing Detail (Public) only

---

## Overview

This section defines the foundational scope and rules for the DigiList Listing Detail page. These foundations serve as guardrails for all design and implementation decisions. This section intentionally has no UI screens - it establishes the rules that all other sections must follow.

---

## Specification

### Scope: Listing Detail (Public) Only

**In Scope:**
- ✅ Public Listing Detail view only
- ✅ Listing types: Space, Resource, Equipment, Service
- ✅ User roles: Innbygger, Organisasjonsbruker
- ✅ Read-only availability view + selection of booking parameters

**Explicitly Out of Scope:**
- ❌ Search and results pages
- ❌ Login and authentication flows
- ❌ Admin or caseworker functionality
- ❌ Payments, checkout, receipts
- ❌ My Bookings overview
- ❌ Admin interfaces
- ❌ Case worker (saksbehandler) workflows
- ❌ System configuration UI
- ❌ Backoffice operations
- ❌ User management (admin)
- ❌ Reporting dashboards (admin)

**This is not bureaucracy. This is damage control.**

---

### Base System: Designsystemet.no

**Designsystemet.no** is the single source of truth for:
- ✅ Typography (font families, scales, line heights)
- ✅ Spacing and layout (margins, padding, gaps, containers, breakpoints)
- ✅ Base components (buttons, inputs, cards, tabs, etc.)
- ✅ Accessibility patterns (keyboard navigation, focus states, ARIA)

**Key Principles:**
1. Use Designsystemet.no fully - do not create custom component styles
2. Reference Designsystemet.no tokens, don't redefine them
3. This is NOT "creating a new blue design" - we use Designsystemet.no fully and choose #33649E as primary accent within the system's allowed usage
4. Map all UI needs to Designsystemet.no components first

---

### Brand Accent: #33649E

**Color Tokens:**
- `color.primary` = #33649E
- `color.primary.hover` = #2C5688
- `color.primary.active` = #24496F
- `color.primary.subtle` = #E6EEF7

**Usage: Where to Use Brand Blue**

✅ **Primary Actions (CTA):**
- Primary CTA buttons ("Book now", "Gå videre", "Submit")
- Primary links where emphasis is required
- Primary form submit buttons

✅ **Active Tab Indicator:**
- Active tab underline or border
- Active tab text color

✅ **Selected States:**
- Selected time slots in calendar
- Selected items (always combined with icon or text)
- Checked checkboxes/radio buttons (with checkmark icon)

**Usage: Where NOT to Use Brand Blue**

❌ **Do NOT use for:**
- Status colors (use semantic colors instead)
- Error, warning, success indicators
- Large backgrounds
- Body text
- General layout surfaces
- Disabled states
- Hover states (unless it's a primary action)

**Critical Rule: No Color-Only Communication**

All states must include visual indicators beyond color:
- **Active:** Color + border/background + icon/text
- **Selected:** Color + icon (checkmark) + text
- **Focus:** Ring (visible) + color change
- **Hover:** Background change + color change
- **Disabled:** Opacity + cursor change + text indicator

---

### WCAG 2.1 AA Compliance Required

**Contrast Requirements:**
- ✅ **Text contrast:** ≥ 4.5:1 (normal text)
- ✅ **UI elements:** ≥ 3:1 (icons, borders, focus indicators)
- ✅ **Focus indicator contrast:** ≥ 3:1 against background and component surface

**Brand blue (#33649E) compliance:**
- ✅ #33649E on white: 4.5:1+ (WCAG compliant)
- ✅ #33649E on #E6EEF7: 4.5:1+ (WCAG compliant)

**Accessibility Requirements:**
- ✅ **Keyboard navigation:** All interactive elements must be keyboard navigable
- ✅ **Focus states:** Visible focus indicators (not color-only)
- ✅ **No color-only communication:** All states must include visual indicators beyond color (icons, text, borders)
- ✅ **Screen reader support:** Semantic HTML, ARIA labels where needed
- ✅ **Touch targets:** ≥ 44x44px (mobile)
- ✅ **Responsive:** No horizontal scrolling on mobile (≥ 320px viewport)

---

### Explicit Out of Scope Documentation

**Roles Out of Scope:**
- ❌ Administrator
- ❌ Saksbehandler (Case worker)
- ❌ System administrator
- ❌ Backoffice users

**Functionality Out of Scope:**

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

## Sample Data

**No runtime sample data required.**

**Example Labels (for reference only):**
- "Primary CTA" - Example label for primary action buttons
- "Selected state" - Example label for selected items
- "Active navigation" - Example label for active nav items
- "Focus indicator" - Example label for focus states

---

## Screen Designs

**No screen designs required.**

This section intentionally has no UI screens. The foundations are rules and constraints that apply to all other sections, not visual designs themselves.

---

## Implementation Guardrails

### Design Decisions Checklist

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

### Quality Checklist

- [ ] References Designsystemet.no first
- [ ] Documents any deviations from Designsystemet.no
- [ ] Brand blue used only for primary actions/selected states
- [ ] Semantic colors used for status (not brand blue)
- [ ] All states include non-color indicators
- [ ] Contrast ratios verified
- [ ] Keyboard navigation tested
- [ ] Screen reader tested
- [ ] Mobile responsive tested
- [ ] Scope boundaries enforced

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

**Related Documents:**
- `/product/foundations/foundations.md` - Detailed foundation specification
- `/product/foundations/design-tokens.md` - Design token definitions
- `/product/product-overview.md` - Product scope and vision
