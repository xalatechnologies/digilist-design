---
source: docs/knowledge_base/requirements/BOOKING_FLOW_IMPLEMENTATION_GUIDE.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.249Z
---

---
source: docs/knowledge_base/requirements/BOOKING_FLOW_IMPLEMENTATION_GUIDE.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.200Z
---

---
source: digilist/docs/plans/BOOKING_FLOW_IMPLEMENTATION_GUIDE.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.174Z
---

# Digilist Booking Flow - Implementation Guide

> DELIVERABLE 3: Coding-Agent Implementation Prompt
>
> **Implementation Status:** ✅ COMPLETE (2025-12-23)
> - All core services implemented
> - Database schema and migration ready
> - Payment provider (Vipps) integrated
> - See `BOOKING_FLOW_IMPLEMENTATION_STATUS.md` for full details

## Project Structure

```
packages/
├── core/booking/
│   ├── state-machine.ts    # State enum + transitions
│   ├── guards.ts           # Transition guard functions
│   └── types.ts            # Booking types
├── core/validation/
│   ├── availability.ts     # AvailabilityService
│   ├── rules-engine.ts     # ListingRulesEngine
│   └── schema.ts           # Zod schemas
├── core/pricing/
│   ├── pricing-service.ts  # Server-side pricing
│   └── quote.ts            # Quote generation
├── core/terms/
│   ├── terms-service.ts    # Terms versioning
│   └── audit.ts            # Acceptance logging
├── api/
│   ├── reservations/
│   ├── cart/
│   ├── payments/
│   ├── bookings/
│   └── middleware/
│       ├── auth.ts
│       ├── idempotency.ts
│       └── audit-log.ts
├── payments/
│   ├── adapter.ts          # Provider interface
│   ├── vipps/
│   ├── stripe/
│   └── webhook-handler.ts
└── db/schema/
    ├── reservations.ts
    ├── bookings.ts
    ├── payments.ts
    └── audit-log.ts
```

## 1. State Machine

```typescript
export enum BookingState {
  DRAFT, QUOTED, TERMS_ACCEPTED, IN_CART, CHECKOUT_STARTED,
  PAYMENT_PENDING, PAYMENT_SUCCEEDED, PAYMENT_FAILED,
  SUBMITTED, PENDING_APPROVAL, APPROVED_AWAITING_PAYMENT,
  CONFIRMED, REJECTED, CANCELED, REFUNDED, RECONCILIATION_REQUIRED
}

export enum BookingEvent {
  CREATE_RESERVATION, REQUEST_QUOTE, ACCEPT_TERMS, ADD_TO_CART,
  START_CHECKOUT, INITIATE_PAYMENT, PAYMENT_WEBHOOK_SUCCESS,
  PAYMENT_WEBHOOK_FAIL, SUBMIT_FOR_APPROVAL, APPROVE, REJECT, CANCEL, REFUND
}

// Define transitions with guards
const stateTransitions = {
  [BookingState.DRAFT]: {
    [BookingEvent.REQUEST_QUOTE]: {
      target: BookingState.QUOTED,
      guards: ['availabilityValid', 'draftComplete']
    }
  },
  // ... all transitions
};
```

## 2. Core Services

### AvailabilityService
Re-check at: reservation create, quote request, checkout, submit.
```typescript
interface AvailabilityService {
  validate(slots: Slot[]): Promise<AvailabilityResult>;
  checkConflicts(slots: Slot[], excludeBookingId?: string): Promise<Conflict[]>;
  lockSlots(slots: Slot[], reservationId: string, ttlMs: number): Promise<Lock>;
}
```

### ListingRulesEngine
```typescript
// Enforce: minBookingNotice, maxBookingAdvance, maxBookingsPerDay,
// maxDurationMinutes, slotIncrementMinutes, opening hours, blackouts
interface ListingRulesEngine {
  validateBooking(request: BookingRequest, policy: ListingPolicy): RuleResult;
}
```

### PricingService
```typescript
// ALL pricing server-calculated. Quote expires in 15 min.
interface PricingService {
  generateQuote(reservation: Reservation, user: User): Promise<Quote>;
  resolvePriceGroup(user: User, listing: Listing): PriceGroup;
}
```

### TermsService
```typescript
interface TermsService {
  getCurrentVersion(listingId: string): string;
  logAcceptance(data: { userId, reservationId, version, ip, userAgent }): Promise<AuditId>;
}
```

## 3. Payment Integration

### Provider Adapter
```typescript
interface PaymentProviderAdapter {
  createSession(params): Promise<PaymentSession>;
  verifyWebhook(payload, signature): WebhookVerifyResult;
  initiateRefund(paymentId, amount): Promise<RefundResult>;
}
```

### Webhook Handler (IDEMPOTENT)
1. Verify signature
2. Check idempotency (already processed?)
3. Update payment status
4. Trigger booking finalization
5. Log audit trail

### Reconciliation
If payment OK but booking fails: mark `RECONCILIATION_REQUIRED`, alert ops, attempt manual recovery.

## 4. Database Tables

```sql
-- reservations: id, userId, listingId, status, slots (jsonb), quote (jsonb),
--   termsVersion, termsAcceptedAt, expiresAt, createdAt

-- bookings: id, confirmationCode, status, listingId, userId, slots,
--   paymentId, paymentStatus, approvalStatus, approvedBy, rejectedBy,
--   termsVersion, termsAcceptedAt, createdAt

-- payments: id, checkoutId, provider, status, amount, externalRef,
--   idempotencyKey, webhookReceivedAt, createdAt

-- audit_log: id, entityType, entityId, event, actorId, actorType,
--   previousState, newState, metadata, ipAddress, createdAt
```

## 5. Audit Requirements

Log ALL events:
- Reservation CRUD, Quote generated, Terms accepted (with version/IP)
- Cart changes, Checkout started, Payment initiated/succeeded/failed
- Booking created/approved/rejected/canceled, Refunds

Each entry: who, when, what, decision context.

## 6. Notifications

| Event | User | Admin |
|-------|------|-------|
| Booking confirmed | Email+SMS | - |
| Pending approval | Email | Email+Alert |
| Approved | Email | - |
| Rejected | Email (reason) | - |
| Payment failed | Email | Alert if reconciliation |

## 7. Accessibility (WCAG 2.1 AA)

- All buttons keyboard operable
- 3px+ visible focus indicators
- Errors via aria-describedby
- Loading states via aria-live
- Terms checkbox has explicit label
- Price changes announced to screen readers

## 8. Non-Functional

- **Idempotency**: All writes accept idempotencyKey
- **Timeouts**: Quote 15min, draft 30min, payment 10min
- **Rate limits**: 10/min payments, 60/min reads
- **Performance**: Quote <500ms, availability <200ms
