---
source: docs/knowledge_base/requirements/BOOKING_FLOW_ARCHITECTURE.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.249Z
---

---
source: docs/knowledge_base/requirements/BOOKING_FLOW_ARCHITECTURE.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.200Z
---

---
source: digilist/docs/plans/BOOKING_FLOW_ARCHITECTURE.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.174Z
---

# Digilist Booking Flow - Architecture Documentation

> Last Updated: 2025-12-23

## Overview

The Digilist booking flow enables citizens to reserve municipal listings through a multi-step process that supports three payment policies, approval workflows, and compliance requirements.

---

## System Architecture

```mermaid
graph TB
    subgraph Frontend["Frontend (React Router)"]
        FC[Listing Calendar]
        CB[Confirm Booking Page]
        CP[Cart Page]
        BC[Booking Confirmation]
    end

    subgraph API["API Layer (Hono)"]
        RA[/api/v1/reservations]
        CA[/api/v1/cart]
        WH[/api/v1/webhooks/payments]
    end

    subgraph Services["Core Services"]
        RS[Reservation Service]
        CS[Checkout Service]
        PS[Payment Providers]
    end

    subgraph Database["PostgreSQL + Drizzle"]
        RES[(reservations)]
        CART[(carts)]
        CHK[(checkouts)]
        BK[(bookings)]
        PAY[(payments)]
    end

    subgraph External["External Services"]
        VP[Vipps ePayment]
        ST[Stripe]
        NT[Nets]
    end

    FC --> CB
    CB --> CP
    CP --> BC

    FC --> RA
    CB --> RA
    CP --> CA
    
    RA --> RS
    CA --> CS
    WH --> CS

    RS --> RES
    CS --> CHK
    CS --> CART
    CS --> BK
    CS --> PAY

    PS --> VP
    PS --> ST
    PS --> NT

    VP --> WH
    ST --> WH
    NT --> WH
```

---

## User Journey Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant D as Database
    participant P as Payment Provider

    Note over U,P: 1. Browse & Select (Anonymous OK)
    U->>F: Browse listing calendar
    U->>F: Select time slot(s)
    
    Note over U,P: 2. Create Reservation (Auth Required)
    F->>A: POST /reservations
    A->>D: Insert reservation (draft)
    D-->>A: reservation_id
    A-->>F: Reservation created
    
    Note over U,P: 3. Generate Quote
    F->>A: POST /reservations/:id/quote
    A->>D: Check availability
    A->>D: Calculate pricing
    A->>D: Update status → quoted
    A-->>F: Quote (valid 15 min)
    
    Note over U,P: 4. Accept Terms
    U->>F: Check terms checkbox
    F->>A: POST /reservations/:id/accept-terms
    A->>D: Log IP, user-agent, timestamp
    A->>D: Update status → terms_accepted
    A-->>F: Audit ID
    
    Note over U,P: 5. Add to Cart
    F->>A: POST /reservations/:id/add-to-cart
    A->>D: Get/create cart
    A->>D: Update status → in_cart
    A-->>F: cart_id, cart_item_id
    
    Note over U,P: 6. Checkout
    F->>A: POST /cart/checkout
    A->>D: Create checkout record
    A->>D: Re-validate availability
    A->>P: Create payment session
    P-->>A: Payment URL
    A-->>F: Redirect to payment
    
    Note over U,P: 7. Payment
    U->>P: Complete payment
    P->>A: Webhook (payment result)
    A->>D: Update payment status
    A->>D: Create booking(s)
    A->>D: Update status → converted
    
    Note over U,P: 8. Confirmation
    P-->>U: Redirect to return URL
    F->>A: GET /bookings/:id
    A-->>F: Booking details
    F-->>U: Show confirmation
```

---

## Reservation State Machine

```mermaid
stateDiagram-v2
    [*] --> draft: create_reservation
    
    draft --> quoted: generate_quote
    draft --> expired: timeout_30min
    draft --> cancelled: user_cancel
    
    quoted --> terms_accepted: accept_terms
    quoted --> draft: modify_reservation
    quoted --> expired: quote_timeout_15min
    quoted --> cancelled: user_cancel
    
    terms_accepted --> in_cart: add_to_cart
    terms_accepted --> quoted: modify_reservation
    terms_accepted --> cancelled: user_cancel
    
    in_cart --> checkout: start_checkout
    in_cart --> terms_accepted: remove_from_cart
    in_cart --> cancelled: user_cancel
    
    checkout --> payment_pending: initiate_payment
    checkout --> submitted: approval_required
    checkout --> cancelled: user_cancel
    
    payment_pending --> converted: payment_success
    payment_pending --> checkout: payment_failed_retry
    payment_pending --> cancelled: payment_failed_final
    
    submitted --> converted: approved_no_payment
    submitted --> payment_pending: approved_needs_payment
    submitted --> cancelled: rejected
    
    converted --> [*]
    expired --> [*]
    cancelled --> [*]
```

---

## Payment Policy Flows

### Policy 1: PAY_AND_CONFIRM (Default)

```mermaid
flowchart LR
    A[Checkout] --> B[Payment]
    B -->|Success| C[Booking Confirmed]
    B -->|Failed| D[Retry/Cancel]
```

Most listings use this policy. Payment is required and booking is immediately confirmed upon successful payment.

### Policy 2: APPROVE_THEN_PAY

```mermaid
flowchart LR
    A[Checkout] --> B[Submit for Approval]
    B --> C{Admin Decision}
    C -->|Approve| D[Payment Required]
    D -->|Success| E[Booking Confirmed]
    D -->|Failed| F[Retry/Cancel]
    C -->|Reject| G[Cancelled]
```

Used for listings requiring administrative approval before payment. User doesn't pay until approved.

### Policy 3: PAY_THEN_APPROVE

```mermaid
flowchart LR
    A[Checkout] --> B[Payment]
    B -->|Success| C[Pending Approval]
    C --> D{Admin Decision}
    D -->|Approve| E[Booking Confirmed]
    D -->|Reject| F[Refund Issued]
    B -->|Failed| G[Retry/Cancel]
```

Used for high-demand listings. Payment is held pending approval. Automatic refund if rejected.

---

## Database Schema

```mermaid
erDiagram
    reservations ||--o{ carts : "added_to"
    reservations ||--o| checkouts : "checked_out_via"
    reservations ||--o| bookings : "converts_to"
    checkouts ||--o{ payments : "has"
    
    reservations {
        uuid id PK
        uuid tenant_id FK
        uuid listing_id FK
        uuid zone_id FK
        uuid user_id FK
        enum status
        jsonb slots
        jsonb quote
        timestamp quote_expires_at
        string terms_version
        timestamp terms_accepted_at
        string terms_accepted_ip
        uuid cart_id FK
        uuid booking_id FK
        timestamp expires_at
        timestamp created_at
    }
    
    carts {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        int subtotal_cents
        int vat_cents
        int total_cents
        int item_count
        timestamp created_at
    }
    
    checkouts {
        uuid id PK
        uuid tenant_id FK
        uuid cart_id FK
        uuid user_id FK
        enum status
        string payment_provider
        string payment_session_id
        string idempotency_key
        int amount_cents
        timestamp created_at
    }
    
    bookings {
        uuid id PK
        uuid tenant_id FK
        uuid listing_id FK
        uuid user_id FK
        enum status
        string confirmation_code
        jsonb slots
        uuid payment_id FK
        timestamp created_at
    }
    
    payments {
        uuid id PK
        uuid checkout_id FK
        enum provider
        enum status
        int amount_cents
        string external_ref
        timestamp webhook_received_at
    }
```

---

## API Endpoints

### Reservations

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/reservations` | Create draft reservation |
| `GET` | `/api/v1/reservations/:id` | Get reservation details |
| `PATCH` | `/api/v1/reservations/:id` | Update purpose, message, add-ons |
| `POST` | `/api/v1/reservations/:id/quote` | Generate server-side quote |
| `POST` | `/api/v1/reservations/:id/accept-terms` | Accept terms with audit |
| `POST` | `/api/v1/reservations/:id/add-to-cart` | Add to shopping cart |
| `DELETE` | `/api/v1/reservations/:id` | Cancel reservation |

### Cart

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/cart` | Get current cart |
| `DELETE` | `/api/v1/cart/items/:itemId` | Remove item from cart |
| `POST` | `/api/v1/cart/checkout` | Initiate checkout |

### Webhooks

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/webhooks/payments/vipps` | Vipps payment callback |
| `POST` | `/api/v1/webhooks/payments/test` | Test webhook (dev only) |

---

## File Structure

```
digilist-packages/packages/
├── db/
│   ├── src/schema/reservations.ts       # Table definitions
│   ├── src/repositories/reservations.repository.ts
│   └── drizzle/0004_add_reservations_flow.sql
│
├── core/src/services/
│   ├── reservation.service.ts           # Reservation lifecycle
│   ├── checkout.service.ts              # Checkout orchestration
│   └── payment-providers/
│       ├── types.ts                     # Provider interface
│       ├── vipps.adapter.ts             # Vipps implementation
│       └── index.ts                     # Exports

digilist-api/src/routes/v1/
├── reservations.ts                      # Reservation endpoints
├── cart.ts                              # Cart endpoints
└── webhooks/payments.ts                 # Payment webhooks

digilist-frontend/app/
├── services/booking.service.ts          # API client
├── routes/confirm-booking.tsx           # Confirmation page
└── routes/cart.tsx                      # Cart page
```

---

## Security & Compliance

### Terms Acceptance Audit

Every terms acceptance logs:
- **User ID** - Who accepted
- **Reservation ID** - What was accepted for
- **Terms Version** - Which version was accepted
- **IP Address** - From where
- **User Agent** - Which browser/device
- **Timestamp** - When exactly

### Idempotency

All write operations support idempotency keys to prevent duplicate:
- Reservations
- Payments
- Bookings

### Row Level Security

PostgreSQL RLS policies ensure:
- Users can only see their own reservations/carts
- Tenant isolation is enforced at database level
- Admin overrides for backoffice operations

---

## Timeouts

| Item | Duration | Action on Expiry |
|------|----------|------------------|
| Draft reservation | 30 minutes | Auto-expire, release slots |
| Quote | 15 minutes | Must regenerate quote |
| Payment session | 10 minutes | Checkout expires |
| Cart item | 24 hours | Auto-remove from cart |

---

## Error Handling

| Code | Error | Description |
|------|-------|-------------|
| `409` | `SLOT_CONFLICT` | Slots no longer available |
| `409` | `QUOTE_EXPIRED` | Quote validity expired |
| `400` | `TERMS_NOT_ACCEPTED` | Must accept terms first |
| `400` | `TERMS_VERSION_MISMATCH` | Wrong terms version |
| `422` | `RULE_VIOLATION` | Violates listing booking rules |
| `500` | `RECONCILIATION_REQUIRED` | Payment OK but booking failed |

---

## Testing

```bash
# Run API
cd digilist-api && pnpm dev

# Run Frontend
cd digilist-frontend && pnpm dev

# Test flow
# 1. Navigate to /listing/:id
# 2. Select time slot on calendar
# 3. Click "Book" to create reservation
# 4. Review quote on /confirm-booking
# 5. Accept terms and add to cart
# 6. Go to /cart and checkout
# 7. Complete payment (Vipps sandbox)
# 8. View confirmation
```

---

## Related Documents

- [BOOKING_FLOW_STATE_MACHINE.md](./BOOKING_FLOW_STATE_MACHINE.md) - Detailed state diagram
- [BOOKING_FLOW_API_CONTRACTS.md](./BOOKING_FLOW_API_CONTRACTS.md) - OpenAPI specs
- [BOOKING_FLOW_IMPLEMENTATION_GUIDE.md](./BOOKING_FLOW_IMPLEMENTATION_GUIDE.md) - Developer guide
- [BOOKING_FLOW_ACCEPTANCE_CRITERIA.md](./BOOKING_FLOW_ACCEPTANCE_CRITERIA.md) - Test scenarios
- [BOOKING_FLOW_IMPLEMENTATION_STATUS.md](./BOOKING_FLOW_IMPLEMENTATION_STATUS.md) - Progress tracker
