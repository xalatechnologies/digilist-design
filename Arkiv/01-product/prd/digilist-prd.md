# Product Requirements Document (PRD)

## Digilist - Municipal Listing Booking Platform

**Version:** 2.0  
**Last Updated:** January 2025  
**Status:** Active Development  
**Document Owner:** Product Team  
**Review Cycle:** Quarterly

---

## Document Information

| Attribute | Value |
|-----------|-------|
| **Document Type** | Product Requirements Document |
| **Related Documents** | [SRSD](../srsd/digilist-srsd.md), [Roadmap](../roadmap.md), [Requirements](../requirements/requirements.json) |
| **Stakeholders** | Product Team, Engineering, Design, Municipal Partners |
| **Approval Status** | Approved v2.0 |

---

## 1. Executive Summary

### 1.1 Product Vision

Digilist is a comprehensive SaaS platform that modernizes how Norwegian municipalities manage public listing bookings. The platform connects citizens, sports clubs, schools, and organizations with available municipal listings while ensuring fair access, compliance with regulations, and efficient resource utilization.

### 1.2 Problem Statement

Norwegian municipalities face significant challenges in listing management:

1. **Fragmented Systems** - Multiple disconnected booking systems across departments
2. **Manual Processes** - Paper-based applications, phone calls, and email chains
3. **Inequitable Access** - Lack of transparency in allocation decisions
4. **Administrative Burden** - Staff overwhelmed with booking requests and conflicts
5. **Poor Visibility** - Citizens unaware of available listings and time slots
6. **Compliance Risks** - Difficulty tracking GDPR consent and audit trails

### 1.3 Solution

Digilist provides a unified platform with:

- **Single Portal** - One place for all listing bookings
- **Self-Service** - Citizens can discover, book, and pay online
- **Fair Allocation** - Rules-based approval with transparent criteria
- **Automation** - Workflows reduce manual intervention
- **Compliance** - Built-in GDPR, audit trails, and documentation

### 1.4 Product Positioning

Digilist is positioned as the **leading Norwegian municipal booking platform**, designed specifically for the Norwegian public sector with:

- **Native Integration** - ID-porten, Vipps, BRREG, NIF
- **Regulatory Compliance** - GDPR, Offentleglova, Arkivlova, Universal Design
- **Multi-Tenant SaaS** - Scalable platform serving multiple municipalities
- **Modern Technology** - React 19, Fastify 5, PostgreSQL 16, TypeScript strict mode

### 1.5 Key Differentiators

1. **Norwegian-First Design** - Built for Norwegian municipalities, not adapted
2. **Unified Booking Model** - Single system handles all listing types (SPACE, RESOURCE, EVENT, SERVICE, VEHICLE, OTHER)
3. **Flexible Booking Models** - TIME_RANGE, SLOTS, ALL_DAY, QUANTITY, CAPACITY, PACKAGE
4. **Comprehensive Compliance** - Built-in GDPR, audit trails, retention policies
5. **Open Architecture** - API-first design, extensible integration points

---

## 2. Target Users

### 2.1 User Personas

#### Leietaker (Tenant/Booker)

**Who:** Citizens, families, event organizers  
**Goals:** Find and book listings quickly, understand rules, pay securely  
**Pain Points:** Complex processes, unclear availability, unexpected rejections

#### Saksbehandler (Case Handler)

**Who:** Municipal staff handling booking requests  
**Goals:** Process requests efficiently, ensure fair treatment, maintain documentation  
**Pain Points:** High volume, conflicting requests, manual tracking

#### Eiendomseier (Property Owner)

**Who:** Listing managers, department heads  
**Goals:** Maximize utilization, minimize conflicts, maintain listings  
**Pain Points:** Double-bookings, no-shows, damage tracking

#### Administrator

**Who:** System administrators, IT staff  
**Goals:** Configure system, manage users, ensure uptime  
**Pain Points:** Integration complexity, user management at scale

#### Kommune (Municipality Leadership)

**Who:** Department directors, elected officials  
**Goals:** Oversight, compliance, strategic planning  
**Pain Points:** Lack of reporting, risk exposure

### 2.2 Actor Types (Pricing Tiers)

| Actor Type | Description | Typical Discount | Verification | Use Cases |
|------------|-------------|------------------|--------------|-----------|
| `private` | Individual citizens | 0% | No | Personal events, family gatherings |
| `business` | Commercial entities | 0% | Optional (BRREG) | Corporate events, training sessions |
| `sports_club` | Sports organizations | 30% | NIF verification | Team practices, competitions |
| `youth_organization` | Youth groups | 50% | Yes | Youth activities, camps |
| `school` | Educational institutions | 100% (free) | Yes | School events, classes |
| `municipality` | Municipal departments | 100% (free) | Yes | Internal meetings, public services |

### 2.3 User Stories

#### As a Leietaker (Booker)
- **US-001:** As a citizen, I want to search for available listings by location and date, so I can find suitable venues for my event.
- **US-002:** As a sports club organizer, I want to book recurring weekly slots, so I can secure regular practice times.
- **US-003:** As a user, I want to see real-time availability, so I can make informed booking decisions.
- **US-004:** As a booker, I want to pay securely via Vipps, so I can complete bookings quickly.
- **US-005:** As a user, I want to receive booking confirmations and reminders, so I don't miss my bookings.

#### As a Saksbehandler (Case Handler)
- **US-010:** As a case handler, I want to see all pending approval requests in one queue, so I can process them efficiently.
- **US-011:** As a case handler, I want to approve or reject bookings with documented reasons, so decisions are transparent.
- **US-012:** As a case handler, I want to see booking history and patterns, so I can make informed decisions.
- **US-013:** As a case handler, I want to override booking rules when necessary, so I can handle exceptions.

#### As an Administrator
- **US-020:** As an admin, I want to configure listing rules and pricing, so I can manage different listing types.
- **US-021:** As an admin, I want to manage user roles and permissions, so access is properly controlled.
- **US-022:** As an admin, I want to view system reports and analytics, so I can understand usage patterns.
- **US-023:** As an admin, I want to configure approval workflows, so bookings are processed correctly.

#### As Municipality Leadership
- **US-030:** As a director, I want to see utilization reports, so I can optimize resource allocation.
- **US-031:** As leadership, I want to ensure GDPR compliance, so we meet regulatory requirements.
- **US-032:** As leadership, I want to see audit trails, so we can demonstrate accountability.

---

## 3. Core Features

> **Requirements Reference:** See [requirements.json](../../requirements/requirements.json) for detailed requirement IDs (DOM-001 through DOM-010, SAAS-001 through SAAS-010, TND-001 through TND-009).

### 3.1 Listing Management

**FR-001: Listing Types** *(DOM-002)*
The platform supports six distinct listing types, each optimized for different use cases:

| Type | Description | Booking Models | Examples |
|------|-------------|----------------|----------|
| `SPACE` | Physical spaces (rooms, halls) | TIME_RANGE, SLOTS, ALL_DAY | Sports halls, meeting rooms |
| `RESOURCE` | Equipment and resources | QUANTITY, CAPACITY | Projectors, tables, equipment |
| `EVENT` | Event-based bookings | CAPACITY, PACKAGE | Concerts, workshops, courses |
| `SERVICE` | Service-based bookings | TIME_RANGE, SLOTS | Consultations, training |
| `VEHICLE` | Vehicle rentals | TIME_RANGE, ALL_DAY | Cars, boats, bicycles |
| `OTHER` | Custom/other types | All models | Specialized bookings |

**FR-002: Listing as Primary Entity** *(DOM-001)*
- **Critical:** Listings are the ONLY bookable entity in the system
- No separate "facility" or "zone" concepts - all bookings reference listings directly
- Listings can have sub-entities (zones) for internal organization, but bookings are always at listing level

**FR-003: Listing Search** *(DOM-007)*
- Users can search listings by name, location, type, category, and amenities
- Search supports Norwegian characters (æ, ø, å) and fuzzy matching
- Results show availability summary, pricing, and key attributes
- Filter by listing type, capacity, amenities, and availability
- Geographic search with radius filtering

**FR-004: Listing Details**
- Detailed listing pages with:
  - Multiple images with alt text for accessibility
  - Floor plans and virtual tours (when available)
  - Capacity, dimensions, amenities, accessibility features
  - Booking rules, terms, and cancellation policies
  - Pricing information with actor type discounts
  - Real-time availability calendar
- Media management with sort order and primary image selection

**FR-005: Availability Calendar** *(TND-001)*
- Real-time availability visualization with multiple views:
  - **Month View:** Overview of availability across month
  - **Week View:** Detailed weekly schedule
  - **Day View:** Hour-by-hour availability
- Public calendars show booked/available slots (without personal data)
- Private calendars show full booking details for authorized users
- Color-coded status indicators (available, booked, blackout, maintenance)

### 3.2 Booking Engine

**FR-010: Unified Booking Model** *(DOM-003, DOM-004)*
The platform supports six booking models, all handled by a unified booking engine:

| Model | Description | Use Cases |
|-------|-------------|-----------|
| `TIME_RANGE` | Start and end time | Standard bookings, hourly rentals |
| `SLOTS` | Pre-defined time slots | Classes, appointments |
| `ALL_DAY` | Full day booking | Events, conferences |
| `QUANTITY` | Quantity-based | Equipment rentals, resources |
| `CAPACITY` | Capacity-based | Events with attendee limits |
| `PACKAGE` | Pre-defined packages | Event packages, bundles |

**FR-011: Single Booking**
- Select listing, date, and time slot (or quantity/capacity based on model)
- Specify purpose, attendee count, equipment needs
- Accept terms and conditions with documented consent (GDPR compliant)
- Age validation for age-restricted listings
- Real-time conflict detection before confirmation

**FR-012: Recurring Booking**
- Create recurring patterns:
  - Daily, weekly, biweekly, monthly
  - Custom intervals (every N days/weeks/months)
  - Specific days of week
- Set season start/end dates
- Handle conflicts and exceptions:
  - Skip individual occurrences
  - Reschedule conflicts automatically
  - Cancel future occurrences

**FR-013: Seasonal Rental** *(FR-011a)*
- Separate booking type: `seasonal_rental`
- Application deadline tracking with countdown
- Multi-stage status flow:
  1. `application_pending` - Application submitted
  2. `application_approved` - Application accepted
  3. `allocated` - Time slots allocated
  4. `confirmed` - Final confirmation
- Rule-based allocation engine with priority scoring:
  - Actor type priority
  - Historical usage patterns
  - Organization verification status
- Manual adjustment of allocation proposals by administrators
- Conflict detection across all seasonal applications

**FR-014: Booking Cart** *(FR-012)*
- Add multiple bookings to cart across different listings
- Apply discount codes and promotional offers
- Single checkout for multiple items
- Cart persistence across sessions
- Price summary with breakdown

**FR-015: Booking Items (Line Items)** *(DOM-005)*
- Normalized booking_items table with listing snapshots
- Each booking can contain multiple items
- Items capture listing state at time of booking (price, rules, etc.)
- Supports complex bookings with multiple listings/resources

**FR-016: Allocations (Calendar)** *(DOM-006)*
- Time-block allocations for calendar visualization
- Conflict detection based on allocations
- Allocation status tracking (tentative, confirmed, cancelled)
- Supports overlapping allocations for capacity-based bookings

**FR-017: Booking Status Tracking** *(TND-008)*
- Real-time status updates with full state machine:
  - `draft` → `pending` → `awaiting_payment` → `awaiting_approval` → `confirmed` → `completed`
  - Alternative paths: `rejected`, `cancelled`, `refunded`, `expired`, `no_show`
- Status history with timestamps, reasons, and actor information
- Notifications at each status change
- Immutable audit trail (append-only)

### 3.3 Approval Workflow

**FR-020: Booking Modes**

| Mode | Description | Use Case | Priority |
|------|-------------|----------|----------|
| `auto_approve` | Instant confirmation | Low-value, short bookings | P0 |
| `approval_required` | Staff review required | High-value, sensitive listings | P0 |
| `instant_paid` | Pay now, instant confirm | Commercial bookings | P0 |
| `hybrid` | Auto for some, manual for others | Mixed usage listings | P1 |

**FR-021: Approval Rules** *(FR-021)*
- Configure approval thresholds by:
  - Booking duration (e.g., > 4 hours requires approval)
  - Price threshold (e.g., > 5000 NOK requires approval)
  - Actor type (e.g., auto-approve verified organizations)
  - Listing type (e.g., EVENT always requires approval)
  - Time-based rules (e.g., weekend bookings require approval)
- Auto-approve for verified organizations (sports clubs, schools)
- Queue management for case handlers:
  - Priority sorting (by deadline, price, actor type)
  - Bulk actions (approve/reject multiple)
  - Filtering and search
  - Assignment to specific handlers

**FR-022: Rejection Handling**
- Mandatory rejection reason (cannot reject without reason)
- Categorized rejection reasons:
  - Conflict with existing booking
  - Policy violation
  - Insufficient documentation
  - Capacity exceeded
  - Other (with free text)
- Notification to user with explanation and next steps
- Appeal process tracking:
  - Users can request review
  - Appeal status and history
  - Escalation workflow

**FR-023: Municipal Cancellation**
- Municipal staff can cancel bookings with documented reason
- Required fields: cancellation reason, municipal reason (public-facing)
- Automatic refund calculation based on cancellation policy
- Notification to booker with explanation

### 3.4 Payment Processing

**FR-030: Payment Providers**
- **Vipps** (P0 - Primary Norwegian mobile payment)
  - Mobile app integration
  - QR code payment
  - Payment status webhooks
- **Nets** (P1 - Card payments)
  - Credit/debit card processing
  - 3D Secure support
- **Invoice** (P1 - For verified organizations)
  - Automatic invoice generation
  - Visma ERP integration (P2)
  - Payment terms configuration
- **Manual** (P2 - Cash/check for edge cases)
  - Mark as paid manually
  - Receipt generation

**FR-031: Pricing Engine** *(DOM-008)*
- **Base Pricing:**
  - Base price per listing (or per hour/day)
  - Currency: NOK (Norwegian Krone)
  - VAT calculation (25% standard rate)
- **Dynamic Pricing Rules:**
  - Peak hours (e.g., evenings, weekends)
  - Off-peak discounts
  - Holiday pricing
  - Seasonal variations
  - Time-based rules (e.g., minimum duration)
- **Actor Type Discounts:**
  - Automatic application based on user's actor type
  - Configurable discount percentages per actor type
- **Discount Codes:**
  - Promotional codes
  - Percentage or fixed amount discounts
  - Usage limits and expiration dates
- **Price Breakdown:**
  - Transparent pricing display
  - Base price, discounts, VAT, total
  - Historical price tracking (for refunds)

**FR-032: Refunds**
- Automatic refund calculation based on cancellation policy:
  - Full refund if cancelled > 48 hours before
  - 50% refund if cancelled 24-48 hours before
  - No refund if cancelled < 24 hours before
  - Custom policies per listing
- Partial refunds for partial cancellations (recurring bookings)
- Refund processing:
  - Via original payment method (Vipps, Nets)
  - Credit system for future bookings (optional)
  - Refund status tracking

### 3.5 Notifications

**FR-040: Notification Channels**
- Email (required)
- SMS (optional)
- Push notifications (mobile app)
- In-app notifications

**FR-041: Notification Types**
- Booking confirmation
- Approval/rejection
- Payment receipt
- Reminder (24h before)
- Cancellation
- System messages

### 3.6 Rules Engine

**FR-050: Configurable Rules** *(DOM-007)*
- **Duration Rules:**
  - Minimum/maximum booking duration
  - Slot duration (for SLOTS model)
  - Buffer time between bookings
- **Advance Booking Limits:**
  - Maximum days in advance (e.g., 90 days)
  - Minimum notice required (e.g., 24 hours)
- **Cancellation Deadlines:**
  - Hours before booking start
  - Different deadlines for different actor types
- **Actor Type Restrictions:**
  - Allowed actor types per listing
  - Age restrictions (minAge/maxAge)
  - Verification requirements
- **Time-of-Day Restrictions:**
  - Opening hours per day of week
  - Blackout periods
  - Peak hour restrictions
- **Capacity Rules:**
  - Maximum capacity per booking
  - Minimum capacity requirements
  - Capacity-based pricing

**FR-051: Rule Templates**
- Pre-built templates for common scenarios:
  - Sports hall (standard hours, recurring bookings)
  - Meeting room (business hours, short bookings)
  - Event space (all-day, approval required)
  - Equipment rental (quantity-based, instant approval)
- Copy rules between listings
- Bulk rule updates across multiple listings
- Rule versioning and history

**FR-052: Availability Rules** *(DOM-007)*
- Per-listing availability rules with day/time ranges
- Support for:
  - Weekly schedules (different per day)
  - Seasonal variations
  - Holiday schedules
  - Maintenance windows
- Blackout periods:
  - One-time blackouts
  - Recurring blackouts (holidays)
  - Emergency blackouts

### 3.7 Categories and Organization

**FR-060: Hierarchical Categories** *(DOM-009)*
- Categories with parent-child relationships
- Many-to-many listing-category mappings
- Category-based filtering and search
- Category-specific rules and pricing
- Category navigation and browsing

### 3.8 Media Management

**FR-070: Listing Media** *(DOM-010)*
- Multiple images per listing with sort order
- Primary image selection
- Image optimization and thumbnails
- Alt text for accessibility (required)
- Floor plans and documents
- Virtual tours (360° images/videos)

---

## 4. Non-Functional Requirements

> **Detailed NFRs:** See [Non-Functional Requirements](../srsd/non-functional-requirements.md) for complete specification.

### 4.1 Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page Load (LCP) | < 2.5 seconds | Core Web Vitals |
| Time to Interactive (TTI) | < 3.5 seconds | Lighthouse |
| API Response (p50) | < 200ms | Application monitoring |
| API Response (p95) | < 500ms | Application monitoring |
| Database Query (p95) | < 100ms | Database monitoring |
| Concurrent Users | 1,000+ | Load testing |
| Availability | 99.9% uptime | Uptime monitoring |

### 4.2 Security

- **Authentication:** 
  - ID-porten (Norwegian national ID) - P0
  - OAuth providers (GitHub for development) - P1
  - Session-based with httpOnly cookies
  - 8-hour session timeout (configurable)
- **Authorization:** 
  - RBAC with four scopes: `user`, `org`, `tenant`, `saas`
  - Permission-based access control
  - Row-level security (RLS) for multi-tenancy
- **Data Encryption:** 
  - TLS 1.3 in transit
  - AES-256 at rest (PII)
- **Security Measures:**
  - CSRF protection
  - XSS prevention (CSP headers)
  - SQL injection prevention (ORM)
  - Rate limiting (100 req/min per IP)
  - Input validation (Zod schemas)
- **Audit Logging:** 
  - All state changes logged with user context
  - Immutable audit trail (append-only)
- **PII Protection:** 
  - GDPR-compliant data handling
  - Data retention policies
  - Right to erasure support
  - Data portability (export)

### 4.3 Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- High contrast mode
- Norwegian language primary

### 4.4 Scalability

- Multi-tenant architecture with tenant isolation
- Horizontal scaling for API and workers
- Database sharding-ready schema design
- CDN for static assets

### 4.5 Compliance

- **GDPR (General Data Protection Regulation):**
  - Consent tracking with documented timestamps
  - Data subject requests (access, rectification, erasure, portability)
  - Data retention policies (7 years for bookings/payments, 10 years for audit logs)
  - Privacy by design and default
  - Data Protection Impact Assessments (DPIA)
- **Offentleglova (Public Records Act):**
  - Public records compliance
  - Document classification and handling
  - Access request handling
- **Arkivlova (Archives Act):**
  - Document retention requirements
  - Archive-ready data formats
  - Long-term storage compliance
- **Universal Design:**
  - Norwegian accessibility requirements (WCAG 2.1 AA)
  - Keyboard navigation
  - Screen reader support
  - High contrast mode
  - Norwegian language primary

### 4.6 Scalability

- **Multi-Tenant Architecture:**
  - Tenant isolation at database level
  - Horizontal scaling for API and workers
  - Database sharding-ready schema design
- **Performance Optimization:**
  - CDN for static assets
  - Redis caching for frequently accessed data
  - Database query optimization
  - Background job processing (BullMQ)
- **Load Handling:**
  - Auto-scaling based on load
  - Queue-based processing for heavy operations
  - Rate limiting and throttling

---

## 5. Integration Requirements

### 5.1 Norwegian Public Services

| Integration | Purpose | Priority | Status |
|-------------|---------|----------|--------|
| ID-porten | National authentication (BankID/MinID) | P0 | In Progress |
| BRREG | Organization verification (Brønnøysund Register) | P1 | Planned |
| NIF | Sports club verification (Norwegian Sports Federation) | P1 | Planned |
| Altinn | Official communications and forms | P2 | Future |
| Altinn API | Digital form submission | P2 | Future |

### 5.2 Payment Providers

| Provider | Type | Priority | Status |
|----------|------|----------|--------|
| Vipps | Mobile payment (Norwegian standard) | P0 | In Progress |
| Nets | Card payment (credit/debit) | P1 | Planned |
| Visma | Invoice/ERP integration | P2 | Future |
| Stripe | International card payments | P2 | Future |

### 5.3 Access Control

| Integration | Purpose | Priority | Status |
|-------------|---------|----------|--------|
| RCO | Lock code generation (time-limited codes) | P1 | Planned |
| Salto | Electronic locks (keycard systems) | P2 | Future |
| NFC | Near-field communication for mobile access | P2 | Future |

### 5.4 Calendar Integrations

| Integration | Purpose | Priority | Status |
|-------------|---------|----------|--------|
| iCal Feed | Personal booking calendar export (RFC 5545) | P2 | Planned |
| Google Calendar | One-click add to Google Calendar | P2 | Planned |
| Outlook Calendar | Microsoft Graph API sync | P2 | Planned |

**Features:**
- iCal feed URL for personal bookings (public/private feeds)
- One-click add to Google/Outlook Calendar
- Automatic calendar updates when bookings change
- Organization-level calendar feeds
- Microsoft Graph API integration for Outlook
- OAuth flow for Microsoft account authorization
- Two-way sync (read external calendar conflicts)

### 5.5 Reporting and Analytics

| Integration | Purpose | Priority | Status |
|-------------|---------|----------|--------|
| Custom Reports | Built-in reporting engine | P0 | In Progress |
| Data Export | CSV/Excel export | P0 | In Progress |
| Analytics API | Programmatic access to analytics | P1 | Planned |
| BI Integration | Power BI, Tableau connectors | P2 | Future |

---

## 6. Success Metrics

### 6.1 User Adoption

| Metric | Target (Year 1) | Target (Year 2) | Measurement |
|--------|-----------------|-----------------|-------------|
| Registered users | 10,000+ | 25,000+ | User database |
| Monthly active users | 5,000+ | 15,000+ | Analytics |
| Online booking rate | > 80% | > 90% | Booking source tracking |
| Mobile usage | > 40% | > 50% | User agent analysis |
| Repeat booking rate | > 60% | > 70% | User booking history |

### 6.2 Operational Efficiency

| Metric | Target | Measurement |
|--------|--------|-------------|
| Average booking time | < 5 minutes | User session analytics |
| Auto-approval rate | > 60% | Approval workflow metrics |
| Staff time per booking | < 2 minutes | Case handler analytics |
| Support tickets/booking | < 0.05 | Support system integration |
| Booking completion rate | > 85% | Funnel analysis |

### 6.3 Business Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Listing utilization | > 70% | Booking calendar analysis |
| No-show rate | < 5% | Attendance tracking |
| Payment success rate | > 98% | Payment provider analytics |
| Customer satisfaction | > 4.2/5 | Post-booking surveys |
| Net Promoter Score (NPS) | > 50 | User surveys |

### 6.4 Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| System uptime | > 99.9% | Monitoring system |
| API error rate | < 0.1% | Application monitoring |
| Page load performance | < 2.5s LCP | Core Web Vitals |
| Test coverage | > 95% | Test reports |
| Security incidents | 0 critical/high | Security monitoring |

---

## 7. Release Roadmap

> **Note:** See [Roadmap](../roadmap.md) for detailed project planning and milestones.

### Phase 1: Foundation (Q1 2025) - MVP

**Core Features:**
- ✅ Core booking engine (all 6 booking models)
- ✅ Listing management (all 6 listing types)
- ✅ User authentication (ID-porten)
- ✅ Basic approval workflow
- ✅ Email notifications
- ✅ Multi-tenant architecture
- ✅ RBAC and permissions

**Success Criteria:**
- 100% P0 requirements implemented
- Test coverage > 95%
- Performance targets met
- Security audit passed

### Phase 2: Payments & Scale (Q2 2025)

**Core Features:**
- Vipps integration (P0)
- Invoice generation
- Recurring bookings
- Public calendar
- Mobile-responsive web app
- Advanced search and filtering

**Success Criteria:**
- Payment success rate > 98%
- Mobile usage > 40%
- Online booking rate > 80%

### Phase 3: Advanced Features (Q3 2025)

**Core Features:**
- Rules engine enhancements
- Advanced reporting and analytics
- RCO integration (lock codes)
- Seasonal rental allocation
- Calendar integrations (iCal, Google, Outlook)
- BRREG and NIF verification

**Success Criteria:**
- Auto-approval rate > 60%
- Listing utilization > 70%
- Integration uptime > 99.9%

### Phase 4: Enterprise (Q4 2025)

**Core Features:**
- Cross-municipality booking
- Public API for third parties
- Advanced analytics dashboard
- Custom branding per tenant
- White-label support
- Mobile apps (iOS/Android)

**Success Criteria:**
- 10+ municipalities onboarded
- API adoption by 3+ third parties
- Customer satisfaction > 4.2/5

### Future Phases (2026+)

- AI-powered recommendations
- Predictive analytics
- Advanced access control (NFC, biometrics)
- International expansion (Sweden, Denmark)
- Marketplace for third-party integrations

---

## 8. Risks & Mitigations

| Risk | Impact | Probability | Mitigation | Owner |
|------|--------|-------------|------------|-------|
| ID-porten integration delays | High | Medium | Start early, use test environment, dedicated resource | Engineering |
| Vipps API changes | Medium | Low | Monitor changelog, versioned integration, abstraction layer | Engineering |
| GDPR violations | High | Low | Legal review, automated compliance checks, regular audits | Product + Legal |
| Performance at scale | Medium | Medium | Load testing, horizontal scaling, caching strategy | Engineering |
| User adoption resistance | High | Medium | Training, change management, UX focus, pilot programs | Product |
| Data migration issues | Medium | Low | Migration scripts, rollback plan, staged rollout | Engineering |
| Third-party API failures | Medium | Medium | Retry logic, fallback mechanisms, monitoring | Engineering |
| Key person dependency | High | Medium | Documentation, knowledge sharing, cross-training | Management |
| Scope creep | Medium | High | Strict backlog management, regular reviews | Product |
| Timeline slippage | Medium | Medium | Buffer in estimates, MVP focus, regular checkpoints | Project Management |

### 8.1 Risk Monitoring

- **Monthly Risk Review:** Product and Engineering leads
- **Quarterly Risk Assessment:** Full stakeholder review
- **Risk Register:** Maintained in project management system
- **Escalation Process:** Defined escalation paths for high-impact risks

---

## 9. Appendices

### A. Glossary

| Term | Definition |
|------|------------|
| **Tenant** | A municipality or organization using Digilist (multi-tenant SaaS) |
| **Listing** | A bookable entity (sports hall, meeting room, equipment, etc.) - the ONLY bookable entity |
| **Zone** | A subdivision of a listing for internal organization (not bookable directly) |
| **Actor Type** | Pricing tier based on organization type (private, business, sports_club, etc.) |
| **Blackout** | Period when listing is unavailable (maintenance, holidays, etc.) |
| **Allocation** | Time-block allocation for calendar visualization and conflict detection |
| **Booking Model** | How a booking is structured (TIME_RANGE, SLOTS, ALL_DAY, QUANTITY, CAPACITY, PACKAGE) |
| **Listing Type** | Category of listing (SPACE, RESOURCE, EVENT, SERVICE, VEHICLE, OTHER) |
| **Saksbehandler** | Case handler - municipal staff who process booking approvals |
| **Leietaker** | Tenant/booker - end user who makes bookings |
| **RBAC** | Role-Based Access Control - permission system with roles and scopes |
| **ID-porten** | Norwegian national identity provider (BankID/MinID) |

### B. Requirements Traceability

This PRD maps to the following requirement IDs in [requirements.json](../../requirements/requirements.json):

- **Domain Requirements:** DOM-001 through DOM-010
- **Platform Requirements:** SAAS-001 through SAAS-010
- **Tender Requirements:** TND-001 through TND-009
- **Security Requirements:** SEC-001 through SEC-004

### C. Related Documentation

- [Software Requirements Specification (SRSD)](../srsd/digilist-srsd.md)
- [Non-Functional Requirements](../srsd/non-functional-requirements.md)
- [System Architecture](../../02-architecture/system-architecture.md)
- [Roadmap](../roadmap.md)
- [Requirements Index](../../requirements/requirements.json)

### D. External References

- [Norwegian ID-porten Documentation](https://docs.digdir.no/)
- [Vipps API Documentation](https://developer.vippsmobilepay.com/)
- [BRREG API](https://data.brreg.no/)
- [NIF Organization Registry](https://www.idrettsforbundet.no/)
- [GDPR Guidelines](https://gdpr.eu/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### E. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | December 2024 | Product Team | Initial version |
| 2.0 | January 2025 | Product Team | Enhanced with user stories, detailed features, cross-references, updated metrics |

---

**Document Owner:** Product Team  
**Review Cycle:** Quarterly  
**Next Review:** April 2025  
**Approval:** Product Owner, Engineering Lead, Design Lead
