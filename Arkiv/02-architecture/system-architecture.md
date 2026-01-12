# System Architecture - Domain-Decoupled Architecture

**Last Updated:** January 6, 2026  
**Status:** ✅ **ACTIVE**

---

## Overview

The Digilist Platform uses a **domain-decoupled architecture** (Clean Architecture + DDD) that separates business logic from infrastructure concerns, ensuring testability, maintainability, and flexibility.

---

## Architecture Principles

### 1. Domain Has Zero External Dependencies

The domain layer contains **pure business logic** with no dependencies on:
- ❌ Database (no Drizzle, no SQL)
- ❌ HTTP frameworks (no Fastify, no Express)
- ❌ UI frameworks (no React, no DOM)
- ❌ External services (no API clients)

**Domain contains only:**
- ✅ Entities (business objects with identity)
- ✅ Value Objects (immutable descriptive objects)
- ✅ Domain Events (things that happened)
- ✅ Interfaces (contracts/ports)

### 2. Apps Are Thin Shells

Applications (`apps/api`, `apps/web`) are **thin shells** that:
- Handle HTTP/UI concerns only
- Delegate business logic to use cases
- Contain no business logic themselves

**Apps contain:**
- ✅ Routing (HTTP routes, React routes)
- ✅ Request/response handling
- ✅ Dependency injection wiring
- ❌ NO business logic
- ❌ NO domain entities
- ❌ NO database queries

### 3. SaaS Concerns Are Isolated

SaaS-specific concerns (multi-tenancy, billing, limits) are isolated in `@xalatechnologies/saas`:
- ✅ Tenant resolution
- ✅ Usage limits
- ✅ Subscription management
- ✅ Billing

**Domain never directly checks subscriptions** — it uses interfaces provided by SaaS layer.

### 4. Infrastructure Is Pluggable

Infrastructure layer (`@xalatechnologies/infrastructure`) implements domain interfaces:
- ✅ Repository implementations (Drizzle ORM)
- ✅ External service adapters
- ✅ Event publishers
- ✅ File storage

**Domain defines interfaces, infrastructure implements them.**

---

## Layer Responsibilities

### Domain Layer (`@xalatechnologies/domain`)

**Purpose:** Pure business logic

**Contains:**
- **Entities:** `Booking`, `Listing`, `ApprovalRequest`, `User`
- **Value Objects:** `TimeSlot`, `Pricing`, `RecurrencePattern`, `Email`, `Password`
- **Domain Events:** `BookingCreatedEvent`, `ListingActivatedEvent`
- **Interfaces (Ports):** `IBookingRepository`, `IAvailabilityChecker`, `IPricingCalculator`

**Rules:**
- ✅ Zero external dependencies
- ✅ No framework code
- ✅ No infrastructure code
- ✅ Pure TypeScript/JavaScript

**Example:**
```typescript
// ✅ Domain entity (pure business logic)
export class Booking extends Entity<BookingProps> {
  confirm(): void {
    if (this.props.status !== 'pending') {
      throw new Error('Only pending bookings can be confirmed');
    }
    this.props.status = 'confirmed';
    this.addDomainEvent(new BookingConfirmedEvent(this.props.id));
  }
}
```

### Application Layer (`@xalatechnologies/application`)

**Purpose:** Orchestrate domain + infrastructure + SaaS

**Contains:**
- **Use Cases:** `CreateBookingUseCase`, `CancelBookingUseCase`, `CreateListingUseCase`
- **Orchestration Logic:** Coordinates domain entities, repositories, and SaaS services

**Rules:**
- ✅ Depends on domain (entities, interfaces)
- ✅ Depends on SaaS (limits, tenancy)
- ✅ Orchestrates infrastructure (via interfaces)
- ❌ No direct database access
- ❌ No HTTP concerns

**Example:**
```typescript
// ✅ Use case (orchestration)
export class CreateBookingUseCase {
  async execute(input: CreateBookingInput): Promise<Booking> {
    // 1. Check SaaS limits
    const canBook = await this.usageLimiter.check({...});
    
    // 2. Load domain entity
    const listing = await this.listingRepo.findById(...);
    
    // 3. Check availability (domain logic)
    const availability = await this.availabilityChecker.check(...);
    
    // 4. Create domain entity
    const booking = Booking.create({...});
    
    // 5. Save (infrastructure)
    await this.bookingRepo.save(booking);
    
    return booking;
  }
}
```

### Infrastructure Layer (`@xalatechnologies/infrastructure`)

**Purpose:** Implement domain interfaces

**Contains:**
- **Repository Implementations:** `BookingRepositoryImpl`, `ListingRepositoryImpl`
- **Service Adapters:** `AvailabilityCheckerImpl`, `PricingCalculatorImpl`
- **Database Client:** Drizzle ORM setup

**Rules:**
- ✅ Implements domain interfaces
- ✅ Handles persistence
- ✅ Maps between domain entities and database schema
- ❌ No business logic
- ❌ No domain entities (only implements interfaces)

**Example:**
```typescript
// ✅ Repository implementation
export class BookingRepositoryImpl implements IBookingRepository {
  async save(booking: Booking): Promise<void> {
    const data = this.toPersistence(booking);
    await this.database.insert(bookings).values(data);
  }
  
  private toPersistence(booking: Booking): BookingRow {
    // Map domain entity → database schema
  }
  
  private toDomain(row: BookingRow): Booking {
    // Map database schema → domain entity
  }
}
```

### SaaS Layer (`@xalatechnologies/saas`)

**Purpose:** Multi-tenancy, billing, limits

**Contains:**
- **Tenancy:** `TenantResolverService`
- **Limits:** `UsageLimiterService`, `UsageTrackerService`
- **Billing:** `SubscriptionService`

**Rules:**
- ✅ Isolated from domain (domain uses via interfaces)
- ✅ Can depend on infrastructure (database for limits)
- ✅ Provides services to application layer

**Example:**
```typescript
// ✅ SaaS service
export class UsageLimiterService implements IUsageLimiter {
  async check(input: LimitCheckInput): Promise<LimitCheckResult> {
    const usage = await this.usageRepo.getCurrentUsage(...);
    const plan = await this.subscriptionService.getPlan(...);
    return { allowed: usage < plan.limits.bookingsPerMonth };
  }
}
```

### Apps Layer (`apps/api`, `apps/web`)

**Purpose:** Thin shells for HTTP/UI

**Contains:**
- **API Routes:** HTTP request handlers
- **React Routes:** UI routing
- **Dependency Injection:** Wire up use cases and repositories

**Rules:**
- ✅ Thin shells only
- ✅ Call use cases (not repositories directly)
- ✅ Handle HTTP/UI concerns
- ❌ No business logic
- ❌ No domain entities

**Example:**
```typescript
// ✅ API route (thin shell)
app.post('/api/bookings', async (request, reply) => {
  const useCase = container.resolve(CreateBookingUseCase);
  const booking = await useCase.execute({
    listingId: request.body.listingId,
    tenantId: request.tenant.id,
    userId: request.user.id,
    startTime: new Date(request.body.startTime),
    endTime: new Date(request.body.endTime)
  });
  return reply.send({ id: booking.id });
});
```

---

## Dependency Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Apps Layer                            │
│              (apps/api, apps/web)                       │
│                                                          │
│  • HTTP routes                                          │
│  • UI routes                                            │
│  • Dependency injection                                 │
└──────────────────┬──────────────────────────────────────┘
                   │ depends on
                   ↓
┌─────────────────────────────────────────────────────────┐
│              Application Layer                          │
│         (@xalatechnologies/application)                 │
│                                                          │
│  • Use cases                                            │
│  • Orchestration logic                                  │
└──────────┬──────────────────────┬───────────────────────┘
           │ depends on           │ depends on
           ↓                      ↓
┌──────────────────────┐  ┌──────────────────────────────┐
│    Domain Layer      │  │      SaaS Layer              │
│ (@xalatechnologies/  │  │ (@xalatechnologies/saas)     │
│      domain)         │  │                              │
│                      │  │  • Tenancy                   │
│  • Entities          │  │  • Limits                    │
│  • Value Objects     │  │  • Billing                   │
│  • Events            │  │                              │
│  • Interfaces        │  └──────────────────────────────┘
└──────────┬───────────┘
           │ implements
           ↓
┌─────────────────────────────────────────────────────────┐
│          Infrastructure Layer                            │
│      (@xalatechnologies/infrastructure)                │
│                                                          │
│  • Repository implementations                           │
│  • Database client                                      │
│  • External service adapters                            │
└─────────────────────────────────────────────────────────┘
```

---

## Key Architectural Rules

### ✅ Allowed Dependencies

| From | To | Reason |
|------|-----|--------|
| Apps | Application | Apps call use cases |
| Apps | Domain (types only) | Apps use domain types for DTOs |
| Application | Domain | Use cases use domain entities |
| Application | SaaS | Use cases check limits |
| Application | Infrastructure (via interfaces) | Use cases call repositories |
| Infrastructure | Domain (interfaces) | Repositories implement domain interfaces |
| Infrastructure | Domain (entities) | Repositories return domain entities |
| SaaS | Infrastructure | SaaS uses database for limits |

### ❌ Forbidden Dependencies

| From | To | Reason |
|------|-----|--------|
| Domain | Infrastructure | Domain has zero external deps |
| Domain | SaaS (direct) | Domain uses SaaS via interfaces only |
| Domain | Apps | Domain has zero external deps |
| Apps | Infrastructure (direct) | Apps call use cases, not repositories |
| Apps | Domain (entities) | Apps use DTOs, not entities |

---

## Benefits

### 1. Testability

- ✅ Domain logic can be tested without database
- ✅ Use cases can be tested with mocked repositories
- ✅ Infrastructure can be tested independently

### 2. Maintainability

- ✅ Business logic is isolated and easy to find
- ✅ Changes to infrastructure don't affect domain
- ✅ Changes to domain don't affect infrastructure

### 3. Flexibility

- ✅ Can swap database implementations
- ✅ Can swap external services
- ✅ Can test without external dependencies

### 4. Clarity

- ✅ Clear separation of concerns
- ✅ Easy to understand dependencies
- ✅ Easy to onboard new developers

---

## Migration Status

**Status:** ✅ **COMPLETE**

**What Was Migrated:**
- ✅ Domain entities (Booking, Listing, ApprovalRequest, User)
- ✅ Value objects (TimeSlot, Pricing, RecurrencePattern)
- ✅ Domain events (BookingCreatedEvent, etc.)
- ✅ Use cases (CreateBooking, CancelBooking, etc.)
- ✅ Repository implementations (BookingRepositoryImpl, etc.)
- ✅ SaaS services (UsageLimiter, TenantResolver, etc.)

**Documentation:**
- See [Migration Complete](../migration/DOMAIN_DECOUPLED_MIGRATION_COMPLETE.md) for details
- See [Package Documentation](../03-packages/) for how-to guides

---

## Quick Reference

**Creating a new feature?**

1. **Domain:** Create entity/value object/event in `@xalatechnologies/domain`
2. **Application:** Create use case in `@xalatechnologies/application`
3. **Infrastructure:** Implement repository in `@xalatechnologies/infrastructure`
4. **App:** Create route/hook that calls use case

**See:** [Application Overview](../03-packages/application/overview.md) for patterns

---

*This architecture ensures clean separation, testability, and maintainability.* ✅
