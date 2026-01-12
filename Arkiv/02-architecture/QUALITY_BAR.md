# UI/UX Quality Bar

**Version:** 1.0\
**Last Updated:** 2026-01-03

This document defines measurable rules for UI/UX quality in the Digilist
Platform.

---

## A. Consistency

### Spacing Scale (Tokens Only)

| Token   | Value | Usage                  |
| ------- | ----- | ---------------------- |
| `gap-1` | 4px   | Inline elements, icons |
| `gap-2` | 8px   | Compact groupings      |
| `gap-3` | 12px  | Related items          |
| `gap-4` | 16px  | Standard sections      |
| `gap-6` | 24px  | Major sections         |
| `gap-8` | 32px  | Page sections          |

**Rule:** No arbitrary values like `gap-[13px]`. Use token scale only.

### Typography Hierarchy

| Component    | Size | Weight   | Color            |
| ------------ | ---- | -------- | ---------------- |
| H1           | 2xl  | bold     | foreground       |
| H2           | xl   | semibold | foreground       |
| H3           | lg   | semibold | foreground       |
| Text         | base | normal   | foreground       |
| Text (muted) | sm   | normal   | muted-foreground |
| Caption      | xs   | normal   | muted-foreground |

**Rule:** Use semantic `H1`-`H3` and `Text` components, never raw HTML headings.

### Button Variants

| Variant       | Usage                       |
| ------------- | --------------------------- |
| `primary`     | Primary action (1 per view) |
| `secondary`   | Alternative action          |
| `tertiary`    | Low emphasis                |
| `destructive` | Delete/dangerous actions    |

**Rule:** Max 1 primary button per visible area.

### Icon Sizes

| Size | Class     | Usage             |
| ---- | --------- | ----------------- |
| sm   | `h-4 w-4` | Inline with text  |
| md   | `h-5 w-5` | Buttons, cards    |
| lg   | `h-6 w-6` | Headers, emphasis |
| xl   | `h-8 w-8` | Page headers      |

---

## B. Accessibility (WCAG/UU)

### Focus States

- ✅ All interactive elements have visible focus ring
- ✅ Focus ring uses `ring-2 ring-primary ring-offset-2`
- ✅ Tab order follows visual order

### Keyboard Navigation

- ✅ All actions reachable via keyboard
- ✅ Escape closes modals/dropdowns
- ✅ Arrow keys navigate lists

### ARIA Requirements

- ✅ Buttons have accessible labels
- ✅ Icons with actions have `aria-label`
- ✅ Form inputs have associated labels
- ✅ Error messages linked via `aria-describedby`

### Color Contrast

- ✅ Text: minimum 4.5:1 against background
- ✅ Interactive: minimum 3:1 for borders/icons
- ✅ Never rely solely on color for meaning

---

## C. Usability Patterns

### Page Headers

Every page must have:

```tsx
<PageHeader>
    <H1>{title}</H1>
    <Text color="muted">{subtitle}</Text>
</PageHeader>;
```

### Empty States

Use `<EmptyState>` with:

- Relevant icon
- Clear title
- Helpful description
- Optional action button

### Loading States

- Use `<Skeleton>` for content shapes
- Use `<Spinner>` for actions in progress
- Show within 100ms of delay

### Error States

Use `<ErrorState>` with:

- Error icon
- User-friendly message
- Retry action when applicable

### Navigation

- Consistent sidebar/header across app
- Active state clearly visible
- Breadcrumbs for deep navigation

---

## D. SSR Safety

### Rules

1. **No window/document at render time**
   - Use `useEffect` for client-only code
   - Use `isClient()` from `@xalatechnologies/config`

2. **Stable markup**
   - Same HTML on server and client
   - No conditional rendering based on client-only state during initial render

3. **Theme/Locale hydration**
   - Read from cookies/headers on server
   - Sync on client without flash

### Patterns

```tsx
// ❌ BAD: Accesses window at render
const width = window.innerWidth;

// ✅ GOOD: Client-only effect
const [width, setWidth] = useState(0);
useEffect(() => {
    setWidth(window.innerWidth);
}, []);
```

---

## E. Enforcement

### Scanners

| Scanner            | Target         | Threshold    |
| ------------------ | -------------- | ------------ |
| Raw HTML           | apps/pages     | 0 violations |
| Token usage        | all components | 0 violations |
| Storybook coverage | ui package     | 100%         |

### CI Gates

- ❌ Fail PR if new raw HTML in apps
- ❌ Fail PR if hardcoded colors/spacing
- ❌ Fail PR if new component without Story

---

## F. Component Hierarchy

```
Primitives (low-level)
├── Box, Stack, Inline, Grid
├── Text, H1-H3, Caption, Label
├── Button, IconButton, Link
├── Card, CardHeader, CardContent
├── Badge, Tag, StatusBadge
├── Alert, Toast
├── Skeleton, Spinner
└── EmptyState, ErrorState

Blocks (page-level)
├── PageHeader, PageBody
├── DashboardShell, AppShell
├── DataTableBlock, FilterBar
├── FormSection, SummaryPanel
├── WizardShell, ConfirmDialog
└── Domain shells (Booking, Listing, etc.)
```
