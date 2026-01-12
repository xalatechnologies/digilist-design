---
source: docs/knowledge_base/requirements/BOOKING_FLOW_STATE_MACHINE.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.250Z
---

---
source: docs/knowledge_base/requirements/BOOKING_FLOW_STATE_MACHINE.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.200Z
---

---
source: digilist/docs/plans/BOOKING_FLOW_STATE_MACHINE.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.175Z
---

# Digilist Booking Flow - State Machine

> DELIVERABLE 1: State Machine Diagram
>
> **Implementation Status:** ✅ COMPLETE (2025-12-23)
> - States defined in `db/schema/reservations.ts`
> - Transitions in `core/services/booking-workflow.ts`
> - See `BOOKING_FLOW_IMPLEMENTATION_STATUS.md` for details

```mermaid
stateDiagram-v2
    [*] --> BROWSE_ANON: user_visits_listing

    %% Anonymous browsing phase
    BROWSE_ANON --> BROWSE_ANON: view_calendar / search / filter
    BROWSE_ANON --> SLOT_SELECTION: select_slot
    
    %% Slot selection (can be anonymous)
    SLOT_SELECTION --> SLOT_SELECTION: add_slot / remove_slot / adjust_time
    SLOT_SELECTION --> LOGIN_REQUIRED: proceed_to_confirm [!isAuthenticated]
    SLOT_SELECTION --> RESERVATION_DRAFT: create_reservation [isAuthenticated && slotsValid]
    
    %% Login gate
    LOGIN_REQUIRED --> SLOT_SELECTION: login_success [restore_selection]
    LOGIN_REQUIRED --> BROWSE_ANON: login_cancel
    
    %% Reservation draft
    RESERVATION_DRAFT --> RESERVATION_DRAFT: update_purpose / update_addons
    RESERVATION_DRAFT --> SLOT_SELECTION: slots_unavailable
    RESERVATION_DRAFT --> CONFIRMATION_REVIEW: request_quote [draftComplete]
    
    %% Confirmation review
    CONFIRMATION_REVIEW --> CONFIRMATION_REVIEW: modify_addons
    CONFIRMATION_REVIEW --> RESERVATION_DRAFT: back_to_edit
    CONFIRMATION_REVIEW --> CART_DRAFT: add_to_cart [termsAccepted && quoteValid]
    
    %% Cart management
    CART_DRAFT --> CART_DRAFT: add_another / remove_item
    CART_DRAFT --> CHECKOUT_STARTED: start_checkout [cartNotEmpty]
    
    %% Checkout branching
    state checkout_policy <<choice>>
    CHECKOUT_STARTED --> checkout_policy: evaluate_policy
    
    checkout_policy --> PAYMENT_PENDING: [paymentPolicy == PAY_AND_CONFIRM]
    checkout_policy --> PAYMENT_PENDING: [paymentPolicy == PAY_THEN_APPROVE]
    checkout_policy --> SUBMITTED: [paymentPolicy == APPROVE_THEN_PAY]
    
    %% Payment flow
    state payment_result <<choice>>
    PAYMENT_PENDING --> payment_result: webhook_received
    
    payment_result --> PAYMENT_SUCCEEDED: [status == success]
    payment_result --> PAYMENT_FAILED: [status == failed]
    
    PAYMENT_FAILED --> PAYMENT_PENDING: retry_payment
    PAYMENT_FAILED --> CANCELED: cancel_order
    
    %% Post-payment branching
    state post_payment <<choice>>
    PAYMENT_SUCCEEDED --> post_payment: finalize_booking
    
    post_payment --> CONFIRMED: [!requiresApproval]
    post_payment --> PENDING_APPROVAL: [requiresApproval && PAY_THEN_APPROVE]
    post_payment --> RECONCILIATION_REQUIRED: [booking_creation_failed]
    
    %% Approval flow (APPROVE_THEN_PAY)
    SUBMITTED --> PENDING_APPROVAL: submit_for_approval
    
    state approval_decision <<choice>>
    PENDING_APPROVAL --> approval_decision: admin_decision
    
    approval_decision --> APPROVED_AWAITING_PAYMENT: [approve && APPROVE_THEN_PAY]
    approval_decision --> CONFIRMED: [approve && PAY_THEN_APPROVE]
    approval_decision --> REJECTED: [reject]
    
    %% Approved -> payment
    APPROVED_AWAITING_PAYMENT --> PAYMENT_PENDING: initiate_payment
    APPROVED_AWAITING_PAYMENT --> CANCELED: deadline_expired
    
    %% Rejection
    REJECTED --> REFUNDED: process_refund [hasPaid]
    REJECTED --> [*]: [!hasPaid]
    
    %% Final states
    CONFIRMED --> CANCELED: cancel [withinWindow]
    CANCELED --> REFUNDED: process_refund [hasPaid]
    REFUNDED --> [*]
    RECONCILIATION_REQUIRED --> CONFIRMED: reconcile_success
    RECONCILIATION_REQUIRED --> REFUNDED: reconcile_refund
```

## State Descriptions

| State | Description |
|-------|-------------|
| `BROWSE_ANON` | Anonymous browsing, no login required |
| `SLOT_SELECTION` | Selecting time slots on calendar |
| `LOGIN_REQUIRED` | Authentication gate before confirmation |
| `RESERVATION_DRAFT` | Server-side draft created |
| `CONFIRMATION_REVIEW` | Reviewing quote, addons, terms |
| `CART_DRAFT` | Items in cart |
| `CHECKOUT_STARTED` | Checkout initiated |
| `PAYMENT_PENDING` | Awaiting payment webhook |
| `PAYMENT_SUCCEEDED` | Payment verified |
| `PAYMENT_FAILED` | Payment failed |
| `SUBMITTED` | Submitted for approval (no payment yet) |
| `PENDING_APPROVAL` | Awaiting admin decision |
| `APPROVED_AWAITING_PAYMENT` | Approved, needs payment |
| `CONFIRMED` | Booking confirmed |
| `REJECTED` | Admin rejected |
| `CANCELED` | Booking canceled |
| `REFUNDED` | Payment refunded |
| `RECONCILIATION_REQUIRED` | Payment OK but booking failed |

## Guard Conditions

```typescript
interface BookingGuards {
  isAuthenticated: boolean;
  slotsValid: boolean;
  availabilityValid: boolean;
  termsAccepted: boolean;
  termsVersion: string;
  quoteValid: boolean;
  cartNotEmpty: boolean;
  requiresApproval: boolean;
  paymentPolicy: 'PAY_AND_CONFIRM' | 'APPROVE_THEN_PAY' | 'PAY_THEN_APPROVE';
  hasPaid: boolean;
  withinCancellationWindow: boolean;
}
```

## Events

| Event | Description |
|-------|-------------|
| `select_slot` | User clicks available slot |
| `create_reservation` | Confirm slot selection |
| `request_quote` | Get server-side pricing |
| `accept_terms` | Accept terms checkbox |
| `add_to_cart` | Add reservation to cart |
| `start_checkout` | Begin checkout process |
| `webhook_received` | Payment provider callback |
| `submit_for_approval` | Submit to admin queue |
| `approve` | Admin approves |
| `reject` | Admin rejects |
| `cancel` | User/admin cancels |
| `refund` | Process refund |
