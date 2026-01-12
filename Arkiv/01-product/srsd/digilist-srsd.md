# Software Requirements Specification Document (SRSD)

## Digilist Platform

**Version:** 1.0  
**Last Updated:** December 2024  
**Status:** Active

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification Document (SRSD) defines the technical requirements for the Digilist municipal listing booking platform. It serves as the authoritative reference for development, testing, and acceptance criteria.

### 1.2 Scope

This document covers:
- Functional requirements for all system components
- Non-functional requirements (performance, security, etc.)
- System interfaces and integrations
- Data requirements and constraints
- User interface requirements

### 1.3 Definitions

| Term | Definition |
|------|------------|
| **SRS** | Software Requirements Specification |
| **API** | Application Programming Interface |
| **RBAC** | Role-Based Access Control |
| **RLS** | Row-Level Security |
| **PII** | Personally Identifiable Information |
| **CRUD** | Create, Read, Update, Delete |

---

## 2. System Overview

### 2.1 System Context

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DIGILIST PLATFORM                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────┐ │
│  │  Frontend   │  │  Backoffice │  │ Learning Hub│  │  Mobile   │ │
│  │  (RR7)      │  │  (RR7)      │  │  (RR7)      │  │  (RN)     │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └─────┬─────┘ │
│         │                │                │                │       │
│         └────────────────┴────────────────┴────────────────┘       │
│                                   │                                 │
│                          ┌───────▼───────┐                         │
│                          │   API Server  │                         │
│                          │  (Fastify)    │                         │
│                          └───────┬───────┘                         │
│                                  │                                  │
│         ┌────────────────────────┼────────────────────────┐        │
│         │                        │                        │        │
│  ┌──────▼──────┐          ┌──────▼──────┐          ┌──────▼──────┐│
│  │  PostgreSQL │          │    Redis    │          │   Worker    ││
│  │  (Drizzle)  │          │   (Cache)   │          │  (BullMQ)   ││
│  └─────────────┘          └─────────────┘          └─────────────┘│
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        │                          │                          │
┌───────▼───────┐          ┌───────▼───────┐          ┌───────▼───────┐
│   ID-porten   │          │     Vipps     │          │     BRREG     │
│   (Auth)      │          │   (Payment)   │          │ (Verification)│
└───────────────┘          └───────────────┘          └───────────────┘
```

### 2.2 System Components

| Component | Technology | Responsibility |
|-----------|------------|----------------|
| **Frontend** | React Router 7, React 19 | Public booking portal |
| **Backoffice** | React Router 7 | Admin & case handler UI |
| **Learning Hub** | React Router 7 | E-learning platform |
| **API** | Fastify 5 | REST API, thin transport layer |
| **Database** | PostgreSQL 16 | Persistent storage |
| **Cache** | Redis | Session, cache, queues |
| **Worker** | BullMQ | Background job processing |

---

## 3. Functional Requirements

### 3.1 Authentication & Authorization

#### FR-AUTH-001: User Authentication

**Description:** System shall authenticate users via multiple providers.

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-AUTH-001.1 | Support ID-porten authentication (Norwegian national ID) | P0 |
| FR-AUTH-001.2 | Support OAuth providers (GitHub for development) | P1 |
| FR-AUTH-001.3 | Session-based authentication with httpOnly cookies | P0 |
| FR-AUTH-001.4 | Session timeout after 8 hours of inactivity | P0 |
| FR-AUTH-001.5 | Support "Remember me" for 30-day sessions | P2 |

#### FR-AUTH-002: Role-Based Access Control

**Description:** System shall enforce RBAC with four scopes.

**Scopes:**
| Scope | Description | Example Permissions |
|-------|-------------|---------------------|
| `user` | Personal portal | View own bookings, create bookings |
| `org` | Organization backoffice | Manage listings, approve bookings |
| `tenant` | Tenant administration | Manage organizations, billing |
| `saas` | Platform administration | Manage tenants, system config |

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-AUTH-002.1 | Permissions stored in database with scope | P0 |
| FR-AUTH-002.2 | Roles aggregate permissions | P0 |
| FR-AUTH-002.3 | Users assigned roles per tenant/org | P0 |
| FR-AUTH-002.4 | API endpoints enforce permission checks | P0 |
| FR-AUTH-002.5 | UI components respect RBAC | P0 |

#### FR-AUTH-003: Multi-Tenant Isolation

**Description:** System shall enforce strict tenant data isolation.

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-AUTH-003.1 | All tenant-scoped tables have `tenant_id` column | P0 |
| FR-AUTH-003.2 | All queries filter by tenant context | P0 |
| FR-AUTH-003.3 | API guards validate tenant access | P0 |
| FR-AUTH-003.4 | Cross-tenant data access requires saas scope | P0 |

---

### 3.2 Listing Management

#### FR-FAC-001: Listing CRUD

**Description:** System shall support listing lifecycle management.

**Data Model:**
```typescript
interface Listing {
  id: UUID;
  tenantId: UUID;
  orgId: UUID;
  name: string;
  slug: string;
  description?: string;
  status: 'draft' | 'published' | 'archived' | 'maintenance';
  address: string;
  city: string;
  postalCode: string;
  municipalityCode: string;
  latitude?: number;
  longitude?: number;
  capacity?: number;
  areaSqm?: number;
  settings: ListingSettings;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-FAC-001.1 | Create listing with required fields | P0 |
| FR-FAC-001.2 | Update listing details | P0 |
| FR-FAC-001.3 | Archive listing (soft delete) | P0 |
| FR-FAC-001.4 | Publish/unpublish listing | P0 |
| FR-FAC-001.5 | Search listings with filters | P0 |

#### FR-FAC-002: Zone Management

**Description:** System shall support zones within listings.

**Data Model:**
```typescript
interface Zone {
  id: UUID;
  tenantId: UUID;
  orgId: UUID;
  listingId: UUID;
  name: string;
  description?: string;
  status: 'active' | 'inactive' | 'maintenance';
  capacity?: number;
  basePricePerHourCents: number;
  currency: string;
  activityTypeCodes: string[];
  amenityCodes: string[];
  settings: ZoneSettings;
}
```

**Zone Settings:**
```typescript
interface ZoneSettings {
  ageRestrictions?: {
    minAge?: number;  // Minimum age (e.g., 18)
    maxAge?: number;  // Maximum age (e.g., 18 for youth-only zones)
  };
  // ... other settings
}
```

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-FAC-002.1 | Create zones linked to listing | P0 |
| FR-FAC-002.2 | Configure zone-specific pricing | P0 |
| FR-FAC-002.3 | Set zone capacity and attributes | P0 |
| FR-FAC-002.4 | Assign activity types to zones | P1 |
| FR-FAC-002.5 | Configure age restrictions (minAge/maxAge) | P1 |
| FR-FAC-002.6 | Enforce age restrictions during booking validation | P1 |

#### FR-FAC-003: Media Management

**Description:** System shall support listing/zone media.

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-FAC-003.1 | Upload images (max 10MB, jpg/png/webp) | P0 |
| FR-FAC-003.2 | Set primary image for listings | P0 |
| FR-FAC-003.3 | Support floor plans and documents | P1 |
| FR-FAC-003.4 | Auto-generate thumbnails | P1 |
| FR-FAC-003.5 | Alt text for accessibility | P0 |

---

### 3.3 Booking Engine

#### FR-BOOK-001: Single Booking

**Description:** System shall support single time-slot bookings.

**Data Model:**
```typescript
interface Booking {
  id: UUID;
  tenantId: UUID;
  orgId: UUID;
  listingId: UUID;
  zoneId?: UUID;
  createdByUserId: UUID;
  status: BookingStatus;
  source: BookingSource;
  startsAt: DateTime;
  endsAt: DateTime;
  purpose?: string;
  attendeeCount?: number;
  totalCents: number;
  currency: string;
  priceBreakdown: PriceBreakdown;
  metadata: BookingMetadata;
}

type BookingStatus = 
  | 'draft'
  | 'pending'
  | 'awaiting_payment'
  | 'awaiting_approval'
  | 'confirmed'
  | 'rejected'
  | 'cancelled'
  | 'completed'
  | 'no_show'
  | 'refunded'
  | 'expired';
```

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-BOOK-001.1 | Create booking with time slot selection | P0 |
| FR-BOOK-001.2 | Validate availability before confirmation | P0 |
| FR-BOOK-001.3 | Calculate price based on rules | P0 |
| FR-BOOK-001.4 | Prevent double-booking (race condition safe) | P0 |
| FR-BOOK-001.5 | Support booking holds during checkout | P0 |

#### FR-BOOK-002: Recurring Booking

**Description:** System shall support recurring booking patterns.

**Recurrence Patterns:**
```typescript
interface RecurrencePattern {
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  interval: number;
  daysOfWeek?: number[];  // 0-6
  dayOfMonth?: number;
  maxOccurrences?: number;
  exceptions?: string[];  // ISO dates to skip
}
```

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-BOOK-002.1 | Define recurring patterns | P1 |
| FR-BOOK-002.2 | Generate occurrences automatically | P1 |
| FR-BOOK-002.3 | Handle conflicts for individual occurrences | P1 |
| FR-BOOK-002.4 | Skip/reschedule individual occurrences | P1 |
| FR-BOOK-002.5 | Cancel entire series or future occurrences | P1 |

#### FR-BOOK-002a: Seasonal Rental

**Description:** System shall support seasonal rental applications as a separate booking type with application deadlines and allocation workflow.

**Data Model:**
```typescript
type BookingType = 'single' | 'recurring' | 'seasonal_rental';

type SeasonalRentalStatus = 
  | 'application_pending'
  | 'application_approved'
  | 'allocated'
  | 'confirmed'
  | 'rejected'
  | 'cancelled';

interface SeasonalRentalApplication {
  id: UUID;
  listingId: UUID;
  zoneId: UUID;
  applicationDeadline: DateTime;
  status: SeasonalRentalStatus;
  requestedSlots: RecurrenceSlot[];
  actorType: ActorType;
  allocationProposals?: AllocationProposal[];
  seasonalAllocationId?: UUID;
}
```

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-BOOK-002a.1 | Create seasonal rental application with deadline | P1 |
| FR-BOOK-002a.2 | Track application status flow | P1 |
| FR-BOOK-002a.3 | Generate allocation proposals with priority scoring | P1 |
| FR-BOOK-002a.4 | Allow manual adjustment of allocations | P1 |
| FR-BOOK-002a.5 | Detect allocation conflicts | P1 |

#### FR-BOOK-003: Booking Status Management

**Description:** System shall track booking status changes.

**State Machine:**
```
draft → pending → awaiting_payment → awaiting_approval → confirmed → completed
                        ↓                    ↓               ↓
                    expired              rejected        cancelled
                                                            ↓
                                                        refunded
```

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-BOOK-003.1 | Record all status transitions | P0 |
| FR-BOOK-003.2 | Capture change reason and actor | P0 |
| FR-BOOK-003.3 | Send notifications on status change | P0 |
| FR-BOOK-003.4 | Audit trail immutable (append-only) | P0 |

#### FR-BOOK-004: Booking Cancellation

**Description:** System shall support user and admin cancellation with deadline enforcement and refund handling.

**Cancellation Types:**
```typescript
type CancellationType = 'user' | 'admin' | 'municipal' | 'system';

interface CancellationDetails {
  cancelledBy: UUID;
  cancellationType: CancellationType;
  reason?: string;
  municipalReason?: string;
  cancelledAt: DateTime;
  refundAmount?: number;
  refundStatus?: 'pending' | 'processed' | 'failed';
}
```

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-BOOK-004.1 | User can cancel own bookings within deadline | P0 |
| FR-BOOK-004.2 | Admin can cancel any booking (bypasses deadline) | P0 |
| FR-BOOK-004.3 | Track cancellation type and reason | P0 |
| FR-BOOK-004.4 | Calculate refund based on cancellation policy | P0 |
| FR-BOOK-004.5 | Send cancellation notifications | P0 |
| FR-BOOK-004.6 | Municipal cancellation requires reason | P1 |

#### FR-BOOK-005: Age Validation

**Description:** System shall validate user age against zone age restrictions before allowing bookings.

**User Data Model:**
```typescript
interface User {
  id: UUID;
  dateOfBirth?: DateTime;  // Required for age-restricted zones
  age?: number;  // Calculated from dateOfBirth
  // ... other fields
}
```

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-BOOK-005.1 | Validate user age against zone minAge restriction | P1 |
| FR-BOOK-005.2 | Validate user age against zone maxAge restriction | P1 |
| FR-BOOK-005.3 | Reject booking if age requirements not met | P1 |
| FR-BOOK-005.4 | Calculate age from dateOfBirth if not provided | P1 |
| FR-BOOK-005.5 | Require dateOfBirth for age-restricted zone bookings | P1 |

---

### 3.4 Availability Management

#### FR-AVAIL-001: Opening Hours

**Description:** System shall define availability rules.

**Data Model:**
```typescript
interface AvailabilityRule {
  id: UUID;
  listingId?: UUID;
  zoneId?: UUID;
  dayOfWeek: number;  // 0=Sunday, 6=Saturday
  openTime: string;   // 'HH:mm'
  closeTime: string;
  slotDurationMinutes: number;
  isActive: boolean;
}
```

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-AVAIL-001.1 | Configure weekly schedule per listing/zone | P0 |
| FR-AVAIL-001.2 | Define time slot duration | P0 |
| FR-AVAIL-001.3 | Support different schedules per day | P0 |
| FR-AVAIL-001.4 | Allow seasonal schedule variations | P2 |

#### FR-AVAIL-002: Blackout Periods

**Description:** System shall support blackout periods.

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-AVAIL-002.1 | Define blackout date ranges | P0 |
| FR-AVAIL-002.2 | Support recurring blackouts (holidays) | P1 |
| FR-AVAIL-002.3 | Block booking creation during blackouts | P0 |
| FR-AVAIL-002.4 | Handle existing bookings during new blackouts | P1 |

#### FR-AVAIL-003: Availability Checking

**Description:** System shall provide real-time availability.

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-AVAIL-003.1 | Return available slots for date range | P0 |
| FR-AVAIL-003.2 | Consider existing bookings | P0 |
| FR-AVAIL-003.3 | Consider blackouts | P0 |
| FR-AVAIL-003.4 | Consider booking holds | P0 |
| FR-AVAIL-003.5 | Response time < 200ms | P0 |

---

### 3.5 Pricing Engine

#### FR-PRICE-001: Base Pricing

**Description:** System shall calculate booking prices.

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-PRICE-001.1 | Base price per hour per zone | P0 |
| FR-PRICE-001.2 | Apply actor type discounts | P0 |
| FR-PRICE-001.3 | Calculate VAT (25% Norway) | P0 |
| FR-PRICE-001.4 | Generate price breakdown | P0 |

#### FR-PRICE-002: Dynamic Pricing

**Description:** System shall support pricing rules.

**Pricing Rules:**
```typescript
interface PricingRule {
  id: UUID;
  name: string;
  type: 'base' | 'peak' | 'off_peak' | 'weekend' | 'holiday';
  pricePerHourCents: number;
  conditions: {
    daysOfWeek?: number[];
    startTime?: string;
    endTime?: string;
    minDurationMinutes?: number;
  };
  priority: number;
  validFrom?: DateTime;
  validUntil?: DateTime;
}
```

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-PRICE-002.1 | Define pricing rules with conditions | P1 |
| FR-PRICE-002.2 | Apply rules by priority | P1 |
| FR-PRICE-002.3 | Support time-limited promotions | P2 |
| FR-PRICE-002.4 | Discount codes | P1 |

---

### 3.6 Payment Processing

#### FR-PAY-001: Payment Flow

**Description:** System shall process payments securely.

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-PAY-001.1 | Integrate Vipps for mobile payments | P0 |
| FR-PAY-001.2 | Integrate Nets for card payments | P1 |
| FR-PAY-001.3 | Support invoice for verified orgs | P1 |
| FR-PAY-001.4 | Never store raw card numbers | P0 |
| FR-PAY-001.5 | Payment confirmation before booking confirm | P0 |

#### FR-PAY-002: Refunds

**Description:** System shall handle refunds.

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-PAY-002.1 | Auto-calculate refund per policy | P0 |
| FR-PAY-002.2 | Process refund via original method | P0 |
| FR-PAY-002.3 | Partial refunds for partial cancellations | P1 |
| FR-PAY-002.4 | Credit option for future bookings | P2 |

---

### 3.7 Notification System

#### FR-NOTIF-001: Notification Delivery

**Description:** System shall send notifications.

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-NOTIF-001.1 | Email notifications (required) | P0 |
| FR-NOTIF-001.2 | SMS notifications (optional) | P1 |
| FR-NOTIF-001.3 | Push notifications for mobile | P2 |
| FR-NOTIF-001.4 | In-app notification center | P0 |
| FR-NOTIF-001.5 | User notification preferences | P0 |

#### FR-NOTIF-002: Notification Types

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-NOTIF-002.1 | Booking confirmation | P0 |
| FR-NOTIF-002.2 | Approval/rejection notice | P0 |
| FR-NOTIF-002.3 | Payment receipt | P0 |
| FR-NOTIF-002.4 | Reminder (24h before) | P0 |
| FR-NOTIF-002.5 | Cancellation notice | P0 |

---

## 4. Non-Functional Requirements

### 4.1 Performance Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-PERF-001 | Page load time (LCP) | < 2.5s |
| NFR-PERF-002 | Time to Interactive (TTI) | < 3.5s |
| NFR-PERF-003 | API response time (p50) | < 200ms |
| NFR-PERF-004 | API response time (p95) | < 500ms |
| NFR-PERF-005 | Concurrent users supported | 1,000+ |
| NFR-PERF-006 | Database query time (p95) | < 100ms |

### 4.2 Security Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-SEC-001 | TLS 1.3 for all connections | P0 |
| NFR-SEC-002 | httpOnly, Secure, SameSite cookies | P0 |
| NFR-SEC-003 | CSRF protection | P0 |
| NFR-SEC-004 | SQL injection prevention (ORM) | P0 |
| NFR-SEC-005 | XSS prevention (CSP headers) | P0 |
| NFR-SEC-006 | Rate limiting (100 req/min/IP) | P0 |
| NFR-SEC-007 | Input validation (Zod schemas) | P0 |
| NFR-SEC-008 | Audit logging for all state changes | P0 |
| NFR-SEC-009 | PII encryption at rest | P1 |
| NFR-SEC-010 | Secrets in environment variables only | P0 |

### 4.3 Reliability Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-REL-001 | System availability | 99.9% |
| NFR-REL-002 | Mean Time to Recovery (MTTR) | < 1 hour |
| NFR-REL-003 | Data backup frequency | Daily |
| NFR-REL-004 | Backup retention | 30 days |
| NFR-REL-005 | Recovery Point Objective (RPO) | < 24 hours |

### 4.4 Accessibility Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-A11Y-001 | WCAG 2.1 AA compliance | P0 |
| NFR-A11Y-002 | Keyboard navigation | P0 |
| NFR-A11Y-003 | Screen reader support | P0 |
| NFR-A11Y-004 | Color contrast 4.5:1 (text) | P0 |
| NFR-A11Y-005 | Focus visible indicators | P0 |
| NFR-A11Y-006 | Touch targets 44x44px minimum | P0 |

### 4.5 Localization Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-L10N-001 | Norwegian (nb) as primary | P0 |
| NFR-L10N-002 | English (en) as fallback | P0 |
| NFR-L10N-003 | French (fr) support | P2 |
| NFR-L10N-004 | Arabic (ar) with RTL | P2 |
| NFR-L10N-005 | Date format: dd.MM.yyyy | P0 |
| NFR-L10N-006 | Time format: HH:mm (24h) | P0 |
| NFR-L10N-007 | Currency: NOK | P0 |

---

## 5. Interface Requirements

### 5.1 API Specification

**Base URL:** `https://api.digilist.no/api`

**Authentication:** Session cookie (`digilist_session`)

**Response Format:**
```typescript
// Success
{
  data: T,
  pagination?: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}

// Error
{
  error: {
    code: string,
    message: string,
    details?: object
  },
  requestId: string,
  timestamp: string,
  path: string
}
```

**Status Codes:**
| Code | Usage |
|------|-------|
| 200 | Success (GET, PUT, DELETE) |
| 201 | Created (POST) |
| 400 | Validation error |
| 401 | Not authenticated |
| 403 | Not authorized |
| 404 | Not found |
| 409 | Conflict |
| 429 | Rate limited |
| 500 | Server error |

### 5.2 External Integrations

#### ID-porten

**Protocol:** OpenID Connect  
**Flow:** Authorization Code with PKCE  
**Scopes:** `openid`, `profile`

#### Vipps

**Protocol:** REST API  
**Authentication:** OAuth2 client credentials  
**Webhooks:** Payment status callbacks

#### BRREG

**Protocol:** REST API  
**Authentication:** API key  
**Rate Limit:** 100 req/min

#### Calendar Integrations

**Description:** System shall support calendar synchronization with external calendar providers.

**Protocol:** 
- iCal feed (RFC 5545) for pull-based sync
- Microsoft Graph API for push-based Outlook sync
- Google Calendar API for push-based Google sync

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-INT-CAL-001 | iCal feed URL for personal bookings | P2 |
| FR-INT-CAL-002 | One-click add to Google Calendar | P2 |
| FR-INT-CAL-003 | One-click add to Outlook Calendar | P2 |
| FR-INT-CAL-004 | Automatic calendar updates when bookings change | P2 |
| FR-INT-CAL-005 | Support organization-level calendar feeds | P2 |
| FR-INT-CAL-006 | Microsoft Graph API integration for Outlook | P2 |
| FR-INT-CAL-007 | OAuth flow for Microsoft account authorization | P2 |

**Authentication:**
- Microsoft: OAuth2 Authorization Code flow with PKCE
- Google: OAuth2 Authorization Code flow with PKCE
- iCal: Public feed URLs with authentication tokens

**Data Model:**
```typescript
interface CalendarSync {
  id: UUID;
  userId: UUID;
  orgId?: UUID;
  provider: 'outlook' | 'google' | 'ical';
  calendarId: string;  // External calendar ID
  syncToken?: string;   // For incremental sync
  lastSyncedAt: DateTime;
  isActive: boolean;
}
```

---

## 6. Data Requirements

### 6.1 Data Retention

| Data Type | Retention Period | Justification |
|-----------|------------------|---------------|
| User accounts | Until deletion request | Service requirement |
| Bookings | 7 years | Tax/accounting |
| Payments | 7 years | Tax/accounting |
| Audit logs | 10 years | Compliance |
| Session data | 30 days | Security |

### 6.2 Data Export

**GDPR Article 20 - Data Portability:**
- Export user data in JSON format
- Include bookings, payments, preferences
- Automated export within 30 days

### 6.3 Data Deletion

**GDPR Article 17 - Right to Erasure:**
- Anonymize PII on deletion request
- Retain booking records with anonymized user
- Complete within 30 days

---

## 7. Constraints

### 7.1 Technical Constraints

- PostgreSQL 16+ required
- Node.js 22+ required
- pnpm package manager
- ESM modules only
- TypeScript strict mode

### 7.2 Regulatory Constraints

- GDPR compliance mandatory
- Norwegian data residency for PII
- Offentleglova (public records) compliance
- Universal design requirements

### 7.3 Business Constraints

- Norwegian market focus
- Municipality procurement requirements
- Tender documentation requirements

---

## 8. Appendices

### A. Database Schema Summary

See [Database Documentation](./database/README.md) for full ERD.

### B. API Endpoint Catalog

See [API Reference](./api/README.md) for complete API documentation.

### C. Test Requirements

See [Testing Strategy](./testing/README.md) for test coverage requirements.

---

*Document Owner: Engineering Team*  
*Review Cycle: Monthly*
