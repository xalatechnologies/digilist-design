# Brand & Accessibility Rules - DigiList

**Created:** 2025-01-12  
**Base System:** Designsystemet.no

---

## Base System

**Designsystemet.no** brukes for hele applikasjonen.

---

## Brand Color

### Primary Accent: Blue (#33649E)

DigiList har **blå (#33649E)** som primær aksent for:
- Actions (primary buttons, links)
- Selected states
- Highlights
- Focus and active indicators

**WCAG Compliance:** #33649E mot hvit tekst (#FFFFFF) gir kontrast > 4.5:1. Trygg for primærknapper, CTA-lenker, og fokus/active states.

### Critical Rule

**Blå brukes ikke som eneste indikator for status eller valg.**

- Always combine color with icon or text
- Never rely solely on color to convey meaning
- Ensure accessibility for colorblind users

### Important Principle

**Vi gjør ikke dette:** "Vi lager et nytt blått design"

**Vi gjør dette:** "Vi bruker Designsystemet.no fullt ut" og "Vi velger #33649E som primær aksent innenfor systemets tillatte bruk"

Dette er et viktig skille i revisjon og anbud.

---

## WCAG Color Constraints

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

## Token Approach

### Blue Scale (Required)

DigiList uses blue (#33649E) as primary accent:

- **#33649E** - Primary blue (primary buttons, CTA)
- **#2C5688** - Hover state (darker blue)
- **#24496F** - Active/pressed state (darkest blue)
- **#E6EEF7** - Subtle blue (selected states, backgrounds)

### Primary Button

**Primærknapp skal bruke #33649E som gir 4.5:1 mot hvit tekst.**

- Use **#33649E** for primary buttons
- White text achieves 4.5:1 contrast ratio (WCAG compliant)
- Hover: **#2C5688**, Active: **#24496F**

### Subtle Backgrounds

**Subtle bakgrunner bruker #E6EEF7 med mørk tekst/border.**

- Use **#E6EEF7** for subtle backgrounds
- Must use dark text (not white) on blue backgrounds
- Add border for better definition if needed
- Ensure text contrast meets 4.5:1 requirement

---

## Do Not

### ❌ Do Not Color Large Background Areas Green

- Avoid large green background surfaces
- Use green sparingly for accents and highlights
- Prefer neutral backgrounds (white, gray) for main content areas

### ❌ Do Not Use Green for Error/Warning

- **Error states:** Use red (not green)
- **Warning states:** Use amber/yellow (not green)
- **Success states:** Green is appropriate
- **Info states:** Use blue (not green)

---

## Color Usage Guidelines

### Appropriate Blue Usage
- ✅ Primary action buttons
- ✅ Selected states (with icon/text)
- ✅ Links and interactive elements
- ✅ Highlights and accents
- ✅ Focus and active indicators (when contrast ≥ 3:1)

### Inappropriate Blue Usage
- ❌ Error messages (use red)
- ❌ Warning messages (use orange)
- ❌ Large background areas
- ❌ Sole indicator for status/selection
- ❌ Text on light blue backgrounds without dark text
- ❌ Semantic info states (use Designsystemet.no blue, not brand blue)

---

## Implementation Checklist

### Color Tokens
- [ ] Define green scale (100, 200, 600, 700, 800)
- [ ] Test primary button contrast (4.5:1)
- [ ] Test subtle background contrast (4.5:1)
- [ ] Define error/warning colors (red, amber)

### Components
- [ ] Primary buttons use dark green (700/800)
- [ ] Selected states include icon/text
- [ ] Focus states meet 3:1 contrast
- [ ] Subtle backgrounds use light green with dark text

### Testing
- [ ] WCAG contrast testing for all text
- [ ] Colorblind accessibility testing
- [ ] Focus visibility testing
- [ ] Selected state clarity testing

---

## Examples

### Primary Button
```tsx
// ✅ Correct: Blue (#33649E) with white text (4.5:1 contrast)
<button className="bg-[#33649E] text-white hover:bg-[#2C5688] active:bg-[#24496F]">
  Book Now
</button>

// ❌ Incorrect: Light blue with white text (low contrast)
<button className="bg-[#E6EEF7] text-white">
  Book Now
</button>
```

### Subtle Background
```tsx
// ✅ Correct: Light blue with dark text (4.5:1 contrast)
<div className="bg-[#E6EEF7] text-gray-900 border border-[#33649E]/20">
  Available now
</div>

// ❌ Incorrect: Light blue with white text (low contrast)
<div className="bg-[#E6EEF7] text-white">
  Available now
</div>
```

### Selected State
```tsx
// ✅ Correct: Color + icon + text
<div className="bg-[#E6EEF7] border-[#33649E] border-2">
  <CheckIcon className="text-[#33649E]" />
  <span className="text-gray-900">Selected</span>
</div>

// ❌ Incorrect: Color only
<div className="bg-[#E6EEF7]">
  Selected
</div>
```

---

## References

- [Designsystemet.no](https://www.designsystemet.no/)
- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Note:** All color choices must be tested for accessibility compliance before implementation.
