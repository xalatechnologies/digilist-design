# UI Listing Migration - Component Inventory & Mapping

**Generated:** 2026-01-04  
**Status:** Step 1 Complete - Inventory & Mapping

---

## **EXECUTIVE SUMMARY**

### **Current State Analysis**
- ✅ **Core listing components EXIST** (presentation, browsing, details)
- ❌ **Listing* components still in use** (need deprecation)
- ⚠️ **Policy components MISSING** (empty directory)
- ⚠️ **Booking widgets INCOMPLETE** (only PackageBookingWidget migrated)
- ❌ **Component registry NOT updated** with new metadata
- ❌ **Storybook coverage INCOMPLETE**

### **Progress Assessment**
- **Presentation Layer:** ~70% complete (4/6 components)
- **Browsing/Filters:** ~80% complete (4/5 components)
- **Details Layer:** ~60% complete (3/5 components)
- **Booking Widgets:** ~15% complete (1/7 components)
- **Policy UI:** 0% complete (0/4 components)
- **Overall Migration:** ~45% complete

---

## **COMPONENT MAPPING**

### **A) PRESENTATION COMPONENTS**

| Legacy Component | New Component | Status | Location | Notes |
|-----------------|---------------|--------|----------|-------|
| `ListingCard` | `ListingCard` | ✅ CREATED | `listing/presentation/` | Needs token compliance check |
| `ListingCardSkeleton` | `ListingCardSkeleton` | ✅ CREATED | `listing/presentation/` | Needs token compliance check |
| `ListingGridSkeleton` | `ListingCardGrid` | ✅ CREATED | `listing/presentation/` | Needs token compliance check |
| `ListingList` | `ListingCardGrid` | ✅ CREATED | `listing/presentation/` | Grid + list view support |
| N/A | `ListingBadge` | ✅ CREATED | `listing/presentation/` | Type/status badges |
| N/A | `ListingTypeBadge` | ❌ MISSING | N/A | Semantic badge for listing types |

**Action Required:**
- Create `ListingTypeBadge` component
- Verify token compliance for all 4 existing components
- Add Storybook stories (0/5 created)

---

### **B) BROWSING & FILTERS**

| Component | Status | Location | Features | Notes |
|-----------|--------|----------|----------|-------|
| `ListingFiltersPanel` | ✅ CREATED | `listing/browsing/` | Full filter UI | Needs token check |
| `ListingFilterChips` | ✅ CREATED | `listing/browsing/` | Active filter display | Needs token check |
| `ListingSortSelect` | ✅ CREATED | `listing/browsing/` | Sort dropdown | Needs token check |
| `ListingSearchInput` | ✅ CREATED | `listing/browsing/` | Search with autocomplete | Needs token check |
| `ListingViewToggle` | ❌ MISSING | N/A | Grid/List view switcher | Need to create |

**Action Required:**
- Create `ListingViewToggle` component
- Verify token compliance for all 4 existing components
- Add Storybook stories (0/5 created)

---

### **C) LISTING DETAILS**

| Component | Status | Location | Features | Notes |
|-----------|--------|----------|----------|-------|
| `ListingDetailsHeader` | ✅ CREATED | `listing/details/` | Title, breadcrumbs, actions | Needs token check |
| `ListingGallery` | ✅ CREATED | `listing/details/` | Image carousel | Needs token check |
| `ListingMetaPanel` | ✅ CREATED | `listing/details/` | Info, amenities, rules | Needs token check |
| `BookingEntryWidget` | ❌ MISSING | N/A | Main booking dispatcher | Critical - need to create |
| `ListingReviews` | ❌ MISSING | N/A | Reviews & ratings | Need to create |

**Action Required:**
- Create `BookingEntryWidget` (critical - booking dispatcher)
- Create `ListingReviews` component
- Verify token compliance for 3 existing components
- Add Storybook stories (0/5 created)

---

### **D) BOOKING WIDGETS (by bookingModel)**

| Booking Model | Component | Status | Location | Notes |
|--------------|-----------|--------|----------|-------|
| `TIME_RANGE` | `TimeRangeBookingWidget` | ❌ MISSING | N/A | Calendar + time picker |
| `SLOT` | `SlotBookingWidget` | ❌ MISSING | N/A | Slot selection grid |
| `ALL_DAY` | `AllDayBookingWidget` | ❌ MISSING | N/A | Date picker only |
| `QUANTITY` | `QuantityBookingWidget` | ❌ MISSING | N/A | Quantity selector |
| `CAPACITY` | `CapacityBookingWidget` | ❌ MISSING | N/A | Attendee count |
| `PACKAGE` | `PackageBookingWidget` | ✅ CREATED | `listing/booking/` | ✅ Real API integrated |

**Action Required:**
- Create 5 missing booking widgets
- Ensure all use real API (`booking-api.ts`)
- Add comprehensive Storybook stories (1/6 created)
- Create shared booking hooks library

---

### **E) POLICY & RULES UI**

| Component | Status | Location | Purpose | Notes |
|-----------|--------|----------|---------|-------|
| `TermsSummary` | ❌ MISSING | N/A | Display listing terms | Need to create |
| `CancellationPolicySummary` | ❌ MISSING | N/A | Cancellation policy display | Need to create |
| `AgeRestrictionBadge` | ❌ MISSING | N/A | Age requirement badge | Need to create |
| `ApprovalModeBadge` | ❌ MISSING | N/A | Approval mode indicator | Need to create |

**Directory Status:** Empty (`listing/policies/`)

**Action Required:**
- Create all 4 policy components
- Add Storybook stories (0/4 created)
- Ensure token compliance

---

## **LEGACY COMPONENTS TO DEPRECATE**

### **Listing* Components (packages/ui/src/components/patterns/listings/)**

| Component | Replacement | Migration Strategy |
|-----------|-------------|-------------------|
| `ListingCard.tsx` | `ListingCard` | Create bridge component, add deprecation warning |
| `ListingList.tsx` | `ListingCardGrid` | Create bridge component, add deprecation warning |

### **Skeleton Components (packages/ui/src/components/)**

| Component | Replacement | Migration Strategy |
|-----------|-------------|-------------------|
| `ListingGridSkeleton.tsx` | `ListingCardGrid` (with loading state) | Create bridge, deprecate |
| `blocks/ListingCardSkeleton.tsx` | `ListingCardSkeleton` | Create bridge, deprecate |
| `patterns/tables/ListingListItemSkeleton.tsx` | `ListingCardSkeleton` (list mode) | Create bridge, deprecate |

**Deprecation Timeline:**
1. **Phase 1 (Week 1-2):** Create bridge components with console warnings
2. **Phase 2 (Week 3-4):** Update all internal consumers to use Listing* components
3. **Phase 3 (Week 5-6):** Mark as deprecated in JSDoc, add ESLint rule
4. **Phase 4 (Week 7-8):** Remove Listing* components entirely

---

## **MISSING INFRASTRUCTURE**

### **Component Registry Updates**
- ❌ No registry metadata for new Listing* components
- ❌ No token compliance verification entries
- ❌ No component relationships documented

### **Storybook Coverage**
- ❌ Presentation: 0/5 stories
- ❌ Browsing: 0/5 stories
- ❌ Details: 0/5 stories
- ❌ Booking: 1/6 stories (PackageBookingWidget only)
- ❌ Policies: 0/4 stories
- **Total: 1/25 stories (4% coverage)**

### **Documentation**
- ❌ No migration guide for consumers
- ❌ No API documentation for new components
- ❌ No design system integration guide

---

## **EXECUTION PRIORITY**

### **🔴 CRITICAL (Week 1)**
1. Create `BookingEntryWidget` (booking dispatcher)
2. Create remaining 5 booking widgets (TIME_RANGE, SLOT, ALL_DAY, QUANTITY, CAPACITY)
3. Create all 4 policy components
4. Token compliance verification for existing components

### **🟡 HIGH (Week 2)**
5. Create `ListingTypeBadge` and `ListingViewToggle`
6. Create bridge components for Listing* deprecation
7. Update component registry with metadata
8. Create comprehensive Storybook stories (25 total)

### **🟢 MEDIUM (Week 3)**
9. Implement deprecation warnings
10. Generate migration documentation
11. Update all internal consumers
12. Create ESLint rules for deprecated components

### **⚪ LOW (Week 4)**
13. Final token compliance audit
14. Performance optimization
15. Accessibility audit
16. Remove deprecated Listing* components

---

## **NEXT STEPS**

**Immediate Actions (Step 2):**
1. ✅ Verify token compliance for 11 existing components
2. Create `BookingEntryWidget` (booking dispatcher)
3. Create 5 missing booking widgets
4. Create 4 policy components
5. Create `ListingTypeBadge` and `ListingViewToggle`

**Total Components to Create:** 12  
**Total Components to Verify:** 11  
**Total Stories to Create:** 24  

---

## **RISK ASSESSMENT**

### **High Risk**
- ⚠️ **BookingEntryWidget missing** - Blocks all booking flows
- ⚠️ **No deprecation strategy** - Breaking changes possible
- ⚠️ **Token compliance unknown** - May violate design system

### **Medium Risk**
- ⚠️ **Storybook coverage low** - Hard to test/validate
- ⚠️ **No migration guide** - Consumer confusion

### **Low Risk**
- ℹ️ **Missing view toggle** - Can use existing UI temporarily
- ℹ️ **Missing reviews component** - Not critical for MVP

---

**END OF INVENTORY REPORT**
