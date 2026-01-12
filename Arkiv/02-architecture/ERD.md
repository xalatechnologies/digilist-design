---
source: docs/knowledge_base/requirements/ERD.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.252Z
---

---
source: docs/architecture/ERD.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.246Z
---

# Entity Relationship Diagram (ERD)

## Digilist Platform Database Schema

**Version:** 1.0  
**Database:** PostgreSQL 16  
**ORM:** Drizzle ORM

---

## 1. Schema Overview

The Digilist database follows a multi-tenant architecture with strict tenant isolation. All tenant-scoped tables include a `tenant_id` column with appropriate indexes.

### Domain Areas

| Domain | Description | Tables |
|--------|-------------|--------|
| **Identity** | Users and authentication | `tenants`, `users`, `sessions`, `oauth_accounts` |
| **RBAC** | Organizations and permissions | `organizations`, `memberships`, `roles`, `permissions`, `user_roles` |
| **Listings** | Venues and zones | `listings`, `zones`, `listing_media`, `listing_rules` |
| **Bookings** | Reservations | `bookings`, `recurring_bookings`, `booking_status_history` |
| **Availability** | Schedules and pricing | `availability_rules`, `blackouts`, `pricing_rules` |
| **Payments** | Transactions | `payments`, `invoices`, `payment_methods` |
| **Compliance** | Audit and GDPR | `audit_logs`, `gdpr_consents`, `data_subject_requests` |
| **Config** | Lookups | `listing_types`, `activity_types`, `actor_types`, `regions` |

---

## 2. Entity Relationship Diagram

### 2.1 Core Identity & Tenancy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          IDENTITY & TENANCY                                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│     tenants      │       │      users       │       │    sessions      │
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id (PK)          │       │ id (PK)          │       │ id (PK)          │
│ name             │       │ email            │       │ user_id (FK)     │──┐
│ slug (UNIQUE)    │       │ phone            │       │ token            │  │
│ status           │       │ name             │       │ expires_at       │  │
│ domain           │       │ email_verified   │       │ ip_address       │  │
│ settings (JSONB) │       │ last_login_at    │       │ user_agent       │  │
│ created_at       │       │ created_at       │       │ created_at       │  │
│ updated_at       │       │ updated_at       │       └────────┬─────────┘  │
└────────┬─────────┘       └────────┬─────────┘                │            │
         │                          │                          │            │
         │                          │◀─────────────────────────┘            │
         │                          │                                       │
         │                          │◀──────────────────────────────────────┘
         │                          │
         │       ┌──────────────────┴───────────────────┐
         │       │                                      │
         │       ▼                                      ▼
         │  ┌──────────────────┐              ┌──────────────────┐
         │  │  oauth_accounts  │              │   oauth_states   │
         │  ├──────────────────┤              ├──────────────────┤
         │  │ id (PK)          │              │ state (PK)       │
         │  │ user_id (FK)     │              │ code_verifier    │
         │  │ provider         │              │ redirect_uri     │
         │  │ provider_id      │              │ expires_at       │
         │  │ access_token     │              │ created_at       │
         │  │ refresh_token    │              └──────────────────┘
         │  │ expires_at       │
         │  │ created_at       │
         │  └──────────────────┘
         │
         ▼
```

### 2.2 Organizations & RBAC

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ORGANIZATIONS & RBAC                                │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│     tenants      │◀──────│  organizations   │       │   actor_types    │
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id (PK)          │       │ id (PK)          │       │ id (PK)          │
└──────────────────┘       │ tenant_id (FK)   │──┐    │ tenant_id (FK)   │
                           │ name             │  │    │ org_id (FK)      │──┐
                           │ slug             │  │    │ code             │  │
                           │ org_number       │  │    │ name             │  │
                           │ status           │  │    │ discount_%       │  │
                           │ settings (JSONB) │  │    │ requires_verify  │  │
                           │ created_at       │  │    │ metadata (JSONB) │  │
                           │ updated_at       │  │    │ created_at       │  │
                           └────────┬─────────┘  │    └────────┬─────────┘  │
                                    │            │             │            │
         ┌──────────────────────────┼────────────┘             │            │
         │                          │                          │            │
         │                          ▼                          ▼            │
         │            ┌──────────────────┐       ┌──────────────────┐       │
         │            │   memberships    │       │ actor_type_rules │       │
         │            ├──────────────────┤       ├──────────────────┤       │
         │            │ tenant_id (FK)   │       │ id (PK)          │       │
         │            │ org_id (FK)      │◀──────│ tenant_id (FK)   │       │
         │            │ user_id (FK)     │       │ org_id (FK)      │       │
         │            │ status           │       │ actor_type_id(FK)│◀──────┘
         │            │ actor_type_id(FK)│──────▶│ listing_id (FK) │
         │            │ invited_by (FK)  │       │ max_advance_days │
         │            │ joined_at        │       │ cancel_deadline  │
         │            │ created_at       │       │ priority         │
         │            └──────────────────┘       └──────────────────┘
         │
         ▼
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│      roles       │       │   permissions    │       │role_permissions  │
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id (PK)          │       │ id (PK)          │       │ role_id (FK)     │
│ tenant_id (FK)   │       │ scope            │       │ permission_id(FK)│
│ org_id (FK)      │       │ code (UNIQUE)    │       │ created_at       │
│ scope            │       │ name             │       └────────┬─────────┘
│ name             │       │ description      │                │
│ is_system        │       │ created_at       │                │
│ is_default       │       └────────┬─────────┘                │
│ created_at       │                │                          │
└────────┬─────────┘                │◀─────────────────────────┘
         │                          │
         │       ┌──────────────────┘
         │       │
         ▼       ▼
┌──────────────────┐
│    user_roles    │
├──────────────────┤
│ tenant_id (FK)   │
│ org_id (FK)      │
│ user_id (FK)     │
│ role_id (FK)     │
│ granted_by (FK)  │
│ granted_at       │
│ expires_at       │
│ created_at       │
└──────────────────┘
```

### 2.3 Listings & Zones

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          FACILITIES & ZONES                                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│  organizations   │◀──────│    listings    │──────▶│      zones       │
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id (PK)          │       │ id (PK)          │       │ id (PK)          │
└──────────────────┘       │ tenant_id (FK)   │       │ tenant_id (FK)   │
                           │ org_id (FK)      │       │ org_id (FK)      │
                           │ listing_type    │       │ listing_id (FK) │
                           │ name             │       │ name             │
                           │ slug             │       │ description      │
                           │ description      │       │ status           │
                           │ status           │       │ capacity         │
                           │ address          │       │ base_price_cents │
                           │ city             │       │ currency         │
                           │ postal_code      │       │ activity_types   │
                           │ municipality     │       │ amenity_codes    │
                           │ latitude         │       │ settings (JSONB) │
                           │ longitude        │       │ sort_order       │
                           │ capacity         │       │ created_at       │
                           │ area_sqm         │       │ updated_at       │
                           │ settings (JSONB) │       └────────┬─────────┘
                           │ published_at     │                │
                           │ created_at       │                │
                           │ updated_at       │                │
                           └────────┬─────────┘                │
                                    │                          │
         ┌──────────────────────────┼──────────────────────────┘
         │                          │
         ▼                          ▼
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│  listing_media  │       │  listing_rules  │       │booking_terms_acc │
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id (PK)          │       │ id (PK)          │       │ id (PK)          │
│ tenant_id (FK)   │       │ tenant_id (FK)   │       │ tenant_id (FK)   │
│ org_id (FK)      │       │ org_id (FK)      │       │ org_id (FK)      │
│ listing_id (FK) │       │ listing_id (FK) │       │ booking_id (FK)  │
│ zone_id (FK)     │       │ type             │       │ user_id (FK)     │
│ type             │       │ title            │       │ rule_id (FK)     │
│ url              │       │ body             │       │ rule_version     │
│ thumbnail_url    │       │ summary          │       │ rule_title       │
│ alt_text         │       │ is_required      │       │ accepted_at      │
│ is_primary       │       │ is_active        │       │ ip_address       │
│ sort_order       │       │ version          │       │ user_agent       │
│ uploaded_by (FK) │       │ effective_from   │       └──────────────────┘
│ created_at       │       │ effective_until  │
└──────────────────┘       │ created_by (FK)  │
                           │ created_at       │
                           │ updated_at       │
                           └──────────────────┘
```

### 2.4 Bookings

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BOOKINGS                                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐       ┌──────────────────────────────────────────────────┐
│    listings    │◀──────│                    bookings                       │
├──────────────────┤       ├──────────────────────────────────────────────────┤
│ id (PK)          │       │ id (PK)                                          │
└──────────────────┘       │ tenant_id (FK)         │ recurring_booking_id(FK)│
                           │ org_id (FK)            │ payment_id (FK)         │
┌──────────────────┐       │ listing_id (FK)       │ price_subtotal_cents    │
│      zones       │◀──────│ zone_id (FK)           │ discount_cents          │
├──────────────────┤       │ created_by_user_id(FK) │ vat_cents               │
│ id (PK)          │       │ booked_for_org_id (FK) │ total_cents             │
└──────────────────┘       │ booked_for_user_id(FK) │ currency                │
                           │ actor_type_id (FK)     │ price_breakdown (JSONB) │
┌──────────────────┐       │ status                 │ metadata (JSONB)        │
│      users       │◀──────│ source                 │ confirmed_at            │
├──────────────────┤       │ starts_at              │ cancelled_at            │
│ id (PK)          │       │ ends_at                │ completed_at            │
└──────────────────┘       │ purpose                │ created_at              │
                           │ attendee_count         │ updated_at              │
                           │ notes                  └─────────────────────────┤
                           │ internal_notes                                   │
                           │ show_in_public_calendar                          │
                           │ public_title                                     │
                           │ approval_required                                │
                           │ approved_at                                      │
                           │ approved_by (FK)                                 │
                           │ rejected_at                                      │
                           │ rejected_by (FK)                                 │
                           │ rejection_reason                                 │
                           └─────────────────────────┬────────────────────────┘
                                                     │
                    ┌────────────────────────────────┼────────────────────────┐
                    │                                │                        │
                    ▼                                ▼                        ▼
┌──────────────────────────┐    ┌──────────────────────────┐    ┌──────────────────┐
│ booking_status_history   │    │  booking_cancel_policy   │    │  booking_holds   │
├──────────────────────────┤    ├──────────────────────────┤    ├──────────────────┤
│ id (PK)                  │    │ id (PK)                  │    │ id (PK)          │
│ tenant_id (FK)           │    │ tenant_id (FK)           │    │ tenant_id (FK)   │
│ org_id (FK)              │    │ booking_id (FK)          │    │ org_id (FK)      │
│ booking_id (FK)          │    │ deadline_at              │    │ zone_id (FK)     │
│ from_status              │    │ fee_policy (JSONB)       │    │ user_id (FK)     │
│ to_status                │    │ created_at               │    │ starts_at        │
│ changed_by (FK)          │    └──────────────────────────┘    │ ends_at          │
│ changed_at               │                                    │ expires_at       │
│ reason                   │                                    │ booking_id (FK)  │
│ metadata (JSONB)         │                                    │ session_id       │
└──────────────────────────┘                                    │ created_at       │
                                                                └──────────────────┘
```

### 2.5 Recurring Bookings

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          RECURRING BOOKINGS                                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────┐                    ┌──────────────────────────┐
│   recurring_bookings     │───────────────────▶│  recurring_occurrences   │
├──────────────────────────┤                    ├──────────────────────────┤
│ id (PK)                  │                    │ id (PK)                  │
│ tenant_id (FK)           │                    │ tenant_id (FK)           │
│ org_id (FK)              │                    │ org_id (FK)              │
│ listing_id (FK)         │                    │ recurring_booking_id(FK) │
│ zone_id (FK)             │                    │ booking_id (FK)          │
│ created_by_user_id (FK)  │                    │ occurrence_date          │
│ actor_type_id (FK)       │                    │ status                   │
│ pattern (JSONB)          │                    │ conflict_reason          │
│ start_time               │                    │ skipped_reason           │
│ end_time                 │                    │ created_at               │
│ start_date               │                    │ updated_at               │
│ end_date                 │                    └──────────────────────────┘
│ status                   │
│ purpose                  │                              │
│ notes                    │                              │
│ last_generated_at        │                              ▼
│ generation_horizon_days  │                    ┌──────────────────────────┐
│ created_at               │                    │       bookings           │
│ updated_at               │                    ├──────────────────────────┤
└──────────────────────────┘                    │ id (PK)                  │
                                                │ recurring_booking_id(FK) │
                                                └──────────────────────────┘
```

### 2.6 Availability & Pricing

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       AVAILABILITY & PRICING                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│availability_rules│       │     blackouts    │       │  pricing_rules   │
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id (PK)          │       │ id (PK)          │       │ id (PK)          │
│ listing_id (FK) │       │ listing_id (FK) │       │ listing_id (FK) │
│ zone_id (FK)     │       │ zone_id (FK)     │       │ zone_id (FK)     │
│ day_of_week      │       │ name             │       │ name             │
│ open_time        │       │ reason           │       │ type             │
│ close_time       │       │ start_date       │       │ price_per_hour   │
│ slot_duration    │       │ end_date         │       │ currency         │
│ is_active        │       │ is_recurring     │       │ conditions(JSONB)│
│ created_at       │       │ recurring_pattern│       │ priority         │
│ updated_at       │       │ created_by (FK)  │       │ is_active        │
└──────────────────┘       │ created_at       │       │ valid_from       │
                           └──────────────────┘       │ valid_until      │
                                                      │ created_at       │
┌──────────────────┐                                  │ updated_at       │
│  discount_codes  │                                  └──────────────────┘
├──────────────────┤
│ id (PK)          │
│ organization_id  │
│ code (UNIQUE)    │
│ description      │
│ discount_type    │
│ discount_value   │
│ max_uses         │
│ used_count       │
│ min_booking_amt  │
│ valid_from       │
│ valid_until      │
│ is_active        │
│ created_at       │
└──────────────────┘
```

### 2.7 Payments

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PAYMENTS                                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│     payments     │       │ payment_methods  │       │     invoices     │
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id (PK)          │       │ id (PK)          │       │ id (PK)          │
│ tenant_id (FK)   │       │ tenant_id (FK)   │       │ tenant_id (FK)   │
│ org_id (FK)      │       │ org_id (FK)      │       │ org_id (FK)      │
│ booking_id (FK)  │       │ user_id (FK)     │       │ payment_id (FK)  │
│ user_id (FK)     │       │ provider         │       │ invoice_number   │
│ provider         │       │ provider_id      │       │ status           │
│ provider_payment │       │ type             │       │ issued_at        │
│ amount_cents     │       │ last_four        │       │ due_date         │
│ currency         │       │ brand            │       │ paid_at          │
│ status           │       │ is_default       │       │ line_items(JSONB)│
│ refunded_amount  │       │ metadata (JSONB) │       │ subtotal_cents   │
│ metadata (JSONB) │       │ created_at       │       │ vat_cents        │
│ created_at       │       │ updated_at       │       │ total_cents      │
│ completed_at     │       └──────────────────┘       │ currency         │
│ refunded_at      │                                  │ metadata (JSONB) │
└──────────────────┘                                  │ created_at       │
                                                      │ updated_at       │
┌──────────────────┐                                  └──────────────────┘
│payment_webhooks  │
├──────────────────┤
│ id (PK)          │
│ tenant_id (FK)   │
│ payment_id (FK)  │
│ provider         │
│ event_type       │
│ payload (JSONB)  │
│ processed_at     │
│ error            │
│ created_at       │
└──────────────────┘
```

### 2.8 Compliance & Audit

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMPLIANCE & AUDIT                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│    audit_logs    │       │  gdpr_consents   │       │data_subject_reqs │
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id (PK)          │       │ id (PK)          │       │ id (PK)          │
│ tenant_id (FK)   │       │ tenant_id (FK)   │       │ tenant_id (FK)   │
│ org_id (FK)      │       │ user_id (FK)     │       │ user_id (FK)     │
│ user_id (FK)     │       │ consent_type     │       │ request_type     │
│ action           │       │ consent_given    │       │ status           │
│ entity_type      │       │ consent_version  │       │ submitted_at     │
│ entity_id        │       │ ip_address       │       │ processed_at     │
│ changes (JSONB)  │       │ user_agent       │       │ processed_by(FK) │
│ ip_address       │       │ created_at       │       │ notes            │
│ user_agent       │       │ updated_at       │       │ metadata (JSONB) │
│ request_id       │       └──────────────────┘       │ created_at       │
│ created_at       │                                  │ updated_at       │
└──────────────────┘                                  └──────────────────┘
```

---

## 3. Key Relationships

### 3.1 Tenant Hierarchy

```
Tenant (SaaS customer / Municipality)
  └── Organization (Operational unit)
        ├── Listing (Venue)
        │     └── Zone (Bookable unit)
        ├── Membership (User → Org link)
        └── Actor Type (Pricing tier)
```

### 3.2 Booking Relationships

```
Booking
  ├── Listing (venue)
  ├── Zone (specific area)
  ├── User (creator)
  ├── Actor Type (pricing tier)
  ├── Payment (transaction)
  ├── Status History (audit)
  └── Recurring Booking (if part of series)
```

### 3.3 RBAC Relationships

```
User
  └── User Role (assignment)
        └── Role (permission bundle)
              └── Role Permission (link)
                    └── Permission (capability)
```

---

## 4. Indexes

### 4.1 Critical Indexes

| Table | Index | Purpose |
|-------|-------|---------|
| `bookings` | `(zone_id, starts_at, ends_at, status)` | Availability queries |
| `bookings` | `(tenant_id, org_id)` | Tenant isolation |
| `listings` | `(tenant_id, org_id, slug)` | Unique slug per org |
| `memberships` | `(tenant_id, user_id)` | User org lookup |
| `user_roles` | `(tenant_id, user_id)` | Permission check |

### 4.2 Foreign Key Indexes

All foreign keys have corresponding indexes for join performance.

---

## 5. Enums

### 5.1 Booking Status

```sql
CREATE TYPE booking_status AS ENUM (
  'draft',
  'pending',
  'awaiting_payment',
  'awaiting_approval',
  'confirmed',
  'rejected',
  'cancelled',
  'completed',
  'no_show',
  'refunded',
  'expired'
);
```

### 5.2 Listing Status

```sql
CREATE TYPE listing_status AS ENUM (
  'draft',
  'published',
  'archived',
  'maintenance'
);
```

### 5.3 Permission Scope

```sql
CREATE TYPE permission_scope AS ENUM (
  'user',
  'org',
  'tenant',
  'saas'
);
```

---

## 6. Conventions

### 6.1 Naming Conventions

| Convention | Example |
|------------|---------|
| Table names | `snake_case`, plural |
| Column names | `snake_case` |
| Primary keys | `id` (UUID) |
| Foreign keys | `{entity}_id` |
| Timestamps | `created_at`, `updated_at` |
| Boolean | `is_*`, `has_*` |
| JSON columns | `*_metadata`, `settings`, `payload` |

### 6.2 Standard Columns

All tables include:
- `id` - UUID primary key
- `created_at` - Timestamp with timezone
- `updated_at` - Timestamp with timezone (where applicable)

Tenant-scoped tables include:
- `tenant_id` - UUID foreign key to tenants
- `org_id` - UUID foreign key to organizations (where applicable)

---

*Last updated: December 2024*
