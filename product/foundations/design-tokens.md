# Design Tokens – DigiList (Public)

**Created:** 2025-01-12  
**Base System:** Designsystemet.no (Digdir)

---

## Base System

**Designsystemet.no** is the single source of truth for typography, spacing, layout and component structure.

- No custom component styles
- Tokens reference Designsystemet.no values
- Only accent choices and usage patterns are documented here

---

## Brand Accent Color

DigiList uses **blue (#33649E)** as the primary accent color.

- The color is applied only within the constraints of Designsystemet.no and WCAG
- This is not "creating a new blue design" - it's using Designsystemet.no fully and choosing #33649E as primary accent within the system's allowed usage
- This distinction is critical for audits and tenders

---

## Colors (Color Tokens)

### Primary Accent: Blue (#33649E)

**color.primary** = #33649E
- **Usage:** Primary buttons (CTA), primary links where emphasis is required
- **Contrast:** White text ≥ 4.5:1 (WCAG compliant)

**color.primary.hover** = #2C5688
- **Usage:** Hover state on primary buttons

**color.primary.active** = #24496F
- **Usage:** Active/pressed state

**color.primary.subtle** = #E6EEF7
- **Usage:** Selected states (always combined with icon or text), focus and active indicators (when contrast ≥ 3:1)

### Neutral Surfaces (from Designsystemet)

- **color.background.default** → White
- **color.background.subtle** → Grey 50
- **color.surface** → White
- **color.border** → Grey 300
- **color.text.primary** → Grey 900
- **color.text.secondary** → Grey 700
- **color.text.muted** → Grey 600

### Semantic Colors (Locked, Not Brand)

These should not be replaced with brand blue.

- **color.success** → Green (semantic, from Designsystemet.no)
- **color.warning** → Orange (from Designsystemet.no)
- **color.error** → Red (from Designsystemet.no)
- **color.info** → Blue (from Designsystemet.no)

**Rule:** Brand blue ≠ semantic info blue. Status must always have icon + text, not just color.

---

## Typography (Typography Tokens)

Use Designsystemet.no's typography without modifications.

### Font

- **Font family:** System font stack (as defined in Designsystemet)
- **No custom webfonts**

### Text Scale (use these names in Design OS)

- **text.heading.lg** → H1
- **text.heading.md** → H2
- **text.heading.sm** → H3
- **text.body** → Body
- **text.body.small** → Small
- **text.label** → Labels, buttons, chips

### Rules

- No text smaller than Small for interactive elements
- Line-height preserved from system
- Do not "tighten" text to fit more content

---

## Focus and Interaction (WCAG Critical)

### Focus Token

- **focus.ring.color** → #33649E or darker blue variant (only if contrast ≥ 3:1)
- **focus.ring.width** → 2px
- **focus.ring.offset** → 2px

**Rule:** Focus must always be visible on keyboard navigation. Do not remove outline without replacement.

---

## Radius, Spacing, Shadow

Use standard values from Designsystemet.no:

- **radius.sm**
- **radius.md**
- **space.2xs** → **space.xl**
- **shadow.sm** (only where necessary)

**Rule:** No custom "soft shadows". Public sector is not Dribbble.

---

## Restrictions (Explicitly Documented)

**This is critical for Design OS.**

- ❌ No custom color palettes outside the brand accent
- ❌ No color-only communication of state
- ❌ No custom fonts
- ❌ No colored backgrounds with low contrast
- ❌ No "disabled = lighter blue" without text explanation

---

## Usage Patterns

### Primary Buttons

```tsx
// ✅ Correct: Blue (#33649E) with white text (4.5:1 contrast)
<button className="bg-[#33649E] text-white hover:bg-[#2C5688] active:bg-[#24496F]">
  Book Now
</button>
```

### Selected States

```tsx
// ✅ Correct: Color + icon + text
<div className="bg-[#E6EEF7] border-[#33649E] border-2">
  <CheckIcon className="text-[#33649E]" />
  <span className="text-gray-900">Selected</span>
</div>

// ❌ Incorrect: Color only
<div className="bg-[#E6EEF7]">Selected</div>
```

### Subtle Backgrounds

```tsx
// ✅ Correct: Light blue with dark text (4.5:1 contrast)
<div className="bg-[#E6EEF7] text-gray-900 border border-[#33649E]/20">
  Available now
</div>
```

### Focus States

```tsx
// ✅ Correct: Visible focus ring
<button className="focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2">
  Click me
</button>
```

---

## Accessibility Requirements

### Text Contrast
- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text (18pt+ or 14pt+ bold):** Minimum 3:1 contrast ratio

### UI/Icon Contrast
- **UI elements and icons:** Minimum 3:1 contrast ratio against background

### Focus State
- **Focus indicators:** Must be clearly visible
- **Minimum contrast:** 3:1 against both background and component surface
- Must be visible on all interactive elements

### Selected States
- **Must include:** Icon or text in addition to color
- **Never rely on:** Color alone to indicate selection
- **Accessibility:** Must be perceivable without color vision

---

## Designsystemet.no Reference

All tokens reference values from [Designsystemet.no](https://www.designsystemet.no/).

- Colors: Use Designsystemet.no color palette (brand accent #33649E chosen within system constraints)
- Typography: Use Designsystemet.no font stack and scales
- Spacing: Use Designsystemet.no spacing scale
- Components: Use Designsystemet.no component library

---

## Concrete Impact on DigiList Public

### Search / Results
- Neutral layout
- Blue (#33649E) only on CTA, active filters, selected sorting

### Listing Detail
- "Book Now / Send søknad" in #33649E
- Selected time/quantity gets blue + check/icon

### BookingWidget
- Blue = selected
- Gray/neutral = available
- Red/orange = error/warning (semantic)

### Confirmation / Receipt
- Blue as accent, not "everything is blue"
- Status always explained with text

This is clean, predictable, and WCAG-robust.

---

**Note:** This document defines only the accent choices and usage patterns. All base values come from Designsystemet.no. We are not "creating a new blue design" - we are using Designsystemet.no fully and choosing #33649E as primary accent within the system's allowed usage.
