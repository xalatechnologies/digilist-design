# Seed Data Documentation

**Version:** 1.0.0  
**Last Updated:** 2026-01-04  
**Purpose:** Test data generation for development and testing

## Overview

The Digilist platform provides comprehensive seed data for creating realistic test environments. Seed data follows SOLID principles with modular, composable functions.

**Location:** `packages/data/src/seeds/`

**Architecture:**
- **Platform Seeds**: Identity, RBAC, licensing
- **Product Seeds**: Listings, bookings, payments
- **Domain Seeds**: Availability, notifications, compliance, integrations

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Platform Seed Data](#platform-seed-data)
3. [Product Seed Data (Digilist)](#product-seed-data-digilist)
4. [Domain Seed Data](#domain-seed-data)
5. [Seed Constants](#seed-constants)
6. [Usage Examples](#usage-examples)
7. [Test Scenarios](#test-scenarios)

---

## Quick Start

### Seed Minimal Data

```typescript
import { seedMinimalData } from '@xalatechnologies/data/seeds';
import { db } from '@xalatechnologies/data';

const result = await seedMinimalData(db);

console.log(`Created:
  - ${result.tenants.length} tenants
  - ${result.organizations.length} organizations
  - ${result.users.length} users
  - ${result.listings.length} listings
  - ${result.bookings.length} bookings
`);
```

### Reset and Reseed

```typescript
import { resetAndSeedMinimalData } from '@xalatechnologies/data/seeds';

// Clear all data and reseed
const result = await resetAndSeedMinimalData(db);
```

### Get Seed Statistics

```typescript
import { getSeedStats } from '@xalatechnologies/data/seeds';

const stats = await getSeedStats(db);
console.log(stats);
// { tenants: 2, organizations: 4, users: 6, listings: 4, zones: 8, bookings: 6 }
```

---

## Platform Seed Data

### Tenants (Municipalities)

**File:** `platform/seeds/tenants.ts`

**Creates:** 2 tenants

| ID | Name | Slug | Domain | Status |
|----|------|------|--------|--------|
| `tenant-oslo-kommune` | Oslo Kommune | oslo-kommune | oslo.digilist.no | active |
| `tenant-bergen-kommune` | Bergen Kommune | bergen-kommune | bergen.digilist.no | active |

**Settings:**
```typescript
{
  locale: 'nb',
  timezone: 'Europe/Oslo',
  currency: 'NOK',
  defaultBookingRules: {
    minDuration: 30-60,
    maxDuration: 180-240,
    advanceBookingDays: 60-90,
    cancellationHours: 24-48
  },
  integrations: {
    idporten: { enabled: true },
    vipps: { enabled: true/false }
  }
}
```

**Usage:**
```typescript
import { seedTenants, clearTenants } from '@xalatechnologies/data/platform/seeds';

const tenants = await seedTenants(db);
// Returns: Array of 2 tenant records
```

---

### Organizations

**File:** `platform/seeds/organizations.ts`

**Creates:** 4 organizations (2 per tenant)

| ID | Tenant | Name | Type |
|----|--------|------|------|
| `org-oslo-idrett` | Oslo | Oslo Idrett og Fritid | Sports department |
| `org-oslo-skoler` | Oslo | Oslo Skoler | Schools |
| `org-bergen-idrett` | Bergen | Bergen Idrettsavdeling | Sports department |
| `org-bergen-kultur` | Bergen | Bergen Kultur | Culture department |

**Settings:**
```typescript
{
  bookingDefaults: {
    approvalRequired: boolean,
    showPublicCalendar: boolean,
    minDuration: number,
    maxDuration: number
  },
  contact: {
    email: string,
    phone: string,
    address: string
  }
}
```

---

### Users

**File:** `platform/seeds/users.ts`

**Creates:** 6 users with different roles

| ID | Email | Name | Role | Tenant |
|----|-------|------|------|--------|
| `user-super-admin` | superadmin@digilist.no | Super Admin | Platform Admin | - |
| `user-oslo-admin` | admin@oslo.kommune.no | Oslo Admin | Tenant Admin | Oslo |
| `user-bergen-admin` | admin@bergen.kommune.no | Bergen Admin | Tenant Admin | Bergen |
| `user-oslo-case-handler` | saksbehandler@oslo.kommune.no | Saksbehandler | Case Handler | Oslo |
| `user-private-citizen` | borger@eksempel.no | Ola Nordmann | Citizen | Oslo |
| `user-sports-club` | leder@idrettslag.no | Kari Sportslig | Sports Club | Oslo |

**User Profiles:**
- Language: Norwegian Bokmål (nb)
- Timezone: Europe/Oslo
- Email verified: true
- Status: active

---

### Plans (Subscription Tiers)

**File:** `platform/seeds/plans.ts`

**Creates:** 2 plans

#### Basic Plan
- **ID:** `plan-basic`
- **Price:** 50,000 NOK/month
- **Modules:** 
  - `digilist.booking`
  - `digilist.listings`
  - `backoffice.access`
- **Limits:**
  - Monthly bookings: 1,000
  - Listings: 10
  - Seats: 50

#### Pro Plan
- **ID:** `plan-pro`
- **Price:** 150,000 NOK/month
- **Modules:**
  - All Digilist modules
  - Advanced analytics
  - Integrations
  - Priority support
- **Limits:**
  - Monthly bookings: 10,000
  - Listings: 100
  - Transactions: 5,000/month
  - Seats: 500

---

### Subscriptions

**File:** `platform/seeds/subscriptions.ts`

**Creates:** 2 active subscriptions

| Tenant | Plan | Status | Trial |
|--------|------|--------|-------|
| Oslo | Basic | active | No |
| Bergen | Pro | active | No |

---

### Entitlements

**File:** `platform/seeds/entitlements.ts`

**Creates:** Module entitlements per subscription

**Oslo (Basic):**
- `digilist.booking` - Active
- `digilist.listings` - Active
- `backoffice.access` - Active

**Bergen (Pro):**
- All Digilist modules - Active
- Advanced features enabled

---

### Roles & Permissions

**File:** `platform/seeds/roles.ts`

**Creates:** System and tenant-specific roles

#### System Roles
- **Super Administrator** (scope: saas)
  - Full platform access
  - Permission: `*`

#### Tenant Roles
- **Tenant Administrator** (scope: tenant)
  - Permissions: `tenant.org.*`, `tenant.user.manage`, `tenant.billing.view`

#### Organization Roles
- **Organization Administrator** (scope: org)
  - Permissions: `org.listing.*`, `org.booking.*`, `org.user.invite`

- **Case Handler** (scope: org)
  - Permissions: `org.booking.approve`, `org.booking.view`, `org.booking.update`

- **Listing Manager** (scope: org)
  - Permissions: `org.listing.*`, `org.booking.view`

- **End User** (scope: user)
  - Permissions: `user.booking.create`, `user.booking.view`, `user.profile.update`

**User Role Assignments:**
```typescript
{
  'user-super-admin': ['Super Administrator'],
  'user-oslo-admin': ['Tenant Administrator'],
  'user-oslo-case-handler': ['Case Handler'],
  'user-private-citizen': ['End User'],
  'user-sports-club': ['End User']
}
```

---

## Product Seed Data (Digilist)

### Actor Types (Pricing Tiers)

**File:** `products/digilist/seeds/actor-types.ts`

**Creates:** 6 actor types (3 per tenant)

#### Oslo Actor Types
| Code | Name | Discount | Verification Required |
|------|------|----------|----------------------|
| `private` | Privatperson | 0% | No |
| `sports_club` | Idrettslag | 30% | Yes |
| `school` | Skole | 100% (free) | Yes |

#### Bergen Actor Types
| Code | Name | Discount | Verification Required |
|------|------|----------|----------------------|
| `private` | Privatperson | 0% | No |
| `sports_club` | Idrettslag | 25% | Yes |
| `municipality` | Kommunal enhet | 100% (free) | Yes |

---

### Listings

**File:** `products/digilist/seeds/listings.ts`

**Creates:** 4 listings (2 per tenant)

#### Oslo Listings

**Oslo Idrettshall**
- **ID:** `listing-oslo-idrettshall`
- **Type:** Sports hall
- **Address:** Idrettens vei 1, 0001 Oslo
- **Capacity:** 500 people
- **Area:** 2,000 m²
- **Opening Hours:**
  - Weekdays: 06:00-23:00
  - Weekends: 08:00-22:00
- **Amenities:** Parking, showers, changing rooms, equipment rental
- **Booking Rules:**
  - Min duration: 60 min
  - Max duration: 240 min
  - Advance booking: 90 days

**Oslo Skolesport**
- **ID:** `listing-oslo-skole`
- **Type:** School gym
- **Address:** Skoleveien 10, 0002 Oslo
- **Capacity:** 100 people
- **Area:** 800 m²
- **Opening Hours:**
  - Weekdays: 15:00-22:00 (after school)
  - Weekends: 09:00-18:00
- **Amenities:** Parking, showers
- **Booking Rules:**
  - Min duration: 30 min
  - Max duration: 180 min
  - Advance booking: 30 days

#### Bergen Listings

**Bergen Idrettspark**
- **ID:** `listing-bergen-idrettspark`
- **Type:** Sports complex
- **Address:** Idrettsplassen 5, 5003 Bergen
- **Capacity:** 300 people
- **Area:** 1,500 m²
- **Amenities:** Parking, showers, changing rooms, café

**Bergen Kulturhus**
- **ID:** `listing-bergen-kulturhus`
- **Type:** Cultural center
- **Address:** Kulturalléen 2, 5015 Bergen
- **Capacity:** 150 people
- **Area:** 600 m²
- **Amenities:** Parking, projector, sound system, kitchen

---

### Zones

**File:** `products/digilist/seeds/zones.ts`

**Creates:** 8 zones (2 per listing)

#### Oslo Idrettshall Zones
- **Hall A** - 250 capacity, 1,000 m², 15,000 NOK/hour
- **Hall B** - 250 capacity, 1,000 m², 15,000 NOK/hour

#### Oslo Skolesport Zones
- **Gymsal 1** - 50 capacity, 400 m², 8,000 NOK/hour
- **Gymsal 2** - 50 capacity, 400 m², 8,000 NOK/hour

#### Bergen Idrettspark Zones
- **Fotballbane 1** - 150 capacity, 750 m², 20,000 NOK/hour
- **Fotballbane 2** - 150 capacity, 750 m², 20,000 NOK/hour

#### Bergen Kulturhus Zones
- **Møterom Stort** - 100 capacity, 400 m², 12,000 NOK/hour
- **Møterom Lite** - 50 capacity, 200 m², 8,000 NOK/hour

**Zone Features:**
- Activity types: Football, handball, basketball, meetings
- Amenities: Equipment, lighting, climate control
- Color-coded for calendar display

---

### Pricing Rules

**File:** `products/digilist/seeds/pricing-rules.ts`

**Creates:** Dynamic pricing rules

**Examples:**
- **Peak Hours** (18:00-22:00): +2,000 NOK premium
- **Weekend Premium**: +3,000 NOK on Sat/Sun
- **Off-Peak Discount** (09:00-15:00): -20%
- **Member Discount**: -30% for sports clubs
- **Early Bird**: -15% for bookings 30+ days in advance

---

### Booking Rules

**File:** `products/digilist/seeds/booking-rules.ts`

**Creates:** Listing-specific booking rules

**Rule Types:**
- **Booking Terms** (leievilkår)
- **Safety Rules** (brannrutiner, HMS)
- **Cancellation Policy**
- **Equipment Usage**
- **Access Instructions**

**Example Rule:**
```typescript
{
  type: 'booking',
  title: 'Generelle leievilkår',
  body: 'Leietaker er ansvarlig for...',
  isRequired: true,
  requiresAcceptance: true,
  version: 1
}
```

---

### Bookings

**File:** `products/digilist/seeds/bookings.ts`

**Creates:** 6 bookings with various statuses

| ID | Listing | Zone | Status | User | Date | Price |
|----|----------|------|--------|------|------|-------|
| `booking-confirmed-1` | Oslo Hall | Hall A | confirmed | Private Citizen | Tomorrow | 45,000 NOK |
| `booking-pending-1` | Oslo Hall | Hall B | pending | Sports Club | +3 days | 31,500 NOK |
| `booking-completed-1` | Bergen Park | Field 1 | completed | Sports Club | Yesterday | 60,000 NOK |
| `booking-cancelled-1` | Bergen Kultur | Room 1 | cancelled | Private Citizen | +5 days | 36,000 NOK |
| `booking-future-1` | Oslo School | Gym 1 | confirmed | School | +7 days | 0 NOK |
| `booking-high-value-1` | Bergen Park | Field 2 | awaiting_approval | Private Citizen | +10 days | 80,000 NOK |

**Booking Features:**
- Price breakdown with discounts
- Actor type pricing applied
- Approval workflow for high-value bookings
- Status history tracking
- Terms acceptance records

---

### Booking Approvals

**File:** `products/digilist/seeds/approvals.ts`

**Creates:** Approval records for pending bookings

**Approval Workflow:**
1. Booking created with `status: 'pending'`
2. Approval record created with `status: 'pending'`
3. Case handler reviews
4. Approval granted/rejected
5. Booking status updated to `confirmed` or `rejected`

---

## Domain Seed Data

### Payments

**File:** `products/digilist/seeds/payments.ts`

**Creates:**
- 4 payment methods (Vipps, Nets, Stripe, Invoice)
- 6 payment transactions
- 4 invoices
- 2 refunds

**Payment Methods:**
```typescript
{
  provider: 'vipps',
  name: 'Vipps',
  isActive: true,
  isDefault: true,
  config: { merchantSerialNumber: '123456' }
}
```

**Payment Transactions:**
- Completed payments with receipts
- Failed payment attempts
- Refunded payments
- Pending payments

**Invoices:**
- Draft invoices
- Sent invoices with due dates
- Paid invoices with receipts
- Overdue invoices

---

### Availability

**File:** `products/digilist/seeds/availability.ts`

**Creates:**
- 28 availability rules (weekly hours for all zones)
- 8 blackouts (maintenance, holidays)
- 12 special dates (Norwegian holidays)

**Availability Rules:**
```typescript
{
  dayOfWeek: 1, // Monday
  openTime: '06:00',
  closeTime: '23:00',
  slotDurationMinutes: 60
}
```

**Blackouts:**
- Christmas closure (Dec 24-26)
- New Year closure (Dec 31 - Jan 1)
- Easter closure
- Summer maintenance (2 weeks in July)
- Emergency closures

**Special Dates:**
- Norwegian Constitution Day (May 17)
- Christmas Eve, Christmas Day
- New Year's Eve, New Year's Day
- Easter holidays
- Ascension Day, Whit Monday

---

### Notifications

**File:** `products/digilist/seeds/notifications.ts`

**Creates:**
- 6 notification templates
- 12 notifications (sent to users)
- 18 delivery records (email, SMS, push)

**Templates:**
- Booking confirmation
- Booking approval
- Booking rejection
- Payment receipt
- Booking reminder (24h before)
- Booking cancellation

**Notification Channels:**
- Email (primary)
- SMS (high priority)
- Push notifications (mobile app)

---

### Compliance

**File:** `platform/seeds/compliance.ts`

**Creates:**
- 20 audit logs
- 6 consent records
- 2 data subject requests (GDPR)

**Audit Logs:**
- User login/logout
- Booking creation/update/deletion
- Payment transactions
- Admin actions
- Data exports

**Consent Records:**
- Terms acceptance
- Privacy policy acceptance
- Marketing consent
- Data processing consent

**Data Subject Requests:**
- Right to access (export data)
- Right to erasure (delete/anonymize)

---

### Integrations

**File:** `platform/seeds/integrations.ts`

**Creates:**
- 5 integration configs
- 8 webhook endpoints

**Integration Configs:**
- **Vipps** (Oslo) - Payment provider
- **Nets** (Oslo) - Payment provider
- **Visma** (Bergen) - Accounting integration
- **RCO** (Oslo) - Access control system
- **Acos WebSak** (Bergen) - Archive system

**Webhook Endpoints:**
- Vipps payment callbacks
- Nets payment callbacks
- Stripe webhooks
- Calendar sync webhooks

---

## Seed Constants

**File:** `seeds/constants.ts`

All seed data uses deterministic, stable IDs for test assertions.

### Tenant Keys
```typescript
TENANT_OSLO = 'tenant-oslo-kommune'
TENANT_BERGEN = 'tenant-bergen-kommune'
```

### User Keys & Emails
```typescript
USER_SUPER_ADMIN = 'user-super-admin'
EMAIL_SUPER_ADMIN = 'superadmin@digilist.no'

USER_OSLO_ADMIN = 'user-oslo-admin'
EMAIL_OSLO_ADMIN = 'admin@oslo.kommune.no'
```

### Listing Keys
```typescript
FACILITY_OSLO_IDRETTSHALL = 'listing-oslo-idrettshall'
ZONE_OSLO_HALL_A = 'zone-oslo-hall-a'
```

### Module Keys
```typescript
MODULE_DIGILIST_BOOKING = 'digilist.booking'
MODULE_DIGILIST_FACILITIES = 'digilist.listings'
MODULE_DIGILIST_APPROVALS = 'digilist.approvals'
MODULE_DIGILIST_PAYMENTS = 'digilist.payments'
```

**Usage:**
```typescript
import { TENANT_OSLO, USER_OSLO_ADMIN } from '@xalatechnologies/data/seeds/constants';

// Use in tests
expect(booking.tenantId).toBe(TENANT_OSLO);
expect(booking.createdByUserId).toBe(USER_OSLO_ADMIN);
```

---

## Usage Examples

### Seed Minimal Data
```typescript
import { seedMinimalData } from '@xalatechnologies/data/seeds';
import { db } from '@xalatechnologies/data';

const result = await seedMinimalData(db);

// Access seeded data
const osloTenant = result.tenants.find(t => t.slug === 'oslo-kommune');
const adminUser = result.users.find(u => u.email === 'admin@oslo.kommune.no');
const listing = result.listings[0];
```

### Seed Specific Domain
```typescript
import { seedPaymentData } from '@xalatechnologies/data/products/digilist/seeds';

const platformData = await seedMinimalPlatformData(db);
const digilistData = await seedMinimalDigilistData(db, platformData);

const paymentData = await seedPaymentData(db, platformData, digilistData);
// Returns: { paymentMethods, payments, invoices, refunds }
```

### Clear Specific Data
```typescript
import { clearListings, clearBookings } from '@xalatechnologies/data/products/digilist/seeds';

await clearBookings(db);
await clearListings(db);
```

---

## Test Scenarios

### Approval Workflow Testing
```typescript
import { seedApprovalTestData } from '@xalatechnologies/data/seeds';

const data = await seedApprovalTestData(db);
// Creates additional high-value bookings requiring approval
```

### Pricing Rule Testing
```typescript
import { seedPricingTestData } from '@xalatechnologies/data/seeds';

const data = await seedPricingTestData(db);
// Creates additional pricing rules for edge cases
```

### Custom Scenario
```typescript
import { seedMinimalPlatformData } from '@xalatechnologies/data/platform/seeds';
import { seedListings, seedZones, seedBookings } from '@xalatechnologies/data/products/digilist/seeds';

// Seed only what you need
const platformData = await seedMinimalPlatformData(db);
const listings = await seedListings(db, platformData);
const zones = await seedZones(db, { ...platformData, listings });
const bookings = await seedBookings(db, { ...platformData, listings, zones });
```

---

## Seed Data Summary

### Minimal Seed Data Creates:

**Platform:**
- 2 tenants (Oslo, Bergen)
- 4 organizations (2 per tenant)
- 6 users (1 super admin, 2 tenant admins, 1 case handler, 2 citizens)
- 2 plans (Basic, Pro)
- 2 subscriptions (1 per tenant)
- 6+ entitlements
- 5 system roles + tenant-specific roles
- 20+ permissions
- 10+ user-role assignments

**Product (Digilist):**
- 4 listings (2 per tenant)
- 8 zones (2 per listing)
- 6 actor types (3 per tenant)
- 10+ pricing rules
- 8+ booking rules
- 6 bookings (various statuses)
- 4+ booking approvals

**Domains:**
- 4 payment methods
- 6 payment transactions
- 4 invoices
- 28 availability rules
- 8 blackouts
- 12 special dates
- 6 notification templates
- 12 notifications
- 20 audit logs
- 5 integration configs

**Total Records:** ~200+ records across all tables

---

## Best Practices

### 1. Use Constants
Always use seed constants for stable test assertions:
```typescript
import { TENANT_OSLO, FACILITY_OSLO_IDRETTSHALL } from '@xalatechnologies/data/seeds/constants';
```

### 2. Modular Seeding
Seed only what you need for your test:
```typescript
// Don't seed everything if you only need listings
const platformData = await seedMinimalPlatformData(db);
const listings = await seedListings(db, platformData);
```

### 3. Clean Up After Tests
```typescript
afterEach(async () => {
  await clearAllData(db);
});
```

### 4. Deterministic Data
All seed data is deterministic - same IDs, emails, dates every time.

### 5. Realistic Data
Seed data reflects real Norwegian municipalities and use cases.

---

## Maintenance

### Adding New Seed Data

1. **Create seed file** in appropriate directory:
   - Platform: `platform/seeds/`
   - Product: `products/digilist/seeds/`

2. **Follow SOLID principles**:
   - Single Responsibility: One entity type per file
   - Dependency Inversion: Accept dependencies via parameters

3. **Add constants** to `seeds/constants.ts`

4. **Export from index** file

5. **Update minimal seed** if needed

### Updating Existing Seeds

1. **Maintain backward compatibility**
2. **Update version numbers** if schema changes
3. **Add migration notes** in comments
4. **Test with existing tests**

---

**Last Updated:** 2026-01-04  
**Seed Version:** 1.0.0  
**Maintainer:** Digilist Platform Team
