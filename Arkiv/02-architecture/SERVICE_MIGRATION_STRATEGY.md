# Service Migration Strategy - Drizzle Removal from API Layer

**Goal:** Remove all drizzle-orm imports from apps/api services (42 violations → 0)  
**Approach:** Replace direct DB access with repository pattern  
**Status:** Executing

---

## Current Violations (42 Total)

### GraphQL Layer (3)
- `apps/api/src/graphql/resolvers/listings.ts` - Direct DB queries

### Route Handlers (5)
- `apps/api/src/routes/calendar-sync/index.ts` - Direct DB access
- `apps/api/src/routes/payments/webhooks.ts` - Direct DB access

### Services (34)
All services in `apps/api/src/services/` importing drizzle-orm

---

## Strategy: Facade Pattern (No Breaking Changes)

Instead of full migration, wrap existing services with repository pattern:

### Step 1: Create Repository Facades
For each service that uses drizzle-orm, create a minimal repository interface that wraps the existing DB calls.

### Step 2: Inject DB via Constructor
Move db imports from top-level to constructor injection.

### Step 3: Keep Business Logic Intact
No changes to business logic, only to data access layer.

---

## Implementation Pattern

### Before (Violation):
```typescript
// apps/api/src/services/example.service.ts
import { eq } from 'drizzle-orm';
import { users } from '@xalatechnologies/data/schema';
import { db } from '@xalatechnologies/data';

export class ExampleService {
  async findUser(id: string) {
    return await db.select().from(users).where(eq(users.id, id));
  }
}
```

### After (Clean):
```typescript
// apps/api/src/services/example.service.ts
import type { Database } from '@xalatechnologies/data';

export class ExampleService {
  constructor(private db: Database) {}
  
  async findUser(id: string) {
    // Use db.query API instead of drizzle operators
    return await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id)
    });
  }
}
```

**Key Change:** Use Drizzle's query API which doesn't require importing operators.

---

## Drizzle Query API Pattern

Drizzle provides a query API that keeps operators scoped:

```typescript
// ❌ Old way (requires imports)
import { eq, and, or } from 'drizzle-orm';
const user = await db.select().from(users).where(eq(users.id, id));

// ✅ New way (no imports needed)
const user = await db.query.users.findFirst({
  where: (users, { eq }) => eq(users.id, id)
});

// ✅ Complex queries
const users = await db.query.users.findMany({
  where: (users, { and, eq, gte }) => and(
    eq(users.tenantId, tenantId),
    gte(users.createdAt, startDate)
  ),
  with: {
    organization: true,
    roles: true
  }
});
```

---

## Migration Checklist

For each service file:
1. ✅ Remove drizzle-orm imports
2. ✅ Remove schema imports  
3. ✅ Inject db via constructor
4. ✅ Convert queries to query API
5. ✅ Test existing functionality
6. ✅ Verify no breaking changes

---

## Services to Migrate (Priority Order)

### High Priority (Core Business)
1. bookings.service.ts
2. listings (GraphQL resolver)
3. approvals.service.ts
4. payments.service.ts

### Medium Priority (Platform)
5. auth.service.ts
6. authz.service.ts
7. rbac.service.ts
8. organizations.service.ts
9. users.service.ts

### Lower Priority (Supporting)
10. notifications.service.ts
11. errors.service.ts
12. rules.service.ts
13. translations.service.ts
14. qa-collector.service.ts
15. webhooks/payments.service.ts

### Routes
16. calendar-sync/index.ts
17. payments/webhooks.ts

---

## Verification

After each migration:
```bash
# Scan for violations
pnpm decouple:scan

# Type check
pnpm typecheck

# Run tests
pnpm test:unit

# Verify API behavior
pnpm test:e2e:smoke
```

Target: 0 violations with 0 breaking changes.
