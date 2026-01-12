# Search & Results (Public) Section Specification

**Created:** 2025-01-12  
**Section Type:** Search Interface & Results Display  
**Scope:** Public end-user experience only

---

## Overview

This section defines how users search, filter, and browse listings in the DigiList public booking experience. The search interface provides text search, filtering capabilities, and displays results in a consistent, accessible format.

---

## Specification

### Search Input Behavior

#### Search Bar
- **Placeholder text:** "Search listings..." or "Search for venues, equipment, events..."
- **Input type:** Text input with search icon
- **Submit method:** 
  - Enter key submits search
  - Search button submits search
  - Auto-search on input (debounced, optional)

#### Search Functionality
- **Text search:** Searches listing title, description, location
- **Search scope:** All public listings
- **Search results:** Updates in real-time or on submit
- **Search history:** Optional (browser-based)

#### Keyboard Navigation
- **Tab:** Moves to search input
- **Enter:** Submits search
- **Escape:** Clears search (if supported)
- **Arrow keys:** Navigate results (if keyboard navigation enabled)

---

### Filter Behavior (WCAG Compliant)

#### Filter Types

**Listing Type Filter:**
- Checkbox group: SPACE, RESOURCE, EVENT, SERVICE
- Multiple selections allowed
- Clear visual indication of selected filters
- Filter count displayed

**Location Filter:**
- Dropdown or autocomplete
- City/district selection
- Distance radius (optional)

**Availability Filter:**
- Date range picker
- "Available now" checkbox
- "Available in next X days" option

**Price Range Filter:**
- Min/max price inputs
- Price slider (accessible alternative)

**Amenities Filter:**
- Checkbox group: Parking, Accessible, WiFi, etc.
- Multiple selections allowed

#### Filter Display

**Desktop:**
- Filters in left sidebar (optional) or top filter row
- Filter panel collapsible/expandable
- Active filters clearly displayed
- "Clear all filters" button

**Mobile:**
- Filters in drawer/modal
- "Apply filters" and "Clear filters" buttons
- Active filter chips displayed above results
- Filter count badge

#### WCAG Compliance

**Visual States:**
- **Selected filters:** Checkmark icon + text label (not color-only)
- **Active filters:** Badge/chip with text + icon
- **Disabled filters:** Opacity + cursor change + text indicator
- **Focus states:** Visible ring (2px, brand blue #33649E)

**Keyboard Navigation:**
- All filters keyboard accessible
- Tab order follows visual flow
- Enter/Space toggles checkboxes
- Arrow keys navigate dropdowns
- ESC closes filter drawer/modal

**Screen Reader Support:**
- Filter groups have proper labels (`<fieldset>` and `<legend>`)
- Checkboxes have associated labels
- Filter state announced ("X filters selected")
- Active filters announced

**No Color-Only Communication:**
- Selected filters: Checkmark icon + background color + text
- Active filters: Badge with text + icon
- Disabled filters: Opacity + "disabled" text

---

### Result List Structure

#### Results Header
- **Results count:** "Showing X of Y listings" or "X listings found"
- **Sort options:** Dropdown with options:
  - Relevance (default)
  - Price (Low to High)
  - Price (High to Low)
  - Availability
  - Distance (if location-based)
- **View toggle:** List view / Grid view (optional)

#### Listing Card Structure

**Common Elements (All Cards):**
- **Image:** Primary listing image (aspect ratio maintained)
- **Title:** Listing name (link to detail page)
- **Location:** Address/district
- **Listing type badge:** SPACE, RESOURCE, EVENT, SERVICE
- **Price:** "From [price]" or price range
- **Availability indicator:** "Available now" or "Next available: [date]"
- **Quick info:** Capacity, amenities icons (if applicable)

**Card Layout:**
- **Desktop:** Grid or list view
- **Mobile:** Single column, stacked cards
- **Hover state:** Subtle elevation/shadow
- **Focus state:** Visible ring (keyboard navigation)

#### Results Display

**Desktop:**
- **Grid view:** 2-3 columns (responsive)
- **List view:** Single column, horizontal cards
- **Pagination:** Page numbers or "Load more" button

**Mobile:**
- **Single column:** Stacked cards
- **Infinite scroll:** Optional (with "Load more" fallback)
- **Pagination:** Simplified (Previous/Next)

---

### Empty and No-Results States

#### Empty State (No Search/Filters Applied)
- **Message:** "Start searching to find listings"
- **Visual:** Search icon or illustration
- **Action:** Focus on search input

#### No Results State (Search/Filter Applied)
- **Message:** "No listings found matching your search"
- **Sub-message:** Suggestions:
  - "Try different keywords"
  - "Clear filters"
  - "Browse all listings"
- **Visual:** Empty state icon
- **Actions:**
  - "Clear filters" button
  - "Browse all" link

#### Loading State
- **Skeleton cards:** Placeholder cards with shimmer effect
- **Loading indicator:** Spinner or progress bar
- **Message:** "Searching..." or "Loading results..."

#### Error State
- **Message:** "Something went wrong. Please try again."
- **Visual:** Error icon
- **Action:** "Retry" button

---

### Search & Filter Interaction Flow

#### Search Flow
1. User types in search input
2. Search debounced (optional) or submitted on Enter
3. Results update
4. Results count displayed
5. Filters preserved (if applicable)

#### Filter Flow
1. User opens filter panel/drawer
2. User selects filter options
3. Filters applied (desktop: immediate, mobile: on "Apply")
4. Results update
5. Active filters displayed
6. Results count updated

#### Combined Search + Filter Flow
1. User enters search query
2. User applies filters
3. Results filtered by both search and filters
4. Results count reflects combined criteria
5. Clear options available for both

---

### Accessibility Requirements

#### Keyboard Navigation
- **Search input:** Tab accessible, Enter submits
- **Filters:** All filter controls keyboard accessible
- **Results:** Tab through listing cards, Enter activates link
- **Pagination:** Keyboard navigable

#### Screen Reader Support
- **Search:** Proper label and instructions
- **Filters:** Fieldset/legend for filter groups
- **Results:** Semantic structure, proper headings
- **Results count:** Announced when results update

#### Visual States
- **Focus:** Visible ring on all interactive elements
- **Selected:** Icon + text (not color-only)
- **Active filters:** Badge with text + icon
- **Loading:** Skeleton or spinner (not just color change)

---

## Sample Data

See `data.json` for 5-6 sample listings including:
- Different listing types (SPACE, RESOURCE, EVENT, SERVICE)
- Different booking models (TIME_RANGE, SLOT, ALL_DAY, QUANTITY, CAPACITY, PACKAGE)
- Mix of available and constrained listings
- Various locations, prices, and amenities

---

## Screen Designs

See screen design components in `src/sections/search-results-public/` for:
- Desktop search and results (with filter sidebar)
- Mobile search and results (with filter drawer)
- Filter interaction states (open, selected, applied)

---

## Scope Boundaries

### In Scope
- ✅ Text search functionality
- ✅ Filter interface (WCAG compliant)
- ✅ Results list/grid display
- ✅ Empty and no-results states
- ✅ Pagination/infinite scroll
- ✅ Sorting options
- ✅ Responsive behavior

### Out of Scope
- ❌ Admin search/filter tools
- ❌ Advanced search operators
- ❌ Saved searches (user accounts)
- ❌ Search analytics (admin)
- ❌ Search result ranking configuration (admin)

---

**Related Documents:**
- `/product/sections/listing-detail-template-public/spec.md` - Listing detail page (destination)
- `/product/sections/public-information-architecture/spec.md` - Information architecture context
