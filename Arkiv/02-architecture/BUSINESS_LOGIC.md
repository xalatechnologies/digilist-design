---
source: docs/knowledge_base/requirements/BUSINESS_LOGIC.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.250Z
---

---
source: docs/knowledge_base/requirements/BUSINESS_LOGIC.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.200Z
---

---
source: digilist/docs/architecture/BUSINESS_LOGIC.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.168Z
---

# Business Logic Services

> **Version**: 1.0\
> **Last Updated**: 2025-12-21\
> **Package**: `@xalatechnologies/domain` (business logic)  
> **Note**: Business logic services are organized by domain in `packages/domain/{domain}/services/`

This document describes the business logic services implemented in the core package. These services are framework-agnostic and can be used across web, API, and mobile applications.

---

## Overview

The business logic layer provides reusable, testable functions for:

1. **Booking Workflow** - State machine, approvals, pricing, refunds, conflicts
2. **Event Booking** - Tournaments, concerts, conferences with special requirements
3. **Payment Processing** - Validation, calculations, refund policies
4. **Notification Management** - Filtering, prioritization, grouping
5. **Cart Operations** - Totals, discounts, VAT calculations
6. **Reporting & Analytics** - Revenue, booking, utilization reports

---

## 1. Booking Workflow Service

**File**: `packages/core/src/services/booking-workflow.ts`

### State Machine

Bookings follow a strict state machine with 11 possible states:

```
                           ┌─────────────┐
                           │   draft     │
                           └──────┬──────┘
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
          ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ pending_payment │     │ pending_approval│     │    cancelled    │
└────────┬────────┘     └────────┬────────┘     └─────────────────┘
         │                       │
         │         ┌─────────────┴─────────────┐
         │         │                           │
         ▼         ▼                           ▼
┌─────────────────┐              ┌─────────────────┐
│    confirmed    │              │    rejected     │
└────────┬────────┘              └─────────────────┘
         │
         ├───────────────────────┐
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│   in_progress   │     │     no_show     │
└────────┬────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐
│    completed    │
└─────────────────┘
```

#### Terminal States

- `completed` - Booking finished successfully
- `cancelled` - Cancelled by user or admin
- `rejected` - Declined by approval workflow
- `expired` - Payment or confirmation timeout
- `no_show` - User did not attend

#### Usage

```typescript
import {
  isValidTransition,
  getAvailableTransitions,
  transitionBookingStatus,
} from '@xalatechnologies/domain';

// Check if transition is valid
if (isValidTransition('draft', 'pending_payment')) {
  const result = transitionBookingStatus(
    'draft',
    'pending_payment',
    userId,
    'Payment initiated'
  );

  if (result.success) {
    console.log('New status:', result.newStatus);
    // Persist result.auditLog for compliance
  }
}
```

---

### Approval Workflow

Certain bookings require manual approval based on configurable rules.

#### Approval Triggers

| Condition          | Threshold     | Escalation Level |
| ------------------ | ------------- | ---------------- |
| High value         | > 5000 NOK    | manager          |
| Large group        | > 100 people  | manager          |
| Recurring booking  | Any           | manager          |
| External org       | business type | manager          |
| After hours        | 22:00-06:00   | manager          |
| Tournament/Event   | Any           | admin            |
| First-time user    | Any           | auto-approve     |

#### Usage

```typescript
import {
  checkApprovalRequired,
  type BookingApprovalContext,
} from '@xalatechnologies/domain';

const context: BookingApprovalContext = {
  totalAmountCents: 600000, // 6000 NOK
  attendeeCount: 150,
  isRecurring: true,
  isFirstTimeUser: false,
  actorType: 'business',
  activityType: 'conference',
  startHour: 14,
};

const result = checkApprovalRequired(context);
// result.requiresApproval: true
// result.reasons: ['high_value', 'large_group', 'recurring', 'external_org']
// result.escalationLevel: 'manager'
```

---

### Pricing Tiers

Dynamic pricing based on organization type, activity, and timing.

#### Default Tiers

| Tier ID         | Name              | Discount/Surcharge | Priority |
| --------------- | ----------------- | ------------------ | -------- |
| youth_sports    | Ungdomsidrett     | 50% discount       | 100      |
| municipal       | Kommunale enheter | 100% discount      | 90       |
| umbrella_org    | Paraplyorg        | 40% discount       | 85       |
| cultural        | Kulturorg         | 30% discount       | 80       |
| school          | Skoler            | 25% discount       | 75       |
| business_premium| Næringsliv        | 25% surcharge      | 70       |
| weekend         | Helg              | 15% surcharge      | 60       |
| off_peak        | Lavtrafikk        | 20% discount       | 50       |
| early_bird      | Tidlig booking    | 10% discount       | 40       |

#### Usage

```typescript
import {
  calculatePricingWithTiers,
  type PricingContext,
} from '@xalatechnologies/domain';

const context: PricingContext = {
  actorType: 'sports_club',
  activityType: 'sports_training',
  durationMinutes: 60,
  advanceDays: 7,
  dayOfWeek: 2, // Tuesday
  startTime: '18:00',
  attendees: 20,
};

const result = calculatePricingWithTiers(100000, context); // 1000 NOK base
// result.discountAmountCents: 50000 (50%)
// result.finalAmountCents: 50000
// result.appliedTiers: [{ tierId: 'youth_sports', ... }]
```

---

### Refund Policies

Norwegian-compliant refund tiers based on cancellation timing.

| Hours Before Start | Refund % | Cancellation Fee |
| ------------------ | -------- | ---------------- |
| > 168 (7 days)     | 100%     | 0 NOK            |
| 72-168 (3-7 days)  | 75%      | 50 NOK           |
| 24-72 (1-3 days)   | 50%      | 100 NOK          |
| < 24 hours         | 0%       | N/A              |

#### Usage

```typescript
import { calculateRefund } from '@xalatechnologies/domain';

const bookingStart = new Date('2025-01-15T10:00:00Z');
const cancellationTime = new Date('2025-01-10T10:00:00Z'); // 5 days before

const result = calculateRefund(100000, bookingStart, cancellationTime);
// result.refundPercent: 75
// result.cancellationFeeCents: 5000
// result.refundAmountCents: 70000
// result.isRefundable: true
```

---

### Conflict Detection

Detects time overlaps including buffer zones for setup/cleanup.

#### Usage

```typescript
import {
  checkTimeOverlap,
  findAlternativeSlots,
} from '@xalatechnologies/domain';

const slot1 = {
  startTime: new Date('2025-01-15T10:00:00Z'),
  endTime: new Date('2025-01-15T11:00:00Z'),
};

const slot2 = {
  startTime: new Date('2025-01-15T10:30:00Z'),
  endTime: new Date('2025-01-15T11:30:00Z'),
};

const result = checkTimeOverlap(slot1, slot2);
// result.overlaps: true
// result.overlapType: 'partial_start'
// result.overlapMinutes: 30

// With buffer zones
const resultWithBuffer = checkTimeOverlap(slot1, slot2, {
  bufferBeforeMinutes: 15,
  bufferAfterMinutes: 15,
});
```

---

### Booking Add-Ons

Services and equipment that can be added to regular bookings.

#### Available Services

| Type              | Name               | Price (NOK/unit) |
| ----------------- | ------------------ | ---------------- |
| setup_assistance  | Rigging/opprigg    | 300/hour         |
| cleanup           | Rydding            | 250/hour         |
| security          | Sikkerhetsvakt     | 500/hour         |
| first_aid         | Førstehjelpsvakt   | 400/hour         |
| reception         | Resepsjonist       | 350/hour         |
| catering          | Catering           | 150/person       |
| parking           | Parkering          | 50/person        |
| technical_support | Teknisk bistand    | 600/hour         |

#### Available Equipment

| Type             | Name           | Price (NOK/unit) |
| ---------------- | -------------- | ---------------- |
| chairs           | Stoler         | 20/item          |
| tables           | Bord           | 50/item          |
| projector        | Projektor      | 500/booking      |
| screen           | Lerret         | 200/booking      |
| whiteboard       | Whiteboard     | 100/booking      |
| microphone       | Mikrofon       | 150/booking      |
| speakers         | Høyttalere     | 300/booking      |
| sports_equipment | Sportsutstyr   | varies           |
| meeting_supplies | Møtemateriell  | 30/person        |

---

### Listing Status Management

Listings can transition between operational states.

```
┌──────────────┐
│   active     │◄──────────────────────────────┐
└──────┬───────┘                               │
       │                                       │
       ├────────────────┬─────────────────┐    │
       │                │                 │    │
       ▼                ▼                 ▼    │
┌──────────────┐ ┌──────────────┐ ┌────────────┴─┐
│ maintenance  │ │    closed    │ │   planned    │
└──────────────┘ └──────────────┘ └──────────────┘
       │                │
       │                ▼
       │         ┌──────────────┐
       │         │decommissioned│ (terminal)
       │         └──────────────┘
       │
       └──────────────────────────────────────►
```

When a listing status changes:
- **maintenance**: Notify affected bookings
- **closed**: Cancel and refund affected bookings
- **decommissioned**: Cancel all future bookings

---

## 2. Event Booking Service

**File**: `packages/core/src/services/event-booking.ts`

For large-scale events (tournaments, concerts, conferences) with special requirements.

### Event Types

| Type            | Description           |
| --------------- | --------------------- |
| tournament      | Sports tournament     |
| match           | Single competitive match |
| competition     | Other competition     |
| concert         | Music concert         |
| theater         | Theater/drama         |
| exhibition      | Art/trade exhibition  |
| conference      | Business conference   |
| seminar         | Educational seminar   |
| workshop        | Hands-on workshop     |
| festival        | Multi-day festival    |
| private_party   | Private celebration   |
| corporate_event | Company event         |
| community_event | Community gathering   |
| charity_event   | Charity/fundraiser    |

### Event Scale

| Scale  | Attendees   |
| ------ | ----------- |
| small  | < 50        |
| medium | 50-200      |
| large  | 200-500     |
| major  | 500-2000    |
| mega   | > 2000      |

### Event Pricing

```typescript
import {
  calculateEventPricing,
  DEFAULT_EVENT_PRICING,
} from '@xalatechnologies/domain';

const pricing = calculateEventPricing(event);
// pricing.venueRentalCents
// pricing.servicesCents
// pricing.equipmentCents
// pricing.staffCents
// pricing.surchargesCents (public, commercial)
// pricing.discountsCents (nonprofit)
// pricing.taxCents (25% MVA)
// pricing.totalCents
// pricing.depositRequiredCents (30%)
// pricing.damageDepositCents
```

### Default Pricing Configuration

| Item                    | Amount          |
| ----------------------- | --------------- |
| Base rental             | 10,000 NOK      |
| Additional hour rate    | 1,500 NOK       |
| Setup/teardown rate     | 750 NOK/hour    |
| Deposit                 | 30%             |
| Damage deposit          | 5,000 NOK       |
| Insurance required above| 100 attendees   |
| Public event surcharge  | 25%             |
| Commercial surcharge    | 50%             |
| Nonprofit discount      | 20%             |

### Event Requirements Validation

```typescript
import { validateEventRequirements } from '@xalatechnologies/domain';

const checks = validateEventRequirements(event);
// Returns array of requirement checks with:
// - requirement: string
// - met: boolean
// - message: string
// - severity: 'error' | 'warning' | 'info'
```

#### Automatic Requirement Checks

| Condition           | Requirement           | Severity |
| ------------------- | --------------------- | -------- |
| > 1000 attendees    | Municipal approval    | error    |
| > 100 attendees     | Event insurance       | error    |
| > 500 attendees     | Safety plan           | error    |
| Public event        | First aid coverage    | warning  |
| Public + > 200      | Security personnel    | error    |
| Always              | Deposit payment       | error    |
| Always              | Emergency contact     | error    |

### Event Conflict Detection

```typescript
import { checkEventConflicts } from '@xalatechnologies/domain';

const result = checkEventConflicts(
  event,
  existingEvents,
  existingBookings,
  blackouts
);
// result.hasConflict: boolean
// result.conflicts: Array<{
//   type: 'booking' | 'event' | 'blackout' | 'maintenance',
//   id: string,
//   name?: string,
//   startTime: Date,
//   endTime: Date,
//   affectedZones: string[],
//   resolution?: 'reschedule' | 'share' | 'cancel'
// }>
```

---

## 3. Service Exports

All business logic is exported from `@xalatechnologies/domain`:

```typescript
// Booking Workflow
export {
  isValidTransition,
  getAvailableTransitions,
  isTerminalStatus,
  transitionBookingStatus,
  checkApprovalRequired,
  calculatePricingWithTiers,
  calculateRefund,
  checkTimeOverlap,
  findAlternativeSlots,
  isValidListingTransition,
  getAffectedBookingsForStatusChange,
  // Constants
  BOOKING_TRANSITIONS,
  DEFAULT_APPROVAL_CONFIG,
  DEFAULT_PRICING_TIERS,
  DEFAULT_REFUND_POLICIES,
  DEFAULT_CONFLICT_CONFIG,
  DEFAULT_ADDON_CATALOG,
  FACILITY_STATUS_TRANSITIONS,
} from './booking-workflow';

// Event Booking
export {
  calculateEventPricing,
  validateEventRequirements,
  checkEventConflicts,
  DEFAULT_EVENT_PRICING,
} from './event-booking';
```

---

## 4. Testing

### Test Files

- `packages/core/src/services/__tests__/booking-workflow.test.ts`
- `packages/core/src/services/__tests__/event-booking.test.ts`

### Running Tests

```bash
# Run all core tests
pnpm --filter @xalatechnologies/sos-core test

# Run with coverage
pnpm --filter @xalatechnologies/sos-core test:coverage

# Run specific test file
pnpm --filter @xalatechnologies/sos-core test booking-workflow
```

### Test Coverage

| Service          | Tests | Coverage |
| ---------------- | ----- | -------- |
| booking-workflow | 35+   | ~95%     |
| event-booking    | 30+   | ~95%     |

---

## 5. Type Definitions

All types are exported from the service modules:

```typescript
// Booking Workflow Types
export type {
  BookingStatus,
  ActorType,
  ActivityType,
  ListingStatus,
  ApprovalReason,
  StateTransitionResult,
  ApprovalConfig,
  ApprovalCheck,
  BookingApprovalContext,
  ApprovalDecision,
  PricingTier,
  PricingTierCondition,
  PricingContext,
  PricingResult,
  RefundPolicy,
  RefundCalculation,
  ConflictDetectionConfig,
  BookingTimeSlot,
  ConflictCheckResult,
  ListingStatusChange,
  BookingServiceType,
  BookingEquipmentType,
  BookingAddOn,
} from './booking-workflow';

// Event Booking Types
export type {
  EventType,
  EventScale,
  EventStatus,
  EventBooking,
  EventServiceType,
  EventService,
  EventEquipmentType,
  EventEquipment,
  StaffRoleType,
  StaffRequirement,
  EventApprovalType,
  EventApproval,
  EventPricingConfig,
  EventPricingBreakdown,
  EventRequirementCheck,
  EventConflictCheck,
} from './event-booking';
```

---

## 6. Integration Examples

### With Hono API

```typescript
// apps/api/src/routes/v1/bookings.ts
import {
  checkApprovalRequired,
  calculatePricingWithTiers,
  transitionBookingStatus,
} from '@xalatechnologies/domain';

app.post('/bookings', async (c) => {
  const data = await c.req.json();

  // Calculate pricing
  const pricing = calculatePricingWithTiers(basePriceCents, {
    actorType: data.actorType,
    activityType: data.activityType,
    // ...
  });

  // Check approval requirements
  const approval = checkApprovalRequired({
    totalAmountCents: pricing.finalAmountCents,
    // ...
  });

  // Determine initial status
  const initialStatus = approval.requiresApproval
    ? 'pending_approval'
    : 'pending_payment';

  // Transition from draft
  const transition = transitionBookingStatus(
    'draft',
    initialStatus,
    userId,
    'Booking created'
  );

  // Persist booking with transition.auditLog
});
```

### With React Components

```typescript
// apps/web/app/components/booking-status.tsx
import {
  getAvailableTransitions,
  isTerminalStatus,
} from '@xalatechnologies/domain';

export function BookingStatusActions({ booking }) {
  const availableTransitions = getAvailableTransitions(booking.status);
  const isTerminal = isTerminalStatus(booking.status);

  if (isTerminal) {
    return <StatusBadge status={booking.status} />;
  }

  return (
    <div>
      <StatusBadge status={booking.status} />
      {availableTransitions.map(status => (
        <TransitionButton
          key={status}
          targetStatus={status}
          bookingId={booking.id}
        />
      ))}
    </div>
  );
}
```
