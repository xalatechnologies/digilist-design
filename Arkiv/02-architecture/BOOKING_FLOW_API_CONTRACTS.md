---
source: docs/knowledge_base/requirements/BOOKING_FLOW_API_CONTRACTS.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.249Z
---

---
source: docs/knowledge_base/requirements/BOOKING_FLOW_API_CONTRACTS.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.200Z
---

---
source: digilist/docs/plans/BOOKING_FLOW_API_CONTRACTS.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.174Z
---

# Digilist Booking Flow - API Contracts

> DELIVERABLE 2: API Contracts (OpenAPI-style)
>
> **Implementation Status:** ✅ COMPLETE (2025-12-23)
> - Reservations: `api/routes/v1/reservations.ts`
> - Cart: `api/routes/v1/cart.ts`
> - Webhooks: `api/routes/v1/webhooks/payments.ts`
> - See `BOOKING_FLOW_IMPLEMENTATION_STATUS.md` for details

## A) Reservation Endpoints

### POST /api/reservations
Creates reservation draft from selected slots.

**Request:**
```json
{
  "listingId": "uuid",
  "slots": [{ "startIso": "ISO datetime", "endIso": "ISO datetime", "zoneId": "uuid?" }],
  "purpose": "string?",
  "purposePublic": "boolean = false",
  "sessionId": "string?"
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "status": "DRAFT",
  "listingId": "uuid",
  "slots": [...],
  "expiresAt": "ISO datetime",
  "availabilityValidatedAt": "ISO datetime"
}
```

**Errors:** `401 AUTH_REQUIRED`, `409 SLOT_CONFLICT`, `422 RULE_VIOLATION`

---

### GET /api/reservations/{id}
**Response 200:** Full reservation object with quote, terms status

### PATCH /api/reservations/{id}
Update purpose, addOns, message. **Error:** `409 INVALID_STATE`

### POST /api/reservations/{id}/quote
**Response 200:**
```json
{
  "priceGroup": { "id": "uuid", "name": "Innbygger" },
  "lineItems": [{ "type": "SLOT|ADDON", "description": "...", "subtotal": 200 }],
  "subtotal": 300, "vatAmount": 75, "total": 375,
  "currency": "NOK", "expiresAt": "ISO datetime"
}
```

### POST /api/reservations/{id}/accept-terms
**Request:** `{ "termsVersion": "v2.1.0" }`
**Response 200:** `{ "termsAccepted": true, "auditId": "uuid" }`
**Errors:** `400 TERMS_VERSION_MISMATCH`

### POST /api/reservations/{id}/add-to-cart
**Response 200:** `{ "cartId": "uuid", "cartItemId": "uuid" }`
**Errors:** `400 TERMS_NOT_ACCEPTED`, `409 SLOT_CONFLICT`, `409 QUOTE_EXPIRED`

---

## B) Cart Endpoints

### GET /api/cart
```json
{
  "id": "uuid",
  "items": [{ "id": "uuid", "reservationId": "uuid", "quote": {...} }],
  "total": 375, "currency": "NOK"
}
```

### POST /api/cart/checkout
**Request:** `{ "returnUrl": "...", "cancelUrl": "...", "idempotencyKey": "uuid" }`

**Response (Payment):**
```json
{ "action": "REDIRECT_TO_PAYMENT", "paymentUrl": "https://..." }
```

**Response (Approval):**
```json
{ "action": "SUBMITTED_FOR_APPROVAL", "bookingIds": ["uuid"] }
```

**Errors:** `409 SLOT_CONFLICT`, `409 QUOTE_EXPIRED`, `422 MIXED_POLICIES`

### DELETE /api/cart/items/{itemId}
**Response 204**

---

## C) Payment Endpoints

### POST /api/payments/session
```json
{ "checkoutId": "uuid", "provider": "VIPPS|STRIPE", "idempotencyKey": "uuid" }
```
**Response 201:** `{ "paymentId": "uuid", "redirectUrl": "...", "status": "PENDING" }`

### POST /api/payments/webhook/{provider}
Idempotent webhook handler. Verifies signature, updates status, triggers booking finalization.

### GET /api/payments/{paymentId}
Payment status with `webhookReceivedAt`, `refundedAmount`

---

## D) Booking Endpoints

### POST /api/bookings/submit
**Request:** `{ "checkoutId": "uuid", "paymentId": "uuid?", "idempotencyKey": "uuid" }`
**Response 201:** `{ "bookings": [{ "id": "uuid", "status": "CONFIRMED|PENDING_APPROVAL", "confirmationCode": "DGL-..." }] }`
**Errors:** `409 SLOT_CONFLICT`, `500 RECONCILIATION_REQUIRED`

### GET /api/bookings/{id}
Full booking with payment, approval, audit, cancellation info

### GET /api/bookings?mine=true&status=CONFIRMED
Paginated list

### POST /api/bookings/{id}/cancel
**Request:** `{ "reason": "string?" }`
**Response:** `{ "status": "CANCELED", "refund": { "eligible": true, "amount": 375 } }`

### POST /api/bookings/{id}/approve (Admin)
**Response:** `{ "status": "CONFIRMED|APPROVED_AWAITING_PAYMENT" }`

### POST /api/bookings/{id}/reject (Admin)
**Request:** `{ "reasonCode": "CONFLICT|POLICY|OTHER", "message": "required" }`
**Response:** `{ "status": "REJECTED", "refund": {...} }`

---

## E) Listing Policy

### GET /api/listings/{id}/policy
```json
{
  "requiresApproval": false,
  "paymentPolicy": "PAY_AND_CONFIRM|APPROVE_THEN_PAY|PAY_THEN_APPROVE",
  "priceGroups": [...],
  "allowedAddOns": [...],
  "rules": {
    "minBookingNotice": "PT2H",
    "maxBookingAdvance": "P90D",
    "slotIncrementMinutes": 30,
    "cancellationDeadlineHours": 24
  },
  "termsVersion": "v2.1.0"
}
```

---

## Core Schemas

```typescript
enum BookingStatus { PENDING_APPROVAL, CONFIRMED, REJECTED, CANCELED }
enum PaymentStatus { PENDING, SUCCEEDED, FAILED, REFUNDED }
enum PaymentPolicy { PAY_AND_CONFIRM, APPROVE_THEN_PAY, PAY_THEN_APPROVE }

interface Slot { startIso: string; endIso: string; listingId: string; zoneId?: string; }
interface Quote { lineItems: LineItem[]; total: number; currency: string; expiresAt: string; }
interface Booking { id: string; status: BookingStatus; slots: Slot[]; payment: {...}; approval: {...}; audit: {...}; }
```

## Error Model

| Code | Error | Description |
|------|-------|-------------|
| 409 | `SLOT_CONFLICT` | Slots no longer available |
| 422 | `RULE_VIOLATION` | Violates listing rules |
| 401 | `AUTH_REQUIRED` | Not authenticated |
| 403 | `NOT_AUTHORIZED` | Not permitted |
| 400 | `TERMS_NOT_ACCEPTED` | Must accept terms |
| 500 | `RECONCILIATION_REQUIRED` | Payment OK, booking failed |
