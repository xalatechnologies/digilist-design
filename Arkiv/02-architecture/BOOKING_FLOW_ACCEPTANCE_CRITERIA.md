---
source: docs/knowledge_base/requirements/BOOKING_FLOW_ACCEPTANCE_CRITERIA.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.249Z
---

---
source: docs/knowledge_base/requirements/BOOKING_FLOW_ACCEPTANCE_CRITERIA.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.200Z
---

---
source: digilist/docs/plans/BOOKING_FLOW_ACCEPTANCE_CRITERIA.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.174Z
---

# Digilist Booking Flow - Tender Acceptance Criteria

> DELIVERABLE 4: Acceptance Criteria Mapping (Gherkin + Numbered)

## AC-1 to AC-6: Anonymous Browsing & Login

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-1 | Anonymous user can browse/search listings without login | Navigate to /listings, search, filter - no auth prompt |
| AC-2 | Anonymous user can view listing details and calendar | View /listings/{id} with availability - no auth prompt |
| AC-3 | Anonymous user can select time slots | Click slots on calendar - selection persists without login |
| AC-4 | Login required before confirming reservation | Click "Bekreft" → redirect to login → return with selection |
| AC-5 | Login required before accessing cart | Navigate to /cart → redirect to login |
| AC-6 | Login required before checkout/payment | Attempt checkout → must be authenticated |

```gherkin
Feature: Anonymous Browsing
  Scenario: Browse without login
    Given I am not logged in
    When I visit the listings page
    Then I can search and filter listings
    And I can view listing details and calendar
    And I can select time slots
    And I am NOT prompted to log in

  Scenario: Login gate at confirmation
    Given I am not logged in and have selected slots
    When I click "Bekreft valg"
    Then I am redirected to login
    And after login my selection is preserved
```

---

## AC-7 to AC-9: Confirmation Page

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-7 | Confirmation shows: listing, zone, slots, price group, base price, add-ons, message field, terms checkbox, total | All fields visible on confirmation page |
| AC-8 | Total price is server-calculated via POST /api/reservations/{id}/quote | Network tab shows quote request, UI matches response |
| AC-9 | Price revalidated when add-ons change | Modify add-on → new quote request → updated total |

```gherkin
Feature: Confirmation Summary
  Scenario: Complete summary shown
    Given I am on the confirmation page
    Then I see listing name and zone
    And I see each slot with date and time
    And I see my price group
    And I see add-on options with prices
    And I see message field for owner
    And I see terms checkbox with link
    And I see total price matching server quote
```

---

## AC-10 to AC-12: Terms Acceptance

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-10 | Cannot proceed without accepting terms | Checkbox unchecked → error "Du må godta vilkårene" |
| AC-11 | Terms acceptance logged with version, timestamp, IP, user agent | Audit log entry contains all metadata |
| AC-12 | Terms version mismatch handled gracefully | Old version → 400 error → page reloads with new terms |

```gherkin
Feature: Terms Acceptance
  Scenario: Terms required
    Given terms checkbox is unchecked
    When I click proceed
    Then I see error "Du må godta vilkårene for å fortsette"
    And focus moves to checkbox

  Scenario: Acceptance audit
    When I accept terms and proceed
    Then audit log contains termsVersion, timestamp, IP, userAgent
```

---

## AC-13 to AC-16: Direct Payment Flow

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-13 | Successful payment confirms booking immediately (PAY_AND_CONFIRM) | Webhook success → status CONFIRMED → email sent |
| AC-14 | Booking only confirmed via server webhook, not client redirect | Redirect without webhook → status "Behandler..." |
| AC-15 | Payment failure allows retry | Failed webhook → "Betaling mislyktes" → retry button |
| AC-16 | Reconciliation when payment OK but booking fails | Payment success + booking error → RECONCILIATION_REQUIRED → ops alert |

```gherkin
Feature: Direct Payment
  Scenario: Payment confirms booking
    Given listing has paymentPolicy "PAY_AND_CONFIRM"
    When I complete payment and webhook arrives with success
    Then booking status is CONFIRMED
    And I receive confirmation email

  Scenario: Webhook required for confirmation
    Given I completed payment redirect
    But webhook has not arrived
    Then booking shows "Behandler betaling..."
    And booking is NOT confirmed yet
```

---

## AC-17 to AC-20: Approval Flow

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-17 | APPROVE_THEN_PAY: Submit without payment, pay after approval | Checkout → PENDING_APPROVAL → approve → pay → CONFIRMED |
| AC-18 | PAY_THEN_APPROVE: Pay upfront, refund if rejected | Pay → PENDING_APPROVAL → reject → automatic refund |
| AC-19 | Admin approval logged in audit trail | Approve action creates audit entry with adminId, timestamp |
| AC-20 | Admin rejection requires reason code and message | Reject without reason → validation error |

```gherkin
Feature: Approval Flow
  Scenario: APPROVE_THEN_PAY
    Given listing requires approval with APPROVE_THEN_PAY
    When I checkout
    Then I am NOT redirected to payment
    And booking status is PENDING_APPROVAL
    When admin approves
    Then I receive email with payment link
    When I pay
    Then booking is CONFIRMED

  Scenario: PAY_THEN_APPROVE rejection
    Given I paid for an approval-required listing
    When admin rejects with reason "Konflikt"
    Then booking status is REJECTED
    And refund is initiated automatically
    And I receive email with reason and refund info
```

---

## AC-21 to AC-23: Slot Conflict Handling

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-21 | Conflict at reservation creation returns 409 with slot details | Another user books → my confirm → 409 SLOT_CONFLICT |
| AC-22 | Conflict at checkout returns 409, returns to cart | Cart checkout → 409 → cart with flagged items |
| AC-23 | Conflict error is user-friendly in Norwegian | Message includes slot time, listing, "Velg ny tid" link |

```gherkin
Feature: Slot Conflicts
  Scenario: Conflict at confirmation
    Given another user booked my selected slot
    When I click confirm
    Then I see error "Tidspunktet 10:00-11:00 er ikke lenger ledig"
    And conflicting slot is marked unavailable
    And I can select alternative slots
```

---

## AC-24 to AC-26: Audit & Equal Treatment

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-24 | Complete audit trail for booking lifecycle | All events logged: create, quote, terms, cart, checkout, payment, booking |
| AC-25 | Approval decisions include actor, timestamp, reason | Audit entry has decidedBy, decidedAt, reasonCode, message |
| AC-26 | Equal treatment: same inputs = same outcomes | Two identical users get same price, same rules applied |

```gherkin
Feature: Audit Trail
  Scenario: Complete lifecycle audit
    Given a booking completes the full flow
    Then audit log contains RESERVATION_CREATED with slots, userId
    And QUOTE_GENERATED with lineItems, total
    And TERMS_ACCEPTED with version, IP
    And PAYMENT_SUCCEEDED with webhookData
    And BOOKING_CONFIRMED with confirmationCode

Feature: Equal Treatment
  Scenario: Identical treatment
    Given two users with same eligibility
    When both request same listing and time
    Then they receive identical price quotes
    And same rules are applied
    And approval criteria are identical
```

---

## AC-27 to AC-30: Accessibility (WCAG 2.1 AA)

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-27 | All buttons keyboard operable (Enter/Space) | Tab to button → Enter/Space activates |
| AC-28 | Visible focus indicators (3px minimum) | Tab navigation shows clear focus ring |
| AC-29 | Errors associated with inputs via aria-describedby | Screen reader announces error for field |
| AC-30 | Loading states announced via aria-live | Payment processing announced to screen readers |

---

## Summary Matrix

| Category | Criteria | Status |
|----------|----------|--------|
| Anonymous Browsing | AC-1 to AC-6 | Required |
| Confirmation Page | AC-7 to AC-9 | Required |
| Terms Acceptance | AC-10 to AC-12 | Required |
| Direct Payment | AC-13 to AC-16 | Required |
| Approval Flow | AC-17 to AC-20 | Required |
| Conflict Handling | AC-21 to AC-23 | Required |
| Audit & Compliance | AC-24 to AC-26 | Required |
| Accessibility | AC-27 to AC-30 | Required |
