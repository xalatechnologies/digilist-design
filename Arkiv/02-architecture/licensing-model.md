# Licensing Model Architecture

**Date:** 2025-01-27  
**Status:** 📋 Phase 4 - Licensing Alignment  
**Purpose:** Defines the licensing and entitlements system architecture

---

## Purpose

This document defines the complete licensing and entitlements model for the platform, ensuring:
- Multi-SaaS product support
- Subscription-based access control
- Usage limit enforcement
- Requirements traceability
- API and UI integration

---

## Core Concepts

### 1. Platform Domain vs Product Domain

**Platform Domain (SaaS Core):**
- Tenants / Organizations
- Plans / Subscriptions
- Entitlements (license issuance)
- Features (module catalog)
- Usage counters (metered plans)

**Product Domain (Digilist-specific):**
- Listings, zones, bookings
- Approval workflows
- Payment processing
- Calendar, notifications

**Key Rule:** Product domain never invents licensing rules. It only queries:
- "Is module X enabled for tenant Y?"
- "Does tenant have entitlement Z?"

---

## 2. Entitlements vs Feature Flags

### Entitlements (Legal/Contractual Access)

**Characteristics:**
- Tied to paid subscriptions
- Legal/billing implications
- Require audit trails
- Cannot be toggled by ops/devs
- Derived from subscription plans

**Examples:**
- `digilist.booking` module access
- `digilist.approvals` module access
- Monthly booking limits (1000/month)
- Seat limits (50 active users)

### Feature Flags (Behavior Toggles)

**Characteristics:**
- Can be changed instantly
- No billing implications
- UI variations, A/B testing
- Can be toggled by ops/devs

**Examples:**
- New UI design (beta)
- Experimental booking flow
- Gradual feature rollout

---

## 3. Module Keys

### Module Key Format

Module keys follow the pattern: `{product}.{module}`

**Platform Modules:**
- `platform.core` - Core platform functionality
- `platform.auth` - Authentication
- `platform.orgs` - Organizations management
- `platform.reporting` - Platform reporting

**Digilist Product Modules:**
- `digilist.booking` - Booking engine
- `digilist.listings` - Listing management
- `digilist.approvals` - Approval workflow
- `digilist.payments` - Payment processing
- `digilist.calendar` - Calendar integration
- `digilist.notifications` - Notifications
- `digilist.analytics` - Analytics and reporting
- `digilist.integrations` - Third-party integrations

**Future Product Modules:**
- `monitoring.*` - Monitoring product modules
- `property.*` - Property management modules
- `crm.*` - CRM modules

### Module Key Registry

**Location:** `packages/licensing/src/types/index.ts`

```typescript
export const ModuleKeyEnum = {
  // Platform modules
  PLATFORM_CORE: 'platform.core',
  AUTHENTICATION: 'platform.auth',
  ORGANIZATIONS: 'platform.orgs',
  REPORTING: 'platform.reporting',
  
  // Digilist product modules
  BOOKING: 'digilist.booking',
  FACILITIES: 'digilist.listings',
  APPROVALS: 'digilist.approvals',
  PAYMENTS: 'digilist.payments',
  CALENDAR: 'digilist.calendar',
  NOTIFICATIONS: 'digilist.notifications',
  ANALYTICS: 'digilist.analytics',
  INTEGRATIONS: 'digilist.integrations'
} as const;
```

---

## 4. Plan Tiers

### Tier Hierarchy

1. **Free** - Basic functionality, limited usage
2. **Basic** - Core booking features
3. **Standard** - Full booking + approvals + payments
4. **Professional** - Standard + analytics + integrations
5. **Enterprise** - All modules + custom limits + priority support

### Plan → Entitlements Mapping

| Plan Tier | Included Modules | Limits |
|-----------|-----------------|--------|
| **Free** | `platform.core`, `platform.auth`, `platform.orgs` | `digilist.booking`: 10/month |
| **Basic** | Free + `digilist.booking`, `digilist.listings` | `digilist.booking`: 1000/month, `listings`: 10 |
| **Standard** | Basic + `digilist.approvals`, `digilist.payments`, `digilist.calendar`, `digilist.notifications` | `digilist.booking`: unlimited, `users`: 50 |
| **Professional** | Standard + `digilist.analytics`, `digilist.integrations` | `digilist.booking`: unlimited, `users`: 500 |
| **Enterprise** | All modules + `platform.reporting` | Custom limits, unlimited users |

---

## 5. Entitlement Structure

### Entitlement Entity

```typescript
interface Entitlement {
  id: string;
  tenantId: string;
  subscriptionId: string;
  featureId: string;           // Reference to features catalog
  moduleKey: string;            // Denormalized for performance
  status: 'active' | 'suspended' | 'expired' | 'revoked';
  limits: Record<string, number>; // { monthlyBookings: 1000, seats: 50 }
  validFrom: Date;
  validTo: Date | null;         // null = no expiration
  source: 'subscription' | 'manual' | 'trial';
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
```

### Limits Structure

**Limit Types:**
- `monthlyBookings` - Monthly booking count limit (-1 = unlimited)
- `seats` - Active user limit (-1 = unlimited)
- `listings` - Maximum listings (-1 = unlimited)
- `storage` - Storage quota in bytes (-1 = unlimited)
- `apiRequests` - API request quota per month (-1 = unlimited)

**Example Limits:**
```json
{
  "monthlyBookings": 1000,
  "seats": 50,
  "listings": 10,
  "storage": 1073741824  // 1GB
}
```

---

## 6. License Issuance Workflow

### Subscription → Entitlements Flow

```
1. Subscription Created/Updated
   ↓
2. LicenseIssuer.issueEntitlementsForSubscription()
   ↓
3. Get Plan → Determine Included Modules
   ↓
4. Generate Entitlements (one per module)
   ↓
5. Revoke Old Entitlements (if subscription changed)
   ↓
6. Create New Entitlements
   ↓
7. Invalidate Cache
   ↓
8. Publish Events
   ↓
9. Audit Log
```

### Subscription Cancelled/Expired

```
1. Subscription Status → 'cancelled' | 'expired'
   ↓
2. LicenseIssuer.revokeSubscriptionEntitlements()
   ↓
3. Update Entitlement Status → 'expired'
   ↓
4. Invalidate Cache
   ↓
5. Publish Events
   ↓
6. Audit Log
```

---

## 7. Entitlement Evaluation

### Evaluation Flow

```
1. Request: hasModule(tenantId, 'digilist.booking')
   ↓
2. Check Cache (Redis, 5min TTL)
   ↓
3. Cache Miss → Fetch from Repository
   ↓
4. Filter Entitlements by moduleKey
   ↓
5. Check Status (active, validFrom, validTo)
   ↓
6. Return: { entitled: true/false, reason?, limits? }
```

### Usage Limit Check

```
1. Request: checkLimit(tenantId, 'digilist.booking', 'monthlyBookings', 50)
   ↓
2. Get Entitlement
   ↓
3. Get Current Usage (from usage_counters table)
   ↓
4. Compare: currentUsage + requestedAmount <= limit
   ↓
5. Return: { withinLimits: true/false, exceededLimit?, currentUsage? }
```

---

## 8. API Integration

### Route-Level Guards

**Fastify PreHandler:**
```typescript
import { requireModule } from '@xalatechnologies/licensing';

app.register(bookingRoutes, {
  prefix: '/api/bookings',
  preHandler: [
    requireAuth,
    requireModule('digilist.booking')  // ← Entitlement gate
  ]
});
```

**Error Response:**
```json
{
  "error": "ModuleNotEntitled",
  "message": "Tenant does not have access to digilist.booking",
  "moduleKey": "digilist.booking",
  "reason": "module_not_entitled"
}
```

**HTTP Status Codes:**
- `403 Forbidden` - Module not entitled
- `402 Payment Required` - Subscription expired (optional)
- `429 Too Many Requests` - Usage limit exceeded

---

## 9. Domain Integration

### Domain Use-Case Pattern

```typescript
class CreateBookingUseCase {
  constructor(
    private bookingRepo: BookingRepositoryPort,
    private entitlements: EntitlementsPort  // ← Injected
  ) {}
  
  async execute(input: CreateBookingInput): Promise<Booking> {
    // Check module access
    const hasModule = await this.entitlements.hasModule(
      input.tenantId,
      'digilist.booking'
    );
    
    if (!hasModule) {
      throw new ModuleNotEntitledError('digilist.booking');
    }
    
    // Check usage limits
    const monthlyCount = await this.bookingRepo.countThisMonth(input.tenantId);
    const limit = await this.entitlements.getLimit(
      input.tenantId,
      'digilist.booking',
      'monthlyBookings'
    );
    
    if (limit !== -1 && monthlyCount >= limit) {
      throw new LimitExceededError('Monthly booking limit reached');
    }
    
    // Proceed with booking logic...
  }
}
```

---

## 10. UI Integration

### Navigation Filtering

```typescript
function generateNavigation(
  user: User,
  entitlements: Entitlement[],
  featureFlags: FeatureFlag[]
): NavigationItem[] {
  return navigationItems.filter(item => {
    // RBAC check
    if (!hasPermission(user, item.permission)) return false;
    
    // Entitlement check
    if (item.moduleKey && !hasEntitlement(entitlements, item.moduleKey)) {
      return false;
    }
    
    // Feature flag check (optional)
    if (item.featureFlag && !isEnabled(featureFlags, item.featureFlag)) {
      return false;
    }
    
    return true;
  });
}
```

---

## 11. Error Semantics

### Entitlement Errors

| Error Code | HTTP Status | Description |
|------------|-------------|-------------|
| `MODULE_NOT_ENTITLED` | 403 | Tenant lacks access to module |
| `FEATURE_NOT_ENABLED` | 403 | Module entitled but feature disabled |
| `LIMIT_EXCEEDED` | 429 | Usage limit exceeded |
| `SUBSCRIPTION_EXPIRED` | 402 | Subscription expired |
| `SUBSCRIPTION_SUSPENDED` | 402 | Subscription suspended |
| `TENANT_NOT_FOUND` | 404 | Tenant not found |

### Domain Errors

```typescript
class ModuleNotEntitledError extends Error {
  constructor(moduleKey: string) {
    super(`Tenant does not have access to ${moduleKey}`);
    this.name = 'ModuleNotEntitledError';
  }
}

class LimitExceededError extends Error {
  constructor(limitType: string, current: number, limit: number) {
    super(`${limitType} limit exceeded: ${current}/${limit}`);
    this.name = 'LimitExceededError';
  }
}
```

---

## 12. Caching Strategy

### Redis Cache (Optional)

**Cache Key Pattern:**
- `entitlements:tenant:{tenantId}` - Tenant entitlements (5min TTL)

**Cache Invalidation:**
- On subscription create/update/cancel
- On entitlement create/update/revoke
- Manual invalidation via API

**Cache Structure:**
```json
{
  "tenantId": "tenant-oslo-kommune",
  "entitlements": [
    {
      "moduleKey": "digilist.booking",
      "status": "active",
      "limits": { "monthlyBookings": 1000 }
    }
  ],
  "cachedAt": "2025-01-27T10:00:00Z"
}
```

---

## 13. Audit Trail

### Entitlement Events

**Event Types:**
- `entitlement.issued` - Entitlement created
- `entitlement.revoked` - Entitlement revoked
- `entitlement.expired` - Entitlement expired
- `entitlement.check` - Entitlement check (success/failure)
- `limit.exceeded` - Usage limit exceeded

**Audit Log Fields:**
- `tenantId` - Tenant identifier
- `subscriptionId` - Subscription identifier (if applicable)
- `entitlementId` - Entitlement identifier (if applicable)
- `moduleKey` - Module key
- `action` - Action performed
- `result` - Success/failure
- `reason` - Denial reason (if failed)
- `metadata` - Additional context
- `timestamp` - Event timestamp

---

## 14. Requirements Traceability

### Platform Licensing Requirements

| Requirement ID | Requirement | Implementation | Status |
|----------------|-------------|----------------|--------|
| **PLATFORM-LIC-001** | Subscription tier model | `plans` table, `PlanTierEnum` | ✅ Schema Created |
| **PLATFORM-LIC-002** | Entitlement issuance | `LicenseIssuer.issueEntitlementsForSubscription()` | ✅ Service Exists |
| **PLATFORM-LIC-003** | Module keys | `ModuleKeyEnum`, `features` table | ✅ Defined |
| **PLATFORM-LIC-004** | Usage limits | `usage_counters` table, `EntitlementEvaluator.checkLimit()` | ✅ Implemented |

### API Integration Requirements

| Requirement ID | Requirement | Implementation | Status |
|----------------|-------------|----------------|--------|
| **SRSD-AUTH-002.4** | API permission checks | `requireModule()` guard | ✅ Implemented |
| **SRSD-AUTH-003.3** | API tenant validation | Tenant context + entitlement check | ✅ Implemented |

---

## 15. Package Structure

### `@xalatechnologies/licensing` Package

```
packages/licensing/
├── src/
│   ├── types/
│   │   └── index.ts              # Plan, Subscription, Entitlement types, ModuleKeyEnum
│   ├── ports/
│   │   └── index.ts              # Repository ports, Cache port, Event port
│   ├── services/
│   │   ├── LicenseIssuer.ts     # Issue entitlements from subscriptions ✅
│   │   └── EntitlementEvaluator.ts  # Evaluate entitlements ✅
│   ├── utils/
│   │   └── api-guards.ts        # Fastify guards (requireModule, etc.) ✅
│   └── index.ts                 # Public exports
```

### Data Package Adapters

```
packages/data/src/platform/
├── schema/
│   └── licensing.ts             # Plans, subscriptions, entitlements, features ✅
└── repositories/
    ├── PlanRepository.ts        # Implements PlanRepositoryPort (TO CREATE)
    ├── SubscriptionRepository.ts # Implements SubscriptionRepositoryPort (TO CREATE)
    ├── EntitlementRepository.ts # Implements EntitlementRepositoryPort (TO CREATE)
    └── FeatureRepository.ts     # Implements FeatureRepositoryPort (TO CREATE)
```

---

## 16. Implementation Status

### Completed ✅

- ✅ Licensing schema created (`packages/data/src/platform/schema/licensing.ts`)
- ✅ Licensing package exists (`packages/licensing`)
- ✅ LicenseIssuer service implemented
- ✅ EntitlementEvaluator service implemented
- ✅ API guards implemented (`requireModule`, etc.)
- ✅ Module keys defined (`ModuleKeyEnum`)
- ✅ Plan-to-entitlements mapping defined

### Needs Update ⚠️

- ⚠️ LicenseIssuer needs update for new schema structure
  - Current: Uses old entitlement structure
  - Needed: Use new `features` table, `featureId` reference
- ⚠️ EntitlementEvaluator needs update for new schema
  - Current: Uses old entitlement structure
  - Needed: Use new `features` table, `validFrom`/`validTo` dates
- ⚠️ Repository adapters need creation
  - `PlanRepository` - Implements `PlanRepositoryPort`
  - `SubscriptionRepository` - Implements `SubscriptionRepositoryPort`
  - `EntitlementRepository` - Implements `EntitlementRepositoryPort`
  - `FeatureRepository` - Implements `FeatureRepositoryPort`

### Missing ❌

- ❌ Features catalog seeding (initial features)
- ❌ Usage counter tracking implementation
- ❌ API route integration (guards wired to routes)
- ❌ UI navigation integration (entitlement filtering)

---

## 17. Next Steps

### Immediate Actions

1. **Update LicenseIssuer for New Schema**
   - Use `features` table for module catalog
   - Use `featureId` reference in entitlements
   - Use `validFrom`/`validTo` dates from subscriptions

2. **Update EntitlementEvaluator for New Schema**
   - Query `features` table for module validation
   - Use `validFrom`/`validTo` for validity checks
   - Support `usage_counters` table for limit checks

3. **Create Repository Adapters**
   - Implement all repository ports
   - Use new schema tables
   - Add proper error handling

4. **Seed Features Catalog**
   - Create initial features in `features` table
   - Map module keys to features
   - Document feature dependencies

---

## 18. Related Documentation

- [Licensing Runbook](../07-runbooks/licensing.md) - Operational guide
- [Requirements Index](../08-reports/REQUIREMENTS_INDEX.md) - Requirements list
- [Requirements-to-Schema Matrix](../08-reports/REQUIREMENTS_SCHEMA_MATRIX.md) - Schema mapping
- [Schema Changelog](../08-reports/SCHEMA_CHANGELOG.md) - Schema changes
- [Data Model Architecture](./data-model.md) - Data model documentation

---

*Last Updated: 2025-01-27*
