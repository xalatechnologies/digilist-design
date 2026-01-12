# DOMAIN UNDERSTANDING SUMMARY

**Purpose:** Executive summary of Digilist domain alignment to canonical Listing model  
**Date:** 2026-01-04  
**Author:** Senior Platform Architect  

---

## 🎯 EXECUTIVE SUMMARY

The Digilist platform is undergoing a **domain correction** to establish **Listing as the single canonical bookable concept**. This eliminates the parallel Listing concept and creates a unified, extensible booking platform that can handle any type of bookable resource through a single, consistent model.

---

## 📚 INPUTS ANALYZED

### 1. Product Requirements Document (PRD)
- **Target Users:** 5 personas (Leietaker, Saksbehandler, Eiendomseier, Administrator, Kommune)
- **Actor Types:** 6 pricing tiers (private, business, sports_club, youth_organization, school, municipality)
- **Core Features:** Listing discovery, booking management, approval workflows, payments
- **Key Insight:** PRD uses "listing" terminology but describes generic bookable resources

### 2. Migration Reports
- **Listing Migration:** 24 UI components completed, 100% token compliant
- **Frontend Migration:** 8% complete, blocked by missing Listing domain model
- **Status:** UI ready, backend needs alignment

### 3. Current Database Schema
- **Listings:** 5 tables (listings, zones, listing_media, listing_rules, booking_terms_acceptances)
- **Bookings:** 8 tables (bookings, booking_status_history, recurring_bookings, etc.)
- **Issue:** Listing-specific, cannot handle non-space resources

### 4. API Documentation
- **REST Endpoints:** `/listings/*`, `/zones/*`, `/bookings/*`
- **Issue:** Listing-centric, needs Listing alignment

---

## 🏗️ CURRENT DOMAIN MODEL

```
Listing (Physical Location)
├── Zones (Subdivisions)
├── Media (Images, Documents)
├── Rules (Terms, Policies)
└── Bookings (Time-based reservations)

Problems:
- Only handles physical spaces
- Zones create unnecessary complexity
- Cannot book resources, events, services
- Inconsistent with future needs
```

---

## 🎯 TARGET DOMAIN MODEL

```
Listing (Canonical Bookable Product)
├── Type-Specific Details
│   ├── Space Details (for physical locations)
│   ├── Resource Details (for equipment, vehicles)
│   ├── Event Details (for events, courses)
│   └── Service Details (for services, consultations)
├── Booking Model (TIME_RANGE, SLOTS, ALL_DAY, etc.)
├── Policies (Terms, Age, Cancellation, Pricing)
├── Categories & Metadata
└── Bookings (Unified booking engine)

Benefits:
- Handles ANY bookable resource
- Single booking engine
- Extensible for future needs
- Consistent user experience
```

---

## 🔍 KEY INSIGHTS

### 1. **Listing is Too Specific**
- Current model only handles physical spaces
- Norwegian municipalities need to book: equipment, vehicles, services, events
- Listing abstraction solves this

### 2. **Zones are Sub-Allocations**
- Zones are just time-based subdivisions of a space
- Can be modeled as separate Listings or allocation metadata
- Simpler to manage and understand

### 3. **Booking Engine Unification**
- Multiple booking patterns exist (hourly, daily, slots, packages)
- Single engine with configurable models is cleaner
- Allocations become the calendar truth

### 4. **Policy Separation**
- Terms, age restrictions, cancellation policies are reusable
- Separate from Listing but linked
- Enables policy reuse across Listings

---

## 📊 MAPPING ANALYSIS

### Current → Target Mapping

| Current Concept | Target Concept | Implementation |
|-----------------|----------------|----------------|
| Listing | Listing (type=SPACE) | Direct migration |
| Zone | Listing (type=SPACE) OR allocation | Case by case |
| Listing Settings | Listing + Space Details | Split appropriately |
| Listing Rules | Policy Tables | Extract and normalize |
| Booking Engine | Unified Booking Engine | Consolidate |

### Data Migration Strategy

1. **Backfill Listings → Listings**
   - All listings become `listing_type='SPACE'`
   - Preserve all data and relationships
   - Create `listing_space_details` records

2. **Handle Zones**
   - Independent zones become separate Listings
   - Sub-divisions become allocation metadata
   - Maintain booking continuity

3. **Extract Policies**
   - Move listing rules to policy tables
   - Create policy references
   - Enable policy reuse

---

## 🚨 CRITICAL DECISIONS

### 1. **NO Parallel Concepts**
- ❌ Keep Listing + Listing
- ✅ Listing becomes legacy alias only
- ✅ All new code uses Listing

### 2. **Explicit Type Tables**
- ❌ JSON polymorphism
- ✅ Separate tables per listing type
- ✅ Indexable and queryable

### 3. **Single Booking Engine**
- ❌ Multiple booking systems
- ✅ Unified bookings table
- ✅ Allocations as calendar truth

### 4. **Backward Compatibility**
- ✅ Database views for legacy code
- ✅ API aliases during transition
- ✅ Gradual migration path

---

## 📋 IMPLEMENTATION SCOPE

### Phase 1: Database Schema
1. Create Listing tables
2. Create type-specific detail tables
3. Create policy tables
4. Migrate existing data
5. Create compatibility views

### Phase 2: API Alignment
1. Add Listing endpoints
2. Mark Listing endpoints as legacy
3. Update OpenAPI documentation
4. Ensure backward compatibility

### Phase 3: GraphQL & Contracts
1. Design GraphQL schema
2. Create JSON Schema registry
3. Define AsyncAPI contracts
4. Implement resolvers

### Phase 4: Package Alignment
1. Refactor domain packages
2. Update frontend hooks
3. Migrate tests
4. Update documentation

---

## 🎯 SUCCESS CRITERIA

### Technical
- ✅ Listing is only canonical concept
- ✅ Zero data loss in migration
- ✅ All APIs use Listing terminology
- ✅ 95%+ test coverage maintained

### Business
- ✅ All current functionality preserved
- ✅ New resource types bookable
- ✅ Policy reuse enabled
- ✅ Simplified user experience

### Compliance
- ✅ All audit trails preserved
- ✅ GDPR compliance maintained
- ✅ Norwegian requirements met
- ✅ Documentation complete

---

## 🔄 NEXT STEPS

1. **Database Schema Alignment** (Immediate)
2. **API Endpoint Migration** (Day 2-3)
3. **GraphQL Implementation** (Day 4-5)
4. **Package Refactoring** (Day 6-7)
5. **Testing & Documentation** (Day 8-10)

---

**Conclusion:** The domain alignment is technically straightforward and strategically necessary. The Listing model provides the flexibility needed for Norwegian municipalities while simplifying the codebase and enabling future growth.

**Risk Level:** Low (well-understood migration path)  
**Business Impact:** High (enables new use cases)  
**Technical Debt:** Significant reduction
